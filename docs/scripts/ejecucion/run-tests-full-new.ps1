#!/usr/bin/env pwsh
# Script para ejecutar pruebas Playwright
# Encoding: UTF-8

Write-Host "`n" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "     PRUEBAS PLAYWRIGHT - REGINSA SUNEDU QA" -ForegroundColor Cyan
Write-Host "          Caso 01 + Caso 02 + Reportes" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor Green

# Path del proyecto
$projectPath = "d:\SUNEDU\SELENIUM\playwrigth"
Set-Location -Path $projectPath

Write-Host "Path: $projectPath" -ForegroundColor Yellow
Write-Host "`n" -ForegroundColor Green

# Verificar que package.json existe
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json no encontrado en $projectPath" -ForegroundColor Red
    exit 1
}

# Limpiar reportes anteriores
Write-Host "Limpiando reportes anteriores..." -ForegroundColor Yellow
if (Test-Path "test-results") {
    Remove-Item -Path "test-results" -Recurse -Force
    Write-Host "   OK: Carpeta test-results eliminada" -ForegroundColor Green
}

Write-Host "`n" -ForegroundColor Green

# ====================================
# EJECUTAR CASO 01
# ====================================
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "[1/2] EJECUTANDO CASO 01: AGREGAR ADMINISTRADO" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor Green

$startTime = Get-Date
& npm run test:01
$caso01Result = $LASTEXITCODE
$caso01Duration = ((Get-Date) - $startTime).TotalSeconds

if ($caso01Result -eq 0) {
    Write-Host "`nCASO 01: EXITOSO (${caso01Duration}s)" -ForegroundColor Green
} else {
    Write-Host "`nCASO 01: FALLIDO (${caso01Duration}s)" -ForegroundColor Red
}

Write-Host "`n" -ForegroundColor Green

# ====================================
# EJECUTAR CASO 02
# ====================================
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "[2/2] EJECUTANDO CASO 02: REGISTRAR SANCION" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor Green

$startTime = Get-Date
& npm run test:02
$caso02Result = $LASTEXITCODE
$caso02Duration = ((Get-Date) - $startTime).TotalSeconds

if ($caso02Result -eq 0) {
    Write-Host "`nCASO 02: EXITOSO (${caso02Duration}s)" -ForegroundColor Green
} else {
    Write-Host "`nCASO 02: FALLIDO (${caso02Duration}s)" -ForegroundColor Red
}

Write-Host "`n" -ForegroundColor Green

# ====================================
# RESUMEN FINAL
# ====================================
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "                    RESUMEN DE PRUEBAS" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

Write-Host "`nRESULTADOS:" -ForegroundColor Yellow

$caso01Status = if ($caso01Result -eq 0) { "PASO" } else { "FALLIDO" }
$caso02Status = if ($caso02Result -eq 0) { "PASO" } else { "FALLIDO" }

Write-Host "   Caso 01: $caso01Status ($caso01Duration segundos)" -ForegroundColor $(if ($caso01Result -eq 0) { 'Green' } else { 'Red' })
Write-Host "   Caso 02: $caso02Status ($caso02Duration segundos)" -ForegroundColor $(if ($caso02Result -eq 0) { 'Green' } else { 'Red' })

$totalTests = 2
$passedTests = if ($caso01Result -eq 0) { 1 } else { 0 }
$passedTests += if ($caso02Result -eq 0) { 1 } else { 0 }

Write-Host "`nESTADISTICAS:" -ForegroundColor Yellow
Write-Host "   Total: $totalTests" -ForegroundColor Blue
Write-Host "   Exitosas: $passedTests" -ForegroundColor Green
Write-Host "   Fallidas: $($totalTests - $passedTests)" -ForegroundColor $(if ($totalTests -eq $passedTests) { 'Green' } else { 'Red' })

$successRate = [math]::Round(($passedTests / $totalTests) * 100, 2)
Write-Host "   Tasa exito: $successRate%" -ForegroundColor $(if ($successRate -eq 100) { 'Green' } else { 'Yellow' })

Write-Host "`n" -ForegroundColor Green

# Retornar código de salida
if ($totalTests -eq $passedTests) {
    Write-Host "============================================================" -ForegroundColor Green
    Write-Host "              TODAS LAS PRUEBAS PASARON" -ForegroundColor Green
    Write-Host "============================================================" -ForegroundColor Green
    exit 0
} else {
    Write-Host "============================================================" -ForegroundColor Yellow
    Write-Host "              ALGUNAS PRUEBAS FALLARON" -ForegroundColor Yellow
    Write-Host "============================================================" -ForegroundColor Yellow
    exit 1
}
