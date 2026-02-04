# 🐳 Guía Docker Playwright (TypeScript)

## 🎯 Objetivo
Ejecutar pruebas Playwright con TypeScript en Docker de forma profesional, con configuración flexible por variables y reportes Allure.

---

## 1) Requisitos
- Docker Desktop instalado y en ejecución.
- Proyecto ubicado en: D:/AUTOMATIZACION/SI091_REGINSA

---

## 2) Descargar imagen oficial de Playwright
```powershell
docker pull mcr.microsoft.com/playwright:v1.49.0-jammy
```

---

## 3) Ejecutar contenedor con el proyecto
```powershell
docker run --rm -it -v D:\AUTOMATIZACION\SI091_REGINSA:/work -w /work mcr.microsoft.com/playwright:v1.49.0-jammy bash
```

> Dentro del contenedor, todo se ejecuta en /work.

---

## 4) Instalar dependencias
```bash
npm ci
```

> La imagen ya trae browsers, no necesitas `playwright install`.

---

## 5) Ejecutar pruebas (Allure + Playwright)

### Todas las pruebas
```bash
npm run test:all
```

### Con navegador (headed)
```bash
npm run test:all -- --headed
```

### Sin capturas
```bash
npm run test:all:fast
```

---

## 6) Ejecución configurable por plan (variables)

### Archivo de configuración
Ruta: config/plan-ejecucion.json

Ejemplo:
```json
{
  "runs": [
    {
      "nombre": "casos-1-4-chrome-firefox",
      "tests": [
        "tests/casos-prueba/01-agregar-administrado.spec.ts",
        "tests/casos-prueba/02-registrar-sancion.spec.ts",
        "tests/casos-prueba/04-reconsiderar-con-sanciones.spec.ts"
      ],
      "repeticiones": 10,
      "proyectos": ["chromium", "firefox"],
      "headed": false,
      "capturas": true
    },
    {
      "nombre": "caso-02-solo-chrome",
      "tests": ["tests/casos-prueba/02-registrar-sancion.spec.ts"],
      "repeticiones": 20,
      "proyectos": ["chromium"],
      "headed": false,
      "capturas": false
    }
  ]
}
```

### Ejecutar plan
```bash
npm run test:plan
```

---

## 7) Reportes Allure
- Resultados se generan en allure-results
- Abrir reporte:
```bash
npm run report:allure:open
```

---

## 8) Notas
- Si necesitas correr 10 a 50 veces por caso, ajusta "repeticiones" en el plan.
- Si quieres solo Chrome/Firefox, ajusta "proyectos".
- Para desactivar capturas sin tocar el código, usa "capturas": false.

---

## ✅ Resultado
Tienes ejecución profesional, configurable y replicable en Docker.
