## Ejecución de tests Playwright: Headless y Headed

### Capturas de pantalla
Por defecto, los scripts `npm run test:*` generan capturas en cada paso relevante. Para ejecuciones rápidas sin capturas usa los scripts `:fast`.

> **Headless por defecto**: todos los scripts ejecutan sin ventana visible. Para ver navegador, agrega `--headed`.

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
npm run test:05
npm run test:all
```

### Comandos con descripción (Chromium por defecto)


#### Casos individuales (sin paralelismo)
- `npm run test:01` — Caso 01 (Chromium, 1 worker, headless por defecto)
- `npm run test:02` — Caso 02 (Chromium, 1 worker, headless por defecto)
- `npm run test:03` — Caso 03 (Chromium, 1 worker, headless por defecto)
- `npm run test:04` — Caso 04 (Chromium, 1 worker, headless por defecto)
- `npm run test:05` — Caso 05 (Listar administrados, utilidad opcional)

#### Casos individuales con workers
- `npm run test:01:w2` / `npm run test:01:w4` — Caso 01 con 2/4 workers
- `npm run test:02:w2` / `npm run test:02:w4` — Caso 02 con 2/4 workers
- `npm run test:03:w2` / `npm run test:03:w4` — Caso 03 con 2/4 workers
- `npm run test:04:w2` / `npm run test:04:w4` — Caso 04 con 2/4 workers

Ejemplo con repeticiones:
- `npm run test:01:w4 -- --repeat-each=10` — Caso 01 con 4 workers y 10 repeticiones

#### Subconjuntos listos (sin paralelismo)
- `npm run test:123` — Casos 01 + 02 + 03 (Chromium)
- `npm run test:124` — Casos 01 + 02 + 04 (Chromium)
- `npm run test:134` — Casos 01 + 03 + 04 (Chromium)
- `npm run test:123:fast` — Igual sin capturas
- `npm run test:124:fast` — Igual sin capturas
- `npm run test:134:fast` — Igual sin capturas

#### Subconjuntos con workers
- `npm run test:123:w2` / `npm run test:123:w4`
- `npm run test:124:w2` / `npm run test:124:w4`
- `npm run test:134:w2` / `npm run test:134:w4`

#### Todos los casos (sin paralelismo)
- `npm run test:all` — Suite completa (Chromium, 1 worker, headless por defecto)

#### Paralelismo con workers (mismo equipo)
> **Workers** = paralelismo dentro de la misma PC (división automática por tests).
- `npm run test:all:w2` — Suite completa con 2 workers (Chromium, headless por defecto)
- `npm run test:all:w4` — Suite completa con 4 workers (Chromium, headless por defecto)

**¿Qué ejecuta `npm run test:all:w2`?**
- Ejecuta **todas las pruebas** en Chromium con **2 workers** (paralelo).

#### Shards (dividir la suite en partes)
> **Shards** = dividir la suite en partes y ejecutar cada parte por separado.
- `npm run test:all:shard-1of2` — Parte 1 de 2 (Chromium, headless por defecto)
- `npm run test:all:shard-2of2` — Parte 2 de 2 (Chromium, headless por defecto)
- `npm run test:all:shard-1of2:fast` — Parte 1 de 2 sin capturas
- `npm run test:all:shard-2of2:fast` — Parte 2 de 2 sin capturas
- `npm run test:all:shard-1of4` — Parte 1 de 4 (Chromium, headless por defecto)
- `npm run test:all:shard-2of4` — Parte 2 de 4 (Chromium, headless por defecto)
- `npm run test:all:shard-3of4` — Parte 3 de 4 (Chromium, headless por defecto)
- `npm run test:all:shard-4of4` — Parte 4 de 4 (Chromium, headless por defecto)
- `npm run test:all:shard-1of4:fast` — Parte 1 de 4 sin capturas
- `npm run test:all:shard-2of4:fast` — Parte 2 de 4 sin capturas
- `npm run test:all:shard-3of4:fast` — Parte 3 de 4 sin capturas
- `npm run test:all:shard-4of4:fast` — Parte 4 de 4 sin capturas

#### Multinavegador (Chromium + Firefox)
- `npm run test:all:cf` — Suite completa en Chromium y Firefox (headless por defecto)
- `npm run test:all:cf:fast` — Igual que arriba, sin capturas
- `npm run test:all:cf:w2` — Chromium + Firefox con 2 workers
- `npm run test:all:cf:w4` — Chromium + Firefox con 4 workers
- `npm run test:all:cf:w2:fast` — Chromium + Firefox, 2 workers, sin capturas
- `npm run test:all:cf:w4:fast` — Chromium + Firefox, 4 workers, sin capturas

#### Workers + Shards (combinación)
Si necesitas **shards** y además **workers**, se combinan agregando `--workers=N` a un shard.
Ejemplo conceptual: `npm run test:all:shard-1of2 -- --workers=2`.
Si quieres scripts fijos con combinación, los agrego.

---

## ✅ Guía profesional (cuándo usar workers, shards o ambos)

### ✅ Workers (mismo equipo)
**Úsalo cuando:**
- Estás en una sola PC y quieres reducir tiempo total.
- Los casos son estables y no compiten por los mismos registros/recursos.

**Beneficios:**
- Acelera en una sola máquina.
- No requiere infraestructura adicional.

### ✅ Shards (ejecución por partes)
**Úsalo cuando:**
- Quieres repartir la suite en varias ejecuciones separadas.
- Tienes CI con varias máquinas o quieres correr partes por separado.

**Beneficios:**
- Divide la suite en “partes” independientes.
- Útil para suites grandes o cuando se desea aislar fallos.

### ✅ Workers + Shards (combinación)
**Úsalo cuando:**
- Tienes varias máquinas (shards) y quieres paralelismo dentro de cada una (workers).

**Beneficios:**
- Máxima velocidad en CI distribuido.

---

## ✅ ¿Qué significa “ejecutar por partes” (shards)?
Significa **dividir la suite completa** en partes automáticas. Cada shard ejecuta **solo una porción** de todos los tests.

Ejemplo con 2 shards:
- Shard 1/2 ejecuta una parte de los tests.
- Shard 2/2 ejecuta el resto.

No es “por caso” fijo, sino **por distribución interna de tests**. Si quieres “por caso”, usa selección explícita (ver abajo).

---

## ✅ Ejecutar solo algunos casos (1,2,4 o 1,2,3)

### Opción A: Comandos directos (recomendado)
```
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts tests/casos-prueba/02-registrar-sancion.spec.ts tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts --project=chromium
```

### Opción B: Con scripts existentes + argumentos extra
```
npm run test:01 -- --project=chromium
npm run test:02 -- --project=chromium
npm run test:04 -- --project=chromium
```

### Opción C: Subconjunto con shards
```
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts tests/casos-prueba/02-registrar-sancion.spec.ts tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts --project=chromium --shard=1/2
npx playwright test tests/casos-prueba/01-agregar-administrado.spec.ts tests/casos-prueba/02-registrar-sancion.spec.ts tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts --project=chromium --shard=2/2
```

---

## ✅ Ejecutar en Chromium o en Chromium + Firefox

### Chromium (default)
```
npm run test:01
npm run test:all
```

### Chromium + Firefox (suite completa)
```
npm run test:all:cf
```

### Chromium + Firefox (caso individual)
```
npm run test:01 -- --project=chromium --project=firefox
```

**¿Se balancea la carga?**
- No. Ejecutar en 2 navegadores **duplica** el trabajo.
- No es lo mismo que usar un solo navegador: se ejecuta la **misma suite** en cada navegador.

**Cuándo usarlo:**
- Validación final o regresión.
- Cuando el sistema debe soportar múltiples navegadores.

---

## ✅ Docker vs paralelismo en Playwright

**Docker no acelera** por sí mismo; sirve para **estandarizar entornos** (CI y reproducibilidad).

En Playwright:
- **Paralelismo nativo** con workers/shards es lo más rápido en una PC o CI.
- Docker es útil si necesitas ambientes idénticos o ejecución en CI/CD.

En Selenium:
- Docker + Grid suele ser necesario para **distribuir** navegadores en múltiples nodos.
- En Playwright esto se resuelve más fácil con **workers/shards** y proyectos.

**Recomendación profesional (local):**
- Usar workers para acelerar.
- Usar shards solo si necesitas dividir la suite o en CI distribuido.
- Usar multibrowser solo para validación final.

---

## ✅ Matriz clara (navegador/capturas/paralelismo)

### Navegador visible vs no visible
- **Headless (sin ventana visible):** es el modo por defecto.
- **Headed (ventana visible):** agrega `--headed`.

### Capturas de pantalla
- **Con capturas:** scripts normales `npm run test:*`.
- **Sin capturas:** scripts `:fast`.

### Paralelismo
- **Sin paralelismo:** 1 worker (por defecto).
- **Con paralelismo:** usar `test:all:w2` o `test:all:w4`.

---

## ✅ Combinaciones típicas (con ejemplos claros)

### 1) Sin navegador visible + con capturas (por defecto)
- `npm run test:all`

### 2) Sin navegador visible + sin capturas
- `npm run test:all:fast`

### 3) Con navegador visible + con capturas
- `npm run test:all -- --headed`

### 4) Con navegador visible + sin capturas
- `npm run test:all:fast -- --headed`

### 5) Con paralelismo + con capturas
- `npm run test:all:w2`
- `npm run test:all:w4`

### 6) Con paralelismo + sin capturas
- `npm run test:all:w2 -- --headed` (visible, con workers)
- Para sin capturas en paralelo, usa `:fast` y agrega `-- --headed` si quieres visible.

---

## ✅ Combinaciones completas (casos, subconjuntos y suite)

### Patrón base (aplica a casos 01-04 y subconjuntos 123/124/134)
- **Headless + con capturas (default):** `npm run NOMBRE`
- **Headless + sin capturas:** `npm run NOMBRE:fast`
- **Headed + con capturas:** `npm run NOMBRE -- --headed`
- **Headed + sin capturas:** `npm run NOMBRE:fast -- --headed`

### Ejemplos solicitados
- Caso 02 + 4 workers (con navegador): `npm run test:02:w4 -- --headed`
- Subconjunto 1,2,3 + 4 workers (con navegador): `npm run test:123:w4 -- --headed`
- Subconjunto 1,2,4 + 4 workers (con navegador): `npm run test:124:w4 -- --headed`
- Suite completa + 4 workers (con navegador): `npm run test:all:w4 -- --headed`

---

## ✅ Casos individuales (patrón rápido de 4 combinaciones)

Reemplaza `CASO` por `test:01`, `test:02`, `test:03` o `test:04`.

- **Headless + con capturas (default):** `npm run CASO`
- **Headless + sin capturas:** `npm run CASO:fast`
- **Headed + con capturas:** `npm run CASO -- --headed`
- **Headed + sin capturas:** `npm run CASO:fast -- --headed`

Para usar workers en un caso individual, reemplaza `CASO` por `test:02:w4` (o `:w2`):
- **Headless + con capturas:** `npm run test:02:w4`
- **Headed + con capturas:** `npm run test:02:w4 -- --headed`
- **Headless + sin capturas:** `npm run test:02:fast -- --workers=4`
- **Headed + sin capturas:** `npm run test:02:fast -- --workers=4 --headed`

---

## ✅ Subconjuntos con sus 4 modos (navegador/capturas)

### Casos 1,2,3 (test:123)
- **Headless + con capturas (default):** `npm run test:123`
- **Headless + sin capturas:** `npm run test:123:fast`
- **Headed + con capturas:** `npm run test:123 -- --headed`
- **Headed + sin capturas:** `npm run test:123:fast -- --headed`

Con workers:
- `npm run test:123:w4`
- `npm run test:123:w4 -- --headed`

### Casos 1,2,4 (test:124)
- **Headless + con capturas (default):** `npm run test:124`
- **Headless + sin capturas:** `npm run test:124:fast`
- **Headed + con capturas:** `npm run test:124 -- --headed`
- **Headed + sin capturas:** `npm run test:124:fast -- --headed`

Con workers:
- `npm run test:124:w4`
- `npm run test:124:w4 -- --headed`

### Casos 1,3,4 (test:134)
- **Headless + con capturas (default):** `npm run test:134`
- **Headless + sin capturas:** `npm run test:134:fast`
- **Headed + con capturas:** `npm run test:134 -- --headed`
- **Headed + sin capturas:** `npm run test:134:fast -- --headed`

Con workers:
- `npm run test:134:w4`
- `npm run test:134:w4 -- --headed`

---

## ✅ Shards: ¿es solo CI? ¿genera capturas? ¿levanta navegador?

**Shards se usan mucho en CI**, pero **también funcionan local**.

**Capturas:**
- Se controlan igual que siempre: con `test:*` (capturas) o `:fast` (sin capturas).
- El shard **no cambia** si hay capturas o no.

**Navegador:**
- **Headless** por defecto (sí “ejecuta navegador”, solo que sin ventana visible).
- Con `--headed` sí se muestra la ventana.

**Ejemplo con shard + headless + capturas:**
- `npm run test:all:shard-1of2`

**Ejemplo con shard + headed + capturas:**
- `npm run test:all:shard-1of2 -- --headed`

**Shards + sin capturas:**
- `npm run test:all:shard-1of2:fast`
- `npm run test:all:shard-1of2:fast -- --headed`

---

## ✅ Multibrowser + paralelismo

Cuando usas Chromium + Firefox, **se ejecuta toda la suite en ambos navegadores**.
Si además usas workers, el paralelismo ocurre **dentro de cada navegador**.

Ejemplo:
- `npm run test:all:cf -- --workers=2`

**Conclusión:** sí “se levantan” ambos navegadores (en headless o headed según flags).

---

## ✅ Repeticiones (repeat-each) y navegador

`--repeat-each=10` **no cambia** si se ve el navegador.
- Sin `--headed` → headless (sin ventana visible).
- Con `--headed` → ventana visible.

**¿Cómo se reparte con workers?**
- `--repeat-each=10` significa **10 ejecuciones totales** del mismo test.
- Con `--workers=4`, esas 10 ejecuciones se **distribuyen entre los 4 workers**, **no se multiplican**.
- Resultado: **10 ejecuciones en total**, no 40.

**¿Cómo se reparte con shards?**
- Cada shard recibe una porción de tests; el `repeat-each` aplica a lo que ese shard ejecuta.

Ejemplo:
- `npm run test:01 -- --repeat-each=10` (headless)
- `npm run test:01 -- --repeat-each=10 --headed` (visible)

#### Repeticiones + workers (ejemplo Caso 02)
- **10 repeticiones + 4 workers:** `npm run test:02:w4 -- --repeat-each=10`
- **Con navegador visible:** `npm run test:02:w4 -- --repeat-each=10 --headed`
- **Sin capturas:** `npm run test:02:fast -- --workers=4 --repeat-each=10`
- **Sin capturas + visible:** `npm run test:02:fast -- --workers=4 --repeat-each=10 --headed`

---

## ✅ Ejemplos por caso con repeticiones (10 y 50)

### Caso 01
- **Headless + capturas (10):** `npm run test:01 -- --repeat-each=10`
- **Headless + capturas (50):** `npm run test:01 -- --repeat-each=50`
- **Headless + sin capturas (10):** `npm run test:01:fast -- --repeat-each=10`
- **Headless + sin capturas (50):** `npm run test:01:fast -- --repeat-each=50`
- **Headed + capturas (10):** `npm run test:01 -- --repeat-each=10 --headed`
- **Headed + capturas (50):** `npm run test:01 -- --repeat-each=50 --headed`
- **Headed + sin capturas (10):** `npm run test:01:fast -- --repeat-each=10 --headed`
- **Headed + sin capturas (50):** `npm run test:01:fast -- --repeat-each=50 --headed`

### Caso 02
- **Headless + capturas (10):** `npm run test:02 -- --repeat-each=10`
- **Headless + capturas (50):** `npm run test:02 -- --repeat-each=50`
- **Headless + sin capturas (10):** `npm run test:02:fast -- --repeat-each=10`
- **Headless + sin capturas (50):** `npm run test:02:fast -- --repeat-each=50`
- **Headed + capturas (10):** `npm run test:02 -- --repeat-each=10 --headed`
- **Headed + capturas (50):** `npm run test:02 -- --repeat-each=50 --headed`
- **Headed + sin capturas (10):** `npm run test:02:fast -- --repeat-each=10 --headed`
- **Headed + sin capturas (50):** `npm run test:02:fast -- --repeat-each=50 --headed`

### Caso 03
- **Headless + capturas (10):** `npm run test:03 -- --repeat-each=10`
- **Headless + capturas (50):** `npm run test:03 -- --repeat-each=50`
- **Headless + sin capturas (10):** `npm run test:03:fast -- --repeat-each=10`
- **Headless + sin capturas (50):** `npm run test:03:fast -- --repeat-each=50`
- **Headed + capturas (10):** `npm run test:03 -- --repeat-each=10 --headed`
- **Headed + capturas (50):** `npm run test:03 -- --repeat-each=50 --headed`
- **Headed + sin capturas (10):** `npm run test:03:fast -- --repeat-each=10 --headed`
- **Headed + sin capturas (50):** `npm run test:03:fast -- --repeat-each=50 --headed`

### Caso 04
- **Headless + capturas (10):** `npm run test:04 -- --repeat-each=10`
- **Headless + capturas (50):** `npm run test:04 -- --repeat-each=50`
- **Headless + sin capturas (10):** `npm run test:04:fast -- --repeat-each=10`
- **Headless + sin capturas (50):** `npm run test:04:fast -- --repeat-each=50`
- **Headed + capturas (10):** `npm run test:04 -- --repeat-each=10 --headed`
- **Headed + capturas (50):** `npm run test:04 -- --repeat-each=50 --headed`
- **Headed + sin capturas (10):** `npm run test:04:fast -- --repeat-each=10 --headed`
- **Headed + sin capturas (50):** `npm run test:04:fast -- --repeat-each=50 --headed`

### Caso 05 (requiere RUN_ADMIN_CHECK=1)
- **Headless + capturas (10):** `$env:RUN_ADMIN_CHECK='1'; npm run test:05 -- --repeat-each=10`
- **Headless + capturas (50):** `$env:RUN_ADMIN_CHECK='1'; npm run test:05 -- --repeat-each=50`
- **Headless + sin capturas (10):** `$env:RUN_ADMIN_CHECK='1'; npm run test:05:fast -- --repeat-each=10`
- **Headless + sin capturas (50):** `$env:RUN_ADMIN_CHECK='1'; npm run test:05:fast -- --repeat-each=50`
- **Headed + capturas (10):** `$env:RUN_ADMIN_CHECK='1'; npm run test:05 -- --repeat-each=10 --headed`
- **Headed + capturas (50):** `$env:RUN_ADMIN_CHECK='1'; npm run test:05 -- --repeat-each=50 --headed`
- **Headed + sin capturas (10):** `$env:RUN_ADMIN_CHECK='1'; npm run test:05:fast -- --repeat-each=10 --headed`
- **Headed + sin capturas (50):** `$env:RUN_ADMIN_CHECK='1'; npm run test:05:fast -- --repeat-each=50 --headed`

---

## ✅ Repeticiones (10 y 50) para subconjuntos

### Subconjunto 1,2,3 (test:123)
- **Headless + capturas (10):** `npm run test:123 -- --repeat-each=10`
- **Headless + capturas (50):** `npm run test:123 -- --repeat-each=50`
- **Headless + sin capturas (10):** `npm run test:123:fast -- --repeat-each=10`
- **Headless + sin capturas (50):** `npm run test:123:fast -- --repeat-each=50`
- **Headed + capturas (10):** `npm run test:123 -- --repeat-each=10 --headed`
- **Headed + capturas (50):** `npm run test:123 -- --repeat-each=50 --headed`
- **Headed + sin capturas (10):** `npm run test:123:fast -- --repeat-each=10 --headed`
- **Headed + sin capturas (50):** `npm run test:123:fast -- --repeat-each=50 --headed`

### Subconjunto 1,2,4 (test:124)
- **Headless + capturas (10):** `npm run test:124 -- --repeat-each=10`
- **Headless + capturas (50):** `npm run test:124 -- --repeat-each=50`
- **Headless + sin capturas (10):** `npm run test:124:fast -- --repeat-each=10`
- **Headless + sin capturas (50):** `npm run test:124:fast -- --repeat-each=50`
- **Headed + capturas (10):** `npm run test:124 -- --repeat-each=10 --headed`
- **Headed + capturas (50):** `npm run test:124 -- --repeat-each=50 --headed`
- **Headed + sin capturas (10):** `npm run test:124:fast -- --repeat-each=10 --headed`
- **Headed + sin capturas (50):** `npm run test:124:fast -- --repeat-each=50 --headed`

### Subconjunto 1,3,4 (test:134)
- **Headless + capturas (10):** `npm run test:134 -- --repeat-each=10`
- **Headless + capturas (50):** `npm run test:134 -- --repeat-each=50`
- **Headless + sin capturas (10):** `npm run test:134:fast -- --repeat-each=10`
- **Headless + sin capturas (50):** `npm run test:134:fast -- --repeat-each=50`
- **Headed + capturas (10):** `npm run test:134 -- --repeat-each=10 --headed`
- **Headed + capturas (50):** `npm run test:134 -- --repeat-each=50 --headed`
- **Headed + sin capturas (10):** `npm run test:134:fast -- --repeat-each=10 --headed`
- **Headed + sin capturas (50):** `npm run test:134:fast -- --repeat-each=50 --headed`

---

## ✅ Repeticiones (10 y 50) para suite completa (test:all)

- **Headless + capturas (10):** `npm run test:all -- --repeat-each=10`
- **Headless + capturas (50):** `npm run test:all -- --repeat-each=50`
- **Headless + sin capturas (10):** `npm run test:all:fast -- --repeat-each=10`
- **Headless + sin capturas (50):** `npm run test:all:fast -- --repeat-each=50`
- **Headed + capturas (10):** `npm run test:all -- --repeat-each=10 --headed`
- **Headed + capturas (50):** `npm run test:all -- --repeat-each=50 --headed`
- **Headed + sin capturas (10):** `npm run test:all:fast -- --repeat-each=10 --headed`
- **Headed + sin capturas (50):** `npm run test:all:fast -- --repeat-each=50 --headed`

---

## ✅ Repeticiones (10 y 50) para shards (ejemplo 1/2)

- **Headless + capturas (10):** `npm run test:all:shard-1of2 -- --repeat-each=10`
- **Headless + capturas (50):** `npm run test:all:shard-1of2 -- --repeat-each=50`
- **Headless + sin capturas (10):** `npm run test:all:shard-1of2:fast -- --repeat-each=10`
- **Headless + sin capturas (50):** `npm run test:all:shard-1of2:fast -- --repeat-each=50`
- **Headed + capturas (10):** `npm run test:all:shard-1of2 -- --repeat-each=10 --headed`
- **Headed + capturas (50):** `npm run test:all:shard-1of2 -- --repeat-each=50 --headed`
- **Headed + sin capturas (10):** `npm run test:all:shard-1of2:fast -- --repeat-each=10 --headed`
- **Headed + sin capturas (50):** `npm run test:all:shard-1of2:fast -- --repeat-each=50 --headed`

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

---

## ✅ Caso 05 (utilidad) - listar RUC y razón social

Este caso **no es un flujo funcional**; sirve para **leer el módulo Administrado** y generar un listado actualizado para evitar duplicados en Caso 01.

**Comportamiento:**
- Está **desactivado por defecto**.
- Se ejecuta solo si defines `RUN_ADMIN_CHECK=1`.
- Genera `reportes/administrados-registrados.json`.

**Edición opcional (sin guardar):**
- Si defines `EDIT_ADMINISTRADO=1`, abre el formulario de edición de la primera fila y valida que los campos estén habilitados.

**Guardar opcional (modo prueba):**
- Si defines `SAVE_ADMINISTRADO=1`, intentará guardar los cambios.
