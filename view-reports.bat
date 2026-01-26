@echo off
REM Script para generar y visualizar reportes de Playwright y Allure

echo.
echo ================================
echo 📊 GENERANDO REPORTES
echo ================================
echo.

REM 1. Ejecutar test
echo 1️⃣ Ejecutando test...
call npm run test:02

echo.
echo 2️⃣ Reportes generados:
echo    ✓ playwright-report/ (HTML)
echo    ✓ allure-results/ (JSON)

echo.
echo ================================
echo 📈 ABRIENDO REPORTES
echo ================================
echo.

REM 2. Abrir Playwright Report
echo 3️⃣ Abriendo Playwright Report en 5 segundos...
timeout /t 5 /nobreak
start npx playwright show-report

REM 3. Verificar si allure está instalado
where allure >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo.
    echo 4️⃣ Abriendo Allure Report en 10 segundos...
    timeout /t 10 /nobreak
    start cmd /k "allure serve allure-results"
) else (
    echo.
    echo ⚠️  Allure CLI no está instalado.
    echo    Instalar con: npm install -g allure-commandline
)

echo.
echo ✅ Reportes abiertos. Cierra esta ventana cuando termines.
pause
