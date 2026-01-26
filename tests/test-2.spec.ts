import { test, expect } from '@playwright/test';

/**
 * GUÍA DE PRUEBA - TEST 2: Flujo Registrar Sanción
 * 
 * Este es el archivo generado por Playwright Codegen como GUÍA
 * para la creación del Caso de Prueba 02 (02-registrar-sancion.spec.ts)
 * 
 * Propósito: Mostrar el flujo completo desde login hasta guardar una sanción
 * Uso: Como referencia para implementar casos de prueba reales
 */

test('test-2: Flujo Registrar Sanción (Guía Codegen)', async ({ page }) => {
  await page.goto('https://reginsaqa.sunedu.gob.pe/#/home');
  await page.getByRole('button', { name: 'Acceder Ahora' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).click();
  await page.getByRole('textbox', { name: 'Usuario' }).fill('lizvidal');
  await page.getByRole('textbox', { name: 'Usuario' }).press('Tab');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('QA123510');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('QA123510qa');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('QA');
  await page.getByRole('textbox', { name: 'Contraseña' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('QA1234510qa');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('link', { name: ' Infractor y Sanción' }).click();
  await page.getByRole('button', { name: 'Registrar Sancionar' }).click();
  await page.getByRole('button', { name: 'dropdown trigger' }).click();
  await page.getByText('UNIVERSIDAD DE SAN MARTIN DE').click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('Exp N° 123-2026');
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('Res N° 123-2026');
  await page.getByRole('button', { name: 'Choose Date' }).click();
  await page.getByText('1', { exact: true }).click();
  await page.getByText('Seleccionar archivo').click();
  await page.locator('span').filter({ hasText: 'Seleccionar archivo' }).first().setInputFiles('GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf');
  await page.getByRole('textbox', { name: 'Ingrese la medida correctiva' }).click();
  await page.getByRole('textbox', { name: 'Ingrese la medida correctiva' }).fill('medida correctiva 1 pruebas qa');
  await page.getByRole('button', { name: 'Agregar medida' }).click();
  await page.getByRole('textbox', { name: 'Ingrese la medida correctiva' }).nth(1).click();
  await page.getByRole('textbox', { name: 'Ingrese la medida correctiva' }).nth(1).fill('medida correctiva 2 pruebas qa');
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.locator('div').filter({ hasText: 'Detalles requeridosDebes' }).nth(5).click();
  await page.getByRole('tab', { name: 'Detalle de sanciones' }).click();
  await page.getByRole('button', { name: 'Agregar sanción' }).click();
  await page.locator('#pn_id_73').getByRole('combobox').click();
  await page.getByRole('option', { name: 'RIS 018-2015-MINEDU' }).click();
  await page.getByRole('combobox', { name: 'Seleccione' }).click();
  await page.getByText('1.1 - Ofrecer y/o prestar').click();
  await page.getByRole('textbox', { name: 'Describe el hecho infractor' }).click();
  await page.getByRole('textbox', { name: 'Describe el hecho infractor' }).fill('hecho infractor 1');
  await page.locator('.p-checkbox-box').first().click();
  await page.getByRole('textbox', { name: '0.00' }).click();
  await page.getByRole('textbox', { name: '0.00' }).fill('10');
  await page.locator('.p-element.ng-untouched > .p-checkbox > .p-checkbox-box').first().click();
  await page.locator('#pn_id_135').getByRole('button', { name: 'dropdown trigger' }).click();
  await page.getByRole('option', { name: 'Año' }).click();
  await page.getByPlaceholder('Cantidad').click();
  await page.getByPlaceholder('Cantidad').click();
  await page.getByPlaceholder('Cantidad').click();
  await page.getByPlaceholder('Cantidad').click();
  await page.getByPlaceholder('Cantidad').fill('1');
  await page.getByRole('button', { name: 'Guardar detalle' }).click();
  await page.getByRole('button', { name: 'Guardar' }).click();
  await page.locator('div').filter({ hasText: 'Éxito1 registro creado.' }).nth(5).click();
  await page.getByRole('button', { name: 'Profile' }).click();
  await page.locator('a').filter({ hasText: 'Sign Out20 Jan 2026 09:51:02 AM GMT-' }).click();
  await page.getByRole('button', { name: 'Si' }).click();
});
