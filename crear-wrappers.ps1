$ErrorActionPreference = "Stop"
$root = "D:\SUNEDU\SELENIUM\playwrigth"
$docsScripts = Join-Path $root "docs\scripts"

function Get-Descripcion($subdir, $name) {
  switch ($subdir) {
    "caso-01" { return "Wrapper para ejecutar scripts del Caso 01 (Agregar Administrado)." }
    "caso-02" { return "Wrapper para ejecutar scripts del Caso 02 (Registrar SanciÃ³n)." }
    "caso-04" { return "Wrapper para ejecutar scripts del Caso 04 (Reconsiderar con sanciones)." }
    "ejecucion" { return "Wrapper para ejecuciÃ³n general de pruebas." }
    "limpieza" { return "Wrapper para limpieza de reportes/datos." }
    "reportes" { return "Wrapper para abrir/ver reportes." }
    "utilidades" { return "Wrapper de utilidades/soporte." }
    default { return "Wrapper de script." }
  }
}

Get-ChildItem -Path $docsScripts -Recurse -File | Where-Object { $_.Extension -in ".bat", ".ps1", ".sh" } | ForEach-Object {
  $subdir = $_.Directory.Name
  $relativeTarget = "docs\scripts\$subdir\$($_.Name)"
  $wrapperPath = Join-Path $root $_.Name
  $descripcion = Get-Descripcion $subdir $_.Name

  switch ($_.Extension.ToLower()) {
    ".bat" {
      $content = "@echo off`r`n" +
        "REM $descripcion`r`n" +
        "REM Script real: $relativeTarget`r`n" +
        "call `"%~dp0$relativeTarget`"`r`n"
      Set-Content -Path $wrapperPath -Value $content -Encoding ASCII
    }
    ".ps1" {
      $content = "# $descripcion`n# Script real: $relativeTarget`n" +
        "`$ErrorActionPreference = 'Stop'`n& `"`$PSScriptRoot\$relativeTarget`"`n"
      Set-Content -Path $wrapperPath -Value $content -Encoding UTF8
    }
    ".sh" {
      $content = "#!/usr/bin/env bash`n" +
        "# $descripcion`n# Script real: $relativeTarget`n" +
        'bash "$(dirname "$0")/' + $relativeTarget + '"' + "`n"
      Set-Content -Path $wrapperPath -Value $content -Encoding UTF8
    }
  }
}

Write-Host "âœ… Wrappers creados en la raÃ­z con descripciÃ³n" -ForegroundColor Green


