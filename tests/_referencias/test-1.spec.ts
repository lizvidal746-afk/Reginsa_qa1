/**
 * GRABACIÓN CODEGEN - TEST 1
 * 
 * Generado automáticamente por Playwright Codegen
 * Flujo básico: Login
 * 
 * ❌ NO USAR PARA TESTS REALES - Solo referencia
 * Tiene:
 * - Valores hardcodeados
 * - Sin esperas apropiadas
 * - Sin manejo de errores
 */

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://reginsaqa.sunedu.gob.pe/#/home');
  await page.getByRole('button', { name: 'Acceder Ahora' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).fill('lizvidal');
  await page.getByRole('textbox', { name: 'Usuario' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('QA');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('QA1234510qa');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: ' Infractor y Sanción' }).click();
  await page.getByRole('button').nth(3).click();
  await page.getByRole('textbox', { name: 'R.U.C. *' }).click();
  await page.getByRole('textbox', { name: 'R.U.C. *' }).fill('40404040404');
  await page.getByRole('textbox', { name: 'Razón Social *' }).click();
  await page.getByRole('textbox', { name: 'Razón Social *' }).fill('Perfumerias unidas sac');
  await page.getByRole('textbox', { name: 'Nombre Comercial *' }).click();
  await page.getByRole('textbox', { name: 'Nombre Comercial *' }).fill('Perfumerias unidas');
  await page.getByRole('combobox', { name: 'Seleccione' }).click();
  await page.getByRole('option', { name: 'Licenciada' }).click();
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.getByRole('textbox', { name: 'R.U.C. *' }).click();
  await page.getByRole('textbox', { name: 'R.U.C. *' }).fill('40404040401');
  await page.getByRole('button', { name: 'Guardar' }).click();
});
