# Script para limpiar archivos duplicados del caso 04
$carpeta = "d:\SUNEDU\SELENIUM\playwrigth\tests\casos-prueba"
$archivoAntiguo = Join-Path $carpeta "04-reconsiderar-con-sanciones.spec.ts"
$archivoNuevo = Join-Path $carpeta "04-reconsiderar-con-sanciones-clean.spec.ts"

Write-Host "ðŸ” Verificando archivos..." -ForegroundColor Cyan
Write-Host "Archivo antiguo (894 lÃ­neas): $archivoAntiguo" -ForegroundColor Yellow
Write-Host "Archivo nuevo (291 lÃ­neas): $archivoNuevo" -ForegroundColor Green

if (Test-Path $archivoAntiguo) {
    Write-Host "`nðŸ—‘ï¸ Eliminando archivo antiguo..." -ForegroundColor Red
    Remove-Item $archivoAntiguo -Force
    Write-Host "âœ… Archivo antiguo eliminado" -ForegroundColor Green
} else {
    Write-Host "âš ï¸ Archivo antiguo no encontrado" -ForegroundColor Yellow
}

if (Test-Path $archivoNuevo) {
    Write-Host "`nðŸ“ Renombrando archivo nuevo..." -ForegroundColor Cyan
    Rename-Item $archivoNuevo -NewName "04-reconsiderar-con-sanciones.spec.ts" -Force
    Write-Host "âœ… Archivo renombrado correctamente" -ForegroundColor Green
} else {
    Write-Host "âŒ Archivo nuevo no encontrado" -ForegroundColor Red
}

Write-Host "`nâœ… Limpieza completada" -ForegroundColor Green
Write-Host "`nðŸ“‹ Script de ejecuciÃ³n:" -ForegroundColor Cyan
Write-Host "npm run test:04" -ForegroundColor Yellow

