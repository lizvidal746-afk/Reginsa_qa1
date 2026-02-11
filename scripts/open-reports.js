const { spawn, spawnSync } = require('child_process');
const net = require('net');
const fs = require('fs');
const path = require('path');

const DEFAULT_PLAYWRIGHT_START = 9323;
const DEFAULT_PLAYWRIGHT_END = 9333;
const DEFAULT_ALLURE_START = 9343;
const DEFAULT_ALLURE_END = 9353;

const tryListen = (port) => new Promise((resolve) => {
  const server = net.createServer();
  server.once('error', () => resolve(false));
  server.once('listening', () => {
    server.close(() => resolve(true));
  });
  server.listen(port, '127.0.0.1');
});

const isPortInUse = async (port) => {
  const free = await tryListen(port);
  return !free;
};

const findFreePortInRange = async (start, end) => {
  for (let port = start; port <= end; port += 1) {
    // eslint-disable-next-line no-await-in-loop
    const ok = await tryListen(port);
    if (ok) return port;
  }
  return 0;
};

const resolvePort = async (envValue, start, end) => {
  if (envValue) {
    const desired = Number(envValue);
    if (Number.isFinite(desired) && desired > 0) {
      const free = await tryListen(desired);
      if (free) return desired;
    }
  }
  return findFreePortInRange(start, end);
};

const isWindows = process.platform === 'win32';
const localBin = path.join(process.cwd(), 'node_modules', '.bin');
const playwrightBin = path.join(localBin, isWindows ? 'playwright.cmd' : 'playwright');
const allureBin = path.join(localBin, isWindows ? 'allure.cmd' : 'allure');
const npxCommand = isWindows ? 'npx.cmd' : 'npx';
const hasPlaywrightBin = fs.existsSync(playwrightBin);
const hasAllureBin = fs.existsSync(allureBin);
const playwrightCommand = hasPlaywrightBin ? playwrightBin : npxCommand;
const allureCommand = hasAllureBin ? allureBin : npxCommand;
const useNpxForPlaywright = !hasPlaywrightBin;
const useNpxForAllure = !hasAllureBin;

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const toCmdArg = (value) => {
  const raw = String(value);
  if (!/[\s"]/g.test(raw)) return raw;
  return `"${raw.replace(/"/g, '""')}"`;
};

const spawnDetached = (command, args, cwd, logBaseName) => {
  try {
    const lower = String(command).toLowerCase();
    const needsShell = isWindows && (lower.endsWith('.cmd') || lower.endsWith('.bat'));
    if (isWindows) {
      const logsDir = path.join(cwd, 'reportes', 'logs');
      ensureDir(logsDir);
      const stdoutPath = path.join(logsDir, `${logBaseName}.out.log`);
      const stderrPath = path.join(logsDir, `${logBaseName}.err.log`);
      const cmdLine = [toCmdArg(command), ...args.map(toCmdArg)].join(' ');
      const psCommand = [
        "Start-Process -FilePath 'cmd.exe'",
        "-ArgumentList '/c',",
        `'${cmdLine.replace(/'/g, "''")}'`,
        `-WorkingDirectory '${String(cwd).replace(/'/g, "''")}'`,
        "-WindowStyle Hidden",
        `-RedirectStandardOutput '${String(stdoutPath).replace(/'/g, "''")}'`,
        `-RedirectStandardError '${String(stderrPath).replace(/'/g, "''")}'`
      ].join(' ');
      const child = spawn('powershell', ['-NoProfile', '-WindowStyle', 'Hidden', '-Command', psCommand], {
        windowsHide: true,
        stdio: 'ignore',
        detached: true
      });
      child.unref();
      return true;
    }

    const child = spawn(command, args, {
      cwd,
      windowsHide: true,
      stdio: 'ignore',
      detached: true,
      shell: needsShell
    });
    child.unref();
    return true;
  } catch (error) {
    console.warn(`Failed to spawn: ${command} ${args.join(' ')}`);
    if (error instanceof Error) {
      console.warn(`Spawn error: ${error.message}`);
    }
    return false;
  }
};

const spawnPersistentServer = (command, args, cwd) => {
  if (!isWindows) {
    return spawnDetached(command, args, cwd, 'server');
  }
  try {
    const cmdLine = [toCmdArg(command), ...args.map(toCmdArg)].join(' ');
    const child = spawn('cmd.exe', ['/c', 'start', '""', '/min', 'cmd.exe', '/k', cmdLine], {
      cwd,
      windowsHide: true,
      stdio: 'ignore',
      detached: true,
      shell: false
    });
    child.unref();
    return true;
  } catch (error) {
    return false;
  }
};

const waitForPortOpen = async (port, timeoutMs) => {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    // eslint-disable-next-line no-await-in-loop
    const free = await tryListen(port);
    if (!free) return true;
    // eslint-disable-next-line no-await-in-loop
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  return false;
};

const toFileUrl = (filePath) => {
  const normalized = String(filePath).replace(/\\/g, '/');
  return `file:///${normalized}`;
};

const openUrl = (target) => {
  const resolved = fs.existsSync(String(target)) ? toFileUrl(String(target)) : String(target);
  if (isWindows) {
    const child = spawn('cmd.exe', ['/c', 'start', '""', resolved], {
      windowsHide: true,
      stdio: 'ignore',
      detached: true
    });
    child.unref();
    return;
  }
  const opener = process.platform === 'darwin' ? 'open' : 'xdg-open';
  spawnDetached(opener, [resolved], process.cwd());
};

const openUrlDelayed = (url, delayMs) => {
  setTimeout(() => openUrl(url), delayMs);
};

const hasHtmlReport = (cwd) => {
  const htmlPath = path.join(cwd, 'playwright-report', 'index.html');
  return fs.existsSync(htmlPath);
};

const hasAllureResults = (cwd) => {
  const resultsDir = path.join(cwd, 'allure-results');
  return fs.existsSync(resultsDir) && fs.readdirSync(resultsDir).length > 0;
};

const generateAllureReport = (cwd) => {
  const lower = String(allureCommand).toLowerCase();
  const needsShell = isWindows && (lower.endsWith('.cmd') || lower.endsWith('.bat'));
  const args = useNpxForAllure
    ? ['allure', 'generate', './allure-results', '--clean', '-o', './allure-report']
    : ['generate', './allure-results', '--clean', '-o', './allure-report'];
  const logsDir = path.join(cwd, 'reportes', 'logs');
  ensureDir(logsDir);
  const outPath = path.join(logsDir, 'allure-generate.out.log');
  const errPath = path.join(logsDir, 'allure-generate.err.log');

  const result = spawnSync(
    allureCommand,
    args,
    {
      cwd,
      shell: needsShell,
      windowsHide: true,
      stdio: 'pipe'
    }
  );
  fs.writeFileSync(outPath, result.stdout ? result.stdout.toString() : '', 'utf-8');
  fs.writeFileSync(errPath, result.stderr ? result.stderr.toString() : '', 'utf-8');
  return result.status === 0;
};

(async () => {
  const cwd = process.cwd();
  const playwrightPort = await resolvePort(
    process.env.PLAYWRIGHT_REPORT_PORT,
    DEFAULT_PLAYWRIGHT_START,
    DEFAULT_PLAYWRIGHT_END
  );
  const allurePort = await resolvePort(
    process.env.ALLURE_REPORT_PORT,
    DEFAULT_ALLURE_START,
    DEFAULT_ALLURE_END
  );
  if (!hasHtmlReport(cwd)) {
    console.warn('Playwright report: playwright-report/index.html not found.');
  } else if (playwrightPort) {
    const args = useNpxForPlaywright
      ? ['playwright', 'show-report', 'playwright-report', '--port', String(playwrightPort)]
      : ['show-report', 'playwright-report', '--port', String(playwrightPort)];
    console.log(`Playwright command: ${playwrightCommand} ${args.join(' ')}`);
    const started = spawnPersistentServer(playwrightCommand, args, cwd);
    if (started) {
      await waitForPortOpen(playwrightPort, 10000);
      openUrlDelayed(`http://localhost:${playwrightPort}`, 500);
      console.log(`Playwright report: http://localhost:${playwrightPort}`);
    } else {
      console.warn('Playwright report: failed to start server.');
    }
  } else {
    console.warn('Playwright report: no free port found.');
  }

  if (!hasAllureResults(cwd)) {
    console.warn('Allure report: allure-results folder not found or empty.');
  } else if (allurePort) {
    const shouldServe = process.env.ALLURE_SERVE !== '0';
    const generated = generateAllureReport(cwd);
    if (generated) {
      const reportIndex = path.join(cwd, 'allure-report', 'index.html');
      if (fs.existsSync(reportIndex)) {
        if (!shouldServe) {
          openUrl(reportIndex);
        }
        console.log(`Allure report (HTML): ${reportIndex}`);
      } else {
        console.warn('Allure report: index.html not found after generation.');
      }
    } else {
      console.warn('Allure report: failed to generate static report.');
      console.warn('Check reportes/logs/allure-generate.err.log for details.');
    }

    if (shouldServe && generated) {
      if (await isPortInUse(allurePort)) {
        console.log(`Allure report (server): http://127.0.0.1:${allurePort} (already running)`);
      } else {
        const args = useNpxForAllure
          ? ['allure', 'open', './allure-report', '--port', String(allurePort)]
          : ['open', './allure-report', '--port', String(allurePort)];
        console.log(`Allure command: ${allureCommand} ${args.join(' ')}`);
        const started = spawnPersistentServer(allureCommand, args, cwd);
        if (started) {
          await waitForPortOpen(allurePort, 15000);
          console.log(`Allure report (server): http://127.0.0.1:${allurePort}`);
        } else {
          console.warn('Allure report: failed to start server.');
        }
      }
    }
  } else {
    console.warn('Allure report: no free port found for server.');
  }
})();
