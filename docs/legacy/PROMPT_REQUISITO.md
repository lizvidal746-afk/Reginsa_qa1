# PROMPT OPTIMIZADO - Registro de 1 Administrado en SUNEDU

## 🎯 OBJETIVO
Automatizar el registro de 1 administrado en la plataforma SUNEDU con datos dinámicos, validaciones y almacenamiento de RUC en memoria para uso posterior.

---

## 📋 ESPECIFICACIONES FUNCIONALES

### 1. AUTENTICACIÓN
- **URL:** `https://reginsaqa.sunedu.gob.pe/#/home`
- **Usuario:** `lizvidal`
- **Contraseña:** `QA1234510qa`
- **Flujo:** Home → Botón "Acceder Ahora" → Login → Dashboard

### 2. NAVEGACIÓN
- Acceder a: **"Infractor y Sanción"** (menú principal)
- Localizar y hacer clic en botón de "Nuevo Registro" o similar

### 3. REGISTRO DE ADMINISTRADO (1 iteración)

#### Administrado:
| Campo | Valor |
|-------|-------|
| RUC | Generar: 11 dígitos numéricos únicos (formato: XXXXXXXXXXX) |
| Razón Social | `Empresa comercial 1` |
| Nombre Comercial | `Empresa comercial 1` |
| Estado | `Licenciada` |

**Nota:** El RUC será **almacenado en memoria** para uso posterior en otros tests.

### 4. LÓGICA DE VALIDACIÓN DE RUC
- **Si RUC ya existe:**
  - El sistema mostrará mensaje de error
  - Generar nuevo RUC (11 dígitos aleatorio)
  - Reintentar hasta máximo 3 intentos
  - Si excede 3 intentos, loguear el error y pasar al siguiente administrado

### 5. CONFIRMACIÓN DE ÉXITO
- **Después de cada "Guardar":**
  - Esperar y validar mensaje: "Guardado exitosamente" o similar
  - Capturar screenshot como evidencia
  - **Almacenar RUC en memoria para uso posterior**

### 6. SALIDA ESPERADA
- ✅ 1 administrado registrado exitosamente
- ✅ RUC utilizado (almacenado en memoria)
- 📸 Screenshot del registro exitoso
- 📊 Reporte Playwright + Allure (tiempo, errores, evidencia)

---

## 🔧 CONSIDERACIONES TÉCNICAS

### Manejo de Tiempos
- Esperas explícitas: max 10 segundos para elementos críticos
- Tiempos entre acciones: 1-2 segundos

### Robustez
- Reintentos automáticos en caso de RUC duplicado
- Validación de elementos antes de interactuar
- Logs detallados de cada acción

### Datos Aleatorios
```javascript
// Generar RUC: 11 dígitos numéricos
const generarRUC = () => Math.floor(Math.random() * 99999999999).toString().padStart(11, '0');
```

---

## ✅ CRITERIOS DE ACEPTACIÓN

- [ ] 1 administrado registrado exitosamente
- [ ] RUC único (11 dígitos) almacenado en memoria
- [ ] Razón Social y Nombre Comercial con patrón correcto
- [ ] Estado "Licenciada" aplicado
- [ ] Mensaje de éxito visible después de guardar
- [ ] Reintentos automáticos si RUC existe
- [ ] Test finaliza sin errores no manejados
- [ ] Reportes Playwright generados
- [ ] Reportes Allure generados
