param(
  [string]$Case = '01',
  [int]$Workers = 0,
  [int]$Repeat = 0
)

$ErrorActionPreference = 'Stop'

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Ejecutando Caso $Case" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "" 

$extra = @()
if ($Workers -gt 0) { $extra += "--workers=$Workers" }
if ($Repeat -gt 0) { $extra += "--repeat-each=$Repeat" }

if ($extra.Count -eq 0) {
  & npm run ("test:$Case")
} else {
  & npm run ("test:$Case") -- @extra
}

Write-Host "" 
Write-Host "==========================================" -ForegroundColor Green
Write-Host "Test completado" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
