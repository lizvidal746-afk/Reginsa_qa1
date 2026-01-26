# 📊 ABRIR ALLURE REPORT - GUÍA

## 🎯 LAS 3 MANERAS MÁS FÁCILES

```
┌─────────────────────────────────────────────────────────────┐
│ 1️⃣  FORMA MÁS FÁCIL (Recomendado)                           │
│     Dobla clic → abrir-allure.bat                           │
│     ¡Listo! Se abre Allure en http://localhost:4050        │
├─────────────────────────────────────────────────────────────┤
│ 2️⃣  COMANDO DIRECTO (PowerShell)                            │
│     allure serve allure-results                             │
├─────────────────────────────────────────────────────────────┤
│ 3️⃣  COMANDO DIRECTO (CMD)                                   │
│     allure serve allure-results                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ OPCIÓN 1: SCRIPT BAT (RECOMENDADO)

### Pasos:
1. Abre carpeta: `d:\SUNEDU\SELENIUM\playwrigth`
2. Dobla clic en: **`abrir-allure.bat`**
3. Se abre automáticamente: http://localhost:4050
4. ✅ Listo

**Ventajas:**
- ✅ Más fácil (dobla clic)
- ✅ Verifica que haya datos
- ✅ Mensaje claro si hay error

---

## ✅ OPCIÓN 2: COMANDO POWERSHELL

### Una línea:
```powershell
allure serve allure-results
```

### O usando script:
```powershell
.\abrir-allure.ps1
```

**URL:** http://localhost:4050

---

## ✅ OPCIÓN 3: COMANDO CMD

### Una línea:
```cmd
allure serve allure-results
```

**URL:** http://localhost:4050

---

## ✅ OPCIÓN 4: COMANDO BASH

### Una línea:
```bash
allure serve allure-results
```

**URL:** http://localhost:4050

---

## � CICLOS TÍPICOS

### Ciclo 1: Ejecutar test + Ver Allure (PowerShell)

**Terminal 1:**
```powershell
npm run test:01
```

**Terminal 2 (después):**
```powershell
allure serve allure-results
```

---

### Ciclo 2: Ejecutar test + Ver Allure (CMD)

**Terminal 1:**
```cmd
npm run test:01
```

**Terminal 2 (después):**
```cmd
allure serve allure-results
```

---

### Ciclo 3: Ejecutar test + Ver Allure (Bash)

**Terminal 1:**
```bash
npm run test:01
```

**Terminal 2 (después):**
```bash
allure serve allure-results
```

---

### Ciclo 4: Ejecutar todos + Ver Allure (Uno en uno)

**Terminal 1 (PowerShell):**
```powershell
npm run test:all
```

**Terminal 2 (después):**
```powershell
allure serve allure-results
```

**Resultado:**
- Verás: Caso 01 + Caso 02 en Allure
- Playwright Report con nuevos screenshots
- Allure con estadísticas actualizadas

---

### Ciclo 5: Ciclo Completo sin separar terminales (PowerShell)

**Una sola terminal:**
```powershell
npm run test:all; allure serve allure-results
```

---

### Ciclo 6: Ciclo Completo sin separar terminales (CMD)

**Una sola terminal:**
```cmd
npm run test:all && allure serve allure-results
```

---

### Ciclo 7: Ciclo Completo sin separar terminales (Bash)

**Una sola terminal:**
```bash
npm run test:all && allure serve allure-results
```

---

## 🚨 ERRORES COMUNES

### ❌ "No hay datos de Allure"

**Significa:** No ejecutaste tests todavía

**Solución:**
```powershell
npm run test:01    # O test:02, O test:all
```

Luego abre Allure nuevamente.

---

### ❌ "Puerto 4050 ya en uso"

**Significa:** Allure ya está abierto en otra ventana

**Solución:**
1. Cierra la otra ventana de Allure (Ctrl+C)
2. Intenta nuevamente

---

### ❌ "allure: No se reconoce como comando"

**Significa:** Allure no está instalado

**Solución:**
```powershell
npm install allure-commandline --save-dev
npx allure serve allure-results
```

---

## 💡 CONSEJOS

| Necesitas | Haz esto |
|-----------|----------|
| Ver reportes rápido | Dobla clic: `abrir-allure.bat` |
| Ejecutar test + ver Allure | 1) `npm run test:01` → 2) `allure serve allure-results` |
| Ver Caso 01 + 02 | 1) `npm run test:all` → 2) `allure serve allure-results` |
| Detener Allure | Presiona: `Ctrl+C` en la terminal |

---

## 📊 QUÉ VERÁS EN ALLURE

Cuando abras Allure, verás:

**Para Caso 01:**
- ✅ 1 test pasado
- 📸 2 screenshots
- ⏱️ Duración: ~15 segundos

**Para Caso 02:**
- ✅ 1 test pasado
- 📸 3 screenshots
- ⏱️ Duración: ~46 segundos

**Para Todos:**
- ✅ 2 tests pasados
- 📸 5 screenshots totales
- ⏱️ Duración: ~3 minutos

---

## ⚡ QUICK REFERENCE

```powershell
# Ejecutar + Ver Allure (Caso 01)
npm run test:01; allure serve allure-results

# Ejecutar + Ver Allure (Caso 02)
npm run test:02; allure serve allure-results

# Ejecutar + Ver Allure (Todos)
npm run test:all; allure serve allure-results
```

---

## 📊 TABLA REFERENCIA RÁPIDA - TODOS LOS TERMINALES

| Acción | PowerShell | CMD | Bash |
|--------|-----------|-----|------|
| **Abrir Allure** | `allure serve allure-results` | `allure serve allure-results` | `allure serve allure-results` |
| **Caso 01** | `npm run test:01; allure serve allure-results` | `npm run test:01 && allure serve allure-results` | `npm run test:01 && allure serve allure-results` |
| **Caso 02** | `npm run test:02; allure serve allure-results` | `npm run test:02 && allure serve allure-results` | `npm run test:02 && allure serve allure-results` |
| **Todos** | `npm run test:all; allure serve allure-results` | `npm run test:all && allure serve allure-results` | `npm run test:all && allure serve allure-results` |

---

**¡Listo! Ahora puedes ver tus reportes.** 📊✨
