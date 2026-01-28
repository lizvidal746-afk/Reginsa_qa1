# 🎯 REFERENCIAS RÁPIDAS PARA REPORTES AUTOMÁTICOS

## 📌 Accesos directos Windows

**Ejecutar con reportes automáticos - 3 opciones:**

```
1️⃣ Doble clic en:
   D:\SUNEDU\SELENIUM\playwrigth\ejecutar-caso-02.bat

2️⃣ O en Terminal:
   cd D:\SUNEDU\SELENIUM\playwrigth
   npm run test:02

3️⃣ O en PowerShell:
   cd "D:\SUNEDU\SELENIUM\playwrigth"
   npm run test:02
```

---

## 📊 Qué verás

| Paso | Tiempo | Acción |
|------|--------|--------|
| 1 | 0s | Browser abre y comienza Caso 02 |
| 2 | 46s | Caso 02 termina exitosamente ✅ |
| 3 | 48s | Playwright Report se abre automáticamente |
| 4 | 50s | Allure Report se abre automáticamente |
| 5 | 50s+ | Tienes ambos reportes para revisar |

---

## 🔗 URLs de los reportes

```
Playwright: http://localhost:9323
Allure:     http://localhost:4050
```

---

## 📁 Archivos relevantes

| Archivo | Propósito |
|---------|-----------|
| `package.json` | Scripts npm (test:02, reports:open) |
| `ejecutar-caso-02.bat` | Batch file para click directo |
| `AUTOMATIZACION_REPORTES.md` | Documentación completa |
| `REPORTES_AUTOMATICOS.md` | Detalles técnicos |
| `INICIO_RAPIDO.md` | Guía rápida |

---

## ⚡ Un comando para todo

```bash
npm run test:02
```

**Eso es todo. Los reportes se abren solos.**

---

## 🆘 Si algo no funciona

```bash
# Verificar Allure instalado
allure --version

# Si no está, instalar
npm install -g allure-commandline

# Verificar puerto 4050 disponible
netstat -ano | findstr :4050

# Limpiar reportes antiguos
rm -r allure-report allure-results
```

---

**Creado:** Enero 20, 2026 | **Status:** ✅ Listo para usar
