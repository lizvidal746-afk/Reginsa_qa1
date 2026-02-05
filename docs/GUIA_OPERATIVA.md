# 🧭 Guía Operativa (Ejecución, Limpieza y Reportes)

## ✅ Ejecución rápida
> **Headless por defecto**: los scripts ejecutan sin ventana visible. Para ver navegador, agrega `--headed`.
> **Capturas por defecto**: los scripts normales generan capturas; los `:fast` las omiten.

### OpciÃ³n recomendada (PowerShell)
```powershell
npm run test:all   # Suite completa (Chromium, 1 worker)
```

### Casos individuales
```powershell
npm run test:01   # Caso 01 (Chromium, 1 worker)
npm run test:02   # Caso 02 (Chromium, 1 worker)
npm run test:03   # Caso 03 (Chromium, 1 worker)
npm run test:04   # Caso 04 (Chromium, 1 worker)
npm run test:05   # Caso 05 (Listar administrados, utilidad opcional)
```

> Para ejecutar el Caso 05 debes activar `RUN_ADMIN_CHECK=1`.

### Subconjuntos listos
```powershell
npm run test:123       # Casos 01 + 02 + 03 (Chromium)
npm run test:124       # Casos 01 + 02 + 04 (Chromium)
npm run test:134       # Casos 01 + 03 + 04 (Chromium)
npm run test:123:fast  # Igual sin capturas
npm run test:124:fast  # Igual sin capturas
npm run test:134:fast  # Igual sin capturas
```

### Casos rápidos sin capturas
```powershell
npm run test:01:fast   # Caso 01 sin capturas
npm run test:02:fast   # Caso 02 sin capturas
npm run test:03:fast   # Caso 03 sin capturas
npm run test:04:fast   # Caso 04 sin capturas
npm run test:all:fast  # Suite completa sin capturas
```

### Casos rápidos con repeat-each (sin capturas)
```powershell
npm run test:01:fast -- --repeat-each=10   # Caso 01, 10 repeticiones
npm run test:02:fast -- --repeat-each=10   # Caso 02, 10 repeticiones
npm run test:03:fast -- --repeat-each=10   # Caso 03, 10 repeticiones
npm run test:04:fast -- --repeat-each=10   # Caso 04, 10 repeticiones
npm run test:all:fast -- --repeat-each=10  # Suite completa, 10 repeticiones
```

### Paralelismo con workers (mismo equipo)
> **Workers** = paralelismo dentro de la misma PC (división automática por tests).
```powershell
npm run test:all:w2   # Suite completa con 2 workers (Chromium)
npm run test:all:w4   # Suite completa con 4 workers (Chromium)
```

### Workers + repeat-each (paralelismo con repeticiones)
```powershell
npm run test:01:fast -- --workers=3 --repeat-each=10    # Caso 01, 3 workers, 10 repeticiones
npm run test:02:fast -- --workers=3 --repeat-each=10    # Caso 02, 3 workers, 10 repeticiones
npm run test:124:fast -- --workers=3 --repeat-each=10   # Casos 01+02+04, 3 workers, 10 repeticiones
npm run test:all:fast -- --workers=3 --repeat-each=10   # Suite completa, 3 workers, 10 repeticiones
```

> `test:all:w2` ejecuta **todos los casos** en paralelo (Chromium).

### Shards (dividir la suite en partes)
> **Shards** = dividir la suite y ejecutar cada parte por separado.
```powershell
npm run test:all:shard-1of2   # Parte 1/2 (Chromium)
npm run test:all:shard-2of2   # Parte 2/2 (Chromium)
npm run test:all:shard-1of2:fast  # Parte 1/2 sin capturas
npm run test:all:shard-2of2:fast  # Parte 2/2 sin capturas
npm run test:all:shard-1of4   # Parte 1/4 (Chromium)
npm run test:all:shard-2of4   # Parte 2/4 (Chromium)
npm run test:all:shard-3of4   # Parte 3/4 (Chromium)
npm run test:all:shard-4of4   # Parte 4/4 (Chromium)
npm run test:all:shard-1of4:fast  # Parte 1/4 sin capturas
npm run test:all:shard-2of4:fast  # Parte 2/4 sin capturas
npm run test:all:shard-3of4:fast  # Parte 3/4 sin capturas
npm run test:all:shard-4of4:fast  # Parte 4/4 sin capturas
```

### Multinavegador (Chromium + Firefox)
```powershell
npm run test:all:cf       # Suite completa en Chromium y Firefox
npm run test:all:cf:fast  # Igual que arriba, sin capturas
npm run test:all:cf:w2     # Chromium + Firefox con 2 workers
npm run test:all:cf:w4     # Chromium + Firefox con 4 workers
npm run test:all:cf:w2:fast  # Chromium + Firefox, 2 workers, sin capturas
npm run test:all:cf:w4:fast  # Chromium + Firefox, 4 workers, sin capturas
```

### Workers + Shards (combinación)
> Se combinan agregando `--workers=N` a un shard.
```powershell
npm run test:all:shard-1of2 -- --workers=2
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

## 🧹 Limpieza
### Limpieza total
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, errors, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue; Write-Host "✅ Todo limpiado"
```

### Limpieza por caso
```powershell
Remove-Item -Path screenshots/01-*.png -Force -ErrorAction SilentlyContinue
Remove-Item -Path screenshots/02-*.png -Force -ErrorAction SilentlyContinue
Remove-Item -Path errors -Recurse -Force -ErrorAction SilentlyContinue
```

### OpciÃ³n mÃ¡s simple
- Script interactivo: `limpiar-todo.bat` (doble clic)

---

## 📊 Reportes
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

## 🔄 Secuencias recomendadas
### Ejecutar + ver reportes
```powershell
npm run test:01
allure serve allure-results
```

### Ejecutar todo con limpieza previa
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, errors, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue; npm run test:all
```

---

## ✅ Checklist de ejecución
- [ ] Cerrar browsers abiertos
- [ ] Limpiar si aplica
- [ ] Ejecutar caso(s)
- [ ] Abrir reportes

