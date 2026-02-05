@echo off
REM ============================================
REM Limpiar todos los datos de pruebas anteriores
REM ============================================
echo.
echo 🧹 Limpiando directorios de pruebas anteriores...
echo.

REM Limpiar screenshots
if exist "screenshots" (
    echo 🗑️  Eliminando: screenshots
    rmdir /s /q "screenshots"
)

REM Limpiar Allure results
if exist "allure-results" (
    echo 🗑️  Eliminando: allure-results
    rmdir /s /q "allure-results"
)

REM Limpiar Allure report
if exist "allure-report" (
    echo 🗑️  Eliminando: allure-report
    rmdir /s /q "allure-report"
)

REM Limpiar Playwright report
if exist "playwright-report" (
    echo 🗑️  Eliminando: playwright-report
    rmdir /s /q "playwright-report"
)

REM Limpiar test results
if exist "test-results" (
    echo 🗑️  Eliminando: test-results
    rmdir /s /q "test-results"
)

REM Limpiar archivos JSON de registros
if exist "registros-administrados.json" (
    echo 🗑️  Eliminando: registros-administrados.json
    del "registros-administrados.json"
)

if exist "reporte-administrados.html" (
    echo 🗑️  Eliminando: reporte-administrados.html
    del "reporte-administrados.html"
)

echo.
echo ✅ Limpieza completada
echo.
echo 📌 Ahora puede ejecutar los tests desde limpio:
echo    npm run test:02
echo.
pause
