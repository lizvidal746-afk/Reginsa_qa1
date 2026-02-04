const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let configPath = 'config/plan-ejecucion.json';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--config' && args[i + 1]) {
    configPath = args[i + 1];
  }
}

const resolvedConfig = path.resolve(process.cwd(), configPath);
if (!fs.existsSync(resolvedConfig)) {
  console.error(`No existe el archivo de configuración: ${resolvedConfig}`);
  process.exit(1);
}

const plan = JSON.parse(fs.readFileSync(resolvedConfig, 'utf-8'));
if (!plan.runs || !Array.isArray(plan.runs) || plan.runs.length === 0) {
  console.error('El plan no contiene ejecuciones válidas (runs).');
  process.exit(1);
}

const runCommand = (cmd, env) => new Promise((resolve) => {
  const child = spawn(cmd, { shell: true, stdio: 'inherit', env });
  child.on('exit', (code) => resolve(typeof code === 'number' ? code : 1));
});

(async () => {
  for (const run of plan.runs) {
    const nombre = run.nombre || 'ejecucion';
    const tests = Array.isArray(run.tests) ? run.tests : [];
    const repeticiones = Number(run.repeticiones || 1);
    const proyectos = Array.isArray(run.proyectos) && run.proyectos.length ? run.proyectos : ['chromium'];
    const headed = Boolean(run.headed);
    const capturas = run.capturas !== false;

    if (tests.length === 0) {
      console.log(`⚠️  ${nombre}: no hay tests definidos, se omite.`);
      continue;
    }

    for (const proyecto of proyectos) {
      const env = { ...process.env };
      env.SKIP_SCREENSHOTS = capturas ? '0' : '1';

      const cmd = [
        'npx playwright test',
        tests.join(' '),
        `--project=${proyecto}`,
        `--repeat-each=${repeticiones}`,
        headed ? '--headed' : ''
      ].filter(Boolean).join(' ');

      console.log(`\n▶️  Ejecutando: ${nombre} | proyecto=${proyecto} | repeticiones=${repeticiones} | capturas=${capturas ? 'SI' : 'NO'}`);
      const code = await runCommand(cmd, env);
      if (code !== 0) {
        console.log(`❌ Falló ejecución: ${nombre} (${proyecto})`);
        process.exit(code);
      }
    }
  }
})();
