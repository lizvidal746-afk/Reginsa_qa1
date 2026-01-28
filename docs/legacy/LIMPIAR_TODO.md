# ⚠️ Documento movido

Este archivo fue movido a [docs/LIMPIAR_TODO.md](docs/LIMPIAR_TODO.md).

# 🧹 LIMPIAR DATOS Y REPORTES

## 🎯 RESUMEN RÁPIDO

| Necesitas | Terminal | Comando |
|-----------|----------|---------|
| **Limpiar CASO 01** | PowerShell | Ver abajo → "Limpiar Caso 01" |
| **Limpiar CASO 02** | PowerShell | Ver abajo → "Limpiar Caso 02" |
| **Limpiar TODO** | PowerShell | Ver abajo → "Limpiar TODO" |
| **Usar script** | CMD | Ejecuta: `limpiar-todo.bat` |

---

## 🧹 LIMPIAR CASO 01 SOLAMENTE

### PowerShell:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path screenshots/01-*.png -Force -ErrorAction SilentlyContinue
Write-Host "✅ Caso 01 limpiado"
```

### CMD:
```cmd
cd D:\SUNEDU\SELENIUM\playwrigth
del /q screenshots\01-*.png
echo ✅ Caso 01 limpiado
```

---

## 🧹 LIMPIAR CASO 02 SOLAMENTE

### PowerShell:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path screenshots/02-*.png -Force -ErrorAction SilentlyContinue
Write-Host "✅ Caso 02 limpiado"
```

### CMD:
```cmd
cd D:\SUNEDU\SELENIUM\playwrigth
del /q screenshots\02-*.png
echo ✅ Caso 02 limpiado
```

---

## 🧹 LIMPIAR TODO (OPCIÓN RECOMENDADA)

### 🔴 OPCIÓN A: PowerShell (1 línea)
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue; Write-Host "✅ Todo limpiado"
```

### 🔴 OPCIÓN B: PowerShell (paso a paso)
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path allure-results -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path allure-report -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path playwright-report -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path test-results -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path screenshots -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path registros-administrados.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path reporte-administrados.html -Force -ErrorAction SilentlyContinue
Write-Host "✅ Todo limpiado"
```

### 🔴 OPCIÓN C: CMD
```cmd
cd D:\SUNEDU\SELENIUM\playwrigth
rmdir /s /q allure-results 2>nul
rmdir /s /q allure-report 2>nul
rmdir /s /q playwright-report 2>nul
rmdir /s /q test-results 2>nul
rmdir /s /q screenshots 2>nul
del /q registros-administrados.json 2>nul
del /q reporte-administrados.html 2>nul
echo ✅ Todo limpiado
```

### 🔴 OPCIÓN D: Script BAT (más fácil)
```cmd
limpiar-todo.bat
```

### 🔴 OPCIÓN E: Bash
```bash
cd "d:/SUNEDU/SELENIUM/playwrigth"
rm -rf allure-results allure-report playwright-report test-results screenshots registros-administrados.json reporte-administrados.html
echo "✅ Todo limpiado"
```

---

## 📊 QUÉ SE ELIMINA

| Carpeta/Archivo | Contiene |
|-----------------|----------|
| `allure-results/` | Datos de Allure (todos los casos) |
| `allure-report/` | Reporte de Allure generado |
| `playwright-report/` | Reporte de Playwright (todos los casos) |
| `test-results/` | Resultados técnicos |
| `screenshots/` | TODAS las screenshots |
| `registros-administrados.json` | Datos de administrados registrados |
| `reporte-administrados.html` | Reporte HTML |

---

## 🔄 CICLOS TÍPICOS

### Ciclo 1: LIMPIAR TODO + EJECUTAR TODOS
```powershell
# Terminal 1 - Limpiar y ejecutar
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue
npm run test:all

# Terminal 2 - Ver Allure (después que termine)
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

## ✅ CHECKLIST ANTES DE LIMPIAR

- [ ] Cierra navegadores (Playwright, Allure)
- [ ] Cierra terminales con `allure serve` o `npm run test`
- [ ] Cierra cualquier terminal con pruebas activas
- [ ] Ejecuta el comando de limpieza
- [ ] Listo para nuevas pruebas

---

## 💡 RECOMENDACIÓN

**Usa la OPCIÓN D:** `limpiar-todo.bat`

Es más fácil: solo dobla clic en el archivo y listo.
