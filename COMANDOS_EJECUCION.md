# 📋 COMANDOS DE EJECUCIÓN

## 🧹 PASO 1: Limpiar Caso 01

```bash
cd "d:\SUNEDU\SELENIUM\playwrigth"
del registros-administrados.json
del reporte-administrados.html
```

O simplemente doble clic:
```
D:\SUNEDU\SELENIUM\playwrigth\limpiar-caso-01.bat
```

---

## ✅ PASO 2: Ejecutar Caso 01

```bash
cd "d:\SUNEDU\SELENIUM\playwrigth"
npm run test:01
```

**Qué pasa:**
1. Ejecuta Caso 01 (~2-3 minutos)
2. Abre Playwright Report automáticamente
3. Abre Allure Report automáticamente
4. Screenshots incluyen: `caso_paso_razonsocial_timestamp.png`

**Resultado esperado:**
- Se registran 1 administrado
- `registros-administrados.json` se crea
- `reporte-administrados.html` se genera

---

## ✅ PASO 3: Ejecutar Caso 02

```bash
cd "d:\SUNEDU\SELENIUM\playwrigth"
npm run test:02
```

**Qué pasa:**
1. Ejecuta Caso 02 (~46 segundos)
2. Abre Playwright Report automáticamente
3. Abre Allure Report automáticamente
4. Screenshots simplificados: `caso_paso_razonsocial_timestamp.png`

**Resultado esperado:**
- Se registra 1 sanción
- Allure muestra: Caso 01 + Caso 02
- Reportes están limpios

---

## ✅ PASO 4: Ejecutar TODOS los Casos

```bash
cd "d:\SUNEDU\SELENIUM\playwrigth"
npm run test:all
```

**Qué pasa:**
1. Ejecuta Caso 01 + Caso 02 (~3 minutos)
2. Abre Playwright Report automáticamente
3. Abre Allure Report automáticamente
4. Allure muestra ambos casos

**Resultado esperado:**
- Se registra 1 administrado (Caso 01)
- Se registra 1 sanción (Caso 02)
- Allure limpio con 2 suites

---

## 📊 Resumen de Comandos

| Acción | Comando |
|--------|---------|
| **Limpiar Caso 01** | `del registros-administrados.json registros-administrados.html` |
| **Ejecutar Caso 01** | `npm run test:01` |
| **Ejecutar Caso 02** | `npm run test:02` |
| **Ejecutar Todos** | `npm run test:all` |

---

## 🎯 WORKFLOW COMPLETO (Línea a línea)

```bash
# 1. Abre terminal en la carpeta del proyecto
cd "d:\SUNEDU\SELENIUM\playwrigth"

# 2. Limpia Caso 01
del registros-administrados.json 2>nul
del reporte-administrados.html 2>nul

# 3. Ejecuta Caso 01
npm run test:01

# Espera a que termine y abra reportes...

# 4. Ahora ejecuta Caso 02
npm run test:02

# Espera a que termine y abra reportes...

# 5. Si quieres todo junto otra vez, ejecuta todos
npm run test:all
```

---

## 📸 Formato de Screenshots Ahora

**Ejemplo:**
```
02-REGISTRAR_SANCION_01-SANCION_LLENA_Perfumerias_unidas_2026-01-20T10-30-45-123Z.png
```

**Incluye:**
- ✅ Caso: `02`
- ✅ Paso: `01-SANCION_LLENA`
- ✅ Razón Social: `Perfumerias_unidas`
- ✅ Timestamp: `2026-01-20T10-30-45-123Z`

**NO incluye:**
- ❌ RUC
- ❌ EXP
- ❌ Medidas Correctivas

---

## 🔍 VER REPORTES DESPUÉS DE EJECUTAR

### Allure Report (Profesional - Estadísticas)
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth"
allure serve allure-results
```

Se abrirá en: `http://localhost:4050`

### Playwright Report (Detalles - Screenshots y Videos)
```bash
cd "d:\SUNEDU\SELENIUM\playwrigth"
npx playwright show-report
```

Se abrirá en: `http://localhost:9323`

**Nota:** Ambos se abren AUTOMÁTICAMENTE después de ejecutar tests con `npm run test:*`
