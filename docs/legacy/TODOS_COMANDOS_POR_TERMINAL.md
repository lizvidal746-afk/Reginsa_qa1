# 📋 TODOS LOS COMANDOS POR TERMINAL

## 🎯 POWERSHELL (Windows)

### Tests
```powershell
npm run test:01       # Caso 01
npm run test:02       # Caso 02
npm run test:all      # Todos
```

### Allure
```powershell
allure serve allure-results
.\abrir-allure.ps1
```

### Limpiar
```powershell
.\limpiar-todo.ps1
```

### Tests + Allure (Todo en uno)
```powershell
npm run test:01; allure serve allure-results
npm run test:02; allure serve allure-results
npm run test:all; allure serve allure-results
```

### Ver en vivo
```powershell
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

---

## 🎯 CMD (Windows Command Prompt)

### Tests
```cmd
npm run test:01       # Caso 01
npm run test:02       # Caso 02
npm run test:all      # Todos
```

### Allure
```cmd
allure serve allure-results
```

### Limpiar
```cmd
# Opción A: Script
limpiar-todo.bat

# Opción B: Comando
cd D:\SUNEDU\SELENIUM\playwrigth
rmdir /s /q allure-results allure-report playwright-report test-results screenshots
del /q registros-administrados.json reporte-administrados.html
```

### Tests + Allure (Todo en uno)
```cmd
npm run test:01 && allure serve allure-results
npm run test:02 && allure serve allure-results
npm run test:all && allure serve allure-results
```

### Ver en vivo
```cmd
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

---

## 🎯 BASH (Git Bash, WSL, Linux)

### Tests
```bash
npm run test:01       # Caso 01
npm run test:02       # Caso 02
npm run test:all      # Todos
```

### Allure
```bash
allure serve allure-results
```

### Limpiar
```bash
rm -rf allure-results allure-report playwright-report test-results screenshots registros-administrados.json reporte-administrados.html
```

### Tests + Allure (Todo en uno)
```bash
npm run test:01 && allure serve allure-results
npm run test:02 && allure serve allure-results
npm run test:all && allure serve allure-results
```

### Ver en vivo
```bash
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

---

## 🎯 ZSH (macOS, Linux)

### Tests
```zsh
npm run test:01       # Caso 01
npm run test:02       # Caso 02
npm run test:all      # Todos
```

### Allure
```zsh
allure serve allure-results
```

### Limpiar
```zsh
rm -rf allure-results allure-report playwright-report test-results screenshots registros-administrados.json reporte-administrados.html
```

### Tests + Allure (Todo en uno)
```zsh
npm run test:01 && allure serve allure-results
npm run test:02 && allure serve allure-results
npm run test:all && allure serve allure-results
```

### Ver en vivo
```zsh
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

---

## 📊 TABLA COMPARATIVA

| Acción | PowerShell | CMD | Bash | ZSH |
|--------|-----------|-----|------|-----|
| **Ejecutar Caso 01** | `npm run test:01` | `npm run test:01` | `npm run test:01` | `npm run test:01` |
| **Ejecutar Caso 02** | `npm run test:02` | `npm run test:02` | `npm run test:02` | `npm run test:02` |
| **Ejecutar Todos** | `npm run test:all` | `npm run test:all` | `npm run test:all` | `npm run test:all` |
| **Abrir Allure** | `allure serve allure-results` | `allure serve allure-results` | `allure serve allure-results` | `allure serve allure-results` |
| **Caso 01 + Allure** | `npm run test:01;` | `npm run test:01 &&` | `npm run test:01 &&` | `npm run test:01 &&` |
| | `allure serve allure-results` | `allure serve allure-results` | `allure serve allure-results` | `allure serve allure-results` |

---

## 🔑 SEPARADORES POR TERMINAL

| Terminal | Separador | Uso |
|----------|-----------|-----|
| PowerShell | `;` | Punto y coma |
| CMD | `&&` | Doble ampersand |
| Bash | `&&` | Doble ampersand |
| ZSH | `&&` | Doble ampersand |

---

## 💡 NOTAS IMPORTANTES

### PowerShell
- Usa `;` para separar comandos
- Usa `.\` para ejecutar scripts locales
- Ejemplo: `npm run test:01; allure serve allure-results`

### CMD
- Usa `&&` para ejecutar secuencial (solo si anterior tiene éxito)
- Usa `dir` en lugar de `ls`
- Ejemplo: `npm run test:01 && allure serve allure-results`

### Bash / ZSH
- Usa `&&` para ejecutar secuencial (solo si anterior tiene éxito)
- Usa `||` para ejecutar si anterior falla
- Ejemplo: `npm run test:01 && allure serve allure-results`

---

## 🚀 CICLOS RECOMENDADOS

### Ciclo A: Limpiar + Ejecutar + Ver Allure

**PowerShell:**
```powershell
.\limpiar-todo.ps1; npm run test:all; allure serve allure-results
```

**CMD:**
```cmd
limpiar-todo.bat && npm run test:all && allure serve allure-results
```

**Bash:**
```bash
rm -rf allure-results allure-report playwright-report test-results screenshots && npm run test:all && allure serve allure-results
```

---

### Ciclo B: Ejecutar + Ver Allure (Separado)

**PowerShell - Terminal 1:**
```powershell
npm run test:all
```

**PowerShell - Terminal 2:**
```powershell
allure serve allure-results
```

---

### Ciclo C: Ver en vivo

**Todos los terminales:**
```
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

---

**¡Usa el comando que corresponda a tu terminal!** ✅
