# 📋 CASOS DE PRUEBA ACTUALES

## ✅ Casos activos

> Cada caso tiene su flujo detallado en las anotaciones del propio test.

### Caso 01: Agregar Administrado
- **Archivo**: `tests/casos-prueba/01-agregar-administrado.spec.ts`
- **Comando**: `npm run test:01`
- **Objetivo**: Registrar un nuevo administrado
- **Estado**: ✅ Funcional
 - **Flujo (anotado en código)**: [tests/casos-prueba/01-agregar-administrado.spec.ts](../tests/casos-prueba/01-agregar-administrado.spec.ts)

### Caso 02: Registrar Sanción
- **Archivo**: `tests/casos-prueba/02-registrar-sancion.spec.ts`
- **Comando**: `npm run test:02`
- **Objetivo**: Registrar sanción a un administrado
- **Estado**: ✅ Funcional
 - **Flujo (anotado en código)**: [tests/casos-prueba/02-registrar-sancion.spec.ts](../tests/casos-prueba/02-registrar-sancion.spec.ts)
 - **Detalle de sanciones**: 8 sanciones con combinaciones de multa/suspensión/cancelación (UIT forzado en casos 6, 7 y 8)

### Caso 03: Reconsiderar sin sanciones
- **Archivo**: `tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts`
- **Comando**: `npm run test:03`
- **Objetivo**: Reconsideración con campos vacíos
- **Estado**: ✅ Funcional
 - **Flujo (anotado en código)**: [tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts](../tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts)
 - **Criterio de selección**: F. Modificación, N° Reconsideración y F. Reconsideración vacíos
- **Regla de fecha**: Fecha de reconsideración > Fecha de resolución y <= fecha actual
 - **Cabecera (orden obligatorio)**:
 	 - Clic en **Editar cabecera**
 	 - Marcar **Presentó reconsideración**
 	 - Subir archivo PDF
 	 - Llenar **N° de reconsideración**
 	 - Seleccionar **Fecha de reconsideración**
 	 - Guardar cabecera

### Caso 04: Reconsiderar con sanciones
- **Archivo**: `tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts`
- **Comando**: `npm run test:04`
- **Objetivo**: Reconsideración con detalles de sanción
- **Estado**: ✅ Funcional
 - **Flujo (anotado en código)**: [tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts](../tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts)
 - **Criterio de selección**: F. Modificación, N° Reconsideración y F. Reconsideración vacíos
- **Regla de fecha**: Fecha de reconsideración > Fecha de resolución y <= fecha actual
 - **Cabecera (orden obligatorio)**:
 	 - Clic en **Editar cabecera**
 	 - Marcar **Presentó reconsideración**
 	 - Subir archivo PDF
 	 - Llenar **N° de reconsideración**
 	 - Seleccionar **Fecha de reconsideración**
 	 - Guardar cabecera
 - **Reglas principales (Detalle de sanciones)**:
	 - Multa → marcar **Pagó** + **Reconsidera**
	 - Suspensión → marcar **Reconsidera**
	 - Cancelación → marcar **Reconsidera**
	 - Multa + Suspensión → **Pagó** + **Reconsidera**
	 - Multa + Cancelación → **Pagó** + **Reconsidera**
 - **Casos posibles**:
	 - Registros ya marcados: se respetan (no se desmarca)
	 - Puede haber menos de 5 registros según el administrado

### Caso 05: Exportar Administrados (solo lectura)
- **Archivo**: `tests/casos-prueba/05-exportar-administrados.spec.ts`
- **Comando**: `npm run test:05` o `npm run test:administrados`
- **Objetivo**: Listar RUC y Razón Social visibles en el módulo Administrado (utilidad opcional)
- **Salida**: `reportes/administrados-registrados.json`
- **Ejecución**: requiere `RUN_ADMIN_CHECK=1`
- **Edición opcional**: `EDIT_ADMINISTRADO=1` (abre edición sin guardar)
- **Estado**: ✅ Funcional

---

## 🚀 Comandos disponibles
```bash
npm run test:01           # Caso 01 (Chromium, 1 worker)
npm run test:02           # Caso 02 (Chromium, 1 worker)
npm run test:03           # Caso 03 (Chromium, 1 worker)
npm run test:04           # Caso 04 (Chromium, 1 worker)
npm run test:05           # Caso 05 (Exportar administrados)
npm run test:administrados # Alias de Caso 05
npm run test:123          # Casos 01 + 02 + 03 (Chromium)
npm run test:124          # Casos 01 + 02 + 04 (Chromium)
npm run test:134          # Casos 01 + 03 + 04 (Chromium)
npm run test:123:fast     # Casos 01 + 02 + 03 sin capturas
npm run test:124:fast     # Casos 01 + 02 + 04 sin capturas
npm run test:134:fast     # Casos 01 + 03 + 04 sin capturas
npm run test:all          # Suite completa (Chromium, 1 worker)
npm run test:all:w2       # Suite completa con 2 workers
npm run test:all:w4       # Suite completa con 4 workers
npm run test:all:shard-1of2  # Parte 1/2 (shard)
npm run test:all:shard-2of2  # Parte 2/2 (shard)
npm run test:all:shard-1of2:fast  # Parte 1/2 sin capturas
npm run test:all:shard-2of2:fast  # Parte 2/2 sin capturas
npm run test:all:shard-1of4  # Parte 1/4 (shard)
npm run test:all:shard-2of4  # Parte 2/4 (shard)
npm run test:all:shard-3of4  # Parte 3/4 (shard)
npm run test:all:shard-4of4  # Parte 4/4 (shard)
npm run test:all:shard-1of4:fast  # Parte 1/4 sin capturas
npm run test:all:shard-2of4:fast  # Parte 2/4 sin capturas
npm run test:all:shard-3of4:fast  # Parte 3/4 sin capturas
npm run test:all:shard-4of4:fast  # Parte 4/4 sin capturas
npm run test:all:cf       # Chromium + Firefox
npm run test:all:cf:fast  # Chromium + Firefox sin capturas
npm run test:all:cf:w2     # Chromium + Firefox con 2 workers
npm run test:all:cf:w4     # Chromium + Firefox con 4 workers
npm run test:all:cf:w2:fast  # Chromium + Firefox, 2 workers, sin capturas
npm run test:all:cf:w4:fast  # Chromium + Firefox, 4 workers, sin capturas
```

## 📊 Estructura de casos
```
tests/casos-prueba/
├── 01-agregar-administrado.spec.ts      ✅ ACTIVO
├── 02-registrar-sancion.spec.ts         ✅ ACTIVO
├── 03-reconsiderar-sin-sanciones.spec.ts ✅ ACTIVO
└── 04-reconsiderar-con-sanciones.spec.ts ✅ ACTIVO
```
