@echo off
echo.
echo ====================================
echo EJECUTANDO PRUEBAS - CASO 01 Y 02
echo ====================================
echo.

cd /d "d:\SUNEDU\SELENIUM\playwrigth"

echo [1/2] Ejecutando CASO 01...
echo.
call npm run test:01

echo.
echo ====================================
echo [2/2] Ejecutando CASO 02...
echo.
call npm run test:02

echo.
echo ====================================
echo PRUEBAS COMPLETADAS
echo ====================================
echo.
pause
