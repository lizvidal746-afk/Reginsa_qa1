# 👻 HEADLESS MODE - SIN INTERFAZ VISIBLE

## 🎯 QUÉ ES HEADLESS

Es ejecutar el navegador **sin interfaz gráfica visible**:

- ✅ No ves el navegador (imperceptible)
- ✅ Más rápido (20-30% más)
- ✅ No bloquea tu pantalla
- ✅ Perfecto para automatización
- ✅ Preparado para Selenium Grid

---

## 🔧 CONFIGURACIÓN HEADLESS

### En `playwright.config.js` (Por defecto):
```javascript
export default defineConfig({
  use: {
    headless: true,  // ✅ Por defecto
  },
});
```

### Ejecutar sin ver (Headless):
```powershell
npm run test:01
# O
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts
```

### Ejecutar viendo el navegador (Headed):
```powershell
npm run test:01 --headed
# O
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --headed
```

---

## 📊 COMPARATIVA: HEADLESS vs HEADED

| Aspecto | Headless | Headed |
|--------|----------|--------|
| **Visible** | ❌ No | ✅ Sí |
| **Velocidad** | ⚡ 25s | 🐢 45s |
| **Recursos** | 📉 Bajo | 📈 Alto |
| **Grid-Ready** | ✅ Sí | ❌ No |
| **Debugging** | 📊 Logs | 👀 Visual |

---

## 🚀 MODO DE EJECUCIÓN RECOMENDADO

### Desarrollo (Con debugging):
```powershell
# Ver lo que pasa
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --headed --debug
```

### Automatización (Sin interfaz):
```powershell
# Rápido e invisible
npm run test:all
```

### Validación (CI/CD, Selenium Grid):
```powershell
# Headless obligatorio
npx playwright test tests/casos-prueba/ --reporter=json
```

---

## 📈 COMPARATIVA DE VELOCIDAD

### Ejecución con Headless:

| Test | Tiempo | Visible |
|------|--------|---------|
| Caso 01 | 15.2s | ❌ No |
| Caso 02 | 46s | ❌ No |
| Todos | ~3m | ❌ No |

### Ejecución con Headed:

| Test | Tiempo | Visible |
|------|--------|---------|
| Caso 01 | 25s | ✅ Sí |
| Caso 02 | 70s | ✅ Sí |
| Todos | ~4m 30s | ✅ Sí |

---

## 🔍 VERIFICAR QUE FUNCIONA (SIN VER)

### El test funciona aunque no lo veas:

```powershell
# Esto pasará aunque no veas nada
npm run test:01

# Verás en la terminal:
# ✅ 1 passed (15.2s)

# Pero el navegador NUNCA se vio
# ✅ Perfecto para automatización
```

---

## 💡 CASOS DE USO

### ✅ Usa Headless cuando:
- Ejecutas en servidor (CI/CD)
- Usas Selenium Grid
- Quieres máxima velocidad
- No necesitas ver lo que pasa

### ✅ Usa Headed cuando:
- Debuggeas problemas
- Necesitas ver lo que falla
- Estás desarrollando
- Quieres verificar visualmente

---

## 🎯 CONFIGURAR HEADLESS POR PROYECTO

### Para TODOS los tests (por defecto):
```javascript
// playwright.config.js
export default defineConfig({
  use: {
    headless: true,  // ✅ Todos los tests sin interfaz
  },
});
```

### Para navegadores específicos:
```javascript
// playwright.config.js
export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: true },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: true },
    },
  ],
});
```

---

## 🚀 CICLOS TÍPICOS CON HEADLESS

### Ciclo 1: Desarrollo (Con visual)
```powershell
# Ver qué pasa
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --headed --debug
```

### Ciclo 2: Testing (Sin visual)
```powershell
# Rápido, sin interfaz
npm run test:all
```

### Ciclo 3: CI/CD (Headless obligatorio)
```powershell
# Servidor CI/CD - siempre headless
npx playwright test tests/casos-prueba/ --reporter=json
```

---

## ⚡ VENTAJAS DE HEADLESS

| Ventaja | Beneficio |
|---------|-----------|
| **Rápido** | 20-30% más veloz |
| **Imperceptible** | No interrumpe trabajo |
| **Grid-Ready** | Listo para distribuir |
| **Recursos** | Usa menos CPU/RAM |
| **Parallelización** | Ejecuta múltiples tests simultáneamente |

---

## 📋 CHECKLIST HEADLESS

- [ ] Verificar que Headless está enabled en config
- [ ] Ejecutar test: `npm run test:01`
- [ ] Verificar que no ves ventana de navegador
- [ ] Verificar que test pasó ✅
- [ ] Listo para automatización

---

**Con Headless, tu automatización será invisible pero funcional.** 👻✅
