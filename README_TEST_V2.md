# ✨ TEST 02 - REGISTRAR SANCIÓN - VERSIÓN V2 OPTIMIZADA

> **IMPORTANTE**: Este es un test COMPLETAMENTE reescrito basado en selectores probados del archivo `test-2.spec.ts` (generado por Playwright Codegen).

## 📋 Descripción

Test que registra **5 sanciones diferentes** para **UN SOLO administrado** en el sistema REGINSA:

1. **Sanción 1**: MULTA (SOLES 1-1600 o UIT 5, aleatorio)
2. **Sanción 2**: SUSPENSIÓN (Año/Mes/Día aleatorio)
3. **Sanción 3**: CANCELACIÓN (solo tipo de sanción)
4. **Sanción 4**: MULTA + SUSPENSIÓN (ambas condiciones)
5. **Sanción 5**: MULTA + CANCELACIÓN (ambas condiciones)

## 🚀 Ejecución Rápida

### Opción 1: NPM (Recomendado)
```bash
cd d:\SUNEDU\SELENIUM\playwrigth
npm run test:02-v2
```

### Opción 2: PowerShell
```powershell
.\ejecutar-test-02-v2.ps1
```

### Opción 3: Batch
```cmd
ejecutar-test-02-v2.bat
```

### Opción 4: VS Code
```
Ctrl+Shift+P → "Run Task" → Buscar "test:02-v2"
```

## 🔧 Cambios Principales vs V1

| Aspecto | V1 (Viejo) | V2 (Nuevo) |
|---------|-----------|-----------|
| **Selectores** | IDs: `#multa`, `#suspension`, `#cancelacion` | CSS: `.p-checkbox-box` + `.nth()` |
| **Radio Buttons** | IDs: `#uit`, `#soles` | Semantic: `[role="radio"]` |
| **Input Monto** | Name: `input[name="valorUIT/Soles"]` | Role: `getByRole('textbox', { name: '0.00' })` |
| **Dropdown Tiempo** | Complex `p-dropdown` + filter | Simple `p-dropdown` + `getByRole('option')` |
| **Cantidad Input** | Name: `input[name="cantidadTiempo"]` | Placeholder: `getByPlaceholder('Cantidad')` |
| **Complejidad** | Loops, múltiples try-catch | Directo, sin complejidad innecesaria |
| **Timeouts** | Variables (500-2000ms) | Consistentes por acción (800-1500ms) |
| **Base** | Selectores por HTML attributes | Selectores probados de test-2.spec.ts |

## 📊 Estructura del Test

```
PASO 1: Login + Navegación
PASO 2: Abrirciones formulario
PASO 3: Seleccionar administrado (ALEATORIO, UNA SOLA VEZ)
PASO 4: Datos básicos (expediente, resolución, fecha)
PASO 5: Subir PDF
PASO 6: Agregar medidas correctivas
PASO 7: Ir a tab "Detalle de sanciones"
PASO 8: Agregar 5 sanciones
    └─ Para cada sanción:
       • Abrir modal "Agregar sanción"
       • Seleccionar RIS (combobox)
       • Seleccionar Tipo Infractor (combobox)
       • Llenar Hecho Infractor (texto)
       • Marcar checkbox(s) según sanción
       • Llenar campos según tipo:
         - Multa: Radio + Input cantidad
         - Suspensión/Cancelación: Dropdown tipo + Input cantidad
       • Click "Guardar detalle"
       • Cerrar modal (Escape)
PASO 9: Guardar formulario final
```

## ✅ Qué Esperar

### Éxito
- ✅ Todas 5 sanciones marcan "GUARDADA"
- ✅ Mensaje final: "1 registro creado"
- ✅ Screenshots guardadas en `results/`
- ✅ Reporte Playwright generado

### Fallo Típico
- ❌ Una sanción no se marca correctamente
- ❌ Checkboxes no clickeables
- ❌ Campos de monto/tiempo no visibles
- ❌ Timeout (>300s)

## 🔍 Debugging

### Ver ejecución en vivo
```bash
npx playwright test tests/casos-prueba/02-registrar-sancion-v2.spec.ts --headed --reporter=verbose
```

### Debugging interactivo (pausar en línea)
```bash
npx playwright test --debug
```

### Regenerar selectores (Codegen)
```bash
npx playwright codegen https://reginsaqa.sunedu.gob.pe/#/home
```

### Ver reporte
```bash
npm run reports:open
```

## 📝 Notas Importantes

1. **UN Administrado**: Se selecciona aleatorio al inicio, NO cambia entre sanciones
2. **Rangos de Valores**:
   - SOLES: 1 a 1600
   - UIT: Solo 5
   - Años: 1 a 5
   - Meses: 1 a 11
   - Días: 1 a 29
3. **IDs vs Selectores**: Los IDs (`#multa`) de V1 podrían no existir en HTML real
4. **PrimeNG Components**: Los checkboxes usan clase `.p-checkbox-box` del framework PrimeNG

## 📁 Archivos Relacionados

- `tests/casos-prueba/02-registrar-sancion-v2.spec.ts` - **Test optimizado (ACTUAL)**
- `tests/test-2.spec.ts` - **Referencia de selectores que funcionan**
- `tests/casos-prueba/02-registrar-sancion.spec.ts` - Versión anterior (no usar)
- `tests/utilidades/reginsa-actions.ts` - Funciones auxiliares
- `CASO_02_V2_OPTIMIZADO.md` - Documentación detallada de cambios

## 🎯 Próximos Pasos si Falla

1. **Verificar HTML**: Abrir DevTools y buscar los selectores
2. **Comparar con test-2**: ¿Los selectores allí funcionan?
3. **Probar selectores**: Usar console de Playwright
4. **Regenerar con Codegen**: Si HTML cambió mucho

## ✨ Por Qué V2 es Mejor

1. **Más rápido**: Selectores directos sin búsquedas múltiples
2. **Más confiable**: Basado en código que ya funcionaba
3. **Más mantenible**: Sin loops y error handling innecesario
4. **Mejor testing**: Claro qué selector se usa y por qué

---

**Versión**: V2 OPTIMIZADA  
**Fecha**: 2026-01-23  
**Base**: test-2.spec.ts (Codegen) + Estructura V1  
**Status**: LISTO PARA PROBAR ✅
