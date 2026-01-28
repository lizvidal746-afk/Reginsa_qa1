$ErrorActionPreference = "Stop"
$root = "D:\SUNEDU\SELENIUM\playwrigth"
$docs = Join-Path $root "docs"
$legacy = Join-Path $docs "legacy"
$scripts = Join-Path $docs "scripts"

# Solo considera .md fuera de docs/ y docs/legacy
$targets = Get-ChildItem -Path $root -Recurse -Filter *.md -File | Where-Object {
  $_.FullName -notlike "$docs*" -and $_.FullName -notlike "$legacy*" -and $_.FullName -notlike "$scripts*" -and $_.Name -ne "README.md"
}

# Hashes de docs + legacy
$docsFiles = Get-ChildItem -Path $docs -Recurse -Filter *.md -File
$hashIndex = @{}
foreach ($f in $docsFiles) {
  $hash = (Get-FileHash -Path $f.FullName -Algorithm SHA256).Hash
  if (-not $hashIndex.ContainsKey($hash)) {
    $hashIndex[$hash] = @()
  }
  $hashIndex[$hash] += $f.FullName
}

$renamed = @()
foreach ($f in $targets) {
  $hash = (Get-FileHash -Path $f.FullName -Algorithm SHA256).Hash
  if ($hashIndex.ContainsKey($hash)) {
    $newName = "ELIMINAR_" + $f.Name
    $newPath = Join-Path $f.DirectoryName $newName
    if (-not (Test-Path $newPath)) {
      Rename-Item -Path $f.FullName -NewName $newName
      $renamed += $newPath
    }
  }
}

if ($renamed.Count -gt 0) {
  Write-Host "✅ Marcados para eliminar:" -ForegroundColor Yellow
  $renamed | ForEach-Object { Write-Host " - $_" }
} else {
  Write-Host "✅ No se encontraron duplicados fuera de docs/" -ForegroundColor Green
}
