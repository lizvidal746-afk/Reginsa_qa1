# ðŸ§¹ GUÃA COMPLETA: Limpiar y Ejecutar Tests

## ðŸŽ¯ SituaciÃ³n Actual

Viste en Allure tests antiguos que ya no existen. Eso ocurre porque:
- âŒ Los directorios de datos NO se limpian automÃ¡ticamente
- âŒ Allure mantiene histÃ³rico de ejecuciones antiguas
- âŒ Screenshots viejos quedan en carpeta

---

## ðŸš€ SOLUCIÃ“N: Limpiar + Ejecutar

### OpciÃ³n 1ï¸âƒ£ - Limpiar + Caso 02 (RECOMENDADO)

**Haz doble clic en:**
```
D:\SUNEDU\SELENIUM\playwrigth\limpiar-y-ejecutar-caso-02.bat
```

**QuÃ© hace:**
1. ðŸ§¹ Elimina directorio `allure-results` (limpia histÃ³rico)
2. ðŸ§¹ Elimina directorio `playwright-report`
3. ðŸ§¹ Elimina directorio `screenshots`
4. ðŸ§¹ Elimina directorio `test-results`
5. ðŸ§¹ Elimina JSON/HTML de administrados
6. âœ… Ejecuta Caso 02
7. ðŸ”„ Abre Playwright Report (limpio)
8. ðŸ”„ Abre Allure Report (solo muestra Caso 02)

**Resultado en Allure:**
```
chromium
â””â”€â”€ casos-prueba/02-registrar-sancion.spec.ts âœ…
```

---

### OpciÃ³n 2ï¸âƒ£ - Limpiar + TODOS los Casos

**Haz doble clic en:**
```
D:\SUNEDU\SELENIUM\playwrigth\limpiar-y-ejecutar-todos.bat
```

**QuÃ© hace:**
1. ðŸ§¹ Limpia TODO igual que OpciÃ³n 1
2. âœ… Ejecuta Caso 01 + Caso 02 en orden
3. ðŸ”„ Abre ambos reportes (ahora con 2 tests limpios)

**Resultado en Allure:**
```
chromium
â”œâ”€â”€ casos-prueba/01-agregar-administrado.spec.ts âœ…
â””â”€â”€ casos-prueba/02-registrar-sancion.spec.ts âœ…
```

---

### OpciÃ³n 3ï¸âƒ£ - Limpiar solo (sin ejecutar)

**Haz doble clic en:**
```
D:\SUNEDU\SELENIUM\playwrigth\limpiar-datos.bat
```

**QuÃ© hace:**
- ðŸ§¹ Limpia todos los directorios
- â¹ï¸ NO ejecuta tests
- Ãštil si quieres limpiar y luego ejecutar manualmente

---

## ðŸ“Š ComparaciÃ³n: Antes vs DespuÃ©s

### âŒ ANTES (Datos sucios)
```
Allure muestra:
â”œâ”€â”€ 01-agregar-administrado.spec.ts          âœ…
â”œâ”€â”€ 02-registrar-sancion.spec.ts             âœ…
â”œâ”€â”€ casos-prueba/02-caso-prueba-siguiente    â“ Â¿De dÃ³nde?
â”œâ”€â”€ debug-dropdown.spec.ts                   â“ Â¿QuÃ© es?
â””â”€â”€ test-admin-registro.spec.ts              â“ Antiguo
```

### âœ… DESPUÃ‰S (Datos limpios)
```
Allure muestra:
â”œâ”€â”€ 01-agregar-administrado.spec.ts âœ…
â””â”€â”€ 02-registrar-sancion.spec.ts    âœ…
```

---

## ðŸ”„ Nombres de Screenshots (MEJORADO)

### Antes
```
02-REGISTRAR_SANCION_01-SANCION_LLENA_RUC_12345678901_Perfumerias_unidas_2026-01-20T10-30-45-123Z.png
```

### DespuÃ©s (Simplificado)
```
02-REGISTRAR_SANCION_01-SANCION_LLENA_2026-01-20T10-30-45-123Z.png
```

**Cambios:**
- âŒ Eliminado: RUC
- âŒ Eliminado: RazÃ³n Social
- âœ… Mantenido: Caso, Paso, Timestamp (lo importante)

---

## ðŸ“ QuÃ© hacer AHORA

### 1ï¸âƒ£ Limpiar y ejecutar Caso 02
```
D:\SUNEDU\SELENIUM\playwrigth\limpiar-y-ejecutar-caso-02.bat
```
Doble clic â†’ Se limpian datos â†’ Se ejecuta Caso 02 â†’ Se abren reportes limpios

### 2ï¸âƒ£ Revisar Allure
```
http://localhost:4050
```
VerÃ¡s solo: **Caso 01 y Caso 02** (sin basura antigua)

### 3ï¸âƒ£ Si necesitas mÃ¡s tests
- Copia template de Caso 02
- Crea Caso 03, 04, 05
- Ejecuta: `limpiar-y-ejecutar-todos.bat`
- Allure mostrarÃ¡: 01, 02, 03, 04, 05 (limpios)

---

## ðŸŽ¯ Workflow Recomendado

```
Trabaja en Caso 03
    â†“
Quieres probar
    â†“
Doble clic: limpiar-y-ejecutar-todos.bat
    â†“
Se limpian datos + se ejecutan todos
    â†“
Allure muestra solo los que existen (01, 02, 03)
    â†“
Sin confusiÃ³n, sin datos viejos
```

---

## ðŸš¨ Â¿QuÃ© se elimina?

| Directorio | Contenido | Impacto |
|-----------|-----------|--------|
| `allure-results/` | Datos crudos de Allure | Nuevo histÃ³rico limpio |
| `allure-report/` | HTML generado de Allure | Se regenera al ejecutar |
| `playwright-report/` | HTML de Playwright | Se regenera al ejecutar |
| `screenshots/` | Capturas de tests | Nuevas screenshots |
| `test-results/` | Datos de ejecuciÃ³n | Nuevos datos |
| `registros-administrados.json` | Datos Caso 01 | Se recrea si Caso 01 ejecuta |
| `reporte-administrados.html` | Reporte Caso 01 | Se recrea si lo generas |

---

## ðŸ’¡ Ventajas

âœ… **Reportes limpios** - Solo lo que existe ahora  
âœ… **Sin confusiÃ³n** - No ves datos de tests antiguos  
âœ… **HistÃ³rico fresco** - Empieza desde 0  
âœ… **Allure honesto** - Muestra solo tests actuales  
âœ… **Screenshots ordenados** - Nombres simples y legibles  

---

## ðŸ“Œ PrÃ³xima vez que ejecutes

Simplemente:
```
limpiar-y-ejecutar-caso-02.bat
```

O si tienes Caso 03, 04, 05:
```
limpiar-y-ejecutar-todos.bat
```

**Eso es todo. Los reportes siempre estarÃ¡n limpios.** âœ…

---

**Ãšltima actualizaciÃ³n:** Enero 20, 2026


