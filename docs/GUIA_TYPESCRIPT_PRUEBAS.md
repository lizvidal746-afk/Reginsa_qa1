# Guia TypeScript para pruebas (Playwright)

Esta guia explica como se usa TypeScript en este proyecto de pruebas y para que sirve cada parte.

## 1. Estructura del proyecto

- tests/casos-prueba/: casos principales (01, 02, 03, 04, 05).
- tests/utilidades/: acciones reutilizables del flujo (login, capturas, helpers).
- helpers/: utilidades transversales (datos, estado, contexto de workers).
- scripts/: comandos auxiliares (reportes, limpieza, sync base, ejecucion).
- test-files/: archivos de entrada (Excel base, PDF).
- reportes/: datos generados en ejecucion (no se commitea).

## 2. Como se estructura un test

Cada caso usa Playwright Test con TypeScript:

- test('nombre', async ({ page }, testInfo) => { ... })
- async/await para pasos de UI (click, fill, wait)
- page es la pagina del navegador
- testInfo da el worker, nombre del test y ruta de salida

Patron comun:
- Login y navegacion
- Abrir formulario
- Llenar datos
- Guardar y validar toast
- Capturas y logs

## 3. Imports: que son y por que importan

En TypeScript, `import` trae codigo de otros archivos o librerias.

Ejemplo real:
```ts
import { test } from '@playwright/test';
import {
	iniciarSesionYNavegar,
	abrirFormularioNuevoAdministrado,
	generarRUC,
	capturarPantalla,
	capturarPantallaMejorada,
	capturarFormularioLleno,
	capturarToastExito
} from '../utilidades/reginsa-actions';
```

Que significa:
- `@playwright/test` es la libreria base de pruebas.
- `../utilidades/reginsa-actions` es un archivo interno del proyecto.
- Las llaves `{ ... }` indican *exports nombrados*.

Como crear este tipo de import:
1) En el archivo origen (por ejemplo `tests/utilidades/reginsa-actions.ts`) exportas funciones:
```ts
export async function iniciarSesionYNavegar(page: Page, modulo: string, workerIndex: number) {
	// ...
}
```
2) Luego las importas con el mismo nombre en el spec.

Estos imports son reutilizables y evitan repetir codigo en cada caso.

## 4. Tipos y por que importan

TypeScript permite:
- Detectar errores antes de ejecutar
- Autocompletar metodos de Playwright
- Documentar mejor las funciones

Ejemplos usados:
- type SancionConfig = { numero: number; ... }
- Page y Locator para tipar helpers

## 5. Const, let y funciones

- `const` se usa para valores que no cambian.
- `let` se usa cuando el valor puede cambiar.
- `function` y `const miFuncion = () => {}` definen funciones.

Ejemplos:
```ts
const maxRetries = 3; // no cambia
let intento = 0; // cambia

function normalizarRuc(ruc: string): string {
	return ruc.replace(/\D/g, '');
}

const generarNombre = () => `EMPRESA ${Date.now()}`;
```

## 6. Async/Await

Playwright es asincrono. Por eso usamos `async` y `await`:

```ts
test('mi caso', async ({ page }) => {
	await page.goto('https://ejemplo.com');
	await page.getByRole('button', { name: 'Guardar' }).click();
});
```

- `async` permite usar `await`.
- `await` espera a que termine una accion antes de seguir.

## 7. Helpers reutilizables

Los helpers estan en tests/utilidades/ y helpers/:

- reginsa-actions.ts: pasos comunes (login, capturas, formularios).
- data-generator.ts: datos sinteticos.
- test-context.ts: contexto por worker.
- state-distributor.ts: control de asignacion y estados.

Objetivo: evitar codigo repetido en cada spec.

## 8. Datos y base local (Caso 01)

El Caso 01 usa una base local para evitar duplicados:

- test-files/Administrados_BD.xlsx: base oficial.
- reportes/administrados-registrados.json: base local generada.
- reportes/registros-administrados.json: registros creados en ejecucion.
- reportes/administrados-reservados.json: reservas por worker.

Cuando se reinicia la DB:
- Actualiza el Excel base.
- Ejecuta: npm run sync:base

## 9. Esperas y estabilidad

Buenas practicas en este proyecto:
- Preferir waits inteligentes (waitFor, isVisible, isEnabled)
- Evitar waits fijos largos
- Usar helpers para overlays y modales

## 10. Reportes

- Playwright: playwright-report/
- Allure: allure-results/ y allure-report/

Todo esto es generado. Se puede borrar sin problemas.

## 11. Ejecutar con workers y repeat

- --workers=N: paralelismo en una PC
- --repeat-each=10: repite el mismo test 10 veces

Ejemplo:
- npm run test:02:fast -- --workers=2 --repeat-each=10

## 12. Como agregar un nuevo caso

1) Copia un spec existente.
2) Reusa helpers de tests/utilidades/.
3) Evita duplicados de datos.
4) Agrega el caso al indice de docs.

## 13. Glosario rapido

## 14. Template minimo recomendado

```ts
import { test } from '@playwright/test';
import { iniciarSesionYNavegar } from '../utilidades/reginsa-actions';

test('CASO: ejemplo minimo', async ({ page }, testInfo) => {
	await iniciarSesionYNavegar(page, 'infractor', testInfo.workerIndex);
	// pasos del caso...
});
```

- spec: archivo de pruebas Playwright.
- worker: proceso paralelo que ejecuta tests.
- locator: selector de Playwright.
- fixture: recursos que Playwright inyecta en el test.
