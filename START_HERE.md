# 🚀 COMIENZA AQUÍ - START GUIDE

## ⚡ LO MÁS RÁPIDO

### 1️⃣ Ejecutar test + Ver reportes (PowerShell) - 2 minutos
```powershell
npm run test:01; allure serve allure-results
```

### 1️⃣ Ejecutar test + Ver reportes (CMD) - 2 minutos
```cmd
npm run test:01 && allure serve allure-results
```

### 1️⃣ Ejecutar test + Ver reportes (Bash) - 2 minutos
```bash
npm run test:01 && allure serve allure-results
```

### 2️⃣ Ver test en vivo (todos los terminales - más interactivo)
```
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

### 3️⃣ Limpiar (1 minuto)
```
Dobla clic: limpiar-todo.bat
Elige: 1
```

---

## 📚 MÁS INFORMACIÓN

Si necesitas más detalles, abre:

| Necesitas | Abre |
|-----------|------|
| Entender todo | INDICE_PRINCIPAL.md |
| Ejecutar tests | EJECUTAR_TESTS_PASO_A_PASO.md |
| Ver Allure | ALLURE_GUIA_COMPLETA.md |
| Todos los comandos por terminal | TODOS_COMANDOS_POR_TERMINAL.md |
| Ver tests en vivo | VER_TESTS_EN_VENTANA.md |
| Limpiar datos | LIMPIAR_GUIA_FINAL.md |
| Flujo completo | GUIA_VISUAL_FLUJO.md |

---

## 🎯 OPCIONES

### ✅ OPCIÓN A: SCRIPT FÁCIL (Recomendado)

**Paso 1:** Ejecutar test
```powershell
npm run test:01
```

**Paso 2:** Abrir Allure
```
Dobla clic: abrir-allure.bat
```

**Listo.** ✅

---

### ✅ OPCIÓN B: COMANDO ÚNICO (PowerShell)

**Un solo comando:**
```powershell
npm run test:all; allure serve allure-results
```

**Espera a que termine.** ✅

---

### ✅ OPCIÓN C: COMANDO ÚNICO (CMD)

**Un solo comando:**
```cmd
npm run test:all && allure serve allure-results
```

**Espera a que termine.** ✅

---

### ✅ OPCIÓN D: COMANDO ÚNICO (Bash)

**Un solo comando:**
```bash
npm run test:all && allure serve allure-results
```

**Espera a que termine.** ✅

---

### ✅ OPCIÓN E: VER EN VIVO

**Ver test ejecutándose:**
```powershell
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

**Se abre en http://localhost:6500** ✅

---

## 🎬 CICLO COMPLETO (5 minutos)

### Terminal 1:
```powershell
# Limpiar
dobla clic en: limpiar-todo.bat
# Elige: 1

# Ejecutar
npm run test:all
```

### Terminal 2 (después):
```powershell
allure serve allure-results
```

### Navegador:
```
http://localhost:4050
```

---

## 📊 URLS

| Herramienta | URL |
|------------|-----|
| Playwright Report | http://localhost:9323 |
| Allure Report | http://localhost:4050 |
| Playwright UI (--ui) | http://localhost:6500 |

---

## ❓ PREGUNTAS RÁPIDAS

**¿Qué es Allure?**
→ Reporte profesional de tests

**¿Qué es Playwright Report?**
→ Reporte de Playwright (se abre automático)

**¿Qué es --ui?**
→ Ver test en vivo en navegador

**¿Cómo limpiar?**
→ Dobla clic: `limpiar-todo.bat`

**¿Dónde están los screenshots?**
→ Carpeta: `screenshots/`

**¿Dónde está el reporte de Allure?**
→ Carpeta: `allure-results/`

---

## ✅ ANTES DE EMPEZAR

- [ ] Abre carpeta: `d:\SUNEDU\SELENIUM\playwrigth`
- [ ] Terminal PowerShell (Ctrl+Shift+`)
- [ ] Elige una opción (A, B, o C)
- [ ] Ejecuta
- [ ] ¡Listo!

---

**¡Ahora estás listo para empezar!** 🚀
