# 🎯 GUÍA RÁPIDA - Próximos Pasos

## ¿Qué Se Ha Solucionado?

✅ **Dropdown Selector**: Añadidas 7 estrategias de búsqueda + logging detallado
✅ **Tiempos de Espera**: Aumentados de 2s a 3s para evitar cierre del navegador
✅ **Almacenamiento de Archivos**: Carpeta `./files/` lista para PDFs
✅ **Herramientas de Debug**: Test especial para inspeccionar estructura

---

## 🚀 Ejecuta en Este Orden

### 1️⃣ Test de Inspección (PRIMERO)
```bash
npm run test:debug-dropdown
```

**Esto te mostrará:**
- Estructura real del dropdown HTML
- Cuántos elementos encuentra cada selector
- Lista de administrados disponibles
- Cuál selector funciona mejor

**Toma nota de:**
- ¿Cuántos administrados hay? (ej: 8 opciones)
- ¿Cuál selector los encuentra? (ej: rol="option")
- ¿Cuál es el nombre exacto? (ej: "Universidad de Morrope")

---

### 2️⃣ Caso 01 (Verificación)
```bash
npm run test:01
```

**Resultado esperado:**
- ✅ Debe pasar completamente (ya estaba funcionando)

---

### 3️⃣ Caso 02 (Con Mejoras)
```bash
npm run test:02
```

**Resultado esperado:**
- ✅ Login exitoso
- ✅ Navegación exitosa
- ✅ Dropdown abre correctamente
- ✅ Selecciona administrado
- ✅ Rellena campos (Expediente, Resolución)
- ✅ O mejor error si aún hay problemas

---

## 📂 Dónde Guardar Archivos PDF

**Carpeta:** `./files/`

**Archivo de Prueba:** `GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf`

**Uso en Test:**
```typescript
const pdfPath = './files/GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf';
await page.locator('input[type="file"]').setInputFiles(pdfPath);
```

---

## 🔍 Si Aún No Funciona

**Escenario 1: Debug muestra 0 opciones**
→ El HTML del dropdown es diferente
→ Necesitamos ver ese HTML en el log
→ Abre issue con screenshot del HTML que aparece en consola

**Escenario 2: Debug encuentra opciones pero Caso 02 falla**
→ Problema de click o esperas
→ Revisar logs de `test:02` para ver dónde exactamente falla
→ Puede ser necesario ajustar selectores

**Escenario 3: El navegador se cierra**
→ Ya hemos aumentado la espera a 3000ms
→ Si aún cierra, revisar si hay error antes de cerrar

---

## 📋 Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `reginsa-actions.ts` | +2 estrategias, +logging, +debug |
| `02-registrar-sancion.spec.ts` | +espera (3s), +verificación |
| `package.json` | +script `test:debug-dropdown` |
| `debug-dropdown.ts` (NUEVO) | Funciones de inspección |
| `debug-dropdown.spec.ts` (NUEVO) | Test de debug |
| `./files/README.md` (NUEVO) | Guía de almacenamiento |

---

## ✅ Validación

Antes de ejecutar tests:

```bash
npx tsc --noEmit
```

Debe mostrar: **0 errores**

---

## 💬 Resumen

1. **Ejecuta:** `npm run test:debug-dropdown` → Verás estructura del dropdown
2. **Luego:** `npm run test:02` → Debería funcionar mejor o fallar con error claro
3. **Archivos PDF:** Van en `./files/` (carpeta creada)
4. **Más debug:** Ver logs detallados en consola

¡Avisame que resultados te muestra el test de debug! 🎯

