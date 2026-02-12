# PLAN POST-AUDITORÍA REGINSA

## 1. Brechas

- workers no parametrizado por entorno
- Ausencia de Dockerfile para ejecución estandarizada
- Posible exposición de sesiones en storageState.json
- Falta de carpeta dedicada para descargas
- headless no explícito en configuración

## 2. Objetivo arquitectónico

Alcanzar madurez institucional Nivel 4, asegurando ejecución estandarizada, segura y escalable en entornos DevSecOps.

## 3. Plan por fases

### Fase 1 – Estabilización

- Documentar y parametrizar workers y headless
- Revisar storageState.json y definir política de manejo seguro

### Fase 2 – Refactor estructural

- Crear carpeta dedicada para descargas
- Estandarizar rutas y convenciones de carpetas

### Fase 3 – Arquitectura limpia

- Implementar Dockerfile para ejecución local y CI
- Revisar y reforzar segregación de responsabilidades en helpers y tests

### Fase 4 – DevSecOps

- Integrar análisis de secretos y dependencias en pipeline
- Definir políticas de bloqueo de merge por fallos críticos

### Fase 5 – Escalabilidad institucional

- Automatizar provisión de entornos
- Documentar procesos para onboarding y escalado

## 4. Riesgos del refactor

- Interrupción temporal de pipelines
- Posible incompatibilidad de scripts existentes
- Necesidad de capacitación en nuevas herramientas

## 5. Impacto estimado

- Mejora de seguridad y trazabilidad
- Reducción de riesgos operativos
- Mayor facilidad de mantenimiento y escalado

## 6. Orden recomendado de ejecución

1. Parametrización de workers y headless
2. Política de manejo de storageState.json
3. Creación de carpeta descargas
4. Implementación de Dockerfile
5. Refuerzo de pipeline y políticas DevSecOps
6. Documentación y capacitación final
