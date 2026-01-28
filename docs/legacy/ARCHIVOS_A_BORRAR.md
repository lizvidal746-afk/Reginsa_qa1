# 🗑️ ARCHIVOS A BORRAR O IGNORAR

## ⚠️ ARCHIVOS DUPLICADOS Y OBSOLETOS

Estos archivos son ANTIGUOS y NO USAR. Puedes borrarlos:

### 📄 Documentación Antigua (Borrar)
```
ALLURE_NO_APARECE_SOLUCION.md
ANALISIS_GENERAR_REPORTE.md
ARBOL_PROYECTO.md
ARQUITECTURA_REUTILIZACION.md
ARREGLOS_EJECUTADOS.md
ARREGLOS_VISUAL.md
AUTOMATIZACION_REPORTES.md
CAMBIOS_IMPLEMENTADOS.md
CAMBIOS_VISUALES.md
CAPTURAS_AUTOMATICAS.md
CASOS_PRUEBA_ACTUALES.md
CHECKLIST_FINAL.md
CHECKLIST_VALIDACION_FINAL.md
COMANDOS_EJECUCION.md
COMANDOS_LISTOS.md
COMANDOS_POR_TERMINAL.md
COMANDOS_RAPIDOS.txt
COMIENZA_AQUI.md
CONCLUSIONES.md
CORRECCIONES_FINALES_TEST_02.md
CORRECCIONES_TEST_02.md
DOCUMENTACION_ACTUALIZADA.md
ESTADO_FIX_PRIMENNG.md
ESTRUCTURA_ARCHIVOS.md
ESTRUCTURA_FINAL.md
FIX_PRIMENNG_DROPDOWN.md
GUIA_CAPTURA_PANTALLA.md
GUIA_EJECUCION.md
GUIA_LIMPIAR_Y_EJECUTAR.md
GUIA_REPORTES.md
GUIA_VISUAL_MEJORAS.md
INDICE_DOCUMENTACION.md
INICIO_RAPIDO.md
INSTRUCCIONES_CASO_02.md
LIMPIAR_POR_TERMINAL.md
MEJORAS_CASO02_Y_CAPTURAS.md
PROMPT_REQUISITO.md
PROXIMO_PASO.md
PROYECTO_RESUMEN.md
PUNTO_ENTRADA_TESTS.md
README.md
README_ACTUALIZADO.md
README_FINAL.md
REFACTORING_CASO01.md
REFACTORING_CASO02.md
REFERENCIAS_REPORTES.md
REPORTES_AUTOMATICOS.md
RESPUESTAS.md
RESUMEN_EJECUTIVO.md
RESUMEN_FINAL.md
RESUMEN_FINAL_ARQUITECTURA.md
RESUMEN_LIMPIEZA.md
RESUMEN_REFACTORING_FINAL.md
RESUMEN_TRABAJO_REALIZADO.md
SOLUCION_DROPDOWN.md
SOLUCION_FINAL_DOM_SYNC.md
STATUS.md
TODOS_COMANDOS.md
00-PUNTO-DE-ENTRADA.md
99-CHECKLIST-FINAL.md
```

### 📄 Scripts Antiguos (Borrar)
```
delete-duplicate.ps1
generar-reporte-html.js
ejecutar-caso-01.bat
ejecutar-caso-02.bat
ejecutar-test-02.bat
ejecutar-test-02.ps1
ejecutar-test-con-reporte.bat
ejecutar-todo.bat
ejecutar-todos-casos.bat
limpiar-caso-01.bat
limpiar-datos.bat
limpiar-y-ejecutar-caso-02.bat
limpiar-y-ejecutar-todos.bat
limpiar.bat
limpiar.ps1
recorder.bat
run-test-02-clean.sh
run-test-02.bat
run-test-02.ps1
run-test-02.sh
run-test.bat
run-test.sh
run-tests-full-new.ps1
run-tests-full.bat
run-tests-full.ps1
RESUMEN_VISUAL.sh
view-reports.bat
view-reports.sh
```

### 🗂️ Carpetas Antiguas (Borrar si no usa)
```
config/
docs/
files/
reportes/
scripts/
test-files/
```

### 📄 Archivos Técnicos (Ignorar)
```
test-output.log
.gitignore
.vscode/
node_modules/
package-lock.json
```

---

## ✅ ARCHIVOS QUE SÍ USAR

### 📄 Documentación (Mantener)
```
INDICE_PRINCIPAL.md ← COMIENZA AQUÍ
EJECUTAR_TESTS_PASO_A_PASO.md
ALLURE_GUIA_COMPLETA.md
VER_TESTS_EN_VENTANA.md
LIMPIAR_GUIA_FINAL.md
COMANDOS_LIMPIAR_RAPIDOS.md
ALLURE_COMANDOS_RAPIDOS.md
LIMPIEZA_ARCHIVOS_A_USAR.md
RESUMEN_AUTOMATIZACION.md
```

### 🛠️ Scripts (Mantener)
```
limpiar-todo.bat ← USAR PARA LIMPIAR
limpiar-todo.ps1
abrir-allure.bat ← USAR PARA ALLURE
abrir-allure.ps1
```

### ⚙️ Configuración (Mantener)
```
package.json
playwright.config.js
tests/
```

---

## 🧹 CÓMO LIMPIAR

### Opción 1: Manual
1. Abre el File Explorer
2. Selecciona archivos/carpetas a borrar
3. Presiona: Delete
4. Confirma

### Opción 2: PowerShell
```powershell
cd "d:\SUNEDU\SELENIUM\playwrigth"

# Borrar documentación antigua
Remove-Item -Path "ALLURE_NO_APARECE_SOLUCION.md", "ANALISIS_GENERAR_REPORTE.md", "ARBOL_PROYECTO.md" -Force

# Borrar carpetas antiguas
Remove-Item -Path "config", "docs", "files", "reportes", "scripts", "test-files" -Recurse -Force
```

---

## 💡 RECOMENDACIÓN

**Borra los archivos antiguos para no confunderte.** Solo mantén los de la lista ✅.

---

**Limpieza completa = Workspace ordenado** 🧹✨
