$ErrorActionPreference = "Stop"
$root = "D:\SUNEDU\SELENIUM\playwrigth"
$docs = Join-Path $root "docs"
$legacy = Join-Path $docs "legacy"

New-Item -ItemType Directory -Force -Path $docs | Out-Null
New-Item -ItemType Directory -Force -Path $legacy | Out-Null

# Documentos Ãºtiles que deben quedar en docs/
$activos = @(
  "ARBOL_PROYECTO.md",
  "ARQUITECTURA_REUTILIZACION.md",
  "GUIA_REPORTES.md",
  "ALLURE_GUIA_COMPLETA.md",
  "ALLURE_COMANDOS_RAPIDOS.md",
  "ALLURE_LISTO.md",
  "ALLURE_NO_APARECE_SOLUCION.md",
  "LIMPIAR_TODO.md",
  "LIMPIAR_POR_TERMINAL.md",
  "GUIA_EJECUCION.md",
  "GUIA_LIMPIAR_Y_EJECUTAR.md",
  "GUIA_CAPTURA_PANTALLA.md",
  "RECORDER_PLAYWRIGHT.md",
  "HEADLESS_MODE.md",
  "INICIO_RAPIDO.md",
  "PLANTILLA_NUEVOS_CASOS.md",
  "PUNTO_ENTRADA_TESTS.md",
  "COMANDOS_LIMPIAR_RAPIDOS.md",
  "COMANDOS_EJECUCION.md",
  "COMANDOS_POR_TERMINAL.md",
  "COMANDOS_LISTOS.md"
)

# Mover .md del root (excepto README.md) a docs o docs/legacy
Get-ChildItem -Path $root -Filter *.md -File | ForEach-Object {
  if ($_.Name -eq "README.md") { return }
  if ($activos -contains $_.Name) {
    Move-Item -Path $_.FullName -Destination (Join-Path $docs $_.Name) -Force
  } else {
    Move-Item -Path $_.FullName -Destination (Join-Path $legacy $_.Name) -Force
  }
}

Write-Host "âœ… DocumentaciÃ³n organizada: activos en docs/ y redundantes en docs/legacy" -ForegroundColor Green


