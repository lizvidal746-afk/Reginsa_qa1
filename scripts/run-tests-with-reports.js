const { spawn } = require('child_process');

const rawArgs = process.argv.slice(2);
let forceScreenshots = false;
let skipScreenshots = false;

const filteredArgs = [];
for (const arg of rawArgs) {
  if (arg === '--screenshots') {
    forceScreenshots = true;
    continue;
  }
  if (arg === '--skip-screenshots') {
    skipScreenshots = true;
    continue;
  }
  filteredArgs.push(arg);
}

const command = filteredArgs.join(' ').trim();
if (!command) {
  console.error('Uso: node scripts/run-tests-with-reports.js <comando>');
  process.exit(1);
}

const buildEnv = () => {
  const env = { ...process.env };
  if (forceScreenshots) env.SKIP_SCREENSHOTS = '0';
  if (skipScreenshots) env.SKIP_SCREENSHOTS = '1';
  return env;
};

const run = (cmd) => new Promise((resolve) => {
  const child = spawn(cmd, { shell: true, stdio: 'inherit', env: buildEnv() });
  child.on('exit', (code) => resolve(typeof code === 'number' ? code : 1));
});

(async () => {
  const testCode = await run(command);
  await run('npm run reports:open');
  process.exit(testCode);
})();
