# 🧩 Instalación y Ejecución (Descarga o Clonado)

## ✅ Opción A: Descarga (ZIP)
1. Descarga el ZIP desde GitHub.
2. Extrae en una carpeta local.
3. Abre la carpeta en VS Code.
4. Instala dependencias:
   ```powershell
   npm install
   ```
5. Ejecuta:
   ```powershell
   npm run test:all
   ```
6. Abre reportes:
   ```powershell
   npm run reports:open
   ```

### Resumen de ejecuciones (Chromium por defecto)
- `npm run test:01` / `test:02` / `test:03` / `test:04` — Casos individuales
- `npm run test:all` — Suite completa
- `npm run test:all:w2` / `test:all:w4` — Suite completa con **workers** (paralelismo en una PC)
- `npm run test:all:shard-1of2` ... `test:all:shard-2of2` — **Shards** (partes separadas)
- `npm run test:all:cf` — Suite completa en Chromium + Firefox

> **Workers** = paralelismo dentro de la misma PC. **Shards** = dividir la suite en partes y ejecutarlas por separado.

---

## ✅ Opción B: Clonado (Git)
1. Clona el repositorio:
   ```powershell
   git clone <URL_DEL_REPO>
   ```
2. Abre en VS Code:
   ```powershell
   code <CARPETA>
   ```
3. Instala dependencias:
   ```powershell
   npm install
   ```
4. Ejecuta:
   ```powershell
   npm run test:all
   ```
5. Abre reportes:
   ```powershell
   npm run reports:open
   ```

### Resumen de ejecuciones (Chromium por defecto)
- `npm run test:01` / `test:02` / `test:03` / `test:04` — Casos individuales
- `npm run test:all` — Suite completa
- `npm run test:all:w2` / `test:all:w4` — Suite completa con **workers** (paralelismo en una PC)
- `npm run test:all:shard-1of2` ... `test:all:shard-2of2` — **Shards** (partes separadas)
- `npm run test:all:cf` — Suite completa en Chromium + Firefox

> **Workers** = paralelismo dentro de la misma PC. **Shards** = dividir la suite en partes y ejecutarlas por separado.

---

## ✅ Requisitos mínimos
- Node.js 18+
- VS Code
- Navegador Chromium (Playwright lo descarga en npm install)

## ✅ Extensiones requeridas (VS Code)
- Playwright Test for VS Code (`ms-playwright.playwright`)
- ESLint (`dbaeumer.vscode-eslint`)
- Prettier (`esbenp.prettier-vscode`)

---

## ✅ Verificación rápida
```powershell
npx playwright --version
```
