# 📘 Glosario + Plantilla Profesional

## 🧠 Glosario de términos
- **Caso**: flujo end-to-end de un test (01, 02, 03, 04).
- **Modal**: ventana emergente dentro del flujo (ej.: Detalle de sanción, Cabecera reconsideración).
- **Formulario lleno**: captura previa a guardar con todos los campos completos.
- **Toast de éxito**: mensaje verde en esquina superior derecha.
- **Ref1/Ref2**: referencias únicas en nombres de archivos (RUC, Razón Social, Administrado, N° Reconsideración).

---

## 🖼️ Convención de nombres de screenshots
Formato:
```
CASO_[MODAL]_ETIQUETA_REF1_REF2_YYYY-MM-DDThh-mm-ss.png
```
Reglas:
- **ETIQUETA**: siempre incluye `FORMULARIO` o `EXITO`.
- **MODAL**: solo se incluye si es distinto al nombre del caso.
- **REF1/REF2**: identificadores clave (RUC/Razón Social, Administrado, N° Reconsideración).

Ejemplos:
- `01-AGREGAR_ADMINISTRADO_FORMULARIO_20123456789_EMPRESA_COMERCIAL_2026-01-26T10-30-15.png`
- `02-REGISTRAR_SANCION_DETALLE_SANCION_EXITO_DETALLE_3_ADMIN_2026-01-26T10-45-10.png`
- `03-RECONSIDERAR-SIN-SANCIONES_CABECERA_RECONSIDERACION_EXITO_RECONSID_N_1234-2026_2026-01-26T11-05-00.png`

---

## 🧩 Plantilla profesional de test
```typescript
import { test } from '@playwright/test';
import { iniciarSesionYNavegar, capturarFormularioLleno, capturarToastExito } from '../utilidades/reginsa-actions';

test('XX-NOMBRE-CASO', async ({ page }) => {
  test.setTimeout(180000);

  // 1) Setup
  await iniciarSesionYNavegar(page, 'infractor');

  // 2) Preparar datos
  const ref1 = '...';
  const ref2 = '...';

  // 3) Llenar formulario
  // ... completar campos

  // 4) Captura formulario lleno
  await capturarFormularioLleno(page, 'XX-NOMBRE-CASO', ref1, ref2, 'NOMBRE_MODAL');

  // 5) Guardar
  // ... click guardar

  // 6) Captura éxito
  await capturarToastExito(page, 'XX-NOMBRE-CASO', 'EXITO', ref1, ref2, 'NOMBRE_MODAL');
});
```

---

## ✅ Checklist por caso
- [ ] Login + navegación correctos
- [ ] Datos únicos cuando aplica
- [ ] Captura FORMULARIO antes de guardar
- [ ] Guardar
- [ ] Captura EXITO (toast verde)
- [ ] Reportes generados
