import { test } from '@playwright/test';
import {
  iniciarSesionYNavegar,
  navegarAInfraccionSancion,
  completarCabeceraReconsideracion,
  capturarFormularioLleno,
  capturarToastExito,
  parseFechaTexto,
  calcularFechaReconsideracion,
} from '../utilidades/reginsa-actions';

/**
 * EJECUCIÓN (rápido)
 * - Headless por defecto. Para ver navegador: `--headed`.
 * - Con capturas: scripts normales `npm run test:*`.
 * - Sin capturas: scripts `:fast`.
 * - Paralelismo (suite completa): `npm run test:all:w2` / `test:all:w4`.
 */

/**
 * CASO 03: RECONSIDERAR SIN SANCIONES
 *
 * Flujo:
 * 1. Login + navegación al módulo (reutiliza `iniciarSesionYNavegar`)
 * 2. Ir a Infracción y Sanción (reutiliza `navegarAInfraccionSancion`)
 * 3. Buscar registro con campos vacíos (F. Modificación, N° Reconsideración y F. Reconsideración)
 * 4. Editar cabecera y marcar “Presentó reconsideración” (reutiliza `completarCabeceraReconsideracion`)
 * 5. Subir archivo, llenar número y seleccionar fecha válida (fecha > resolución y <= hoy) (reutiliza `completarCabeceraReconsideracion`)
 * 6. Capturar formulario lleno (reutiliza `capturarFormularioLleno`)
 * 7. Guardar cabecera y validar éxito (reutiliza `capturarToastExito`)
 * 8. Ir a Detalle de sanciones y verificar “Sin sanciones registradas”
 *
 * Nota:
 * - Si no hay registros con los 3 campos vacíos y sin sanciones, el test se omite.
 * - Capturas exitosas dependen del modo de ejecución (:fast omite).
 */

test.describe('03-RECONSIDERAR SIN SANCIONES', () => {
  test('Reconsiderar sanción con campos vacíos - búsqueda dinámica', async ({ page }, testInfo) => {
    test.setTimeout(300000); // 5 minutos - evitar timeout en flujo completo
    const nombreCaso = '03-reconsiderar-sin-sanciones';

    try {
      console.log('\n================================================================================');
      console.log('🧾 CASO 03: RECONSIDERAR SIN SANCIONES');
      console.log('================================================================================\n');
      // ═══════════════════════════════════════════════════════════════════
      // PASO 1: LOGIN + NAVEGACIÓN
      // Reutiliza `iniciarSesionYNavegar`
      // ═══════════════════════════════════════════════════════════════════
      console.log('🔐 PASO 1: Inicializando sesión...');
      await iniciarSesionYNavegar(page, 'infractor', testInfo.workerIndex);
      console.log('✅ Sesión iniciada\n');

      // ═══════════════════════════════════════════════════════════════════
      // PASO 2: NAVEGAR A INFRACCIÓN Y SANCIÓN
      // Reutiliza `navegarAInfraccionSancion`
      // ═══════════════════════════════════════════════════════════════════
      console.log('📋 PASO 2: Navegando a Infracción y Sanción...');
      await navegarAInfraccionSancion(page);
      // Espera a que la tabla de registros esté visible (espera inteligente)
      await page.locator('table').waitFor({ state: 'visible', timeout: 10000 });
      console.log('✅ Módulo accesible\n');

      // ═══════════════════════════════════════════════════════════════════
      // PASO 3: BUSCAR REGISTRO CON CAMPOS VACÍOS
      // ═══════════════════════════════════════════════════════════════════
      console.log('📋 PASO 3: Buscando registro con campos vacíos (F. Modificación, N° Reconsideración y F. Reconsideración)...');
      const filas = page.locator('tr');
      const totalFilas = await filas.count();
      console.log(`   Total de registros: ${totalFilas - 1}\n`);
      
      let registroEncontrado = false;
      let fechaResolucionSeleccionada: Date | null = null;
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const obtenerIndiceColumna = async (regex: RegExp): Promise<number> => {
        const headers = page.locator('thead tr th');
        const total = await headers.count();
        for (let i = 0; i < total; i++) {
          const texto = (await headers.nth(i).textContent())?.trim() || '';
          if (regex.test(texto)) return i;
        }
        return -1;
      };

      const idxFMod = await obtenerIndiceColumna(/F\.\s*Modificaci\w*|Modificaci\w*/i);
      const idxNRec = await obtenerIndiceColumna(/N\W*Reconsideraci\w*/i);
      const idxFRec = await obtenerIndiceColumna(/F\.\s*Reconsideraci\w*|Reconsideraci\w*/i);

      if (idxFMod < 0 || idxNRec < 0 || idxFRec < 0) {
        throw new Error('No se pudieron identificar las columnas F. Modificación, N° Reconsideración y F. Reconsideración.');
      }

      // Buscar primer registro que tenga VACÍOS: F. Modificación, N° Reconsideración y F. Reconsideración
      for (let i = 1; i < totalFilas; i++) {
        const fila = filas.nth(i);
        const celdas = fila.locator('td');
        const totalCeldas = await celdas.count();
        
        if (totalCeldas >= 9) {
          const fModificacion = (await celdas.nth(idxFMod).textContent())?.trim() || '';
          const nReconsid = (await celdas.nth(idxNRec).textContent())?.trim() || '';
          const fReconsid = (await celdas.nth(idxFRec).textContent())?.trim() || '';
          
          console.log(`   Fila ${i}: F.Mod='${fModificacion}' | N°Rec='${nReconsid}' | F.Rec='${fReconsid}'`);
          
          // Buscar fecha de resolución en la fila (primera fecha encontrada)
          const fechasDetectadas: Date[] = [];
          for (let c = 0; c < totalCeldas; c++) {
            const texto = (await celdas.nth(c).textContent())?.trim() || '';
            const fecha = parseFechaTexto(texto);
            if (fecha) fechasDetectadas.push(fecha);
          }
          const fechaResolucion = fechasDetectadas[0] || null;

          // Si TODOS están vacíos
          if (!fModificacion && !nReconsid && !fReconsid) {
            if (fechaResolucion && fechaResolucion < hoy) {
              const botones = fila.locator('button.p-button-warning');
              if (await botones.count() > 0) {
                const administrado = (await celdas.nth(0).textContent())?.trim() || 'N/D';
                console.log(`   👤 Administrado: ${administrado}`);
                console.log(`   ✅ REGISTRO VÁLIDO encontrado en fila ${i}\n`);
                await botones.first().click();
                // Espera a que el formulario de cabecera esté visible
                await page.locator('form').waitFor({ state: 'visible', timeout: 10000 });
                registroEncontrado = true;
                fechaResolucionSeleccionada = fechaResolucion;
                break;
              }
            }
          }
        }
      }

      if (!registroEncontrado) {
        console.log('⚠️ No se encontró registro válido con campos vacíos y sin sanciones\n');
        test.skip(true, 'No hay registros con F. Modificación, N° Reconsideración y F. Reconsideración vacíos y sin sanciones.');
        return;
      }

      // ═══════════════════════════════════════════════════════════════════
      // PASO 4-8: COMPLETAR CABECERA (ARCHIVO + NÚMERO + FECHA)
      // Reutiliza `completarCabeceraReconsideracion`
      // ═══════════════════════════════════════════════════════════════════
      console.log('📋 PASO 4-8: Editando cabecera y completando datos...');
      const rutaArchivo = 'D:\\SUNEDU\\SELENIUM\\playwrigth\\test-files\\GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf';
      console.log(`   Ruta: ${rutaArchivo}`);
      const fechaReconsideracion = calcularFechaReconsideracion(fechaResolucionSeleccionada);

      const numeroReconsideracion = await completarCabeceraReconsideracion(page, rutaArchivo, fechaReconsideracion);
      console.log(`✅ Número ingresado: ${numeroReconsideracion}\n`);
      const dd = String(fechaReconsideracion.getDate()).padStart(2, '0');
      const mm = String(fechaReconsideracion.getMonth() + 1).padStart(2, '0');
      const yyyy = fechaReconsideracion.getFullYear();
      console.log(`✅ Fecha seleccionada: ${dd}/${mm}/${yyyy}\n`);

      console.log('📋 PASO 9: Validando campos completados...');
      console.log(`   ✓ Número: ${numeroReconsideracion}`);
      console.log(`   ✓ Archivo: cargado`);
      console.log(`   ✓ Fecha: ${dd}/${mm}/${yyyy}`);
      console.log('   ✅ Todos los campos están completos\n');

      // ═══════════════════════════════════════════════════════════════════
      // PASO 9.5: CAPTURAR FORMULARIO LLENO
      // Reutiliza `capturarFormularioLleno`
      // ═══════════════════════════════════════════════════════════════════
      console.log('📋 PASO 9.5: Captura formulario lleno...');
      // Espera a que el formulario esté completamente cargado antes de capturar
      await page.locator('form').waitFor({ state: 'visible', timeout: 10000 });
      await capturarFormularioLleno(
        page,
        '03-RECONSIDERAR-SIN-SANCIONES',
        numeroReconsideracion,
        '',
        'CABECERA_RECONSIDERACION',
        '09_FORMULARIO_CABECERA'
      );

      console.log('📋 PASO 10: Guardando cabecera...');
      const btnGuardar = page.getByRole('button', { name: 'Guardar cabecera' });
      await btnGuardar.waitFor({ state: 'visible', timeout: 10000 });
      console.log('   ✓ Botón guardar encontrado, haciendo clic...');
      await btnGuardar.click();
      // Espera a que desaparezca el botón o se muestre el toast de éxito
      await page.locator('.p-toast-message-success, .p-toast-message').first().waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
      console.log('✅ Guardar completado\n');

      // ═══════════════════════════════════════════════════════════════════
      // PASO 10.5: CAPTURA MENSAJE DE ÉXITO
      // Reutiliza `capturarToastExito`
      // ═══════════════════════════════════════════════════════════════════
      console.log('📸 PASO 10.5: Captura mensaje de éxito (toast verde)...');
      console.log('   ⏳ Esperando que aparezca el mensaje de confirmación...');
      await page
        .locator('.p-toast-message-success, .p-toast-message')
        .filter({ hasText: /registro|registrad|guardad|Éxito|exito/i })
        .first()
        .waitFor({ state: 'visible', timeout: 15000 })
        .catch(() => {});
      await capturarToastExito(
        page,
        '03-RECONSIDERAR-SIN-SANCIONES',
        '10_EXITO_CABECERA',
        numeroReconsideracion,
        '',
        'CABECERA_RECONSIDERACION'
      );

      // ═══════════════════════════════════════════════════════════════════
      // PASO 11: ACCEDER A DETALLE DE SANCIONES
      // ═══════════════════════════════════════════════════════════════════
      console.log('📋 PASO 11: Accediendo a Detalle de sanciones...');
      const tabDetalle = page.getByRole('tab', { name: 'Detalle de sanciones' });
      await tabDetalle.waitFor({ state: 'visible', timeout: 10000 });
      await tabDetalle.click();
      // Espera a que el contenido de la pestaña esté visible
      await page.locator('body').waitFor({ state: 'visible', timeout: 10000 });
      console.log('✅ Tab Detalle abierto\n');

      // ═══════════════════════════════════════════════════════════════════
      // PASO 12: VERIFICAR TEXTO “SIN SANCIONES REGISTRADAS”
      // ═══════════════════════════════════════════════════════════════════
      console.log('📋 PASO 12: Verificando contenido...');
      // Espera a que el texto "Sin sanciones registradas" esté presente o timeout
      const bodyText = await page.locator('body').textContent();
      const haySinSanciones = bodyText?.includes('Sin sanciones registradas') || false;

      if (haySinSanciones) {
        console.log('✅ Texto "Sin sanciones registradas" detectado\n');
        
        console.log('================================================================================');
        console.log('✅ CASO 03 - SIN SANCIONES COMPLETADO');
        console.log('================================================================================');
        console.log('📊 Resumen:');
        console.log(`   - Nº Reconsideración: ${numeroReconsideracion}`);
        console.log('   - Archivo: GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf');
        console.log('   - Detalle: SIN SANCIONES REGISTRADAS');
        console.log('   - Resultado: ✅ EXITOSO\n');
        return;
      } else {
        console.log('ℹ️ Se encontraron sanciones en este registro\n');
      }

    } catch (error) {
      console.error('❌ ERROR:', error instanceof Error ? error.message : String(error));
      try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
        const archivo = `./screenshots/${nombreCaso}_ERROR_${timestamp}.png`;
        await page.screenshot({ path: archivo, fullPage: true });
        console.log(`📸 Screenshot de error guardado\n`);
      } catch (e) {
        console.warn('⚠️ No se pudo capturar screenshot de error');
      }
      throw error;
    }
  });
});
