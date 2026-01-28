# 🎬 GUÍA VISUAL DE FLUJO

## 📊 FLUJO COMPLETO: DE INICIO A FIN

```
┌─────────────────────────────────────────────────────────────┐
│ 1️⃣  INICIAR SESIÓN                                          │
│     URL: https://reginsaqa.sunedu.gob.pe/#/home            │
│     Usuario: lizvidal                                       │
│     Contraseña: QA1234510qa                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ 2️⃣  EJECUTAR TESTS                                          │
│     npm run test:01   ← Caso 01 (Agregar Administrado)     │
│     npm run test:02   ← Caso 02 (Registrar Sanción)        │
│     npm run test:all  ← Todos                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ 3️⃣  VER RESULTADOS                                          │
│                                                              │
│     📊 OPCIÓN A: Playwright Report (Automático)             │
│        URL: http://localhost:9323                           │
│                                                              │
│     📊 OPCIÓN B: Allure Report (Manual)                     │
│        Dobla clic: abrir-allure.bat                         │
│        URL: http://localhost:4050                           │
│                                                              │
│     👀 OPCIÓN C: Ver en vivo                                │
│        npx playwright test ... --ui                         │
│        URL: http://localhost:6500                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ 4️⃣  LIMPIAR (Opcional)                                      │
│     Dobla clic: limpiar-todo.bat                            │
│     Elige: 1 (para limpiar TODO)                            │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚡ ACCIONES RÁPIDAS

### 🚀 QUIERO EJECUTAR UN TEST
```powershell
npm run test:01
```
✅ Automáticamente abre Playwright Report

---

### 📊 QUIERO VER ALLURE
```
Dobla clic: abrir-allure.bat
```
📍 Se abre: http://localhost:4050

---

### 👀 QUIERO VER TEST EN VIVO
```powershell
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```
📍 Se abre: http://localhost:6500

---

### 🧹 QUIERO LIMPIAR TODO
```
Dobla clic: limpiar-todo.bat
Elige: 1
```
✅ Se borra todo

---

## 📋 SECUENCIAS DE TRABAJO

### Secuencia A: Desarrollo (Sin Allure)
```
1. npm run test:01
   ↓
2. Ver Playwright Report
   ↓
3. Hacer cambios en el código
   ↓
4. Repetir
```

---

### Secuencia B: Validación (Con Allure)
```
1. Dobla clic: limpiar-todo.bat (Opción 1)
   ↓
2. npm run test:all
   ↓
3. Dobla clic: abrir-allure.bat
   ↓
4. Ver Allure en http://localhost:4050
```

---

### Secuencia C: Debugging (Con UI)
```
1. npx playwright test tests/casos-prueba/01-*.spec.ts --ui
   ↓
2. Ves test en vivo en http://localhost:6500
   ↓
3. Pausas y debuggeas
   ↓
4. Arreglas código
   ↓
5. Repetir
```

---

## 🎯 MAPA DE DECISIONES

```
¿Quieres EJECUTAR tests?
├─ SÍ → npm run test:01 (o 02, o all)
│
¿Quieres VER reportes?
├─ Playwright → Se abre automático (http://localhost:9323)
├─ Allure → Dobla clic: abrir-allure.bat
├─ En vivo → npx playwright test ... --ui
│
¿Quieres LIMPIAR?
├─ SÍ → Dobla clic: limpiar-todo.bat → Opción 1
│
¿Necesitas AYUDA?
├─ Índice → INDICE_PRINCIPAL.md
├─ Tests → EJECUTAR_TESTS_PASO_A_PASO.md
├─ Allure → ALLURE_GUIA_COMPLETA.md
├─ Limpiar → LIMPIAR_GUIA_FINAL.md
└─ Vivo → VER_TESTS_EN_VENTANA.md
```

---

## 📊 TABLA DE HERRAMIENTAS

| Herramienta | Cómo abrir | URL | Para qué |
|------------|-----------|-----|----------|
| **Playwright Report** | Automático | http://localhost:9323 | Ver resultados de tests |
| **Allure Report** | `abrir-allure.bat` | http://localhost:4050 | Ver reportes profesionales |
| **Playwright UI** | `npx playwright test ... --ui` | http://localhost:6500 | Ver tests en vivo |

---

## 🎬 DEMO: CICLO COMPLETO EN 5 MINUTOS

### Paso 1: Limpiar (1 min)
```
Dobla clic: limpiar-todo.bat
Elige: 1
Espera a que termine
```

### Paso 2: Ejecutar (3 min)
```powershell
npm run test:all
```

### Paso 3: Ver resultados (1 min)
```
Opción A (Playwright):
- Se abre automático

Opción B (Allure):
- Dobla clic: abrir-allure.bat
- Va a: http://localhost:4050
```

**¡Total: 5 minutos!** ⏱️

---

**¡Ahora sabes todo el flujo!** 🎉
