# 📋 PLANTILLA PARA TUS SIGUIENTES CASOS (03, 04, 05...)

## 🎯 ESTRUCTURA BASE

Copia este patrón para tus nuevos casos:

```typescript
// tests/casos-prueba/03-tu-nombre.spec.ts

import { test, expect } from '@playwright/test';
import { flujoCompartido } from '../utilidades/flujo-compartido';
import { capturarPantallaMejorada } from '../utilidades/reginsa-actions';

test('Caso 03: Tu descripción aquí', async ({ page }) => {
  // 1️⃣ LOGIN (Reutilizable)
  await flujoCompartido(page, 'lizvidal', 'QA1234510qa');
  
  // 2️⃣ TU CÓDIGO AQUÍ
  await page.goto('url-especifica-si-necesitas');
  await page.locator('selector').click();
  
  // 3️⃣ SCREENSHOT ANTES
  await capturarPantallaMejorada(
    page,
    'caso_03',
    'paso_1_nombre_descriptivo',
    'ruc-aqui',
    'Razón Social'
  );
  
  // 4️⃣ MÁS ACCIONES
  await page.locator('otro-selector').fill('valor');
  
  // 5️⃣ SCREENSHOT DESPUÉS
  await capturarPantallaMejorada(
    page,
    'caso_03',
    'paso_2_nombre_descriptivo',
    'ruc-aqui',
    'Razón Social'
  );
  
  // 6️⃣ VALIDACIÓN
  expect(await page.locator('resultado').isVisible()).toBe(true);
});
```

---

## 📝 CONVENCIONES

### Nombres de archivos:
```
03-tu-descripcion-corta.spec.ts
04-otra-funcionalidad.spec.ts
05-mas-casos.spec.ts
```

### Nombres de tests:
```typescript
test('Caso 03: Registrar XX', async ({ page }) => { ... });
test('Caso 04: Validar YY', async ({ page }) => { ... });
```

### Nombres en screenshots:
```typescript
await capturarPantallaMejorada(
  page,
  'caso_03',           // Número del caso
  'antes_guardar',     // Nombre descriptivo
  'ruc-del-administrado',
  'Nombre de Empresa'
);
```

---

## 🔄 FLUJO RECOMENDADO

### Para cada nuevo caso:

1. **Crear archivo:**
   ```
   tests/casos-prueba/03-tu-nombre.spec.ts
   ```

2. **Copiar estructura base** (arriba)

3. **Reemplazar:**
   - `Tu descripción aquí`
   - `'caso_03'` → `'caso_04'`, `'caso_05'`, etc.
   - Selectores reales
   - RUC y Razón Social reales

4. **Ejecutar:**
   ```powershell
   npm run test:03
   ```

5. **Ver resultado:**
   ```
   dobla clic: abrir-allure.bat
   ```

---

## ⏱️ TIEMPOS ESTIMADOS

| Caso | Tipo | Tiempo esperado |
|------|------|-----------------|
| **01** | Agregar | 15s |
| **02** | Registrar | 46s |
| **03** | ??? | 20-50s (depende) |
| **04** | ??? | 20-50s (depende) |
| **05** | ??? | 20-50s (depende) |

---

## ✅ CHECKLIST POR CASO

Para cada nuevo caso:
- [ ] Archivo creado: `0X-nombre.spec.ts`
- [ ] Estructura copiada
- [ ] Selectores actualizados
- [ ] Screenshots nombrados
- [ ] Validaciones añadidas
- [ ] `npm run test:0X` funciona
- [ ] Allure muestra el test

---

## 💾 REUTILIZABLE

### Imports que siempre necesitas:
```typescript
import { test, expect } from '@playwright/test';
import { flujoCompartido } from '../utilidades/flujo-compartido';
import { capturarPantallaMejorada } from '../utilidades/reginsa-actions';
```

### Login reutilizable (siempre igual):
```typescript
await flujoCompartido(page, 'lizvidal', 'QA1234510qa');
```

### Screenshots (cambiar número de caso):
```typescript
'caso_03', 'caso_04', 'caso_05'...
```

---

## 🎯 CUÁNDO TERMINES

Cuando termines los 2 casos faltantes, me avisa:
```
✅ Caso 03 listo
✅ Caso 04 listo
✅ Caso 05 listo (si necesitas)

Luego hacemos:
1. Limpieza de código
2. Verificación de tiempos
3. Preparación para próximas fases
```

---

**Usa esta plantilla para mantener consistencia.** ✅
