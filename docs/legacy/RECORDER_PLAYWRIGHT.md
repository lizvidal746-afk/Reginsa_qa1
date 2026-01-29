# ðŸŽ¬ CREAR CASOS DE PRUEBA CON PLAYWRIGHT RECORDER

## âš¡ COMANDO RÃPIDO

```powershell
npx playwright codegen --output tests/test-3.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

---

## ðŸ“‹ TODOS LOS CASOS

### Caso 01 (Agregar Administrado):
```powershell
npx playwright codegen --output tests/casos-prueba/01-agregar-administrado.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

### Caso 02 (Registrar SanciÃ³n):
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

## ðŸŽ¯ PASOS PARA USAR RECORDER

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
   - Navega a **Infractor y SanciÃ³n**
   - Ejecuta todas las acciones del caso de prueba

5. **El Inspector grabarÃ¡ todo** en tiempo real

6. **Cuando termines:**
   - Cierra el Inspector
   - El archivo `.spec.ts` se crea automÃ¡ticamente âœ…

---

## ðŸ“ ESTRUCTURA DEL COMANDO

```
npx playwright codegen --output <RUTA_ARCHIVO> <URL>
```

| ParÃ¡metro | DescripciÃ³n |
|-----------|-------------|
| `npx playwright codegen` | Abre el Recorder |
| `--output` | Especifica dÃ³nde guardar el archivo |
| `<RUTA_ARCHIVO>` | Ruta donde se crea el `.spec.ts` |
| `<URL>` | URL donde comienza la grabaciÃ³n |

---

## ðŸŽ¥ OPCIONES AVANZADAS

### Grabar con mÃ¡s detalles:
```powershell
npx playwright codegen --target playwright/typescript --output tests/test-3.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

### Sin guardar automÃ¡ticamente (solo mostrar cÃ³digo):
```powershell
npx playwright codegen https://reginsaqa.sunedu.gob.pe/#/home
```

---

## ðŸ“‚ UBICACIONES DE ARCHIVOS

| Caso | UbicaciÃ³n | Comando |
|------|-----------|---------|
| 01 | `tests/casos-prueba/01-agregar-administrado.spec.ts` | `npx playwright codegen --output tests/casos-prueba/01-agregar-administrado.spec.ts https://...` |
| 02 | `tests/casos-prueba/02-registrar-sancion.spec.ts` | `npx playwright codegen --output tests/casos-prueba/02-registrar-sancion.spec.ts https://...` |
| 03 | `tests/test-3.spec.ts` | `npx playwright codegen --output tests/test-3.spec.ts https://...` |
| 04 | `tests/test-4.spec.ts` | `npx playwright codegen --output tests/test-4.spec.ts https://...` |
| 05 | `tests/test-5.spec.ts` | `npx playwright codegen --output tests/test-5.spec.ts https://...` |

---

## ðŸ’¡ TIPS

âœ… **El Recorder crea el archivo automÃ¡ticamente** - No necesitas crear el `.spec.ts` manualmente

âœ… **Puedes editar despuÃ©s** - El cÃ³digo generado es TypeScript normal, puedes mejorarlo

âœ… **Usa selectores robustos** - El Recorder intenta usar selectores estables (role, text)

âœ… **Agrega logs despuÃ©s** - Puedes agregar `console.log()` para documentar pasos

---

## ðŸ”— REFERENCIA RÃPIDA

**Para Caso 03 (copia y pega directo):**
```powershell
npx playwright codegen --output tests/test-3.spec.ts https://reginsaqa.sunedu.gob.pe/#/home
```

**Credenciales:**
- Usuario: `lizvidal`
- ContraseÃ±a: `QA1234510qa`

---

**Â¡Listo! Usa estos comandos para crear tus casos de prueba.** âœ…


