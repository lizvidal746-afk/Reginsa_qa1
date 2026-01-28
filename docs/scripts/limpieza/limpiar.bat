@echo off
REM ========================================
REM SCRIPT DE LIMPIEZA - ELIGE UNA OPCION
REM ========================================

cls
echo.
echo 🧹 LIMPIADOR DE REPORTES Y DATOS
echo =====================================
echo.
echo 1) Limpiar TODO (reportes, screenshots, datos)
echo 2) Limpiar CASO 01 solamente
echo 3) Limpiar CASO 02 solamente
echo 4) Salir
echo.
set /p opcion="Elige opcion (1-4): "

cd /d "D:\SUNEDU\SELENIUM\playwrigth"

if "%opcion%"=="1" goto limpiar_todo
if "%opcion%"=="2" goto limpiar_caso01
if "%opcion%"=="3" goto limpiar_caso02
if "%opcion%"=="4" goto fin
goto opcion_invalida

:limpiar_todo
cls
echo.
echo 🧹 Limpiando TODO...
echo.
rmdir /s /q allure-results 2>nul
rmdir /s /q allure-report 2>nul
rmdir /s /q playwright-report 2>nul
rmdir /s /q test-results 2>nul
rmdir /s /q screenshots 2>nul
del /q registros-administrados.json 2>nul
del /q reporte-administrados.html 2>nul
echo.
echo ✅ Todo limpiado correctamente
echo.
pause
goto fin

:limpiar_caso01
cls
echo.
echo 🧹 Limpiando CASO 01...
echo.
del /q screenshots\01-*.png 2>nul
echo.
echo ✅ Caso 01 limpiado
echo.
pause
goto fin

:limpiar_caso02
cls
echo.
echo 🧹 Limpiando CASO 02...
echo.
del /q screenshots\02-*.png 2>nul
echo.
echo ✅ Caso 02 limpiado
echo.
pause
goto fin

:opcion_invalida
cls
echo.
echo ❌ Opción inválida. Intenta de nuevo.
echo.
pause
goto limpiar.bat

:fin
exit /b
