@echo off
echo.
echo ============================================
echo SSH Key Setup for GitHub Actions Deployment
echo ============================================
echo.
echo This guide will help you set up SSH keys for deployment.
echo.
echo STEP 1: Generate SSH Key (if you don't have one)
echo -----------------------------------------------
echo.
echo On your local machine, run:
echo ssh-keygen -t rsa -b 4096 -C "github-actions@4blocks"
echo.
echo Press Enter to accept default location (~/.ssh/id_rsa)
echo Press Enter twice for no passphrase
echo.
echo.
echo STEP 2: Copy Public Key to Your Server
echo --------------------------------------
echo.
echo Run this command to copy your public key to the server:
echo ssh-copy-id your-username@your-server-ip
echo.
echo Example:
echo ssh-copy-id ubuntu@192.168.1.100
echo.
echo.
echo STEP 3: Get Private Key for GitHub Secrets
echo ------------------------------------------
echo.
echo On Windows, display your private key:
echo type %USERPROFILE%\.ssh\id_rsa
echo.
echo On Linux/Mac:
echo cat ~/.ssh/id_rsa
echo.
echo Copy the ENTIRE output (including -----BEGIN/END----- lines)
echo This goes into the SERVER_SSH_KEY secret in GitHub.
echo.
echo.
echo STEP 4: GitHub Secrets Configuration
echo ------------------------------------
echo.
echo Go to: https://github.com/4blocksdevs/4blocks/settings/secrets/actions
echo.
echo Add these secrets:
echo - SERVER_HOST: Your server IP (e.g., 192.168.1.100)
echo - SERVER_USER: Your SSH username (e.g., ubuntu)
echo - SERVER_SSH_KEY: The private key content from Step 3
echo - SERVER_PORT: 22 (unless you use a different SSH port)
echo.
echo.
echo STEP 5: Test SSH Connection
echo ---------------------------
echo.
echo Test that you can connect to your server:
echo ssh your-username@your-server-ip
echo.
echo If this works, your GitHub Actions will also work!
echo.
echo ============================================
echo Ready for deployment! 🚀
echo ============================================
pause