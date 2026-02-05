@echo off
REM Script para ejecutar test y generar reporte automaticamente

echo.
echo ========================================
echo  SUNEDU - Registro de Administrados
echo ========================================
echo.

REM Ejecutar test
echo [1/3] Ejecutando test...
call npm run test:admin:headed

echo.
echo [2/3] Generando reporte HTML...
call node generar-reporte-html.js

echo.
echo [3/3] Abriendo reporte...
start reporte-administrados.html

echo.
echo ========================================
echo  Proceso completado
echo ========================================
echo.
echo Reporte disponible: reporte-administrados.html
echo Datos JSON: registros-administrados.json
echo.
pause
