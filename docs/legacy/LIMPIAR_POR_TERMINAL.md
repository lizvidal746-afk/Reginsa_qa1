# ⚠️ Documento movido

Este archivo fue movido a [docs/LIMPIAR_POR_TERMINAL.md](docs/LIMPIAR_POR_TERMINAL.md).

# 🧹 LIMPIAR REGISTROS POR TIPO DE TERMINAL

## 🎯 ¿Cuál es tu terminal?

Ejecuta esto para saberlo:

| Terminal | Cómo verificar |
|----------|---|
| **PowerShell** | Verás `PS C:\...>` al inicio |
| **CMD** | Verás `C:\...>` al inicio |
| **Bash** | Verás `$` o `bash-...` al inicio |

---

## 1️⃣ POWERSHELL (Windows - Por defecto en VS Code)

**Indicador:** `PS D:\...>`

### Comando para limpiar Caso 01:
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; del registros-administrados.json, reporte-administrados.html -ErrorAction SilentlyContinue
```

**Explicación:**
- `cd "..."` - Cambia a la carpeta
- `;` - Separador en PowerShell (NO `&&`)
- `del` - Elimina archivos
- `-ErrorAction SilentlyContinue` - Ignora errores si no existen

**Resultado esperado:**
```
PS D:\SUNEDU\SELENIUM\playwrigth>
```
(Sin mensajes de error, todo limpio)

---

## 2️⃣ CMD (Command Prompt - Windows clásico)

**Indicador:** `C:\...>` o `D:\...>`

### Comando para limpiar Caso 01:
```cmd
cd "d:\SUNEDU\SELENIUM\playwrigth" && del registros-administrados.json reporte-administrados.html 2>nul
```

**Explicación:**
- `cd "..."` - Cambia a la carpeta
- `&&` - Separador en CMD (ejecuta si anterior tuvo éxito)
- `del` - Elimina archivos
- `2>nul` - Ignora errores si no existen

**Resultado esperado:**
```
D:\SUNEDU\SELENIUM\playwrigth>
```
(Sin mensajes, archivos eliminados)

---

## 3️⃣ BASH (Git Bash, Linux, Mac)

**Indicador:** `$` o `bash-...`

### Comando para limpiar Caso 01:
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && rm registros-administrados.json reporte-administrados.html 2>/dev/null
```

**Explicación:**
- `cd "..."` - Cambia a la carpeta
- `&&` - Separador en Bash (ejecuta si anterior tuvo éxito)
- `rm` - Elimina archivos (NO `del`)
- `2>/dev/null` - Ignora errores si no existen

**Resultado esperado:**
```
$ 
```
(Sin mensajes, archivos eliminados)

---

## 📊 TABLA COMPARATIVA

| Acción | PowerShell | CMD | Bash |
|--------|-----------|-----|------|
| **Cambiar carpeta** | `cd "..."` | `cd "..."` | `cd "..."` |
| **Separador** | `;` | `&&` | `&&` |
| **Eliminar archivo** | `del` o `rm` | `del` | `rm` |
| **Ignorar errores** | `-ErrorAction SilentlyContinue` | `2>nul` | `2>/dev/null` |
| **Ejemplo completo** | `cd "..."; del arch1, arch2` | `cd "..." && del arch1 arch2` | `cd "..." && rm arch1 arch2` |

---

## ✅ PASOS PARA LIMPIAR

### Paso 1: Abre terminal en VS Code
```
Ctrl + Shift + `
```

### Paso 2: Verifica cuál terminal tienes
Mira el indicador al inicio:
- `PS` → PowerShell ⬇️
- `C:\` o `D:\` → CMD ⬇️
- `$` → Bash ⬇️

### Paso 3: Copia el comando CORRECTO para tu terminal

---

## 🚀 COPIA EXACTO PARA TU TERMINAL

### 👉 Si ves `PS D:\...>`

```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"; del registros-administrados.json, reporte-administrados.html -ErrorAction SilentlyContinue
```

**Luego presiona:** `Enter`

**Resultado:**
```
PS D:\SUNEDU\SELENIUM\playwrigth>
```

---

### 👉 Si ves `D:\...>` (sin PS)

```cmd
cd "d:\SUNEDU\SELENIUM\playwrigth" && del registros-administrados.json reporte-administrados.html 2>nul
```

**Luego presiona:** `Enter`

**Resultado:**
```
D:\SUNEDU\SELENIUM\playwrigth>
```

---

### 👉 Si ves `$` o `bash`

```bash
cd "d:\SUNEDU\SELENIUM\playwrigth" && rm registros-administrados.json reporte-administrados.html 2>/dev/null
```

**Luego presiona:** `Enter`

**Resultado:**
```
$
```

---

## 🔄 SECUENCIA COMPLETA (PowerShell)

```powershell
# 1. Limpiar pantalla
Clear-Host

# 2. Limpiar Caso 01
cd "d:\SUNEDU\SELENIUM\playwrigth"; del registros-administrados.json, reporte-administrados.html -ErrorAction SilentlyContinue

# 3. Ejecutar Caso 01
npm run test:01

# 4. Esperar a terminar (~2-3 minutos)
# 5. Se abrirán los reportes automáticamente
```

---

## 🔄 SECUENCIA COMPLETA (CMD)

```cmd
# 1. Limpiar pantalla
cls

# 2. Limpiar Caso 01
cd "d:\SUNEDU\SELENIUM\playwrigth" && del registros-administrados.json reporte-administrados.html 2>nul

# 3. Ejecutar Caso 01
npm run test:01

# 4. Esperar a terminar (~2-3 minutos)
# 5. Se abrirán los reportes automáticamente
```

---

## 🔄 SECUENCIA COMPLETA (Bash)

```bash
# 1. Limpiar pantalla
clear

# 2. Limpiar Caso 01
cd "d:\SUNEDU\SELENIUM\playwrigth" && rm registros-administrados.json reporte-administrados.html 2>/dev/null

# 3. Ejecutar Caso 01
npm run test:01

# 4. Esperar a terminar (~2-3 minutos)
# 5. Se abrirán los reportes automáticamente
```

---

## ❌ ERRORES COMUNES

### Error: `&&` no válido en PowerShell
```
❌ INCORRECTO:
cd "d:\SUNEDU\SELENIUM\playwrigth" && del registros-administrados.json

✅ CORRECTO:
cd "d:\SUNEDU\SELENIUM\playwrigth"; del registros-administrados.json
```

### Error: `;` en CMD
```
❌ INCORRECTO:
cd "d:\..." ; del archivo.json

✅ CORRECTO:
cd "d:\..." && del archivo.json
```

### Error: `del` en Bash
```
❌ INCORRECTO:
del archivo.json

✅ CORRECTO:
rm archivo.json
```

---

## 💡 TIPS

1. **Si no sabes cuál terminal tienes**, mira el **símbolo al inicio**
2. **PowerShell es la más común** en VS Code moderno
3. **Si algo falla**, prueba con **CMD** (es más simple)
4. **Los archivos se eliminan silenciosamente** (sin confirmación)

---

## 🎯 RESUMEN FINAL

| Terminal | Comando Limpiar |
|----------|---|
| **PowerShell** | `cd "d:\SUNEDU\SELENIUM\playwrigth"; del registros-administrados.json, reporte-administrados.html -ErrorAction SilentlyContinue` |
| **CMD** | `cd "d:\SUNEDU\SELENIUM\playwrigth" && del registros-administrados.json reporte-administrados.html 2>nul` |
| **Bash** | `cd "d:\SUNEDU\SELENIUM\playwrigth" && rm registros-administrados.json reporte-administrados.html 2>/dev/null` |

---

**¿Cuál es tu terminal? Usa el comando de esa fila. ✅**
