
import { test, Page, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import {
  iniciarSesionYNavegar,
  obtenerCredencial,
  abrirFormularioNuevoAdministrado,
  generarRUC,
  capturarPantalla,
  capturarPantallaMejorada,
  capturarFormularioLleno,
  capturarToastExito
} from '../utilidades/reginsa-actions';
import { generateTestData } from '../../helpers/data-generator';
import { getEstadoLabel } from '../../helpers/state-distributor';
import { getTestContext } from '../../helpers/test-context';
import { allure } from 'allure-playwright';

/**
 * EJECUCIÓN (rápido)
 * - Headless por defecto. Para ver navegador: `--headed`.
 * - Con capturas: scripts normales `npm run test:*`.
 * - Sin capturas: scripts `:fast`.
 * - Paralelismo (suite completa): `npm run test:all:w2` / `test:all:w4`.
 */

/**
 * NOTA DE EJECUCIÓN
 * - Capturas exitosas dependen del modo de ejecución (scripts con o sin :fast).
 * - Capturas de error se guardan siempre en la carpeta errors/.
 */

// Ruta del archivo de reporte
const reportPath = path.join(__dirname, '../../reportes/registros-administrados.json');
const administradosSistemaPath = path.join(__dirname, '../../reportes/administrados-registrados.json');
const reservadosPath = path.join(__dirname, '../../reportes/administrados-reservados.json');
const reservadosLockPath = path.join(__dirname, '../../reportes/administrados-reservados.lock');
const runMarkerPath = path.join(__dirname, '../../reportes/administrados-run.json');
const runLockPath = path.join(__dirname, '../../reportes/administrados-run.lock');
const baseRucsPath = path.join(__dirname, '../../files/rucs_caso_01_base.tsv');
const baseRucsExcelPath = path.join(__dirname, '../../test-files/Administrados_BD.xlsx');

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

interface RegistroReservado {
  ruc?: string;
  razonSocial?: string;
  timestamp?: string;
}

// ===============================
// FUNCIONES AUXILIARES
// ===============================

const SUFIJOS_EMPRESA = ['S.A.C.', 'S.A.', 'S.S.', 'E.I.R.L.', 'S.R.L.', 'S.A.A.', 'S.A.C', 'S.A', 'S.S', 'EIRL', 'SRL', 'SAA'];
// Prefijos originales y ampliados
const PREFIJOS_RAZON_SOCIAL = [
  'EMPRESA',
  'CONSORCIO',
  'UNIVERSIDAD',
  'INDUSTRIA',
  'CORPORACION',
  'COMERCIO',
  'ALMACENES',
  // Ejemplos reales y ampliados
  'UNIVERSIDAD NACIONAL SAN MARCOS',
  'UNIVERSIDAD CATOLICA',
  'MINISTERIO DE SALUD',
  'MINISTERIO DE EDUCACION',
  'RESTAURANTE EL SABOR',
  'CAFETERIA LA ESQUINA',
  'SUPERMERCADO CENTRAL',
  'FARMACIA POPULAR',
  'TRANSPORTES EXPRESS',
  'CONSTRUCTORA ANDINA',
  'HOTEL SOLARIS',
  'CLINICA SAN JUAN',
  'COLEGIO NUEVA ERA',
  'ASOCIACION DE VECINOS',
  'COOPERATIVA AGRARIA',
  'FUNDACION LUZ',
  'INSTITUTO TECNOLOGICO',
  'CENTRO DE IDIOMAS',
  'GRUPO EMPRESARIAL',
  'DISTRIBUIDORA DEL NORTE',
  'SERVICIOS GENERALES',
  'AGROINDUSTRIAS DEL SUR',
  'CLUB DEPORTIVO',
  'TIENDA COMERCIAL',
  'LABORATORIO MODERNO',
  'OTRO'
];
const TIPOS_ENTIDAD = [
  'ESTATAL',
  'NACIONAL',
  'PRIVADA',
  'PUBLICA',
  'PARTICULAR',
  'NO GUBERNAMENTAL',
  'MUNICIPAL',
  'REGIONAL',
  'INTERNACIONAL',
  'OTRO'
];
const VALIDACION_DUPLICADO_REGEX = /ya\s*existe|duplicad|repetid|registrad|no\s*puede\s*repetirse|se\s*encuentra\s*registrad/i;

function leerRegistrosExistentes(): RegistroAdministrado[] {
  if (!fs.existsSync(reportPath)) {
    return [];
  }
  const contenido = fs.readFileSync(reportPath, 'utf-8');
  try {
    if (!contenido.trim()) return [];
    return JSON.parse(contenido) as RegistroAdministrado[];
  } catch {
    return [];
  }
}

function inicializarRunActual(): void {
  const runId = process.env.TEST_RUN_ID || '';
  if (!runId) return;

  withFileLock(runLockPath, () => {
    let marker: { runId?: string } | null = null;
    if (fs.existsSync(runMarkerPath)) {
      try {
        marker = JSON.parse(fs.readFileSync(runMarkerPath, 'utf-8')) as { runId?: string };
      } catch {
        marker = null;
      }
    }

    if (marker?.runId === runId) return;

    [reportPath, reservadosPath, administradosSistemaPath].forEach((p) => {
      if (fs.existsSync(p)) {
        fs.unlinkSync(p);
      }
    });
    fs.writeFileSync(runMarkerPath, JSON.stringify({ runId, startedAt: new Date().toISOString() }, null, 2));
  });
}

function withFileLock<T>(lockPath: string, fn: () => T, timeoutMs = 15000, retryMs = 200): T {
  const inicio = Date.now();
  while (true) {
    try {
      const fd = fs.openSync(lockPath, 'wx');
      try {
        return fn();
      } finally {
        fs.closeSync(fd);
        fs.unlinkSync(lockPath);
      }
    } catch (error) {
      if (Date.now() - inicio > timeoutMs) {
        throw error;
      }
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, retryMs);
    }
  }
}

function leerReservados(): RegistroReservado[] {
  if (!fs.existsSync(reservadosPath)) return [];
  try {
    const contenido = fs.readFileSync(reservadosPath, 'utf-8');
    return JSON.parse(contenido) as RegistroReservado[];
  } catch {
    return [];
  }
}

function reservarAdministrado(ruc: string, razonSocial: string): boolean {
  const rucNorm = normalizarTexto(normalizarRuc(ruc));
  const razonNorm = normalizarTexto(razonSocial);

  return withFileLock<boolean>(reservadosLockPath, () => {
    const reservados = leerReservados();
    const registrosActuales = leerRegistrosExistentes();
    const administradosSistema = leerAdministradosSistema();

    const usados = new Set<string>();
    reservados.forEach((r) => usados.add(`${normalizarTexto(normalizarRuc(r.ruc || ''))}|${normalizarTexto(r.razonSocial || '')}`));
    registrosActuales.forEach((r) => usados.add(`${normalizarTexto(normalizarRuc(r.ruc))}|${normalizarTexto(r.razonSocial)}`));
    administradosSistema.forEach((r) => usados.add(`${normalizarTexto(normalizarRuc(r.ruc || ''))}|${normalizarTexto(r.razonSocial || '')}`));

    const key = `${rucNorm}|${razonNorm}`;
    if (key === '|' || usados.has(key)) {
      return false;
    }

    const nuevo = { ruc, razonSocial, timestamp: new Date().toISOString() };
    fs.writeFileSync(reservadosPath, JSON.stringify([...reservados, nuevo], null, 2));
    return true;
  });
}

function leerAdministradosSistema(): Array<{ ruc?: string; razonSocial?: string }> {
  const base = [...leerBaseRucsTSV(), ...leerBaseRucsExcel()];
  const baseNormalizada = base.map((item) => ({
    ruc: item.ruc ? normalizarRuc(item.ruc) : undefined,
    razonSocial: item.razonSocial ? item.razonSocial.trim() : undefined,
    nombreComercial: item.nombreComercial ? item.nombreComercial.trim() : undefined,
    estado: item.estado
  }));

  let existentes: Array<{ ruc?: string; razonSocial?: string; nombreComercial?: string; estado?: string }> = [];
  if (fs.existsSync(administradosSistemaPath)) {
    const contenido = fs.readFileSync(administradosSistemaPath, 'utf-8');
    try {
      if (contenido.trim()) {
        const data = JSON.parse(contenido) as { registros?: Array<{ ruc?: string; razonSocial?: string; nombreComercial?: string; estado?: string }> };
        existentes = Array.isArray(data?.registros) ? data.registros : [];
      }
    } catch {
      existentes = [];
    }
  }

  const vistos = new Set<string>();
  const combinados = [...existentes, ...baseNormalizada].filter((item) => {
    const key = `${normalizarTexto(normalizarRuc(item.ruc || ''))}|${normalizarTexto(item.razonSocial || '')}`;
    if (key === '|' || vistos.has(key)) return false;
    vistos.add(key);
    return true;
  });

  if (combinados.length > 0) {
    fs.writeFileSync(administradosSistemaPath, JSON.stringify({ registros: combinados }, null, 2));
  }

  return combinados;
}

async function verificarAdministradoRegistrado(page: Page, ruc: string, maxRetries = 3, waitMs = 3000): Promise<boolean> {
  const navegarAdministrado = async () => {
    const linkAdmin = page.getByRole('link', { name: /Administrado|Administrados/i }).first();
    if (!(await linkAdmin.isVisible().catch(() => false))) {
      const menuBtn = page.locator('button:has(i.pi-bars), button[aria-label*="menu" i], .layout-menu-button').first();
      if (await menuBtn.isVisible().catch(() => false)) {
        await menuBtn.click().catch(() => {});
      }
    }
    await linkAdmin.click().catch(() => {});
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.locator('table').first().waitFor({ state: 'visible', timeout: 15000 });
  };

  const buscarRuc = async () => {
    const inputRuc = page
      .locator('input[placeholder*="RUC" i], input[aria-label*="RUC" i], input[formcontrolname*="ruc" i]')
      .first();
    const inputVisible = await inputRuc.waitFor({ state: 'visible', timeout: 10000 }).then(() => true).catch(() => false);
    if (!inputVisible) {
      return false;
    }
    const limpio = await inputRuc.fill('').then(() => true).catch(() => false);
    if (!limpio) return false;
    const escrito = await inputRuc.fill(ruc).then(() => true).catch(() => false);
    if (!escrito) return false;
    const btnBuscar = page.getByRole('button', { name: /Buscar/i }).first();
    if (await btnBuscar.isVisible().catch(() => false)) {
      await btnBuscar.click().catch(() => {});
    }
    const celda = page.locator('table').locator('td', { hasText: ruc }).first();
    return celda.waitFor({ state: 'visible', timeout: 8000 }).then(() => true).catch(() => false);
  };

  await navegarAdministrado();
  for (let intento = 0; intento < maxRetries; intento++) {
    if (page.isClosed()) return false;
    const encontrado = await buscarRuc();
    if (encontrado) return true;
    if (intento > 0) {
      await page.reload({ waitUntil: 'domcontentloaded' }).catch(() => {});
      await page.waitForLoadState('networkidle').catch(() => {});
      await navegarAdministrado().catch(() => {});
    }
    await page.waitForTimeout(waitMs).catch(() => {});
  }
  return false;
}

function leerBaseRucsTSV(): Array<{ ruc?: string; razonSocial?: string; nombreComercial?: string; estado?: string }> {
  if (!fs.existsSync(baseRucsPath)) {
    return [];
  }
  const contenido = fs.readFileSync(baseRucsPath, 'utf-8');
  const lineas = contenido.split(/\r?\n/).filter(linea => linea.trim().length > 0);
  if (lineas.length < 2) {
    return [];
  }
  const headers = lineas[0].split('\t').map(h => h.trim().toUpperCase());
  const idxRuc = headers.indexOf('RUC');
  const idxRazon = headers.indexOf('RAZON_SOCIAL');
  const idxNombre = headers.indexOf('NOMBRE_COMERCIAL');
  const idxEstado = headers.indexOf('ID_ESTADO');
  const idxActivo = headers.indexOf('BIT_ACTIVO');

  return lineas.slice(1).map((linea) => {
    const cols = linea.split('\t');
    const bitActivo = idxActivo >= 0 ? (cols[idxActivo] || '').trim() : '';
    const idEstado = idxEstado >= 0 ? (cols[idxEstado] || '').trim() : '';
    const estado = bitActivo === '1' || idEstado === '1' ? 'Licenciada' : 'No licenciada';
    return {
      ruc: idxRuc >= 0 ? normalizarRuc((cols[idxRuc] || '').trim()) : undefined,
      razonSocial: idxRazon >= 0 ? (cols[idxRazon] || '').trim() : undefined,
      nombreComercial: idxNombre >= 0 ? (cols[idxNombre] || '').trim() : undefined,
      estado
    };
  });
}

function leerBaseRucsExcel(): Array<{ ruc?: string; razonSocial?: string; nombreComercial?: string; estado?: string }> {
  if (!fs.existsSync(baseRucsExcelPath)) {
    return [];
  }
  const workbook = XLSX.readFile(baseRucsExcelPath);
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    return [];
  }
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, string | number>>(sheet, { defval: '' });

  const normalizarHeader = (h: string) => h.trim().toUpperCase();
  const resolver = (row: Record<string, string | number>, key: string): string => {
    const header = Object.keys(row).find(k => normalizarHeader(k) === key);
    const valor = header ? row[header] : '';
    return String(valor ?? '').trim();
  };

  const conHeaders = rows.some((row) => {
    const headers = Object.keys(row).map(normalizarHeader);
    return headers.includes('RUC') || headers.includes('RAZON_SOCIAL') || headers.includes('NOMBRE_COMERCIAL');
  });

  if (conHeaders) {
    return rows.map((row) => {
      const ruc = normalizarRuc(resolver(row, 'RUC'));
      const razonSocial = resolver(row, 'RAZON_SOCIAL');
      const nombreComercial = resolver(row, 'NOMBRE_COMERCIAL');
      const idEstado = resolver(row, 'ID_ESTADO');
      const bitActivo = resolver(row, 'BIT_ACTIVO');
      const estado = bitActivo === '1' || idEstado === '1' ? 'Licenciada' : 'No licenciada';
      return {
        ruc: ruc || undefined,
        razonSocial: razonSocial || undefined,
        nombreComercial: nombreComercial || undefined,
        estado
      };
    });
  }

  // Fallback sin headers: columna C = RUC, columna D = Razón Social
  const matrix = XLSX.utils.sheet_to_json<Array<string | number>>(sheet, { header: 1, defval: '' });
  return matrix
    .map((row) => {
      const ruc = normalizarRuc(String(row?.[2] ?? '').trim());
      const razonSocial = String(row?.[3] ?? '').trim();
      return {
        ruc: ruc || undefined,
        razonSocial: razonSocial || undefined,
        nombreComercial: undefined,
        estado: undefined
      };
    })
    .filter((row) => row.ruc || row.razonSocial);
}

function normalizarRuc(ruc: string | number): string {
  const digits = String(ruc ?? '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length >= 11) return digits;
  return digits.padStart(11, '0');
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

function construirRazonSocialMasiva(ruc: string, usados: Set<string>, sequenceIndex?: number): string {
  // Prefijo principal (aleatorio o secuencial)
  const prefijo = PREFIJOS_RAZON_SOCIAL[sequenceIndex !== undefined ? sequenceIndex % PREFIJOS_RAZON_SOCIAL.length : Math.floor(Math.random() * PREFIJOS_RAZON_SOCIAL.length)];
  // Tipo de entidad (aleatorio o secuencial)
  const tipoEntidad = TIPOS_ENTIDAD[sequenceIndex !== undefined ? sequenceIndex % TIPOS_ENTIDAD.length : Math.floor(Math.random() * TIPOS_ENTIDAD.length)];
  // Últimos 5 dígitos del RUC
  const rucNorm = normalizarRuc(ruc);
  const ultimos5 = rucNorm.slice(-5);
  // Sufijo comercial aleatorio
  const sufijo = SUFIJOS_EMPRESA[Math.floor(Math.random() * SUFIJOS_EMPRESA.length)];
  // Si el prefijo es uno de los ejemplos reales, no agregues tipoEntidad para evitar redundancia
  const ejemplosReales = [
    'UNIVERSIDAD NACIONAL SAN MARCOS',
    'UNIVERSIDAD CATOLICA',
    'MINISTERIO DE SALUD',
    'MINISTERIO DE EDUCACION',
    'RESTAURANTE EL SABOR',
    'CAFETERIA LA ESQUINA',
    'SUPERMERCADO CENTRAL',
    'FARMACIA POPULAR',
    'TRANSPORTES EXPRESS',
    'CONSTRUCTORA ANDINA',
    'HOTEL SOLARIS',
    'CLINICA SAN JUAN',
    'COLEGIO NUEVA ERA',
    'ASOCIACION DE VECINOS',
    'COOPERATIVA AGRARIA',
    'FUNDACION LUZ',
    'INSTITUTO TECNOLOGICO',
    'CENTRO DE IDIOMAS',
    'GRUPO EMPRESARIAL',
    'DISTRIBUIDORA DEL NORTE',
    'SERVICIOS GENERALES',
    'AGROINDUSTRIAS DEL SUR',
    'CLUB DEPORTIVO',
    'TIENDA COMERCIAL',
    'LABORATORIO MODERNO',
    'OTRO'
  ];
  let razon = '';
  if (ejemplosReales.includes(prefijo)) {
    razon = `${prefijo} ${ultimos5} ${sufijo}`;
  } else {
    razon = `${prefijo} ${tipoEntidad} ${ultimos5} ${sufijo}`;
  }
  const normalizada = normalizarTexto(razon);
  if (usados.has(normalizada)) {
    return generarRazonSocialUnica(usados);
  }
  return razon;
}

function calcularEstadoCaso(index: number, total: number): string {
  if (!total || total <= 1) return 'Licenciada';
  if (total >= 10) {
    const pos = index % 10;
    if (pos <= 6) return 'Licenciada';
    if (pos <= 8) return 'Ley de Creación';
    return 'Licencia denegada';
  }
  const r = Math.random();
  if (r < 0.7) return 'Licenciada';
  if (r < 0.9) return 'Ley de Creación';
  return 'Licencia denegada';
}

function generarDatosUnicos(
  rucsRegistrados: Set<string>,
  razonesRegistradas: Set<string>,
  sequenceIndex?: number
): { ruc: string; razonSocial: string; nombreComercial: string } {
  let intentos = 0;
  while (intentos < 50) {
    const ruc = normalizarRuc(generarRUC());
    const razonSocial = construirRazonSocialMasiva(ruc, razonesRegistradas, sequenceIndex);
    const nombreComercial = quitarSufijoEmpresa(razonSocial);

    if (!rucsRegistrados.has(normalizarTexto(normalizarRuc(ruc)))) {
      const reservado = reservarAdministrado(ruc, razonSocial);
      if (reservado) {
        return { ruc, razonSocial, nombreComercial };
      }
    }
    intentos++;
  }
  throw new Error('No se pudo reservar datos únicos para el registro');
}

async function asegurarFormularioAdministrado(page: Page): Promise<ReturnType<Page['locator']>> {
  const modal = page.getByRole('dialog').filter({ hasText: /Agregar\s*Administrado/i }).first();
  if (await modal.isVisible().catch(() => false)) {
    return modal;
  }

  await abrirFormularioNuevoAdministrado(page);
  await modal.waitFor({ state: 'visible', timeout: 20000 }).catch(() => {});
  return (await modal.isVisible().catch(() => false)) ? modal : page.locator('body');
}

async function esperarResultadoGuardado(page: Page): Promise<boolean> {
  const toast = page.locator('text=/Guardado|Exitoso|éxito/i').first();
  const modal = page.getByRole('dialog').filter({ hasText: /Agregar\s*Administrado/i }).first();
  const timeoutMs = 4500;
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await toast.isVisible().catch(() => false)) return true;
    if (await modal.isVisible().catch(() => false) === false) return true;
    await page.waitForTimeout(120);
  }
  return false;
}

/**
 * Actualiza el archivo JSON con el registro
 */
function actualizarReporte(registro: RegistroAdministrado): void {
  let registros: RegistroAdministrado[] = [];
  
  if (fs.existsSync(reportPath)) {
    const contenido = fs.readFileSync(reportPath, 'utf-8');
    try {
      if (contenido.trim()) {
        registros = JSON.parse(contenido);
      }
    } catch {
      registros = [];
    }
  }
  
  registros.push(registro);
  fs.writeFileSync(reportPath, JSON.stringify(registros, null, 2));
  console.log(`✅ Reporte actualizado`);
}

/**
 * Llena un campo de formulario
 */
async function llenarCampo(page: Page, nombre: string, valor: string): Promise<void> {
  const scope = await asegurarFormularioAdministrado(page);

  const nombreNormalizado = nombre.toUpperCase();
  const candidatosEspecificos: Array<ReturnType<Page['locator']>> = [];
  if (nombreNormalizado.includes('R.U.C') || nombreNormalizado.includes('RUC')) {
    candidatosEspecificos.push(
      scope.locator('input[formcontrolname*="ruc" i], input[name*="ruc" i], input[id*="ruc" i], input[placeholder*="ruc" i], input[aria-label*="ruc" i]').first()
    );
  }
  if (nombreNormalizado.includes('RAZÓN') || nombreNormalizado.includes('RAZON')) {
    candidatosEspecificos.push(
      scope.locator('input[formcontrolname*="razon" i], input[name*="razon" i], input[placeholder*="razon" i], input[aria-label*="razon" i]').first()
    );
  }
  if (nombreNormalizado.includes('NOMBRE') || nombreNormalizado.includes('COMERCIAL')) {
    candidatosEspecificos.push(
      scope.locator('input[formcontrolname*="comercial" i], input[name*="comercial" i], input[placeholder*="comercial" i], input[aria-label*="comercial" i]').first(),
      scope.locator('input[formcontrolname*="nombre" i], input[name*="nombre" i], input[placeholder*="nombre" i], input[aria-label*="nombre" i]').first()
    );
  }

  const candidatos = [
      ...candidatosEspecificos,
      scope.getByRole('textbox', { name: new RegExp(nombre, 'i') }),
      scope.getByLabel(new RegExp(nombre, 'i')),
      scope.getByPlaceholder(new RegExp(nombre, 'i')),
      scope.locator('label', { hasText: new RegExp(nombre, 'i') }).locator('xpath=following::input[1]').first(),
      scope.locator('input').filter({ hasText: new RegExp(nombre, 'i') }).first(),
      scope.locator('input').filter({ has: scope.locator(`label:has-text("${nombre}")`) }).first()
  ];

  let input: ReturnType<Page['locator']> | null = null;
  for (const candidato of candidatos) {
    const visible = await candidato.isVisible().catch(() => false);
    if (!visible) continue;
    const readonly = await candidato.evaluate((el) => (el as HTMLInputElement).readOnly).catch(() => false);
    const editable = await candidato.isEditable().catch(() => false);
    if (editable && !readonly) {
      input = candidato;
      break;
    }
  }

  if (!input) {
    throw new Error(`No se encontró input editable para: ${nombre}`);
  }

  await input.waitFor({ state: 'visible', timeout: 40000 });
  await input.click();
  if (await input.isEditable().catch(() => false)) {
    await input.clear();
  }
  await input.fill(valor);
  await expect(input).toHaveValue(new RegExp(String(valor).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), { timeout: 8000 });
  // Pequeña espera solo si es necesario para estabilidad visual
  // Espera fija eliminada para máxima velocidad
}

async function detectarValidacionDuplicado(page: Page): Promise<boolean> {
  const scope = await asegurarFormularioAdministrado(page);
  const mensajeDirecto = scope.getByText(VALIDACION_DUPLICADO_REGEX).first();
  if (await mensajeDirecto.isVisible().catch(() => false)) return true;

  const mensajes = scope.locator('.p-error, .invalid-feedback, .mat-error, .text-danger, .error-message');
  const total = await mensajes.count().catch(() => 0);
  for (let i = 0; i < total; i++) {
    const nodo = mensajes.nth(i);
    if (!(await nodo.isVisible().catch(() => false))) continue;
    const texto = await nodo.innerText().catch(() => '');
    if (VALIDACION_DUPLICADO_REGEX.test(texto)) return true;
  }

  return false;
}

/**
 * Selecciona una opción en el dropdown de Estado (Ant Design / combobox)
 */
async function seleccionarEstado(page: Page, estado: string): Promise<void> {
  const textoEstado = new RegExp(estado, 'i');
  const scope = await asegurarFormularioAdministrado(page);

  const dropdownPrime = scope.locator('#estado, [aria-controls="estado_list"]').first();
  if (await dropdownPrime.isVisible().catch(() => false)) {
    const trigger = dropdownPrime.locator('.p-dropdown-trigger, [role="button"][aria-label*="dropdown" i], .p-dropdown-label[role="combobox"]').first();
    await trigger.waitFor({ state: 'visible', timeout: 20000 });
    await trigger.click({ force: true });

    const list = page.locator('#estado_list, [id^="estado_list"]');
    await list.first().waitFor({ state: 'visible', timeout: 20000 });

    const opcion = list.locator('li[role="option"], .p-dropdown-item', { hasText: textoEstado }).first();
    const visible = await opcion.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false);
    if (visible) {
      await opcion.click({ force: true });
      return;
    }

    // Fallback: si el estado no existe, elegir la primera opcion valida
    const opciones = list.locator('li[role="option"], .p-dropdown-item');
    const total = await opciones.count().catch(() => 0);
    for (let i = 0; i < total; i++) {
      const texto = (await opciones.nth(i).innerText().catch(() => '')) || '';
      if (!/seleccione/i.test(texto)) {
        await opciones.nth(i).click({ force: true });
        return;
      }
    }
  }

  const dropdownFallback = scope.getByRole('combobox', { name: /Seleccione|Estado/i });
  await dropdownFallback.waitFor({ state: 'visible', timeout: 20000 });
  await dropdownFallback.click({ force: true });

  const opcionFallback = page.getByRole('option', { name: textoEstado }).first();
  const visibleFallback = await opcionFallback.waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false);
  if (visibleFallback) {
    await opcionFallback.click({ force: true });
    return;
  }

  const opcionesFallback = page.getByRole('option').filter({ hasText: /./ });
  const totalFallback = await opcionesFallback.count().catch(() => 0);
  for (let i = 0; i < totalFallback; i++) {
    const texto = (await opcionesFallback.nth(i).innerText().catch(() => '')) || '';
    if (!/seleccione/i.test(texto)) {
      await opcionesFallback.nth(i).click({ force: true });
      return;
    }
  }
}

/**
 * Registra un administrado con reintentos por RUC duplicado
 */
// Nueva función para obtener todos los RUC y razón social ya existentes de todas las fuentes
function obtenerRucsYRazonesUsados() {
  const registrosExistentes = leerRegistrosExistentes();
  const reservados = leerReservados();
  const administradosSistema = leerAdministradosSistema();
  const baseRucs = [...leerBaseRucsTSV(), ...leerBaseRucsExcel()];
  const rucsRegistrados = new Set<string>();
  const razonesRegistradas = new Set<string>();
  // De reportes
  registrosExistentes.forEach(r => {
    rucsRegistrados.add(normalizarTexto(normalizarRuc(r.ruc)));
    razonesRegistradas.add(normalizarTexto(r.razonSocial));
    if ((r as any).nombreComercial) razonesRegistradas.add(normalizarTexto((r as any).nombreComercial));
  });
  // De reservados
  reservados.forEach(item => {
    if (item.ruc) rucsRegistrados.add(normalizarTexto(normalizarRuc(item.ruc)));
    if (item.razonSocial) razonesRegistradas.add(normalizarTexto(item.razonSocial));
  });
  // De administrados en sistema
  administradosSistema.forEach(item => {
    if (item.ruc) rucsRegistrados.add(normalizarTexto(normalizarRuc(item.ruc)));
    if (item.razonSocial) razonesRegistradas.add(normalizarTexto(item.razonSocial));
    if ((item as any).nombreComercial) razonesRegistradas.add(normalizarTexto((item as any).nombreComercial));
  });
  // De base TSV/Excel
  baseRucs.forEach(item => {
    if (item.ruc) rucsRegistrados.add(normalizarTexto(normalizarRuc(item.ruc)));
    if (item.razonSocial) razonesRegistradas.add(normalizarTexto(item.razonSocial));
    if ((item as any).nombreComercial) razonesRegistradas.add(normalizarTexto((item as any).nombreComercial));
  });
  return { rucsRegistrados, razonesRegistradas };
}

// Mejorada: asegura unicidad absoluta y robustez para pruebas masivas
async function registrarAdministrado(
  page: Page,
  numeroRegistro: number,
  estadoSeleccionado: string,
  maxDurationMs = 90000,
  verificarRetries = 3,
  verificarWaitMs = 3000,
  strictVerify = true,
  maxReintentos = 1,
  overrideData?: { ruc: string; razonSocial: string; nombreComercial: string },
  forcePattern = false,
  sequenceIndex?: number
): Promise<string> {
  let rucsUsados: string[] = [];
  let registroExitoso = false;
  const inicio = Date.now();
  // Centraliza la obtención de datos usados
  let { rucsRegistrados, razonesRegistradas } = obtenerRucsYRazonesUsados();

  console.log(`📊 Base de exclusión cargada: ${rucsRegistrados.size} RUCs y ${razonesRegistradas.size} razones sociales`);

  for (let intento = 0; intento < maxReintentos; intento++) {
    if (page.isClosed()) {
      throw new Error('La página se cerró antes de completar el registro.');
    }
    if (Date.now() - inicio > maxDurationMs) {
      throw new Error(`Se agotó el tiempo disponible para registrar administrado (${maxDurationMs}ms).`);
    }
    // Refresca los sets en cada intento para máxima robustez
    ({ rucsRegistrados, razonesRegistradas } = obtenerRucsYRazonesUsados());
    const datos = overrideData ?? generarDatosUnicos(rucsRegistrados, razonesRegistradas, sequenceIndex);
    let ruc = datos.ruc;
    let razonSocial = datos.razonSocial;
    let nombreComercial = datos.nombreComercial;
    if (overrideData && forcePattern) {
      razonSocial = construirRazonSocialMasiva(ruc, razonesRegistradas, sequenceIndex);
      nombreComercial = quitarSufijoEmpresa(razonSocial);
    }

    const registrarLocal = (nuevoRuc: string, nuevaRazon: string) => {
      rucsRegistrados.add(normalizarTexto(normalizarRuc(nuevoRuc)));
      razonesRegistradas.add(normalizarTexto(nuevaRazon));
      rucsUsados.push(nuevoRuc);
    };

    registrarLocal(ruc, razonSocial);

    console.log(`🔄 Intento ${intento + 1}/${maxReintentos} - RUC: ${ruc}`);
    console.log(`   👤 Administrado: ${razonSocial}`);

    try {
      await asegurarFormularioAdministrado(page);
      // Llenar formulario
      const llenarDatos = async () => {
        await llenarCampo(page, 'R.U.C. *', normalizarRuc(ruc));
        await llenarCampo(page, 'Razón Social *', razonSocial);
        await llenarCampo(page, 'Nombre Comercial *', nombreComercial);
      };

      await llenarDatos();

      let reintentoValidacion = false;
      if (await detectarValidacionDuplicado(page)) {
        if (!reintentoValidacion) {
          reintentoValidacion = true;
          console.warn('⚠️ Validación duplicado detectada (RUC/Razón Social). Generando un nuevo dato y reintentando una vez.');
          // Refresca los sets antes de generar nuevos datos
          ({ rucsRegistrados, razonesRegistradas } = obtenerRucsYRazonesUsados());
          const nuevo = generarDatosUnicos(rucsRegistrados, razonesRegistradas, sequenceIndex);
          ruc = nuevo.ruc;
          razonSocial = nuevo.razonSocial;
          nombreComercial = nuevo.nombreComercial;
          if (overrideData && forcePattern) {
            razonSocial = construirRazonSocialMasiva(ruc, razonesRegistradas, sequenceIndex);
            nombreComercial = quitarSufijoEmpresa(razonSocial);
          }
          registrarLocal(ruc, razonSocial);
          await llenarDatos();
          if (await detectarValidacionDuplicado(page)) {
            throw new Error('Validación duplicado persiste después de reintento con nuevo RUC/Razón Social.');
          }
        }
      }

      // Seleccionar estado
      await seleccionarEstado(page, estadoSeleccionado);
      // Espera mínima para estabilidad visual

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
      const btnGuardar = page.getByRole('button', { name: 'Guardar' });
      await btnGuardar.waitFor({ state: 'visible', timeout: 5000 });
      await btnGuardar.click();
      const exito = await esperarResultadoGuardado(page);

      if (exito) {
        console.log(`✅ Administrado registrado - RUC: ${ruc}`);

        // Captura mensaje de éxito (toast verde) (reutiliza `capturarToastExito`)
        const screenshotDespues =
          (await capturarToastExito(page, '01-AGREGAR_ADMINISTRADO', '06_EXITO', ruc, razonSocial, 'AGREGAR_ADMINISTRADO')) ||
          // Fallback de captura completa (reutiliza `capturarPantallaMejorada`)
          (await capturarPantallaMejorada(page, '01-AGREGAR_ADMINISTRADO', '06_EXITO', ruc, razonSocial));

        let verificado = false;
        try {
          verificado = await verificarAdministradoRegistrado(page, ruc, verificarRetries, verificarWaitMs);
        } catch (error) {
          throw error;
        }
        if (!verificado) {
          if (strictVerify) {
            throw new Error(`El RUC ${ruc} no aparece en Administrado después del guardado.`);
          }
          console.warn(`⚠️ Verificación omitida: el RUC ${ruc} no aparece aún en Administrado.`);
        }

        // Actualizar reporte
        const registro: RegistroAdministrado = {
          id: numeroRegistro,
          ruc,
          razonSocial: razonSocial,
          nombreComercial: nombreComercial,
          estado: estadoSeleccionado,
          timestamp: new Date().toISOString(),
          screenshot: screenshotAntes,
          screenshot_despues: screenshotDespues,
          estado_registro: 'exitoso'
        };
        actualizarReporte(registro);

        registroExitoso = true;
        return ruc;
      } else {
        console.warn('⚠️ No se detectó éxito. Reintentando flujo...');
        const scope = await asegurarFormularioAdministrado(page);
        const inputRuc = scope.locator('input[formcontrolname*="ruc" i], input[name*="ruc" i], input[id*="ruc" i], input[placeholder*="ruc" i], input[aria-label*="ruc" i]').first();
        if (await inputRuc.isVisible().catch(() => false)) {
          await inputRuc.click();
          if (await inputRuc.isEditable().catch(() => false)) {
            await inputRuc.clear();
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error en intento ${intento + 1} (RUC: ${ruc}):`, error);
      if (page.isClosed()) {
        throw new Error('La página se cerró durante el registro, se detienen reintentos.');
      }
    }
  }

  if (!registroExitoso) {
    const ultimoRuc = rucsUsados[rucsUsados.length - 1] || 'N/D';
    throw new Error(`No se pudo registrar administrado después de ${maxReintentos} intentos. Último RUC: ${ultimoRuc}`);
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

test('01-AGREGAR ADMINISTRADO: Registro con RUC automático y reintentos', async ({ page }, testInfo) => {
  console.log('\n📱 CASO 01: AGREGAR ADMINISTRADO\n');
  try {
    const ctx = getTestContext(testInfo);
    inicializarRunActual();
    if (ctx.isMassive) {
      test.setTimeout(300000);
    }

    await allure.step('PASO 1: LOGIN + NAVEGACIÓN', async () => {
      await iniciarSesionYNavegar(page, 'infractor', testInfo.workerIndex);
      allure.attachment('Usuario', obtenerCredencial(testInfo.workerIndex).usuario, 'text/plain');
    });

    await allure.step('PASO 2: ABRIR FORMULARIO', async () => {
      await abrirFormularioNuevoAdministrado(page);
      await allure.attachment('Pantalla formulario', await page.screenshot({ fullPage: true }), 'image/png');
    });

    await allure.step('PASO 3: REGISTRAR ADMINISTRADO', async () => {
      console.log('\n📝 REGISTRANDO ADMINISTRADO...');
      const totalCasos = typeof ctx.repeatEach === 'number' ? ctx.repeatEach : 1;
      const idxCaso = typeof ctx.repeatIndex === 'number' ? ctx.repeatIndex : 0;
      const dataMasivo = ctx.isMassive ? generateTestData(ctx.workerIndex, ctx.repeatIndex) : null;
      const estadoSeleccionado = ctx.isMassive && dataMasivo
        ? getEstadoLabel(dataMasivo.estado)
        : calcularEstadoCaso(idxCaso, totalCasos);
      const esMasivo = ctx.isMassive;
      const sequenceIndex = typeof ctx.repeatIndex === 'number' ? ctx.repeatIndex : 0;
      const rucRegistrado = await registrarAdministrado(
        page,
        1,
        estadoSeleccionado,
        esMasivo ? 240000 : 90000,
        esMasivo ? 6 : 2,
        esMasivo ? 5000 : 500,
        esMasivo ? true : true,
        2,
        dataMasivo ? { ruc: dataMasivo.ruc, razonSocial: dataMasivo.razonSocial, nombreComercial: dataMasivo.nombreComercial } : undefined,
        esMasivo,
        sequenceIndex
      );
      allure.attachment('RUC registrado', rucRegistrado, 'text/plain');
      allure.attachment('Estado seleccionado', estadoSeleccionado, 'text/plain');
      const credencial = obtenerCredencial(testInfo.workerIndex);
      allure.attachment('Credencial', JSON.stringify(credencial), 'application/json');
      await allure.step('Captura de formulario lleno', async () => {
        await capturarFormularioLleno(page, '01-AGREGAR_ADMINISTRADO', rucRegistrado, '', 'REGISTRO', 'FORMULARIO_LLENADO');
        allure.attachment('Pantalla formulario lleno', await page.screenshot({ fullPage: true }), 'image/png');
      });
    });

    await allure.step('RESULTADO FINAL', async () => {
      allure.attachment('Timestamp', new Date().toISOString(), 'text/plain');
      allure.attachment('Resumen', 'Administrado agregado correctamente', 'text/plain');
    });

    console.log('\n✅ CASO 01 COMPLETADO EXITOSAMENTE');
    console.log(`📊 Resumen:`);
    // ...existing code...
    console.log('\n✨ Administrado agregado correctamente.\n');
  } catch (error) {
    console.error('\n❌ ERROR EN CASO 01:', error);
    try {
      await capturarPantalla(page, '01-agregar-administrado', 'ERROR');
      await allure.attachment('Error', String(error), 'text/plain');
      await allure.attachment('Pantalla error', await page.screenshot({ fullPage: true }), 'image/png');
    } catch {}
    throw error;
  }
});
