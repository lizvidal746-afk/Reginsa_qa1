# Documentación Detallada de Selectores Playwright

Este documento describe todos los selectores utilizados en los casos de prueba automatizados, explicando a qué campo, pestaña, botón o elemento de la interfaz corresponde cada uno, y el contexto de uso.

---

## Caso 01: Agregar Administrado

### Archivo: `01-agregar-administrado.spec.ts`

| Selector / Método | Descripción Detallada |
|-------------------|-----------------------|

| `page.getByRole('link', { name: /Administrado|Administrados/i })` | Enlace del menú lateral para acceder a la sección "Administrados". Se usa para navegar al módulo principal. |
| `page.locator('button:has(i.pi-bars), button[aria-label*="menu" i], .layout-menu-button')` | Botón de menú hamburguesa o menú lateral, usado para abrir el panel de navegación. |
| `page.locator('table')` | Tabla principal de la vista de administrados, utilizada para esperar la carga de datos. |
| `page.locator('input[placeholder*="RUC" i], input[aria-label*="RUC" i], input[formcontrolname*="ruc" i]')` | Campo de entrada para el RUC del administrado. Permite ingresar o buscar por RUC. |
| `page.getByRole('button', { name: /Buscar/i })` | Botón para ejecutar la búsqueda de administrados. |
| `page.locator('table').locator('td', { hasText: ruc })` | Celda de la tabla que contiene el RUC buscado, para validar la existencia del registro. |
| `page.getByRole('dialog').filter({ hasText: /Agregar\s*Administrado/i })` | Modal de diálogo para agregar un nuevo administrado. |
| `page.locator('text=/Guardado|Exitoso|éxito/i')` | Mensaje de confirmación de guardado exitoso. |
| `page.locator('input[formcontrolname*="razon" i], input[name*="razon" i], input[placeholder*="razon" i], input[aria-label*="razon" i]')` | Campo de entrada para la Razón Social. |
| `page.locator('input[formcontrolname*="comercial" i], input[name*="comercial" i], input[placeholder*="comercial" i], input[aria-label*="comercial" i]')` | Campo de entrada para el Nombre Comercial. |
| `scope.getByRole('textbox', { name: new RegExp(nombre, 'i') })` | Campo de texto identificado por el nombre dinámico, usado para entradas personalizadas. |
| `scope.getByLabel(new RegExp(nombre, 'i'))` | Campo de texto asociado a una etiqueta específica. |
| `scope.getByPlaceholder(new RegExp(nombre, 'i'))` | Campo de texto identificado por el placeholder. |
| `scope.locator('label', { hasText: new RegExp(nombre, 'i') }).locator('xpath=following::input[1]')` | Input que sigue a una etiqueta con texto específico, útil para formularios complejos. |
| `scope.locator('input').filter({ hasText: new RegExp(nombre, 'i') })` | Input filtrado por texto interno. |
| `scope.locator('input').filter({ has: scope.locator(`label:has-text("${nombre}")`) })` | Input relacionado a una etiqueta específica, usando relación DOM. |
| `scope.getByText(VALIDACION_DUPLICADO_REGEX)` | Mensaje de validación de RUC duplicado. |
| `scope.locator('.p-error, .invalid-feedback, .mat-error, .text-danger, .error-message')` | Mensajes de error de validación en formularios. |
| `scope.locator('#estado, [aria-controls="estado_list"]')` | Dropdown de selección de estado del administrado. |
| `dropdownPrime.locator('.p-dropdown-trigger, [role="button"][aria-label*="dropdown" i], .p-dropdown-label[role="combobox"]')` | Botón para desplegar el dropdown de estado. |
| `page.locator('#estado_list, [id^="estado_list"]')` | Lista de opciones del dropdown de estado. |
| `list.locator('li[role="option"], .p-dropdown-item', { hasText: textoEstado })` | Opción específica dentro del dropdown de estado. |
| `scope.getByRole('combobox', { name: /Seleccione|Estado/i })` | Fallback para el combobox de estado. |
| `page.getByRole('option', { name: textoEstado })` | Opción seleccionable en el combobox. |
| `page.getByRole('button', { name: 'Guardar' })` | Botón para guardar el nuevo administrado. |
| ... | ... |

---

## Caso 02: Registrar Sanción

### Archivo: `02-registrar-sancion.spec.ts`

| Selector / Método | Descripción Detallada |
|-------------------|---------------------- |

| `page.getByRole('textbox').nth(1)` | Campo de texto para el número de expediente. |
| `page.locator('input[formcontrolname="numeroResolucion"]')` | Campo de texto para el número de resolución. |
| `page.getByRole('button', { name: /Choose|Seleccionar/i })` | Botón para abrir el selector de fecha de resolución. |
| `btnFecha.locator('..').locator('input')` | Input de fecha asociado al botón de selección. |
| `page.getByText(String(fechaResolucion.getDate()), { exact: true })` | Botón de día específico en el calendario de fecha. |
| `page.locator('input[type="file"]')` | Input para adjuntar archivos (opcional). |
| `page.getByRole('textbox', { name: 'Ingrese la medida correctiva' })` | Campo para ingresar medidas correctivas. |
| `page.getByRole('button', { name: 'Agregar medida' })` | Botón para agregar una nueva medida correctiva. |
| `page.getByRole('tab', { name: 'Detalle de sanciones' })` | Pestaña para acceder al detalle de sanciones. |
| `page.locator('button[label="Agregar sanción"][icon="pi pi-plus"]')` | Botón para agregar una nueva sanción. |
| `page.locator('[role="dialog"]')` | Modal de diálogo para agregar/editar sanciones. |
| `dialog.getByRole('combobox', { name: labelRegex })` | Combobox para seleccionar tipo de sanción. |
| `dialog.locator('label', { hasText: labelRegex })` | Etiqueta asociada al combobox de sanción. |
| `dialog.locator('p-dropdown, .p-dropdown, [role="combobox"]')` | Dropdown de selección de tipo de sanción. |
| `combobox.locator('.p-dropdown-trigger, [role="button"], [role="combobox"]')` | Botón para desplegar el dropdown de sanción. |
| `page.locator('.p-dropdown-panel:visible, [role="listbox"]:visible')` | Panel de opciones desplegadas del dropdown. |
| `panel.locator('.p-dropdown-item, [role="option"]')` | Opción dentro del panel de dropdown. |
| `dialog.locator('p-dropdown[name="risSeleccionado"]')` | Dropdown para seleccionar RIS. |
| `risDropdown.locator('.p-dropdown-trigger')` | Botón para desplegar el dropdown de RIS. |
| `page.locator('.p-dropdown-panel .p-dropdown-item, [role="option"]')` | Opciones de RIS. |
| `dialog.locator('p-dropdown[formcontrolname="idTipoInfractor"], p-dropdown[optionlabel="DescripcionTipoInfractor"], p-dropdown').nth(1)` | Dropdown para seleccionar tipo de infractor. |
| `dialog.locator('.p-dropdown-trigger')` | Botón para desplegar el dropdown de tipo de infractor. |
| `page.locator('.dropdown-panel-wrap--tipo .p-dropdown-item, [role="option"]')` | Opciones de tipo de infractor. |
| `dialog.getByPlaceholder('Describe el hecho infractor')` | Campo para describir el hecho infractor. |
| `page.locator(`#${id}`)` | Input por ID dinámico, usado en recursos. |
| `page.locator(`label[for="${id}"]`)` | Etiqueta asociada a un input por ID. |
| `dialog.locator(`#${radioId}`)` | Input radio para seleccionar opciones. |
| `dialog.locator(`p-radiobutton[inputid="${radioId}"] .p-radiobutton-box`)` | Caja visual del radio button. |
| `dialog.locator('input[name="valorUIT"]')` | Input para valor UIT. |
| `dialog.locator('input[name="valorSoles"], input[placeholder="0.00"]')` | Input para valor en soles. |
| `dialog.locator('label', { hasText: /Tiempo/i })` | Etiqueta para seleccionar tiempo de sanción. |
| `dialog.locator('p-dropdown, .p-dropdown').first()` | Dropdown de tiempo de sanción. |
| `dialog.getByRole('combobox', { name: /Tiempo/i })` | Combobox de tiempo de sanción. |
| `dialog.locator('.p-dropdown-trigger, [role="button"], [role="combobox"]')` | Botón para desplegar el dropdown de tiempo. |
| `page.getByRole('option').filter({ hasText: /Año|Mes|Día/i })` | Opciones de tiempo (año, mes, día). |
| `dialog.getByPlaceholder('Cantidad')` | Input para cantidad de sanción. |
| `page.locator('button[label="Guardar detalle"][icon="pi pi-save"]')` | Botón para guardar el detalle de sanción. |
| ... | ... |

---

## Otros Casos (03, 04...)

> Puedes solicitar la documentación de los selectores de los casos 03 y 04 si lo requieres. La estructura será similar: tabla por caso, selector y explicación detallada.

---

**Actualizado:** 12 de febrero de 2026
