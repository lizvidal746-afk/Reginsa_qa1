@echo off
setlocal
REM ========================================
REM Runner genérico de casos
REM Uso:
REM   run-test.bat 01 [workers] [repeat]
REM ========================================
cd /d "%~dp0"

set CASE=%~1
if "%CASE%"=="" set CASE=01
set WORKERS=%~2
set REPEAT=%~3

echo.
echo ========================================
echo Ejecutando Caso %CASE%
echo ========================================
echo.

set EXTRA=
if not "%WORKERS%"=="" set EXTRA=%EXTRA% --workers=%WORKERS%
if not "%REPEAT%"=="" set EXTRA=%EXTRA% --repeat-each=%REPEAT%

if "%EXTRA%"=="" (
	call npm run test:%CASE%
) else (
	call npm run test:%CASE% -- %EXTRA%
)

echo.
echo ========================================
echo Test completado
echo Capturas en: test-results/
echo ========================================
echo.
pause
