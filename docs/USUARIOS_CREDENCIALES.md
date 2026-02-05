# 👥 Usuarios y credenciales (REGINSA)

Este proyecto usa credenciales en **dos lugares**:

1) **Flujo principal de login** (tests)
2) **Global setup** (sesión reutilizable)

## ✅ Dónde cambiar usuarios y contraseñas

- **Flujo principal:** [tests/utilidades/reginsa-actions.ts](../tests/utilidades/reginsa-actions.ts)
- **Global setup:** [tests/global-setup.js](../tests/global-setup.js)

En ambos archivos existe un arreglo `usuarios` con:
- `lizvidal / QA1234510qa`
- `anahuaman / QA1234512qa`

Si cambian las credenciales, edita esos valores.

## ✅ Variables de entorno (recomendado)

Puedes evitar tocar el código usando:

- `REGINSA_USER`
- `REGINSA_PASS`

Si están definidos, se usan esas credenciales.

## ✅ Ejemplo (PowerShell)

```powershell
$env:REGINSA_USER = 'anahuaman'
$env:REGINSA_PASS = 'QA1234512qa'
```

> Luego ejecuta tu comando normal de tests.
