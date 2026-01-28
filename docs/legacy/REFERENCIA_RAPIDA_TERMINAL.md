# 🚀 REFERENCIA RÁPIDA POR TERMINAL

## 🔷 POWERSHELL (Windows)

```powershell
# Ejecutar tests
npm run test:01       # Caso 01
npm run test:02       # Caso 02
npm run test:all      # Todos

# Allure (script)
dobla clic en: abrir-allure.bat

# Allure (comando)
allure serve allure-results

# Allure completo (test + report)
npm run test:all; allure serve allure-results

# Limpiar (script)
dobla clic en: limpiar-todo.bat

# Limpiar (comando)
.\limpiar-todo.ps1

# Ver en vivo
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

---

## 🔶 CMD (Windows Command Prompt)

```cmd
# Ejecutar tests
npm run test:01       # Caso 01
npm run test:02       # Caso 02
npm run test:all      # Todos

# Allure (script)
dobla clic en: abrir-allure.bat

# Allure (comando)
allure serve allure-results

# Allure completo (test + report)
npm run test:all && allure serve allure-results

# Limpiar (script)
dobla clic en: limpiar-todo.bat

# Limpiar (comando)
cd D:\SUNEDU\SELENIUM\playwrigth
rmdir /s /q allure-results allure-report playwright-report test-results screenshots
del /q registros-administrados.json reporte-administrados.html

# Ver en vivo
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

---

## 🔵 BASH (Git Bash, WSL, Linux)

```bash
# Ejecutar tests
npm run test:01       # Caso 01
npm run test:02       # Caso 02
npm run test:all      # Todos

# Allure (comando)
allure serve allure-results

# Allure completo (test + report)
npm run test:all && allure serve allure-results

# Limpiar (comando)
rm -rf allure-results allure-report playwright-report test-results screenshots registros-administrados.json reporte-administrados.html

# Ver en vivo
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

---

## 🟣 ZSH (macOS, Linux)

```zsh
# Ejecutar tests
npm run test:01       # Caso 01
npm run test:02       # Caso 02
npm run test:all      # Todos

# Allure (comando)
allure serve allure-results

# Allure completo (test + report)
npm run test:all && allure serve allure-results

# Limpiar (comando)
rm -rf allure-results allure-report playwright-report test-results screenshots registros-administrados.json reporte-administrados.html

# Ver en vivo
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts --ui
```

---

## 🔑 DIFERENCIAS CLAVE

| Aspecto | PowerShell | CMD | Bash | ZSH |
|--------|-----------|-----|------|-----|
| **Separador** | `;` | `&&` | `&&` | `&&` |
| **Scripts** | `.\archivo.ps1` | `archivo.bat` | `./archivo.sh` | `./archivo.sh` |
| **Variables** | `$variable` | `%variable%` | `$variable` | `$variable` |
| **Home** | `$PROFILE` | `%USERPROFILE%` | `~` | `~` |

---

## 💡 ATAJOS ÚTILES

### Ejecutar + Ver Allure (copia y pega):

**PowerShell:**
```powershell
npm run test:all; allure serve allure-results
```

**CMD:**
```cmd
npm run test:all && allure serve allure-results
```

**Bash:**
```bash
npm run test:all && allure serve allure-results
```

---

### Limpiar + Ejecutar + Ver Allure:

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

**¡Elige tu terminal y copia/pega!** ✅
