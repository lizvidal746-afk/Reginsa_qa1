# 🧩 Plantilla paso a paso (nuevo proyecto)

## 🎯 Objetivo
Crear una plantilla base en D:/AUTOMATIZACION para clonar este proyecto y usarla en nuevos sistemas, con estructura clara y comentarios para entender TypeScript y el flujo de Playwright.

---

## 1) Crear carpeta base en Windows

### PowerShell
```powershell
New-Item -ItemType Directory -Path "D:\AUTOMATIZACION"
```

### CMD
```cmd
mkdir D:\AUTOMATIZACION
```

---

## 2) Crear carpeta del proyecto

Ejemplo: SI091_REGINSA

### PowerShell
```powershell
New-Item -ItemType Directory -Path "D:\AUTOMATIZACION\SI091_REGINSA"
Set-Location "D:\AUTOMATIZACION\SI091_REGINSA"
```

### CMD
```cmd
mkdir D:\AUTOMATIZACION\SI091_REGINSA
cd /d D:\AUTOMATIZACION\SI091_REGINSA
```

---

## 3) Abrir VS Code en la carpeta

### PowerShell
```powershell
code "D:\AUTOMATIZACION\SI091_REGINSA"
```

---

## 4) Inicializar proyecto Node + Playwright

### Terminal integrada en VS Code
```powershell
npm init -y
npm i -D @playwright/test allure-playwright allure-commandline @types/node
npx playwright install
```

---

## 5) Crear estructura mínima

### PowerShell
```powershell
New-Item -ItemType Directory -Path "docs"
New-Item -ItemType Directory -Path "tests\casos-prueba"
New-Item -ItemType Directory -Path "tests\utilidades"
New-Item -ItemType Directory -Path "test-files"
New-Item -ItemType Directory -Path "screenshots"
New-Item -ItemType Directory -Path "errors"
New-Item -ItemType Directory -Path "scripts"
```

---

## 6) Archivos base (contenido recomendado)

### 6.1 package.json (scripts clave)

#### Crear archivo
```powershell
New-Item -ItemType File -Path "package.json" -Force
```

#### Contenido recomendado
```json
{
   "name": "si091-reginsa",
   "version": "1.0.0",
   "description": "Playwright Testing",
   "main": "index.js",
   "scripts": {
      "test": "node scripts/run-tests-with-reports.js --screenshots playwright test --project=chromium",
      "test:01": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --project=chromium",
      "test:01:fast": "node scripts/run-tests-with-reports.js --skip-screenshots playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --project=chromium",
      "test:02": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/02-registrar-sancion.spec.ts --project=chromium",
      "test:02:fast": "node scripts/run-tests-with-reports.js --skip-screenshots playwright test tests/casos-prueba/02-registrar-sancion.spec.ts --project=chromium",
      "test:03": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts --project=chromium",
      "test:03:fast": "node scripts/run-tests-with-reports.js --skip-screenshots playwright test tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts --project=chromium",
      "test:04": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts --project=chromium",
      "test:04:fast": "node scripts/run-tests-with-reports.js --skip-screenshots playwright test tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts --project=chromium",
      "test:all": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/ --project=chromium",
      "test:all:fast": "node scripts/run-tests-with-reports.js --skip-screenshots playwright test tests/casos-prueba/ --project=chromium",
      "test:all:w2": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/ --project=chromium --workers=2",
      "test:all:w4": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/ --project=chromium --workers=4",
      "test:all:shard-1of2": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/ --project=chromium --shard=1/2",
      "test:all:shard-2of2": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/ --project=chromium --shard=2/2",
      "test:all:shard-1of4": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/ --project=chromium --shard=1/4",
      "test:all:shard-2of4": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/ --project=chromium --shard=2/4",
      "test:all:shard-3of4": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/ --project=chromium --shard=3/4",
      "test:all:shard-4of4": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/ --project=chromium --shard=4/4",
      "test:all:cf": "node scripts/run-tests-with-reports.js --screenshots playwright test tests/casos-prueba/ --project=chromium --project=firefox",
      "test:all:cf:fast": "node scripts/run-tests-with-reports.js --skip-screenshots playwright test tests/casos-prueba/ --project=chromium --project=firefox",
      "report:playwright": "npx playwright show-report",
      "report:allure:generate": "npx allure generate ./allure-results --clean -o ./allure-report",
      "report:allure:open": "npx allure serve ./allure-results",
      "reports:open": "powershell -NoProfile -WindowStyle Hidden -Command \"Start-Process npx -ArgumentList 'playwright','show-report','playwright-report' -WindowStyle Hidden; Start-Process npx -ArgumentList 'allure','serve','./allure-results' -WindowStyle Hidden\""
   },
   "devDependencies": {
      "@playwright/test": "latest",
      "@types/node": "latest",
      "allure-commandline": "latest",
      "allure-playwright": "latest"
   }
}
```

---

### 6.2 playwright.config.js

#### Crear archivo
```powershell
New-Item -ItemType File -Path "playwright.config.js" -Force
```

#### Contenido recomendado
```javascript
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
   testDir: './tests',
   timeout: 300000,
   expect: { timeout: 10000 },
   workers: process.env.CI ? 2 : 1,
   reporter: [
      ['html'],
      ['allure-playwright']
   ],
   use: {
      headless: true,
      screenshot: 'off',
      video: 'off',
      trace: 'off'
   }
});
```

---

### 6.3 scripts/run-tests-with-reports.js

#### Crear archivo
```powershell
New-Item -ItemType File -Path "scripts\run-tests-with-reports.js" -Force
```

#### Contenido recomendado
```javascript
const { spawn } = require('child_process');

const rawArgs = process.argv.slice(2);
let forceScreenshots = false;
let skipScreenshots = false;

const filteredArgs = [];
for (const arg of rawArgs) {
   if (arg === '--screenshots') {
      forceScreenshots = true;
      continue;
   }
   if (arg === '--skip-screenshots') {
      skipScreenshots = true;
      continue;
   }
   filteredArgs.push(arg);
}

const command = filteredArgs.join(' ').trim();
if (!command) {
   console.error('Uso: node scripts/run-tests-with-reports.js <comando>');
   process.exit(1);
}

const buildEnv = () => {
   const env = { ...process.env };
   if (forceScreenshots) env.SKIP_SCREENSHOTS = '0';
   if (skipScreenshots) env.SKIP_SCREENSHOTS = '1';
   return env;
};

const run = (cmd) => new Promise((resolve) => {
   const child = spawn(cmd, { shell: true, stdio: 'inherit', env: buildEnv() });
   child.on('exit', (code) => resolve(typeof code === 'number' ? code : 1));
});

(async () => {
   const testCode = await run(command);
   await run('npm run reports:open');
   process.exit(testCode);
})();
```

---

### 6.4 tests/utilidades/reginsa-actions.ts (base)

#### Crear archivo
```powershell
New-Item -ItemType File -Path "tests\utilidades\reginsa-actions.ts" -Force
```

#### Contenido base (comentado por fases)
```typescript
import { Page } from '@playwright/test';
import * as fs from 'fs';

// ===============================
// FASE 1: SESIÓN Y NAVEGACIÓN
// ===============================
export async function iniciarSesionYNavegar(page: Page, modulo: 'infractor' | 'otro'): Promise<void> {
   // TODO: Ajustar selectores según el sistema
   await page.goto('https://URL_DEL_SISTEMA');
   // Login
   await page.getByRole('textbox', { name: /Usuario/i }).fill('usuario');
   await page.getByRole('textbox', { name: /Contraseña/i }).fill('password');
   await page.getByRole('button', { name: /Iniciar sesión/i }).click();
   await page.waitForLoadState('networkidle');
   // Navegación módulo
   if (modulo === 'infractor') {
      await page.getByRole('link', { name: /Infractor/i }).click();
   }
}

// ===============================
// FASE 2: CAPTURAS
// ===============================
export async function capturarPantallaMejorada(
   page: Page,
   caso: string,
   paso: string,
   dato1 = '',
   dato2 = ''
): Promise<void> {
   if (process.env.SKIP_SCREENSHOTS === '1') {
      console.log('⏩ Captura omitida por SKIP_SCREENSHOTS=1');
      return;
   }
   const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
   const nombre = `${caso}_${paso}_${dato1}_${dato2}_${timestamp}.png`.replace(/\s+/g, '_');
   const ruta = `./screenshots/${nombre}`;
   await page.screenshot({ path: ruta, fullPage: true });
   console.log(`📸 Screenshot: ${ruta}`);
}

export async function capturarToastExito(
   page: Page,
   caso: string,
   paso: string,
   dato1 = '',
   dato2 = ''
): Promise<void> {
   if (process.env.SKIP_SCREENSHOTS === '1') {
      console.log('⏩ Captura omitida por SKIP_SCREENSHOTS=1');
      return;
   }
   const toast = page.locator('.p-toast-message-success, .p-toast-message').first();
   await toast.waitFor({ state: 'visible', timeout: 10000 });
   await capturarPantallaMejorada(page, caso, paso, dato1, dato2);
}

// Capturas de error SIEMPRE en errors/
export async function capturarError(page: Page, etiqueta: string): Promise<void> {
   if (!fs.existsSync('errors')) fs.mkdirSync('errors');
   const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
   const ruta = `errors/ERROR_${etiqueta}_${timestamp}.png`;
   await page.screenshot({ path: ruta, fullPage: true });
   console.log(`🛑 Screenshot de error: ${ruta}`);
}
```

---

### 6.5 tests/casos-prueba/00-plantilla.spec.ts (base)

#### Crear archivo
```powershell
New-Item -ItemType File -Path "tests\casos-prueba\00-plantilla.spec.ts" -Force
```

#### Contenido base
```typescript
import { test } from '@playwright/test';
import { iniciarSesionYNavegar, capturarPantallaMejorada, capturarError } from '../utilidades/reginsa-actions';

/**
 * PLANTILLA BASE
 * Flujo:
 * 1. Login + navegación
 * 2. Acción principal
 * 3. Validación
 */

test('PLANTILLA - Caso base', async ({ page }) => {
   test.setTimeout(300000);

   try {
      await iniciarSesionYNavegar(page, 'infractor');
      await capturarPantallaMejorada(page, '00-PLANTILLA', '01_LOGIN', 'OK');

      // TODO: Implementar acciones del caso

   } catch (error) {
      await capturarError(page, 'PLANTILLA');
      throw error;
   }
});
```

---

## 7) Migrar desde este proyecto

Si vas a migrar el proyecto actual:
1. Copiar la carpeta tests/, scripts/, docs/ y archivos de configuración.
2. Actualizar rutas en:
   - tests/casos-prueba/*.spec.ts
   - tests/utilidades/reginsa-actions.ts
   - docs (rutas absolutas en ejemplos)
3. Cambiar referencias de rutas absolutas a la nueva ruta D:/AUTOMATIZACION/SI091_REGINSA.

---

## 8) Ejecutar (con y sin capturas)

### Con capturas
```powershell
npm run test:02
npm run test:02 -- --headed
```

### Sin capturas
```powershell
npm run test:02:fast
npm run test:02:fast -- --headed
```

---

## 9) CI con sharding (plantilla)

Se recomienda usar 4 shards por defecto y ajustar según la carga.
El workflow base está en:
- docs/INDICE.md (enlace al workflow)
- .github/workflows/playwright-ci.yml

---

## 10) Próximos ajustes (documento vivo)
- Ejecutar en Chrome y Firefox
- Ejecutar 10 a 50 registros por caso
- Afinar selectores por sistema
- Ajustar tiempos para modo headed/headless

---

## ✅ Nota final
Este documento se irá ampliando. Cada nuevo sistema debe tener su propia carpeta bajo D:/AUTOMATIZACION con la misma estructura base.
