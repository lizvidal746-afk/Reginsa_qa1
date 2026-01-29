# Script para abrir Allure Report
# Uso: .\abrir-allure.ps1

Write-Host ""
Write-Host "ðŸ“Š ABRIENDO ALLURE REPORT" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

cd "d:\SUNEDU\SELENIUM\playwrigth"

# Verificar si existen los datos de Allure
if (-not (Test-Path "allure-results")) {
    Write-Host ""
    Write-Host "âŒ ERROR: No hay datos de Allure" -ForegroundColor Red
    Write-Host ""
    Write-Host "Necesitas ejecutar primero:" -ForegroundColor Yellow
    Write-Host "  npm run test:01" -ForegroundColor Yellow
    Write-Host "  npm run test:02" -ForegroundColor Yellow
    Write-Host "  npm run test:all" -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host ""
Write-Host "ðŸ”„ Iniciando Allure en http://localhost:4050..." -ForegroundColor Green
Write-Host ""
Write-Host "Nota: Presiona Ctrl+C para detener" -ForegroundColor Yellow
Write-Host ""

allure serve allure-results

