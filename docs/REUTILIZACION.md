# ♻️ Reutilización y puntos modificables

## ✅ Acciones reutilizables (helpers)

Estas funciones centralizan el comportamiento común y se usan en múltiples casos:

| Helper | Descripción | Ubicación |
|---|---|---|
| `iniciarSesionYNavegar()` | Login + navegación al módulo en una sola llamada | [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L20) |
| `abrirFormularioNuevoAdministrado()` | Abre el formulario de nuevo administrado | [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L236) |
| `abrirFormularioRegistrarSancion()` | Abre el formulario de registrar sanción | [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L251) |
| `obtenerAdministradoAleatorio()` | Selección aleatoria de administrado (PrimeNG) | [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L294) |
| `completarCabeceraReconsideracion()` | Completa cabecera (archivo, número, fecha) | [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L174) |
| `generarFechaPonderada()` | Fecha aleatoria ponderada por año | [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L140) |
| `capturarFormularioLleno()` | Captura de formulario antes de guardar | [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L511) |
| `capturarToastExito()` | Captura del toast de éxito | [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L527) |
| `capturarPantallaMejorada()` | Screenshot con metadatos (caso/paso/refs) | [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L492) |
| `capturarPantalla()` | Screenshot simple (fallback) | [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L439) |
| `generarRUC()` | RUC aleatorio de 11 dígitos | [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L553) |

> Nota: el flujo de cada caso está documentado en las anotaciones al inicio de cada test.

---

## ⚙️ Parámetros modificables (usuarios, tiempos, condiciones)

**Global (credenciales):**
- URL/usuario/contraseña: [tests/utilidades/reginsa-actions.ts](tests/utilidades/reginsa-actions.ts#L9-L12)

**Caso 01 (Administrado):**
- Prefijos/Sufijos de razón social: [tests/casos-prueba/01-agregar-administrado.spec.ts](tests/casos-prueba/01-agregar-administrado.spec.ts#L36-L37)
- Reintentos por RUC duplicado: [tests/casos-prueba/01-agregar-administrado.spec.ts](tests/casos-prueba/01-agregar-administrado.spec.ts#L104)

**Caso 02 (Sanciones):**
- Timeout general del test: [tests/casos-prueba/02-registrar-sancion.spec.ts](tests/casos-prueba/02-registrar-sancion.spec.ts#L33)
- Distribución de años para fecha de resolución: [tests/casos-prueba/02-registrar-sancion.spec.ts](tests/casos-prueba/02-registrar-sancion.spec.ts#L81-L85)
- PDF adjunto: [tests/casos-prueba/02-registrar-sancion.spec.ts](tests/casos-prueba/02-registrar-sancion.spec.ts#L134)
- Cantidad de medidas correctivas: [tests/casos-prueba/02-registrar-sancion.spec.ts](tests/casos-prueba/02-registrar-sancion.spec.ts#L147)
- Lista/cantidad de sanciones: [tests/casos-prueba/02-registrar-sancion.spec.ts](tests/casos-prueba/02-registrar-sancion.spec.ts#L184-L189)

**Caso 03 (Reconsideración sin sanciones):**
- Timeout general del test: [tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts](tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts#L25)
- PDF adjunto: [tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts](tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts#L120)

**Caso 04 (Reconsideración con sanciones):**
- Timeout general del test: [tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts](tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts#L25)
- Máximo de páginas a recorrer: [tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts](tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts#L48)
- PDF adjunto: [tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts](tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts#L140)
- Máximo de registros a editar: [tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts](tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts#L187)

---

## 🧭 Dónde ver el flujo de cada caso

- Caso 01: [tests/casos-prueba/01-agregar-administrado.spec.ts](tests/casos-prueba/01-agregar-administrado.spec.ts)
- Caso 02: [tests/casos-prueba/02-registrar-sancion.spec.ts](tests/casos-prueba/02-registrar-sancion.spec.ts)
- Caso 03: [tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts](tests/casos-prueba/03-reconsiderar-sin-sanciones.spec.ts)
- Caso 04: [tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts](tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts)
