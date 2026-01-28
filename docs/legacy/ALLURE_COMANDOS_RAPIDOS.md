# ⚠️ Documento movido

Este archivo fue movido a [docs/ALLURE_COMANDOS_RAPIDOS.md](docs/ALLURE_COMANDOS_RAPIDOS.md).

# ⚡ ALLURE - COMANDOS RÁPIDOS (TODOS LOS TERMINALES)

## 🎯 POWERSHELL

### Abrir Allure:
```powershell
allure serve allure-results
```

### Ejecutar Caso 01 + Allure:
```powershell
npm run test:01; allure serve allure-results
```

### Ejecutar Caso 02 + Allure:
```powershell
npm run test:02; allure serve allure-results
```

### Ejecutar Caso 03 + Allure:
```powershell
npm run test:03; allure serve allure-results
```

### Ejecutar Todos + Allure:
```powershell
npm run test:all; allure serve allure-results
```

---

## 🎯 CMD (COMMAND PROMPT)

### Abrir Allure:
```cmd
allure serve allure-results
```

### Ejecutar Caso 01 + Allure:
```cmd
npm run test:01 && allure serve allure-results
```

### Ejecutar Caso 02 + Allure:
```cmd
npm run test:02 && allure serve allure-results
```

### Ejecutar Caso 03 + Allure:
```cmd
npm run test:03 && allure serve allure-results
```

### Ejecutar Todos + Allure:
```cmd
npm run test:all && allure serve allure-results
```

---

## 🎯 BASH (Git Bash, WSL, Linux)

### Abrir Allure:
```bash
allure serve allure-results
```

### Ejecutar Caso 01 + Allure:
```bash
npm run test:01 && allure serve allure-results
```

### Ejecutar Caso 02 + Allure:
```bash
npm run test:02 && allure serve allure-results
```

### Ejecutar Caso 03 + Allure:
```bash
npm run test:03 && allure serve allure-results
```

### Ejecutar Todos + Allure:
```bash
npm run test:all && allure serve allure-results
```

---

## 🎯 CON SCRIPT (MÁS FÁCIL - TODOS LOS TERMINALES)

### Dobla clic en:
```
abrir-allure.bat
```

**URL:** http://localhost:4050

---

## 🎯 SECUENCIA TÍPICA

### Terminal 1 (PowerShell, CMD o Bash):
```
npm run test:all
```

### Terminal 2 (después que termine):
```
allure serve allure-results
```

### Navegador:
```
http://localhost:4050
```

---

## 📋 TABLA RÁPIDA - TODOS LOS TERMINALES

| Necesitas | PowerShell | CMD | Bash |
|-----------|-----------|-----|------|
| **Abrir Allure** | `allure serve allure-results` | `allure serve allure-results` | `allure serve allure-results` |
| **Caso 01 + Allure** | `npm run test:01; allure serve allure-results` | `npm run test:01 && allure serve allure-results` | `npm run test:01 && allure serve allure-results` |
| **Caso 02 + Allure** | `npm run test:02; allure serve allure-results` | `npm run test:02 && allure serve allure-results` | `npm run test:02 && allure serve allure-results` |
| **Caso 03 + Allure** | `npm run test:03; allure serve allure-results` | `npm run test:03 && allure serve allure-results` | `npm run test:03 && allure serve allure-results` |
| **Todos + Allure** | `npm run test:all; allure serve allure-results` | `npm run test:all && allure serve allure-results` | `npm run test:all && allure serve allure-results` |
| **Detener Allure** | Ctrl+C | Ctrl+C | Ctrl+C |

---

## 💡 DIFERENCIAS POR TERMINAL

| Terminal | Separador | Notas |
|----------|-----------|-------|
| **PowerShell** | `;` | Usa punto y coma |
| **CMD** | `&&` | Usa doble ampersand |
| **Bash** | `&&` | Usa doble ampersand |
| **Script** | N/A | Usa `.bat` para todos |

---

**¡Listo!** ✅
