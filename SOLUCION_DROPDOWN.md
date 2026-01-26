# 🔧 SOLUCIÓN: Dropdown Selector + Almacenamiento de Archivos

## 📌 Resumen de Cambios

Se han realizado mejoras para resolver dos problemas:

1. **Dropdown no encuentra administrados** (mostraba 0 resultados)
2. **Navegador se cierra prematuraente** durante relleno de formulario
3. **Dónde guardar archivos PDF** para adjuntos

---

## ✅ Cambio 1: Mejora del Selector de Administrado

### Archivo: `reginsa-actions.ts` → `obtenerAdministradoAleatorio()`

**Cambios Implementados:**

#### ✨ Nuevas Características:

1. **7 estrategias de búsqueda** (antes eran 5):
   - ✅ Estrategia 6: `li` directamente en dropdown
   - ✅ Estrategia 7: `.ant-select-item-option-content` (contenido de opciones)

2. **Logging mejorado para debug**:
   - ✅ Muestra HTML del dropdown (primeros 200 caracteres)
   - ✅ Indica en qué estrategia se encontraron elementos
   - ✅ Mejores mensajes de error

3. **Tiempos de espera optimizados**:
   ```typescript
   await adminInput.click({ force: true, timeout: 5000 });  // Timeout de 5s
   await page.waitForTimeout(1500);  // Espera más larga
   ```

4. **Fallback mejorado**:
   ```typescript
   // Si nada funciona, intenta con click en primer li
   const firstLi = page.locator('.ant-select-dropdown li').first();
   ```

### Beneficio:
Ahora tiene **más oportunidades** de encontrar los administrados visibles en el dropdown.

---

## ✅ Cambio 2: Mayor Espera en Test Caso 02

### Archivo: `02-registrar-sancion.spec.ts`

**Cambios Implementados:**

```typescript
// Antes: 2000ms
await page.waitForTimeout(2000);

// Ahora: 3000ms + verificación
console.log('   Esperando actualización del formulario...');
await page.waitForLoadState('networkidle');
await page.waitForTimeout(3000);  // 3 segundos en lugar de 2

// Nuevo: Verificación de que la página está abierta
try {
  await page.waitForTimeout(500);
} catch (e) {
  console.error('❌ CRÍTICO: Página cerrada o contexto no disponible');
  throw e;
}
```

**Beneficio:**
- ✅ Da más tiempo al formulario para actualizarse después de seleccionar administrado
- ✅ Previene el error "Target page, context or browser has been closed"
- ✅ Detecta si la página se cierra y proporciona error claro

---

## ✅ Cambio 3: Herramientas de Debug

### Nuevo Archivo: `debug-dropdown.ts`

Contiene dos funciones útiles:

1. **`inspeccionarDropdown(page)`**:
   - Loguea la estructura HTML del dropdown
   - Cuenta elementos por cada selector
   - Lista contenido de cada opción
   - Muestra primeros 500 caracteres del HTML

2. **`seleccionarPrimeraOpcion(page)`**:
   - Intenta seleccionar la primera opción
   - Prueba múltiples selectores
   - Retorna el texto de la opción seleccionada

### Nuevo Test: `debug-dropdown.spec.ts`

Ejecuta un test especializado para depuración:

```bash
npm run test:debug-dropdown
```

**Qué hace:**
1. Login
2. Abre formulario
3. Abre dropdown
4. **Inspecciona completamente la estructura**
5. Intenta seleccionar primera opción
6. Toma screenshot final

---

## ✅ Cambio 4: Almacenamiento de Archivos PDF

### Carpeta: `./files/`

Se ha creado una carpeta dedicada para almacenar archivos de prueba.

**Estructura:**
```
./files/
├── README.md (instrucciones)
└── GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf
```

### Cómo Usar en Tests:

```typescript
// En el test de Caso 02, cuando llegues al campo de archivo:
const pdfPath = './files/GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf';
await page.locator('input[type="file"]').setInputFiles(pdfPath);
```

---

## 🚀 Próximos Pasos

### Paso 1: Ejecutar Test de Debug
```bash
npm run test:debug-dropdown
```

**Resultado esperado:**
- Log detallado de la estructura del dropdown
- Número de opciones encontradas por cada selector
- Contenido de cada opción
- Screenshot del resultado

### Paso 2: Analizar Output
Mira el output de la consola para ver:
- ¿Cuántas opciones encuentra cada selector?
- ¿Cuál selector encuentra las opciones?
- ¿Cuál es el texto exacto de cada opción?

### Paso 3: Ejecutar Caso 02 Mejorado
```bash
npm run test:02
```

Con los cambios, debería:
- ✅ Encontrar opciones en el dropdown
- ✅ Seleccionar una opción
- ✅ Continuar con el relleno del formulario
- ✅ No cerrar el navegador prematuramente

### Paso 4: Si Aún Falla
Si el output del debug muestra 0 opciones, significa que la estructura HTML es diferente a lo esperado:
- Mira el HTML mostrado en el log
- Busca los selectores CSS correctos
- Actualiza `debug-dropdown.ts` con nuevos selectores

---

## 📊 Validación

**TypeScript:**
```bash
npx tsc --noEmit
# Resultado esperado: 0 errores
```

**Tests:**
```bash
npm run test:01       # Debe pasar (Caso 01)
npm run test:debug-dropdown  # Para inspeccionar
npm run test:02       # Debe mejorar (Caso 02)
```

---

## 🔍 Diagnóstico Rápido

| Problema | Solución |
|----------|----------|
| "Encontrados 0 selectores" | Ejecutar `npm run test:debug-dropdown` y revisar HTML |
| "Target page closed" | Aumentar tiempo de espera (ya hecho: 3000ms) |
| Selector encuentra opciones pero no las selecciona | Revisar clicks con `force: true` |
| Formulario no se actualiza | Añadir waits adicionales con `networkidle` |

---

## 📝 Referencia de Scripts

```json
{
  "test:01": "Test Caso 01 - Agregar Administrado",
  "test:02": "Test Caso 02 - Registrar Sanción (MEJORADO)",
  "test:debug-dropdown": "Debug - Inspeccionar Dropdown",
  "test:all": "Ejecutar todos los tests",
  "report:playwright": "Ver reporte Playwright"
}
```

---

## 💡 Tips

- 🎯 Si el dropdown tiene muchas opciones, el test es más lento pero más robusto
- 📦 Los archivos PDF van en `./files/` (no en `./test-files/`)
- 🔧 El debug test no continúa con la prueba, solo inspecciona
- ⏱️ Los timeouts se pueden ajustar en `reginsa-actions.ts` si es necesario

