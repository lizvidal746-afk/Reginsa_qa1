# âš ï¸ Documento movido

Este archivo fue movido a [docs/ALLURE_NO_APARECE_SOLUCION.md](docs/ALLURE_NO_APARECE_SOLUCION.md).

# ðŸ” ALLURE NO APARECE - SOLUCIONES

## ðŸš¨ Problema Identificado

El script `reports:open` en Windows puede no funcionar correctamente con operador `&`.

**SoluciÃ³n:** Usar comando directo de Allure

---

## âœ… SOLUCIÃ“N 1: Comando Directo (RECOMENDADO)

### En PowerShell:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; allure serve allure-results
```

### En CMD:
```cmd
cd "d:\SUNEDU\SELENIUM\playwrigth" && allure serve allure-results
```

**QuÃ© hace:**
- Genera el reporte automÃ¡ticamente
- Lo abre en navegador (http://localhost:4050)
- Mantiene el servicio activo

---

## âœ… SOLUCIÃ“N 2: Script Batch (Windows)

**Haz doble clic:**
```
D:\SUNEDU\SELENIUM\playwrigth\abrir-allure.bat
```

**QuÃ© hace:**
- Verifica que existan datos
- Genera reporte
- Abre en navegador

---

## âœ… SOLUCIÃ“N 3: Script PowerShell

**Ejecuta en PowerShell:**
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"
.\abrir-allure.ps1
```

**QuÃ© hace:**
- Lo mismo que batch pero en PowerShell

---

## ðŸ”§ FLUJO CORRECTO AHORA

### Paso 1: Limpiar
**PowerShell:**
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -ErrorAction SilentlyContinue
```

### Paso 2: Ejecutar test
**PowerShell:**
```powershell
npm run test:02
```

**Espera:**
- ~50 segundos hasta que termine
- Playwright Report se abrirÃ¡ automÃ¡ticamente

### Paso 3: Abrir Allure
**PowerShell:**
```powershell
allure serve allure-results
```

**Resultado:**
- Allure Report se abre en http://localhost:4050

---

## ðŸ“‹ SECUENCIA COMPLETA (PowerShell)

```powershell
# 1. Limpiar
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -ErrorAction SilentlyContinue

# 2. Ejecutar test (espera 50 segundos)
npm run test:02

# 3. En otra terminal o despuÃ©s de que termine, abrir Allure
allure serve allure-results
```

---

## ðŸ“‹ SECUENCIA COMPLETA (CMD)

```cmd
# 1. Limpiar
cd "d:\SUNEDU\SELENIUM\playwrigth" && rmdir /s /q allure-results allure-report playwright-report test-results screenshots 2>nul & del registros-administrados.json reporte-administrados.html 2>nul

# 2. Ejecutar test (espera 50 segundos)
npm run test:02

# 3. En otra terminal, abrir Allure
cd "d:\SUNEDU\SELENIUM\playwrigth" && allure serve allure-results
```

---

## âœ… VERIFICAR QUE ALLURE FUNCIONA

**Ver versiÃ³n instalada:**
```powershell
allure --version
```

**Esperado:**
```
2.25.0
```

Si da error, instalar:
```powershell
npm install -g allure-commandline
```

---

## ðŸŽ¯ COMANDO MÃS SIMPLE

Simplemente:
```powershell
allure serve allure-results
```

Eso es TODO lo que necesitas para ver Allure.

---

## ðŸ’¡ Tips

1. **Allure tarda mÃ¡s que Playwright** - Es normal
2. **Usa comando directo** - No depende del script npm
3. **Abre Allure en otra terminal** - DespuÃ©s que terminen los tests
4. **Si puerto 4050 estÃ¡ ocupado**, mata el proceso:
   ```powershell
   netstat -ano | findstr :4050
   taskkill /PID <PID> /F
   ```

---

## âœ¨ Nueva ConfiguraciÃ³n

**Actualizado `package.json`:**
```json
"report:allure:open": "allure serve ./allure-results"
```

Ahora usa `allure serve` directamente (mÃ¡s confiable que `allure open`).

---

**Prueba ahora con: `allure serve allure-results` y dime quÃ© pasa.** ðŸš€


