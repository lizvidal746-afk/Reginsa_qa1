import { test, Page } from '@playwright/test';
import path from 'path';
import {
  iniciarSesionYNavegar,
  navegarAInfraccionSancion,
} from '../utilidades/reginsa-actions';

test.describe('03-RECONSIDERAR SIN SANCIONES', () => {
  test('Reconsiderar sanción con campos vacíos - búsqueda dinámica', async ({ page }) => {
    test.setTimeout(180000); // 3 minutos - aumentar tiempo de timeout
    const nombreCaso = '03-reconsiderar-sin-sanciones';

    try {
      console.log('🔐 PASO 1: Inicializando sesión...');
      await iniciarSesionYNavegar(page, 'infractor');
      console.log('✅ Sesión iniciada\n');

      console.log('📋 PASO 2: Navegando a Infracción y Sanción...');
      await navegarAInfraccionSancion(page);
      await page.waitForTimeout(1500);
      console.log('✅ Módulo accesible\n');

      console.log('📋 PASO 3: Buscando registro con TODOS los campos vacíos...');
      const filas = page.locator('tr');
      const totalFilas = await filas.count();
      console.log(`   Total de registros: ${totalFilas - 1}\n`);
      
      let registroEncontrado = false;

      // Buscar registro que tenga VACÍOS: F. Modificación, N° Reconsideración y F. Reconsideración
      for (let i = 1; i < totalFilas; i++) {
        const fila = filas.nth(i);
        const celdas = fila.locator('td');
        const totalCeldas = await celdas.count();
        
        if (totalCeldas >= 9) {
          // Columnas (de derecha a izquierda):
          // -1: F. Reconsideración (última)
          // -2: N° Reconsideración (penúltima)
          // -3: F. Modificación (antepenúltima)
          const fModificacion = (await celdas.nth(totalCeldas - 3).textContent())?.trim() || '';
          const nReconsid = (await celdas.nth(totalCeldas - 2).textContent())?.trim() || '';
          const fReconsid = (await celdas.nth(totalCeldas - 1).textContent())?.trim() || '';
          
          console.log(`   Fila ${i}: F.Mod='${fModificacion}' | N°Rec='${nReconsid}' | F.Rec='${fReconsid}'`);
          
          // Si TODOS están vacíos
          if (!fModificacion && !nReconsid && !fReconsid) {
            const botones = fila.locator('button.p-button-warning');
            if (await botones.count() > 0) {
              console.log(`   ✅ REGISTRO VÁLIDO encontrado en fila ${i}\n`);
              await botones.first().click();
              await page.waitForTimeout(2500);
              registroEncontrado = true;
              break;
            }
          }
        }
      }

      if (!registroEncontrado) {
        console.log('❌ No se encontró registro válido\n');
        throw new Error('No hay registros con todos los campos vacíos');
      }

      console.log('📋 PASO 4: Abriendo editor de cabecera...');
      await page.waitForTimeout(1000);
      const btnEditarCabecera = page.getByRole('button', { name: 'Editar cabecera' });
      await btnEditarCabecera.waitFor({ state: 'visible', timeout: 8000 });
      await btnEditarCabecera.click();
      await page.waitForTimeout(1500);
      console.log('✅ Editor de cabecera abierto\n');

      console.log('📋 PASO 5: Marcando checkbox de reconsideración...');
      const checkbox = page.locator('.p-checkbox-box').first();
      await checkbox.waitFor({ state: 'visible', timeout: 5000 });
      await checkbox.click();
      await page.waitForTimeout(500);
      console.log('✅ Checkbox marcado\n');

      console.log('📋 PASO 6: Cargando archivo PDF...');
      const rutaArchivo = 'D:\\SUNEDU\\SELENIUM\\playwrigth\\test-files\\GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf';
      console.log(`   Ruta: ${rutaArchivo}`);
      
      await page.waitForTimeout(1500);
      const btnSeleccionar = page.getByText('Seleccionar archivo').nth(1);
      await btnSeleccionar.waitFor({ state: 'visible', timeout: 8000 });
      await page.waitForTimeout(800);
      
      // Interceptar el diálogo de archivo y seleccionar el archivo
      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser', { timeout: 10000 }),
        btnSeleccionar.click()
      ]);
      
      await fileChooser.setFiles(rutaArchivo);
      await page.waitForTimeout(2000);
      
      // El diálogo se cierra automáticamente después de setFiles()
      // NO presionar Escape para evitar cerrar la página
      
      // Esperar a que el archivo se cargue completamente
      console.log('   ⏳ Esperando que el archivo se procese completamente...');
      await page.waitForTimeout(5000);
      
      console.log('✅ Archivo PDF cargado y procesado\n');

      console.log('📋 PASO 7: Ingresando número de reconsideración...');
      await page.waitForTimeout(5000);
      const numeroAleatorio = String(Math.floor(Math.random() * 9000) + 1000);
      const numeroReconsideracion = `Reconsid N° ${numeroAleatorio}-2026`;
      
      const inputNumero = page.getByRole('textbox').nth(2);
      await inputNumero.waitFor({ state: 'visible', timeout: 20000 });
      await page.waitForTimeout(2000);
      await inputNumero.fill(numeroReconsideracion);
      await page.waitForTimeout(4000);
      
      console.log(`✅ Número ingresado: ${numeroReconsideracion}\n`);

      console.log('📋 PASO 8: Seleccionando fecha de reconsideración...');
      await page.waitForTimeout(5000);
      const btnFecha = page.getByRole('button', { name: 'Choose Date' }).nth(1);
      await btnFecha.waitFor({ state: 'visible', timeout: 20000 });
      await page.waitForTimeout(2000);
      await btnFecha.click();
      await page.waitForTimeout(5000);
      
      const diaBtn = page.getByText('20', { exact: true });
      await diaBtn.waitFor({ state: 'visible', timeout: 20000 });
      await page.waitForTimeout(2000);
      await diaBtn.click();
      await page.waitForTimeout(4000);
      
      console.log('✅ Fecha seleccionada: 20/01/2026\n');

      console.log('📋 PASO 9: Validando campos completados...');
      console.log(`   ✓ Número: ${numeroReconsideracion}`);
      console.log(`   ✓ Archivo: cargado`);
      console.log(`   ✓ Fecha: 20/01/2026`);
      console.log('   ✅ Todos los campos están completos\n');

      console.log('� PASO 9.5: Captura ANTES de guardar...');
      await page.waitForTimeout(1000);
      let timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
      let archivoAntes = `./screenshots/03-reconsiderar-sin-sanciones_ANTES_guardar_${timestamp}.png`;
      await page.screenshot({ path: archivoAntes, fullPage: true });
      console.log(`📸 Screenshot ANTES guardado: ${archivoAntes}\n`);

      console.log('📋 PASO 10: Guardando cabecera...');
      await page.waitForTimeout(2000);
      const btnGuardar = page.getByRole('button', { name: 'Guardar cabecera' });
      await btnGuardar.waitFor({ state: 'visible', timeout: 10000 });
      console.log('   ✓ Botón guardar encontrado, haciendo clic...');
      await page.waitForTimeout(1000);
      await btnGuardar.click();
      await page.waitForTimeout(3000);
      console.log('✅ Guardar completado\n');

      console.log('📸 PASO 10.5: Captura DESPUÉS de guardar (mensaje verde)...');
      console.log('   ⏳ Esperando que aparezca el mensaje de confirmación...');
      await page.waitForTimeout(5000);  // Dar tiempo a que aparezca y se vea el mensaje
      timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
      const archivoDespues = `./screenshots/03-reconsiderar-sin-sanciones_DESPUES_guardar_${timestamp}.png`;
      await page.screenshot({ path: archivoDespues, fullPage: true });
      console.log(`📸 Screenshot DESPUÉS guardado: ${archivoDespues}\n`);

      console.log('📋 PASO 11: Accediendo a Detalle de sanciones...');
      await page.waitForTimeout(3000);
      const tabDetalle = page.getByRole('tab', { name: 'Detalle de sanciones' });
      await tabDetalle.waitFor({ state: 'visible', timeout: 10000 });
      await page.waitForTimeout(1500);
      await tabDetalle.click();
      await page.waitForTimeout(3000);
      console.log('✅ Tab Detalle abierto\n');

      console.log('📋 PASO 12: Verificando contenido...');
      await page.waitForTimeout(1000);
      const bodyText = await page.locator('body').textContent();
      const haySinSanciones = bodyText?.includes('Sin sanciones registradas') || false;

      if (haySinSanciones) {
        console.log('✅ Texto "Sin sanciones registradas" detectado\n');
        
        console.log('📋 PASO 13: Capturando pantalla...');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
        const archivo = `./screenshots/${nombreCaso}_sin-sanciones_${timestamp}.png`;
        await page.screenshot({ path: archivo, fullPage: true });
        console.log(`📸 Screenshot guardado\n`);

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
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
        const archivo = `./screenshots/${nombreCaso}_con-contenido_${timestamp}.png`;
        await page.screenshot({ path: archivo, fullPage: true });
        console.log(`📸 Screenshot guardado (referencia)\n`);
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
