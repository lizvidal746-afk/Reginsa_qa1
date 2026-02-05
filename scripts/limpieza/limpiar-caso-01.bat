@echo off
REM ============================================
REM Limpiar datos del Caso 1 solamente
REM ============================================
echo.
echo 🧹 Limpiando datos del Caso 01...
echo.

REM Eliminar archivos JSON de administrados
if exist "registros-administrados.json" (
    del "registros-administrados.json"
    echo ✅ Eliminado: registros-administrados.json
)

REM Eliminar reporte HTML de administrados
if exist "reporte-administrados.html" (
    del "reporte-administrados.html"
    echo ✅ Eliminado: reporte-administrados.html
)

echo.
echo ✅ Caso 01 limpio - Listo para ejecutar
echo.
pause
