@echo off
REM ========================================
REM ABRIR ALLURE REPORT
REM ========================================

cls
echo.
echo 📊 ABRIENDO ALLURE REPORT
echo =====================================
echo.

cd /d "D:\SUNEDU\SELENIUM\playwrigth"

REM Verificar si existen los datos de allure
if not exist "allure-results" (
    echo.
    echo ❌ ERROR: No hay datos de Allure
    echo.
    echo Necesitas ejecutar primero:
    echo   npm run test:01
    echo   npm run test:02
    echo   npm run test:all
    echo.
    pause
    exit /b
)

echo.
echo 🔄 Iniciando Allure en http://localhost:4050...
echo.
echo Nota: Presiona Ctrl+C en esta ventana para detener
echo.

allure serve allure-results

pause
