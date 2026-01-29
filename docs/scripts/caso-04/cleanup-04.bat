@echo off
echo.
echo ================================================================================
echo ðŸ§¹ LIMPIEZA CASO 04: Eliminando archivo corrupto y renombrando archivo correcto
echo ================================================================================
echo.

cd /d "d:\SUNEDU\SELENIUM\playwrigth\tests\casos-prueba"

echo ðŸ—‘ï¸  Eliminando archivo antiguo (04-reconsiderar-con-sanciones.spec.ts)...
del /f /q "04-reconsiderar-con-sanciones.spec.ts" 2>nul

echo ðŸ“ Renombrando archivo nuevo...
ren "04-reconsiderar-con-sanciones-clean.spec.ts" "04-reconsiderar-con-sanciones.spec.ts"

echo.
echo âœ… Limpieza completada correctamente
echo.
echo ================================================================================
echo ðŸ“‹ INSTRUCCIONES DE EJECUCIÃ“N:
echo ================================================================================
echo.
echo OpciÃ³n 1 - Ejecutar desde la terminal (recomendado):
echo    npm run test:04
echo.
echo OpciÃ³n 2 - Con reporte Playwright:
echo    npm run test:04 -- --reporter=html
echo.
echo ================================================================================
echo.
pause

