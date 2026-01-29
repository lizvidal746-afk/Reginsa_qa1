cd "d:\SUNEDU\SELENIUM\playwrigth"
Write-Host "ðŸ§¹ Limpiando reportes y datos..." -ForegroundColor Cyan
Write-Host ""

Remove-Item -Path allure-results -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path allure-report -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path playwright-report -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path test-results -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path screenshots -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path registros-administrados.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path reporte-administrados.html -Force -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "âœ… Limpieza completada" -ForegroundColor Green
Write-Host ""

