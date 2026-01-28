# 🧪 Crear casos de prueba manualmente (Plantilla profesional)

## ✅ Estructura recomendada
1. Crear archivo en `tests/casos-prueba/` con nombre:
   - `05-nombre-del-caso.spec.ts`
2. Usar la plantilla base (ejemplo abajo).
3. Reutilizar helpers de `tests/utilidades/reginsa-actions.ts`.

---

## ✅ Extensiones requeridas (VS Code)
- Playwright Test for VS Code (`ms-playwright.playwright`)
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)

---

## ✅ Plantilla base
```typescript
import { test } from '@playwright/test';
import {
  iniciarSesionYNavegar,
  capturarFormularioLleno,
  capturarToastExito
} from '../utilidades/reginsa-actions';

test('05-NOMBRE-DEL-CASO', async ({ page }) => {
  test.setTimeout(180000);

  // 1) Login + navegación
  await iniciarSesionYNavegar(page, 'infractor');

  // 2) Completar formulario
  const ref1 = 'REFERENCIA_1';
  const ref2 = 'REFERENCIA_2';
  // ... completar campos

  // 3) Captura formulario lleno
  await capturarFormularioLleno(page, '05-NOMBRE-DEL-CASO', ref1, ref2, 'NOMBRE_MODAL');

  // 4) Guardar
  // ... click guardar

  // 5) Captura de éxito
  await capturarToastExito(page, '05-NOMBRE-DEL-CASO', 'EXITO', ref1, ref2, 'NOMBRE_MODAL');
});
```

---

## ✅ Convenciones
- Fecha/expediente/resolución con año de la fecha.
- Capturas con etiquetas `FORMULARIO` y `EXITO`.
- Modal solo si es distinto al nombre del caso.

---

## ✅ Registrar el caso en scripts
- Agrega un script en `package.json`, por ejemplo:
  ```json
  "test:05": "playwright test tests/casos-prueba/05-nombre-del-caso.spec.ts --headed && npm run reports:open"
  ```
