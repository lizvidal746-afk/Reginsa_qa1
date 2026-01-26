# Script para ejecutar Test 02 - Registrar Sanción
Clear-Host
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  EJECUTANDO TEST CASO 02" -ForegroundColor Cyan
Write-Host "  REGISTRAR SANCIÓN" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Set-Location (Split-Path -Parent $MyInvocation.MyCommand.Path)
npm run test:caso-02

Write-Host ""
Write-Host "Presiona Enter para cerrar..." -ForegroundColor Yellow
Read-Host
