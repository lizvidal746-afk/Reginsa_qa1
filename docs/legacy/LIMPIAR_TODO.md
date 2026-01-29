# âš ï¸ Documento movido

Este archivo fue movido a [docs/LIMPIAR_TODO.md](docs/LIMPIAR_TODO.md).

# ðŸ§¹ LIMPIAR DATOS Y REPORTES

## ðŸŽ¯ RESUMEN RÃPIDO

| Necesitas | Terminal | Comando |
|-----------|----------|---------|
| **Limpiar CASO 01** | PowerShell | Ver abajo â†’ "Limpiar Caso 01" |
| **Limpiar CASO 02** | PowerShell | Ver abajo â†’ "Limpiar Caso 02" |
| **Limpiar TODO** | PowerShell | Ver abajo â†’ "Limpiar TODO" |
| **Usar script** | CMD | Ejecuta: `limpiar-todo.bat` |

---

## ðŸ§¹ LIMPIAR CASO 01 SOLAMENTE

### PowerShell:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path screenshots/01-*.png -Force -ErrorAction SilentlyContinue
Write-Host "âœ… Caso 01 limpiado"
```

### CMD:
```cmd
cd D:\SUNEDU\SELENIUM\playwrigth
del /q screenshots\01-*.png
echo âœ… Caso 01 limpiado
```

---

## ðŸ§¹ LIMPIAR CASO 02 SOLAMENTE

### PowerShell:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path screenshots/02-*.png -Force -ErrorAction SilentlyContinue
Write-Host "âœ… Caso 02 limpiado"
```

### CMD:
```cmd
cd D:\SUNEDU\SELENIUM\playwrigth
del /q screenshots\02-*.png
echo âœ… Caso 02 limpiado
```

---

## ðŸ§¹ LIMPIAR TODO (OPCIÃ“N RECOMENDADA)

### ðŸ”´ OPCIÃ“N A: PowerShell (1 lÃ­nea)
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue; Write-Host "âœ… Todo limpiado"
```

### ðŸ”´ OPCIÃ“N B: PowerShell (paso a paso)
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path allure-results -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path allure-report -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path playwright-report -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path test-results -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path screenshots -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path registros-administrados.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path reporte-administrados.html -Force -ErrorAction SilentlyContinue
Write-Host "âœ… Todo limpiado"
```

### ðŸ”´ OPCIÃ“N C: CMD
```cmd
cd D:\SUNEDU\SELENIUM\playwrigth
rmdir /s /q allure-results 2>nul
rmdir /s /q allure-report 2>nul
rmdir /s /q playwright-report 2>nul
rmdir /s /q test-results 2>nul
rmdir /s /q screenshots 2>nul
del /q registros-administrados.json 2>nul
del /q reporte-administrados.html 2>nul
echo âœ… Todo limpiado
```

### ðŸ”´ OPCIÃ“N D: Script BAT (mÃ¡s fÃ¡cil)
```cmd
limpiar-todo.bat
```

### ðŸ”´ OPCIÃ“N E: Bash
```bash
cd "d:/SUNEDU/SELENIUM/playwrigth"
rm -rf allure-results allure-report playwright-report test-results screenshots registros-administrados.json reporte-administrados.html
echo "âœ… Todo limpiado"
```

---

## ðŸ“Š QUÃ‰ SE ELIMINA

| Carpeta/Archivo | Contiene |
|-----------------|----------|
| `allure-results/` | Datos de Allure (todos los casos) |
| `allure-report/` | Reporte de Allure generado |
| `playwright-report/` | Reporte de Playwright (todos los casos) |
| `test-results/` | Resultados tÃ©cnicos |
| `screenshots/` | TODAS las screenshots |
| `registros-administrados.json` | Datos de administrados registrados |
| `reporte-administrados.html` | Reporte HTML |

---

## ðŸ”„ CICLOS TÃPICOS

### Ciclo 1: LIMPIAR TODO + EJECUTAR TODOS
```powershell
# Terminal 1 - Limpiar y ejecutar
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue
npm run test:all

# Terminal 2 - Ver Allure (despuÃ©s que termine)
allure serve allure-results
```

### Ciclo 2: LIMPIAR CASO 01 + EJECUTAR CASO 01
```powershell
# Terminal 1 - Limpiar screenshots de Caso 01
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path screenshots/01-*.png -Force -ErrorAction SilentlyContinue

# Ejecutar Caso 01
npm run test:01
```

### Ciclo 3: LIMPIAR CASO 02 + EJECUTAR CASO 02
```powershell
# Terminal 1 - Limpiar screenshots de Caso 02
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path screenshots/02-*.png -Force -ErrorAction SilentlyContinue

# Ejecutar Caso 02
npm run test:02
```

---

## âœ… CHECKLIST ANTES DE LIMPIAR

- [ ] Cierra navegadores (Playwright, Allure)
- [ ] Cierra terminales con `allure serve` o `npm run test`
- [ ] Cierra cualquier terminal con pruebas activas
- [ ] Ejecuta el comando de limpieza
- [ ] Listo para nuevas pruebas

---

## ðŸ’¡ RECOMENDACIÃ“N

**Usa la OPCIÃ“N D:** `limpiar-todo.bat`

Es mÃ¡s fÃ¡cil: solo dobla clic en el archivo y listo.


