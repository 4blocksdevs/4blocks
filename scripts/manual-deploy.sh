#!/bin/bash

# 4Blocks MVP - Manual Deployment Script
# Use this script for manual deployments when CI/CD is not available

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Configuration
DEPLOY_DIR="/var/www/4BlocksMVP"
CURRENT_DIR="$DEPLOY_DIR/current"
BACKUP_DIR="$DEPLOY_DIR/backups"
TEMP_DIR="/tmp/4blocks-mvp-deploy"
MAX_BACKUPS=5

# Check if build directory is provided
if [ $# -eq 0 ]; then
    print_error "Usage: $0 <path-to-build-directory>"
    print_error "Example: $0 ./out"
    exit 1
fi

BUILD_DIR="$1"

# Validate build directory
if [ ! -d "$BUILD_DIR" ]; then
    print_error "Build directory '$BUILD_DIR' does not exist"
    exit 1
fi

if [ ! -f "$BUILD_DIR/index.html" ]; then
    print_error "Build directory '$BUILD_DIR' does not contain index.html"
    exit 1
fi

echo "🚀 4Blocks MVP - Manual Deployment"
echo "Source: $BUILD_DIR"
echo "Target: $CURRENT_DIR"
echo "Started at: $(date)"
echo "========================================"

# Create backup of current deployment
if [ -d "$CURRENT_DIR" ] && [ "$(ls -A $CURRENT_DIR)" ]; then
    print_status "Creating backup of current deployment..."
    
    # Create backup directory if it doesn't exist
    mkdir -p "$BACKUP_DIR"
    
    # Create timestamped backup
    BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
    BACKUP_PATH="$BACKUP_DIR/$BACKUP_NAME"
    
    cp -r "$CURRENT_DIR" "$BACKUP_PATH"
    print_success "Backup created: $BACKUP_PATH"
    
    # Clean up old backups (keep only last 5)
    cd "$BACKUP_DIR"
    ls -t | tail -n +$((MAX_BACKUPS + 1)) | xargs -r rm -rf
    print_status "Cleaned up old backups (keeping last $MAX_BACKUPS)"
else
    print_status "No existing deployment found, skipping backup"
fi

# Prepare temporary directory
print_status "Preparing temporary deployment directory..."
rm -rf "$TEMP_DIR"
mkdir -p "$TEMP_DIR"

# Copy build files to temporary directory
print_status "Copying build files..."
cp -r "$BUILD_DIR"/* "$TEMP_DIR/"
print_success "Build files copied to temporary directory"

# Set proper permissions
print_status "Setting file permissions..."
find "$TEMP_DIR" -type f -exec chmod 644 {} \;
find "$TEMP_DIR" -type d -exec chmod 755 {} \;
print_success "File permissions set"

# Atomic deployment (move temp to current)
print_status "Deploying to production..."
rm -rf "$CURRENT_DIR"
mv "$TEMP_DIR" "$CURRENT_DIR"
print_success "Files deployed to $CURRENT_DIR"

# Set ownership to www-data
print_status "Setting ownership to www-data..."
sudo chown -R www-data:www-data "$CURRENT_DIR"
print_success "Ownership set to www-data:www-data"

# Test Nginx configuration
print_status "Testing Nginx configuration..."
if sudo nginx -t; then
    print_success "Nginx configuration is valid"
else
    print_error "Nginx configuration test failed"
    
    # Rollback if there's a backup
    if [ -n "$BACKUP_PATH" ] && [ -d "$BACKUP_PATH" ]; then
        print_warning "Attempting rollback to previous version..."
        rm -rf "$CURRENT_DIR"
        cp -r "$BACKUP_PATH" "$CURRENT_DIR"
        sudo chown -R www-data:www-data "$CURRENT_DIR"
        print_warning "Rolled back to previous version"
    fi
    exit 1
fi

# Reload Nginx
print_status "Reloading Nginx..."
sudo systemctl reload nginx
if sudo systemctl is-active --quiet nginx; then
    print_success "Nginx reloaded successfully"
else
    print_error "Failed to reload Nginx"
    exit 1
fi

# Perform health check
print_status "Performing health check..."
sleep 2  # Give nginx a moment to process the reload

# Test if site is accessible
if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200"; then
    print_success "✅ Website is accessible (HTTP 200)"
else
    print_error "❌ Website is not accessible"
    
    # Rollback if there's a backup
    if [ -n "$BACKUP_PATH" ] && [ -d "$BACKUP_PATH" ]; then
        print_warning "Attempting rollback to previous version..."
        rm -rf "$CURRENT_DIR"
        cp -r "$BACKUP_PATH" "$CURRENT_DIR"
        sudo chown -R www-data:www-data "$CURRENT_DIR"
        sudo systemctl reload nginx
        print_warning "Rolled back to previous version"
    fi
    exit 1
fi

# Test health endpoint
health_response=$(curl -s http://localhost/health || echo "failed")
if [ "$health_response" = "healthy" ]; then
    print_success "✅ Health endpoint is working"
else
    print_warning "⚠️ Health endpoint not responding correctly"
fi

# Display deployment info
echo ""
echo "========================================"
print_success "🎉 Deployment completed successfully!"
echo "========================================"
echo ""
print_status "Deployment Information:"
echo "  • Deployed at: $(date)"
echo "  • Source: $BUILD_DIR"
echo "  • Target: $CURRENT_DIR"
echo "  • Files deployed: $(find $CURRENT_DIR -type f | wc -l)"
echo "  • Total size: $(du -sh $CURRENT_DIR | cut -f1)"

if [ -n "$BACKUP_PATH" ]; then
    echo "  • Backup location: $BACKUP_PATH"
fi

echo ""
print_status "Available commands:"
echo "  • Check site status: curl -I http://localhost"
echo "  • View access logs: sudo tail -f /var/log/nginx/4blocks-access.log"
echo "  • View error logs: sudo tail -f /var/log/nginx/4blocks-error.log"
echo "  • Restart Nginx: sudo systemctl restart nginx"

if [ -n "$BACKUP_PATH" ]; then
    echo ""
    print_status "Rollback (if needed):"
    echo "  sudo rm -rf $CURRENT_DIR"
    echo "  sudo cp -r $BACKUP_PATH $CURRENT_DIR"
    echo "  sudo chown -R www-data:www-data $CURRENT_DIR"
    echo "  sudo systemctl reload nginx"
fi

echo ""
print_success "Your 4Blocks MVP is now live! 🚀"