# AUDITORÍA TÉCNICA REGINSA – 2026-02-12

## 1. Resumen Ejecutivo

Nivel actual: Avanzado (Nivel 3)
Riesgo general: Medio
Preparación institucional: Alta, con integración de reportes y scripts automatizados, pero con oportunidades de mejora en parametrización y seguridad.

## 2. Estructura del Proyecto

Árbol principal:

- playwright.config.js
- package.json
- tests/
- scripts/
- reportes/
- allure-results/
- allure-report/
- playwright-report/
- config/
- docs/
- helpers/
- files/
- screenshots/

Problemas detectados:

- No se identifican carpetas explícitas de credenciales ni de descargas dedicadas.
- La carpeta `tests/_referencias/` está excluida en configuración, lo que es correcto para evitar ejecución accidental.

## 3. Configuración Playwright

Archivo: playwright.config.js  
Ruta: /playwright.config.js  
Línea: 8  
Configuración encontrada: workers: 1  
Evaluación: Valor fijo, no parametrizado por entorno.  

Archivo: playwright.config.js  
Ruta: /playwright.config.js  
Línea: 7  
Configuración encontrada: retries: process.env.CI ? 2 : 0  
Evaluación: Correcto, parametrizado por entorno CI.  

Archivo: playwright.config.js  
Ruta: /playwright.config.js  
Línea: 13-17  
Configuración encontrada: reporter: line, html, allure-playwright, junit  
Evaluación: Excelente integración de reportes múltiples.  

Archivo: playwright.config.js  
Ruta: /playwright.config.js  
Línea: 22  
Configuración encontrada: use.headless: no explícito, pero probable por defecto  
Evaluación: Recomendar parametrización explícita.  

Archivo: playwright.config.js  
Ruta: /playwright.config.js  
Línea: 23  
Configuración encontrada: use.storageState: 'storageState.json'  
Evaluación: Correcto para manejo de sesiones.  

## 4. Arquitectura de Tests

Patrón identificado: Híbrido (POM + Procedural)
Archivos analizados: tests/casos-prueba/*.spec.ts, tests/global-setup.js
Justificación: Uso de carpetas por caso y helpers, pero con scripts de ejecución directa.

## 5. Manejo de Credenciales

Archivo: storageState.json  
Ruta: /storageState.json  
Línea: N/A  
Técnica aplicada: Static Code Review  
Nivel de riesgo: Medio  
Justificación: El archivo puede contener tokens o sesiones persistentes. No se detectan credenciales hardcodeadas en package.json ni playwright.config.js.

## 6. Paralelismo

Configuración workers: Fijo en 1 (playwright.config.js, línea 8).  
Scripts npm permiten override con --workers=N.  
Colisión de datos: Bajo riesgo actual por ejecución secuencial por defecto.  
Riesgo detectado: Si se incrementa workers sin aislar datos/usuarios, riesgo medio de colisión.

## 7. Reportería

Reporter configurado: line, html, allure-playwright, junit  
Existe Allure: Sí (allure-results/, allure-report/, integración en scripts y config)  
Calidad de evidencia: Alta, con generación automática y scripts para apertura de reportes.

## 8. DevOps

Dockerfile: No detectado en raíz ni scripts/  
Pipeline YAML: Detectado (.github/workflows/playwright-ci.yml)  
Preparación Linux: Scripts Bash presentes (scripts/reportes/view-reports.sh)  
Bloqueo de merge: No evidenciado en auditoría, revisar políticas de repositorio.

## 9. Deuda Técnica Clasificada

- Crítica: No se detecta
- Alta: Falta de Dockerfile para ejecución estandarizada
- Media: workers no parametrizado por entorno, credenciales en storageState.json
- Baja: Ausencia de carpeta dedicada para descargas, headless no explícito

## 10. Nivel de Madurez Final

Nivel 3 – Avanzado: El proyecto cuenta con integración de reportes, scripts automatizados, pipeline CI y estructura modular. Requiere mejoras en parametrización, seguridad y estandarización de ejecución para alcanzar Nivel 4.

---

## ... TRAZABILIDAD DE HALLAZGOS

- Archivo: playwright.config.js
- Ruta: /playwright.config.js
- Línea: 8
- Técnica aplicada: Static Code Review
- Nivel de riesgo: Medio
- Justificación técnica: workers fijo, no parametrizado

- Archivo: playwright.config.js
- Ruta: /playwright.config.js
- Línea: 13-17
- Técnica aplicada: Structural Analysis
- Nivel de riesgo: Bajo
- Justificación técnica: reporter múltiple correctamente integrado

- Archivo: storageState.json
- Ruta: /storageState.json
- Línea: N/A
- Técnica aplicada: Secrets Exposure Analysis
- Nivel de riesgo: Medio
- Justificación técnica: posible persistencia de tokens/sesiones

- Archivo: .github/workflows/playwright-ci.yml
- Ruta: /.github/workflows/playwright-ci.yml
- Línea: 1+
- Técnica aplicada: DevOps Readiness Assessment
- Nivel de riesgo: Bajo
- Justificación técnica: pipeline presente, pero sin bloqueo de merge ni Dockerfile
