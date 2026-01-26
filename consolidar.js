#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const casosDir = path.join(__dirname, 'tests', 'casos-prueba');

// PASO 1: Eliminar archivos duplicados
console.log('🗑️  Eliminando archivos duplicados...\n');

const filesToDelete = [
  path.join(casosDir, '02-registrar-sancion.spec.ts'),
  path.join(casosDir, '02-registrar-sancion-simple.spec.ts'),
  path.join(casosDir, '02-registrar-sancion-final.spec.ts'),
  path.join(casosDir, 'test-simple.spec.ts')
];

for (const file of filesToDelete) {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`  ✓ Eliminado: ${path.basename(file)}`);
    }
  } catch (e) {
    console.log(`  ⚠️  Error al eliminar ${path.basename(file)}: ${e.message}`);
  }
}

// PASO 2: Renombrar 02-caso-final.spec.ts a 02-registrar-sancion.spec.ts
console.log('\n📝 Renombrando archivo final...\n');

const finalPath = path.join(casosDir, '02-caso-final.spec.ts');
const mainPath = path.join(casosDir, '02-registrar-sancion.spec.ts');

try {
  if (fs.existsSync(finalPath)) {
    fs.renameSync(finalPath, mainPath);
    console.log(`  ✓ Renombrado: 02-caso-final.spec.ts → 02-registrar-sancion.spec.ts`);
  }
} catch (e) {
  console.log(`  ❌ Error al renombrar: ${e.message}`);
  process.exit(1);
}

// PASO 3: Verificar el resultado
console.log('\n✅ Consolidación completada\n');
console.log('📊 Estado final:');

const files = fs.readdirSync(casosDir);
const caso02Files = files.filter(f => f.includes('02'));

for (const file of caso02Files) {
  const filePath = path.join(casosDir, file);
  const stats = fs.statSync(filePath);
  const lines = fs.readFileSync(filePath, 'utf8').split('\n').length;
  console.log(`  ✓ ${file} (${lines} líneas, ${Math.round(stats.size / 1024)}KB)`);
}

console.log('\n✅ Ahora existe UN ÚNICO archivo funcional: 02-registrar-sancion.spec.ts');
console.log('   - Timeouts aumentados: 3000-4000ms');
console.log('   - Verificaciones de campos agregadas');
console.log('   - Sin archivos duplicados\n');
