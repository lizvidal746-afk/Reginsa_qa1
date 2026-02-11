# 🧹 LIMPIAR DATOS Y REPORTES

## 🎯 RESUMEN RÁPIDO

| Necesitas | Terminal | Comando |
|-----------|----------|---------|
| **Limpiar CASO 01** | PowerShell | Ver abajo → "Limpiar Caso 01" |
| **Limpiar CASO 02** | PowerShell | Ver abajo → "Limpiar Caso 02" |
| **Limpiar TODO** | PowerShell | Ver abajo → "Limpiar TODO" |
| **Usar script** | CMD | Ejecuta: `scripts\limpieza\limpiar-todo.bat` |

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
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, errors, reportes\registros-administrados.json, reportes\administrados-registrados.json, reportes\administrados-reservados.json, reportes\administrados-reservados.lock, reportes\reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue; Write-Host "✅ Todo limpiado"
```

### 🔴 OPCIÓN B: PowerShell (paso a paso)
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path allure-results -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path allure-report -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path playwright-report -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path test-results -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path screenshots -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path errors -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path reportes\registros-administrados.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path reportes\administrados-registrados.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path reportes\administrados-reservados.json -Force -ErrorAction SilentlyContinue
Remove-Item -Path reportes\administrados-reservados.lock -Force -ErrorAction SilentlyContinue
Remove-Item -Path reportes\reporte-administrados.html -Force -ErrorAction SilentlyContinue
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
rmdir /s /q errors 2>nul
del /q reportes\registros-administrados.json 2>nul
del /q reportes\administrados-registrados.json 2>nul
del /q reportes\administrados-reservados.json 2>nul
del /q reportes\administrados-reservados.lock 2>nul
del /q reportes\reporte-administrados.html 2>nul
echo ✅ Todo limpiado
```

### 🔴 OPCIÓN D: Script BAT (más fácil)
```cmd
scripts\limpieza\limpiar-todo.bat
```

### 🔴 OPCIÓN E: Bash
```bash
cd "d:/SUNEDU/SELENIUM/playwrigth"
rm -rf allure-results allure-report playwright-report test-results screenshots errors reportes/registros-administrados.json reportes/administrados-registrados.json reportes/administrados-reservados.json reportes/administrados-reservados.lock reportes/reporte-administrados.html
echo "✅ Todo limpiado"
```

---

## 📊 QUÉ SE ELIMINA

| Carpeta/Archivo | Contiene |
|-----------------|----------|
| `allure-results/` | Datos de Allure (todos los casos) |
| `allure-report/` | Reporte de Allure generado |
| `playwright-report/` | Reporte de Playwright (todos los casos) |
| `test-results/` | Resultados tÃ©cnicos |
| `screenshots/` | TODAS las screenshots |
| `errors/` | Screenshots de errores |
| `reportes/registros-administrados.json` | Datos de administrados registrados |
| `reportes/administrados-registrados.json` | Base local de administrados |
| `reportes/administrados-reservados.json` | Reservas para workers |
| `reportes/administrados-reservados.lock` | Lock de reservas |
| `reportes/reporte-administrados.html` | Reporte HTML |

---

## 🔄 CICLOS TÍPICOS

### Ciclo 1: LIMPIAR TODO + EJECUTAR TODOS
```powershell
# Terminal 1 - Limpiar y ejecutar
cd "d:\SUNEDU\SELENIUM\playwrigth"
Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, errors, reportes\registros-administrados.json, reportes\administrados-registrados.json, reportes\administrados-reservados.json, reportes\administrados-reservados.lock, reportes\reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue
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

**Usa la OPCION D:** `scripts\limpieza\limpiar-todo.bat`

Es más fácil: solo dobla clic en el archivo y listo.


