$ErrorActionPreference = "Stop"
$root = "D:\SUNEDU\SELENIUM\playwrigth"
$docs = Join-Path $root "docs"
$legacy = Join-Path $docs "legacy"

New-Item -ItemType Directory -Force -Path $legacy | Out-Null

Get-ChildItem -Path $root -Filter *.md -File | Where-Object { $_.Name -ne "README.md" } | ForEach-Object {
  Move-Item -Path $_.FullName -Destination (Join-Path $legacy $_.Name) -Force
}

Write-Host "✅ Todos los .md fuera de docs se movieron a docs/legacy" -ForegroundColor Green
