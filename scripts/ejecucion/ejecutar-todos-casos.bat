@echo off
REM ============================================
REM Ejecutar TODOS los Casos + Abrir reportes automáticamente
REM ============================================
echo.
echo 🚀 Ejecutando TODOS los Casos...
echo.

call npm run test:all

echo.
echo ✨ Abriendo reportes automáticamente...
echo.

REM Abrir Playwright
start /b npx playwright show-report

REM Generar y abrir Allure
allure generate ./allure-results --clean -o ./allure-report
start /b allure open ./allure-report

echo.
echo ✅ Reportes abiertos en:
echo    - Playwright: http://localhost:9323
echo    - Allure: http://localhost:4050
echo.
pause
