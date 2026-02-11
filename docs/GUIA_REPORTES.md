## 📊 GUÍA DE REPORTES - Playwright y Allure

### ✅ Reportes Habilitados

El proyecto tiene 2 tipos de reportes configurados en `playwright.config.js`:

1. **Playwright HTML Report** (nativo de Playwright)
2. **Allure Report** (reporte profesional)

---

## 🚀 CÓMO VER LOS REPORTES

### Opción 0: Automático (recomendado)

Los comandos `npm run test:*` abren **Playwright** y **Allure** al finalizar, incluso si hay fallas:

```bash
npm run test:all
# o un caso específico
npm run test:02
```

### Opción 1: Comando Manual

#### Ver Playwright Report (HTML)
```bash
npx playwright show-report
```
- Se abre automáticamente en el navegador
- Muestra: screenshots, videos, traces de cada test
- Ubicación: `playwright-report/index.html`

#### Ver Allure Report
```bash
allure serve allure-results
```
- Se abre en `http://localhost:4050`
- Dashboard profesional con gráficos
- Historial de ejecuciones
- **Requiere instalar Allure CLI**

---

## 📥 INSTALACIÓN DE ALLURE CLI

### Windows
```bash
# Con npm
npm install -g allure-commandline

# Con Chocolatey
choco install allure
```

### macOS
```bash
brew install allure
```

### Linux
```bash
sudo apt-add-repository ppa:qameta/allure
sudo apt-get update
sudo apt-get install allure
```

---

## 🎬 FLUJO COMPLETO (Automatizado)

### Windows - Usar script

```bash
# Ejecutar desde la raíz del proyecto
scripts\reportes\view-reports.bat
```

Hace automáticamente:
1. ✅ Ejecuta `npm run test:02`
2. ✅ Abre Playwright Report
3. ✅ Abre Allure Report (si está instalado)

### Linux/macOS - Usar script

```bash
chmod +x scripts/reportes/view-reports.sh
./scripts/reportes/view-reports.sh
```

---

## 📁 ESTRUCTURA DE REPORTES

```
proyecto/
├── playwright-report/          ← HTML Report (Playwright)
│   ├── index.html
│   ├── data/
│   └── assets/
│
├── allure-results/             ← JSON Results (Allure)
│   ├── *.json
│   └── history/
│
└── test-results/               ← Screenshots y traces
    └── casos-prueba-02-*/
        ├── test-failed-1.png
        └── error-context.md
```

---

## 🔍 QUÉ PUEDES VER EN LOS REPORTES

### Playwright Report
- ✅ **Status**: PASSED / FAILED
- ✅ **Duración**: Tiempo total de ejecución
- ✅ **Screenshots**: Capturas en cada paso
- ✅ **Videos**: Grabación completa (si está habilitado)
- ✅ **Traces**: Debug detallado de cada acción
- ✅ **Logs**: Salida de console
- ✅ **Error details**: Stack trace si falló

### Allure Report
- ✅ **Dashboard**: Gráficos de éxito/fallo
- ✅ **Timeline**: Duración por paso
- ✅ **Historico**: Tendencias de ejecuciones
- ✅ **Detalles del ambiente**: Browser, SO, etc
- ✅ **Attachments**: Screenshots, logs
- ✅ **Comportamientos**: Agrupación por funcionalidad
- ✅ **Defectos**: Fallas y categorización

---

## 🎯 CASO DE USO

### Después de ejecutar test

```bash
# Ejecutar tests y abrir ambos reportes al final
npm run test:all

# Resultado:
# - Playwright se abre en: http://localhost:3000
# - Allure se abre en: http://localhost:4050
```

---

## 🛠️ TROUBLESHOOTING

### "allure: command not found"
```bash
# Instalar Allure CLI
npm install -g allure-commandline

# Verificar instalación
allure --version
```

### "No existe playwright-report/"
```bash
# Ejecutar test primero
npm run test:02

# Luego ver reporte
npx playwright show-report
```

### "Allure port 4050 en uso"
```bash
# Usar puerto diferente
allure serve allure-results --port 5000
```

---

## 📌 RESUMEN RÁPIDO

| Acción | Comando |
|--------|---------|
| Ejecutar test (abre reportes) | `npm run test:02` |
| Ver Playwright | `npx playwright show-report` |
| Ver Allure | `allure serve allure-results` |
| Script Windows | `scripts\reportes\view-reports.bat` |
| Script Linux/Mac | `./view-reports.sh` |
| Limpiar reportes | `rm -rf playwright-report allure-results` |

`allure-results` guarda resultados y adjuntos de las ejecuciones. Se puede borrar sin problema antes de una nueva corrida.

---

## 🚀 CI/CD INTEGRATION

Los reportes se generan automáticamente y pueden integrarse en:

- ✅ **GitHub Actions**
- ✅ **GitLab CI**
- ✅ **Jenkins**
- ✅ **Azure DevOps**

Ejemplo para GitHub Actions:
```yaml
- name: Run tests
  run: npm run test:02

- name: Publish Playwright report
  uses: daun/playwright-report-comment@v3
```
