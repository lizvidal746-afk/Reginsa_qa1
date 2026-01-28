# 🏗️ Arquitectura de reutilización de código

## 🎯 Objetivo
Mantener un único flujo compartido y helpers reutilizables para todos los casos del módulo **Infractor y Sanción**, evitando duplicidad.

---

## 🧱 Estructura actual

```
tests/
├── casos-prueba/
│   ├── 01-agregar-administrado.spec.ts
│   ├── 02-registrar-sancion.spec.ts
│   ├── 03-reconsiderar-sin-sanciones.spec.ts
│   └── 04-reconsiderar-con-sanciones.spec.ts
│
└── utilidades/
    └── reginsa-actions.ts      ⭐ helpers reutilizables
```

---

## ♻️ Helpers reutilizados (núcleo)

Los casos reutilizan funciones centralizadas en [tests/utilidades/reginsa-actions.ts](../tests/utilidades/reginsa-actions.ts):

- `iniciarSesionYNavegar()` → Login + navegación al módulo.
- `abrirFormularioNuevoAdministrado()` → Formulario de administrado.
- `abrirFormularioRegistrarSancion()` → Formulario de sanción.
- `obtenerAdministradoAleatorio()` → Selección PrimeNG.
- `completarCabeceraReconsideracion()` → Archivo + número + fecha.
- `generarFechaPonderada()` → Fecha aleatoria con pesos por año.
- `capturarFormularioLleno()` / `capturarToastExito()` → Capturas estandarizadas.

> Ver detalles y puntos modificables en [REUTILIZACION.md](REUTILIZACION.md).

---

## 🧩 Extensiones recomendadas (VS Code)

Estas extensiones son parte de los requisitos del proyecto:

- **Playwright Test for VS Code** (`ms-playwright.playwright`)
  - Ejecución y depuración de tests desde VS Code.
- **ESLint** (`dbaeumer.vscode-eslint`)
  - Estándares de código y alertas rápidas.
- **Prettier** (`esbenp.prettier-vscode`)
  - Formato consistente.

---

## ✅ Estándares de flujo

- Cada caso incluye **comentarios de flujo** al inicio (1..N).
- Cada paso clave incluye **banners** `PASO X` para lectura rápida.
- Capturas usan etiquetas **FORMULARIO** y **EXITO**.

---

## 📌 Recomendaciones

- Cambios de usuario/URL/contraseña se realizan en `CREDENCIALES`.
- Fechas, cantidades y tiempos están documentados en [REUTILIZACION.md](REUTILIZACION.md).
- Evitar duplicar lógica: primero revisar helpers existentes.
