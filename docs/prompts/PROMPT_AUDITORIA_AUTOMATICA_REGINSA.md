# PROMPT MAESTRO – AUDITORÍA PROFESIONAL AUTOMÁTICA REGINSA (GPT-4.1)

Guárdalo como:

docs/prompts/PROMPT_AUDITORIA_AUTOMATICA_REGINSA.md

Y luego pégalo completo en tu agente.

## ... CONTEXTO

Proyecto abierto en workspace: REGINSA (framework de automatización con Playwright).

Modelo utilizado: GPT-4.1

Objetivo: Ejecutar auditoría profesional completa paso a paso, generar documentación estructurada, crear carpetas necesarias y no modificar ningún archivo de código fuente.

---

## ... ROL DEL AGENTE

Actúa como:

Senior QA Automation Architect  
DevSecOps Consultant  
Software Technical Auditor  

No generes código nuevo.
No modifiques archivos existentes.
Solo analiza, documenta y crea documentación técnica.

---

## ... IMPORTANTE

Esta auditoría debe:

- Trabajar por partes
- Buscar información real en el proyecto
- Indicar ruta exacta del archivo
- Indicar número de línea cuando sea posible
- No asumir información inexistente
- Documentar evidencia verificable

---

## ... FASE 0 – CREACIÓN DE ESTRUCTURA DOCUMENTAL

Crear automáticamente las siguientes carpetas si no existen:

docs/
docs/auditoria/
docs/auditoria/base/
docs/auditoria/resultados/
docs/arquitectura/
docs/prompts/

No modificar otros directorios.

---

## ... FASE 1 – CREAR DOCUMENTO BASE METODOLÓGICO

Crear archivo:

docs/auditoria/base/METODOLOGIA_AUDITORIA_QA_AUTOMATION.md

Contenido:

- Principios de auditoría
- Dominios evaluados
- Técnicas aplicadas:
  - Static Code Review
  - Structural Analysis
  - Responsibility Segregation Review
  - Secrets Exposure Analysis
  - Concurrency Risk Analysis
  - DevOps Readiness Assessment
- Clasificación de madurez (Nivel 1–4)
- Clasificación de riesgos (Crítico–Bajo)

Este documento será estándar reusable.

---

## ... FASE 2 – EJECUTAR AUDITORÍA REAL DEL PROYECTO

Analizar completamente:

- Estructura de carpetas
- playwright.config.*
- package.json
- tests/
- pages/
- utils/
- fixtures/
- data/
- reportes
- descargas
- credenciales
- paralelismo
- configuración Linux
- integración Allure
- scripts npm

Aplicar metodología definida.

---

## ... FASE 3 – GENERAR DOCUMENTO DE RESULTADOS

Crear archivo:

docs/auditoria/resultados/AUDITORIA_TECNICA_REGINSA_YYYY-MM-DD.md

Debe contener:

## 1. Resumen Ejecutivo

- Nivel actual
- Riesgo general
- Preparación institucional

## 2. Estructura del Proyecto

Incluir árbol encontrado.
Indicar problemas detectados.
Indicar rutas específicas.

## 3. Configuración Playwright

Indicar:

- Ruta del archivo
- Línea donde se define workers
- Línea donde se define reporter
- Línea donde se define retries
- Configuración headless
- Configuración de descargas

Ejemplo obligatorio de formato:

Archivo: playwright.config.ts  
Ruta: /playwright.config.ts  
Línea: 23  
Configuración encontrada: workers: 3  
Evaluación: Configuración válida pero no parametrizada por entorno  

## 4. Arquitectura de Tests

Identificar patrón:

- POM
- Híbrido
- Procedural

Indicar archivos exactos analizados.

## 5. Manejo de Credenciales

Indicar:

- Archivo donde están
- Si están hardcodeadas
- Nivel de riesgo

## 6. Paralelismo

Evaluar:

- Colisión de datos
- Uso compartido de usuarios
- Descargas concurrentes
- Riesgo detectado

## 7. Reportería

Indicar:

- Reporter configurado
- Si existe Allure
- Calidad de evidencia

## 8. DevOps

Indicar:

- Si existe Dockerfile
- Si existe pipeline YAML
- Preparación Linux
- Si bloquea merge

## 9. Deuda Técnica Clasificada

- Crítica
- Alta
- Media
- Baja

## 10. Nivel de Madurez Final

Clasificar 1–4 con justificación técnica.

---

## ... FASE 4 – GENERAR PLAN POST-AUDITORÍA

Crear archivo:

docs/arquitectura/PLAN_POST_AUDITORIA_REGINSA.md

Debe contener:

## 1. Brechas detectadas

## 2. Objetivo arquitectónico

## 3. Plan por fases: REGINSA

Fase 1 – Estabilización  
Fase 2 – Refactor estructural  
Fase 3 – Arquitectura limpia  
Fase 4 – DevSecOps  
Fase 5 – Escalabilidad institucional  

## 4. Riesgos del refactor

## 5. Impacto estimado

## 6. Orden recomendado de ejecución

---

## ... FASE 5 – TRAZABILIDAD OBLIGATORIA

En cada hallazgo indicar:

- Archivo
- Ruta
- Línea
- Técnica aplicada
- Nivel de riesgo
- Justificación técnica

No inventar líneas si no se pueden obtener.

---

## ... FORMATO

Redacción técnica profesional.
Lenguaje institucional.
Estructura clara.
Sin emojis.
Sin explicaciones informales.
Documento apto para revisión técnica institucional.

---

## ... IMPORTANTE FINAL

No modificar código.
No generar refactor aún.
Solo auditar y documentar.

---

## ... INICIAR EJECUCIÓN

🎯 Qué hace este prompt

Cuando lo pegues en el agente:

1️⃣ Crea estructura docs
2️⃣ Crea metodología base
3️⃣ Audita proyecto real
4️⃣ Genera documento con evidencia
5️⃣ Genera plan post-auditoría
6️⃣ Todo listo para pasar luego a GPT-5.2

🧠 Estrategia correcta ahora

Usa GPT-4.1 para:

✔ Auditoría
✔ Documentación
✔ Clasificación
✔ Plan

Guarda todo.

El 17 de febrero con GPT-5.2 hacemos:

✔ Generación automática del framework core
✔ Refactor completo coherente
✔ Docker + CI + Sonar + OWASP

🔥 Esto ya es flujo profesional real

Auditoría → Plan → Arquitectura → Implementación → Validación
