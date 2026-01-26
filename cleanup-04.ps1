# Script para limpiar archivos duplicados del caso 04
$carpeta = "d:\SUNEDU\SELENIUM\playwrigth\tests\casos-prueba"
$archivoAntiguo = Join-Path $carpeta "04-reconsiderar-con-sanciones.spec.ts"
$archivoNuevo = Join-Path $carpeta "04-reconsiderar-con-sanciones-clean.spec.ts"

Write-Host "🔍 Verificando archivos..." -ForegroundColor Cyan
Write-Host "Archivo antiguo (894 líneas): $archivoAntiguo" -ForegroundColor Yellow
Write-Host "Archivo nuevo (291 líneas): $archivoNuevo" -ForegroundColor Green

if (Test-Path $archivoAntiguo) {
    Write-Host "`n🗑️ Eliminando archivo antiguo..." -ForegroundColor Red
    Remove-Item $archivoAntiguo -Force
    Write-Host "✅ Archivo antiguo eliminado" -ForegroundColor Green
} else {
    Write-Host "⚠️ Archivo antiguo no encontrado" -ForegroundColor Yellow
}

if (Test-Path $archivoNuevo) {
    Write-Host "`n📝 Renombrando archivo nuevo..." -ForegroundColor Cyan
    Rename-Item $archivoNuevo -NewName "04-reconsiderar-con-sanciones.spec.ts" -Force
    Write-Host "✅ Archivo renombrado correctamente" -ForegroundColor Green
} else {
    Write-Host "❌ Archivo nuevo no encontrado" -ForegroundColor Red
}

Write-Host "`n✅ Limpieza completada" -ForegroundColor Green
Write-Host "`n📋 Script de ejecución:" -ForegroundColor Cyan
Write-Host "npm run test:04" -ForegroundColor Yellow
