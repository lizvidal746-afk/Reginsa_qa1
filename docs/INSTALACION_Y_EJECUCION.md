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
