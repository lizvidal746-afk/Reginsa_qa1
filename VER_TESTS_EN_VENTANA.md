# 👀 VER TESTS EN VENTANA - UI MODE

## ¿QUÉ ES UI MODE?

Es una **ventana interactiva** donde ves:
- ✅ El navegador ejecutando el test
- ✅ Cada paso del test
- ✅ Las screenshots en tiempo real
- ✅ Puedes pausar y reanudar
- ✅ Controlas la velocidad

---

## 🚀 OPCIÓN 1: VER CASO 01 EN VENTANA

```powershell
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

**Resultado:**
- Se abre ventana de Playwright
- Ves el navegador ejecutando el test
- Botones: ▶️ Play, ⏸️ Pause, 🔄 Repeat
- Ves cada screenshot generada

---

## 🚀 OPCIÓN 2: VER CASO 02 EN VENTANA

```powershell
npx playwright test tests/casos-prueba/02-registrar-sancion.spec.ts --ui
```

---

## 🚀 OPCIÓN 3: VER TODOS LOS CASOS EN VENTANA

```powershell
npx playwright test tests/casos-prueba/ --ui
```

---

## 🚀 OPCIÓN 4: VER CASO 01 CON VENTANA Y TIEMPO LENTO

Para que el navegador se ejecute **lentamente** (ves cada acción):

```powershell
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui --headed --trace on
```

O más simple:

```powershell
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

**En la ventana UI:**
1. Haz clic en ▶️ Play
2. Usa los controles para pausar/reanudar
3. Ves el navegador en vivo

---

## 📊 COMPARATIVA

| Comando | ¿Ventana? | ¿Interactivo? | ¿Lento? |
|---------|-----------|---------------|---------|
| `npm run test:01` | ❌ No (rápido) | ❌ No | ✅ Rápido |
| `--ui` | ✅ Sí | ✅ Sí | ⏱️ Variable |
| `--headed` | ✅ Sí | ❌ No | ✅ Rápido |

---

## 🎮 CONTROLES EN UI MODE

| Control | Acción |
|---------|--------|
| ▶️ Play | Ejecutar test |
| ⏸️ Pause | Pausar ejecución |
| 🔄 Repeat | Repetir test |
| 🔍 Zoom | Ver más/menos |
| 🖼️ Screenshot | Ver screenshot anterior |
| 📋 Trace | Ver detalles técnicos |

---

## 💡 CUÁNDO USAR CADA UNO

### Ver Tests Rápido (2-3 min):
```powershell
npm run test:01
```
✅ Test se ejecuta rápido  
✅ Allure se abre automático  
❌ No ves el navegador

### Ver Tests en Vivo (más tiempo):
```powershell
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```
✅ Ves el navegador  
✅ Interactivo (pausar/reanudar)  
✅ Controlas la velocidad  
❌ Más lento

---

## 📝 SECUENCIA PARA VER PASO A PASO

### Terminal 1: Ver Caso 01 en vivo
```powershell
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

**En la ventana:**
1. Haz clic en ▶️ (Play)
2. Ves el navegador abriéndose
3. Ves cada paso del registro
4. Ves las screenshots generarse
5. Haz clic en ⏸️ (Pause) cuando quieras

### Terminal 2: Ver Allure con resultados
```powershell
allure serve allure-results
```

---

## 🔄 CICLO COMPLETO: VER + REPORTES

### 1️⃣ Terminal 1 - Ver test en vivo:
```powershell
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

### 2️⃣ Terminal 2 - Ver Allure:
```powershell
allure serve allure-results
```

### 3️⃣ Navegador 1: http://localhost:6500 (UI Playwright)
- Ves el test ejecutándose

### 4️⃣ Navegador 2: http://localhost:4050 (Allure)
- Ves los reportes finales

---

## ✅ QUICK REFERENCE

| Necesitas | Comando |
|-----------|---------|
| Ver rápido | `npm run test:01` |
| Ver en vivo (Caso 1) | `npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui` |
| Ver en vivo (Caso 2) | `npx playwright test tests/casos-prueba/02-registrar-sancion.spec.ts --ui` |
| Ver en vivo (Todos) | `npx playwright test tests/casos-prueba/ --ui` |
| Ver Allure | `allure serve allure-results` |

---

**¡Elige la opción que necesites!** 👀
