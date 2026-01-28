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
}

foreach ($name in $map.Keys) {
  $src = Join-Path $root $name
  if (-not (Test-Path $src)) { continue }

  $sub = $map[$name]
  $destDir = Join-Path $docsScripts $sub
  New-Item -ItemType Directory -Force -Path $destDir | Out-Null

  $dest = Join-Path $destDir $name
  Move-Item -Path $src -Destination $dest -Force
}
Write-Host "✅ Scripts organizados en docs/scripts" -ForegroundColor Green
