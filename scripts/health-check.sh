#!/bin/bash

# 4Blocks MVP - Deployment Health Check Script
# This script performs comprehensive health checks after deployment

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
DEPLOY_DIR="/var/www/4BlocksMVP/current"
BACKUP_DIR="/var/www/4BlocksMVP/backups"
LOG_FILE="/var/log/4blocks-mvp/health-check-$(date +%Y%m%d-%H%M%S).log"

# Function to log and print
log_and_print() {
    echo "$1" | tee -a "$LOG_FILE"
}

echo "🏥 4Blocks MVP - Deployment Health Check" | tee "$LOG_FILE"
echo "Started at: $(date)" | tee -a "$LOG_FILE"
echo "============================================" | tee -a "$LOG_FILE"

# Check 1: Deployment directory exists and has content
print_status "Checking deployment directory..."
if [ -d "$DEPLOY_DIR" ] && [ "$(ls -A $DEPLOY_DIR)" ]; then
    print_success "Deployment directory exists and contains files"
    log_and_print "✅ Deployment directory: OK"
    
    # List main files
    echo "Main files in deployment:" | tee -a "$LOG_FILE"
    ls -la "$DEPLOY_DIR" | head -10 | tee -a "$LOG_FILE"
else
    print_error "Deployment directory is missing or empty"
    log_and_print "❌ Deployment directory: FAILED"
    exit 1
fi

# Check 2: Essential files exist
print_status "Checking essential files..."
essential_files=("index.html" "_next" "404.html")
missing_files=()

for file in "${essential_files[@]}"; do
    if [ -e "$DEPLOY_DIR/$file" ]; then
        log_and_print "✅ $file: Found"
    else
        log_and_print "❌ $file: Missing"
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
    print_success "All essential files are present"
else
    print_warning "Some essential files are missing: ${missing_files[*]}"
fi

# Check 3: File permissions
print_status "Checking file permissions..."
expected_owner="www-data:www-data"
actual_owner=$(stat -c "%U:%G" "$DEPLOY_DIR")

if [ "$actual_owner" = "$expected_owner" ]; then
    print_success "File ownership is correct ($actual_owner)"
    log_and_print "✅ File ownership: OK"
else
    print_warning "File ownership should be $expected_owner but is $actual_owner"
    log_and_print "⚠️ File ownership: Warning - should be $expected_owner"
fi

# Check 4: Nginx service status
print_status "Checking Nginx service..."
if systemctl is-active --quiet nginx; then
    print_success "Nginx is running"
    log_and_print "✅ Nginx service: Running"
else
    print_error "Nginx is not running"
    log_and_print "❌ Nginx service: Not running"
fi

# Check 5: Nginx configuration validity
print_status "Testing Nginx configuration..."
if nginx -t &>/dev/null; then
    print_success "Nginx configuration is valid"
    log_and_print "✅ Nginx config: Valid"
else
    print_error "Nginx configuration has errors"
    log_and_print "❌ Nginx config: Invalid"
fi

# Check 6: Website accessibility
print_status "Testing website accessibility..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200"; then
    print_success "Website is accessible (HTTP 200)"
    log_and_print "✅ Website accessibility: OK"
else
    print_error "Website is not accessible"
    log_and_print "❌ Website accessibility: Failed"
fi

# Check 7: Health endpoint
print_status "Testing health endpoint..."
health_response=$(curl -s http://localhost/health || echo "failed")
if [ "$health_response" = "healthy" ]; then
    print_success "Health endpoint is working"
    log_and_print "✅ Health endpoint: OK"
else
    print_warning "Health endpoint not responding correctly"
    log_and_print "⚠️ Health endpoint: Warning"
fi

# Check 8: Disk space
print_status "Checking disk space..."
disk_usage=$(df /var/www | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$disk_usage" -lt 80 ]; then
    print_success "Disk space is adequate ($disk_usage% used)"
    log_and_print "✅ Disk space: OK ($disk_usage% used)"
elif [ "$disk_usage" -lt 90 ]; then
    print_warning "Disk space is getting low ($disk_usage% used)"
    log_and_print "⚠️ Disk space: Warning ($disk_usage% used)"
else
    print_error "Disk space is critically low ($disk_usage% used)"
    log_and_print "❌ Disk space: Critical ($disk_usage% used)"
fi

# Check 9: Backup directory
print_status "Checking backup system..."
if [ -d "$BACKUP_DIR" ]; then
    backup_count=$(ls -1 "$BACKUP_DIR" | wc -l)
    print_success "Backup directory exists with $backup_count backups"
    log_and_print "✅ Backup system: OK ($backup_count backups available)"
else
    print_warning "Backup directory not found"
    log_and_print "⚠️ Backup system: No backup directory"
fi

# Check 10: Log files
print_status "Checking log files..."
nginx_access_log="/var/log/nginx/4blocks-access.log"
nginx_error_log="/var/log/nginx/4blocks-error.log"

if [ -f "$nginx_access_log" ]; then
    recent_entries=$(tail -n 5 "$nginx_access_log" | wc -l)
    print_success "Nginx access log is available (last $recent_entries entries)"
    log_and_print "✅ Access log: OK"
else
    print_warning "Nginx access log not found"
    log_and_print "⚠️ Access log: Missing"
fi

if [ -f "$nginx_error_log" ]; then
    error_count=$(wc -l < "$nginx_error_log")
    if [ "$error_count" -eq 0 ]; then
        print_success "No errors in Nginx error log"
        log_and_print "✅ Error log: No errors"
    else
        print_warning "Found $error_count entries in error log"
        log_and_print "⚠️ Error log: $error_count entries found"
    fi
else
    print_warning "Nginx error log not found"
    log_and_print "⚠️ Error log: Missing"
fi

# Summary
echo "" | tee -a "$LOG_FILE"
echo "============================================" | tee -a "$LOG_FILE"
echo "Health Check Summary - $(date)" | tee -a "$LOG_FILE"
echo "============================================" | tee -a "$LOG_FILE"

# Count status
success_count=$(grep -c "✅" "$LOG_FILE" || echo "0")
warning_count=$(grep -c "⚠️" "$LOG_FILE" || echo "0")
error_count=$(grep -c "❌" "$LOG_FILE" || echo "0")

echo "✅ Passed: $success_count" | tee -a "$LOG_FILE"
echo "⚠️ Warnings: $warning_count" | tee -a "$LOG_FILE"
echo "❌ Failed: $error_count" | tee -a "$LOG_FILE"

if [ "$error_count" -eq 0 ]; then
    if [ "$warning_count" -eq 0 ]; then
        print_success "🎉 All health checks passed! Deployment is healthy."
        echo "🎉 Status: HEALTHY" | tee -a "$LOG_FILE"
    else
        print_warning "⚠️ Deployment is functional but has some warnings."
        echo "⚠️ Status: FUNCTIONAL WITH WARNINGS" | tee -a "$LOG_FILE"
    fi
else
    print_error "❌ Deployment has critical issues that need attention."
    echo "❌ Status: UNHEALTHY" | tee -a "$LOG_FILE"
    exit 1
fi

echo "Full log saved to: $LOG_FILE" | tee -a "$LOG_FILE"