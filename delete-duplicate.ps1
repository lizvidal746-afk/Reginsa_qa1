$path = "D:\SUNEDU\SELENIUM\playwrigth\tests\casos-prueba\test-2.spec.ts"
if (Test-Path $path) {
    Remove-Item $path -Force
    Write-Host "✅ Archivo eliminado: $path"
} else {
    Write-Host "❌ Archivo no encontrado: $path"
}
