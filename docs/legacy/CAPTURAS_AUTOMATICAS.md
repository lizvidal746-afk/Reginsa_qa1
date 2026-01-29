# ðŸ“¸ CAPTURAS AUTOMÃTICAS - CASO 02

## Â¿QUÃ‰ CAPTURA EL TEST AHORA?

El test `02-registrar-sancion.spec.ts` captura **automÃ¡ticamente** 3 pantallas en momentos clave:

---

## ðŸ“· CAPTURA 1: AGREGAR SANCIÃ“N
**CuÃ¡ndo**: PASO 10 - Cuando se abre el modal "Agregar sanciÃ³n"

**UbicaciÃ³n en archivo**: LÃ­nea ~225 en `02-registrar-sancion.spec.ts`

**QuÃ© muestra**:
- PestaÃ±a: "Detalle de sanciones"
- Modal abierto: "Agregar sanciÃ³n"
- Campos: SanciÃ³n, Tipo Infractor
- Estado: Listo para llenar

**Nombre archivo**: 
```
test-results/casos-prueba-02-registrar-sancion-chromium/
â””â”€â”€ 02-REGISTRAR_SANCION_01-AGREGAR_SANCION_[timestamp].png
```

---

## ðŸ“· CAPTURA 2: VALIDACIONES
**CuÃ¡ndo**: PASO 15 - Cuando regresa a la pestaÃ±a "Datos del administrado"

**UbicaciÃ³n en archivo**: LÃ­nea ~315 en `02-registrar-sancion.spec.ts`

**QuÃ© muestra**:
- PestaÃ±a: "Datos del administrado"
- Campos completos: Administrado, Expediente, ResoluciÃ³n, etc.
- Validaciones: Bordes rojos en campos requeridos (si aplica)
- Estado: Antes de guardar

**Nombre archivo**:
```
test-results/casos-prueba-02-registrar-sancion-chromium/
â””â”€â”€ 02-REGISTRAR_SANCION_02-VALIDACIONES_ADMINISTRADO_[timestamp].png
```

---

## ðŸ“· CAPTURA 3: BOTÃ“N GUARDAR
**CuÃ¡ndo**: PASO 15 - Justo antes de clickear "Guardar"

**UbicaciÃ³n en archivo**: LÃ­nea ~325 en `02-registrar-sancion.spec.ts`

**QuÃ© muestra**:
- PestaÃ±a: "Datos del administrado"
- BotÃ³n: "Guardar" (visible y activo)
- Formulario: Completamente lleno
- Estado: Listo para guardar

**Nombre archivo**:
```
test-results/casos-prueba-02-registrar-sancion-chromium/
â””â”€â”€ 02-REGISTRAR_SANCION_03-BOTON_GUARDAR_[timestamp].png
```

---

## âœ… CÃ“MO OBTENER LAS CAPTURAS

### Paso 1: Ejecutar el test
```bash
npm run test:02
```

### Paso 2: El test captura automÃ¡ticamente
No necesitas hacer nada. El test:
1. Llega a PASO 10 y captura "Agregar SanciÃ³n"
2. Llega a PASO 15 y captura "Validaciones"
3. Captura "BotÃ³n Guardar"
4. ContinÃºa hasta guardar
5. Captura resultado final

### Paso 3: Ubicar las capturas
```
d:\SUNEDU\SELENIUM\playwrigth\
â””â”€â”€ test-results/
    â””â”€â”€ casos-prueba-02-registrar-sancion-chromium/
        â”œâ”€â”€ 02-REGISTRAR_SANCION_01-AGREGAR_SANCION_*.png
        â”œâ”€â”€ 02-REGISTRAR_SANCION_02-VALIDACIONES_ADMINISTRADO_*.png
        â”œâ”€â”€ 02-REGISTRAR_SANCION_03-BOTON_GUARDAR_*.png
        â”œâ”€â”€ test-passed-1.png (resultado final)
        â””â”€â”€ test-failed-1.png (si falla)
```

---

## ðŸŽ¯ VERIFICAR CAPTURAS

DespuÃ©s de ejecutar `npm run test:02`:

```bash
# Windows
cd test-results/casos-prueba-02-registrar-sancion-chromium/
explorer .

# Linux/Mac
open test-results/casos-prueba-02-registrar-sancion-chromium/
```

---

## ðŸ“Š FUNCIONES USADO

Las capturas usan la funciÃ³n:
```typescript
await capturarPantallaMejorada(
  page,
  '02-REGISTRAR_SANCION',           // Prefijo del test
  '01-AGREGAR_SANCION',              // Nombre descriptivo
  `Modal de agregar sanciÃ³n abierto` // DescripciÃ³n
);
```

---

## ðŸ”§ SI QUIERES AGREGAR MÃS CAPTURAS

Edita `02-registrar-sancion.spec.ts` y agrega en cualquier PASO:

```typescript
// En el PASO que quieras
console.log('   ðŸ“¸ Tomando captura: Nombre descriptivo');
await capturarPantallaMejorada(
  page,
  '02-REGISTRAR_SANCION',
  'PASO_XX_NOMBRE',
  'DescripciÃ³n detallada'
);
```

---

## âš¡ TIPS

1. **Pantallas oscuras**: Si las capturas estÃ¡n oscuras, significa que el modal no se renderizÃ³ completamente
   - Aumenta el `waitForTimeout()` antes de la captura

2. **Capturas cortadas**: Si se ven parciales, agranda la ventana del navegador
   - Playwright abre en 1280x720 por defecto

3. **MÃºltiples capturas**: Si el test se ejecuta varias veces, verÃ¡s mÃºltiples archivos con `[timestamp]`
   - Las mÃ¡s recientes estÃ¡n al final del nombre

---

## ðŸ“‹ CHECKLIST

- [x] Test 02 generera 3 capturas automÃ¡ticas
- [x] Captura 1: Agregar SanciÃ³n (PASO 10)
- [x] Captura 2: Validaciones (PASO 15)
- [x] Captura 3: BotÃ³n Guardar (PASO 15)
- [x] UbicaciÃ³n: `test-results/casos-prueba-02-registrar-sancion-chromium/`
- [x] Nombres descriptivos incluyen timestamps
- [x] Se pueden agregar mÃ¡s capturas si es necesario


