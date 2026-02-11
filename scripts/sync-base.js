const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const baseRucsExcelPath = path.join(__dirname, '..', 'test-files', 'Administrados_BD.xlsx');
const administradosSistemaPath = path.join(__dirname, '..', 'reportes', 'administrados-registrados.json');
const registrosPath = path.join(__dirname, '..', 'reportes', 'registros-administrados.json');
const reservadosPath = path.join(__dirname, '..', 'reportes', 'administrados-reservados.json');
const reservadosLockPath = path.join(__dirname, '..', 'reportes', 'administrados-reservados.lock');

const normalizarTexto = (texto) => (texto || '').toString().trim().toUpperCase();
const normalizarRuc = (ruc) => (ruc || '').toString().trim();

const toEstado = (row) => {
  const bitActivo = (row.BIT_ACTIVO ?? '').toString().trim();
  const idEstado = (row.ID_ESTADO ?? '').toString().trim();
  return bitActivo === '1' || idEstado === '1' ? 'Licenciada' : 'No licenciada';
};

const readExcel = () => {
  if (!fs.existsSync(baseRucsExcelPath)) {
    throw new Error(`No existe el Excel base: ${baseRucsExcelPath}`);
  }
  const wb = XLSX.readFile(baseRucsExcelPath);
  const sheetName = wb.SheetNames[0];
  if (!sheetName) return [];
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '' });
  return rows.map((row) => ({
    ruc: normalizarRuc(row.RUC),
    razonSocial: (row.RAZON_SOCIAL || '').toString().trim(),
    nombreComercial: (row.NOMBRE_COMERCIAL || '').toString().trim(),
    estado: toEstado(row)
  }));
};

const dedupe = (items) => {
  const vistos = new Set();
  return items.filter((item) => {
    const key = `${normalizarTexto(normalizarRuc(item.ruc))}|${normalizarTexto(item.razonSocial)}`;
    if (key === '|' || vistos.has(key)) return false;
    vistos.add(key);
    return true;
  });
};

const writeJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const main = () => {
  const base = dedupe(readExcel());
  writeJson(administradosSistemaPath, { registros: base });

  if (fs.existsSync(registrosPath)) {
    fs.unlinkSync(registrosPath);
  }
  if (fs.existsSync(reservadosPath)) {
    fs.unlinkSync(reservadosPath);
  }
  if (fs.existsSync(reservadosLockPath)) {
    fs.unlinkSync(reservadosLockPath);
  }

  console.log(`Base sincronizada: ${base.length} registros`);
};

main();
