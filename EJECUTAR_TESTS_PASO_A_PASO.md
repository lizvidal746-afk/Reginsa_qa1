# 🚀 EJECUTAR TESTS + ALLURE - PASO A PASO

## 1️⃣ EJECUTAR CASO 01 + ALLURE

### Paso 1: Ejecutar test
```powershell
npm run test:01
```

**Espera a que termine (~2-3 minutos)**

Verás:
```
✅ CASO 01 COMPLETADO EXITOSAMENTE
Serving HTML report at http://localhost:9323
```

### Paso 2: Abrir Allure (en nueva terminal)
```powershell
allure serve allure-results
```

**Resultado:**
- Playwright Report: http://localhost:9323
- Allure Report: http://localhost:4050

---

## 2️⃣ EJECUTAR CASO 02 + ALLURE

### Paso 1: Ejecutar test
```powershell
npm run test:02
```

**Espera a que termine (~46 segundos)**

### Paso 2: Abrir Allure (en nueva terminal)
```powershell
allure serve allure-results
```

**Resultado:**
- Verás: Caso 01 + Caso 02 en Allure
- Playwright Report con nuevos screenshots
- Allure con estadísticas actualizadas

---

## 3️⃣ EJECUTAR CASO 03 + ALLURE

### Paso 1: Ejecutar test
```powershell
npm run test:03
```

**Espera a que termine (~60-70 segundos)**

### Paso 2: Abrir Allure (en nueva terminal)
```powershell
allure serve allure-results
```

**Resultado:**
- Verás: Caso 01 + Caso 02 + Caso 03 en Allure
- Playwright Report con nuevos screenshots
- Allure con estadísticas actualizadas

---

## 4️⃣ EJECUTAR TODOS LOS CASOS + ALLURE

### Paso 1: Limpiar (opcional)
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -ErrorAction SilentlyContinue
```

### Paso 2: Ejecutar todos
```powershell
npm run test:all
```

**Espera a que termine (~3 minutos)**

### Paso 3: Abrir Allure (en nueva terminal)
```powershell
allure serve allure-results
```

**Resultado:**
- Playwright Report: http://localhost:9323
- Allure Report: http://localhost:4050
- Allure muestra: Caso 01 + Caso 02

---

## 📋 RESUMEN DE COMANDOS

| Acción | Comando |
|--------|---------|
| **Caso 01** | `npm run test:01` |
| **Caso 02** | `npm run test:02` |
| **Caso 03** | `npm run test:03` |
| **Todos** | `npm run test:all` |
| **Ver Allure** | `allure serve allure-results` |

---

## 🔄 SECUENCIA RECOMENDADA (SIN LIMPIAR)

### Terminal 1:
```powershell
npm run test:01     # Espera 2-3 min
```

### Terminal 2 (nueva):
```powershell
npm run test:02     # Espera 46 seg
```

### Terminal 3 (nueva):
```powershell
allure serve allure-results    # Ver ambos reportes
```

---

## 🔄 SECUENCIA RECOMENDADA (CON LIMPIEZA)

### Terminal 1:
```powershell
# Limpiar
cd "d:\SUNEDU\SELENIUM\playwrigth"; Remove-Item -Path allure-results, allure-report, playwright-report, test-results, screenshots, registros-administrados.json, reporte-administrados.html -Recurse -ErrorAction SilentlyContinue

# Ejecutar todos
npm run test:all
```

### Terminal 2 (nueva):
```powershell
allure serve allure-results
```

---

## 💡 NOTAS

- **Playwright Report** se abre automáticamente después del test
- **Allure Report** lo abres manualmente (es más rápido así)
- **Allure tarda más** que Playwright (es normal)
- **Puedes tener ambos abiertos** en navegadores diferentes

---

## ✅ CHECKLIST

- [ ] Terminal 1: `npm run test:01`
- [ ] Esperar a que termine
- [ ] Terminal 2: `allure serve allure-results`
- [ ] Ver Allure en http://localhost:4050
- [ ] Cerrar Allure (Ctrl+C en Terminal 2)
- [ ] Terminal 1: `npm run test:02`
- [ ] Esperar a que termine
- [ ] Terminal 2: `allure serve allure-results`
- [ ] Ver Allure actualizado con Caso 02

---

**¡Listo! Sigue estos pasos para ejecutar y ver reportes.** ✅
