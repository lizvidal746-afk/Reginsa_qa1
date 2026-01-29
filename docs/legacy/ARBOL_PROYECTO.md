# âš ï¸ Documento movido

Este archivo fue movido a [docs/ARBOL_PROYECTO.md](docs/ARBOL_PROYECTO.md).

# ðŸ“ Ãrbol del Proyecto - REGINSA (Actual)

```
D:\SUNEDU\SELENIUM\playwrigth/
â”‚
â”œâ”€â”€ README.md
â”œâ”€â”€ ARBOL_PROYECTO.md
â”œâ”€â”€ docs/
â”‚   â”œâ”€â”€ INDICE.md
â”‚   â”œâ”€â”€ GUIA_OPERATIVA.md
â”‚   â”œâ”€â”€ GLOSARIO_PLANTILLA.md
â”‚   â”œâ”€â”€ INSTALACION_Y_EJECUCION.md
â”‚   â”œâ”€â”€ CREAR_CASOS_MANUAL.md
â”‚   â””â”€â”€ CASOS_PRUEBA_ACTUALES.md
â”‚
â”œâ”€â”€ tests/
â”‚   â”œâ”€â”€ casos-prueba/
â”‚   â”‚   â”œâ”€â”€ 01-agregar-administrado.spec.ts
â”‚   â”‚   â”œâ”€â”€ 02-registrar-sancion.spec.ts
â”‚   â”‚   â”œâ”€â”€ 03-reconsiderar-sin-sanciones.spec.ts
â”‚   â”‚   â””â”€â”€ 04-reconsiderar-con-sanciones.spec.ts
â”‚   â””â”€â”€ utilidades/
â”‚       â””â”€â”€ reginsa-actions.ts
â”‚
â”œâ”€â”€ test-files/
â”‚   â””â”€â”€ GENERAL NÂ° 00001-2026-SUNEDU-SG-OTI.pdf
â”‚
â”œâ”€â”€ reportes/
â”‚   â””â”€â”€ registros-administrados.json
â”‚
â”œâ”€â”€ playwright.config.js
â”œâ”€â”€ package.json
â”œâ”€â”€ package-lock.json
â”œâ”€â”€ tsconfig.json
â”œâ”€â”€ .gitignore
â””â”€â”€ node_modules/
```

---

## ðŸš€ Rutas rÃ¡pidas

### â–¶ï¸ Ejecutar tests
```
npm run test:01
npm run test:02
npm run test:03
npm run test:04
npm run test:all
```

### ðŸ“Š Reportes
```
npm run reports:open
```

---

## âœ… DocumentaciÃ³n oficial
- [docs/INDICE.md](docs/INDICE.md)

---

## ðŸ”„ PRÃ“XIMAS ADICIONES

### Estructura Prevista
```
D:\SUNEDU\SELENIUM\playwrigth/
â”œâ”€â”€ tests/casos-prueba/
â”‚   â”œâ”€â”€ 03-editar-administrado.spec.ts        (PrÃ³ximo)
â”‚   â”œâ”€â”€ 04-eliminar-administrado.spec.ts      (Futuro)
â”‚   â””â”€â”€ 05-buscar-administrado.spec.ts        (Futuro)
â”‚
â”œâ”€â”€ utilidades/                               (PrÃ³ximo)
â”‚   â”œâ”€â”€ helpers.ts                            (Funciones comunes)
â”‚   â”œâ”€â”€ datos.ts                              (Data test)
â”‚   â””â”€â”€ selectores.ts                         (Selectores reutilizables)
â”‚
â””â”€â”€ ci-cd/                                    (PrÃ³ximo)
    â”œâ”€â”€ github-actions.yml
    â”œâ”€â”€ jenkins.yml
    â””â”€â”€ docker-compose.yml
```

---

## âœ… CHECKLIST DE INICIALIZACIÃ“N

- [x] Estructura de carpetas creada
- [x] Caso 01 implementado y probado
- [x] Reportes configurados
- [x] DocumentaciÃ³n completa
- [x] Scripts de automatizaciÃ³n
- [x] Template para Caso 02
- [ ] Caso 02 implementado (PrÃ³ximo)
- [ ] CI/CD configurado (Futuro)
- [ ] Dashboard en tiempo real (Futuro)

---

**Proyecto:** REGINSA SUNEDU Automation  
**VersiÃ³n:** 1.0.0  
**Fecha:** Enero 2026  
**Estructura:** Organizada y preparada para escalabilidad


