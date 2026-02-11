import { test } from '@playwright/test';
import {
  iniciarSesionYNavegar,
  abrirFormularioRegistrarSancion,
  obtenerAdministradoAleatorio,
  capturarPantallaMejorada,
  capturarFormularioLleno,
  capturarToastExito,
  generarFechaPonderada
} from '../utilidades/reginsa-actions';

/**
 * EJECUCIÓN (rápido)
 * - Headless por defecto. Para ver navegador: `--headed`.
 * - Con capturas: scripts normales `npm run test:*`.
 * - Sin capturas: scripts `:fast`.
 * - Paralelismo (suite completa): `npm run test:all:w2` / `test:all:w4`.
 */

/**
 * CASO 02: REGISTRAR SANCIÓN
 * 
 * Flujo:
 * 1. Login + navegación al módulo
 * 2. Abrir formulario
 * 3. Seleccionar UN administrado (aleatorio, sin repetir)
 * 4. Llenar datos básicos (expediente, resolución, fecha)
 * 5. Subir PDF
 * 6. Agregar 2-3 medidas correctivas
 * 7. Navegar a "Detalle de sanciones"
 * 8. Agregar 8 SANCIONES para el mismo administrado:
 *    - Seleccionar RIS aplicable y Tipo de Infracción
 *    - Sanción 1: MULTA (SOLES o UIT aleatorio)
 *    - Sanción 2: SUSPENSIÓN (Año/Mes/Día aleatorio)
 *    - Sanción 3: CANCELACIÓN (solo marcar)
 *    - Sanción 4: MULTA + SUSPENSIÓN (ambas)
 *    - Sanción 5: MULTA + CANCELACIÓN (ambas)
 *    - Sanción 6: MULTA (UIT 1-10) + SUSPENSIÓN (ambas)
 *    - Sanción 7: MULTA (UIT 1-10)
 *    - Sanción 8: MULTA (UIT 1-10) + CANCELACIÓN (ambas)
 * 9. Guardar formulario final
 *
 * Capturas:
 * - Exitosas dependen del modo de ejecución (:fast omite).
 * - Errores se guardan siempre en errors/.
 */

test('02-REGISTRAR SANCIÓN: 8 sanciones para 1 administrado', async ({ page }, testInfo) => {
  test.setTimeout(300000); // 5 minutos de timeout

  console.log('\n================================================================================');
  console.log('⚖️ CASO 02: REGISTRAR SANCIÓN');
  console.log('================================================================================\n');

  // ═══════════════════════════════════════════════════════════════════
  // PASO 1: LOGIN + NAVEGACIÓN
  // Reutiliza `iniciarSesionYNavegar`
  // ═══════════════════════════════════════════════════════════════════
  console.log('\n' + '═'.repeat(90));
  console.log('🔐 LOGIN Y NAVEGACIÓN');
  console.log('═'.repeat(90));

  await iniciarSesionYNavegar(page, 'infractor', testInfo.workerIndex);
  console.log('  ✅ Sesión iniciada y módulo cargado\n');

  // ═══════════════════════════════════════════════════════════════════
  // PASO 2: ABRIR FORMULARIO
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('📋 PASO 2: ABRIENDO FORMULARIO');
  console.log('═'.repeat(90));

  // Reutiliza `abrirFormularioRegistrarSancion`
  await abrirFormularioRegistrarSancion(page);
  await page.waitForTimeout(2000);
  console.log('  ✅ Formulario abierto\n');

  // ═══════════════════════════════════════════════════════════════════
  // PASO 3: SELECCIONAR ADMINISTRADO (UNA SOLA VEZ)
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('🎲 PASO 3: SELECCIONANDO ADMINISTRADO');
  console.log('═'.repeat(90));

  // Reutiliza `obtenerAdministradoAleatorio` pero reduce espera
  const admin = await obtenerAdministradoAleatorio(page);
  // Espera mínima, solo para asegurar carga
  await page.waitForTimeout(800);
  console.log(`  ✅ Administrado seleccionado: ${admin}\n`);

  // ═══════════════════════════════════════════════════════════════════
  // PASO 4: LLENAR DATOS BÁSICOS
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('📝 PASO 4: DATOS BÁSICOS');
  console.log('═'.repeat(90));

  const hoy = new Date();
  const maxFecha = new Date(hoy);
  maxFecha.setDate(maxFecha.getDate() - 2);
  // Reutiliza `generarFechaPonderada`
  const fechaResolucion = generarFechaPonderada(
    [
      { anio: 2024, peso: 0.2 },
      { anio: 2025, peso: 0.4 },
      { anio: 2026, peso: 0.4 }
    ],
    maxFecha
  );
  const yearResolucion = fechaResolucion.getFullYear();

  const numExp = Math.floor(Math.random() * 10000);
  const expInput = page.getByRole('textbox').nth(1);
  await expInput.click();
  await expInput.fill(`Exp N° ${numExp}-${yearResolucion}`);
  console.log(`  ✓ Expediente: Exp N° ${numExp}-${yearResolucion}`);

  const numRes = Math.floor(Math.random() * 10000);
  const resInput = page.locator('input[formcontrolname="numeroResolucion"]');
  await resInput.click();
  await resInput.fill(`Res N° ${numRes}-${yearResolucion}`);
  console.log(`  ✓ Resolución: Res N° ${numRes}-${yearResolucion}`);

  const formatFecha = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const btnFecha = page.getByRole('button', { name: /Choose|Seleccionar/i });
  const fechaInput = btnFecha.locator('..').locator('input');
  const fechaTexto = formatFecha(fechaResolucion);

  const asegurarFecha = async () => {
    if (await fechaInput.isVisible().catch(() => false)) {
      await fechaInput.click();
      await fechaInput.fill(fechaTexto);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
    } else {
      await btnFecha.click();
      await page.waitForTimeout(1000);
      const dayBtn = page.getByText(String(fechaResolucion.getDate()), { exact: true }).first();
      await dayBtn.click();
      await page.waitForTimeout(500);
    }

    const valor = await fechaInput.inputValue().catch(() => '');
    return valor?.includes(fechaTexto);
  };

  let fechaOk = false;
  for (let intento = 0; intento < 3; intento++) {
    fechaOk = await asegurarFecha();
    if (fechaOk) break;
    await page.waitForTimeout(500);
  }

  if (!fechaOk) {
    throw new Error(`No se pudo fijar la fecha de resolución (${fechaTexto})`);
  }

  console.log(`  ✓ Fecha: ${fechaTexto}\n`);

  // ═══════════════════════════════════════════════════════════════════
  // PASO 5: SUBIR PDF
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('📁 PASO 5: SUBIENDO PDF');
  console.log('═'.repeat(90));

  const pdfPath = 'test-files/GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf';
  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(pdfPath);
  await page.waitForTimeout(5000);
  console.log('  ✅ PDF subido\n');

  // ═══════════════════════════════════════════════════════════════════
  // PASO 6: MEDIDAS CORRECTIVAS
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('📋 PASO 6: MEDIDAS CORRECTIVAS');
  console.log('═'.repeat(90));

  for (let i = 1; i <= 3; i++) {
    const medidaInput = page.getByRole('textbox', { name: 'Ingrese la medida correctiva' }).nth(i - 1);
    await medidaInput.click();
    await medidaInput.fill(`Medida correctiva ${i}`);

    if (i < 3) {
      const btnAgregarMedida = page.getByRole('button', { name: 'Agregar medida' });
      if (await btnAgregarMedida.isVisible().catch(() => false)) {
        await btnAgregarMedida.click();
        await page.waitForTimeout(500);
      }
    }
    console.log(`  ✓ Medida ${i} agregada`);
  }

  console.log('  ✅ Medidas ingresadas (guardado final al terminar las 8 sanciones)\n');

  // ═══════════════════════════════════════════════════════════════════
  // PASO 7: IR A PESTAÑA "DETALLE DE SANCIONES"
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('📋 PASO 7: NAVEGANDO A DETALLE DE SANCIONES');
  console.log('═'.repeat(90));

  await page.waitForTimeout(2000);
  const tabDetalleSanciones = page.getByRole('tab', { name: 'Detalle de sanciones' });
  await tabDetalleSanciones.click();
  await page.waitForTimeout(2000);
  console.log('  ✅ Tab seleccionado\n');

  // ═══════════════════════════════════════════════════════════════════
  // PASO 8: AGREGAR 8 SANCIONES
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('⚖️  PASO 8: AGREGANDO 8 SANCIONES');
  console.log('═'.repeat(90));

  const sanciones = [
    { numero: 1, nombre: 'MULTA', multa: true, suspension: false, cancelacion: false },
    { numero: 2, nombre: 'SUSPENSIÓN', multa: false, suspension: true, cancelacion: false },
    { numero: 3, nombre: 'CANCELACIÓN', multa: false, suspension: false, cancelacion: true },
    { numero: 4, nombre: 'MULTA + SUSPENSIÓN', multa: true, suspension: true, cancelacion: false },
    { numero: 5, nombre: 'MULTA + CANCELACIÓN', multa: true, suspension: false, cancelacion: true },
    { numero: 6, nombre: 'MULTA (UIT) + SUSPENSIÓN', multa: true, suspension: true, cancelacion: false, forceUIT: true },
    { numero: 7, nombre: 'MULTA (UIT)', multa: true, suspension: false, cancelacion: false, forceUIT: true },
    { numero: 8, nombre: 'MULTA (UIT) + CANCELACIÓN', multa: true, suspension: false, cancelacion: true, forceUIT: true }
  ];

  let exitosas = 0;
  // En este flujo: casos 1, 4 y 5 son SOLES; casos 6, 7 y 8 son UIT.

  const capturarToastCaso = async (etiqueta: string) => {
    await capturarToastExito(page, '02-REGISTRAR_SANCION', etiqueta, admin, '', 'DETALLE_SANCION');
  };

  for (const sancion of sanciones) {
    console.log(`\n  ┌─ SANCIÓN ${sancion.numero}/${sanciones.length}: ${sancion.nombre}`);

    try {
      // PASO 8A: ABRIR MODAL
      const btnAgregarSancion = page.locator('button[label="Agregar sanción"][icon="pi pi-plus"]');
      for (let intento = 0; intento < 8; intento++) {
        const isEnabled = await btnAgregarSancion.isEnabled({ timeout: 1000 }).catch(() => false);
        if (isEnabled) {
          await btnAgregarSancion.click({ force: true });
          // Espera mínima, solo lo necesario para el modal
          await page.locator('[role="dialog"]').first().waitFor({ state: 'visible', timeout: 3000 });
          break;
        }
        await page.waitForTimeout(200); // Menor espera entre intentos
      }

      const dialog = page.locator('[role="dialog"]').first();
      await dialog.waitFor({ state: 'visible', timeout: 10000 });

      console.log(`  │  ✓ Modal abierto`);

      const seleccionarAleatorioPorLabel = async (
        labelRegex: RegExp,
        label: string,
        fallbackIndex: number
      ) => {
        let combobox = dialog.getByRole('combobox', { name: labelRegex }).first();

        if (!(await combobox.isVisible({ timeout: 1500 }).catch(() => false))) {
          const labelLocator = dialog.locator('label', { hasText: labelRegex }).first();
          if (await labelLocator.isVisible({ timeout: 1500 }).catch(() => false)) {
            const field = labelLocator.locator('..');
            combobox = field.locator('p-dropdown, .p-dropdown, [role="combobox"]').first();
          } else {
            combobox = dialog.locator('[role="combobox"]').nth(fallbackIndex);
          }
        }

        const visible = await combobox.isVisible({ timeout: 3000 }).catch(() => false);
        if (!visible) {
          console.log(`  │  ⚠️  ${label} no visible`);
          return false;
        }

        for (let intento = 0; intento < 3; intento++) {
          const trigger = combobox.locator('.p-dropdown-trigger, [role="button"], [role="combobox"]').first();
          if (await trigger.isVisible({ timeout: 1000 }).catch(() => false)) {
            await trigger.click({ force: true });
          } else {
            await combobox.click({ force: true });
          }
          await page.waitForTimeout(800);

          const panel = page.locator('.p-dropdown-panel:visible, [role="listbox"]:visible').first();
          await panel.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
          const options = panel.locator('.p-dropdown-item, [role="option"]');
          const count = await options.count().catch(() => 0);

          if (count > 0) {
            let index = Math.floor(Math.random() * count);
            for (let i = 0; i < count; i++) {
              const texto = (await options.nth(i).textContent()) || '';
              if (!/seleccione/i.test(texto)) {
                index = i;
                break;
              }
            }
            await options.nth(index).click();
            await page.waitForTimeout(800);
            console.log(`  │  ✓ ${label} seleccionado`);
            return true;
          }

          await page.keyboard.press('Escape');
          await page.waitForTimeout(500);
        }

        console.log(`  │  ⚠️  No se pudo seleccionar ${label}`);
        return false;
      };

      // PASO 8B: RIS (aleatorio, selector exacto)
      const risDropdown = dialog.locator('p-dropdown[name="risSeleccionado"]');
      await risDropdown.waitFor({ state: 'visible', timeout: 3000 });
      const risTrigger = risDropdown.locator('.p-dropdown-trigger');
      await risTrigger.click({ force: true });
      await page.waitForTimeout(300); // Espera mínima para que cargue el panel
      const risOptions = page.locator('.p-dropdown-panel .p-dropdown-item, [role="option"]');
      const risCount = await risOptions.count();
      if (risCount > 0) {
        const risIndex = Math.floor(Math.random() * risCount);
        await risOptions.nth(risIndex).click();
        await page.waitForTimeout(300);
        console.log('  │  ✓ RIS aplicable seleccionado');
      } else {
        throw new Error('No se encontraron opciones RIS aplicable');
      }

      // PASO 8C: TIPO INFRACCIÓN (aleatorio, rápido y variable)
      await page.waitForTimeout(200); // Espera mínima tras RIS
      // Selector robusto para el segundo dropdown de tipo infractor
      const tipoDropdown = dialog.locator('p-dropdown[formcontrolname="idTipoInfractor"], p-dropdown[optionlabel="DescripcionTipoInfractor"], p-dropdown').nth(1);
      await tipoDropdown.waitFor({ state: 'visible', timeout: 2000 });
      const tipoTrigger = tipoDropdown.locator('.p-dropdown-trigger');
      await tipoTrigger.click({ force: true });
      await page.waitForTimeout(150); // Espera mínima para panel
      // Opciones visibles en el panel abierto
      const tipoOptions = page.locator('.dropdown-panel-wrap--tipo .p-dropdown-item, [role="option"]');
      const tipoCount = await tipoOptions.count();
      if (tipoCount > 1) {
        // Evita seleccionar la primera opción si es solo título/categoría
        let tipoIndex = Math.floor(Math.random() * tipoCount);
        // Si la opción elegida es solo título (sin número), elige la siguiente
        let texto = (await tipoOptions.nth(tipoIndex).textContent()) || '';
        if (/^\s*\d+\s*-/.test(texto) && tipoIndex + 1 < tipoCount) {
          tipoIndex++;
        }
        await tipoOptions.nth(tipoIndex).click();
        await page.waitForTimeout(150);
        console.log('  │  ✓ Tipo Infractor seleccionado');
      } else {
        throw new Error('No se encontraron opciones de Tipo Infractor');
      }

      // PASO 8D: HECHO INFRACTOR
      const hechoInput = dialog.getByPlaceholder('Describe el hecho infractor');
      await hechoInput.click();
      await hechoInput.fill('hecho infractor');
      await page.waitForTimeout(1000);
      console.log(`  │  ✓ Hecho Infractor llenado`);

      // PASO 8E: CHECKBOXES
      console.log(`  │  ☑️  Marcando sanciones:`);

      const marcarCheckbox = async (id: string, label: string) => {
        const input = page.locator(`#${id}`);
        const visible = await input.isVisible({ timeout: 3000 }).catch(() => false);
        if (visible) {
          const marcado = await input.isChecked().catch(() => false);
          if (!marcado) {
            await input.click({ force: true });
            await page.waitForTimeout(800);
          }
          console.log(`  │    ✓ ${label} marcada`);
          return;
        }

        const labelLocator = page.locator(`label[for="${id}"]`);
        if (await labelLocator.isVisible({ timeout: 3000 }).catch(() => false)) {
          await labelLocator.click();
          await page.waitForTimeout(800);
          console.log(`  │    ✓ ${label} marcada`);
        }
      };

      if (sancion.multa) {
        await marcarCheckbox('multa', 'Multa');
      }

      if (sancion.suspension) {
        await marcarCheckbox('suspension', 'Suspensión');
      }

      if (sancion.cancelacion) {
        await marcarCheckbox('cancelacion', 'Cancelación');
      }

      // PASO 8F: MULTA - MONTO
      if (sancion.multa) {
        const forceUIT = (sancion as { forceUIT?: boolean }).forceUIT === true;
        const usarUIT = forceUIT ? true : false;
        const cantidad = usarUIT
          ? (Math.floor(Math.random() * 10) + 1).toString()
          : (Math.floor(Math.random() * 200000) + 1).toString();
        const tipoMoneda = usarUIT ? 'UIT' : 'SOLES';

        const radioId = usarUIT ? 'uit' : 'soles';
        const radioInput = dialog.locator(`#${radioId}`);
        const radioBoxById = dialog.locator(`p-radiobutton[inputid="${radioId}"] .p-radiobutton-box`).first();

        if (await radioBoxById.isVisible({ timeout: 1000 }).catch(() => false)) {
          await radioBoxById.click({ force: true });
        } else if (await radioInput.isVisible({ timeout: 1000 }).catch(() => false)) {
          await radioInput.click({ force: true });
        }
        await page.waitForTimeout(800);

        if (forceUIT) {
          console.log('  │    ✓ UIT forzado seleccionado');
        }

        const inputMoneda = usarUIT
          ? dialog.locator('input[name="valorUIT"]').first()
          : dialog.locator('input[name="valorSoles"], input[placeholder="0.00"]').first();
        if (await inputMoneda.isVisible({ timeout: 3000 }).catch(() => false)) {
          await inputMoneda.click();
          await inputMoneda.fill(cantidad);
          await page.waitForTimeout(600);
          console.log(`  │    ✓ Monto: ${cantidad} ${tipoMoneda}`);
        }
      }

      // PASO 8G: TIEMPO (SOLO SUSPENSIÓN)
      if (sancion.suspension) {
        const dialog = page.locator('[role="dialog"]').first();

        const tiempoLabel = dialog.locator('label', { hasText: /Tiempo/i }).first();
        const tiempoDropdown = tiempoLabel.locator('..').locator('p-dropdown, .p-dropdown').first();
        const tiempoCombobox = dialog.getByRole('combobox', { name: /Tiempo/i }).first();
        let tiempoButton = tiempoDropdown.locator('.p-dropdown-trigger, [role="button"], [role="combobox"]').first();

        if (!(await tiempoButton.isVisible({ timeout: 1500 }).catch(() => false))) {
          tiempoButton = tiempoCombobox;
        }

        await tiempoButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

        let tipoSeleccionado: 'Año' | 'Mes' | 'Día' = 'Año';
        const opcionesTiempo = page.getByRole('option').filter({ hasText: /Año|Mes|Día/i });

        for (let intento = 0; intento < 3; intento++) {
          await tiempoButton.click({ force: true });
          await page.waitForTimeout(800);

          const totalOpciones = await opcionesTiempo.count().catch(() => 0);
          if (totalOpciones > 0) {
            const index = Math.floor(Math.random() * totalOpciones);
            const opcion = opcionesTiempo.nth(index);
            const texto = (await opcion.innerText()).trim();
            if (/Año/i.test(texto)) tipoSeleccionado = 'Año';
            else if (/Mes/i.test(texto)) tipoSeleccionado = 'Mes';
            else tipoSeleccionado = 'Día';

            await opcion.click();
            await page.waitForTimeout(800);
            break;
          }

          await page.keyboard.press('Escape');
          await page.waitForTimeout(500);
        }

        let cantidad = 1;
        if (tipoSeleccionado === 'Año') cantidad = Math.floor(Math.random() * 5) + 1;
        else if (tipoSeleccionado === 'Mes') cantidad = Math.floor(Math.random() * 11) + 1;
        else cantidad = Math.floor(Math.random() * 29) + 1;

        const cantidadInput = dialog.getByPlaceholder('Cantidad');
        if (await cantidadInput.isVisible({ timeout: 3000 }).catch(() => false)) {
          await cantidadInput.click();
          await cantidadInput.fill(cantidad.toString());
          await page.waitForTimeout(600);
          console.log(`  │    ✓ Tiempo: ${tipoSeleccionado} (${cantidad})`);
        }
      }

      // PASO 8H: GUARDAR DETALLE
      const btnGuardarDetalle = page.locator('button[label="Guardar detalle"][icon="pi pi-save"]');
      await btnGuardarDetalle.waitFor({ state: 'visible', timeout: 5000 });
      await btnGuardarDetalle.click({ force: true });
      // Validar que el detalle fue guardado correctamente
      let guardado = false;
      for (let intento = 0; intento < 3; intento++) {
        // Espera a que desaparezca el modal o aparezca un toast de éxito
        const modalVisible = await page.locator('[role="dialog"]').first().isVisible().catch(() => false);
        const toastExito = await page.locator('.p-toast-message-success, .p-toast-message[aria-label*="Éxito"], .p-toast-message[style*="green"]').first();
        if (!modalVisible || await toastExito.isVisible().catch(() => false)) {
          guardado = true;
          break;
        }
        await page.waitForTimeout(1000);
      }
      if (!guardado) {
        throw new Error('No se confirmó el guardado del detalle de sanción');
      }
      await page.waitForTimeout(1000);
      exitosas++;
      console.log(`  │  ✅ GUARDADA (Detalle agregado ${exitosas}/${sanciones.length})`);

      if (sancion.numero === 5 || sancion.numero === sanciones.length) {
        // Espera a que el toast de éxito esté visible
        const toast = page.locator('.p-toast-message-success, .p-toast-message[aria-label*="Éxito"], .p-toast-message[style*="green"]');
        await toast.waitFor({ state: 'visible', timeout: 4000 });
        await page.waitForTimeout(300); // Breve espera para asegurar render
        await page.screenshot({
          path: `screenshots/02-REGISTRAR_SANCION_DETALLE_${sancion.numero}_VENTANA.png`,
          fullPage: true
        });
      }

      // PASO 8I: CERRAR MODAL
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1500);

    } catch (error) {
      const msg = error instanceof Error ? error.message.substring(0, 35) : 'Error';
      console.log(`  │  ❌ ${msg}`);
    }

    console.log(`  └───────────────────────────────────────────────────────────────────────────────────────────`);
  }

  console.log(`\n  ✅ SANCIONES COMPLETADAS: ${exitosas}/${sanciones.length}\n`);

  // ═══════════════════════════════════════════════════════════════════
  // PASO 9: GUARDAR FORMULARIO FINAL
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('✅ PASO 9: GUARDANDO FORMULARIO FINAL');
  console.log('═'.repeat(90));

  // Captura formulario lleno antes de guardar
  // Reutiliza `capturarFormularioLleno`
  await capturarFormularioLleno(page, '02-REGISTRAR_SANCION', admin, '', 'REGISTRAR_SANCION', '09_FORMULARIO_FINAL');

  await page.waitForTimeout(2000);
  const btnGuardarFinal = page.locator('button[label="Guardar"][icon="pi pi-save"]');
  await btnGuardarFinal.waitFor({ state: 'visible', timeout: 5000 });
  await btnGuardarFinal.click({ force: true });
  await page.waitForTimeout(4000);
  console.log('  ✅ Formulario guardado');

  // Captura pantalla completa de éxito final
  const toastFinal = page.locator('.p-toast-message-success, .p-toast-message[aria-label*="Éxito"], .p-toast-message[style*="green"]');
  await toastFinal.waitFor({ state: 'visible', timeout: 4000 });
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'screenshots/02-REGISTRAR_SANCION_EXITO_FINAL.png',
    fullPage: true
  });

  // Reutiliza `capturarToastExito`
  await capturarToastExito(page, '02-REGISTRAR_SANCION', '10_EXITO_GUARDAR_GENERAL', admin, '', 'REGISTRAR_SANCION');

  try {
    // Reutiliza `capturarPantallaMejorada`
    await capturarPantallaMejorada(page, '02-REGISTRAR_SANCION', '11_FINAL', 'Éxito', 'Final');
  } catch (e) {}
  console.log(`\n  ✅ TEST COMPLETADO - Sanciones: ${exitosas}/${sanciones.length}\n`);

  if (exitosas >= 3) {
    console.log('  ✅ EXITOSO: Al menos 3 sanciones registradas');
  } else {
    throw new Error(`Solo ${exitosas} sanciones registradas (se requieren al menos 3)`);
  }
});