# 🎯 Estructura de Archivos de Prueba - ORGANIZADO

## ✅ CASOS REALES (Ejecutables)

```
tests/
└── casos-prueba/
    ├── 01-agregar-administrado.spec.ts      ✅ CASO 01 
    └── 02-registrar-sancion.spec.ts         ✅ CASO 02 (FUNCIONAL - 46.1s)
```

Estos son los archivos **reales** que se ejecutan:
```bash
npm run test:01
npm run test:02
```

## ❌ REFERENCIAS (NO Ejecutables)

```
tests/
└── _referencias/
    ├── LEEME.md                             📖 Documentación
    ├── test-admin-registro.spec.ts          🔍 Experimento antiguo
    ├── test-admin-2registros.spec.ts        🔍 Experimento antiguo
    ├── test-1.spec.ts                       🎬 Codegen - login básico
    └── test-2.spec.ts                       🎬 Codegen - flujo sanción (base para 02)
```

### Por qué están aquí:
- **test-admin-*.spec.ts**: Intentos iniciales con hardcodeo y RUC múltiples
- **test-1.spec.ts**: Grabación Codegen básica - valores hardcodeados
- **test-2.spec.ts**: Grabación Codegen completa - sirvió de **GUÍA** para crear 02-registrar-sancion.spec.ts

### ⚠️ NUNCA ejecutar directamente:
```bash
# ESTOS NO FUNCIONAN - NO USAR:
npm run test    # Solo ejecuta 01 y 02
npx playwright test --grep "test-admin"    # Excluidos ✅
npx playwright test --grep "test-1"        # Excluidos ✅
```

## 🛠️ Configuración

`playwright.config.js` tiene:
```javascript
testIgnore: ['**/_referencias/**']
```

Esto hace que:
- ✅ Allure solo muestra Caso 01 y 02
- ✅ Reportes más limpios
- ✅ Ejecución más rápida
- ✅ Sin conflictos de nombres

## 📊 Resultado en Allure

Antes (Confuso):
```
chromium
├── casos-prueba/01-agregar-administrado.spec.ts   ✅
├── casos-prueba/02-registrar-sancion.spec.ts      ✅
├── test-admin-registro.spec.ts                    ❓ ¿Qué es?
├── test-admin-2registros.spec.ts                  ❓ ¿Qué es?
├── test-1.spec.ts                                 ❓ ¿Qué es?
└── test-2.spec.ts                                 ❓ ¿Qué es?
```

Después (Limpio):
```
chromium
├── casos-prueba/01-agregar-administrado.spec.ts   ✅
└── casos-prueba/02-registrar-sancion.spec.ts      ✅
```

## 🚀 Próximos Pasos

Para crear Caso 03, 04, 05:

1. **NO copies** los archivos de `_referencias/`
2. **SÍ usa** el template:

```typescript
// tests/casos-prueba/03-nombre-caso.spec.ts
import { test } from '@playwright/test';
import { flujoInicialeInfractionSancion } from '../utilidades/flujo-compartido';

test('03-Nombre del Caso', async ({ page }) => {
  test.setTimeout(60000);
  
  // ✅ Una línea setup
  const exito = await flujoInicialeInfractionSancion(page);
  if (!exito) throw new Error('Setup fallió');
  
  // Tu implementación específica aquí...
});
```

3. Ver documentación: `RESUMEN_FINAL_ARQUITECTURA.md`

## 🎯 Beneficios de esta Organización

| Antes | Después |
|-------|---------|
| 6 archivos confusos en Allure | 2 casos claros |
| No sabías qué era cada archivo | Estructura obvia |
| Posibles errores de ejecutar viejos tests | Solo se ejecutan los válidos |
| 15 minutos para agregar un nuevo caso | 5 minutos para agregar un nuevo caso |

---

**Actualizado**: `playwright.config.js` ahora excluye `_referencias/**`  
**Resultado**: Allure y reportes muestran solo casos reales ✅
