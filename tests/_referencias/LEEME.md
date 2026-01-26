# 📁 Carpeta de Referencias

Esta carpeta contiene **archivos de grabación y experimentos antiguos** generados por Playwright Codegen o pruebas iniciales.

## ❌ NO EJECUTAR ESTOS TESTS

Estos archivos NO son casos de prueba reales. Son:
- Grabaciones automáticas de Playwright Codegen
- Experimentos con hardcodeo
- Versiones antiguas antes de la arquitectura modular

## 📄 Contenido

| Archivo | Tipo | Propósito |
|---------|------|----------|
| `test-admin-registro.spec.ts` | Referencia | Intento inicial de registrar administrados (multiple) |
| `test-admin-2registros.spec.ts` | Referencia | Similiar, pero para 2 registros |
| `test-1.spec.ts` | Codegen | Grabación básica - login hardcodeado |
| `test-2.spec.ts` | Codegen | Grabación del flujo sanción (sirvió de base para Caso 02) |

## ✅ CASOS REALES (En `tests/casos-prueba/`)

- `01-agregar-administrado.spec.ts` ← **CASO 01**
- `02-registrar-sancion.spec.ts` ← **CASO 02** (FUNCIONAL - 46.1s ✅)

## 🎯 Próximos Pasos

Para crear Caso 03, 04, 05:
1. Usa `flujo-compartido.ts` como base
2. NO copies estos archivos antiguos
3. Sigue el template en `RESUMEN_FINAL_ARQUITECTURA.md`
