## Ejecución de tests Playwright: Headless y Headed

### 1. Ejecutar en modo headless (sin abrir navegador, más rápido)

Por defecto, los siguientes comandos ejecutan los tests en modo headless:

```
npm run test:01
npm run test:02
npm run test:03
npm run test:04
npm run test:all
```

### 2. Ejecutar en modo headed (mostrando el navegador)

Agrega el flag `--headed` al final del comando:

```
npm run test:01 -- --headed
npm run test:02 -- --headed
npm run test:all -- --headed
```

### 3. Ejecutar múltiples repeticiones de un caso (estrés)

Agrega el flag `--repeat-each=N` (por ejemplo, 10 repeticiones):

```
npm run test:01 -- --repeat-each=10
npm run test:all -- --repeat-each=10
```

### 4. Saltar capturas de pantalla para acelerar

Agrega la variable de entorno `SKIP_SCREENSHOTS=1`:

**Windows (PowerShell):**
```
$env:SKIP_SCREENSHOTS=1; npm run test:01
```

**Windows (CMD):**
```
set SKIP_SCREENSHOTS=1 && npm run test:01
```

Puedes combinar con los otros flags:
```
$env:SKIP_SCREENSHOTS=1; npm run test:all -- --repeat-each=10 --headed
```

---
**Resumen:**
- Headless (rápido, sin navegador): `npm run test:01`
- Headed (ver navegador): `npm run test:01 -- --headed`
- Repetir N veces: `npm run test:01 -- --repeat-each=10`
- Saltar capturas: `SKIP_SCREENSHOTS=1 npm run test:01`