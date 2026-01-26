# 📁 Árbol del Proyecto - REGINSA SUNEDU Automation

```
D:\SUNEDU\SELENIUM\playwrigth/
│
├── 📋 DOCUMENTACIÓN
│   ├── README.md                           👈 Comienza aquí
│   ├── PROYECTO_RESUMEN.md                 📊 Resumen ejecutivo
│   ├── PROMPT_REQUISITO.md                 🎯 Especificaciones técnicas
│   ├── CAMBIOS_IMPLEMENTADOS.md            📝 Log de cambios
│   └── ARBOL_PROYECTO.md                   📁 Este archivo
│
├── 🧪 TESTS (Casos de Prueba)
│   ├── casos-prueba/
│   │   ├── 01-agregar-administrado.spec.ts          ✅ CASO 01 - COMPLETADO
│   │   ├── 02-registrar-sancion.spec.ts             ✅ CASO 02 - COMPLETADO
│   │   ├── 03-reconsiderar-sancion.spec.ts          ✅ CASO 03 - NUEVO - COMPLETADO
│   │   ├── _referencias/
│   │   │   └── PLANTILLA_NUEVOS_CASOS.md            📖 Para Casos 04, 05
│   │   └── README.md                                📖 Documentación de casos
│   │
│   ├── utilidades/
│   │   ├── reginsa-actions.ts                       🔧 Funciones reutilizables
│   │   └── constants.ts
│   │
│   ├── test-3.spec.ts                               ⚠️ DEPRECATED (grabación bruta)
│   └── [Otros archivos de test]
│
├── 📸 CAPTURAS DE PANTALLA
│   └── screenshots/
│       ├── Empresa_comercial_1_RUC_*_ANTES_GUARDAR.png
│       └── Empresa_comercial_1_RUC_*_DESPUES_GUARDAR.png
│
├── 📊 REPORTES
│   ├── reportes/
│   │   └── registros-administrados.json              ← Base de datos JSON
│   ├── reporte-administrados.html                    ← Reporte HTML custom
│   ├── playwright-report/                            ← Reporte Playwright
│   ├── allure-report/                                ← Reporte Allure
│   ├── allure-results/                               ← Datos para Allure
│   └── test-results/                                 ← Resultados de tests
│
├── 🔧 SCRIPTS DE AUTOMATIZACIÓN
│   ├── scripts/
│   │   ├── ejecutar-todo.bat                        ← Script completo
│   │   ├── ejecutar-test-con-reporte.bat
│   │   └── generar-reporte-html.js
│   └── [Scripts raíz]
│       ├── generar-reporte-html.js                  ← Generador de HTML
│       ├── ejecutar-test-con-reporte.bat
│       ├── ejecutar-todo.bat
│       └── recorder.bat
│
├── ⚙️ CONFIGURACIÓN
│   ├── config/
│   │   └── playwright.config.js                     ← Próxima ubicación
│   ├── playwright.config.js                         ← Actual
│   ├── package.json                                 ← Scripts npm
│   ├── tsconfig.json                                ← Configuración TypeScript
│   └── .gitignore                                   ← Ignorados de git
│
├── 📦 DEPENDENCIAS
│   ├── node_modules/                                ← Instaladas
│   └── package-lock.json
│
└── 📚 DOCUMENTACIÓN ADICIONAL
    ├── docs/                                         ← Carpeta para docs
    │   ├── CASOS_PRUEBA.md                          (Próxima)
    │   └── ...
    └── PROYECTO_RESUMEN.md                          📊 Resumen del proyecto

```

---

## 🚀 RUTAS RÁPIDAS

### ▶️ Para Ejecutar Tests
```
tests/casos-prueba/01-agregar-administrado.spec.ts
                     └─ CASO 01: AGREGAR ADMINISTRADO ✅
                     
tests/casos-prueba/02-caso-prueba-siguiente.spec.ts
                     └─ CASO 02: TEMPLATE 🔄
```

### 📊 Para Ver Reportes
```
reporte-administrados.html          ← Abre en navegador
reportes/registros-administrados.json ← Datos JSON
playwright-report/                 ← Playwright UI
allure-report/                      ← Allure Dashboard
```

### 🔧 Scripts Disponibles
```
ejecutar-todo.bat                   ← Test + Todos los reportes
ejecutar-test-con-reporte.bat      ← Test + Reporte HTML
generar-reporte-html.js             ← Solo genera HTML
```

---

## 📋 ESTRUCTURA DE CARPETAS EXPLICADA

### `tests/casos-prueba/`
✅ **Casos de prueba actuales**
- `01-agregar-administrado.spec.ts` - Test completado
- `02-caso-prueba-siguiente.spec.ts` - Template para próximo caso

### `screenshots/`
📸 **Evidencia visual de cada registro**
- Nombramiento: `{RazonSocial}_RUC_{RUC}_{ESTADO}.png`
- Ejemplo: `Empresa_comercial_1_RUC_12345678901_ANTES_GUARDAR.png`

### `reportes/`
📊 **Datos persistentes**
- `registros-administrados.json` - Base de datos de registros
- Se actualiza automáticamente con cada ejecución

### `scripts/`
🔧 **Automatización**
- Scripts para ejecutar tests
- Generadores de reportes
- Disponibles en raíz principal también

### `config/`
⚙️ **Configuración del proyecto**
- Próxima ubicación para `playwright.config.js`

### `docs/`
📚 **Documentación del proyecto**
- Guías y especificaciones
- Detalles de implementación

---

## 🎯 FLUJO DE TRABAJO RECOMENDADO

### 1️⃣ Ejecutar Test
```bash
npm run test:admin:headed
```

### 2️⃣ Ver Resultado en Consola
```
✅ Test completado exitosamente
📸 Screenshots capturados
📊 JSON actualizado
```

### 3️⃣ Abrir Reportes
```bash
start reporte-administrados.html        # HTML local
npm run report:playwright               # Reporte Playwright
npm run report:allure:open              # Dashboard Allure
```

### 4️⃣ Desarrollar Caso 02
```bash
# 1. Editar template
tests/casos-prueba/02-caso-prueba-siguiente.spec.ts

# 2. Reemplazar [NOMBRE_CASO] y [DESCRIPCION]

# 3. Implementar pasos del test

# 4. Ejecutar cuando esté listo
npm run test:all  # Ejecuta ambos casos
```

---

## 📝 CONVENCIONES DE NOMBRES

### Archivos de Test
```
XX-nombre-caso.spec.ts

Ejemplo:
01-agregar-administrado.spec.ts
02-editar-administrado.spec.ts
03-eliminar-administrado.spec.ts
```

### Screenshots
```
{RazonSocial}_RUC_{RUC}_{ESTADO}.png

Ejemplo:
Empresa_comercial_1_RUC_12345678901_ANTES_GUARDAR.png
Empresa_comercial_1_RUC_12345678901_DESPUES_GUARDAR.png
```

### Reportes
```
registros-administrados.json   ← Base de datos
reporte-administrados.html     ← UI visual
playwright-report/             ← Reporte técnico
allure-report/                 ← Dashboard profesional
```

---

## 🔄 PRÓXIMAS ADICIONES

### Estructura Prevista
```
D:\SUNEDU\SELENIUM\playwrigth/
├── tests/casos-prueba/
│   ├── 03-editar-administrado.spec.ts        (Próximo)
│   ├── 04-eliminar-administrado.spec.ts      (Futuro)
│   └── 05-buscar-administrado.spec.ts        (Futuro)
│
├── utilidades/                               (Próximo)
│   ├── helpers.ts                            (Funciones comunes)
│   ├── datos.ts                              (Data test)
│   └── selectores.ts                         (Selectores reutilizables)
│
└── ci-cd/                                    (Próximo)
    ├── github-actions.yml
    ├── jenkins.yml
    └── docker-compose.yml
```

---

## ✅ CHECKLIST DE INICIALIZACIÓN

- [x] Estructura de carpetas creada
- [x] Caso 01 implementado y probado
- [x] Reportes configurados
- [x] Documentación completa
- [x] Scripts de automatización
- [x] Template para Caso 02
- [ ] Caso 02 implementado (Próximo)
- [ ] CI/CD configurado (Futuro)
- [ ] Dashboard en tiempo real (Futuro)

---

**Proyecto:** REGINSA SUNEDU Automation  
**Versión:** 1.0.0  
**Fecha:** Enero 2026  
**Estructura:** Organizada y preparada para escalabilidad
