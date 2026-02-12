# PROMPT MAESTRO – AUDITORÍA COMPLETA PROFESIONAL (GPT-4.1)

## CONTEXTO GENERAL

Proyecto abierto en el workspace actual: REGINSA
Tipo: Framework de Automatización con Playwright
Modelo: GPT-4.1
Objetivo: Ejecutar auditoría técnica profesional completa con documentación estructurada.

IMPORTANTE:
No modificar código fuente.
No refactorizar.
No generar tests nuevos.
Solo analizar, documentar y crear documentación técnica.

## ROL DEL AGENTE

Actúa como:

Senior QA Automation Architect
DevSecOps Consultant
Software Technical Auditor

Enfoque:
Objetivo, estructurado, verificable, institucional.

## OBJETIVO GLOBAL

1. Crear estructura documental profesional.
2. Generar metodología base reusable.
3. Auditar proyecto real paso a paso.
4. Generar documento de resultados con evidencia.
5. Generar plan post-auditoría.
6. Generar validación técnica de la auditoría.
7. Documentar todo con trazabilidad (ruta + línea).
8. No modificar ningún archivo del framework.

## FASE 0 – CREAR ESTRUCTURA DOCUMENTAL

Si no existen, crear:

docs/
docs/auditoria/
docs/auditoria/base/
docs/auditoria/resultados/
docs/auditoria/validacion/
docs/arquitectura/
docs/prompts/

No modificar otras carpetas.

## FASE 1 – CREAR DOCUMENTO BASE METODOLÓGICO

Crear archivo:

docs/auditoria/base/METODOLOGIA_AUDITORIA_QA_AUTOMATION.md

Debe incluir:

- Estructura
- Configuración
- Arquitectura de tests
- Seguridad
- Paralelismo
- Reportería
- DevOps
- Calidad de código

  - Static Code Review
  - Structural Analysis
  - Responsibility Segregation Review
  - Secrets Exposure Analysis
  - Concurrency Risk Analysis
  - DevOps Readiness Assessment
  - Maintainability Heuristics

Este documento es estándar reusable institucional.

## FASE 2 – AUDITORÍA REAL DEL PROYECTO

Analizar completamente:

Aplicar metodología base.

NO asumir información inexistente.
NO inventar líneas si no se pueden obtener.

## FASE 3 – GENERAR DOCUMENTO DE RESULTADOS

Crear:

docs/auditoria/resultados/AUDITORIA_TECNICA_REGINSA_YYYY-MM-DD.md

Estructura obligatoria:

## 1. Resumen Ejecutivo

## 2. Estructura del Proyecto

## 3. Configuración Playwright

Por cada hallazgo:

Archivo:
Ruta completa:
Línea:
Configuración encontrada:
Técnica aplicada:
Nivel de riesgo:
Justificación técnica:

Ejemplo de formato obligatorio:

Archivo: playwright.config.ts
Ruta: /playwright.config.ts
Línea: 27
Configuración: workers: 3
Técnica aplicada: Configuration Review
Riesgo: Medio
Justificación: No parametrizado por entorno.

## 4. Arquitectura de Tests

Identificar patrón real.
Indicar archivos específicos y líneas.

## 5. Manejo de Credenciales

Indicar si hay hardcoding.
Indicar archivo y línea.
Clasificar riesgo.

## 6. Paralelismo

Evaluar:

Indicar evidencia real.

## 7. Reportería

Indicar reporter configurado.
Indicar si existe Allure.
Indicar calidad de evidencia.

## 8. DevOps

Indicar si existen:

## 9. Deuda Técnica Clasificada

Separar:
Crítica
Alta
Media
Baja

## 10. Nivel de Madurez Final

Justificación técnica basada en evidencia real.

## FASE 4 – GENERAR PLAN POST-AUDITORÍA

Crear:

docs/arquitectura/PLAN_POST_AUDITORIA_REGINSA.md

Debe incluir:

## Brechas detectadas

## Objetivo arquitectónico

## Plan por fases: REGINSA

## Riesgos del refactor

## Impacto estimado

## Orden recomendado

Todo debe estar alineado con hallazgos reales.

## FASE 5 – VALIDACIÓN DE LA AUDITORÍA

Crear:

docs/auditoria/validacion/VALIDACION_AUDITORIA_REGINSA_YYYY-MM-DD.md

Debe evaluar:

1. Coherencia interna del documento de auditoría.
2. Si todas las afirmaciones tienen evidencia.
3. Si hay contradicciones.
4. Si la clasificación de riesgos es consistente.
5. Si el nivel de madurez está bien justificado.
6. Si el plan post-auditoría responde realmente a los hallazgos.
7. Si falta algún dominio por evaluar.

No repetir auditoría.
Evaluar consistencia del análisis.

## REGLAS IMPORTANTES

## EJECUCIÓN

Ejecutar todas las fases en orden.
No omitir ninguna.
Generar todos los documentos.

🎯 Resultado Final Cuando Lo Pegues

El agente debe generar automáticamente:

docs/auditoria/base/METODOLOGIA_AUDITORIA_QA_AUTOMATION.md
docs/auditoria/resultados/AUDITORIA_TECNICA_REGINSA_YYYY-MM-DD.md
docs/arquitectura/PLAN_POST_AUDITORIA_REGINSA.md
docs/auditoria/validacion/VALIDACION_AUDITORIA_REGINSA_YYYY-MM-DD.md
