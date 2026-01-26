# 🚀 GUÍA DE EJECUCIÓN - TESTS REFACTORIZADOS

## 📋 Requisitos Previos

```bash
# Node.js versión 16+ instalado
node --version

# Dependencias instaladas
npm install

# Playwright instalado
npx playwright --version
```

---

## 🧪 Ejecutar Tests

### **Opción 1: Ambos Tests (Recomendado)**
```bash
npm run test:all
```

### **Opción 2: Solo Caso 01**
```bash
npm run test:caso-01
```

### **Opción 3: Solo Caso 02**
```bash
npm run test:caso-02
```

### **Opción 4: Con Navegador Visible (Debug)**
```bash
npm run test:caso-01 -- --headed
npm run test:caso-02 -- --headed
```

### **Opción 5: Modo Debug Interactivo**
```bash
npx playwright test --debug
```

---

## 📊 Generar Reportes

### **HTML Report (Playwright)**
```bash
npx playwright show-report
```

### **Allure Report**
```bash
npm run report:allure:open
```

### **Reporte Custom HTML**
```bash
npm run report:generate
```

---

## 📸 Ubicación de Resultados

### **Screenshots**
```
./screenshots/
├── 01-agregar-administrado_ANTES_GUARDAR_*.png
├── 01-agregar-administrado_DESPUES_GUARDAR_*.png
├── 02-registrar-sancion_EXITOSO_*.png
└── 02-registrar-sancion_ERROR_*.png
```

### **Reportes JSON**
```
./reportes/
└── registros-administrados.json
```

### **Test Results**
```
./test-results/
└── (resultados de ejecución)
```

### **Allure Results**
```
./allure-results/
└── (datos de Allure)
```

---

## 🔧 Configuración

### **Playwright Config**
Archivo: `playwright.config.ts`

```typescript
// Timeout global por test
timeout: 30000

// Retries en CI/CD
retries: 2

// Paralelo de workers
workers: 1
```

### **Scripts NPM**
Archivo: `package.json`

```json
{
  "scripts": {
    "test:all": "playwright test",
    "test:caso-01": "playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --headed",
    "test:caso-02": "playwright test tests/casos-prueba/02-registrar-sancion.spec.ts --headed",
    "report:generate": "node generar-reporte-html.js",
    "report:allure:open": "allure open allure-results"
  }
}
```

---

## 💻 Ejecución desde VS Code

### **Extensión Playwright Test**

1. Instala: [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

2. Click en **Testing** (lado izquierdo)

3. Selecciona test y click en **▶️ Run**

### **Terminal Integrada**

1. `Ctrl + `` (backtick) para abrir terminal
2. `npm run test:all`
3. Ver resultados en tiempo real

---

## 🐛 Troubleshooting

### **Test se cuelga**
```bash
# Timeout muy corto - aumentar en playwright.config.ts
timeout: 30000 → 60000

# O ejecutar con debug
npm run test:caso-02 -- --debug
```

### **Navegador no abre**
```bash
# Ejecutar con --headed
npm run test:caso-01 -- --headed

# O con modo UI
npx playwright test --ui
```

### **Screenshot vacío**
```bash
# Problema: navegador cerrado prematuramente
# Solución: check waitForLoadState() en utilidades
await page.waitForLoadState('networkidle');
```

### **Error de credenciales**
```typescript
// Verificar en reginsa-actions.ts
const CREDENCIALES = {
  url: 'https://reginsaqa.sunedu.gob.pe/#/home',
  usuario: 'lizvidal',
  contraseña: 'QA1234510qa'
};
```

---

## 📈 Monitoreo

### **Ver logs en tiempo real**
```bash
npm run test:caso-02 2>&1 | tee test.log
```

### **Grabar video de ejecución**
Editar `playwright.config.ts`:
```typescript
use: {
  video: 'on-failure'  // o 'retain-all'
}
```

### **Screenshots en cada paso**
Ya implementado en tests con `capturarPantalla()`

---

## 🎯 Flujo de Trabajo Recomendado

### **Desarrollo**
```bash
# 1. Ejecutar tests localmente
npm run test:all

# 2. Ver reportes
npx playwright show-report

# 3. Debug si falla
npm run test:caso-02 -- --debug --headed
```

### **CI/CD (GitHub Actions)**
```yaml
- name: Run tests
  run: npm run test:all

- name: Upload results
  if: always()
  uses: actions/upload-artifact@v3
```

---

## ✅ Checklist Pre-Ejecución

- [ ] Node.js >= 16 instalado
- [ ] `npm install` ejecutado
- [ ] `npx playwright install` completado
- [ ] URL de REGINSA accesible
- [ ] Credenciales válidas (lizvidal / QA1234510qa)
- [ ] Carpeta `./screenshots/` existe
- [ ] Carpeta `./reportes/` existe

---

## 🆘 Soporte

**Problema:** Navegador se cierra prematuramente  
**Solución:** Check `waitForLoadState('networkidle')` en setup

**Problema:** RUC duplicado en Caso 01  
**Solución:** Lógica de reintentos automática (hasta 3 intentos)

**Problema:** No se encuentra elemento en DOM  
**Solución:** Aumentar timeout o check selector con `--debug`

---

## 📞 Contacto

- **Documentación:** `./RESUMEN_REFACTORING_FINAL.md`
- **Refactoring Caso 01:** `./REFACTORING_CASO01.md`
- **Refactoring Caso 02:** `./REFACTORING_CASO02.md`

---

**¡Listo para ejecutar tests profesionales!** 🚀
