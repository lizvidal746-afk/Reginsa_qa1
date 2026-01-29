$ErrorActionPreference = "Stop"
$root = "D:\SUNEDU\SELENIUM\playwrigth"
$docsScripts = Join-Path $root "docs\scripts"
New-Item -ItemType Directory -Force -Path $docsScripts | Out-Null

$map = @{
  "abrir-allure.bat" = "reportes";
  "abrir-allure.ps1" = "reportes";
  "view-reports.bat" = "reportes";
  "view-reports.sh" = "reportes";

  "limpiar.ps1" = "limpieza";
  "limpiar.bat" = "limpieza";
  "limpiar-todo.ps1" = "limpieza";
  "limpiar-todo.bat" = "limpieza";
  "limpiar-datos.bat" = "limpieza";
  "limpiar-caso-01.bat" = "limpieza";
  "limpiar-y-ejecutar-todos.bat" = "limpieza";
  "limpiar-y-ejecutar-caso-02.bat" = "limpieza";

  "ejecutar-caso-01.bat" = "caso-01";

  "ejecutar-caso-02.bat" = "caso-02";
  "ejecutar-test-02.bat" = "caso-02";
  "ejecutar-test-02.ps1" = "caso-02";
  "ejecutar-test-02-v2.bat" = "caso-02";
  "ejecutar-test-02-v2.ps1" = "caso-02";
  "run-test-02.bat" = "caso-02";
  "run-test-02.ps1" = "caso-02";
  "run-test-02.sh" = "caso-02";
  "run-test-02-clean.sh" = "caso-02";
  "test-02.bat" = "caso-02";
  "consolidar-caso-02.bat" = "caso-02";

  "validar-caso-04.bat" = "caso-04";
  "cleanup-04.bat" = "caso-04";
  "cleanup-04.ps1" = "caso-04";
  "cleanup-04-temp.bat" = "caso-04";

  "ejecutar-todo.bat" = "ejecucion";
  "ejecutar-todos-casos.bat" = "ejecucion";
  "ejecutar-test-con-reporte.bat" = "ejecucion";
  "run-test.bat" = "ejecucion";
  "run-test.sh" = "ejecucion";
  "run-test-v2-now.bat" = "ejecucion";
  "run-tests-full.bat" = "ejecucion";
  "run-tests-full.ps1" = "ejecucion";
  "run-tests-full-new.ps1" = "ejecucion";

  "recorder.bat" = "utilidades";
  "validar-sintaxis.sh" = "utilidades";
  "RESUMEN_VISUAL.sh" = "utilidades";
  "delete-debug.ps1" = "utilidades";
  "delete-duplicate.ps1" = "utilidades";
  "mover-docs.ps1" = "utilidades";
  "wait-test.bat" = "utilidades";
  "organizar-scripts.ps1" = "utilidades";
  "mover-legacy-md.ps1" = "utilidades";
  "marcar-duplicados.ps1" = "utilidades";
  "limpiar-raiz.ps1" = "utilidades";
}

function Get-Hash($path) {
  (Get-FileHash -Path $path -Algorithm SHA256).Hash
}

# Mover scripts desde raÃ­z a docs/scripts y eliminar duplicados por contenido
Get-ChildItem -Path $root -File -Include *.bat,*.ps1,*.sh | ForEach-Object {
  $name = $_.Name
  $sub = $map[$name]
  if (-not $sub) { $sub = "utilidades" }

  $destDir = Join-Path $docsScripts $sub
  New-Item -ItemType Directory -Force -Path $destDir | Out-Null
  $dest = Join-Path $destDir $name

  if (Test-Path $dest) {
    $h1 = Get-Hash $_.FullName
    $h2 = Get-Hash $dest
    if ($h1 -eq $h2) {
      Remove-Item -Path $_.FullName -Force
      return
    }
  }

  Move-Item -Path $_.FullName -Destination $dest -Force
}

Write-Host "âœ… Scripts movidos a docs/scripts y duplicados eliminados" -ForegroundColor Green


