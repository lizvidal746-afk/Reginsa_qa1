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
 * Completa cabecera de reconsideración (checkbox, archivo, número y fecha)
 * Retorna el número de reconsideración generado.
 */
function formatearFecha(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function parseFechaTexto(texto: string): Date | null {
  const match = texto.match(/(\d{2})\/(\d{2})\/(\d{4})/);
  if (!match) return null;
  const [_, dd, mm, yyyy] = match;
  const date = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function calcularFechaReconsideracion(fechaResolucion: Date | null): Date {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const base = fechaResolucion ?? new Date();
  const minFecha = new Date(base);
  minFecha.setDate(minFecha.getDate() + 1);

  const maxFecha = new Date();
  maxFecha.setHours(0, 0, 0, 0);

  if (minFecha > maxFecha) {
    throw new Error('No hay fecha válida de reconsideración (resolución >= hoy).');
  }

  const diff = Math.floor((maxFecha.getTime() - minFecha.getTime()) / (24 * 60 * 60 * 1000));
  const offset = Math.floor(Math.random() * (diff + 1));
  const fechaReconsideracion = new Date(minFecha);
  fechaReconsideracion.setDate(minFecha.getDate() + offset);
  return fechaReconsideracion;
}

export function generarFechaPonderada(
  pesosPorAnio: Array<{ anio: number; peso: number }>,
  fechaMaxima: Date
): Date {
  const pesosValidos = pesosPorAnio.filter(p => p.anio >= 0 && p.peso > 0);
  const total = pesosValidos.reduce((acc, p) => acc + p.peso, 0);
  if (total <= 0) {
    return new Date(fechaMaxima);
  }

  const r = Math.random() * total;
  let acumulado = 0;
  let anioSeleccionado = pesosValidos[0].anio;
  for (const p of pesosValidos) {
    acumulado += p.peso;
    if (r <= acumulado) {
      anioSeleccionado = p.anio;
      break;
    }
  }

  const inicio = new Date(anioSeleccionado, 0, 1);
  const fin = new Date(anioSeleccionado, 11, 31);
  const limite = fechaMaxima < fin ? fechaMaxima : fin;

  if (limite <= inicio) {
    return new Date(limite);
  }

  const diffMs = limite.getTime() - inicio.getTime();
  const randomMs = Math.floor(Math.random() * (diffMs + 1));
  return new Date(inicio.getTime() + randomMs);
}

export async function completarCabeceraReconsideracion(
  page: Page,
  rutaArchivo: string,
  fechaReconsideracion?: Date
): Promise<string> {
  const cabeceraPanel = page.getByRole('tabpanel').filter({ hasText: /Datos del administrado/i }).first();
  const tabDatos = page.getByRole('tab', { name: /Datos del administrado/i });
  if (await tabDatos.isVisible().catch(() => false)) {
    const selected = await tabDatos.getAttribute('aria-selected').catch(() => 'true');
    if (selected !== 'true') {
      await tabDatos.click();
      await page.waitForTimeout(1000);
    }
  }
  const scope = (await cabeceraPanel.isVisible().catch(() => false)) ? cabeceraPanel : page;

  const btnEditarCabecera = page.getByRole('button', { name: 'Editar cabecera' });
  await btnEditarCabecera.waitFor({ state: 'visible', timeout: 8000 });
  const tryHabilitarEdicion = async () => {
    const enabled = await btnEditarCabecera.isEnabled().catch(() => false);
    if (enabled) {
      await btnEditarCabecera.click();
      await page.waitForTimeout(1500);
      return;
    }

    // Si ya está en modo edición, el botón puede estar deshabilitado
    const btnGuardar = page.getByRole('button', { name: 'Guardar cabecera' });
    const guardEnabled = await btnGuardar.isEnabled().catch(() => false);
    if (guardEnabled) return;

    // Esperar un poco más por si habilita edición
    for (let i = 0; i < 6; i++) {
      await page.waitForTimeout(1000);
      const enabledNow = await btnEditarCabecera.isEnabled().catch(() => false);
      if (enabledNow) {
        await btnEditarCabecera.click();
        await page.waitForTimeout(1500);
        return;
      }
    }
  };

  await tryHabilitarEdicion();

  const btnGuardarCabecera = page.getByRole('button', { name: 'Guardar cabecera' });
  for (let i = 0; i < 6; i++) {
    const enabled = await btnGuardarCabecera.isEnabled().catch(() => false);
    if (enabled) break;
    await page.waitForTimeout(800);
  }

  const labelPresento = scope.locator('label[for="presentoReconsideracion"]').first();
  if (await labelPresento.isVisible().catch(() => false)) {
    await labelPresento.scrollIntoViewIfNeeded().catch(() => {});
  }

  const presentoInput = scope.locator('input#presentoReconsideracion').first();
  const presentoBox = scope.locator('p-checkbox[inputid="presentoReconsideracion"] .p-checkbox-box').first();
  if (await presentoInput.isVisible().catch(() => false)) {
    for (let intento = 0; intento < 5; intento++) {
      const enabled = await presentoInput.isEnabled().catch(() => false);
      const checked = await presentoInput.isChecked().catch(() => false);
      if (checked) break;
      if (enabled) {
        if (await presentoBox.isVisible().catch(() => false)) {
          await presentoBox.click({ force: true });
        } else {
          await scope.locator('label[for="presentoReconsideracion"]').click({ force: true }).catch(() => {});
        }
        await page.waitForTimeout(800);
      } else {
        await page.waitForTimeout(800);
      }
    }
  }

  const seccionReconsideracion = scope.locator('label').filter({ hasText: /Resoluci[oó]n de Reconsideraci[oó]n/i }).first();
  for (let intento = 0; intento < 4; intento++) {
    if (await seccionReconsideracion.isVisible().catch(() => false)) break;
    if (await presentoBox.isVisible().catch(() => false)) {
      await presentoBox.click({ force: true });
    } else if (await labelPresento.isVisible().catch(() => false)) {
      await labelPresento.click({ force: true });
    }
    await page.waitForTimeout(1500);
  }
  await seccionReconsideracion.waitFor({ state: 'visible', timeout: 12000 });
  await seccionReconsideracion.scrollIntoViewIfNeeded().catch(() => {});

  // 1) Adjuntar archivo de reconsideración
  const fileUpload = seccionReconsideracion
    .locator('xpath=following::p-fileupload[@name="rutaArchivoReconsideracion" or @name="rutaArchivoRecons"][1]')
    .first();
  const fileInput = fileUpload.locator('input[type="file"]').first();
  const nombreArchivo = rutaArchivo.split(/[/\\]/).pop() || '';
  await fileInput.waitFor({ state: 'attached', timeout: 10000 });
  await fileInput.setInputFiles(rutaArchivo);
  const archivoNombre = scope.locator('.p-fileupload-filename, .p-fileupload-files').filter({ hasText: nombreArchivo }).first();
  const archivoTexto = scope.getByText(nombreArchivo).first();
  const archivoRuta = scope.locator('text=/Archivo:/i').first();
  const botonVerReconsideracion = scope.getByRole('button', { name: /Ver reconsideraci[oó]n/i }).first();
  const inputValor = await fileInput.inputValue().catch(() => '');
  let archivoVisible = await archivoNombre.isVisible().catch(() => false)
    || await archivoTexto.isVisible().catch(() => false)
    || await archivoRuta.isVisible().catch(() => false)
    || await botonVerReconsideracion.isEnabled().catch(() => false)
    || inputValor.includes(nombreArchivo);
  for (let i = 0; i < 4 && !archivoVisible; i++) {
    await page.waitForTimeout(1200);
    const valorActual = await fileInput.inputValue().catch(() => '');
    archivoVisible = await archivoNombre.isVisible().catch(() => false)
      || await archivoTexto.isVisible().catch(() => false)
      || await archivoRuta.isVisible().catch(() => false)
      || await botonVerReconsideracion.isEnabled().catch(() => false)
      || valorActual.includes(nombreArchivo);
  }
  if (!archivoVisible) {
    throw new Error('No se pudo validar el archivo de reconsideración.');
  }

  // 2) Número de reconsideración
  const fechaUsar = fechaReconsideracion ?? new Date();
  const numeroAleatorio = String(Math.floor(Math.random() * 9000) + 1000);
  const numeroReconsideracion = `Reconsid N° ${numeroAleatorio}-${fechaUsar.getFullYear()}`;
  const inputNumero = page
    .locator('label', { hasText: /Nº\s*de\s*Reconsideraci[oó]n/i })
    .locator('..')
    .locator('input[formcontrolname="desResolucionReconsideracion"], input')
    .first();
  await inputNumero.waitFor({ state: 'attached', timeout: 20000 });
  for (let i = 0; i < 8; i++) {
    const visible = await inputNumero.isVisible().catch(() => false);
    const enabled = await inputNumero.isEnabled().catch(() => false);
    if (visible && enabled) break;
    if (await btnEditarCabecera.isEnabled().catch(() => false)) {
      await btnEditarCabecera.click().catch(() => {});
    }
    if (await labelPresento.isVisible().catch(() => false)) {
      await labelPresento.click({ force: true }).catch(() => {});
    }
    await page.waitForTimeout(800);
  }
  if (!(await inputNumero.isVisible().catch(() => false))) {
    throw new Error('No se encontró el campo "N° de Reconsideración".');
  }
  if (!(await inputNumero.isEnabled().catch(() => false))) {
    throw new Error('El campo "N° de Reconsideración" está deshabilitado.');
  }
  await inputNumero.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(1200);
  await inputNumero.fill(numeroReconsideracion);
  await page.waitForTimeout(2000);
  const numeroValor = await inputNumero.inputValue().catch(() => '');
  if (!numeroValor.includes(numeroReconsideracion)) {
    await inputNumero.fill(numeroReconsideracion);
    await page.waitForTimeout(800);
  }

  // 3) Fecha de reconsideración (con botón de fecha)
  const fechaInput = page
    .locator('label', { hasText: /Fecha\s*de\s*Reconsideraci[oó]n/i })
    .locator('..')
    .locator('p-calendar[formcontrolname="fechaResolucionReconsideracion"], p-calendar[formcontrolname="fechaReconsideracion"], input')
    .locator('input')
    .first();
  await fechaInput.waitFor({ state: 'visible', timeout: 20000 });
  await fechaInput.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(1200);
  const fechaTexto = formatearFecha(fechaUsar);

  for (let i = 0; i < 6; i++) {
    const enabled = await fechaInput.isEnabled().catch(() => false);
    if (enabled) break;
    if (await btnEditarCabecera.isEnabled().catch(() => false)) {
      await btnEditarCabecera.click().catch(() => {});
    }
    if (await labelPresento.isVisible().catch(() => false)) {
      await labelPresento.click({ force: true }).catch(() => {});
    }
    await page.waitForTimeout(800);
  }
  if (!(await fechaInput.isEnabled().catch(() => false))) {
    throw new Error('El campo "Fecha de Reconsideración" está deshabilitado.');
  }

  const setFechaPorTexto = async () => {
    const enabled = await fechaInput.isEnabled().catch(() => false);
    if (!enabled) return false;
    await fechaInput.scrollIntoViewIfNeeded().catch(() => {});
    await fechaInput.click({ force: true }).catch(() => {});
    await fechaInput.fill(fechaTexto);
    await page.keyboard.press('Tab').catch(() => {});
    await fechaInput.blur().catch(() => {});
    await page.waitForTimeout(800);
    const valor = await fechaInput.inputValue().catch(() => '');
    return valor.includes(fechaTexto);
  };

  const setFechaPorCalendario = async () => {
    try {
      const panelId = await fechaInput.getAttribute('aria-controls').catch(() => null);
      const calendarContainer = fechaInput.locator('..');
      const trigger = calendarContainer.locator('button[aria-label="Choose Date"]').first();
      if (await trigger.isVisible().catch(() => false)) {
        await trigger.click({ force: true });
      }
      const calendario = panelId ? page.locator(`#${panelId}`) : page.locator('.p-datepicker').last();
      await calendario.waitFor({ state: 'visible', timeout: 8000 }).catch(() => {});

      const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      const targetMonth = monthNames[fechaUsar.getMonth()];
      const targetYear = String(fechaUsar.getFullYear());
      const prevBtn = calendario.getByRole('button', { name: /Previous Month/i }).first();
      const nextBtn = calendario.getByRole('button', { name: /Next Month/i }).first();

      const getVisibleMonthYear = async () => {
        const monthText = (await calendario.getByRole('button', { name: /Choose Month/i }).first().textContent().catch(() => ''))?.toLowerCase() || '';
        const yearText = (await calendario.getByRole('button', { name: /Choose Year/i }).first().textContent().catch(() => ''))?.trim() || '';
        return { monthText, yearText };
      };

      for (let i = 0; i < 24; i++) {
        const { monthText, yearText } = await getVisibleMonthYear();
        if (monthText.includes(targetMonth) && yearText.includes(targetYear)) break;
        if (yearText > targetYear || (yearText === targetYear && monthText.localeCompare(targetMonth) > 0)) {
          if (await prevBtn.isVisible().catch(() => false)) await prevBtn.click();
        } else {
          if (await nextBtn.isVisible().catch(() => false)) await nextBtn.click();
        }
        await page.waitForTimeout(200);
      }

      const diaBtn = calendario.getByRole('gridcell', { name: String(fechaUsar.getDate()) }).first();
      if (!(await diaBtn.isVisible().catch(() => false))) return false;
      await diaBtn.click();
      await page.waitForTimeout(800);
      const valor = await fechaInput.inputValue().catch(() => '');
      return valor.includes(fechaTexto);
    } catch {
      return false;
    }
  };

  const setFechaPorJs = async () => {
    try {
      await fechaInput.evaluate((input, valor) => {
        const el = input as HTMLInputElement | null;
        if (el) {
          el.value = valor;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }, fechaTexto);
      await page.waitForTimeout(800);
      const valor = await fechaInput.inputValue().catch(() => '');
      return valor.includes(fechaTexto);
    } catch {
      return false;
    }
  };

  let fechaOk = await setFechaPorTexto();
  if (!fechaOk) {
    fechaOk = await setFechaPorJs();
  }
  if (!fechaOk) {
    fechaOk = await setFechaPorCalendario();
  }

  // Revalidar checkbox presentó reconsideración al final
  if (await presentoInput.isVisible().catch(() => false)) {
    const checkedFinal = await presentoInput.isChecked().catch(() => false);
    if (!checkedFinal) {
      if (await presentoBox.isVisible().catch(() => false)) {
        await presentoBox.click({ force: true });
      } else {
        await scope.locator('label[for="presentoReconsideracion"]').click({ force: true }).catch(() => {});
      }
      await page.waitForTimeout(600);
    }
  }

  const checkPresento = scope.locator('input#presentoReconsideracion');
  if (await checkPresento.count().catch(() => 0)) {
    const enabled = await checkPresento.isEnabled().catch(() => false);
    if (enabled && !(await checkPresento.isChecked().catch(() => false))) {
      await scope.locator('label[for="presentoReconsideracion"]').click({ force: true }).catch(() => {});
      await page.waitForTimeout(600);
    }
  }

  return numeroReconsideracion;
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
  if (process.env.SKIP_SCREENSHOTS === '1') {
    console.log('⏩ Captura omitida por SKIP_SCREENSHOTS=1');
    return '';
  }
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const nombreArchivo = `./screenshots/${nombreCaso}_${paso}_${timestamp}.png`;
  await page.screenshot({ path: nombreArchivo });
  console.log(`📸 Screenshot: ${nombreArchivo}`);
  return nombreArchivo;
}

function normalizarParaNombre(valor: string): string {
  return valor
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '')
    .substring(0, 40);
}

function normalizarParaComparar(valor: string): string {
  return valor
    .toUpperCase()
    .replace(/\d+/g, '')
    .replace(/[_\-\s]+/g, '')
    .trim();
}

function construirNombreScreenshot(
  caso: string,
  paso: string,
  ref1?: string,
  ref2?: string,
  modal?: string
): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
  const casoNorm = normalizarParaComparar(caso);
  const modalNorm = modal ? normalizarParaComparar(modal) : '';
  const incluirModal = modal && modalNorm && modalNorm !== casoNorm;

  const partes = [
    caso,
    incluirModal ? normalizarParaNombre(modal as string) : '',
    paso,
    ref1 ? normalizarParaNombre(ref1) : '',
    ref2 ? normalizarParaNombre(ref2) : '',
    timestamp
  ].filter(Boolean);
  return `./screenshots/${partes.join('_')}.png`;
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
  if (process.env.SKIP_SCREENSHOTS === '1') {
    console.log('⏩ Captura omitida por SKIP_SCREENSHOTS=1');
    return '';
  }
  const nombreArchivo = construirNombreScreenshot(caso, paso, ruc, razonSocial);
  // Captura full page para ver todo el contenido
  await page.screenshot({ path: nombreArchivo, fullPage: true });
  console.log(`📸 Screenshot: ${nombreArchivo}`);
  return nombreArchivo;
}

/**
 * Captura formulario lleno antes de guardar
 */
export async function capturarFormularioLleno(
  page: Page,
  caso: string,
  ref1?: string,
  ref2?: string,
  modal?: string,
  paso?: string
): Promise<string> {
  if (process.env.SKIP_SCREENSHOTS === '1') {
    console.log('⏩ Captura omitida por SKIP_SCREENSHOTS=1');
    return '';
  }
  const nombreArchivo = construirNombreScreenshot(caso, paso ?? 'FORMULARIO', ref1, ref2, modal);
  await page.screenshot({ path: nombreArchivo, fullPage: true });
  console.log(`📸 Screenshot formulario lleno: ${nombreArchivo}`);
  return nombreArchivo;
}

/**
 * Captura mensaje de éxito (toast verde)
 */
export async function capturarToastExito(
  page: Page,
  caso: string,
  etiqueta: string,
  ref1?: string,
  ref2?: string,
  modal?: string
): Promise<string | null> {
  if (process.env.SKIP_SCREENSHOTS === '1') {
    console.log('⏩ Captura omitida por SKIP_SCREENSHOTS=1');
    return null;
  }
  const toast = page
    .locator('.p-toast-message-success, .p-toast-message')
    .filter({ hasText: /registro|registrad|guardad|Éxito|exito/i })
    .first();

  const visible = await toast.isVisible({ timeout: 15000 }).catch(() => false);
  if (!visible) return null;

  const paso = /EXITO/i.test(etiqueta) ? etiqueta : `EXITO_${etiqueta}`;
  const nombreArchivo = construirNombreScreenshot(caso, paso, ref1, ref2, modal);
  await page.screenshot({ path: nombreArchivo, fullPage: true });
  console.log(`📸 Screenshot toast éxito: ${nombreArchivo}`);
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
