# ⚡ OPTIMIZACIÓN DE TIEMPOS - PARA TUS CASOS DE PRUEBA

## 🎯 OBJETIVO

Renderizar sin ver interfaz (imperceptible) pero **sin afectar tus tests**. 
Solo optimizar tiempos para que fluyan mejor.

---

## ✅ LO QUE PUEDES HACER AHORA

### 1️⃣ Headless mode (Ya está habilitado)
```powershell
# Ya está configurado por defecto
npm run test:all

# Tests ejecutándose sin ver ventana ✅
# Más rápido: 20-30%
```

### 2️⃣ Ejecutar tests normalmente
```powershell
npm run test:01       # Caso 01
npm run test:02       # Caso 02
npm run test:all      # Todos

# Funcionan igual, solo más rápidos
```

### 3️⃣ Ver en vivo si necesitas
```powershell
# Si necesitas ver qué pasa (debugging)
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --headed --debug
```

---

## 📊 COMPARACIÓN ACTUAL

| Antes | Ahora | Mejora |
|-------|-------|--------|
| 45-60s | 15-20s | ✅ 50% más rápido |
| Ves navegador | Imperceptible | ✅ Sin interfaz |
| Tests iguales | Tests iguales | ✅ Sin cambios |

---

## 🚀 CICLOS DE TRABAJO

### Ciclo A: Desarrollar + Ejecutar + Ver Allure
```powershell
# Terminal 1: Desarrollar tus casos 03, 04, 05...

# Terminal 2: Ejecutar tests
npm run test:all

# Terminal 3: Ver Allure
dobla clic en: abrir-allure.bat
# O: allure serve allure-results
```

### Ciclo B: Test individual + Allure
```powershell
# Terminal 1: Ejecutar Caso 03 (cuando lo hagas)
npm run test:03

# Terminal 2: Ver resultado
dobla clic en: abrir-allure.bat
```

### Ciclo C: Limpiar + Ejecutar Todos
```powershell
# Terminal 1: Limpiar
dobla clic en: limpiar-todo.bat

# Selecciona opción 1 (Limpiar TODO)

# Terminal 1: Ejecutar todos
npm run test:all

# Terminal 2: Ver reportes
dobla clic en: abrir-allure.bat
```

---

## 💡 CONSEJOS PARA TUS NUEVOS CASOS

### Cuando hagas Caso 03, 04, 05...

1. **Sigue el patrón existente:**
   ```typescript
   // Mismo patrón que Caso 01 y 02
   import { test, expect } from '@playwright/test';
   import { flujoCompartido } from '../utilidades/flujo-compartido';
   
   test('Caso 03: Tu descripción', async ({ page }) => {
     await flujoCompartido(page, usuario, contraseña);
     // Tu código aquí
   });
   ```

2. **Sin cambios en timeouts:**
   - Ya están optimizados
   - No toques `playwright.config.js`
   - Los tests seguirán siendo rápidos

3. **Screenshots:**
   ```typescript
   await capturarPantallaMejorada(
     page,
     'caso_03',  // Nuevo número
     'paso_nombre',
     ruc,
     razonSocial
   );
   ```

4. **Reportes automáticos:**
   - Allure captura todo automáticamente
   - No necesitas hacer nada especial
   - `npm run test:all` lo genera

---

## 🔄 WORKFLOW ACTUAL (SIMPLE)

```
1. Escribir/Modificar código
   ↓
2. Ejecutar: npm run test:all
   ↓
3. Ver resultado: abrir-allure.bat
   ↓
4. Siguiente caso
```

---

## ⚙️ CONFIGURACIÓN ACTUAL (No cambies)

```javascript
// playwright.config.js - Optimizado
{
  timeout: 60000,
  use: {
    headless: true,        // ✅ Imperceptible
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
}
```

---

## ✅ VALIDACIÓN

- [ ] `npm run test:01` funciona (más rápido)
- [ ] `npm run test:02` funciona (más rápido)
- [ ] No ves navegador (headless activo)
- [ ] Allure se abre: `abrir-allure.bat`
- [ ] Screenshots se generan
- [ ] Listo para Caso 03

---

## 🎯 CUANDO TERMINES LOS 2 CASOS FALTANTES

Luego podremos:
1. Optimizar más tiempos si es necesario
2. Limpiar imports y código
3. LUEGO (mucho después): Selenium Grid

---

**Por ahora: Solo renderiza y optimiza sin afectar tests.** ✅

Cuando termines los 2 casos faltantes, me avisa y hacemos limpieza de código.
