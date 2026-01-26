const fs = require('fs');
const path = require('path');

const casosDir = path.join(__dirname, 'tests', 'casos-prueba');

// Archivos a eliminar
const filesToDelete = [
  '02-registrar-sancion.spec.ts',
  '02-registrar-sancion-simple.spec.ts',
  'test-simple.spec.ts'
];

// Eliminar archivos
for (const file of filesToDelete) {
  const filePath = path.join(casosDir, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`❌ Eliminado: ${file}`);
  }
}

// Renombrar final a principal
const finalPath = path.join(casosDir, '02-registrar-sancion-final.spec.ts');
const mainPath = path.join(casosDir, '02-registrar-sancion.spec.ts');

if (fs.existsSync(finalPath)) {
  fs.renameSync(finalPath, mainPath);
  console.log(`✅ Renombrado: 02-registrar-sancion-final.spec.ts → 02-registrar-sancion.spec.ts`);
}

console.log('\n✅ Consolidación completada');
console.log('✅ Ahora existe un único archivo: 02-registrar-sancion.spec.ts');
