@echo off
REM Script para ejecutar test 02 
cd /d "%~dp0"

echo.
echo ========================================
echo Ejecutando Caso 02: Registrar Sancion
echo PrimeNG dropdown fix (sin networkidle)
echo ========================================
echo.

REM Ejecutar test
npm run test:02

echo.
echo ========================================
echo Test completado
echo Capturas en: test-results/
echo ========================================
echo.
pause
