$ErrorActionPreference = "Stop"
$root = "D:\SUNEDU\SELENIUM\playwrigth"
$docs = Join-Path $root "docs"
$legacy = Join-Path $docs "legacy"
$scriptsRoot = Join-Path $docs "scripts"

New-Item -ItemType Directory -Force -Path $legacy | Out-Null
New-Item -ItemType Directory -Force -Path $scriptsRoot | Out-Null

# 1) Quitar wrappers de scripts en raÃ­z o mover si no existen en docs/scripts
Get-ChildItem -Path $root -File -Include *.bat,*.ps1,*.sh | ForEach-Object {
  $name = $_.Name
  $match = Get-ChildItem -Path $scriptsRoot -Recurse -File -Filter $name -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($match) {
    Remove-Item -Path $_.FullName -Force
  } else {
    $destDir = Join-Path $scriptsRoot "utilidades"
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Move-Item -Path $_.FullName -Destination (Join-Path $destDir $name) -Force
  }
}

# 2) Mover .md fuera de docs/ a docs/legacy (excepto README.md)
Get-ChildItem -Path $root -Filter *.md -File | Where-Object { $_.Name -ne "README.md" } | ForEach-Object {
  Move-Item -Path $_.FullName -Destination (Join-Path $legacy $_.Name) -Force
}

Write-Host "âœ… Limpieza aplicada: scripts fuera de raÃ­z y md movidos a docs/legacy" -ForegroundColor Green


