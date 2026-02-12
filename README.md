
# 🎯 Automatización REGINSA (Playwright)

## ✅ Punto de entrada oficial

- Documentación maestra: [docs/INDICE.md](docs/INDICE.md)
- Guía operativa: [docs/GUIA_OPERATIVA.md](docs/GUIA_OPERATIVA.md)
- Guía de ejecución detallada: [docs/README_EJECUCION.md](docs/README_EJECUCION.md)
- Glosario + plantilla profesional: [docs/GLOSARIO_PLANTILLA.md](docs/GLOSARIO_PLANTILLA.md)
- Reutilización y puntos modificables: [docs/REUTILIZACION.md](docs/REUTILIZACION.md)
- Árbol del proyecto: [docs/ARBOL_PROYECTO.md](docs/ARBOL_PROYECTO.md)

## 🧪 Casos de prueba activos

- [tests/casos-prueba/01-agregar-administrado.spec.ts](tests/casos-prueba/01-agregar-administrado.spec.ts) (✅ COMPLETADO, reportes Playwright y Allure)
- [tests/casos-prueba/02-registrar-sancion.spec.ts](tests/casos-prueba/02-registrar-sancion.spec.ts) (✅ COMPLETADO, reportes Playwright y Allure)
- [tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts](tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts)
- [tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts](tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts)
- [tests/casos-prueba/05-exportar-administrados.spec.ts](tests/casos-prueba/05-exportar-administrados.spec.ts) (utilidad opcional)

## 🚀 Ejecución rápida

```powershell
npm run test:all
```

## ▶️ Modos de ejecución, capturas y reportes

- Headless con capturas: `npm run test:02`
- Headed con capturas: `npm run test:02 -- --headed`
- Headless sin capturas: `npm run test:02:fast`
- Headed sin capturas: `npm run test:02:fast -- --headed`

Las capturas de error se guardan siempre en `errors/`. Las capturas exitosas dependen del modo de ejecución.
Todos los casos principales generan reportes Playwright y Allure automáticamente.

## 🎲 Variedad en datos de prueba

En los casos que agregan varios registros de detalle (por ejemplo, sanciones), los dropdowns seleccionan aleatoriamente entre las primeras 5 opciones, evitando repetir la misma opción en la misma ejecución. Esto garantiza variedad y robustez en los datos generados por los tests.

## ✅ Extensiones requeridas (VS Code)

- Playwright Test for VS Code (`ms-playwright.playwright`)
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)
