# ⚡ Ejecución Automática de Tests + Reportes

## 🎯 Métodos de Ejecución

### Opción 1: Scripts en `package.json` (Terminal)

```bash
# Caso 01 + Abrir reportes
npm run test:01

# Caso 02 + Abrir reportes
npm run test:02

# Todos los casos + Abrir reportes
npm run test:all
```

**Qué hace:**
1. ✅ Ejecuta los tests
2. ✅ Automáticamente abre Playwright Report
3. ✅ Automáticamente genera y abre Allure Report

---

### Opción 2: Archivos Batch (Click directo)

**Para Windows - Haz doble clic:**

| Archivo | Acción |
|---------|--------|
| `ejecutar-caso-01.bat` | Ejecuta Caso 01 + abre ambos reportes |
| `ejecutar-caso-02.bat` | Ejecuta Caso 02 + abre ambos reportes |
| `ejecutar-todos-casos.bat` | Ejecuta todos + abre ambos reportes |

**Ejemplo:**
```
D:\SUNEDU\SELENIUM\playwrigth\
└── ejecutar-caso-02.bat  ← Haz doble clic aquí
    ↓
    Ejecuta Caso 02
    Abre Playwright Report (navegador 1)
    Abre Allure Report (navegador 2)
```

---

## 📊 Dónde aparecerán los reportes

### Playwright Report
- **URL:** `http://localhost:9323`
- **Tiempo:** Se abre automáticamente en navegador
- **Contenido:**
  - Screenshots de cada paso
  - Videos de ejecución
  - Tiempos
  - Logs

### Allure Report
- **URL:** `http://localhost:4050`
- **Tiempo:** Se abre automáticamente en navegador (después de generar)
- **Contenido:**
  - Estadísticas de tests
  - Detalles por caso
  - Historial de ejecuciones
  - Gráficas

---

## 🔄 Flujo Automático Actual

```
npm run test:02
    ↓
┌───────────────────────────────────────┐
│ 1. Ejecuta tests                      │
│    (browser visible)                  │
└───────────────────────────────────────┘
    ↓
┌───────────────────────────────────────┐
│ 2. Test terminado                     │
│    pytest exit code → 0 (success)     │
└───────────────────────────────────────┘
    ↓
┌───────────────────────────────────────┐
│ 3. npm run reports:open               │
│    (ejecuta automáticamente)          │
└───────────────────────────────────────┘
    ↓ (en paralelo)
┌─────────────────────┬─────────────────┐
│ Playwright Report   │ Allure Report   │
│ http://9323         │ http://4050     │
│ Abre inmediatamente │ Genera luego    │
│                     │ abre            │
└─────────────────────┴─────────────────┘
```

---

## ⚙️ Configuración Técnica

**En `package.json`:**
```json
"test:02": "playwright test ... --headed && npm run reports:open",
"reports:open": "echo ✨ Abriendo... && npm run report:playwright & npm run report:allure:generate && npm run report:allure:open"
```

**Cómo funciona:**
- `&&` = Si test pasa, ejecuta siguiente
- `&` = Ejecuta en paralelo (Playwright no espera Allure)
- `npm run report:playwright` = `playwright show-report`
- `npm run report:allure:generate` = Genera Allure
- `npm run report:allure:open` = `allure open ./allure-report`

---

## 💡 Ventajas

✅ **Sin manual:** No necesitas abrir reportes a mano  
✅ **Automático:** Se abre en navegador apenas termina  
✅ **Dos reportes:** Ambos visibles simultáneamente  
✅ **Windows:** Bat files para click directo  
✅ **Terminal:** Scripts npm si prefieres línea de comando  

---

## 🚨 Si no se abre el reporte

**Problema 1: Puerto ocupado**
```bash
# Ver qué usa puerto 4050
netstat -ano | findstr :4050

# Matar proceso
taskkill /PID <PID> /F
```

**Problema 2: Allure no genera**
```bash
# Verificar Allure está instalado
allure --version

# Si no:
npm install -g allure-commandline
```

**Problema 3: No abre automáticamente**
```bash
# Abrir manualmente
npx playwright show-report        # Playwright
allure serve allure-results      # Allure
```

---

## 📝 Próximos Pasos

1. ✅ Scripts configurados
2. ✅ Batch files creados
3. 🔄 Ejecuta: `npm run test:02`
4. 🎉 Verás ambos reportes automáticamente

---

**Actualizado:** Enero 20, 2026  
**Autores:** Arquitectura automatizada con reportes 100% automáticos
