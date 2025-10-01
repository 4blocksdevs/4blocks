@echo off
echo Making deployment scripts executable...

:: Note: In Windows, .sh files don't need chmod, but this file documents
:: the scripts that need to be executable when transferred to Linux server

echo The following scripts should be made executable on your Ubuntu server:
echo - scripts/setup-server.sh
echo - scripts/health-check.sh  
echo - scripts/manual-deploy.sh

echo.
echo To make them executable on Ubuntu, run:
echo chmod +x scripts/*.sh

echo.
echo Scripts are ready for deployment to Ubuntu server.
pause