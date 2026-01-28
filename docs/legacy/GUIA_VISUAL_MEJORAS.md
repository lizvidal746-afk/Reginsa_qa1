# 📸 GUÍA VISUAL - Mejoras de Screenshots y Selector

## 1️⃣ ANTES vs DESPUÉS - Nombres de Capturas

### ANTES (Genérico):
```
screenshot_2026-01-19_timestamp.png
screenshot_caso02_2026-01-19_timestamp.png
02-registrar-sancion_EXITOSO.png
```

❌ No incluye: Caso, RUC, Empresa, Administrado, Expediente
❌ Imposible saber qué datos se usaron
❌ Difícil trackear en reportes

---

### AHORA (Enriquecido):

#### Caso 01 - Agregar Administrado:
```
✅ 01-AGREGAR_ADMINISTRADO_ANTES_GUARDAR_RUC_49924040194_Empresa_comercial_1_2026-01-19T20-58-30-705Z.png
   │   │                    │          │        │              │
   │   │                    │          │        │              └─ Timestamp preciso
   │   │                    │          │        └─ Nombre de la empresa
   │   │                    │          └─ RUC generado
   │   │                    └─ Acción (ANTES_GUARDAR / DESPUES_GUARDAR)
   │   └─ Tipo de caso
   └─ Número de caso
```

#### Caso 02 - Registrar Sanción:
```
✅ 02-REGISTRAR_SANCION_EXITOSO_GUARDAR_Exp_001234_Administrador_Name_2026-01-19T20-58-32-364Z.png
   │   │               │       │      │        │              │
   │   │               │       │      │        │              └─ Timestamp
   │   │               │       │      │        └─ Nombre del administrado
   │   │               │       │      └─ Referencia del expediente
   │   │               │       └─ Acción (EXITOSO / ERROR / COMPLETADO)
   │   │               └─ Etapa del proceso
   │   └─ Tipo de caso
   └─ Número de caso
```

---

## 2️⃣ ESTRUCTURA DE DATOS EN NOMBRES

### Componentes Incluidos:

| Componente | Caso 01 | Caso 02 | Ejemplo |
|-----------|---------|---------|----------|
| Número Caso | ✅ | ✅ | `01`, `02` |
| Tipo Caso | ✅ | ✅ | `AGREGAR_ADMINISTRADO`, `REGISTRAR_SANCION` |
| Paso/Acción | ✅ | ✅ | `ANTES_GUARDAR`, `EXITOSO_GUARDAR` |
| RUC | ✅ | - | `RUC_49924040194` |
| Expediente | - | ✅ | `Exp_001234` |
| Entidad | ✅ | ✅ | `Empresa_comercial_1`, `Administrador_Name` |
| Timestamp | ✅ | ✅ | `2026-01-19T20-58-30-705Z` |

---

## 3️⃣ SELECTOR MEJORADO - Administrado Aleatorio

### ANTES (Problemático):
```typescript
// ❌ FALLA: Selector muy restrictivo
const combobox = page.getByRole('combobox', { name: /Administrado/ });
await combobox.waitFor({ state: 'visible', timeout: 5000 });
// TimeoutError: Timeout 5000ms exceeded
```

**Problemas:**
- Espera 5 segundos completos
- Selector busca exactamente "combobox" con nombre "Administrado"
- No maneja variaciones del DOM
- Lanza excepción que detiene el test

---

### AHORA (Robusto):
```typescript
// ✅ FUNCIONA: Detecta botones y fallbacks
const botones = page.locator('button').filter({ 
  has: page.locator('.ant-select-arrow, svg') 
});
let trigger = botones.first();

await trigger.click();
await page.waitForTimeout(800);

// Intento 1: Role option
const options = await page.getByRole('option').all();

// Intento 2: Fallback a clase Ant Design
if (options.length === 0) {
  const liElements = page.locator('.ant-select-item-option');
  const opcionesAlt = await liElements.all();
}

// Seleccionar aleatoria
const indiceAleatorio = Math.floor(Math.random() * options.length);
await optionSeleccionada.click();
```

**Mejoras:**
- ✅ Detecta elementos por estructura
- ✅ Fallbacks automáticos
- ✅ No lanza excepciones
- ✅ Maneja múltiples selectores

---

## 4️⃣ PUNTOS DE CAPTURA EN CADA CASO

### 📋 CASO 01: Agregar Administrado

```
┌─ LOGIN
│  └─ NAVEGACIÓN
│     └─ ABRIR FORMULARIO
│        └─ ✅ CAPTURA: ANTES_LLENAR
│           ├─ Llenar RUC
│           ├─ Llenar Empresa
│           │  └─ ✅ CAPTURA: ANTES_GUARDAR (RUC + Empresa)
│           ├─ Click Guardar
│           └─ ✅ CAPTURA: DESPUES_GUARDAR (RUC + Empresa)
│              └─ VALIDAR ÉXITO
```

**Capturas en Caso 01:**
- `01-AGREGAR_ADMINISTRADO_ANTES_LLENAR_RUC_XXXX_EmprName_timestamp.png`
- `01-AGREGAR_ADMINISTRADO_ANTES_GUARDAR_RUC_49924040194_Empresa_comercial_1_timestamp.png`
- `01-AGREGAR_ADMINISTRADO_DESPUES_GUARDAR_RUC_49924040194_Empresa_comercial_1_timestamp.png`

---

### 📋 CASO 02: Registrar Sanción

```
┌─ LOGIN
│  └─ NAVEGACIÓN
│     └─ ABRIR FORMULARIO SANCIÓN
│        ├─ ✅ SELECCIONAR ADMINISTRADO ALEATORIO
│        ├─ ✅ LLENAR EXPEDIENTE
│        ├─ ✅ LLENAR RESOLUCIÓN
│        ├─ ✅ LLENAR DATOS
│        │  └─ ✅ CAPTURA: ANTES_GUARDAR (Exp + Admin)
│        ├─ CLICK GUARDAR
│        │  └─ VALIDAR
│        └─ ✅ CAPTURA: EXITOSO_GUARDAR (Exp + Admin)
```

**Capturas en Caso 02:**
- `02-REGISTRAR_SANCION_EXITOSO_GUARDAR_Exp_0001_AdminName_timestamp.png`
- `02-REGISTRAR_SANCION_ERROR_GUARDAR_Exp_0001_AdminName_timestamp.png` (si hay error)
- `02-REGISTRAR_SANCION_ERROR_CRITICO_ERROR_TEST_FAILURE_timestamp.png` (si falla el test)

---

## 5️⃣ BENEFICIOS PARA REPORTES

### 🎯 Reportes Automáticos:
```json
{
  "caso": "01",
  "tipo": "AGREGAR_ADMINISTRADO",
  "ruc": "49924040194",
  "empresa": "Empresa_comercial_1",
  "screenshots": [
    {
      "nombre": "ANTES_GUARDAR",
      "archivo": "01-AGREGAR_ADMINISTRADO_ANTES_GUARDAR_...",
      "timestamp": "2026-01-19T20:58:30.705Z"
    },
    {
      "nombre": "DESPUES_GUARDAR",
      "archivo": "01-AGREGAR_ADMINISTRADO_DESPUES_GUARDAR_...",
      "timestamp": "2026-01-19T20:58:32.364Z"
    }
  ]
}
```

### 📊 Análisis de Capturas:
- ✅ Agrupar por caso fácilmente
- ✅ Filtrar por RUC o expediente
- ✅ Correlacionar screenshots con datos
- ✅ Timeline visual de la ejecución
- ✅ Comparar ANTES/DESPUÉS

---

## 6️⃣ EJEMPLO DE EJECUCIÓN

### Consola Output:

```
📱 CASO 01: AGREGAR ADMINISTRADO
🎲 Generando RUC: 49924040194
📝 Nombre Empresa: Empresa comercial 1
📸 Screenshot: ./screenshots/01-AGREGAR_ADMINISTRADO_ANTES_LLENAR_RUC_49924040194_Empresa_comercial_1_2026-01-19T20-58-28-156Z.png
📸 Screenshot: ./screenshots/01-AGREGAR_ADMINISTRADO_ANTES_GUARDAR_RUC_49924040194_Empresa_comercial_1_2026-01-19T20-58-30-705Z.png
✅ Administrado guardado exitosamente
📸 Screenshot: ./screenshots/01-AGREGAR_ADMINISTRADO_DESPUES_GUARDAR_RUC_49924040194_Empresa_comercial_1_2026-01-19T20-58-32-364Z.png

📱 CASO 02: REGISTRAR SANCIÓN
🎲 Seleccionando administrado aleatorio...
✅ Administrado seleccionado: ADMON - Juan García López
📝 Datos:
   - Administrado: ADMON - Juan García López
   - Expediente: Exp N° 0001-2026
   - Resolución: Res N° 0001-2026
📸 Screenshot: ./screenshots/02-REGISTRAR_SANCION_EXITOSO_GUARDAR_Exp_0001_ADMON_Juan_García_López_2026-01-19T20-59-10-234Z.png
✅ SANCIÓN REGISTRADA EXITOSAMENTE
```

### Carpeta de Screenshots Resultante:

```
screenshots/
├── 01-AGREGAR_ADMINISTRADO_ANTES_LLENAR_RUC_49924040194_Empresa_comercial_1_2026-01-19T20-58-28-156Z.png
├── 01-AGREGAR_ADMINISTRADO_ANTES_GUARDAR_RUC_49924040194_Empresa_comercial_1_2026-01-19T20-58-30-705Z.png
├── 01-AGREGAR_ADMINISTRADO_DESPUES_GUARDAR_RUC_49924040194_Empresa_comercial_1_2026-01-19T20-58-32-364Z.png
├── 02-REGISTRAR_SANCION_EXITOSO_GUARDAR_Exp_0001_ADMON_Juan_García_López_2026-01-19T20-59-10-234Z.png
└── ... más capturas ...
```

---

## 7️⃣ COMANDOS PARA EJECUTAR

### Opción 1: Ejecutar ambos casos
```bash
npm run test:all
# O
npm run test:01 && npm run test:02
```

### Opción 2: Ejecutar por separado
```bash
npm run test:01  # Solo Caso 01
npm run test:02  # Solo Caso 02
```

### Opción 3: Usar script batch (Windows)
```bash
run-tests-full.bat
```

---

## ✅ CHECKLIST DE VALIDACIÓN

- [ ] Caso 01 se ejecuta correctamente
- [ ] Caso 01 captura 3 screenshots (ANTES_LLENAR, ANTES_GUARDAR, DESPUES_GUARDAR)
- [ ] Nombres incluyen: Caso, Paso, RUC, Empresa, Timestamp
- [ ] Caso 02 se ejecuta correctamente
- [ ] Caso 02 selector de administrado funciona (sin timeouts)
- [ ] Caso 02 captura screenshots con información correcta
- [ ] Nombres incluyen: Caso, Paso, Expediente, Administrado, Timestamp
- [ ] Todos los timestamps son únicos
- [ ] Carpeta `screenshots/` contiene todas las capturas
- [ ] JSON report actualizado con rutas correctas

---

**Estado: ✅ LISTO PARA EJECUCIÓN**
