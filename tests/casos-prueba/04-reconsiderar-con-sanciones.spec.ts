import { test } from '@playwright/test';
import { iniciarSesionYNavegar } from '../utilidades/reginsa-actions';

test.describe('04-RECONSIDERAR CON SANCIONES', () => {
  test('Reconsiderar - Buscar y abrir modal de sanción', async ({ page }) => {
    test.setTimeout(180000);

    try {
      console.log('\n================================================================================');
      console.log('🔍 CASO 04: RECONSIDERAR CON SANCIONES');
      console.log('================================================================================\n');

      // PASO 1: Iniciar sesión
      console.log('📋 PASO 1: Iniciando sesión...');
      await iniciarSesionYNavegar(page, 'infractor');
      console.log('✅ Sesión iniciada\n');

      // PASO 2: Buscar registro
      console.log('📋 PASO 2: Buscando registro...');
      await page.waitForTimeout(2000);
      const filas = page.locator('tr');
      let registroEncontrado = false;
      let paginaActual = 1;
      const maxPaginas = 15;
      let numeroFilaEncontrada = -1;

      while (!registroEncontrado && paginaActual <= maxPaginas) {
        const totalFilas = await filas.count();
        for (let i = 1; i < totalFilas && !registroEncontrado; i++) {
          const fila = filas.nth(i);
          const celdas = fila.locator('td');
          const totalCeldas = await celdas.count();

          if (totalCeldas >= 9) {
            const fModificacion = (await celdas.nth(totalCeldas - 3).textContent())?.trim() || '';
            const nReconsid = (await celdas.nth(totalCeldas - 2).textContent())?.trim() || '';
            const fReconsid = (await celdas.nth(totalCeldas - 1).textContent())?.trim() || '';

            if (!fModificacion && !nReconsid && !fReconsid) {
              const btnExpand = fila.locator('button').first();
              if (await btnExpand.count() > 0) {
                await btnExpand.click();
                await page.waitForTimeout(2000);

                const pageContent = await page.content();
                const tieneTablaCompleta =
                  pageContent.includes('Tipo Infractor') &&
                  pageContent.includes('Hecho Infractor') &&
                  pageContent.includes('Sanción Impuesta') &&
                  pageContent.includes('¿Pagó?');

                if (tieneTablaCompleta && !pageContent.includes('Sin detalles de infracción')) {
                  numeroFilaEncontrada = i;
                  registroEncontrado = true;
                } else {
                  await btnExpand.click();
                  await page.waitForTimeout(800);
                }
              }
            }
          }
        }

        if (!registroEncontrado) {
          const btnNextPage = page.getByRole('button', { name: 'Next Page' });
          if (await btnNextPage.isEnabled().catch(() => false) && paginaActual < maxPaginas) {
            await btnNextPage.click();
            await page.waitForTimeout(1500);
            paginaActual++;
          } else {
            break;
          }
        }
      }

      if (!registroEncontrado) {
        throw new Error(`❌ No se encontró registro válido`);
      }
      console.log('✅ Registro encontrado\n');

      // PASO 3: Clickear RECONSIDERAR
      console.log('📋 PASO 3: Clickeando RECONSIDERAR...');
      const filaSeleccionada = filas.nth(numeroFilaEncontrada);
      const btnReconsiderar = filaSeleccionada.locator('button.p-button-warning');
      await btnReconsiderar.click();
      await page.waitForTimeout(3000);
      console.log('✅ RECONSIDERAR clickeado\n');

      // PASO 4-10: Editar cabecera y guardar
      console.log('📋 PASO 4-10: Rellenando datos de cabecera...');
      const btnEditarCabecera = page.getByRole('button', { name: 'Editar cabecera' });
      await btnEditarCabecera.click();
      await page.waitForTimeout(1500);

      const checkbox = page.locator('.p-checkbox-box').first();
      await checkbox.click();
      await page.waitForTimeout(500);

      const rutaArchivo = 'D:\\SUNEDU\\SELENIUM\\playwrigth\\test-files\\GENERAL N° 00001-2026-SUNEDU-SG-OTI.pdf';
      const btnSeleccionar = page.getByText('Seleccionar archivo').nth(1);
      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser', { timeout: 10000 }),
        btnSeleccionar.click()
      ]);
      await fileChooser.setFiles(rutaArchivo);
      await page.waitForTimeout(7000);

      const numeroAleatorio = String(Math.floor(Math.random() * 9000) + 1000);
      const numeroReconsideracion = `Reconsid N° ${numeroAleatorio}-2026`;
      const inputNumero = page.getByRole('textbox').nth(2);
      await inputNumero.fill(numeroReconsideracion);
      await page.waitForTimeout(4000);

      const btnFecha = page.getByRole('button', { name: 'Choose Date' }).nth(1);
      await btnFecha.click();
      await page.waitForTimeout(5000);
      const diaBtn = page.getByText('20', { exact: true });
      await diaBtn.click();
      await page.waitForTimeout(4000);

      console.log('✅ Datos rellenados\n');

      // Guardar cabecera
      const btnGuardar = page.getByRole('button', { name: 'Guardar cabecera' });
      await btnGuardar.click();
      await page.waitForTimeout(5000);
      console.log('✅ Cabecera guardada\n');

      // PASO 11: Tab Detalle de sanciones
      console.log('📋 PASO 11: Accediendo a Detalle de sanciones...');
      const tabDetalle = page.getByRole('tab', { name: 'Detalle de sanciones' });
      await tabDetalle.click();
      await page.waitForTimeout(3000);
      console.log('✅ Tab Detalle abierto\n');

      // PASO 12: Procesar registros
      console.log('📋 PASO 12: Procesando detalles de sanciones...\n');
      
      const filasTR = page.locator('tr');
      const totalFilasTabla = await filasTR.count();
      console.log(`📊 Total de registros: ${totalFilasTabla}\n`);
      
      let registrosEditados = 0;
      const maxRegistrosAEditar = Math.min(5, totalFilasTabla - 1);

      for (let filaIdx = 1; filaIdx <= maxRegistrosAEditar && filaIdx < totalFilasTabla; filaIdx++) {
        console.log(`\n╔════════════════════════════════════════════════════════════════╗`);
        console.log(`║ REGISTRO ${filaIdx} de ${maxRegistrosAEditar}`);
        console.log(`╚════════════════════════════════════════════════════════════════╝\n`);

        const fila = filasTR.nth(filaIdx);
        const btnLapiz = fila.locator('button i.pi-pencil, button[icon="pi pi-pencil"]').first();
        
        try {
          await btnLapiz.waitFor({ state: 'visible', timeout: 8000 });
          await fila.scrollIntoViewIfNeeded();
          await page.waitForTimeout(800);
          
          console.log(`   🖱️  Abriendo modal...`);
          await btnLapiz.click();
          await page.waitForTimeout(4000);
          
          // Obtener checkboxes con selector ID para PAGÓ (más confiable)
          console.log(`   🔍 Obteniendo referencias de checkboxes...`);
          await page.waitForTimeout(1000);
          
          // Obtener checkboxes de sanciones por su posición
          const allInputs = page.locator('input[type="checkbox"]');
          const chkMulta = allInputs.first();
          const chkSuspension = allInputs.nth(1);
          const chkCancelacion = allInputs.nth(2);
          
          console.log(`   🔍 Verificando sanciones...`);
          await page.waitForTimeout(800);
          
          // Verificar sanciones marcadas
          const multaMarcada = await chkMulta.isChecked().catch(() => false);
          const suspensionMarcada = await chkSuspension.isChecked().catch(() => false);
          const cancelacionMarcada = await chkCancelacion.isChecked().catch(() => false);
          
          console.log(`   Sanciones encontradas:`);
          console.log(`      Multa: ${multaMarcada ? '✅ SÍ' : '⭕ NO'}`);
          console.log(`      Suspensión: ${suspensionMarcada ? '✅ SÍ' : '⭕ NO'}`);
          console.log(`      Cancelación: ${cancelacionMarcada ? '✅ SÍ' : '⭕ NO'}`);
          
          console.log(`   Marcando opciones...`);
          
          // FORCE RECOMPILE v2 - Marcar según lo encontrado
          if (multaMarcada) {
            console.log(`      → Multa encontrada, marcando PAGÓ + ¿Presentó recurso de reconsideración?`);
            
            // Marcar PAGÓ
            const esPagoYaMarcado = await page.evaluate(() => {
              return (document.querySelector('input#reconsPago') as HTMLInputElement)?.checked || false;
            });
            
            if (!esPagoYaMarcado) {
              console.log(`         PAGÓ no está marcado, clickeando vía JavaScript...`);
              
              await page.evaluate(() => {
                const label = document.querySelector('label[for="reconsPago"]') as HTMLElement;
                if (label) label.click();
              });
              await page.waitForTimeout(2500);
              
              const pagoCheckedFirst = await page.evaluate(() => {
                return (document.querySelector('input#reconsPago') as HTMLInputElement)?.checked || false;
              });
              
              if (!pagoCheckedFirst) {
                console.log(`         Reintentando clic doble vía JavaScript...`);
                await page.evaluate(() => {
                  const label = document.querySelector('label[for="reconsPago"]') as HTMLElement;
                  if (label) {
                    label.click();
                    label.click();
                  }
                });
                await page.waitForTimeout(2500);
              }
            }
            
            const pagoMarcado = await page.evaluate(() => {
              return (document.querySelector('input#reconsPago') as HTMLInputElement)?.checked || false;
            });
            console.log(`         ✓ PAGÓ: ${pagoMarcado ? '✅ MARCADO' : '⭕ NO'}`);
            
            // Marcar "¿Presentó recurso de reconsideración?"
            // Buscar por múltiples IDs posibles
            const recursoIds = ['presentoRecurso', 'presentaRecurso', 'presentoReconsideracion', 'presentaReconsideracion', 'recursoReconsideracion'];
            let recursoEncontrado = false;
            
            for (const idRecurso of recursoIds) {
              const recursoInput = await page.$(`input#${idRecurso}`);
              if (recursoInput) {
                const isChecked = await page.evaluate((id) => {
                  return (document.querySelector(`input#${id}`) as HTMLInputElement)?.checked || false;
                }, idRecurso);
                
                if (!isChecked) {
                  console.log(`         ¿Presentó recurso? no está marcado, clickeando vía JavaScript...`);
                  await page.evaluate((id) => {
                    const labelForId = document.querySelector(`label[for="${id}"]`) as HTMLElement;
                    if (labelForId) {
                      labelForId.click();
                    } else {
                      const input = document.querySelector(`input#${id}`) as HTMLInputElement;
                      if (input) input.click();
                    }
                  }, idRecurso);
                  await page.waitForTimeout(2000);
                }
                
                const recursoMarcado = await page.evaluate((id) => {
                  return (document.querySelector(`input#${id}`) as HTMLInputElement)?.checked || false;
                }, idRecurso);
                console.log(`         ✓ ¿Presentó recurso?: ${recursoMarcado ? '✅ MARCADO' : '⭕ NO'}`);
                recursoEncontrado = true;
                break;
              }
            }
            
            if (!recursoEncontrado) {
              console.log(`         ⚠️ No se encontró checkbox de "¿Presentó recurso de reconsideración?"`);
            }
          }
          
          // Marcar RECONSIDERA si hay CUALQUIER sanción (Multa, Suspensión, Cancelación)
          // FORCE RECOMPILE v3
          if (multaMarcada || suspensionMarcada || cancelacionMarcada) {
            const sanciones = [];
            if (multaMarcada) sanciones.push('Multa');
            if (suspensionMarcada) sanciones.push('Suspensión');
            if (cancelacionMarcada) sanciones.push('Cancelación');
            console.log(`      → ${sanciones.join(' + ')} encontrada(s), marcando RECONSIDERA`);
            console.log(`         Suspensión: ${suspensionMarcada}, Cancelación: ${cancelacionMarcada}`);
            
            // Verificar estado usando JavaScript
            const esReconsideraYaMarcado = await page.evaluate(() => {
              return (document.querySelector('input#reconsReconsidera') as HTMLInputElement)?.checked || false;
            });
            
            console.log(`         Estado inicial RECONSIDERA: ${esReconsideraYaMarcado ? '✅ YA' : '⭕ NO'}`);
            
            if (!esReconsideraYaMarcado) {
              console.log(`         RECONSIDERA no está marcado, clickeando vía JavaScript...`);
              
              // Usar JavaScript para hacer clic
              await page.evaluate(() => {
                const label = document.querySelector('label[for="reconsReconsidera"]') as HTMLElement;
                if (label) label.click();
              });
              await page.waitForTimeout(2500);
              
              // Reintento si no funcionó
              const reconsideraCheckFirst = await page.evaluate(() => {
                return (document.querySelector('input#reconsReconsidera') as HTMLInputElement)?.checked || false;
              });
              
              console.log(`         Después de primer clic: ${reconsideraCheckFirst ? '✅ SÍ' : '⭕ NO'}`);
              
              if (!reconsideraCheckFirst) {
                console.log(`         Reintentando clic doble vía JavaScript...`);
                await page.evaluate(() => {
                  const label = document.querySelector('label[for="reconsReconsidera"]') as HTMLElement;
                  if (label) {
                    label.click();
                    label.click();
                  }
                });
                await page.waitForTimeout(2500);
              }
            }
            const reconsideraMarcado = await page.evaluate(() => {
              return (document.querySelector('input#reconsReconsidera') as HTMLInputElement)?.checked || false;
            });
            console.log(`         ✓ RECONSIDERA FINAL: ${reconsideraMarcado ? '✅ MARCADO' : '⭕ NO'}`);
          }
          
          // Validar estado final usando selectores por ID (más confiable)
          console.log(`   Validando cambios finales...`);
          
          const multaFinal = await page.evaluate(() => {
            return (document.querySelector('input#reconsMulta') as HTMLInputElement)?.checked || false;
          });
          const suspensionFinal = await page.evaluate(() => {
            return (document.querySelector('input#reconsSuspension') as HTMLInputElement)?.checked || false;
          });
          const cancelacionFinal = await page.evaluate(() => {
            return (document.querySelector('input#reconsCancelacion') as HTMLInputElement)?.checked || false;
          });
          const pagoFinal = await page.evaluate(() => {
            return (document.querySelector('input#reconsPago') as HTMLInputElement)?.checked || false;
          });
          const reconsideraFinal = await page.evaluate(() => {
            return (document.querySelector('input#reconsReconsidera') as HTMLInputElement)?.checked || false;
          });
          
          console.log(`      Estado final: Multa: ${multaFinal ? '✅' : '⭕'} | Suspensión: ${suspensionFinal ? '✅' : '⭕'} | Cancelación: ${cancelacionFinal ? '✅' : '⭕'} | Pagó: ${pagoFinal ? '✅' : '⭕'} | Reconsidera: ${reconsideraFinal ? '✅' : '⭕'}`);
          
          // Guardar
          console.log(`   💾 Guardando...`);
          await page.waitForTimeout(2500);
          const btnAceptar = page.getByRole('button', { name: 'Aceptar' });
          await btnAceptar.waitFor({ state: 'visible', timeout: 8000 });
          await page.waitForTimeout(1500);
          await btnAceptar.click();
          
          // Captura de éxito
          console.log(`   ⏳ Esperando confirmación...`);
          await page.waitForTimeout(2000);
          let timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
          const archivoExito = `./screenshots/04-mensaje-exito-registro-${filaIdx}_${timestamp}.png`;
          await page.screenshot({ path: archivoExito, fullPage: true });
          console.log(`   📸 Captura guardada: ${archivoExito}`);
          
          await page.waitForTimeout(2000);
          
          console.log(`✅ Registro ${filaIdx} completado\n`);
          registrosEditados++;
          
        } catch (error) {
          console.warn(`⚠️ Error en registro ${filaIdx}: ${error instanceof Error ? error.message : String(error)}`);
          try {
            const btnCancelar = page.getByRole('button', { name: 'Cancelar' });
            if (await btnCancelar.isVisible().catch(() => false)) {
              await btnCancelar.click();
              await page.waitForTimeout(1500);
            }
          } catch (e) {
            console.log(`⚠️ No se pudo cerrar modal`);
          }
        }
      }

      console.log('================================================================================');
      console.log(`✅ PRUEBA COMPLETADA: ${registrosEditados} REGISTROS PROCESADOS`);
      console.log('================================================================================\n');

    } catch (error) {
      console.error('\n❌ ERROR:', error instanceof Error ? error.message : String(error));
      try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
        const archivo = `./screenshots/04-ERROR_${timestamp}.png`;
        await page.screenshot({ path: archivo, fullPage: true });
        console.log(`📸 Screenshot de error: ${archivo}\n`);
      } catch (e) {
        console.warn('⚠️ No se pudo capturar screenshot');
      }
      throw error;
    }
  });
});
