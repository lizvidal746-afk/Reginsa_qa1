# 📋 ÍNDICE DE DOCUMENTOS PRINCIPALES

## 🚀 PARA EJECUTAR TESTS

| Documento | Qué contiene |
|-----------|--------------|
| [EJECUTAR_TESTS_PASO_A_PASO.md](EJECUTAR_TESTS_PASO_A_PASO.md) | Cómo ejecutar Caso 01, 02, y todos los casos |
| [VER_TESTS_EN_VENTANA.md](VER_TESTS_EN_VENTANA.md) | Cómo ver tests en vivo con UI Mode |

**Usa:** EJECUTAR_TESTS_PASO_A_PASO.md

---

## 🎬 PARA CREAR CASOS CON RECORDER

| Documento | Qué contiene |
|-----------|--------------|
| [RECORDER_PLAYWRIGHT.md](RECORDER_PLAYWRIGHT.md) | ⭐ **RECOMENDADO** - Cómo grabar Casos 03, 04, 05 con Playwright Recorder |

**Comando rápido Caso 03:**
```powershell
npx playwright codegen --output tests/test-3.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

---

## 📊 PARA VER ALLURE REPORT

| Documento | Qué contiene |
|-----------|--------------|
| [ALLURE_GUIA_COMPLETA.md](ALLURE_GUIA_COMPLETA.md) | ⭐ **RECOMENDADO** - Guía visual de Allure |
| [ALLURE_COMANDOS_RAPIDOS.md](ALLURE_COMANDOS_RAPIDOS.md) | Comandos para copiar/pegar |
| [TODOS_COMANDOS_POR_TERMINAL.md](TODOS_COMANDOS_POR_TERMINAL.md) | Todos los comandos por terminal (PowerShell, CMD, Bash, ZSH) |

**Usa:** ALLURE_GUIA_COMPLETA.md

---

## 🧹 PARA LIMPIAR DATOS

| Documento | Qué contiene |
|-----------|--------------|
| [LIMPIAR_GUIA_FINAL.md](LIMPIAR_GUIA_FINAL.md) | **RECOMENDADO** - Guía visual clara |
| [LIMPIAR_TODO.md](LIMPIAR_TODO.md) | Documentación completa por terminal |
| [COMANDOS_LIMPIAR_RAPIDOS.md](COMANDOS_LIMPIAR_RAPIDOS.md) | Comandos para copiar/pegar |
| [LIMPIEZA_ARCHIVOS_A_USAR.md](LIMPIEZA_ARCHIVOS_A_USAR.md) | Qué archivos usar y cuáles ignorar |

**Usa:** LIMPIAR_GUIA_FINAL.md

---

## 🛠️ SCRIPTS EJECUTABLES

| Archivo | Tipo | Uso |
|---------|------|-----|
| **limpiar-todo.bat** | Script BAT | Dobla clic (RECOMENDADO) |
| **limpiar-todo.ps1** | Script PS1 | PowerShell: `.\limpiar-todo.ps1` |
| **abrir-allure.bat** | Script BAT | Dobla clic para Allure (RECOMENDADO) |
| **abrir-allure.ps1** | Script PS1 | PowerShell: `.\abrir-allure.ps1` |

---

## 📊 REPORTES Y RESULTADOS

| Carpeta | Qué contiene |
|---------|--------------|
| `screenshots/` | Screenshots capturadas durante tests |
| `allure-results/` | Datos para Allure Report |
| `playwright-report/` | Reporte HTML de Playwright |

---

## ⚡ OPTIMIZACIÓN Y PRÓXIMOS CASOS

| Documento | Qué contiene |
|-----------|--------------|
| [OPTIMIZACION_SIMPLE.md](OPTIMIZACION_SIMPLE.md) | ⭐ Headless mode + tiempos (sin afectar tests) |
| [PLANTILLA_NUEVOS_CASOS.md](PLANTILLA_NUEVOS_CASOS.md) | Plantilla para Casos 04, 05... |
| [ESTADO_CASO_03.md](ESTADO_CASO_03.md) | ⭐ **NUEVO** - Estado actual: Caso 03 completado |
| [HEADLESS_MODE.md](HEADLESS_MODE.md) | Detalles de ejecución sin interfaz |

**Usa:** ESTADO_CASO_03.md

---

## 📌 QUICK START

### 1️⃣ Ejecutar tests:
```
Ve a: EJECUTAR_TESTS_PASO_A_PASO.md
```

### 2️⃣ Ver tests en vivo:
```
Ve a: VER_TESTS_EN_VENTANA.md
```

### 3️⃣ Ver Allure Report:
```
Dobla clic: abrir-allure.bat
O lee: ALLURE_GUIA_COMPLETA.md
```

### 4️⃣ Limpiar datos:
```
Dobla clic: limpiar-todo.bat
O lee: LIMPIAR_GUIA_FINAL.md
```

### 6️⃣ Crear Casos 03, 04, 05 con Recorder:
```
Lee: RECORDER_PLAYWRIGHT.md
Comando: npx playwright codegen --output tests/casos-prueba/03-reconsiderar-sancion.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

### 7️⃣ Ver estado actual (Caso 03 completado):
```
Lee: ESTADO_CASO_03.md
Comando: npm run test:03
```

### 8️⃣ Próximos casos (plantilla):
```
Lee: PLANTILLA_NUEVOS_CASOS.md
```

### 9️⃣ Optimizar tiempos:
```
Lee: OPTIMIZACION_SIMPLE.md
```

---

**¡Eso es todo lo que necesitas ahora!** ✅
