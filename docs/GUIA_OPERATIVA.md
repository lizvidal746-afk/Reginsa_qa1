# ðŸ§­ GuÃ­a Operativa (EjecuciÃ³n, Limpieza y Reportes)

## âœ… EjecuciÃ³n rÃ¡pida
### OpciÃ³n recomendada (PowerShell)
```powershell
npm run test:all
```

### Casos individuales
```powershell
npm run test:01
npm run test:02
npm run test:03
npm run test:04
```

### Ver ejecuciÃ³n en vivo (UI Mode)
```powershell
npx playwright test --ui
```

### URLs Ãºtiles
- Playwright Report: http://localhost:9323
- Allure Report: http://localhost:4050
- Playwright UI: http://localhost:6500

---

## ðŸ§¹ Limpieza
### Limpieza total
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue; Write-Host "âœ… Todo limpiado"
```

### Limpieza por caso
```powershell
Remove-Item -Path screenshots/01-*.png -Force -ErrorAction SilentlyContinue
Remove-Item -Path screenshots/02-*.png -Force -ErrorAction SilentlyContinue
```

### OpciÃ³n mÃ¡s simple
- Script interactivo: `limpiar-todo.bat` (doble clic)

---

## ðŸ“Š Reportes
### Playwright
```powershell
npm run report:playwright
```

### Allure
```powershell
npm run report:allure:generate
npm run report:allure:open
```

### Abrir ambos automÃ¡ticamente
```powershell
npm run reports:open
```

### Allure rÃ¡pido (sin generar explÃ­cito)
```powershell
allure serve allure-results
```

---

## ðŸ”„ Secuencias recomendadas
### Ejecutar + ver reportes
```powershell
npm run test:01
allure serve allure-results
```

### Ejecutar todo con limpieza previa
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue; npm run test:all
```

---

## âœ… Checklist de ejecuciÃ³n
- [ ] Cerrar browsers abiertos
- [ ] Limpiar si aplica
- [ ] Ejecutar caso(s)
- [ ] Abrir reportes

