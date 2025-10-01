# 🚀 CI/CD Deployment Setup for 4Blocks MVP

## Overview

This CI/CD workflow automatically deploys your Next.js application to your Ubuntu server at `/var/www/4BlocksMVP` when you push to the main branch.

## Prerequisites

### 1. Ubuntu Server Setup

Ensure your Ubuntu server has the following installed:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18 (for potential server-side operations)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt install nginx -y

# Install other utilities
sudo apt install curl wget git -y
```

### 2. GitHub Secrets Configuration

Add these secrets to your GitHub repository settings (Settings → Secrets and variables → Actions):

| Secret Name      | Description                         | Example                              |
| ---------------- | ----------------------------------- | ------------------------------------ |
| `SERVER_HOST`    | Your Ubuntu server IP or domain     | `192.168.1.100` or `your-domain.com` |
| `SERVER_USER`    | SSH username for your server        | `ubuntu` or `your-username`          |
| `SERVER_SSH_KEY` | Private SSH key for authentication  | Copy content of `~/.ssh/id_rsa`      |
| `SERVER_PORT`    | SSH port (optional, defaults to 22) | `22`                                 |

### 3. SSH Key Setup

#### On your local machine:

```bash
# Generate SSH key pair (if you don't have one)
ssh-keygen -t rsa -b 4096 -C "github-actions@4blocks"

# Copy public key to server
ssh-copy-id your-username@your-server-ip
```

#### Get private key for GitHub secrets:

```bash
# Display private key (copy this to SERVER_SSH_KEY secret)
cat ~/.ssh/id_rsa
```

## Workflow Features

### 🧪 **Testing Stage**

- ✅ TypeScript type checking
- ✅ ESLint code quality checks
- ✅ Next.js build process
- ✅ Artifact creation for deployment

### 🚀 **Deployment Stage**

- ✅ Automatic backup of previous deployment
- ✅ Static file deployment to `/var/www/4BlocksMVP`
- ✅ Nginx configuration setup
- ✅ Security headers and compression
- ✅ Health checks
- ✅ Rollback capability

### 📁 **Directory Structure**

```
/var/www/4BlocksMVP/
├── current/          # Current live deployment
├── backups/          # Previous deployments (last 5 kept)
│   ├── backup-20231002-143022/
│   └── backup-20231002-120015/
└── logs/            # Deployment logs
```

## Nginx Configuration

The workflow automatically creates an optimized Nginx configuration with:

- **Static file serving** with cache headers
- **Gzip compression** for better performance
- **Security headers** (XSS, CSRF protection)
- **SPA routing** support for Next.js
- **SSL ready** (add SSL configuration manually)

## Manual Deployment Commands

If you need to deploy manually:

```bash
# SSH into your server
ssh your-username@your-server-ip

# Navigate to deployment directory
cd /var/www/4BlocksMVP

# Check current deployment
ls -la current/

# View deployment logs
tail -f /var/log/nginx/access.log

# Restart Nginx if needed
sudo systemctl restart nginx

# Check Nginx status
sudo systemctl status nginx
```

## SSL Certificate Setup (Recommended)

After initial deployment, set up SSL with Let's Encrypt:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal test
sudo certbot renew --dry-run
```

## Monitoring and Logs

### Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### Deployment Status

```bash
# Check if site is accessible
curl -I http://your-domain.com

# Check Nginx configuration
sudo nginx -t

# View site statistics
sudo du -sh /var/www/4BlocksMVP/current
```

## Troubleshooting

### Common Issues

#### 1. Permission Denied

```bash
# Fix ownership
sudo chown -R www-data:www-data /var/www/4BlocksMVP/current
sudo chmod -R 755 /var/www/4BlocksMVP/current
```

#### 2. Nginx 404 Errors

```bash
# Check Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

#### 3. SSH Connection Issues

```bash
# Test SSH connection
ssh -T your-username@your-server-ip

# Verify SSH key permissions (on local machine)
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

## Rollback Procedure

If deployment fails, you can quickly rollback:

```bash
# SSH into server
ssh your-username@your-server-ip

# List available backups
ls -la /var/www/4BlocksMVP/backups/

# Rollback to previous version
sudo rm -rf /var/www/4BlocksMVP/current
sudo cp -r /var/www/4BlocksMVP/backups/backup-YYYYMMDD-HHMMSS /var/www/4BlocksMVP/current
sudo chown -R www-data:www-data /var/www/4BlocksMVP/current

# Reload Nginx
sudo systemctl reload nginx
```

## Performance Optimization

The workflow includes several performance optimizations:

- **Static file caching** with 1-year expiry
- **Gzip compression** for text files
- **Nginx optimizations** for Next.js static exports
- **Automatic cleanup** of old deployments

## Security Features

- **Security headers** (XSS, Content-Type, Frame protection)
- **Hidden file protection** (denies access to dotfiles)
- **Proper file permissions** (www-data ownership)
- **SSH key authentication** (no password-based access)

## Next Steps

1. **Set up GitHub secrets** with your server details
2. **Configure your domain** in the Nginx configuration
3. **Set up SSL certificate** for HTTPS
4. **Monitor deployment** in GitHub Actions
5. **Test the application** on your domain

Your 4Blocks MVP will now automatically deploy to `/var/www/4BlocksMVP` every time you push to the main branch! 🎉
