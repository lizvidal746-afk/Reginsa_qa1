// Script Node.js para exportar administrados desde Excel a administrados.json
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const excelPath = path.join(__dirname, '../../test-files/Administrados_BD.xlsx');
const outputPath = path.join(__dirname, 'administrados.json');

if (!fs.existsSync(excelPath)) {
  console.error('No se encontró el archivo Administrados_BD.xlsx');
  process.exit(1);
}

const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' });

const administrados = rows.map(row => ({
  razonSocial: row['RAZON_SOCIAL'] || row['razon_social'] || row['Razon Social'] || '',
  ruc: row['RUC'] || row['ruc'] || '',
  nombreComercial: row['NOMBRE_COMERCIAL'] || row['nombre_comercial'] || '',
  // Agrega más campos si los necesitas
})).filter(a => a.razonSocial);

fs.writeFileSync(outputPath, JSON.stringify(administrados, null, 2));
console.log(`Exportados ${administrados.length} administrados a administrados.json`);
