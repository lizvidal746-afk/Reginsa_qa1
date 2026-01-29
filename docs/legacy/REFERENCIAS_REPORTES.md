# ðŸŽ¯ REFERENCIAS RÃPIDAS PARA REPORTES AUTOMÃTICOS

## ðŸ“Œ Accesos directos Windows

**Ejecutar con reportes automÃ¡ticos - 3 opciones:**

```
1ï¸âƒ£ Doble clic en:
   D:\SUNEDU\SELENIUM\playwrigth\ejecutar-caso-02.bat

2ï¸âƒ£ O en Terminal:
   cd D:\SUNEDU\SELENIUM\playwrigth
   npm run test:02

3ï¸âƒ£ O en PowerShell:
   cd "D:\SUNEDU\SELENIUM\playwrigth"
   npm run test:02
```

---

## ðŸ“Š QuÃ© verÃ¡s

| Paso | Tiempo | AcciÃ³n |
|------|--------|--------|
| 1 | 0s | Browser abre y comienza Caso 02 |
| 2 | 46s | Caso 02 termina exitosamente âœ… |
| 3 | 48s | Playwright Report se abre automÃ¡ticamente |
| 4 | 50s | Allure Report se abre automÃ¡ticamente |
| 5 | 50s+ | Tienes ambos reportes para revisar |

---

## ðŸ”— URLs de los reportes

```
Playwright: http://localhost:9323
Allure:     http://localhost:4050
```

---

## ðŸ“ Archivos relevantes

| Archivo | PropÃ³sito |
|---------|-----------|
| `package.json` | Scripts npm (test:02, reports:open) |
| `ejecutar-caso-02.bat` | Batch file para click directo |
| `AUTOMATIZACION_REPORTES.md` | DocumentaciÃ³n completa |
| `REPORTES_AUTOMATICOS.md` | Detalles tÃ©cnicos |
| `INICIO_RAPIDO.md` | GuÃ­a rÃ¡pida |

---

## âš¡ Un comando para todo

```bash
npm run test:02
```

**Eso es todo. Los reportes se abren solos.**

---

## ðŸ†˜ Si algo no funciona

```bash
# Verificar Allure instalado
allure --version

# Si no estÃ¡, instalar
npm install -g allure-commandline

# Verificar puerto 4050 disponible
netstat -ano | findstr :4050

# Limpiar reportes antiguos
rm -r allure-report allure-results
```

---

**Creado:** Enero 20, 2026 | **Status:** âœ… Listo para usar


