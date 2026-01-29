# âš¡ TODOS LOS COMANDOS POR TERMINAL

## ðŸªŸ POWERSHELL (Windows)

**Indicador:** `PS D:\...>`

### Limpiar:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; del registros-administrados.json, reporte-administrados.html -ErrorAction SilentlyContinue
```

### Ejecutar Caso 01:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; npm run test:01
```

### Ejecutar Caso 02:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; npm run test:02
```

### Ejecutar Todos:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; npm run test:all
```

### Ver Allure:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; allure serve allure-results
```

### Ver Playwright:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; npx playwright show-report
```

### Limpiar pantalla:
```powershell
Clear-Host
```

---

## âŒ¨ï¸ CMD (Windows ClÃ¡sico)

**Indicador:** `D:\...>` o `C:\...>` (sin PS)

### Limpiar:
```cmd
cd "d:\SUNEDU\SELENIUM\playwrigth" && del registros-administrados.json reporte-administrados.html 2>nul
```

### Ejecutar Caso 01:
```cmd
cd "d:\SUNEDU\SELENIUM\playwrigth" && npm run test:01
```

### Ejecutar Caso 02:
```cmd
cd "d:\SUNEDU\SELENIUM\playwrigth" && npm run test:02
```

### Ejecutar Todos:
```cmd
cd "d:\SUNEDU\SELENIUM\playwrigth" && npm run test:all
```

### Ver Allure:
```cmd
cd "d:\SUNEDU\SELENIUM\playwrigth" && allure serve allure-results
```

### Ver Playwright:
```cmd
cd "d:\SUNEDU\SELENIUM\playwrigth" && npx playwright show-report
```

### Limpiar pantalla:
```cmd
cls
```

---

## ðŸ§ BASH (Git Bash, Linux, Mac)

**Indicador:** `$` o `bash-...$`

### Limpiar:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && rm registros-administrados.json reporte-administrados.html 2>/dev/null
```

### Ejecutar Caso 01:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && npm run test:01
```

### Ejecutar Caso 02:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && npm run test:02
```

### Ejecutar Todos:
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

### Limpiar pantalla:
```bash
clear
```

---

## ðŸ“‹ TABLA RÃPIDA DE SINTAXIS

| AcciÃ³n | PowerShell | CMD | Bash |
|--------|-----------|-----|------|
| **Separador** | `;` | `&&` | `&&` |
| **Eliminar** | `del` | `del` | `rm` |
| **Ignorar errores** | `-ErrorAction SilentlyContinue` | `2>nul` | `2>/dev/null` |
| **Limpiar pantalla** | `Clear-Host` | `cls` | `clear` |

---

## ðŸŽ¯ MI RECOMENDACIÃ“N

Si estÃ¡s en Windows:
1. âœ… Usa **PowerShell** (mÃ¡s moderno)
2. Si tengo dudas, usa **CMD** (mÃ¡s simple)
3. Si usas Git Bash, usa **Bash**

---

## âœ… GUÃA VISUAL

**Ver quÃ© terminal tienes:**

```
Mira el sÃ­mbolo al inicio de la lÃ­nea:

PS D:\...>          â† PowerShell    (Copia comandos PowerShell)
D:\...>  o C:\...>  â† CMD           (Copia comandos CMD)
$ o bash-$          â† Bash          (Copia comandos Bash)
```

---

**Â¡Elige tu terminal y copia el comando que necesitas!** ðŸš€

