@echo off
REM Eliminar archivos conflictivos
del /F /Q "tests\casos-prueba\02-registrar-sancion.spec.ts"
del /F /Q "tests\casos-prueba\02-registrar-sancion-simple.spec.ts"
del /F /Q "tests\casos-prueba\test-simple.spec.ts"

REM Renombrar final a principal
ren "tests\casos-prueba\02-registrar-sancion-final.spec.ts" "02-registrar-sancion.spec.ts"

echo.
echo ✅ Archivos consolidados
echo.
pause
