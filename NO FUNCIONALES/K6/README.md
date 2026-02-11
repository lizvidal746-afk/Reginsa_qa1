# Pruebas de Rendimiento K6

Esta carpeta contiene los scripts de pruebas de rendimiento (NO FUNCIONALES) para los casos:
- Caso 1: Guardar Administrado
- Caso 2: Registrar Sanción

## Estructura
- `caso1-guardar-administrado.js`: Script K6 para el flujo de guardar administrado.
- `caso2-registrar-sancion.js`: Script K6 para el flujo de registrar sanción.
- `administrados.json`: Datos de administrados para pruebas masivas.
- `docker-compose.yml`: Plantilla para ejecutar K6 en Docker.

## Cómo usar
1. Exporta los datos de administrados desde Excel/JSON a `administrados.json`.
2. Ajusta los endpoints y payloads en los scripts según tu API.
3. Ejecuta las pruebas con K6 local o Docker.

## Ejemplo de ejecución
```bash
# Local
k6 run caso1-guardar-administrado.js
k6 run caso2-registrar-sancion.js

# Docker
# (ver docker-compose.yml)
```

## Notas
- Estos scripts no afectan las pruebas funcionales Playwright.
- Puedes ajustar la concurrencia, duración y datos según tus necesidades.
