@echo off
cls
echo ======================================
echo  EJECUTANDO TEST CASO 02
echo  REGISTRAR SANCIÓN
echo ======================================
echo.
cd /d "%~dp0"
call npm run test:caso-02
pause
