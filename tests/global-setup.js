const { chromium } = require('@playwright/test');

const CREDENCIALES = {
  url: 'https://reginsaqa.sunedu.gob.pe/#/home',
  usuario: 'lizvidal',
  contraseña: 'QA1234510qa'
};

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(CREDENCIALES.url);
  const btnAcceder = page.getByRole('button', { name: 'Acceder Ahora' });
  await btnAcceder.click();

  const inputUsuario = page.getByRole('textbox', { name: 'Usuario' });
  await inputUsuario.waitFor({ state: 'visible', timeout: 30000 });
  await inputUsuario.fill(CREDENCIALES.usuario);

  const inputContraseña = page.getByRole('textbox', { name: 'Contraseña' });
  await inputContraseña.fill(CREDENCIALES.contraseña);

  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // Esperar a que el menú esté disponible para asegurar sesión válida
  await page.getByRole('link').first().waitFor({ state: 'visible', timeout: 30000 });

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
};
