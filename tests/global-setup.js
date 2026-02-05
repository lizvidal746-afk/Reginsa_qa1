const { chromium } = require('@playwright/test');

const CREDENCIALES = {
  url: 'https://reginsaqa.sunedu.gob.pe/#/home',
  usuarios: [
    { usuario: 'lizvidal', contraseña: 'QA1234510qa' },
    { usuario: 'anahuaman', contraseña: 'QA1234512qa' }
  ]
};

const usuarioEnv = process.env.REGINSA_USER;
const contraseñaEnv = process.env.REGINSA_PASS;
const credencialActiva = usuarioEnv && contraseñaEnv
  ? { usuario: usuarioEnv, contraseña: contraseñaEnv }
  : CREDENCIALES.usuarios[0];

module.exports = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(CREDENCIALES.url);
  const btnAcceder = page.getByRole('button', { name: 'Acceder Ahora' });
  await btnAcceder.click();

  const inputUsuario = page.getByRole('textbox', { name: 'Usuario' });
  await inputUsuario.waitFor({ state: 'visible', timeout: 30000 });
  await inputUsuario.fill(credencialActiva.usuario);

  const inputContraseña = page.getByRole('textbox', { name: 'Contraseña' });
  await inputContraseña.fill(credencialActiva.contraseña);

  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  // Esperar a que el menú esté disponible para asegurar sesión válida
  await page.getByRole('link').first().waitFor({ state: 'visible', timeout: 30000 });

  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
};
