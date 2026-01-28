@echo off
cd /d d:\SUNEDU\SELENIUM\playwrigth
echo Instalando dependencias...
call npm install
echo.
echo Instalando navegadores...
call npx playwright install
echo.
echo Iniciando el Recorder...
echo Por favor, interactúa con el navegador que se abre.
echo El código se guardará automáticamente.
echo.
call npx playwright codegen --output tests/grabacion.spec.js
pause
