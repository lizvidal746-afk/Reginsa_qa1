const { spawn } = require('child_process');

const command = process.argv.slice(2).join(' ').trim();
if (!command) {
  console.error('Uso: node scripts/run-tests-with-reports.js <comando>');
  process.exit(1);
}

const run = (cmd) => new Promise((resolve) => {
  const child = spawn(cmd, { shell: true, stdio: 'inherit' });
  child.on('exit', (code) => resolve(typeof code === 'number' ? code : 1));
});

(async () => {
  const testCode = await run(command);
  await run('npm run reports:open');
  process.exit(testCode);
})();
