@echo off
REM Script para ejecutar test y generar reportes automáticamente (incluyendo Allure)

echo.
echo ========================================
echo  SUNEDU - Registro de Administrados
echo  Con Reportes: Playwright + Allure + HTML
echo ========================================
echo.

REM Limpiar reportes anteriores
echo [1/4] Limpiando reportes anteriores...
if exist allure-results rmdir /s /q allure-results
if exist playwright-report rmdir /s /q playwright-report

REM Ejecutar test
echo.
echo [2/4] Ejecutando test...
call npm run test:admin:headed

REM Generar reporte HTML
echo.
echo [3/4] Generando reporte HTML...
call node generar-reporte-html.js

REM Generar reporte Allure
echo.
echo [4/4] Generando reporte Allure...
call npm run report:allure:generate

echo.
echo ========================================
echo  ✅ Proceso completado
echo ========================================
echo.
echo 📊 Reportes generados:
echo   - reporte-administrados.html (HTML custom)
echo   - playwright-report/ (Playwright)
echo   - allure-report/ (Allure)
echo.
echo Para abrir reportes:
echo   - HTML: start reporte-administrados.html
echo   - Playwright: npm run report:playwright
echo   - Allure: npm run report:allure:open
echo.
pause
