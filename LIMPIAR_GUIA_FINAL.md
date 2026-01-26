# 🧹 GUÍA FINAL DE LIMPIEZA - MÁS CLARA

## 🎯 LO MÁS IMPORTANTE

### Tienes 3 maneras de limpiar:

```
┌─────────────────────────────────────────────────────────────┐
│ 1️⃣  FORMA MÁS FÁCIL (Recomendado)                           │
│     Dobla clic → limpiar-todo.bat                           │
│     Listo. Elige opción (1, 2, 3, 4)                        │
├─────────────────────────────────────────────────────────────┤
│ 2️⃣  FORMA COPIAR/PEGAR (PowerShell)                         │
│     Ve: COMANDOS_LIMPIAR_RAPIDOS.md                         │
│     Copia línea 1 (para TODO)                               │
│     Pega en PowerShell                                      │
├─────────────────────────────────────────────────────────────┤
│ 3️⃣  FORMA COMPLETA (Documentación)                          │
│     Ve: LIMPIAR_TODO.md                                    │
│     Lee sección que necesites                               │
│     Copia el comando                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 OPCIÓN 1: DOBLA CLIC EN SCRIPT

### Archivo: `limpiar-todo.bat`

**Pasos:**
1. Abre carpeta: `d:\SUNEDU\SELENIUM\playwrigth`
2. Dobla clic en: `limpiar-todo.bat`
3. Aparece menú:
   ```
   🧹 LIMPIADOR DE REPORTES Y DATOS
   =====================================
   
   1) Limpiar TODO (reportes, screenshots, datos)
   2) Limpiar CASO 01 solamente
   3) Limpiar CASO 02 solamente
   4) Salir
   
   Elige opción (1-4): 
   ```
4. Escribe: `1` (para limpiar TODO)
5. Presiona: `Enter`
6. ✅ Listo

---

## 📊 OPCIÓN 2: COMANDO ÚNICO (PowerShell)

### Para LIMPIAR TODO:

```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue; Write-Host "✅ Todo limpiado"
```

### Para LIMPIAR CASO 01:

```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path screenshots/01-*.png -Force -ErrorAction SilentlyContinue; Write-Host "✅ Caso 01 limpiado"
```

### Para LIMPIAR CASO 02:

```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path screenshots/02-*.png -Force -ErrorAction SilentlyContinue; Write-Host "✅ Caso 02 limpiado"
```

---

## 📊 OPCIÓN 3: PASO A PASO (PowerShell)

### Para LIMPIAR TODO (fácil de leer):

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

---

## 🔄 CICLOS TÍPICOS

### Ciclo: Limpiar TODO + Ejecutar TODO

**Terminal:**
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -Force -ErrorAction SilentlyContinue; npm run test:all
```

**Lo que pasa:**
1. ✨ Limpia todo
2. 🚀 Ejecuta todos los tests
3. 📊 Genera nuevos reportes

---

### Ciclo: Limpiar Caso 01 + Ejecutar Caso 01

**Terminal:**
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path screenshots/01-*.png -Force -ErrorAction SilentlyContinue; npm run test:01
```

**Lo que pasa:**
1. ✨ Limpia screenshots de Caso 01
2. 🚀 Ejecuta Caso 01
3. 📊 Genera nuevas screenshots

---

### Ciclo: Limpiar Caso 02 + Ejecutar Caso 02

**Terminal:**
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path screenshots/02-*.png -Force -ErrorAction SilentlyContinue; npm run test:02
```

---

## ✅ CHECKLIST

- [ ] Cierra navegadores (Playwright, Allure)
- [ ] Cierra terminales con pruebas activas
- [ ] Elige método de limpieza (1, 2, o 3)
- [ ] Ejecuta comando
- [ ] Ver: "✅ Listo" o similar
- [ ] Listo para nuevas pruebas

---

## 💡 PREGUNTAS FRECUENTES

### ¿Qué es mejor? ¿El script o comando?

**Script (limpiar-todo.bat):**
- ✅ Más fácil (dobla clic)
- ✅ Menú interactivo
- ✅ Menos opciones de error
- ⭐ **RECOMENDADO**

**Comando (PowerShell):**
- ✅ Más rápido
- ✅ Puedes combinar con otros comandos
- ❌ Tienes que escribir o copiar/pegar

### ¿Qué limpia el script?

- `allure-results/` - Datos de Allure
- `allure-report/` - Reportes Allure
- `playwright-report/` - Reportes Playwright
- `test-results/` - Resultados técnicos
- `screenshots/` - Todas las screenshots
- `registros-administrados.json` - Datos de prueba
- `reporte-administrados.html` - Reporte HTML

### ¿Puedo recuperar lo que borré?

**No, la limpieza es permanente.** Asegúrate antes de ejecutar.

---

## 🎯 RECOMENDACIÓN FINAL

**Usa: `limpiar-todo.bat`** (dobla clic)

Es lo más fácil y no hay riesgo de escribir mal comandos. ✅
