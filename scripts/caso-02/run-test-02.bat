@echo off
REM Script para ejecutar el Test 02 - Registrar Sanción
echo ========================================
echo  EJECUTANDO CASO 02: REGISTRAR SANCIÓN
echo ========================================
echo.
cd /d "%~dp0"
npm run test:caso-02
pause
