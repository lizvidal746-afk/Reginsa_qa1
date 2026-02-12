# 📋 Casos de Prueba - REGINSA SUNEDU

## 📑 Índice

1. [Caso de Prueba 01 - AGREGAR ADMINISTRADO](#caso-de-prueba-01---agregar-administrado)
2. [Caso de Prueba 02 - REGISTRAR SANCIÓN](#caso-de-prueba-02---registrar-sancion)

---

## Caso de Prueba 01 - Agregar Administrado

### 📊 Información General (Agregar Administrado)

- **ID:** 01
- **Nombre:** AGREGAR ADMINISTRADO
- **Descripción:** Automatiza el registro de nuevas empresas administradas en REGINSA SUNEDU
- **Estado:** ✅ COMPLETADO
- **Archivo:** `tests/casos-prueba/01-agregar-administrado.spec.ts`

### 🎯 Objetivo (Agregar Administrado)

Validar que un usuario autenticado pueda crear un nuevo registro de administrado con datos correctos.

### 📋 Precondiciones (Agregar Administrado)

- ✅ Usuario autenticado en REGINSA SUNEDU
- ✅ Acceso a la sección "Infractor y Sanción"
- ✅ Navegador con Playwright instalado

### 🔄 Flujo del Test (Agregar Administrado)

#### Paso 1: Autenticación

```text
HOME → "Acceder Ahora" → Login (lizvidal / QA1234510qa) → Dashboard
```

#### Paso 2: Navegación

```text
Dashboard → Menú Izquierdo: "Infractor y Sanción" → Página de Sanciones
```

#### Paso 3: Nuevo Registro

```text
Botón "Nuevo" (nth(3)) → Abre Formulario Vacío
```

#### Paso 4: Llenar Datos

```text
1. RUC: Genera automáticamente (11 dígitos únicos)
2. Razón Social: "Empresa comercial 1"
3. Nombre Comercial: "Empresa comercial 1"
4. Estado: Selecciona "Licenciada"
```

#### Paso 5: Validación Visual (ANTES)

```text
📸 Captura de pantalla con TODOS los campos llenos
Nombre: Empresa_comercial_1_RUC_{RUC}_ANTES_GUARDAR.png
```

#### Paso 6: Guardar

```text
Click Botón "Guardar"
```

#### Paso 7: Validación Visual (DESPUÉS)

```text
📸 Captura de pantalla con mensaje de éxito
Nombre: Empresa_comercial_1_RUC_{RUC}_DESPUES_GUARDAR.png
```

#### Paso 8: Validación de Éxito

```text
✅ Busca mensaje: "Guardado" / "Exitoso" / "éxito"
✅ Actualiza JSON de reportes
```

### 📊 Datos de Prueba (Agregar Administrado)

| Campo            | Valor                      | Tipo      |
|------------------|----------------------------|-----------|
| RUC              | Auto-generado (11 dígitos) | String    |
| Razón Social     | Empresa comercial 1        | String    |
| Nombre Comercial | Empresa comercial 1        | String    |
| Estado           | Licenciada                 | Selección |

### ⚠️ Manejo de Errores (Agregar Administrado)

**Si RUC existe (duplicado):**

- Genera nuevo RUC automáticamente
- Limpia campos
- Reintenta (máx. 3 intentos)
- Si falla 3 veces: Registra error y termina

**Si elemento no encontrado:**

- Captura error con mensaje
- Genera screenshot de error
- Registra en logs

### 📸 Capturas Generadas (Agregar Administrado)

**ANTES de Guardar:**

```text
📸 Empresa_comercial_1_RUC_12345678901_ANTES_GUARDAR.png
- Formulario completo
- Todos los campos llenos
- Estado: Licenciada seleccionado
```

**DESPUÉS de Guardar:**

```text
📸 Empresa_comercial_1_RUC_12345678901_DESPUES_GUARDAR.png
- Mensaje de confirmación visible
- Validación de éxito
```

### ✅ Criterios de Aceptación (Agregar Administrado)

- [x] Login exitoso en REGINSA SUNEDU
- [x] Navegación a "Infractor y Sanción"
- [x] Formulario nuevo administrado se abre
- [x] RUC generado con 11 dígitos
- [x] Razón Social y Nombre Comercial correctos
- [x] Estado "Licenciada" seleccionado
- [x] Screenshot ANTES de guardar capturado
- [x] Click en "Guardar" ejecutado
- [x] Mensaje de éxito validado
- [x] Screenshot DESPUÉS de guardar capturado
- [x] JSON actualizado con registro
- [x] Reintentos funcionan si RUC duplicado

### 🚀 Ejecutar (Agregar Administrado)

```bash
# Con UI
npm run test:admin

# Con navegador visible
npm run test:admin:headed

# Solo este caso
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --headed
```

### 📊 Resultados Esperados (Agregar Administrado)

```text
✅ 1 administrado registrado exitosamente
✅ RUC único generado (11 dígitos)
✅ 2 screenshots capturados (ANTES y DESPUÉS)
✅ JSON actualizado con datos
✅ Reportes generados (HTML, Playwright, Allure)
```

---

## Caso de Prueba 02 - Registrar Sancion

### 📊 Información General (Registrar Sancion)

- **ID:** 02
- **Nombre:** REGISTRAR SANCIÓN
- **Descripción:** Automatiza el registro de sanciones a un administrado existente en REGINSA SUNEDU
- **Estado:** ✅ COMPLETADO
- **Archivo:** `tests/casos-prueba/02-registrar-sancion.spec.ts`

### 🎯 Objetivo (Registrar Sanción)

Validar que un usuario autenticado pueda registrar una sanción correctamente a un administrado, llenando todos los campos requeridos y generando los reportes correspondientes.

### 📋 Precondiciones (Registrar Sanción)

- ✅ Usuario autenticado en REGINSA SUNEDU
- ✅ Acceso a la sección "Infractor y Sanción"
- ✅ Navegador con Playwright instalado

### 🔄 Flujo del Test (Registrar Sancion)

#### Paso 1: Autenticación (ingresar usuario y contraseña)

---text
HOME → "Acceder Ahora" → Login → Dashboard

#### Paso 2: Selección de Administrado

```text
Dashboard → Menú Izquierdo: "Infractor y Sanción" → Selección de administrado existente
```

#### Paso 3: Llenar Datos de Sanción

```text
1. Nº de Expediente: Generado automáticamente
2. Nº de Resolución: Generado automáticamente
3. Fecha de Resolución: Seleccionada aleatoriamente
4. Adjuntar archivo (opcional)
5. Llenar medidas correctivas y sanciones
```

#### Paso 4: Guardar y Validar

```text
Click en "Guardar" → Validar mensaje de éxito
```

#### Paso 5: Capturas y Reportes

```text
📸 Captura antes y después de guardar
✅ Reportes generados: Playwright y Allure
```

### 📊 Datos de Prueba (Registrar Sancion)

| Campo             | Valor          | Tipo    |
|-------------------|----------------|---------|
| Nº Expediente     | Auto-generado  | String  |
| Nº Resolución     | Auto-generado  | String  |
| Fecha Resolución  | Aleatoria      | Fecha   |
| Medidas           | Varias         | String  |
| Sanciones         | Varias         | String  |

### ✅ Criterios de Aceptación (Registrar Sancion)

- [x] Login exitoso
- [x] Selección de administrado
- [x] Llenado de todos los campos requeridos
- [x] Guardado exitoso
- [x] Capturas generadas
- [x] Reportes Playwright y Allure generados

### 🚀 Ejecutar (Registrar Sancion)

```bash
# Con UI
npm run test:02

# Con navegador visible
npm run test:02 -- --headed

# Solo este caso
npx playwright test tests/casos-prueba/02-registrar-sancion.spec.ts --headed
```

### 📊 Resultados Esperados (Registrar Sancion)

```text
✅ Sanción registrada exitosamente
✅ Capturas generadas (antes y después)
✅ Reportes Playwright y Allure generados
```

---

## 📚 Documentación General

- [README.md](../README.md) - Información general del proyecto
- [PROMPT_REQUISITO.md](../PROMPT_REQUISITO.md) - Especificaciones técnicas
- [CAMBIOS_IMPLEMENTADOS.md](../CAMBIOS_IMPLEMENTADOS.md) - Log de cambios

---

## 📞 Información de Ejecución

### Reportes Generados

1. **JSON**: `reportes/registros-administrados.json`
2. **HTML**: `reporte-administrados.html`
3. **Playwright**: `playwright-report/`
4. **Allure**: `allure-report/`

### Screenshots

- **Ubicación**: `screenshots/`
- **Patrón**: `{RazonSocial}_RUC_{RUC}_{ESTADO}.png`

---

**Última actualización:** Enero 2026  
**Versión:** 1.0.0
