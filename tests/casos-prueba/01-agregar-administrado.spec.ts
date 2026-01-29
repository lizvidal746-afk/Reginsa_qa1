import { test, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import {
  iniciarSesionYNavegar,
  abrirFormularioNuevoAdministrado,
  generarRUC,
  capturarPantalla,
  capturarPantallaMejorada,
  capturarFormularioLleno,
  capturarToastExito
} from '../utilidades/reginsa-actions';

// Ruta del archivo de reporte
const reportPath = path.join(__dirname, '../../reportes/registros-administrados.json');

// ===============================
// INTERFACES Y TIPOS
// ===============================
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

// ===============================
// FUNCIONES AUXILIARES
// ===============================

const SUFIJOS_EMPRESA = ['SAC', 'EIRL', 'SRL', 'SAA'];
const PREFIJOS_RAZON_SOCIAL = ['EMPRESA', 'CONSORCIO', 'UNIVERSIDAD', 'INDUSTRIA', 'CORPORACION'];

function leerRegistrosExistentes(): RegistroAdministrado[] {
  if (!fs.existsSync(reportPath)) {
    return [];
  }
  const contenido = fs.readFileSync(reportPath, 'utf-8');
  return JSON.parse(contenido) as RegistroAdministrado[];
}

function normalizarTexto(texto: string): string {
  return texto.trim().toUpperCase().replace(/\s+/g, ' ');
}

function quitarSufijoEmpresa(razon: string): string {
  const texto = normalizarTexto(razon);
  for (const sufijo of SUFIJOS_EMPRESA) {
    if (texto.endsWith(` ${sufijo}`)) {
      return texto.slice(0, -sufijo.length).trim();
    }
  }
  return texto;
}

function generarRazonSocialUnica(usados: Set<string>): string {
  const prefijo = PREFIJOS_RAZON_SOCIAL[Math.floor(Math.random() * PREFIJOS_RAZON_SOCIAL.length)];
  const base = `${prefijo} COMERCIAL ${Math.floor(Math.random() * 9000) + 1000}`;
  const sufijo = SUFIJOS_EMPRESA[Math.floor(Math.random() * SUFIJOS_EMPRESA.length)];
  const razon = `${base} ${sufijo}`;
  const normalizada = normalizarTexto(razon);
  if (usados.has(normalizada)) {
    return generarRazonSocialUnica(usados);
  }
  return razon;
}

/**
 * Actualiza el archivo JSON con el registro
 */
function actualizarReporte(registro: RegistroAdministrado): void {
  let registros: RegistroAdministrado[] = [];
  
  if (fs.existsSync(reportPath)) {
    const contenido = fs.readFileSync(reportPath, 'utf-8');
    registros = JSON.parse(contenido);
  }
  
  registros.push(registro);
  fs.writeFileSync(reportPath, JSON.stringify(registros, null, 2));
  console.log(`✅ Reporte actualizado`);
}

/**
 * Llena un campo de formulario
 */
async function llenarCampo(page: Page, nombre: string, valor: string): Promise<void> {
  const input = page.getByRole('textbox', { name: new RegExp(nombre) });
  await input.click();
  await input.clear();
  await input.fill(valor);
  await page.waitForTimeout(300);
}

/**
 * Registra un administrado con reintentos por RUC duplicado
 */
async function registrarAdministrado(page: Page, numeroRegistro: number): Promise<string> {
  const maxReintentos = 3;
  let rucsUsados: string[] = [];
  let registroExitoso = false;
  const registrosExistentes = leerRegistrosExistentes();
  const rucsRegistrados = new Set(registrosExistentes.map(r => normalizarTexto(r.ruc)));
  const razonesRegistradas = new Set(registrosExistentes.map(r => normalizarTexto(r.razonSocial)));

  for (let intento = 0; intento < maxReintentos; intento++) {
    // Generar RUC único (reutiliza `generarRUC`)
    let ruc = generarRUC();
    while (rucsUsados.includes(ruc) || rucsRegistrados.has(normalizarTexto(ruc))) {
      ruc = generarRUC();
    }
    rucsUsados.push(ruc);

    // Generar Razón Social única
    const razonSocial = generarRazonSocialUnica(razonesRegistradas);
    const nombreComercial = quitarSufijoEmpresa(razonSocial);
    razonesRegistradas.add(normalizarTexto(razonSocial));

    console.log(`🔄 Intento ${intento + 1}/${maxReintentos} - RUC: ${ruc}`);
    console.log(`   👤 Administrado: ${razonSocial}`);

    try {
      // Llenar formulario
      await llenarCampo(page, 'R.U.C. *', ruc);
      await llenarCampo(page, 'Razón Social *', razonSocial);
      await llenarCampo(page, 'Nombre Comercial *', nombreComercial);

      // Seleccionar estado
      const combobox = page.getByRole('combobox', { name: 'Seleccione' });
      await combobox.click();
      await page.waitForTimeout(300);
      await page.getByRole('option', { name: 'Licenciada' }).click();
      await page.waitForTimeout(300);

      // Captura formulario lleno ANTES de guardar (reutiliza `capturarFormularioLleno`)
      const screenshotAntes = await capturarFormularioLleno(
        page,
        '01-AGREGAR_ADMINISTRADO',
        ruc,
        razonSocial,
        'AGREGAR_ADMINISTRADO',
        '05_FORMULARIO'
      );

      // Guardar
      await page.getByRole('button', { name: 'Guardar' }).click();
      await page.waitForTimeout(1500);

      // Validar éxito
      const mensajeExito = page.locator('text=/Guardado|Exitoso|éxito/i');
      const estaVisible = await mensajeExito.isVisible({ timeout: 5000 }).catch(() => false);

      if (estaVisible) {
        console.log(`✅ Administrado registrado - RUC: ${ruc}`);
        
        // Captura mensaje de éxito (toast verde) (reutiliza `capturarToastExito`)
        const screenshotDespues =
          (await capturarToastExito(page, '01-AGREGAR_ADMINISTRADO', '06_EXITO', ruc, razonSocial, 'AGREGAR_ADMINISTRADO')) ||
          // Fallback de captura completa (reutiliza `capturarPantallaMejorada`)
          (await capturarPantallaMejorada(page, '01-AGREGAR_ADMINISTRADO', '06_EXITO', ruc, razonSocial));
        
        // Actualizar reporte
        const registro: RegistroAdministrado = {
          id: numeroRegistro,
          ruc,
          razonSocial: razonSocial,
          nombreComercial: nombreComercial,
          estado: 'Licenciada',
          timestamp: new Date().toISOString(),
          screenshot: screenshotAntes,
          screenshot_despues: screenshotDespues,
          estado_registro: 'exitoso'
        };
        actualizarReporte(registro);
        
        registroExitoso = true;
        return ruc;
      } else {
        console.warn(`⚠️ RUC duplicado o error. Limpiando formulario...`);
        await page.getByRole('textbox', { name: 'R.U.C. *' }).clear();
        await page.waitForTimeout(300);
      }
    } catch (error) {
      console.error(`❌ Error en intento ${intento + 1}:`, error);
    }
  }

  if (!registroExitoso) {
    throw new Error(`No se pudo registrar administrado después de ${maxReintentos} intentos`);
  }
  
  return rucsUsados[rucsUsados.length - 1];
}

// ===============================
// TEST PRINCIPAL
// ===============================

/**
 * CASO 01: AGREGAR ADMINISTRADO
 *
 * Flujo:
 * 1. Login + navegación al módulo (reutiliza `iniciarSesionYNavegar`)
 * 2. Abrir formulario de nuevo administrado (reutiliza `abrirFormularioNuevoAdministrado`)
 * 3. Generar RUC y razón social únicas (reutiliza `generarRUC` + helpers locales)
 * 4. Llenar formulario y seleccionar estado
 * 5. Capturar formulario (reutiliza `capturarFormularioLleno`)
 * 6. Guardar y validar éxito (reutiliza `capturarToastExito` / `capturarPantallaMejorada`)
 * 7. Actualizar reporte JSON
 */
test('01-AGREGAR ADMINISTRADO: Registro con RUC automático y reintentos', async ({ page }) => {
  console.log('\n📱 CASO 01: AGREGAR ADMINISTRADO\n');

  try {
    // ═══════════════════════════════════════════════════════════════════
    // PASO 1: LOGIN + NAVEGACIÓN
    // Reutiliza `iniciarSesionYNavegar` (login + módulo)
    // ═══════════════════════════════════════════════════════════════════
    await iniciarSesionYNavegar(page, 'infractor');

    // ═══════════════════════════════════════════════════════════════════
    // PASO 2: ABRIR FORMULARIO
    // Reutiliza `abrirFormularioNuevoAdministrado`
    // ═══════════════════════════════════════════════════════════════════
    await abrirFormularioNuevoAdministrado(page);

    // ═══════════════════════════════════════════════════════════════════
    // PASO 3: REGISTRAR ADMINISTRADO
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n📝 REGISTRANDO ADMINISTRADO...');
    const rucRegistrado = await registrarAdministrado(page, 1);

    // ═══════════════════════════════════════════════════════════════════
    // RESULTADO FINAL
    // ═══════════════════════════════════════════════════════════════════
    console.log('\n✅ CASO 01 COMPLETADO EXITOSAMENTE');
    console.log(`📊 Resumen:`);
    console.log(`   - Empresa: generada automáticamente`);
    console.log(`   - RUC: ${rucRegistrado}`);
    console.log(`   - Estado: Licenciada`);
    console.log(`   - Timestamp: ${new Date().toISOString()}`);
    console.log('\n✨ Administrado agregado correctamente.\n');

  } catch (error) {
    console.error('\n❌ ERROR EN CASO 01:', error);
    try {
      await capturarPantalla(page, '01-agregar-administrado', 'ERROR');
    } catch {}
    throw error;
  }
});
