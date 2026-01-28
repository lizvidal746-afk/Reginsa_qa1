# 🚀 PUNTO DE ENTRADA - Ejecutar Tests Limpios

## ⚡ ACCIÓN INMEDIATA

**Haz doble clic en UNO de estos:**

| Archivo | Acción |
|---------|--------|
| `limpiar-y-ejecutar-caso-02.bat` | Caso 02 solamente |
| `limpiar-y-ejecutar-todos.bat` | Caso 01 + 02 |

---

## 📊 Qué pasa automáticamente

```
Doble clic
    ↓
🧹 Limpia datos viejos (screenshots, allure-results, etc)
    ↓
✅ Ejecuta test(s)
    ↓
🔄 Allure Report abre (limpio, sin basura)
    ↓
🎬 Playwright Report abre (screenshots ordenados)
    ↓
😊 ¡Listo! Ambos reportes limpios
```

---

## 📝 Qué se limpió

✅ **Screenshots simplificados**
- Antes: `02-REGISTRAR_SANCION_01-SANCION_LLENA_RUC_12345678901_Perfumerias_unidas_2026-01-20T10-30-45.png`
- Después: `02-REGISTRAR_SANCION_01-SANCION_LLENA_2026-01-20T10-30-45.png`

✅ **Nombres de directorio**
- Eliminado "RUC", "EXP", "Medidas Correctivas" del nombre
- Solo: Caso + Paso + Timestamp

✅ **Scripts de limpieza**
- `limpiar-datos.bat` - Solo limpiar
- `limpiar-y-ejecutar-caso-02.bat` - Limpiar + Caso 02
- `limpiar-y-ejecutar-todos.bat` - Limpiar + Todos

✅ **Documentación**
- `GUIA_LIMPIAR_Y_EJECUTAR.md` - Cómo funciona
- `RESUMEN_LIMPIEZA.md` - Resumen completo
- `ANALISIS_GENERAR_REPORTE.md` - Sobre `generar-reporte-html.js`

---

## ❓ Preguntas Respondidas

### P: ¿Allure mostraba tests antiguos?
R: Sí, porque no limpiabas `allure-results` entre ejecuciones. Ahora lo hace automático.

### P: ¿Los screenshots tenían nombres feos?
R: Sí, incluían RUC, razón social, etc. Ahora solo: `caso_paso_timestamp.png`

### P: ¿Sirve `generar-reporte-html.js`?
R: No es esencial. Allure Report hace lo mismo (mejor). Archivo archivado.

### P: ¿Por qué Playwright no abrió reporte automático?
R: Ahora está configurado. Ejecuta: `limpiar-y-ejecutar-caso-02.bat` y verás ambos reportes.

---

## 🎯 AHORA MISMO

```
1. Doble clic en: limpiar-y-ejecutar-caso-02.bat
2. Espera ~50 segundos
3. Verás dos navegadores con reportes
4. ¡Listo!
```

---

## 📚 Más Detalles

- Ver: `GUIA_LIMPIAR_Y_EJECUTAR.md` para explicación completa
- Ver: `RESUMEN_LIMPIEZA.md` para antes/después
- Ver: `ANALISIS_GENERAR_REPORTE.md` si tienes dudas del archivo HTML

---

**Status:** ✅ 100% Listo | **Fecha:** Enero 20, 2026
