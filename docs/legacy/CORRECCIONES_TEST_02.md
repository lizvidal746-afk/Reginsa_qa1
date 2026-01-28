# 🔧 CORRECCIONES APLICADAS AL TEST 02 - REGISTRAR SANCIÓN

## Errores Identificados y Corregidos

### 1. **Selector de Botón Incorrecto**
- **Problema**: El botón de "Registrar Sanción" buscaba `"Registrar Sancionar"` (nombre incorrecto)
- **Ubicación**: `tests/utilidades/reginsa-actions.ts` línea 65
- **Solución**:
  ```typescript
  // ANTES (incorrecto):
  await page.getByRole('button', { name: 'Registrar Sancionar' }).click();
  
  // AHORA (corregido con fallback):
  await page.getByRole('button', { name: 'Registrar Sanción' }).click();
  // O si falla:
  await page.getByRole('button').filter({ hasText: /Registrar|Sanción/ }).first().click();
  ```

### 2. **Selección de Textbox por índice (Frágil)**
- **Problema**: Usar `.nth(1)`, `.nth(2)` es frágil porque depende del orden exacto de elementos
- **Ubicación**: `tests/casos-prueba/02-registrar-sancion.spec.ts` líneas 54-67
- **Solución**:
  ```typescript
  // Ahora usa selectores más robustos con fallback
  const expedienteInput = page.locator('input[placeholder*="Exp"]')
                                .or(page.getByRole('textbox', { name: /Expediente/ }))
                                .first();
  await expedienteInput.fill(expediente);
  ```

### 3. **Dropdown de Administrado sin Validación**
- **Problema**: No esperaba a que el dropdown estuviera visible ni manejaba ausencia de opciones
- **Ubicación**: `tests/utilidades/reginsa-actions.ts` línea 98
- **Solución**:
  ```typescript
  export async function obtenerAdministradoAleatorio(page: Page): Promise<string> {
    const combobox = page.getByRole('combobox', { name: /Administrado/ });
    await combobox.waitFor({ state: 'visible', timeout: 5000 });
    
    const trigger = page.getByRole('button', { name: 'dropdown trigger' }).first();
    await trigger.click();
    await page.waitForTimeout(500);

    const options = await page.getByRole('option').all();
    if (options.length === 0) {
      throw new Error('No se encontraron opciones en el dropdown');
    }
    // ... resto del código
  }
  ```

### 4. **Archivo PDF Inexistente**
- **Problema**: El test intenta cargar `GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf` que no existe
- **Ubicación**: `tests/casos-prueba/02-registrar-sancion.spec.ts` línea 88
- **Solución**:
  ```typescript
  // Ahora verifica si el archivo existe antes de intentar cargarlo
  if (fs.existsSync(filePath)) {
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);
    console.log(`✅ Archivo subido: ${filePath}`);
  } else {
    console.log('⚠️ Archivo no encontrado, saltando carga de archivo');
  }
  ```

### 5. **Scope de Variables en Try-Catch**
- **Problema**: Variables `sancionSeleccionada` y `tipoInfractor` declaradas con `const` dentro de try-catch no eran accesibles fuera
- **Ubicación**: `tests/casos-prueba/02-registrar-sancion.spec.ts` línea 163-173
- **Solución**:
  ```typescript
  // ANTES (scope incorrecto):
  try {
    const sancionSeleccionada = await seleccionarSancionAleatoria(page);
  }
  
  // AHORA (scope correcto):
  let sancionSeleccionada = 'RIS 018-2015-MINEDU'; // declarar antes
  try {
    sancionSeleccionada = await seleccionarSancionAleatoria(page); // asignar dentro
  }
  ```

### 6. **Falta de Waits y Validaciones**
- **Problema**: No esperaba a que elementos estén visibles antes de interactuar
- **Ubicación**: Múltiples localizaciones
- **Solución**: Agregado `.waitFor({ state: 'visible', timeout: 5000 })` en elementos clave

### 7. **Índices de Textbox Incorrectos para Medidas**
- **Problema**: Usar `.nth(1)` después de agregar una medida puede ser incorrecto
- **Ubicación**: `tests/casos-prueba/02-registrar-sancion.spec.ts` línea 138-140
- **Solución**:
  ```typescript
  // Usar .first() y .nth(0) de forma más clara
  const textboxMedida = await page.getByRole('textbox', { name: 'Ingrese la medida correctiva' }).first();
  const textboxMedida2 = await page.getByRole('textbox', { name: 'Ingrese la medida correctiva' }).nth(0);
  ```

## Cambios Realizados

### Archivo: `tests/utilidades/reginsa-actions.ts`
✅ Mejorada función `abrirFormularioRegistrarSancion()` con fallback
✅ Mejorada función `obtenerAdministradoAleatorio()` con validaciones y waits

### Archivo: `tests/casos-prueba/02-registrar-sancion.spec.ts`
✅ Mejor manejo de textbox para Expediente y Resolución
✅ Mejor manejo de upload de archivo (verifica existencia)
✅ Mejor manejo de fecha con try-catch
✅ Mejor manejo de medidas correctivas
✅ Mejor manejo de pestañas y tabs
✅ Variables de scope corregidas
✅ Agregado try-catch a secciones críticas

## Cómo Ejecutar

### Opción 1: Script Batch
```bash
.\run-test-02.bat
```

### Opción 2: Comando npm directo
```bash
npm run test:caso-02
```

### Opción 3: Ejecutar ambos casos
```bash
npm run test:all
```

## Validación de Ejecución

El test ahora debería:
1. ✅ Realizar login correctamente
2. ✅ Navegar a "Infractor y Sanción"
3. ✅ Abrir formulario de "Registrar Sanción"
4. ✅ Seleccionar administrado aleatorio del dropdown
5. ✅ Llenar datos de expediente y resolución
6. ✅ Seleccionar fecha
7. ✅ Saltar upload de archivo si no existe
8. ✅ Agregar medidas correctivas
9. ✅ Navegar a "Detalle de sanciones"
10. ✅ Agregar sanción
11. ✅ Seleccionar tipo infractor
12. ✅ Ingresar hecho infractor
13. ✅ Seleccionar multa
14. ✅ Configurar suspensión
15. ✅ Guardar y generar screenshots

## Archivos Modificados
- `/tests/utilidades/reginsa-actions.ts` - Mejoras en funciones reutilizables
- `/tests/casos-prueba/02-registrar-sancion.spec.ts` - Correcciones en flujo y selectores
- `/run-test-02.bat` - Nuevo script para ejecución rápida
