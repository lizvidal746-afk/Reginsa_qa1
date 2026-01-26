# 📸 GUÍA PARA CAPTURAR LA PANTALLA DEL FORMULARIO

## ¿QUÉ NECESITAS CAPTURAR?

El formulario de "Registrar Sanción" **con el campo de Administrado lleno** y todas las opciones visibles.

### Ubicación esperada en el test:
- **PASO 4**: Seleccionando administrado
  - El dropdown debe estar abierto O ya cerrado (después de seleccionar)
  - El campo debe mostrar el administrado seleccionado
  - El formulario debe tener todos los campos accesibles

---

## 🚀 PASOS PARA CAPTURAR

### 1️⃣ Ejecutar el test
```bash
npm run test:02
```

### 2️⃣ Esperar a que el test abra el formulario
El test se detendrá cuando haya:
- ✅ Login completado
- ✅ Formulario abierto
- ✅ Dropdown encontrado
- ✅ Administrado seleccionado

### 3️⃣ OPCIÓN A: Captura automática del test
El test genera capturas automáticamente en:
- `test-results/casos-prueba-02-registrar-sancion-chromium/`
- Nombres: `test-failed-1.png`, `test-passed-1.png`

### 4️⃣ OPCIÓN B: Captura manual mientras ejecuta
Cuando el test esté corriendo:
1. Alt + Print Screen (captura ventana activa)
2. O Print Screen (captura pantalla completa)
3. Pegar en Paint o Gimp
4. Guardar como PNG

### 5️⃣ OPCIÓN C: Usar page.pause() en el test
Agregar una pausa interactiva en PASO 4 para inspeccionar:

**Agregar esto en PASO 4 después de seleccionar administrado:**
```typescript
await page.pause(); // El test se detiene aquí - puedes inspeccionar
```

---

## 📷 QUÉ DEBE VERSE EN LA CAPTURA

### Mínimo requerido:
```
┌─────────────────────────────────────────┐
│ Modal: Registrar Sanción                │
├─────────────────────────────────────────┤
│                                         │
│  Administrado: [Nombre Seleccionado ✓]  │
│  Número RUC: [_______________]          │
│  Nº Expediente: [_______________]       │
│  Nº Resolución: [_______________]       │
│  Fecha: [_______________]               │
│  ...                                    │
│                                         │
│  [Guardar] [Cancelar]                   │
└─────────────────────────────────────────┘
```

### Ideal (como se vería en navegador):
- Modal completamente visible
- Campo de Administrado con valor seleccionado (NO vacío)
- Al menos 4-5 campos del formulario visibles
- Botones de acción visible (Guardar, Cancelar)

---

## 🎬 SCRIPT MEJORADO PARA CAPTURA AUTOMÁTICA

Si quieres que el test genere capturas con pausa:

**En el archivo `02-registrar-sancion.spec.ts`, PASO 4, agregar:**

```typescript
  // Después de seleccionar administrado (línea ~105)
  console.log('   Tomando captura del formulario con administrado lleno...');
  await page.screenshot({ 
    path: 'screenshots/02-ADMINISTRADO_SELECCIONADO.png', 
    fullPage: true 
  });
  
  // Pausa para inspección manual (comentar después de verificar)
  // await page.pause();
```

---

## 📁 DÓNDE GUARDARSE LAS CAPTURAS

### Automáticamente en test results:
```
d:\SUNEDU\SELENIUM\playwrigth\
├── test-results/
│   └── casos-prueba-02-registrar--[hash]-chromium/
│       ├── test-failed-1.png       (si falla)
│       ├── test-passed-1.png       (si pasa)
│       └── error-context.md
└── screenshots/
    └── 02-ADMINISTRADO_SELECCIONADO.png
```

### Manualmente:
```
d:\SUNEDU\SELENIUM\playwrigth\screenshots\
├── 02-FORMULARIO_LLENO.png
├── 02-DROPDOWN_ABIERTO.png
└── 02-CONFIRMACION_GUARDADO.png
```

---

## 🔍 VERIFICAR QUE LA CAPTURA ES VÁLIDA

✅ **Captura válida si tiene:**
- Modal/Formulario visible
- Campo "Administrado" con valor (NO está vacío)
- Al menos 3 campos más del formulario
- Botones de acción visibles

❌ **Captura NO válida si:**
- Solo muestra fondo gris (modal no se renderizó)
- Campo de Administrado está vacío `[ ]`
- Texto ilegible o cortado

---

## ⚡ COMANDO RÁPIDO PARA CAPTURAR

### Desde Git Bash:
```bash
npm run test:02 &
# Espera a que se abra el navegador
# Presiona Print Screen
# Pega en Paint y guarda
```

### Desde PowerShell con UTF-8:
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
npm run test:02
# Cuando aparezca el formulario, captura
```

---

## 📋 CHECKLIST FINAL

- [ ] Test ejecutado correctamente (`npm run test:02`)
- [ ] Formulario abierto en pantalla
- [ ] Campo de Administrado lleno con valor visible
- [ ] Captura tomada (Print Screen o automática)
- [ ] Captura guardada en `screenshots/`
- [ ] Captura tiene 1920x1080 o mayor (legible)
- [ ] Imagen formato PNG
- [ ] Nombre descriptivo (`02-ADMINISTRADO_SELECCIONADO.png`)

