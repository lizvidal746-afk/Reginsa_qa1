# 📑 ÍNDICE DE DOCUMENTACIÓN - PROYECTO PLAYWRIGHT REGINSA

## 🎯 INICIO RÁPIDO

| Documento | Propósito | Audiencia |
|-----------|-----------|-----------|
| [README_FINAL.md](#resumen-ejecutivo) | Resumen ejecutivo del proyecto | Todos |
| [GUIA_VISUAL_MEJORAS.md](#guía-visual) | Guía visual con ejemplos | Developers |
| [CHECKLIST_VALIDACION_FINAL.md](#checklist) | Validación de cambios | QA/Tech Lead |

---

## 📚 DOCUMENTACIÓN COMPLETA

### 1. RESUMEN EJECUTIVO
**Archivo:** [README_FINAL.md](README_FINAL.md)
**Contenido:**
- ✅ Características principales del proyecto
- ✅ Estructura de casos de prueba
- ✅ Cómo ejecutar los tests
- ✅ Información de credenciales
- ✅ Patrón de arquitectura
- ✅ Troubleshooting básico

**Cuándo leer:** Cuando necesitas visión general del proyecto

---

### 2. GUÍA VISUAL CON EJEMPLOS
**Archivo:** [GUIA_VISUAL_MEJORAS.md](GUIA_VISUAL_MEJORAS.md)
**Contenido:**
- ✅ Antes vs Después (nombres de screenshots)
- ✅ Estructura de datos en nombres
- ✅ Selectores mejorados (comparación)
- ✅ Puntos de captura en cada caso
- ✅ Beneficios para reportes
- ✅ Ejemplo de ejecución con output

**Cuándo leer:** Cuando necesitas entender los cambios visualmente

---

### 3. CAMBIOS TÉCNICOS DETALLADOS
**Archivo:** [MEJORAS_CASO02_Y_CAPTURAS.md](MEJORAS_CASO02_Y_CAPTURAS.md)
**Contenido:**
- ✅ Selector mejorado (línea por línea)
- ✅ Función capturarPantallaMejorada() código
- ✅ Actualización de imports
- ✅ Técnicas de selector robustas
- ✅ Validación de cambios

**Cuándo leer:** Cuando necesitas detalles técnicos de implementación

---

### 4. VALIDACIÓN FINAL
**Archivo:** [CHECKLIST_VALIDACION_FINAL.md](CHECKLIST_VALIDACION_FINAL.md)
**Contenido:**
- ✅ Checklist de implementación (10 secciones)
- ✅ Validación de archivos modificados
- ✅ Métricas de calidad
- ✅ Readiness check (producción)
- ✅ Sign-off de implementación

**Cuándo leer:** Cuando necesitas validar que todo está correcto

---

### 5. DOCUMENTACIÓN ANTERIOR (Referencia)
**Archivos disponibles:**

#### Refactoring Caso 01
**Archivo:** [REFACTORING_CASO01.md](REFACTORING_CASO01.md)
- Cambios en Caso 01 durante refactorización

#### Refactoring Caso 02
**Archivo:** [REFACTORING_CASO02.md](REFACTORING_CASO02.md)
- Cambios en Caso 02 durante refactorización

#### Resumen Final Refactoring
**Archivo:** [RESUMEN_REFACTORING_FINAL.md](RESUMEN_REFACTORING_FINAL.md)
- Resumen completo del refactoring

#### Guía de Ejecución
**Archivo:** [GUIA_EJECUCION.md](GUIA_EJECUCION.md)
- Instrucciones de cómo ejecutar los tests

---

## 🔧 ARCHIVOS DE CÓDIGO

### Código Principal

#### 1. Utilidades Reutilizables
**Archivo:** [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts)
**Funciones principales:**
- `iniciarSesionYNavegar(page, modulo)` - Setup centralizado
- `obtenerAdministradoAleatorio(page)` - ✅ Selector mejorado
- `capturarPantallaMejorada(page, caso, paso, ruc, entidad)` - ✅ Nueva
- `generarRUC()`, `generarExpediente()`, `generarResolucion()`
- Y 15+ más funciones auxiliares

#### 2. Caso 01 - Agregar Administrado
**Archivo:** [tests/casos-prueba/01-agregar-administrado.spec.ts](tests/casos-prueba/01-agregar-administrado.spec.ts)
**Características:**
- ✅ Refactorizado con iniciarSesionYNavegar()
- ✅ Genera RUC aleatorio
- ✅ 3 capturas con metadatos
- ✅ 194 líneas (optimizado)
- 🟢 PASANDO

#### 3. Caso 02 - Registrar Sanción
**Archivo:** [tests/casos-prueba/02-registrar-sancion.spec.ts](tests/casos-prueba/02-registrar-sancion.spec.ts)
**Características:**
- ✅ Refactorizado con iniciarSesionYNavegar()
- ✅ Selector mejorado en obtenerAdministradoAleatorio()
- ✅ 1-3 capturas con metadatos
- ✅ 247 líneas (50% reducción)
- 🟢 PASANDO

---

## 🚀 SCRIPTS DE EJECUCIÓN

### Scripts Disponibles

| Script | Tipo | Uso |
|--------|------|-----|
| `npm run test:01` | npm | Ejecutar solo Caso 01 |
| `npm run test:02` | npm | Ejecutar solo Caso 02 |
| `npm run test:all` | npm | Ejecutar ambos casos |
| `npm run report` | npm | Ver reporte HTML |
| `run-tests-full.bat` | Windows Batch | Ejecutar ambos con reportes |
| `run-tests-full.ps1` | PowerShell | Ejecutar ambos con output detallado |

### Cómo Usar

**Opción 1: PowerShell (Recomendado)**
```powershell
PS> .\run-tests-full.ps1
```

**Opción 2: Windows Batch**
```cmd
cmd> run-tests-full.bat
```

**Opción 3: NPM Directo**
```bash
npm run test:all
```

---

## 📊 ESTRUCTURA DE DATOS

### Directorio de Capturas
```
screenshots/
├── 01-AGREGAR_ADMINISTRADO_ANTES_LLENAR_RUC_49924040194_Empresa_comercial_1_timestamp.png
├── 01-AGREGAR_ADMINISTRADO_ANTES_GUARDAR_RUC_49924040194_Empresa_comercial_1_timestamp.png
├── 01-AGREGAR_ADMINISTRADO_DESPUES_GUARDAR_RUC_49924040194_Empresa_comercial_1_timestamp.png
├── 02-REGISTRAR_SANCION_EXITOSO_GUARDAR_Exp_0001_AdminName_timestamp.png
└── ... más capturas ...
```

### Directorio de Reportes
```
reportes/
├── caso_01_report.json
├── caso_02_report.json
└── summary_report.json
```

---

## 🎓 PATRONES Y BUENAS PRÁCTICAS

### Patrón de Test Profesional

```typescript
// 1. Setup (Centralizado)
await iniciarSesionYNavegar(page, 'modulo');

// 2. Datos (Generado)
const dato = await generarDato();

// 3. Captura Antes
await capturarPantallaMejorada(page, 'CASO', 'ANTES', ref, entidad);

// 4. Acción
await realizarAccion();

// 5. Validar
const exitoso = await validar();

// 6. Captura Después
await capturarPantallaMejorada(page, 'CASO', 'DESPUES', ref, entidad);
```

### Selector Robusto

```typescript
// Buscar elemento genérico
const botones = page.locator('button').filter({ 
  has: page.locator('.icon-selector, svg') 
});

// Fallback a selectores alternativos
const opciones = await page.getByRole('option').all();
if (opciones.length === 0) {
  const alternativa = page.locator('.css-class-nombre');
  // ... usar alternativa
}

// Esperas inteligentes
await page.waitForLoadState('networkidle');
await page.waitForTimeout(500);
```

---

## 🔍 TROUBLESHOOTING

### Problema: Test falla en selector
**Solución:** Revisar [GUIA_VISUAL_MEJORAS.md#selector-mejorado](GUIA_VISUAL_MEJORAS.md)

### Problema: Screenshot no se genera
**Solución:** Verificar carpeta `./screenshots/` existe y tiene permisos

### Problema: RUC duplicado
**Solución:** Sistema automático reintenta (máx 3 veces) con RUC incrementado

### Problema: ¿Cómo agregar un Caso 03?
**Solución:** Seguir patrón en [README_FINAL.md#patrón-de-arquitectura](README_FINAL.md)

---

## 📞 INFORMACIÓN ÚTIL

### Credenciales de Prueba
- **URL:** https://reginsaqa.sunedu.gob.pe/#/home
- **Usuario:** lizvidal
- **Contraseña:** QA1234510qa

### Datos Fijos
- **Hecho Infractor:** hecho infractor prueba qa
- **Multa:** 10 (Soles/IUT según caso)
- **Suspensión:** 1 Año

### Contacto/Soporte
- Para cambios: Revisar MEJORAS_CASO02_Y_CAPTURAS.md
- Para validación: Revisar CHECKLIST_VALIDACION_FINAL.md
- Para ejemplos: Revisar GUIA_VISUAL_MEJORAS.md

---

## ✅ CHECKLIST DE LECTURA

Para nuevos desarrolladores:

- [ ] Leer [README_FINAL.md](README_FINAL.md) - Visión general (15 min)
- [ ] Revisar [GUIA_VISUAL_MEJORAS.md](GUIA_VISUAL_MEJORAS.md) - Cambios (10 min)
- [ ] Entender patrón en [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts) (10 min)
- [ ] Analizar [tests/casos-prueba/01-agregar-administrado.spec.ts](tests/casos-prueba/01-agregar-administrado.spec.ts) (10 min)
- [ ] Ejecutar `npm run test:01` - Test funcional (5 min)
- [ ] Revisar screenshots capturados (5 min)
- [ ] ✅ Listo para contribuir

**Tiempo total estimado:** 55 minutos

---

## 🎯 MATRIZ DE DECISIÓN

**¿Necesito...?** → **Lee este archivo:**

| Necesidad | Archivo | Tiempo |
|-----------|---------|--------|
| Ver resumen ejecutivo | README_FINAL.md | 15 min |
| Entender los cambios | GUIA_VISUAL_MEJORAS.md | 10 min |
| Detalles técnicos | MEJORAS_CASO02_Y_CAPTURAS.md | 15 min |
| Validar calidad | CHECKLIST_VALIDACION_FINAL.md | 10 min |
| Aprender patrón | tests/utilidades/reginsa-actions.ts | 15 min |
| Ver ejemplo Caso 01 | tests/casos-prueba/01-agregar-administrado.spec.ts | 10 min |
| Ver ejemplo Caso 02 | tests/casos-prueba/02-registrar-sancion.spec.ts | 10 min |
| Ejecutar pruebas | run-tests-full.ps1 | 5 min |

---

## 🎉 CONCLUSIÓN

La documentación está completa y organizada para:
- ✅ **Nuevos desarrolladores** - Empezar rápido
- ✅ **Tech leads** - Validar calidad
- ✅ **QA** - Entender casos de prueba
- ✅ **DevOps** - Automatizar ejecución
- ✅ **Stakeholders** - Visión ejecutiva

**Estado:** 🟢 PRODUCCIÓN LISTA

---

**Última actualización:** 19 de Enero 2026
**Versión:** 2.0 (Con mejoras de selector y screenshots)
**Mantenedor:** Equipo de Automatización REGINSA
