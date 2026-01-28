# Script de Limpieza - PowerShell
# Elige qué limpiar: TODO, CASO 01, o CASO 02

Write-Host ""
Write-Host "🧹 LIMPIADOR DE REPORTES Y DATOS" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1) Limpiar TODO (reportes, screenshots, datos)" -ForegroundColor Yellow
Write-Host "2) Limpiar CASO 01 solamente" -ForegroundColor Yellow
Write-Host "3) Limpiar CASO 02 solamente" -ForegroundColor Yellow
Write-Host "4) Salir" -ForegroundColor Yellow
Write-Host ""

$opcion = Read-Host "Elige opción (1-4)"

cd "d:\SUNEDU\SELENIUM\playwrigth"

switch ($opcion) {
    "1" {
        Write-Host ""
        Write-Host "🧹 Limpiando TODO..." -ForegroundColor Cyan
        Write-Host ""
        
        Remove-Item -Path allure-results -Recurse -Force -ErrorAction SilentlyContinue
        Remove-Item -Path allure-report -Recurse -Force -ErrorAction SilentlyContinue
        Remove-Item -Path playwright-report -Recurse -Force -ErrorAction SilentlyContinue
        Remove-Item -Path test-results -Recurse -Force -ErrorAction SilentlyContinue
        Remove-Item -Path screenshots -Recurse -Force -ErrorAction SilentlyContinue
        Remove-Item -Path registros-administrados.json -Force -ErrorAction SilentlyContinue
        Remove-Item -Path reporte-administrados.html -Force -ErrorAction SilentlyContinue
        
        Write-Host ""
        Write-Host "✅ Todo limpiado correctamente" -ForegroundColor Green
        Write-Host ""
    }
    "2" {
        Write-Host ""
        Write-Host "🧹 Limpiando CASO 01..." -ForegroundColor Cyan
        Write-Host ""
        
        Get-ChildItem -Path screenshots -Filter "01-*.png" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
        
        Write-Host ""
        Write-Host "✅ Caso 01 limpiado" -ForegroundColor Green
        Write-Host ""
    }
    "3" {
        Write-Host ""
        Write-Host "🧹 Limpiando CASO 02..." -ForegroundColor Cyan
        Write-Host ""
        
        Get-ChildItem -Path screenshots -Filter "02-*.png" -ErrorAction SilentlyContinue | Remove-Item -Force -ErrorAction SilentlyContinue
        
        Write-Host ""
        Write-Host "✅ Caso 02 limpiado" -ForegroundColor Green
        Write-Host ""
    }
    "4" {
        Write-Host ""
        Write-Host "Saliendo..." -ForegroundColor Yellow
        Write-Host ""
        exit
    }
    default {
        Write-Host ""
        Write-Host "❌ Opción inválida" -ForegroundColor Red
        Write-Host ""
    }
}
