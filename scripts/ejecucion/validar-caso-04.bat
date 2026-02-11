:: VALIDAR RESULTADO DEL TEST CASO 04
:: Ejecutar después de que el test termine

@echo off
setlocal enabledelayedexpansion

echo.
echo ==============================================================================
echo VALIDACIÓN DE RESULTADO - CASO 04
echo ==============================================================================
echo.

REM Contar screenshots ACEPTAR
set "screenshot_aceptar=0"
for /f %%A in ('dir /b "screenshots\04*ACEPTAR*.png" 2^>nul ^| find /c /v ""') do set "screenshot_aceptar=%%A"

if %screenshot_aceptar% GTR 0 (
    echo ✅ TEST EXITOSO - Se generó screenshot ACEPTAR
    echo    Cantidad de ACEPTAR: %screenshot_aceptar%
    
    echo.
    echo 📸 Screenshots generados:
    dir /b "screenshots\04-reconsiderar-con-sanciones*.png" | findstr /R "ACEPTAR$"
    
) else (
    echo ❌ TEST FALLÓ - No se generó screenshot ACEPTAR
    echo.
    echo 📂 Screenshots encontrados:
    dir /b "screenshots\04-reconsiderar-con-sanciones*.png"
)

echo.
echo ==============================================================================

pause