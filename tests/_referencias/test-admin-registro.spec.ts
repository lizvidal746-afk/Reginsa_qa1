import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Interfaz para el registro de administrado
interface RegistroAdministrado {
  id: number;
  ruc: string;
  razonSocial: string;
  nombreComercial: string;
  estado: string;
  timestamp: string;
  screenshot: string;
  screenshot_despues?: string;
  estado_registro: 'exitoso' | 'fallido';
}

// Ruta del archivo de reporte
const reportPath = path.join(__dirname, '../registros-administrados.json');

// Función para generar RUC aleatorio de 11 dígitos
function generarRUC(): string {
  return Math.floor(Math.random() * 99999999999)
    .toString()
    .padStart(11, '0');
}

// Función para actualizar el reporte JSON
function actualizarReporte(registro: RegistroAdministrado): void {
  let registros: RegistroAdministrado[] = [];
  
  if (fs.existsSync(reportPath)) {
    const contenido = fs.readFileSync(reportPath, 'utf-8');
    registros = JSON.parse(contenido);
  }
  
  registros.push(registro);
  fs.writeFileSync(reportPath, JSON.stringify(registros, null, 2));
  console.log(`✅ Reporte actualizado: ${reportPath}`);
}

// Función para registrar un administrado con reintentos
async function registrarAdministrado(page: Page, numeroRegistro: number, nombreEmpresa: string): Promise<string> {
  let rucsUsados: string[] = [];
  let maxReintentos = 3;
  let registroExitoso = false;

  for (let intento = 0; intento < maxReintentos; intento++) {
    let ruc = generarRUC();
    
    // Evitar duplicados en la misma sesión
    while (rucsUsados.includes(ruc)) {
      ruc = generarRUC();
    }
    rucsUsados.push(ruc);

    console.log(`🔄 [Administrado ${numeroRegistro}] Intento ${intento + 1}/3 - RUC: ${ruc}`);

    try {
      // Llenar RUC
      const inputRUC = page.getByRole('textbox', { name: 'R.U.C. *' });
      await inputRUC.click();
      await inputRUC.clear();
      await inputRUC.fill(ruc);
      await page.waitForTimeout(500);

      // Llenar Razón Social
      const inputRazonSocial = page.getByRole('textbox', { name: 'Razón Social *' });
      await inputRazonSocial.click();
      await inputRazonSocial.clear();
      await inputRazonSocial.fill(nombreEmpresa);
      await page.waitForTimeout(500);

      // Llenar Nombre Comercial
      const inputNombreComercial = page.getByRole('textbox', { name: 'Nombre Comercial *' });
      await inputNombreComercial.click();
      await inputNombreComercial.clear();
      await inputNombreComercial.fill(nombreEmpresa);
      await page.waitForTimeout(500);

      // Seleccionar Estado: Licenciada
      const combobox = page.getByRole('combobox', { name: 'Seleccione' });
      await combobox.click();
      await page.waitForTimeout(300);
      
      const opcionLicenciada = page.getByRole('option', { name: 'Licenciada' });
      await opcionLicenciada.click();
      await page.waitForTimeout(500);

      // 📸 Captura ANTES de guardar (con campos llenos)
      const nombreScreenshotAntes = `./screenshots/${nombreEmpresa.replace(/\s+/g, '_')}_RUC_${ruc}_ANTES_GUARDAR.png`;
      await page.screenshot({ path: nombreScreenshotAntes });
      console.log(`📸 Screenshot ANTES de guardar: ${nombreScreenshotAntes}`);

      // Guardar
      const botonGuardar = page.getByRole('button', { name: 'Guardar' });
      await botonGuardar.click();
      await page.waitForTimeout(1000);

      // Validar mensaje de éxito
      const mensajeExito = page.locator('text=/Guardado|Exitoso|éxito/i');
      const estaVisible = await mensajeExito.isVisible({ timeout: 5000 }).catch(() => false);

      if (estaVisible) {
        console.log(`✅ [Administrado ${numeroRegistro}] Registrado exitosamente con RUC: ${ruc}`);
        
        // 📸 Captura DESPUÉS de guardar (con mensaje de éxito)
        const nombreScreenshotDespues = `./screenshots/${nombreEmpresa.replace(/\s+/g, '_')}_RUC_${ruc}_DESPUES_GUARDAR.png`;
        await page.screenshot({ path: nombreScreenshotDespues });
        console.log(`📸 Screenshot DESPUÉS de guardar: ${nombreScreenshotDespues}`);
        
        // Actualizar reporte con ambos screenshots
        const registro: RegistroAdministrado = {
          id: numeroRegistro,
          ruc,
          razonSocial: nombreEmpresa,
          nombreComercial: nombreEmpresa,
          estado: 'Licenciada',
          timestamp: new Date().toISOString(),
          screenshot: nombreScreenshotAntes,
          screenshot_despues: nombreScreenshotDespues,
          estado_registro: 'exitoso'
        };
        actualizarReporte(registro);
        
        registroExitoso = true;
        break;
      } else {
        console.log(`⚠️ [Administrado ${numeroRegistro}] Intento ${intento + 1}: RUC ${ruc} duplicado o error. Reintentando...`);
        
        // Limpiar campos para reintentar
        await inputRUC.clear();
        await page.waitForTimeout(300);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      console.error(`❌ Error en intento ${intento + 1}: ${errorMessage}`);
    }
  }

  if (!registroExitoso) {
    throw new Error(`No se pudo registrar administrado ${numeroRegistro} después de ${maxReintentos} intentos`);
  }

  return rucsUsados[rucsUsados.length - 1];
}

test('Registro de 1 Administrado con Reintentos por RUC Duplicado', async ({ page }) => {
  console.log('\n📱 Iniciando test de registro de administrado...\n');

  // 1. Navegar a la URL
  console.log('🌐 Navegando a SUNEDU...');
  await page.goto('https://reginsaqa.sunedu.gob.pe/#/home');
  await page.waitForTimeout(2000);

  // 2. Click en "Acceder Ahora"
  console.log('🔐 Iniciando sesión...');
  await page.getByRole('button', { name: 'Acceder Ahora' }).click();
  await page.waitForTimeout(1000);

  // 3. Ingresar credenciales
  const inputUsuario = page.getByRole('textbox', { name: 'Usuario' });
  await inputUsuario.click();
  await inputUsuario.fill('lizvidal');
  await page.waitForTimeout(300);

  const inputContraseña = page.getByRole('textbox', { name: 'Contraseña' });
  await inputContraseña.click();
  await inputContraseña.fill('QA1234510qa');
  await page.waitForTimeout(300);

  // 4. Click en "Iniciar sesión"
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.waitForTimeout(3000);

  // 5. Navegar a "Infractor y Sanción"
  console.log('📋 Navegando a Infractor y Sanción...');
  await page.getByRole('link', { name: ' Infractor y Sanción' }).click();
  await page.waitForTimeout(2000);

  // 6. Click en botón "Nuevo" (ajusta el selector si es necesario)
  console.log('➕ Abriendo formulario para nuevo administrado...');
  await page.getByRole('button').nth(3).click();
  await page.waitForTimeout(1000);

  // 7. Registrar Administrado 1
  console.log('\n📝 REGISTRO: Empresa comercial 1');
  const rucRegistrado = await registrarAdministrado(page, 1, 'Empresa comercial 1');

  // 8. Resumen final - RUC almacenado en memoria
  console.log('\n✅ TEST COMPLETADO EXITOSAMENTE');
  console.log(`📊 RUC Registrado: ${rucRegistrado}`);
  console.log(`💾 RUC almacenado en memoria: ${rucRegistrado}`);
  console.log('\n✨ Administrado registrado correctamente.\n');
});
