# 📋 CASOS DE PRUEBA ACTUALES

## ✅ Casos activos

> Cada caso tiene su flujo detallado en las anotaciones del propio test.

### Caso 01: Agregar Administrado
- **Archivo**: `tests/casos-prueba/01-agregar-administrado.spec.ts`
- **Comando**: `npm run test:01` o `npm run test:caso-01`
- **Objetivo**: Registrar un nuevo administrado
- **Estado**: ✅ Funcional
 - **Flujo (anotado en código)**: [tests/casos-prueba/01-agregar-administrado.spec.ts](../tests/casos-prueba/01-agregar-administrado.spec.ts)

### Caso 02: Registrar Sanción
- **Archivo**: `tests/casos-prueba/02-registrar-sancion.spec.ts`
- **Comando**: `npm run test:02` o `npm run test:caso-02`
- **Objetivo**: Registrar sanción a un administrado
- **Estado**: ✅ Funcional
 - **Flujo (anotado en código)**: [tests/casos-prueba/02-registrar-sancion.spec.ts](../tests/casos-prueba/02-registrar-sancion.spec.ts)

### Caso 03: Reconsiderar sin sanciones
- **Archivo**: `tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts`
- **Comando**: `npm run test:03` o `npm run test:caso-03-sin`
- **Objetivo**: Reconsideración con campos vacíos
- **Estado**: ✅ Funcional
 - **Flujo (anotado en código)**: [tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts](../tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts)
 - **Criterio de selección**: F. Modificación, N° Reconsideración y F. Reconsideración vacíos
- **Regla de fecha**: Fecha de reconsideración > Fecha de resolución y <= fecha actual

### Caso 04: Reconsiderar con sanciones
- **Archivo**: `tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts`
- **Comando**: `npm run test:04` o `npm run test:caso-04`
- **Objetivo**: Reconsideración con detalles de sanción
- **Estado**: ✅ Funcional
 - **Flujo (anotado en código)**: [tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts](../tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts)
 - **Criterio de selección**: F. Modificación, N° Reconsideración y F. Reconsideración vacíos
- **Regla de fecha**: Fecha de reconsideración > Fecha de resolución y <= fecha actual
 - **Reglas principales (Detalle de sanciones)**:
	 - Multa → marcar **Pagó** + **Reconsidera**
	 - Suspensión → marcar **Reconsidera**
	 - Cancelación → marcar **Reconsidera**
	 - Multa + Suspensión → **Pagó** + **Reconsidera**
	 - Multa + Cancelación → **Pagó** + **Reconsidera**
 - **Casos posibles**:
	 - Registros ya marcados: se respetan (no se desmarca)
	 - Puede haber menos de 5 registros según el administrado

---

## 🚀 Comandos disponibles
```bash
npm run test:01
npm run test:02
npm run test:03
npm run test:04
npm run test:all
```

## 📊 Estructura de casos
```
tests/casos-prueba/
├── 01-agregar-administrado.spec.ts      ✅ ACTIVO
├── 02-registrar-sancion.spec.ts         ✅ ACTIVO
├── 03-reconsiderar-sin-sanciones.spec.ts ✅ ACTIVO
└── 04-reconsiderar-con-sanciones.spec.ts ✅ ACTIVO
```
