# 📋 CASOS DE PRUEBA ACTUALES

## ✅ Casos activos

### Caso 01: Agregar Administrado
- **Archivo**: `tests/casos-prueba/01-agregar-administrado.spec.ts`
- **Comando**: `npm run test:01` o `npm run test:caso-01`
- **Objetivo**: Registrar un nuevo administrado
- **Estado**: ✅ Funcional

### Caso 02: Registrar Sanción
- **Archivo**: `tests/casos-prueba/02-registrar-sancion.spec.ts`
- **Comando**: `npm run test:02` o `npm run test:caso-02`
- **Objetivo**: Registrar sanción a un administrado
- **Estado**: ✅ Funcional

### Caso 03: Reconsiderar sin sanciones
- **Archivo**: `tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts`
- **Comando**: `npm run test:03` o `npm run test:caso-03-sin`
- **Objetivo**: Reconsideración con campos vacíos
- **Estado**: ✅ Funcional

### Caso 04: Reconsiderar con sanciones
- **Archivo**: `tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts`
- **Comando**: `npm run test:04` o `npm run test:caso-04`
- **Objetivo**: Reconsideración con detalles de sanción
- **Estado**: ✅ Funcional

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

