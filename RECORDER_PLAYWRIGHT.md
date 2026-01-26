# 🎬 CREAR CASOS DE PRUEBA CON PLAYWRIGHT RECORDER

## ⚡ COMANDO RÁPIDO

```powershell
npx playwright codegen --output tests/test-3.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

---

## 📋 TODOS LOS CASOS

### Caso 01 (Agregar Administrado):
```powershell
npx playwright codegen --output tests/casos-prueba/01-agregar-administrado.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

### Caso 02 (Registrar Sanción):
```powershell
npx playwright codegen --output tests/casos-prueba/02-registrar-sancion.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

### Caso 03:
```powershell
npx playwright codegen --output tests/test-3.1.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

### Caso 04:
```powershell
npx playwright codegen --output tests/test-4.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

### Caso 05:
```powershell
npx playwright codegen --output tests/test-5.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

---

## 🎯 PASOS PARA USAR RECORDER

1. **Abre terminal** en VS Code (o PowerShell)
2. **Navega a la carpeta del proyecto:**
   ```powershell
   cd D:\SUNEDU\SELENIUM\playwrigth
   ```

3. **Ejecuta el comando** (ajustando el nombre del caso):
   ```powershell
   npx playwright codegen --output tests/test-3.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
   ```

4. **En el navegador que se abre:**
   - Realiza login: `lizvidal` / `QA1234510qa`
   - Navega a **Infractor y Sanción**
   - Ejecuta todas las acciones del caso de prueba

5. **El Inspector grabará todo** en tiempo real

6. **Cuando termines:**
   - Cierra el Inspector
   - El archivo `.spec.ts` se crea automáticamente ✅

---

## 📝 ESTRUCTURA DEL COMANDO

```
npx playwright codegen --output <RUTA_ARCHIVO> <URL>
```

| Parámetro | Descripción |
|-----------|-------------|
| `npx playwright codegen` | Abre el Recorder |
| `--output` | Especifica dónde guardar el archivo |
| `<RUTA_ARCHIVO>` | Ruta donde se crea el `.spec.ts` |
| `<URL>` | URL donde comienza la grabación |

---

## 🎥 OPCIONES AVANZADAS

### Grabar con más detalles:
```powershell
npx playwright codegen --target playwright/typescript --output tests/test-3.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

### Sin guardar automáticamente (solo mostrar código):
```powershell
npx playwright codegen https://reginsaqa.sunedu.gob.pe/#/home
```

---

## 📂 UBICACIONES DE ARCHIVOS

| Caso | Ubicación | Comando |
|------|-----------|---------|
| 01 | `tests/casos-prueba/01-agregar-administrado.spec.ts` | `npx playwright codegen --output tests/casos-prueba/01-agregar-administrado.spec.ts https://...` |
| 02 | `tests/casos-prueba/02-registrar-sancion.spec.ts` | `npx playwright codegen --output tests/casos-prueba/02-registrar-sancion.spec.ts https://...` |
| 03 | `tests/test-3.spec.ts` | `npx playwright codegen --output tests/test-3.spec.ts https://...` |
| 04 | `tests/test-4.spec.ts` | `npx playwright codegen --output tests/test-4.spec.ts https://...` |
| 05 | `tests/test-5.spec.ts` | `npx playwright codegen --output tests/test-5.spec.ts https://...` |

---

## 💡 TIPS

✅ **El Recorder crea el archivo automáticamente** - No necesitas crear el `.spec.ts` manualmente

✅ **Puedes editar después** - El código generado es TypeScript normal, puedes mejorarlo

✅ **Usa selectores robustos** - El Recorder intenta usar selectores estables (role, text)

✅ **Agrega logs después** - Puedes agregar `console.log()` para documentar pasos

---

## 🔗 REFERENCIA RÁPIDA

**Para Caso 03 (copia y pega directo):**
```powershell
npx playwright codegen --output tests/test-3.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

**Credenciales:**
- Usuario: `lizvidal`
- Contraseña: `QA1234510qa`

---

**¡Listo! Usa estos comandos para crear tus casos de prueba.** ✅
