# 📋 TEST V2 - OPTIMIZACIÓN COMPLETA

## 📝 Resumen de Cambios

El archivo `02-registrar-sancion-v2.spec.ts` es una **reescritura completa** del test anterior con enfoque en **simplicidad y eficiencia**.

### 🔴 Problemas en la Versión Anterior

1. **Selectores complejos y frágiles**
   - Usar múltiples métodos para buscar el mismo elemento
   - Genéricos como `[role="dialog"] input[type="checkbox"]` + `.nth()` inestables
   - Loops complejos con reintentos y fallbacks

2. **Demasiado error handling**
   - Muchos `.catch(() => false)` que ocultaban problemas reales
   - No clara qué selector funcionaba vs cuál no

3. **Timing inconsistente**
   - `waitForTimeout()` aleatorio (500-2000ms)
   - No coordinado con cambios visuales

4. **Regresión del test**
   - De 4/5 sanciones a 1/5 de repente
   - Indica que cambios posteriores quebraron selectores trabajando

### ✅ Soluciones en V2

#### 1️⃣ Selectores basados en CODEGEN

Usamos selectores probados que generó la herramienta Playwright Codegen:

```typescript
// ✅ CHECKBOXES (del test-2.spec.ts)
.p-checkbox-box          // Selector CSS de PrimeNG

// ✅ RADIOS (UIT/SOLES)
[role="radio"]           // Selector semantic HTML

// ✅ MONTO INPUT
getByRole('textbox', { name: '0.00' })   // Selector por placeholder

// ✅ DROPDOWN TIEMPO
p-dropdown + getByRole('option', { name: 'Año|Mes|Día' })

// ✅ CANTIDAD INPUT  
getByPlaceholder('Cantidad')             // Selector por placeholder

// ✅ BOTONES
getByRole('button', { name: 'Guardar detalle' })
```

#### 2️⃣ Eliminadas complejidades innecesarias

```typescript
// ❌ ANTES: Complejo y frágil
const checkboxes = page.locator('[role="dialog"] input[type="checkbox"]');
for (let i = 0; i < 3; i++) {
  const checkbox = checkboxes.nth(i);
  await checkbox.click().catch(() => {});
  if (await checkbox.isChecked().catch(() => false)) {
    // success logging
  }
}

// ✅ AHORA: Directo y claro
const checkboxes = page.locator('.p-checkbox-box');
const checkbox = checkboxes.nth(0);  // Primer checkbox = Multa
await checkbox.click({ force: true });
```

#### 3️⃣ Timeouts consistentes y predecibles

```typescript
// Patrón consistente:
await page.waitForTimeout(1500);      // Después de combobox
await page.waitForTimeout(1000);      // Después de clicks normales
await page.waitForTimeout(800);       // Después de checks
await page.waitForTimeout(600);       // Después de inputs

// Sin variabilidad aleatoria
```

#### 4️⃣ Flujo más legible con logging estructurado

```typescript
console.log(`\n  ┌─ SANCIÓN ${n}/5: ${nombre}`);
console.log(`  │  ✓ RIS seleccionado`);
console.log(`  │  ☑️  Marcando sanciones:`);
console.log(`  │    ✓ Multa marcada`);
console.log(`  │  ⏳ Llenando Monto...`);
console.log(`  │    ✓ Monto: 500 SOLES`);
console.log(`  │  ✅ GUARDADA`);
console.log(`  └───────────────────────────────────────────────────────────────────`);
```

## 🎯 Estructura del Test V2

```
TEST CASE 02: REGISTRAR SANCIÓN (V2)
│
├─ LOGIN + NAVEGACIÓN
│  ├─ Acceso a REGINSA
│  └─ Navegar a "Infractor y Sanción"
│
├─ DATOS BÁSICOS
│  ├─ Abrirciones formulario
│  ├─ Seleccionar 1 administrado aleatorio (IMPORTANTE: No repetir)
│  ├─ Llenar expediente/resolución/fecha
│  ├─ Subir PDF
│  └─ Guardar medidas correctivas
│
├─ SANCIONES (5 registros para el MISMO administrado)
│  ├─ Sanción 1: MULTA (SOLES 1-1600 o UIT 5)
│  │  ├─ Mark checkbox Multa
│  │  ├─ Select radio SOLES/UIT
│  │  ├─ Fill cantidad
│  │  └─ Save Guardar detalle
│  │
│  ├─ Sanción 2: SUSPENSIÓN (Año/Mes/Día)
│  │  ├─ Mark checkbox Suspensión
│  │  ├─ Select tipo tiempo
│  │  ├─ Fill cantidad
│  │  └─ Save Guardar detalle
│  │
│  ├─ Sanción 3: CANCELACIÓN (solo marcar)
│  │  ├─ Mark checkbox Cancelación
│  │  └─ Save Guardar detalle
│  │
│  ├─ Sanción 4: MULTA + SUSPENSIÓN (ambas)
│  │  ├─ Mark checkboxes
│  │  ├─ Fill monto
│  │  ├─ Fill tiempo
│  │  └─ Save Guardar detalle
│  │
│  └─ Sanción 5: MULTA + CANCELACIÓN (ambas)
│     ├─ Mark checkboxes
│     ├─ Fill monto
│     ├─ Fill tiempo (Cancelación)
│     └─ Save Guardar detalle
│
└─ GUARDAR FORMULARIO FINAL
   └─ Click Guardar → Mensaje "1 registro creado"
```

## 📊 Comparación de Selectores

| Elemento | V1 (Viejo) | V2 (Nuevo) | Fuente |
|----------|-----------|-----------|--------|
| Checkbox | `#multa`, `#suspension`, `#cancelacion` | `.p-checkbox-box` + `.nth()` | Codegen test-2.spec.ts |
| Radio UIT/SOLES | `#uit`, `#soles` | `[role="radio"]` | Semantic HTML |
| Input Monto | `input[name="valorUIT/Soles"]` | `getByRole('textbox', { name: '0.00' })` | Codegen |
| Dropdown Tiempo | `p-dropdown` + filter + `[role="combobox"]` | `p-dropdown` + button/combobox | Codegen |
| Cantidad Tiempo | `input[name="cantidadTiempo"]` | `getByPlaceholder('Cantidad')` | Codegen |

## 🧪 Cómo Ejecutar

### Opción 1: Terminal
```bash
cd d:\SUNEDU\SELENIUM\playwrigth
npm run test:02-v2
```

### Opción 2: PowerShell
```powershell
.\ejecutar-test-02-v2.ps1
```

### Opción 3: Batch
```batch
ejecutar-test-02-v2.bat
```

## ✨ Mejoras Esperadas

1. **Más rápido**: Selectores directos sin búsquedas múltiples
2. **Más confiable**: Basado en código funcionando (codegen)
3. **Más mantenible**: Código claro sin loops complejos
4. **Mejor debugging**: Logging estructurado muestra exactamente qué pasa

## 🔍 Próximos Pasos si Falla

1. Verificar consola del navegador (devtools)
2. Revisar si HTML cambió (selectores `.p-checkbox-box` sigue siendo válido?)
3. Comparar selectores contra archivo `test-2.spec.ts`
4. Usar Playwright Inspector: `npx playwright test --debug`

## 📝 Notas Importantes

- **UN administrado**: Se selecciona aleatorio al inicio, NO se repite
- **5 sanciones**: Para el mismo administrado, agregadas con "Guardar detalle"
- **Números aleatorios**: Rangos específicos por tipo (ver struct `sanciones[]`)
- **Sin repetición**: Cada sanción usa diferentes checkboxes/campos

---
Versión: V2 OPTIMIZADA
Fecha: 2026-01-23
Basado en: Codegen test-2.spec.ts + Estructura V1
