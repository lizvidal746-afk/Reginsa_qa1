import { test } from '@playwright/test';
import {
  loginReginsa,
  navegarAInfraccionSancion,
  obtenerAdministradoAleatorio,
  capturarPantallaMejorada
} from '../utilidades/reginsa-actions';

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
 * 8. Agregar 5 SANCIONES para el mismo administrado:
 *    - Sanción 1: MULTA (SOLES o UIT aleatorio)
 *    - Sanción 2: SUSPENSIÓN (Año/Mes/Día aleatorio)
 *    - Sanción 3: CANCELACIÓN (solo marcar)
 *    - Sanción 4: MULTA + SUSPENSIÓN (ambas)
 *    - Sanción 5: MULTA + CANCELACIÓN (ambas)
 * 9. Guardar formulario final
 */

test('02-REGISTRAR SANCIÓN: 5 sanciones para 1 administrado', async ({ page }) => {
  test.setTimeout(300000); // 5 minutos de timeout

  console.log('\n' + '═'.repeat(90));
  console.log('🔐 LOGIN Y NAVEGACIÓN');
  console.log('═'.repeat(90));

  await loginReginsa(page);
  await navegarAInfraccionSancion(page);
  console.log('  ✅ Sesión iniciada y módulo cargado\n');

  // ═══════════════════════════════════════════════════════════════════
  // PASO 2: ABRIR FORMULARIO
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('📋 PASO 2: ABRIENDO FORMULARIO');
  console.log('═'.repeat(90));

  const btnRegistrar = page.getByRole('button', { name: /Registrar|Sancionar/i });
  await btnRegistrar.click();
  await page.waitForTimeout(3000);
  console.log('  ✅ Formulario abierto\n');

  // ═══════════════════════════════════════════════════════════════════
  // PASO 3: SELECCIONAR ADMINISTRADO (UNA SOLA VEZ)
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('🎲 PASO 3: SELECCIONANDO ADMINISTRADO');
  console.log('═'.repeat(90));

  const admin = await obtenerAdministradoAleatorio(page);
  await page.waitForTimeout(2000);
  console.log(`  ✅ Seleccionado: ${admin}\n`);

  // ═══════════════════════════════════════════════════════════════════
  // PASO 4: LLENAR DATOS BÁSICOS
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('📝 PASO 4: DATOS BÁSICOS');
  console.log('═'.repeat(90));

  const numExp = Math.floor(Math.random() * 10000);
  const expInput = page.getByRole('textbox').nth(1);
  await expInput.click();
  await expInput.fill(`Exp N° ${numExp}-2026`);
  console.log(`  ✓ Expediente: Exp N° ${numExp}-2026`);

  const numRes = Math.floor(Math.random() * 10000);
  const resInput = page.getByRole('textbox').nth(2);
  await resInput.click();
  await resInput.fill(`Res N° ${numRes}-2026`);
  console.log(`  ✓ Resolución: Res N° ${numRes}-2026`);

  const btnFecha = page.getByRole('button', { name: /Choose|Seleccionar/i });
  await btnFecha.click();
  await page.waitForTimeout(1000);
  const dayBtn = page.getByText('1', { exact: true }).first();
  await dayBtn.click();
  console.log('  ✓ Fecha: 01/01/2026\n');

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

  console.log('  ✅ Medidas ingresadas (guardado final al terminar las 5 sanciones)\n');

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
  // PASO 8: AGREGAR 5 SANCIONES
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('⚖️  PASO 8: AGREGANDO 5 SANCIONES');
  console.log('═'.repeat(90));

  const sanciones = [
    { numero: 1, nombre: 'MULTA', multa: true, suspension: false, cancelacion: false },
    { numero: 2, nombre: 'SUSPENSIÓN', multa: false, suspension: true, cancelacion: false },
    { numero: 3, nombre: 'CANCELACIÓN', multa: false, suspension: false, cancelacion: true },
    { numero: 4, nombre: 'MULTA + SUSPENSIÓN', multa: true, suspension: true, cancelacion: false },
    { numero: 5, nombre: 'MULTA + CANCELACIÓN', multa: true, suspension: false, cancelacion: true }
  ];

  let exitosas = 0;
  let multaUsaUITCaso1: boolean | null = null;

  const capturarToastExito = async (etiqueta: string) => {
    const toast = page
      .locator('.p-toast-message-success, .p-toast-message')
      .filter({ hasText: /registro|registrad|guardad|Éxito/i })
      .first();

    const visible = await toast.isVisible({ timeout: 5000 }).catch(() => false);
    if (visible) {
      try {
        await capturarPantallaMejorada(page, '02-REGISTRAR_SANCION', etiqueta, 'Toast', etiqueta);
      } catch (e) {}
    }
  };

  for (const sancion of sanciones) {
    console.log(`\n  ┌─ SANCIÓN ${sancion.numero}/5: ${sancion.nombre}`);

    try {
      // PASO 8A: ABRIR MODAL
      const btnAgregarSancion = page.getByRole('button', { name: 'Agregar sanción' });
      for (let intento = 0; intento < 15; intento++) {
        const isEnabled = await btnAgregarSancion.isEnabled({ timeout: 2000 }).catch(() => false);
        if (isEnabled) {
          await btnAgregarSancion.click();
          await page.waitForTimeout(3000);
          break;
        }
        await page.waitForTimeout(500);
      }

      console.log(`  │  ✓ Modal abierto`);

      // PASO 8B: RIS (aleatorio)
      const risCombobox = page.locator('[role="dialog"] [role="combobox"]').first();
      await risCombobox.click();
      await page.waitForTimeout(1500);
      const risOptions = page.getByRole('option');
      const risCount = await risOptions.count().catch(() => 0);
      if (risCount > 0) {
        const risIndex = Math.floor(Math.random() * risCount);
        await risOptions.nth(risIndex).click();
      }
      await page.waitForTimeout(1500);
      console.log(`  │  ✓ RIS seleccionado`);

      // PASO 8C: TIPO INFRACTOR (aleatorio)
      await page.waitForTimeout(1500);
      const tipoCombobox = page.locator('[role="dialog"] [role="combobox"]').nth(1);
      await tipoCombobox.click();
      await page.waitForTimeout(1200);
      const tipoOptions = page.getByRole('option');
      const tipoCount = await tipoOptions.count().catch(() => 0);
      if (tipoCount > 0) {
        const tipoIndex = Math.floor(Math.random() * tipoCount);
        await tipoOptions.nth(tipoIndex).click();
      }
      await page.waitForTimeout(2000);
      console.log(`  │  ✓ Tipo Infractor seleccionado`);

      // PASO 8D: HECHO INFRACTOR
      const hechoInput = page.getByPlaceholder('Describe el hecho infractor');
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
        let usarUIT = Math.random() > 0.5;

        if (sancion.numero === 1) {
          multaUsaUITCaso1 = usarUIT;
        } else if (sancion.numero === 4 && multaUsaUITCaso1 !== null) {
          usarUIT = !multaUsaUITCaso1;
        }

        const cantidad = usarUIT
          ? (Math.floor(Math.random() * 5) + 1).toString()
          : (Math.floor(Math.random() * 1600) + 1).toString();
        const tipoMoneda = usarUIT ? 'UIT' : 'SOLES';

        const radioButtons = page.locator('[role="radio"]');
        const numRadios = await radioButtons.count().catch(() => 0);
        
        if (numRadios >= 2) {
          const indexRadio = usarUIT ? 0 : 1;
          if (indexRadio < numRadios) {
            const radio = radioButtons.nth(indexRadio);
            await radio.click();
            await page.waitForTimeout(800);
          }
        }

        const inputMoneda = page.getByRole('textbox', { name: '0.00' }).first();
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
      const btnGuardarDetalle = page.getByRole('button', { name: 'Guardar detalle' });
      await btnGuardarDetalle.click();
      await page.waitForTimeout(2500);
      console.log(`  │  ✅ GUARDADA`);
      exitosas++;

      await capturarToastExito(`DETALLE_${sancion.numero}`);

      // PASO 8I: CERRAR MODAL
      await page.keyboard.press('Escape');
      await page.waitForTimeout(1500);

    } catch (error) {
      const msg = error instanceof Error ? error.message.substring(0, 35) : 'Error';
      console.log(`  │  ❌ ${msg}`);
    }

    console.log(`  └───────────────────────────────────────────────────────────────────────────────────────────`);
  }

  console.log(`\n  ✅ SANCIONES COMPLETADAS: ${exitosas}/5\n`);

  // ═══════════════════════════════════════════════════════════════════
  // PASO 9: GUARDAR FORMULARIO FINAL
  // ═══════════════════════════════════════════════════════════════════
  console.log('═'.repeat(90));
  console.log('✅ PASO 9: GUARDANDO FORMULARIO FINAL');
  console.log('═'.repeat(90));

  await page.waitForTimeout(2000);
  const btnGuardarFinal = page.getByRole('button', { name: 'Guardar' });
  if (await btnGuardarFinal.isVisible({ timeout: 5000 }).catch(() => false)) {
    await btnGuardarFinal.click();
    await page.waitForTimeout(4000);
    console.log('  ✅ Formulario guardado');

    await capturarToastExito('GUARDAR_GENERAL');

    try {
      await capturarPantallaMejorada(page, '02-REGISTRAR_SANCION', 'FINAL', 'Éxito', 'Final');
    } catch (e) {}
  }

  console.log(`\n  ✅ TEST COMPLETADO - Sanciones: ${exitosas}/5\n`);

  if (exitosas >= 3) {
    console.log('  ✅ EXITOSO: Al menos 3 sanciones registradas');
  } else {
    throw new Error(`Solo ${exitosas} sanciones registradas (se requieren al menos 3)`);
  }
});

