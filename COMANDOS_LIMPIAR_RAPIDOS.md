# ⚡ COMANDOS RÁPIDOS DE LIMPIEZA

## 🎯 SIN PENSAR - SOLO COPIA Y PEGA

### PowerShell - Limpiar TODO (1 línea):
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue; Write-Host "✅ Todo limpiado"
```

### PowerShell - Limpiar solo Caso 01:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path screenshots/01-*.png -Force -ErrorAction SilentlyContinue; Write-Host "✅ Caso 01 limpiado"
```

### PowerShell - Limpiar solo Caso 02:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path screenshots/02-*.png -Force -ErrorAction SilentlyContinue; Write-Host "✅ Caso 02 limpiado"
```

---

## 🎯 CON SCRIPT (MÁS FÁCIL)

### Opción A: Dobla clic en archivo
```
limpiar-todo.bat        ← Para CMD (más recomendado)
```

### Opción B: PowerShell
```powershell
.\limpiar-todo.ps1
```

---

## 📋 TABLA RÁPIDA

| Necesitas | Comando/Acción |
|-----------|----------------|
| Limpiar TODO rápido | `cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue` |
| Limpiar TODO (script) | Dobla clic: `limpiar-todo.bat` |
| Limpiar Caso 01 | `cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path screenshots/01-*.png -Force -ErrorAction SilentlyContinue` |
| Limpiar Caso 02 | `cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path screenshots/02-*.png -Force -ErrorAction SilentlyContinue` |

---

## 🚀 CICLOS TÍPICOS

### Ciclo A: Limpiar TODO + Ejecutar TODO
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue; npm run test:all
```

### Ciclo B: Limpiar Caso 01 + Ejecutar Caso 01
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path screenshots/01-*.png -Force -ErrorAction SilentlyContinue; npm run test:01
```

### Ciclo C: Limpiar Caso 02 + Ejecutar Caso 02
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path screenshots/02-*.png -Force -ErrorAction SilentlyContinue; npm run test:02
```

---

**¡Listo!** ✅
