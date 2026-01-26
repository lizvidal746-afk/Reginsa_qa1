# 📋 Casos de Prueba - REGINSA SUNEDU

## 📑 Índice
1. [Caso de Prueba 01 - AGREGAR ADMINISTRADO](#caso-01)
2. [Caso de Prueba 02 - EN DESARROLLO](#caso-02)

---

## <a name="caso-01"></a> 1️⃣ AGREGAR ADMINISTRADO

### 📊 Información General
- **ID:** 01
- **Nombre:** AGREGAR ADMINISTRADO
- **Descripción:** Automatiza el registro de nuevas empresas administradas en REGINSA SUNEDU
- **Estado:** ✅ COMPLETADO
- **Archivo:** `tests/casos-prueba/01-agregar-administrado.spec.ts`

### 🎯 Objetivo
Validar que un usuario autenticado pueda crear un nuevo registro de administrado con datos correctos.

### 📋 Precondiciones
- ✅ Usuario autenticado en REGINSA SUNEDU
- ✅ Acceso a la sección "Infractor y Sanción"
- ✅ Navegador con Playwright instalado

### 🔄 Flujo del Test

#### Paso 1: Autenticación
```
HOME → "Acceder Ahora" → Login (lizvidal / QA1234510qa) → Dashboard
```

#### Paso 2: Navegación
```
Dashboard → Menú Izquierdo: "Infractor y Sanción" → Página de Sanciones
```

#### Paso 3: Nuevo Registro
```
Botón "Nuevo" (nth(3)) → Abre Formulario Vacío
```

#### Paso 4: Llenar Datos
```
1. RUC: Genera automáticamente (11 dígitos únicos)
2. Razón Social: "Empresa comercial 1"
3. Nombre Comercial: "Empresa comercial 1"
4. Estado: Selecciona "Licenciada"
```

#### Paso 5: Validación Visual (ANTES)
```
📸 Captura de pantalla con TODOS los campos llenos
   Nombre: Empresa_comercial_1_RUC_{RUC}_ANTES_GUARDAR.png
```

#### Paso 6: Guardar
```
Click Botón "Guardar"
```

#### Paso 7: Validación Visual (DESPUÉS)
```
📸 Captura de pantalla con mensaje de éxito
   Nombre: Empresa_comercial_1_RUC_{RUC}_DESPUES_GUARDAR.png
```

#### Paso 8: Validación de Éxito
```
✅ Busca mensaje: "Guardado" / "Exitoso" / "éxito"
✅ Actualiza JSON de reportes
```

### 📊 Datos de Prueba

| Campo | Valor | Tipo |
|-------|-------|------|
| RUC | Auto-generado (11 dígitos) | String |
| Razón Social | Empresa comercial 1 | String |
| Nombre Comercial | Empresa comercial 1 | String |
| Estado | Licenciada | Selección |

### ⚠️ Manejo de Errores

**Si RUC existe (duplicado):**
- Genera nuevo RUC automáticamente
- Limpia campos
- Reintenta (máx. 3 intentos)
- Si falla 3 veces: Registra error y termina

**Si elemento no encontrado:**
- Captura error con mensaje
- Genera screenshot de error
- Registra en logs

### 📸 Capturas Generadas

**ANTES de Guardar:**
```
📸 Empresa_comercial_1_RUC_12345678901_ANTES_GUARDAR.png
   - Formulario completo
   - Todos los campos llenos
   - Estado: Licenciada seleccionado
```

**DESPUÉS de Guardar:**
```
📸 Empresa_comercial_1_RUC_12345678901_DESPUES_GUARDAR.png
   - Mensaje de confirmación visible
   - Validación de éxito
```

### ✅ Criterios de Aceptación

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

### 🚀 Ejecutar

```bash
# Con UI
npm run test:admin

# Con navegador visible
npm run test:admin:headed

# Solo este caso
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --headed
```

### 📊 Resultados Esperados

```
✅ 1 administrado registrado exitosamente
✅ RUC único generado (11 dígitos)
✅ 2 screenshots capturados (ANTES y DESPUÉS)
✅ JSON actualizado con datos
✅ Reportes generados (HTML, Playwright, Allure)
```

---

## <a name="caso-02"></a> 2️⃣ CASO DE PRUEBA SIGUIENTE

### 📊 Información General
- **ID:** 02
- **Nombre:** [A DEFINIR]
- **Descripción:** [A DEFINIR]
- **Estado:** 🔄 EN DESARROLLO
- **Archivo:** `tests/casos-prueba/02-caso-prueba-siguiente.spec.ts`

### ⏳ En Planificación
- Aguardando especificaciones
- Placeholder reservado para próximo caso de prueba

### 📝 Template Disponible
```typescript
// Usar como base para desarrollar
tests/casos-prueba/02-caso-prueba-siguiente.spec.ts (template)
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
