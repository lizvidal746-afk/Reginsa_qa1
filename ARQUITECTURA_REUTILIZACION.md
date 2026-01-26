## 🏗️ ARQUITECTURA DE REUTILIZACIÓN DE CÓDIGO

### Objetivo
Mantener un único flujo compartido para todos los casos de prueba de "Infractor y Sanción" sin redundancias.

---

## 📦 ESTRUCTURA DE CAPAS

```
tests/
├── casos-prueba/
│   ├── 01-agregar-administrado.spec.ts      (Usa flujo compartido)
│   ├── 02-registrar-sancion.spec.ts         (Usa flujo compartido)
│   └── 03-XX-nuevo-caso.spec.ts             (SERÁ CREADO - Usa flujo compartido)
│
└── utilidades/
    ├── flujo-compartido.ts                  ⭐ FLUJO COMÚN (login + navegación)
    ├── reginsa-actions.ts                   (Funciones específicas)
    └── debug-dropdown.ts                    (Debugging)
```

---

## 🔄 FLUJO COMPARTIDO (flujo-compartido.ts)

```typescript
// ✅ Reutilizable por todos los tests
flujoInicialeInfractionSancion(page)
  └─ Login con credenciales
  └─ Navegación a "Infractor y Sanción"
  └─ Retorna boolean (éxito/fallo)

// Funciones específicas de formularios
abrirFormularioAgregarAdministrado(page)
abrirFormularioRegistrarSancion(page)
```

### Ventajas
- ✅ **DRY** (Don't Repeat Yourself) - Una única definición
- ✅ **Mantenibilidad** - Cambios centralizados
- ✅ **Velocidad de desarrollo** - Nuevos tests en minutos
- ✅ **Consistencia** - Todos los tests usan el mismo flujo

---

## 🧪 CÓMO USAR EN UN NUEVO TEST

```typescript
import { flujoInicialeInfractionSancion } from '../utilidades/flujo-compartido';

test('03-NUEVO CASO: Ejemplo', async ({ page }) => {
  // 1️⃣ Usar flujo compartido (login + navegación)
  const exitoFlujo = await flujoInicialeInfractionSancion(
    page,
    'lizvidal',
    'QA1234510qa'
  );
  
  if (!exitoFlujo) {
    throw new Error('Falló el flujo inicial');
  }

  // 2️⃣ Ahora estamos en "Infractor y Sanción"
  // Específico del nuevo caso de prueba...
});
```

---

## ⏱️ OPTIMIZACIÓN DE TIEMPOS

### Tiempos Actuales (después de ampliaciones)
- PASO 1-3: ~5s (login + navegación)
- PASO 4: ~10s (dropdown con 34 opciones)
- PASO 6-13: ~15s (llenar formularios + selecciones)
- PASO 14-15: ~10s (guardar + validación)
- **Total: 46.1s por test**

### Oportunidades de Optimización

#### 1. **Reducir esperas fijas**
```typescript
// ❌ ANTES - Espera fija
await page.waitForTimeout(500);

// ✅ DESPUÉS - Espera inteligente
await page.locator('.p-dropdown-panel').waitFor({ 
  state: 'visible', 
  timeout: 2000 
});
```

#### 2. **Paralelizar acciones**
```typescript
// ✅ Hacer múltiples clicks en paralelo
await Promise.all([
  page.locator('selector1').click(),
  page.locator('selector2').click(),
]);
```

#### 3. **Lazy loading de recursos**
```typescript
// No capturar screenshot si ya existe
const capturaExiste = fs.existsSync(rutaArchivo);
if (!capturaExiste) {
  await capturarPantalla(page);
}
```

### Estimación Post-Optimización
- **Reducción esperada**: 30-40%
- **Nuevo tiempo**: 25-35s por test
- Con Selenium Grid: **Ejecución paralela de múltiples tests**

---

## 🔗 FLUJO COMPLETO DE INTEGRACIÓN

```
New Test Case
    ↓
flujoInicialeInfractionSancion()  ← Compartido
    ↓
[Login + Navegación]
    ↓
Caso específico
    ↓
abrirFormularioXXX()
    ↓
[Llenar datos específicos]
    ↓
[Guardar y validar]
    ↓
✅ Test completo
```

---

## 📊 REPORTES ACTIVOS

### 1. **Playwright Report** (HTML)
```bash
npm run test:02
# Genera: playwright-report/index.html
```

### 2. **Allure Report**
```bash
npm run test:02
# Genera: allure-results/

# Ver reporte:
npm install -g allure-commandline
allure serve allure-results
```

### 3. **Ver últimos reportes**
```bash
# Playwright
npx playwright show-report

# Allure
allure serve allure-results
```

---

## 🚀 PRÓXIMOS PASOS

### Corto Plazo (Hoy)
1. ✅ Crear flujo compartido
2. ✅ Refactorizar 01 y 02 para usar flujo compartido
3. ✅ Activar reportes

### Mediano Plazo (Esta semana)
1. Crear casos 03, 04, 05... usando flujo compartido
2. Optimizar tiempos (reducir waitForTimeout)
3. Implementar Selenium Grid

### Largo Plazo (Este mes)
1. Parallelizar tests en Grid
2. Integración con CI/CD
3. Reportes consolidados

---

## 📝 TEMPLATE PARA NUEVO TEST

```typescript
import { test } from '@playwright/test';
import { flujoInicialeInfractionSancion } from '../utilidades/flujo-compartido';

test('0X-NUEVO CASO: Descripción', async ({ page }) => {
  // Setup compartido
  const exito = await flujoInicialeInfractionSancion(page);
  if (!exito) throw new Error('Setup fallido');

  // Implementación específica del caso
  console.log('🎯 Comenzando caso específico...');
  
  // Test logic aquí...
  
  console.log('✅ Caso completado');
});
```

---

## 📌 RESUMEN

| Aspecto | Antes | Después |
|--------|-------|---------|
| **Redundancia de código** | ❌ Duplicado en cada test | ✅ Compartido en función |
| **Tiempos** | 46s | ~25-35s (con optimizaciones) |
| **Nuevos tests** | ⏱️ 30min c/u | ⚡ 5min c/u |
| **Mantenibilidad** | 😫 Múltiples cambios | 😊 Un solo archivo |
| **Reportes** | ❌ No visible | ✅ HTML + Allure |
| **Parallelización** | ❌ Serial | ✅ Con Grid (futuro) |

