#!/usr/bin/env pwsh
# Script para ejecutar pruebas Caso 01 y Caso 02 con reportes
# Encoding: UTF-8

Write-Host "`n" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "     PRUEBAS PLAYWRIGHT - REGINSA SUNEDU QA" -ForegroundColor Cyan
Write-Host "          Caso 01 + Caso 02 + Reportes" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor Green

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

# ====================================
# INFORMACION DE CAPTURAS
# ====================================
Write-Host "`nCAPTURAS DE PANTALLA:" -ForegroundColor Yellow

if (Test-Path "screenshots") {
    $screenshots = Get-ChildItem -Path "screenshots" -Filter "*.png" | Measure-Object
    Write-Host "   Total: $($screenshots.Count)" -ForegroundColor Blue
    
    # Mostrar ultimas 5 capturas
    Write-Host "`n   Ultimas capturas:" -ForegroundColor Gray
    Get-ChildItem -Path "screenshots" -Filter "*.png" | Sort-Object LastWriteTime -Descending | Select-Object -First 5 | ForEach-Object {
        $size = [math]::Round(($_.Length / 1KB), 2)
        Write-Host "      - $($_.Name) ($size KB)" -ForegroundColor Gray
    }
} else {
    Write-Host "   Carpeta de screenshots no encontrada" -ForegroundColor Yellow
}

# ====================================
# REPORTES
# ====================================
Write-Host "`nREPORTES:" -ForegroundColor Yellow

if (Test-Path "reportes") {
    $reports = Get-ChildItem -Path "reportes" -Filter "*.json" | Measure-Object
    Write-Host "   Reportes JSON: $($reports.Count)" -ForegroundColor Blue
}

# ====================================
# RESUMEN FINAL
# ====================================
Write-Host "`n" -ForegroundColor Green

if ($totalTests -eq $passedTests) {
    Write-Host "â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—" -ForegroundColor Green
    Write-Host "â•‘                  ðŸŽ‰ TODAS LAS PRUEBAS PASARON ðŸŽ‰          â•‘" -ForegroundColor Green
    Write-Host "â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•" -ForegroundColor Green
} else {
    Write-Host "â•”â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•—" -ForegroundColor Yellow
    Write-Host "â•‘              âš ï¸  ALGUNAS PRUEBAS FALLARON âš ï¸              â•‘" -ForegroundColor Yellow
    Write-Host "â•šâ•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•" -ForegroundColor Yellow
}

Write-Host "`n" -ForegroundColor Green

# Salida final
$totalDuration = $caso01Duration + $caso02Duration
Write-Host "â±ï¸  TIEMPO TOTAL: $totalDuration segundos" -ForegroundColor Cyan
Write-Host "`n" -ForegroundColor Green

# Retornar cÃ³digo de salida
if ($totalTests -eq $passedTests) {
    exit 0
} else {
    exit 1
}

