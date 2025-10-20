#!/bin/bash

# 4Blocks MVP - Server Setup Script
# This script prepares your Ubuntu server for CI/CD deployment
# Run this script on your Ubuntu server before enabling the GitHub Actions workflow

set -e  # Exit on any error

echo "🚀 Setting up 4Blocks MVP deployment environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if running as root
if [ "$EUID" -eq 0 ]; then
    print_error "Please do not run this script as root. Use a regular user with sudo privileges."
    exit 1
fi

# Check if user has sudo privileges
if ! sudo -n true 2>/dev/null; then
    print_error "This user needs sudo privileges. Please run: sudo usermod -aG sudo $USER"
    exit 1
fi

print_status "Starting server setup for 4Blocks MVP..."

# Update system packages
print_status "Updating system packages..."
sudo apt update && sudo apt upgrade -y
print_success "System packages updated"

# Install required packages
print_status "Installing required packages..."
sudo apt install -y curl wget git nginx software-properties-common apt-transport-https ca-certificates
print_success "Required packages installed"

# Install Node.js 18 (for potential future use)
print_status "Installing Node.js 18..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    print_success "Node.js $(node --version) installed"
else
    print_success "Node.js $(node --version) already installed"
fi

# Create deployment directory structure
print_status "Creating deployment directory structure..."
sudo mkdir -p /var/www/4BlocksMVP/{current,backups,logs}
sudo chown -R $USER:www-data /var/www/4BlocksMVP
sudo chmod -R 755 /var/www/4BlocksMVP
print_success "Deployment directories created"

# Configure Nginx
print_status "Configuring Nginx..."

# Remove default Nginx site
sudo rm -f /etc/nginx/sites-enabled/default

# Create Nginx configuration for 4Blocks MVP
sudo tee /etc/nginx/sites-available/4blocks-mvp > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    
    # Replace with your actual domain
    server_name your-domain.com www.your-domain.com;
    
    root /var/www/4BlocksMVP/current;
    index index.html index.htm;
    
    # Security headers
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json
        image/svg+xml;
    
    # Main location
    location / {
        try_files \$uri \$uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            add_header X-Frame-Options DENY always;
            add_header X-Content-Type-Options nosniff always;
        }
    }
    
    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
    
    # Logs
    access_log /var/log/nginx/4blocks-access.log;
    error_log /var/log/nginx/4blocks-error.log;
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/4blocks-mvp /etc/nginx/sites-enabled/
print_success "Nginx configuration created"

# Test Nginx configuration
print_status "Testing Nginx configuration..."
if sudo nginx -t; then
    print_success "Nginx configuration is valid"
else
    print_error "Nginx configuration is invalid"
    exit 1
fi

# Start and enable Nginx
print_status "Starting Nginx service..."
sudo systemctl enable nginx
sudo systemctl restart nginx
if sudo systemctl is-active --quiet nginx; then
    print_success "Nginx is running"
else
    print_error "Failed to start Nginx"
    exit 1
fi

# Configure firewall (UFW)
print_status "Configuring firewall..."
if command -v ufw &> /dev/null; then
    sudo ufw allow OpenSSH
    sudo ufw allow 'Nginx Full'
    sudo ufw --force enable
    print_success "Firewall configured"
else
    print_warning "UFW not installed, firewall not configured"
fi

# Create a placeholder index.html
print_status "Creating placeholder index.html..."
sudo tee /var/www/4BlocksMVP/current/index.html > /dev/null <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>4Blocks MVP - Deployment Ready</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0f0f0; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .logo { font-size: 3em; color: #333; margin-bottom: 20px; }
        .status { color: #28a745; font-size: 1.2em; margin: 20px 0; }
        .info { color: #666; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">🚀 4Blocks MVP</div>
        <div class="status">✅ Server is ready for deployment!</div>
        <div class="info">Your Ubuntu server is properly configured.</div>
        <div class="info">Waiting for the first deployment from GitHub Actions...</div>
        <div class="info">Server: $(hostname -I | awk '{print $1}')</div>
        <div class="info">Time: $(date)</div>
    </div>
</body>
</html>
EOF

sudo chown www-data:www-data /var/www/4BlocksMVP/current/index.html
print_success "Placeholder page created"

# Create deployment logs directory
sudo mkdir -p /var/log/4blocks-mvp
sudo chown $USER:www-data /var/log/4blocks-mvp
print_success "Deployment logs directory created"

# Show server information
echo ""
echo "=================================================="
print_success "🎉 Server setup completed successfully!"
echo "=================================================="
echo ""
print_status "Server Information:"
echo "  • Server IP: $(hostname -I | awk '{print $1}')"
echo "  • User: $USER"
echo "  • Deployment directory: /var/www/4BlocksMVP"
echo "  • Nginx status: $(sudo systemctl is-active nginx)"
echo "  • Node.js version: $(node --version)"
echo ""
print_status "Next Steps:"
echo "  1. Update Nginx configuration with your actual domain name:"
echo "     sudo nano /etc/nginx/sites-available/4blocks-mvp"
echo ""
echo "  2. Set up SSL certificate (after domain is configured):"
echo "     sudo apt install certbot python3-certbot-nginx"
echo "     sudo certbot --nginx -d your-domain.com"
echo ""
echo "  3. Add these secrets to your GitHub repository:"
echo "     • SERVER_HOST: $(hostname -I | awk '{print $1}')"
echo "     • SERVER_USER: $USER"
echo "     • SERVER_SSH_KEY: (your private SSH key content)"
echo "     • SERVER_PORT: 22"
echo ""
echo "  4. Test the server by visiting:"
echo "     http://$(hostname -I | awk '{print $1}')"
echo ""
print_success "You can now push to your main branch to trigger deployment!"
echo "=================================================="