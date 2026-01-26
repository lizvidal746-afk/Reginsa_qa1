import { Page } from '@playwright/test';

/**
 * FLUJO COMPARTIDO: Infractor y Sanción
 * 
 * Función reutilizable que contiene el flujo base común a todos los tests:
 * 1. Login
 * 2. Navegación a Infractor y Sanción
 * 3. Abrir formulario (Agregar Administrado o Registrar Sanción)
 * 
 * Esto permite evitar redundancias y mantener un único punto de actualización
 * para cambios comunes a todos los casos de prueba.
 */

/**
 * Inicializa sesión y navega hasta el módulo de Infractor y Sanción
 * 
 * @param page - Objeto Playwright Page
 * @param usuario - Usuario para login (default: 'lizvidal')
 * @param contraseña - Contraseña (default: 'QA1234510qa')
 * @returns boolean - true si fue exitoso
 */
export async function flujoInicialeInfractionSancion(
  page: Page,
  usuario: string = 'lizvidal',
  contraseña: string = 'QA1234510qa'
): Promise<boolean> {
  try {
    console.log('🔄 Iniciando flujo compartido: Infractor y Sanción...\n');

    // PASO 1: Ir a home
    console.log('   1️⃣ Navegando a home...');
    await page.goto('https://reginsaqa.sunedu.gob.pe/#/home');
    await page.getByRole('button', { name: 'Acceder Ahora' }).click();
    await page.waitForTimeout(500);

    // PASO 2: Login
    console.log('   2️⃣ Realizando login...');
    await page.getByRole('textbox', { name: 'Usuario' }).fill(usuario);
    await page.getByRole('textbox', { name: 'Contraseña' }).fill(contraseña);
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    
    // Esperar aceptación de términos si aparece
    try {
      await page.getByRole('button', { name: 'Aceptar' }).click({ timeout: 3000 });
    } catch (e) {
      // No siempre aparece
    }
    
    await page.waitForTimeout(1000);

    // PASO 3: Navegar a Infractor y Sanción
    console.log('   3️⃣ Navegando a Infractor y Sanción...');
    await page.getByRole('link', { name: /Infractor y Sanción/i }).click();
    await page.waitForTimeout(1000);

    console.log('✅ Flujo inicial completado\n');
    return true;
  } catch (error) {
    console.error('❌ Error en flujo inicial:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

/**
 * Abre el formulario de Agregar Administrado
 * 
 * @param page - Objeto Playwright Page
 * @returns boolean - true si fue exitoso
 */
export async function abrirFormularioAgregarAdministrado(page: Page): Promise<boolean> {
  try {
    console.log('   📋 Abriendo formulario: Agregar Administrado...');
    
    // Buscar botón "Agregar" o similar
    const btnAgregar = page.getByRole('button').filter({ hasText: /Agregar|Nuevo/ }).first();
    await btnAgregar.click({ timeout: 5000 });
    await page.waitForTimeout(500);

    console.log('   ✅ Formulario abierto\n');
    return true;
  } catch (error) {
    console.error('   ❌ Error al abrir formulario:', error instanceof Error ? error.message : String(error));
    return false;
  }
}

/**
 * Abre el formulario de Registrar Sanción
 * 
 * @param page - Objeto Playwright Page
 * @returns boolean - true si fue exitoso
 */
export async function abrirFormularioRegistrarSancion(page: Page): Promise<boolean> {
  try {
    console.log('   📋 Abriendo formulario: Registrar Sanción...');
    
    // Buscar botón "Registrar Sancionar" o similar
    const btnRegistrar = page.getByRole('button', { name: /Registrar Sanc|Registrar Sancionar/i });
    await btnRegistrar.click({ timeout: 5000 });
    await page.waitForTimeout(1000);

    console.log('   ✅ Formulario abierto\n');
    return true;
  } catch (error) {
    console.error('   ❌ Error al abrir formulario:', error instanceof Error ? error.message : String(error));
    return false;
  }
}
