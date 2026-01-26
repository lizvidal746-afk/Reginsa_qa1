# 📋 CASOS DE PRUEBA ACTUALES

## ✅ CASOS DE PRUEBA VÁLIDOS

### Caso 01: Agregar Administrado
- **Archivo**: `tests/casos-prueba/01-agregar-administrado.spec.ts`
- **Comando**: `npm run test:01` o `npm run test:caso-01`
- **Objetivo**: Registrar un nuevo administrado (institución educativa)
- **Estado**: ✅ Funcional

### Caso 02: Registrar Sanción
- **Archivo**: `tests/casos-prueba/02-registrar-sancion.spec.ts`
- **Comando**: `npm run test:02` o `npm run test:caso-02`
- **Objetivo**: Registrar una sanción a un administrado
- **Estado**: 🔄 En corrección (PrimeNG dropdown actualizado)
- **Próximamente**: Capturas de:
  1. Agregar sanción (PASO 10)
  2. Validación de campos
  3. Botón Guardar (pestaña Datos del administrado)

---

## ❌ ARCHIVOS DESCONTINUADOS

El siguiente archivo NO debe ejecutarse (era solo para debugging):
- ❌ `tests/utilidades/debug-dropdown.ts` (NO es spec.ts)
- ❌ `tests/casos-prueba/debug-dropdown.spec.ts` (SI EXISTÍA, DEBE ELIMINARSE)

---

## 🚀 COMANDOS DISPONIBLES

### Ejecutar casos individuales:
```bash
npm run test:01      # Solo Caso 01: Agregar Administrado
npm run test:02      # Solo Caso 02: Registrar Sanción
```

### Ejecutar todos:
```bash
npm run test:all     # Ejecuta ambos casos (01 y 02)
```

### Ver reportes:
```bash
npm run report:playwright    # Reporte detallado de Playwright
npm run report:allure:open   # Reporte Allure (si existe)
```

---

## 📊 ESTRUCTURA DE CASOS

```
tests/casos-prueba/
├── 01-agregar-administrado.spec.ts      ✅ ACTIVO
├── 02-registrar-sancion.spec.ts         🔄 EN CORRECCIÓN
└── README.md                             (documentación)

tests/utilidades/
├── reginsa-actions.ts                   (funciones auxiliares)
├── screenshot-utils.ts                  (captura de pantallas)
├── debug-dropdown.ts                    ⚠️  SOLO UTILIDAD (no es test)
└── ... (otros archivos)
```

---

## 📸 CAPTURAS ESPERADAS PARA CASO 02

Se esperan 3 capturas principales:

### 1. Agregar Sanción (PASO 10)
- Mostrar: Modal con lista de sanciones
- Ubicación: Pestaña "Detalle de sanciones"
- Elementos: Botón "Agregar sanción", dropdown de sanciones

### 2. Mensaje de Validación
- Mostrar: Validaciones de campos requeridos
- Ubicación: Pestaña "Datos del administrado"
- Elementos: Campos con borde rojo, mensajes de error

### 3. Botón Guardar
- Mostrar: Botón "Guardar" con formulario completo
- Ubicación: Parte superior derecha del modal
- Elementos: Estado del botón (activo/deshabilitado)
- Mensaje de éxito después de guardar

---

## 🎯 RESUMEN PARA EJECUTAR

### Paso 1: Eliminar debug-dropdown.spec.ts
Si aún existe, elimínalo manualmente o usa:
```bash
rm tests/casos-prueba/debug-dropdown.spec.ts
```

### Paso 2: Ejecutar Caso 02
```bash
npm run test:02
```

### Paso 3: Capturar pantallas cuando aparezcan:
- Cuando agregue sanción
- Cuando muestre validaciones
- Cuando muestre el botón Guardar

---

## ✅ CHECKLIST FINAL

- [ ] `01-agregar-administrado.spec.ts` existe y es válido
- [ ] `02-registrar-sancion.spec.ts` existe y es válido
- [ ] `debug-dropdown.spec.ts` ha sido eliminado (o nunca existió)
- [ ] `package.json` solo referencia casos 01 y 02
- [ ] Comando `npm run test:02` ejecuta sin errores
- [ ] Se capturan las 3 pantallas esperadas

