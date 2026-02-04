## Ejecución de tests Playwright: Headless y Headed

### Capturas de pantalla
Por defecto, los scripts `npm run test:*` generan capturas en cada paso relevante. Para ejecuciones rápidas sin capturas usa los scripts `:fast`.

### Optimización de velocidad y variedad
Las pruebas están optimizadas para máxima velocidad: se eliminaron todas las esperas fijas y solo se usan esperas inteligentes (waitFor, isVisible, etc). Si algún paso falla por falta de espera, afina solo ese caso.

#### Selección aleatoria en dropdowns
En los casos que agregan varios registros de detalle (por ejemplo, sanciones), los dropdowns seleccionan aleatoriamente entre las primeras 5 opciones, evitando repetir la misma opción en la misma ejecución (si hay 5 registros, cada uno usará una opción distinta). Si hay más de 5 registros, puede repetirse alguna opción.

Esto permite que los datos de prueba sean variados y robustos en cada corrida.

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

Usa los scripts rápidos `:fast`:

```
npm run test:01:fast
npm run test:02:fast
npm run test:03:fast
npm run test:04:fast
npm run test:all:fast
```

Con navegador:
```
npm run test:02:fast -- --headed
```

---
**Resumen:**
- Headless con capturas: `npm run test:01`
- Headed con capturas: `npm run test:01 -- --headed`
- Repetir N veces: `npm run test:01 -- --repeat-each=10`
- Sin capturas: `npm run test:01:fast`