import { Page, expect } from '@playwright/test';

/**
 * Funciones Reutilizables - REGINSA SUNEDU
 * Utilizadas en múltiples casos de prueba
 */

// Credenciales
const CREDENCIALES = {
  url: 'https://reginsaqa.sunedu.gob.pe/#/home',
  usuario: 'lizvidal',
  contraseña: 'QA1234510qa'
};

/**
 * FUNCIÓN PRINCIPAL DE SETUP
 * Realiza login + navegación en una sola llamada
 * Reutilizable en todos los tests
 */
export async function iniciarSesionYNavegar(page: Page, modulo: 'infractor' | 'sancion' = 'infractor'): Promise<void> {
  console.log('🔐 INICIALIZANDO SESIÓN Y NAVEGACIÓN...');
  
  try {
    // Navegar a home
    await page.goto(CREDENCIALES.url);
    await page.waitForLoadState('networkidle');
    
    // Click en "Acceder Ahora"
    await page.getByRole('button', { name: 'Acceder Ahora' }).click();
    await page.waitForTimeout(800);

    // Ingresar usuario
    const inputUsuario = page.getByRole('textbox', { name: 'Usuario' });
    await inputUsuario.waitFor({ state: 'visible' });
    await inputUsuario.fill(CREDENCIALES.usuario);
    await page.waitForTimeout(300);

    // Ingresar contraseña
    const inputContraseña = page.getByRole('textbox', { name: 'Contraseña' });
    await inputContraseña.fill(CREDENCIALES.contraseña);
    await page.waitForTimeout(300);

    // Iniciar sesión
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1500);

    console.log('✅ Sesión iniciada');

    // Navegar al módulo solicitado - Con reintentos y alternativas
    try {
      // Intento 1: Selector exacto
      const linkInfractor = page.getByRole('link', { name: /Infractor y Sanción/ });
      await linkInfractor.waitFor({ state: 'visible', timeout: 5000 });
      await linkInfractor.click();
    } catch {
      console.log('⚠️ No encontrado con selector exacto, intentando alternativa...');
      try {
        // Intento 2: Selector parcial
        const linkAlt = page.locator('a:has-text("Infractor")');
        await linkAlt.first().click();
      } catch {
        console.log('⚠️ Segundo intento falló, intentando tercera alternativa...');
        // Intento 3: Buscar todos los links
        const links = await page.getByRole('link').all();
        for (const link of links) {
          const text = await link.textContent();
          if (text?.includes('Infractor')) {
            await link.click();
            break;
          }
        }
      }
    }
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    console.log('✅ Módulo Infractor y Sanción cargado');
    
  } catch (error) {
    console.error('❌ Error en inicialización:', error);
    throw error;
  }
}

/**
 * Realiza login en REGINSA SUNEDU (DEPRECATED - usar iniciarSesionYNavegar)
 */
export async function loginReginsa(page: Page): Promise<void> {
  console.log('🔐 Iniciando sesión en REGINSA SUNEDU...');
  
  await page.goto(CREDENCIALES.url);
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'Acceder Ahora' }).click();
  await page.waitForTimeout(1000);

  const inputUsuario = page.getByRole('textbox', { name: 'Usuario' });
  await inputUsuario.click();
  await inputUsuario.fill(CREDENCIALES.usuario);
  await page.waitForTimeout(300);

  const inputContraseña = page.getByRole('textbox', { name: 'Contraseña' });
  await inputContraseña.click();
  await inputContraseña.fill(CREDENCIALES.contraseña);
  await page.waitForTimeout(300);

  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  console.log('✅ Sesión iniciada correctamente');
}

/**
 * Navega a "Infractor y Sanción" (DEPRECATED - usar iniciarSesionYNavegar)
 */
export async function navegarAInfraccionSancion(page: Page): Promise<void> {
  console.log('📋 Navegando a Infractor y Sanción...');
  
  await page.getByRole('link', { name: ' Infractor y Sanción' }).click();
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  console.log('✅ En sección Infractor y Sanción');
}

/**
 * Abre el formulario de nuevo administrado
 */
export async function abrirFormularioNuevoAdministrado(page: Page): Promise<void> {
  console.log('➕ Abriendo formulario nuevo administrado...');
  
  await page.waitForLoadState('networkidle');
  const boton = await page.getByRole('button').nth(3);
  await boton.waitFor({ state: 'visible', timeout: 10000 });
  await boton.click();
  await page.waitForTimeout(1000);

  console.log('✅ Formulario abierto');
}

/**
 * Abre el formulario de registrar sanción
 */
export async function abrirFormularioRegistrarSancion(page: Page): Promise<void> {
  console.log('➕ Abriendo formulario registrar sanción...');
  
  try {
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Esperar a que el botón esté visible
    const boton = page.getByRole('button', { name: 'Registrar Sanción' });
    await boton.waitFor({ state: 'visible', timeout: 10000 });
    await page.waitForTimeout(500);  // Pequeña espera antes de click
    await boton.click();
    await page.waitForTimeout(2000);  // Espera después de click para que el modal abra
    
    console.log('✅ Formulario abierto correctamente');
  } catch (error) {
    console.warn('⚠️ Intento 1 falló, intentando alternativa...');
    try {
      await page.waitForTimeout(500);
      const botonAlt = page.getByRole('button').filter({ hasText: /Registrar|Sanción/ }).first();
      await botonAlt.waitFor({ state: 'visible', timeout: 10000 });
      await page.waitForTimeout(500);
      await botonAlt.click();
      await page.waitForTimeout(2000);  // Espera para que el modal abra
      console.log('✅ Formulario abierto (alternativa)');
    } catch (error2) {
      console.error('❌ No se pudo abrir el formulario:', error2 instanceof Error ? error2.message : String(error2));
      throw error2;
    }
  }
}

/**
 * Genera número aleatorio entre min y max
 */
export function generarNumeroAleatorio(min: number = 100, max: number = 9999): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Obtiene un administrado aleatorio de la lista
 * SOLUCIÓN FINAL CORRECTA PARA PRIMENNG (con sincronización del DOM)
 */
export async function obtenerAdministradoAleatorio(page: Page): Promise<string> {
  console.log('🎲 Seleccionando administrado aleatorio...');
  
  try {
    // PASO 0: Hacer clic en el dropdown para abrirlo
    console.log('   Paso 0: Abriendo dropdown...');
    const dropdown = page.locator('p-dropdown[formcontrolname="idAdministrado"], p-dropdown[formcontrolname="administrado"]').first();
    
    if (await dropdown.isVisible({ timeout: 5000 }).catch(() => false)) {
      await dropdown.click();
      await page.waitForTimeout(500);
      console.log('   ✓ Dropdown clickeado');
    } else {
      console.warn('   ⚠️ Dropdown no visible, intentando alternativa...');
      const allDropdowns = await page.locator('p-dropdown').all();
      if (allDropdowns.length > 0) {
        await allDropdowns[0].click();
        await page.waitForTimeout(500);
      }
    }

    // PASO 1: Esperar que el panel del dropdown esté visible
    console.log('   Paso 1: Esperando panel del dropdown...');
    const panel = page.locator('.p-dropdown-panel');
    await panel.waitFor({ state: 'visible', timeout: 10000 });
    console.log('   ✓ Panel visible');

    // PASO 2: Esperar que existan opciones en el panel
    console.log('   Paso 2: Esperando opciones...');
    const options = panel.locator('.p-dropdown-item');
    await options.first().waitFor({ state: 'visible', timeout: 10000 });
    const count = await options.count();
    console.log(`   ✓ ${count} opciones encontradas`);

    if (count === 0) {
      throw new Error('No hay opciones en el dropdown de Administrado');
    }

    // PASO 3: Seleccionar opción aleatoria
    console.log('   Paso 3: Seleccionando opción aleatoria...');
    const indiceAleatorio = Math.floor(Math.random() * count);
    const optionSeleccionada = options.nth(indiceAleatorio);
    
    const administradoSeleccionado = (await optionSeleccionada.innerText())?.trim() || `Opcion_${indiceAleatorio}`;
    console.log(`   Opción ${indiceAleatorio + 1}/${count}: "${administradoSeleccionado}"`);
    
    // PASO 4: Clickear la opción
    console.log('   Paso 4: Clickeando opción...');
    
    // Scroll into view si es necesario
    await optionSeleccionada.scrollIntoViewIfNeeded();
    
    // Pequeño delay sin esperar (usar setImmediate en lugar de waitForTimeout)
    await new Promise(r => setTimeout(r, 100));
    
    // Hacer el clic
    await optionSeleccionada.click({ force: true });
    
    // PASO 5: Esperar que el panel del dropdown se cierre (indicador de selección exitosa)
    console.log('   Paso 5: Esperando confirmación del cambio...');
    const panelDropdown = page.locator('.p-dropdown-panel');
    
    // Esperar a que el panel desaparezca (indicador de que la selección se procesó)
    try {
      await panelDropdown.waitFor({ state: 'hidden', timeout: 3000 });
      console.log(`   ✅ Opción seleccionada y confirmada\n`);
    } catch (e) {
      // Si el panel no desaparece, seguir adelante (a veces sucede)
      console.log(`   ⚠️  Panel no desapareció, pero continuando...\n`);
    }
    
    return administradoSeleccionado;
  } catch (error) {
    console.error('   ❌ Error en obtenerAdministradoAleatorio:', error instanceof Error ? error.message : String(error));
    throw error;
  }
}

/**
 * Genera expediente con formato: Exp N° XXXX-2026
 */
export function generarExpediente(): string {
  const numero = generarNumeroAleatorio(100, 9999);
  return `Exp N° ${numero}-2026`;
}

/**
 * Genera resolución con formato: Res N° XXXX-2026
 */
export function generarResolucion(): string {
  const numero = generarNumeroAleatorio(100, 9999);
  return `Res N° ${numero}-2026`;
}

/**
 * Selecciona una sanción aleatoria (primera o segunda)
 */
export async function seleccionarSancionAleatoria(page: Page): Promise<string> {
  console.log('🎲 Seleccionando sanción aleatoria...');
  
  const sanciones = ['RIS 018-2015-MINEDU', 'RIS 018-2015-MINEDU'];
  const sancionAleatoria = sanciones[Math.floor(Math.random() * sanciones.length)];

  await page.locator('#pn_id_72').getByRole('combobox').click();
  await page.waitForTimeout(300);
  
  await page.getByRole('option', { name: sancionAleatoria }).click();
  await page.waitForTimeout(300);

  console.log(`✅ Sanción seleccionada: ${sancionAleatoria}`);
  return sancionAleatoria;
}

/**
 * Selecciona tipo de infractor aleatorio
 */
export async function seleccionarTipoInfratorAleatorio(page: Page): Promise<string> {
  console.log('🎲 Seleccionando tipo infractor aleatorio...');
  
  await page.getByRole('combobox', { name: 'Seleccione' }).click();
  await page.waitForTimeout(300);

  const options = await page.getByRole('option').all();
  const indiceAleatorio = Math.floor(Math.random() * options.length);
  const opcionSeleccionada = options[indiceAleatorio];
  const nombreOpcion = await opcionSeleccionada.textContent();

  await opcionSeleccionada.click();
  await page.waitForTimeout(300);

  console.log(`✅ Tipo infractor seleccionado: ${nombreOpcion}`);
  return nombreOpcion || 'desconocido';
}

/**
 * Selecciona tipo de multa aleatorio (Soles o IUT)
 */
export async function seleccionarTipoMultaAleatorio(): Promise<'Soles' | 'IUT'> {
  const tiposMulta: ('Soles' | 'IUT')[] = ['Soles', 'IUT'];
  return tiposMulta[Math.floor(Math.random() * tiposMulta.length)];
}

/**
 * Obtiene screenshot con nombre del caso
 */
export async function capturarPantalla(page: Page, nombreCaso: string, paso: string): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const nombreArchivo = `./screenshots/${nombreCaso}_${paso}_${timestamp}.png`;
  
  await page.screenshot({ path: nombreArchivo });
  console.log(`📸 Screenshot: ${nombreArchivo}`);
  
  return nombreArchivo;
}

/**
 * Obtiene screenshot mejorado con información detallada del caso
 * Formato: CASO_PASO_RUC_RAZONSOCIAL_TIMESTAMP.png
 */
export async function capturarPantallaMejorada(
  page: Page,
  caso: string,
  paso: string,
  ruc: string,
  razonSocial: string
): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const nombreLimpio = razonSocial.replace(/\s+/g, '_').substring(0, 20);
  // Incluye: caso_paso_razonsocial_timestamp (sin RUC, EXP, etc)
  const nombreArchivo = `./screenshots/${caso}_${paso}_${nombreLimpio}_${timestamp}.png`;
  
  // Captura full page para ver todo el contenido
  await page.screenshot({ path: nombreArchivo, fullPage: true });
  console.log(`📸 Screenshot: ${nombreArchivo}`);
  
  return nombreArchivo;
}

/**
 * Genera RUC aleatorio de 11 dígitos
 */
export function generarRUC(): string {
  return Math.floor(Math.random() * 99999999999)
    .toString()
    .padStart(11, '0');
}
