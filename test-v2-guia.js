#!/usr/bin/env node

/**
 * GUÍA RÁPIDA: EJECUTAR TEST V2 OPTIMIZADO
 * 
 * El test 02-registrar-sancion-v2.spec.ts es una REESCRITURA COMPLETA
 * basada en selectores que funcionaban en el test-2.spec.ts (codegen)
 */

const fs = require('fs');
const path = require('path');

console.clear();
console.log('\n' + '═'.repeat(90));
console.log('🚀 GUÍA DE EJECUCIÓN - TEST V2 OPTIMIZADO'.padEnd(90));
console.log('═'.repeat(90) + '\n');

console.log('📌 OPCIÓN 1: Terminal NPM (Recomendado)');
console.log('─────────────────────────────────────────────────────────────────────────────────');
console.log('  cd d:\\SUNEDU\\SELENIUM\\playwrigth');
console.log('  npm run test:02-v2');
console.log('');

console.log('📌 OPCIÓN 2: PowerShell');
console.log('─────────────────────────────────────────────────────────────────────────────────');
console.log('  .\\ejecutar-test-02-v2.ps1');
console.log('');

console.log('📌 OPCIÓN 3: Batch');
console.log('─────────────────────────────────────────────────────────────────────────────────');
console.log('  ejecutar-test-02-v2.bat');
console.log('');

console.log('📌 OPCIÓN 4: VS Code Task');
console.log('─────────────────────────────────────────────────────────────────────────────────');
console.log('  Ctrl+Shift+P → "Run Task" → "test:02-v2"');
console.log('');

console.log('\n' + '═'.repeat(90));
console.log('✨ MEJORAS PRINCIPALES EN V2'.padEnd(90));
console.log('═'.repeat(90) + '\n');

const mejoras = [
  {
    titulo: '✓ Selectores simplificados',
    antes: 'Múltiples métodos + loops + error handling',
    ahora: 'Selectores directos del codegen (.p-checkbox-box, getByPlaceholder, etc)'
  },
  {
    titulo: '✓ Sin complejidad innecesaria',
    antes: 'Código con múltiples try-catch y fallbacks',
    ahora: 'Código limpio y directo'
  },
  {
    titulo: '✓ Timeouts predecibles',
    antes: 'Esperas aleatorias (500-2000ms)',
    ahora: 'Esperas consistentes por tipo de acción'
  },
  {
    titulo: '✓ Mejor logging',
    antes: 'Logs sin estructura clara',
    ahora: 'Logs con estructura visual (┌─ │ └─)'
  },
  {
    titulo: '✓ Basado en código probado',
    antes: 'Selectores por ID (#multa, #suspension)',
    ahora: 'Selectores del test-2.spec.ts que funcionaba'
  }
];

mejoras.forEach((m, i) => {
  console.log(`${i + 1}. ${m.titulo}`);
  console.log(`   ❌ ANTES: ${m.antes}`);
  console.log(`   ✅ AHORA: ${m.ahora}`);
  console.log('');
});

console.log('\n' + '═'.repeat(90));
console.log('📊 COMPARACIÓN DE SELECTORES'.padEnd(90));
console.log('═'.repeat(90) + '\n');

const comparacion = [
  ['Elemento', 'V1 (Anterior)', 'V2 (Nuevo)', 'Fuente'],
  ['─'.repeat(20), '─'.repeat(25), '─'.repeat(30), '─'.repeat(15)],
  ['Checkbox', '#multa, #suspension', '.p-checkbox-box + nth()', 'test-2.spec.ts'],
  ['Radio UI/SOLES', '#uit, #soles', '[role="radio"]', 'test-2.spec.ts'],
  ['Input Monto', 'input[name="valor..."]', 'getByRole("textbox", {name:"0.00"})', 'test-2.spec.ts'],
  ['Dropdown Tiempo', 'p-dropdown + complex', 'p-dropdown + getByRole()', 'test-2.spec.ts'],
  ['Cantidad', 'input[name="cantidad..."]', 'getByPlaceholder("Cantidad")', 'test-2.spec.ts'],
];

comparacion.forEach(fila => {
  console.log(`  ${fila[0].padEnd(20)} | ${fila[1].padEnd(25)} | ${fila[2].padEnd(30)} | ${fila[3]}`);
});

console.log('\n' + '═'.repeat(90));
console.log('🎯 QUÉ ESPERAR'.padEnd(90));
console.log('═'.repeat(90) + '\n');

console.log('✅ El test debería:');
console.log('  • Registrar 5 sanciones diferentes para UN administrado');
console.log('  • Mostrar "✅ GUARDADA" para cada sanción');
console.log('  • Terminar con mensaje "1 registro creado"');
console.log('  • Tomar ~5-10 minutos (300s timeout)');
console.log('  • Capturar screenshots automáticamente\n');

console.log('❌ Si falla:');
console.log('  • Revisar consola: ¿Qué paso falló exactamente?');
console.log('  • Verificar selectores: ¿HTML cambió?');
console.log('  • Debugging: npx playwright test --debug');
console.log('  • Regenerar con codegen: npx playwright codegen\n');

console.log('\n' + '═'.repeat(90));
console.log('📚 ARCHIVOS RELACIONADOS'.padEnd(90));
console.log('═'.repeat(90) + '\n');

const archivos = [
  ['tests/casos-prueba/02-registrar-sancion-v2.spec.ts', 'Test optimizado (NUEVO)'],
  ['tests/test-2.spec.ts', 'Referencia codegen (selector patterns)'],
  ['tests/casos-prueba/02-registrar-sancion.spec.ts', 'Versión antigua (no usar)'],
  ['tests/utilidades/reginsa-actions.ts', 'Funciones auxiliares'],
  ['CASO_02_V2_OPTIMIZADO.md', 'Documentación detallada de cambios'],
];

archivos.forEach(([archivo, desc]) => {
  const exists = fs.existsSync(path.join('d:\\SUNEDU\\SELENIUM\\playwrigth', archivo));
  const icon = exists ? '✓' : '✗';
  console.log(`  ${icon} ${archivo.padEnd(50)} - ${desc}`);
});

console.log('\n' + '═'.repeat(90));
console.log('💡 TIPS'.padEnd(90));
console.log('═'.repeat(90) + '\n');

console.log('🔍 Para ver ejecución en vivo:');
console.log('   npx playwright test --headed --reporter=verbose\n');

console.log('📸 Para ver reportes después:');
console.log('   npx playwright show-report\n');

console.log('🐛 Para debugging interactivo:');
console.log('   npx playwright test --debug\n');

console.log('⚡ Para una ejecución más rápida (sin reportes):');
console.log('   npx playwright test tests/casos-prueba/02-registrar-sancion-v2.spec.ts --headed\n');

console.log('\n' + '═'.repeat(90));
console.log('✅ LISTO PARA EJECUTAR'.padEnd(90));
console.log('═'.repeat(90) + '\n');

console.log('Presiona cualquier tecla para continuar...\n');
