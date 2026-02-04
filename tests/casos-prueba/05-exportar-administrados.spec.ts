import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import {
  iniciarSesionYNavegar,
  extraerAdministradosDesdeTabla
} from '../utilidades/reginsa-actions';

/**
 * EJECUCIÓN (rápido)
 * - Headless por defecto. Para ver navegador: `--headed`.
 * - Con capturas: scripts normales `npm run test:*`.
 * - Sin capturas: scripts `:fast`.
 */

test('05-ADMINISTRADOS: listar RUC/razón social (utilidad)', async ({ page }) => {
  test.setTimeout(300000);

  if (process.env.RUN_ADMIN_CHECK !== '1') {
    test.skip(true, 'Caso 05 es utilidad opcional. Usa RUN_ADMIN_CHECK=1 para ejecutarlo.');
  }

  console.log('\n================================================================================');
  console.log('📄 CASO 05: LISTAR ADMINISTRADOS (UTILIDAD)');
  console.log('================================================================================\n');

  await iniciarSesionYNavegar(page, 'administrado');
  await page.waitForLoadState('networkidle');

  const registros = await extraerAdministradosDesdeTabla(page, 10);
  const outPath = path.join(__dirname, '../../reportes/administrados-registrados.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const payload = {
    total: registros.length,
    fecha: new Date().toISOString(),
    registros
  };

  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));

  console.log(`✅ Administrados encontrados: ${registros.length}`);
  console.log(`📁 Archivo generado: ${outPath}`);

  if (process.env.EDIT_ADMINISTRADO === '1') {
    console.log('📝 Modo edición: verificando que el formulario se pueda abrir (sin guardar)');
    const tabla = page.locator('table').first();
    const primeraFila = tabla.locator('tbody tr').first();
    const botonEditar = primeraFila.locator('button').filter({ hasText: /Editar|Edit/i }).first();
    const botonFallback = primeraFila.locator('button.p-button-warning').first();

    if (await botonEditar.isVisible().catch(() => false)) {
      await botonEditar.click();
    } else if (await botonFallback.isVisible().catch(() => false)) {
      await botonFallback.click();
    } else {
      console.log('⚠️ No se encontró botón Editar en la primera fila.');
      return;
    }

    const formulario = page.locator('form').first();
    await formulario.waitFor({ state: 'visible', timeout: 10000 });
    const inputs = formulario.locator('input');
    const total = await inputs.count();
    let habilitados = 0;
    for (let i = 0; i < total; i++) {
      if (await inputs.nth(i).isEnabled().catch(() => false)) habilitados++;
    }
    console.log(`✅ Campos habilitados para edición: ${habilitados}/${total}`);

    if (process.env.SAVE_ADMINISTRADO === '1') {
      console.log('💾 Guardando cambios (modo prueba)...');
      const btnGuardar = formulario.getByRole('button', { name: /Guardar/i }).first();
      if (await btnGuardar.isVisible().catch(() => false)) {
        await btnGuardar.click();
        await page.locator('.p-toast-message-success, .p-toast-message').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
        console.log('✅ Guardado finalizado');
      } else {
        console.log('⚠️ No se encontró botón Guardar en el formulario.');
      }
    } else {
      await page.keyboard.press('Escape').catch(() => {});
    }
  }
});
