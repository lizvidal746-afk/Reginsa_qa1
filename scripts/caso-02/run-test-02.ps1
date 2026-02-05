# Script para ejecutar Caso 02 con encoding correcto en PowerShell
# ============================================================

# Establecer encoding UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$PSDefaultParameterValues['Out-File:Encoding'] = 'utf8'

Write-Host "=========================================="
Write-Host "Ejecutando Caso 02: Registrar Sanción" -ForegroundColor Green
Write-Host "=========================================="
Write-Host ""

# Cambiar al directorio del proyecto
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommandPath
Set-Location $ScriptDir

Write-Host "Iniciando test en: $(Get-Location)" -ForegroundColor Cyan
Write-Host ""

# Ejecutar test
npm run test:02

Write-Host ""
Write-Host "=========================================="
Write-Host "Test completado" -ForegroundColor Green
Write-Host ""
Write-Host "Verifica los resultados en:"
Write-Host "  📁 test-results/    (capturas de pantalla)"
Write-Host "  📁 playwright-report/ (reporte detallado)"
Write-Host "=========================================="

# Abrir reporte automáticamente (comentado, descomenta si quieres)
# Write-Host "Abriendo reporte..." -ForegroundColor Yellow
# npx playwright show-report
