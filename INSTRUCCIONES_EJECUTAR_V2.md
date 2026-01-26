# 🎯 INSTRUCCIONES PASO A PASO - TEST V2 OPTIMIZADO

> Guía completa para ejecutar el test 02-registrar-sancion-v2.spec.ts

---

## 📍 PASO 1: VERIFICAR ARCHIVOS

Asegúrate de que estos archivos existan:

### ✅ Archivo Principal (NUEVO)
```
✓ d:\SUNEDU\SELENIUM\playwrigth\tests\casos-prueba\02-registrar-sancion-v2.spec.ts
```

### ✅ Archivos de Referencia
```
✓ d:\SUNEDU\SELENIUM\playwrigth\tests\test-2.spec.ts (para comparación)
✓ d:\SUNEDU\SELENIUM\playwrigth\tests\utilidades\reginsa-actions.ts (funciones aux)
```

### ✅ Archivos Auxiliares (OPCIONALES)
```
✓ ejecutar-test-02-v2.bat
✓ ejecutar-test-02-v2.ps1
✓ test-v2-guia.js
```

---

## 📍 PASO 2: REVISAR DOCUMENTACIÓN

Lee estos archivos **ANTES** de ejecutar (5-10 minutos):

1. **README_TEST_V2.md** ← Empezar aquí
2. **VERIFICACION_SELECTORES_V2.md** ← Entender selectores
3. **CASO_02_V2_OPTIMIZADO.md** ← Detalles técnicos

---

## 📍 PASO 3: ABRIR TERMINAL

### Opción A: PowerShell (Recomendado)
1. Click en el botón **Terminal** en VS Code
2. Seleccionar **PowerShell** como shell
3. Terminal abierto en `d:\SUNEDU\SELENIUM\playwrigth`

### Opción B: CMD
1. `Win + R`
2. Escribir: `cmd`
3. Navegar: `cd d:\SUNEDU\SELENIUM\playwrigth`

### Opción C: VS Code Terminal
```
Ctrl + ` (backtick)
```

---

## 📍 PASO 4: EJECUTAR TEST

### 🚀 OPCIÓN 1: NPM (Recomendado)

```bash
npm run test:02-v2
```

**Qué hace**:
- Lee `package.json` script `test:02-v2`
- Ejecuta: `playwright test tests/casos-prueba/02-registrar-sancion-v2.spec.ts --headed && npm run reports:open`
- Abre el navegador mostrando prueba en vivo
- Al terminar: abre reportes (Playwright + Allure)

### 🚀 OPCIÓN 2: PowerShell Script

```powershell
.\ejecutar-test-02-v2.ps1
```

**Qué hace**:
- Mismo resultado que Option 1
- Más bonito con colores

### 🚀 OPCIÓN 3: Batch File

```batch
ejecutar-test-02-v2.bat
```

**Qué hace**:
- Mismo resultado que Option 1
- Para usuarios de CMD puro

### 🚀 OPCIÓN 4: Directo con Playwright

```bash
npx playwright test tests/casos-prueba/02-registrar-sancion-v2.spec.ts --headed
```

**Qué hace**:
- Ejecuta sin abrir reportes automáticamente
- Más control manual

---

## 📍 PASO 5: OBSERVAR EJECUCIÓN

Mientras se ejecuta, verás:

### En Navegador
- ✅ Login automático
- ✅ Navegación a módulo
- ✅ Selección de administrado
- ✅ Llenado de datos
- ✅ Subida de PDF
- ✅ Medidas correctivas
- ✅ **5 Sanciones siendo agregadas**
- ✅ Guardado final

### En Consola
```
═══════════════════════════════════════════════════════════════
🔐 LOGIN Y NAVEGACIÓN
═══════════════════════════════════════════════════════════════
✅ Sesión iniciada y módulo cargado

═══════════════════════════════════════════════════════════════
📋 PASO 2: ABRIENDO FORMULARIO
═══════════════════════════════════════════════════════════════
✅ Formulario abierto

═══════════════════════════════════════════════════════════════
⚖️  PASO 8: AGREGANDO 5 SANCIONES
═══════════════════════════════════════════════════════════════

  ┌─ SANCIÓN 1/5: MULTA
  │  ✓ Modal abierto
  │  ✓ RIS seleccionado
  │  ✓ Tipo Infractor seleccionado
  │  ✓ Hecho Infractor llenado
  │  ☑️  Marcando sanciones:
  │    ✓ Multa marcada
  │  ✓ Monto: 500 SOLES
  │  ✅ GUARDADA
  │  ✓ Modal cerrado con Escape
  └───────────────────────────────────────────────────────────
  
  ... (más sanciones) ...
  
✅ SANCIONES COMPLETADAS: 5/5

═══════════════════════════════════════════════════════════════
✅ PASO 9: GUARDANDO FORMULARIO FINAL
═══════════════════════════════════════════════════════════════
✅ Formulario guardado

✅ TEST COMPLETADO - Sanciones: 5/5

✅ EXITOSO: Todas 5 sanciones registradas
```

### Duración Esperada
- **5-10 minutos** total
- ~1 minuto por sanción
- 300 segundos timeout máximo

---

## 📍 PASO 6: VERIFICAR ÉXITO

### ✅ Si TODO Funciona

Verás:
```
✅ EXITOSO: Al menos 3 sanciones registradas
✅ TEST COMPLETADO - Sanciones: 5/5 (ideal) o 4/5 (bueno)
```

En navegador:
- Mensaje verde: "**1 registro creado**"
- Formulario guardado exitosamente

### ❌ Si Algo Falla

Verás en consola:
```
❌ SANCIÓN 3/5 no se marca correctamente
❌ locator.click: Timeout 20000ms
❌ Solo 2 sanciones registradas (se requieren al menos 3)
```

---

## 🔧 SOLUCIONAR PROBLEMAS

### Problema 1: "Timeout esperando selector"

**Síntomas**:
```
❌ locator.click: Timeout 20000ms
❌ Waiting for [role="combobox"]
```

**Soluciones**:
1. HTML cambió - comparar contra test-2.spec.ts
2. Servidor lento - esperar 30 segundos, reintentar
3. Selectores inexactos - usar DevTools

**Pasos**:
```bash
# Ver en navegador qué pasa
F12  # Abrir DevTools
# Usar Inspector para encontrar selector correcto
```

### Problema 2: "Administrado no se selecciona"

**Síntomas**:
```
✓ Modal abierto
⏳ Seleccionando administrado...
❌ Timeout

```

**Soluciones**:
1. Verificar que hay 49 administrados disponibles
2. Aumentar timeout en `obtenerAdministradoAleatorio()`
3. Verificar conexión a servidor

### Problema 3: "Checkbox no se marca"

**Síntomas**:
```
│  ☑️  Marcando sanciones:
│    ✓ Multa marcada (pero realmente NO marcado)
│  ❌ Monto no visible
```

**Soluciones**:
1. Selector `.p-checkbox-box` cambió
2. HTML de checkbox es diferente
3. Elemento no es clickeable

**Debugging**:
```bash
# Ejecutar en modo debug
npx playwright test --debug

# En inspector, ejecutar:
await page.locator('.p-checkbox-box').first().click()
# Ver si falla
```

### Problema 4: "Solo registra 2-3 sanciones"

**Síntomas**:
```
✅ SANCIONES COMPLETADAS: 3/5
```

**Posibles causas**:
1. Timeout en sanción 3+
2. Modal no se abre para sanción 3+
3. Error en selector de tiempo/monto

**Soluciones**:
1. Aumentar timeout: `test.setTimeout(360000)` (6 minutos)
2. Revisar consola para paso exacto donde falla
3. Usar `--debug` para ver exactamente qué pasa

---

## 🎯 QUÉ HACER DESPUÉS

### ✅ Si Éxito (5/5 o 4/5)
1. Documentar el resultado
2. Tomar screenshots
3. Considerar usar como test oficial
4. Agregar a CI/CD

### ⚠️ Si Parcial (2-3/5)
1. Revisar qué sanción falla
2. Comparar selector en test-2.spec.ts
3. Usar `--debug` para debugging
4. Reportar qué selector cambió

### ❌ Si Fallo Total
1. Revisar si HTML cambió significativamente
2. Regenerar selectores con Codegen
3. Revisar si servidor está disponible
4. Verificar credenciales de login

---

## 📚 RECURSOS

### Archivos a Consultar
- `README_TEST_V2.md` - Guía rápida
- `VERIFICACION_SELECTORES_V2.md` - Selectores vs test-2
- `CASO_02_V2_OPTIMIZADO.md` - Documentación técnica
- `tests/test-2.spec.ts` - Test codegen de referencia

### Comandos Útiles

**Ver reportes después**:
```bash
npm run reports:open              # Abre reportes Playwright + Allure
npx playwright show-report         # Solo reportes Playwright
allure serve ./allure-results      # Solo reportes Allure
```

**Debugging**:
```bash
npx playwright test --debug        # Debug interactivo
npx playwright codegen             # Regenerar selectores
npx playwright test --ui           # UI para correr tests
```

**Limpiar resultados viejos**:
```bash
rm -Recurse test-results/          # PowerShell
rd /s /q test-results             # CMD
rm -r allure-results/              # PowerShell
```

---

## 🚨 CHECKLIST FINAL

Antes de ejecutar, verifica:

- [ ] Archivos descargados/creados correctamente
- [ ] Terminal abierta en directorio correcto
- [ ] Documentación leída (README_TEST_V2.md)
- [ ] npm packages instalados (`npm install`)
- [ ] Credenciales REGINSA correctas (user: lizvidal, pwd: QA123510qa)
- [ ] PDF test existe: `test-files/GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf`
- [ ] Conexión a internet disponible
- [ ] 300+ segundos de timeout

---

## 🚀 COMANDO FINAL

```bash
npm run test:02-v2
```

**Presiona Enter y espera...**

El test debería:
1. ✅ Abrir navegador
2. ✅ Hacer login
3. ✅ Crear 5 sanciones
4. ✅ Mostrar "1 registro creado"
5. ✅ Abrir reportes automáticamente

---

**Creado**: 2026-01-23  
**Versión**: V2 OPTIMIZADA  
**Status**: ✅ LISTO PARA EJECUTAR

**Siguiente paso**: Ejecuta `npm run test:02-v2` y observa los resultados 🚀
