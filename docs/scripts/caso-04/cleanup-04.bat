@echo off
echo.
echo ================================================================================
echo 🧹 LIMPIEZA CASO 04: Eliminando archivo corrupto y renombrando archivo correcto
echo ================================================================================
echo.

cd /d "d:\SUNEDU\SELENIUM\playwrigth\tests\casos-prueba"

echo 🗑️  Eliminando archivo antiguo (04-reconsiderar-con-sanciones.spec.ts)...
del /f /q "04-reconsiderar-con-sanciones.spec.ts" 2>nul

echo 📝 Renombrando archivo nuevo...
ren "04-reconsiderar-con-sanciones-clean.spec.ts" "04-reconsiderar-con-sanciones.spec.ts"

echo.
echo ✅ Limpieza completada correctamente
echo.
echo ================================================================================
echo 📋 INSTRUCCIONES DE EJECUCIÓN:
echo ================================================================================
echo.
echo Opción 1 - Ejecutar desde la terminal (recomendado):
echo    npm run test:04
echo.
echo Opción 2 - Con reporte Playwright:
echo    npm run test:04 -- --reporter=html
echo.
echo ================================================================================
echo.
pause
