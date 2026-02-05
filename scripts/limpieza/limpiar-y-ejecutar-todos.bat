@echo off
REM ============================================
REM Limpiar TODO + Ejecutar TODOS los Casos + Reportes
REM ============================================
echo.
echo 🧹 LIMPIANDO TODOS LOS DATOS ANTERIORES...
echo.

REM Limpiar screenshots
if exist "screenshots" rmdir /s /q "screenshots" && echo ✅ Eliminado: screenshots

REM Limpiar Allure results
if exist "allure-results" rmdir /s /q "allure-results" && echo ✅ Eliminado: allure-results

REM Limpiar Allure report
if exist "allure-report" rmdir /s /q "allure-report" && echo ✅ Eliminado: allure-report

REM Limpiar Playwright report
if exist "playwright-report" rmdir /s /q "playwright-report" && echo ✅ Eliminado: playwright-report

REM Limpiar test results
if exist "test-results" rmdir /s /q "test-results" && echo ✅ Eliminado: test-results

REM Limpiar registros administrados
if exist "registros-administrados.json" del "registros-administrados.json" && echo ✅ Eliminado: registros-administrados.json
if exist "reporte-administrados.html" del "reporte-administrados.html" && echo ✅ Eliminado: reporte-administrados.html

echo.
echo ✨ Limpieza completada - Iniciando TODOS los tests desde limpio...
echo.

REM Ejecutar TODOS con reportes automáticos
call npm run test:all

echo.
echo ✅ Tests completados - Reportes abiertos
echo.
