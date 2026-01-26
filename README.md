# 🎯 Automatización de Pruebas - REGINSA SUNEDU

## 📋 Descripción General

Suite de automatización para la plataforma **REGINSA SUNEDU** utilizando **Playwright**.

### Casos de Prueba Implementados:
1. ✅ **AGREGAR ADMINISTRADO** - Registro automático de nuevas empresas administradas
2. 🔄 **EN DESARROLLO** - Caso de Prueba 2

---

## 🧪 Casos de Prueba

### 1️⃣ AGREGAR ADMINISTRADO

**Descripción:** Automatiza el registro de nuevas empresas administradas en REGINSA SUNEDU.

**Datos de entrada:**
- RUC: Generado automáticamente (11 dígitos únicos)
- Razón Social: Nombre de la empresa
- Nombre Comercial: Nombre comercial de la empresa
- Estado: Licenciada

**Características:**
- ✅ Generación automática de RUCs únicos
- ✅ Reintentos automáticos si RUC existe (máx. 3 intentos)
- ✅ Screenshots ANTES y DESPUÉS de guardar
- ✅ Reporte JSON actualizable
- ✅ Reporte HTML visual
- ✅ Reportes Playwright + Allure

**Archivo del test:** `tests/casos-prueba/01-agregar-administrado.spec.ts`

---

## 🏗️ Estructura del Proyecto

```
REGINSA-SUNEDU-Automation/
│
├── tests/
│   ├── casos-prueba/
│   │   ├── 01-agregar-administrado.spec.ts          ✅ COMPLETADO
│   │   ├── 02-caso-prueba-siguiente.spec.ts         🔄 EN DESARROLLO
│   │   └── README.md                                 📖 Casos de prueba
│   │
│   └── [Tests antiguos - mantener para referencia]
│       ├── test-1.spec.ts
│       ├── example.spec.js
│       └── test-admin-2registros.spec.ts
│
├── screenshots/
│   ├── Empresa_comercial_1_RUC_*_ANTES_GUARDAR.png
│   └── Empresa_comercial_1_RUC_*_DESPUES_GUARDAR.png
│
├── reportes/
│   ├── registros-administrados.json     ← Datos en JSON
│   ├── reporte-administrados.html       ← Reporte HTML custom
│   ├── playwright-report/               ← Reporte Playwright
│   └── allure-report/                   ← Reporte Allure
│
├── scripts/
│   ├── ejecutar-todo.bat                ← Ejecuta test + reportes
│   ├── ejecutar-test-con-reporte.bat    ← Ejecuta test + reportes HTML
│   └── generar-reporte-html.js          ← Generador de reportes HTML
│
├── config/
│   └── playwright.config.js             ← Configuración Playwright
│
├── docs/
│   ├── README.md                        ← Este archivo
│   ├── PROMPT_REQUISITO.md              ← Especificaciones
│   ├── CAMBIOS_IMPLEMENTADOS.md         ← Log de cambios
│   └── CASOS_PRUEBA.md                  ← Detalles de casos de prueba
│
├── package.json
├── tsconfig.json
└── .gitignore
```

---

## 🚀 Quick Start

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar automáticamente (Recomendado)
```bash
.\ejecutar-todo.bat
```

### 3. Ver resultados
- **HTML**: `reporte-administrados.html` (abre automáticamente)
- **Allure**: `npm run report:allure:open`
- **Playwright**: `npm run report:playwright`

---

## 📊 Scripts Disponibles

### Ejecución de Tests

```bash
# Con UI interactivo
npm run test:admin

# Con navegador visible
npm run test:admin:headed

# Versión clásica
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --headed
```

### Generación de Reportes

```bash
# Reporte HTML custom
npm run report:generate

# Reporte Playwright
npm run report:playwright

# Reporte Allure (generar + abrir)
npm run report:allure:generate
npm run report:allure:open
```

### Scripts Automáticos

```bash
# Ejecuta todo (test + todos los reportes)
.\ejecutar-todo.bat

# Ejecuta test + reporte HTML
.\ejecutar-test-con-reporte.bat
```

---

## 📁 Reportes Generados

### 1. Reporte JSON (`registros-administrados.json`)
Base de datos de registros con estructura:
```json
{
  "id": 1,
  "ruc": "12345678901",
  "razonSocial": "Empresa comercial 1",
  "nombreComercial": "Empresa comercial 1",
  "estado": "Licenciada",
  "timestamp": "2026-01-19T12:30:45.123Z",
  "screenshot": "./screenshots/Empresa_comercial_1_RUC_12345678901_ANTES_GUARDAR.png",
  "screenshot_despues": "./screenshots/Empresa_comercial_1_RUC_12345678901_DESPUES_GUARDAR.png",
  "estado_registro": "exitoso"
}
```

### 2. Reporte HTML (`reporte-administrados.html`)
Interfaz visual con:
- ✅ Tabla de administrados
- ✅ Estadísticas (total, exitosos, fallidos, tasa éxito)
- ✅ Links a screenshots ANTES y DESPUÉS
- ✅ Timestamps de cada registro
- ✅ Estados coloreados (verde exitoso, rojo fallido)

### 3. Reporte Playwright
Detalles técnicos de ejecución:
- Traza de ejecución
- Screenshots de fallos
- Tiempos de ejecución

### 4. Reporte Allure
Reportes profesionales con:
- Gráficos de ejecución
- Timeline de tests
- Historial de cambios

---

## 🔍 Características del Test - AGREGAR ADMINISTRADO

### Flujo del Test

1. **Login:**
   - Navega a REGINSA SUNEDU
   - Ingresa credenciales
   - Valida sesión exitosa

2. **Navegación:**
   - Accede a "Infractor y Sanción"
   - Abre formulario nuevo administrado

3. **Registro:**
   - Genera RUC único (11 dígitos)
   - Llena campos: RUC, Razón Social, Nombre Comercial
   - Selecciona Estado: Licenciada

4. **Evidencia:**
   - 📸 Screenshot ANTES de guardar (campos llenos)
   - Click "Guardar"
   - 📸 Screenshot DESPUÉS de guardar (con mensaje éxito)

5. **Validación:**
   - Valida mensaje de éxito
   - Reintentos automáticos si RUC duplicado (máx 3)
   - Actualiza reportes

6. **Reporte:**
   - Actualiza JSON con datos
   - Regenera HTML
   - Genera reportes Playwright y Allure

---

## 📸 Captura de Pantallas

### ANTES de Guardar
Muestra el formulario completo con todos los campos:
- RUC: `12345678901`
- Razón Social: `Empresa comercial 1`
- Nombre Comercial: `Empresa comercial 1`
- Estado: `Licenciada`

**Nombre:** `Empresa_comercial_1_RUC_12345678901_ANTES_GUARDAR.png`

### DESPUÉS de Guardar
Muestra el mensaje de éxito y validación:
- Confirmación de registro
- Mensaje: "Guardado exitosamente" o similar

**Nombre:** `Empresa_comercial_1_RUC_12345678901_DESPUES_GUARDAR.png`

---

## 🔄 Próximas Iteraciones

### Caso de Prueba 2 (EN DESARROLLO)
- 📝 A definir según requisitos

### Mejoras Futuras
- [ ] Integración con CI/CD
- [ ] Exportar reportes a PDF
- [ ] Dashboard en tiempo real
- [ ] Notificaciones de fallos
- [ ] Selenium Grid para tests masivos

---

## ⚙️ Configuración

### Datos de Acceso (REGINSA SUNEDU)
- **URL:** `https://reginsaqa.sunedu.gob.pe/#/home`
- **Usuario:** `lizvidal`
- **Contraseña:** `QA1234510qa`

### Cambiar Datos
Edita `tests/casos-prueba/01-agregar-administrado.spec.ts`

---

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Error: "Cannot find module" | `npm install` |
| Navegador no abre | Verifica Playwright instalado: `npx playwright install` |
| Screenshots no se guardan | Crea carpeta: `mkdir screenshots` |
| Reporte HTML no actualiza | Ejecuta: `npm run report:generate` |
| Allure no funciona | Instala Java (requerido por Allure) |

---

## 📚 Documentación Adicional

- [PROMPT_REQUISITO.md](PROMPT_REQUISITO.md) - Especificaciones técnicas
- [CAMBIOS_IMPLEMENTADOS.md](CAMBIOS_IMPLEMENTADOS.md) - Log de cambios
- [CASOS_PRUEBA.md](docs/CASOS_PRUEBA.md) - Detalles de casos de prueba

---

## 📞 Información del Proyecto

- **Sistema:** REGINSA SUNEDU
- **Herramienta:** Playwright + TypeScript
- **Reportes:** HTML + Playwright + Allure
- **Versión:** 1.0.0
- **Última actualización:** Enero 2026

---

**👉 Para comenzar:** `.\ejecutar-todo.bat`
