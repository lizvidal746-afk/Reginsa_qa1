# ðŸ“‹ TODOS LOS COMANDOS - COMPLETO

## ðŸ§¹ LIMPIAR

### Limpiar Caso 01:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && del registros-administrados.json registros-administrados.html 2>nul
```

### Limpiar terminal (Bash):
```bash
clear
```

### Limpiar terminal (CMD Windows):
```cmd
cls
```

### Limpiar terminal (PowerShell):
```powershell
Clear-Host
```

---

## âœ… EJECUTAR TESTS

### Ejecutar Caso 01:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && npm run test:01
```

### Ejecutar Caso 02:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && npm run test:02
```

### Ejecutar Todos los Casos:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && npm run test:all
```

---

## ðŸ“Š VER REPORTES

### Ver Allure Report (Profesional):
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && allure serve allure-results
```
**URL:** `http://localhost:4050`

### Ver Playwright Report (Detalles):
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && npx playwright show-report
```
**URL:** `http://localhost:9323`

---

## ðŸ”„ SECUENCIA COMPLETA

```bash
# 1. Abrir terminal (Ctrl+Shift+` en VS Code)

# 2. Limpiar pantalla
clear

# 3. Ir a carpeta
cd "d:\SUNEDU\SELENIUM\playwrigth"

# 4. Limpiar Caso 01
del registros-administrados.json registros-administrados.html 2>nul

# 5. Ejecutar Caso 01 (espera ~2-3 minutos)
npm run test:01

# 6. Limpiar pantalla (opcional)
clear

# 7. Ejecutar Caso 02 (espera ~46 segundos)
npm run test:02

# 8. Ver Allure Report (abre en navegador automÃ¡ticamente)
# O si quieres abrirlo manualmente:
allure serve allure-results

# 9. Ejecutar Todos (en otra sesiÃ³n):
npm run test:all
```

---

## âš¡ COPIAR UNA SOLA LÃNEA

### Caso 01 (Limpiar + Ejecutar):
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && del registros-administrados.json registros-administrados.html 2>nul && npm run test:01
```

### Caso 02:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && npm run test:02
```

### Todos:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && npm run test:all
```

### Ver Allure:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && allure serve allure-results
```

### Ver Playwright:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && npx playwright show-report
```

---

## ðŸ’¡ COMANDOS ÃšTILES

| Comando | PropÃ³sito |
|---------|-----------|
| `clear` o `cls` | Limpiar pantalla |
| `cd carpeta` | Cambiar directorio |
| `dir` o `ls` | Listar archivos |
| `del archivo.ext` | Eliminar archivo |
| `npm run test:01` | Ejecutar Caso 01 |
| `npm run test:02` | Ejecutar Caso 02 |
| `npm run test:all` | Ejecutar todos |
| `allure serve allure-results` | Ver Allure Report |
| `npx playwright show-report` | Ver Playwright Report |

---

**Â¡Todos los comandos listos! Copia el que necesites.** âœ…

