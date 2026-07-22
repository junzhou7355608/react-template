import { spawnSync } from 'node:child_process';
import { closeSync, openSync, readFileSync, realpathSync } from 'node:fs';
import { arch, platform, release } from 'node:os';
import { dirname, resolve } from 'node:path';
import { isatty } from 'node:tty';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const packageJsonSource = readPackageJson();

interface CommandResult {
  output?: string;
  status: 'failed' | 'not-installed' | 'success';
}

interface Version {
  major: number;
  minor: number;
  patch: number;
}

function hasControllingTerminal(): boolean {
  if (process.stdout.isTTY || process.stderr.isTTY) {
    return true;
  }

  const terminalPath = platform() === 'win32' ? 'CONOUT$' : '/dev/tty';

  try {
    const descriptor = openSync(
      terminalPath,
      platform() === 'win32' ? 'w' : 'r',
    );

    try {
      return isatty(descriptor);
    } finally {
      closeSync(descriptor);
    }
  } catch {
    return false;
  }
}

const colorForced =
  process.env['FORCE_COLOR'] !== undefined &&
  process.env['FORCE_COLOR'] !== '0';
const colorDisabled =
  process.env['FORCE_COLOR'] === '0' ||
  process.env['NO_COLOR'] !== undefined ||
  process.env['CI'] !== undefined ||
  process.env['TERM'] === undefined ||
  process.env['TERM'] === 'dumb';
const colorEnabled =
  colorForced || (!colorDisabled && hasControllingTerminal());

function color(value: string, code: number): string {
  return colorEnabled ? `\u001B[${String(code)}m${value}\u001B[0m` : value;
}

function green(value: string): string {
  return color(value, 32);
}

function yellow(value: string): string {
  return color(value, 33);
}

function red(value: string): string {
  return color(value, 31);
}

function readPackageJson(): string {
  try {
    return readFileSync(resolve(projectRoot, 'package.json'), 'utf8');
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(yellow(`警告：无法读取 package.json：${message}`));
    return '';
  }
}

function run(command: string, args: string[]): CommandResult {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: 'utf8',
    windowsHide: true,
  });

  if (result.error) {
    return {
      status:
        'code' in result.error && result.error.code === 'ENOENT'
          ? 'not-installed'
          : 'failed',
    };
  }

  if (result.status !== 0) {
    return { status: 'failed' };
  }

  return {
    output: result.stdout.trim(),
    status: 'success',
  };
}

function findPackageJsonValue(key: string): string | undefined {
  const match = new RegExp(`"${key}"\\s*:\\s*"([^"]+)"`).exec(
    packageJsonSource,
  );

  return match?.[1];
}

function findCommand(command: string): CommandResult {
  const result = run(platform() === 'win32' ? 'where' : 'which', [command]);

  if (result.status !== 'success' || !result.output) {
    return { status: 'not-installed' };
  }

  return {
    output: result.output.split(/\r?\n/, 1)[0],
    status: 'success',
  };
}

function formatCommandResult(result: CommandResult): string {
  if (result.status === 'not-installed') {
    return '未安装';
  }

  if (result.status === 'failed' || !result.output) {
    return '未知';
  }

  return result.output;
}

function parseVersion(value: string): Version | undefined {
  const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(value);

  if (!match?.[1] || !match[2] || !match[3]) {
    return undefined;
  }

  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
  };
}

function compareVersions(left: Version, right: Version): number {
  return (
    left.major - right.major ||
    left.minor - right.minor ||
    left.patch - right.patch
  );
}

function satisfiesComparator(
  version: Version,
  operator: '^' | '>=',
  minimum: Version,
): boolean {
  if (operator === '>=') {
    return compareVersions(version, minimum) >= 0;
  }

  return (
    version.major === minimum.major && compareVersions(version, minimum) >= 0
  );
}

function satisfiesNodeRequirement(
  currentVersion: string,
  requirement: string,
): boolean | undefined {
  const version = parseVersion(currentVersion);

  if (!version) {
    return undefined;
  }

  const alternatives = requirement.split('||').map((value) => value.trim());
  let recognizedAlternative = false;

  for (const alternative of alternatives) {
    const match = /^(\^|>=)(\d+\.\d+\.\d+)$/.exec(alternative);

    if (!match?.[1] || !match[2]) {
      continue;
    }

    const minimum = parseVersion(match[2]);

    if (!minimum || (match[1] !== '^' && match[1] !== '>=')) {
      continue;
    }

    recognizedAlternative = true;

    if (satisfiesComparator(version, match[1], minimum)) {
      return true;
    }
  }

  return recognizedAlternative ? false : undefined;
}

function getPackageManager(): string {
  const userAgent = process.env['npm_config_user_agent'];

  if (!userAgent) {
    return '未知';
  }

  const [manager] = userAgent.split(' ');

  return manager?.length ? manager : '未知';
}

function getNvmStatus(): string {
  const executablePath = process.execPath.replaceAll('\\', '/');
  const nvmDirectory = process.env['NVM_DIR']?.replaceAll('\\', '/');
  const nvmBinaryDirectory = process.env['NVM_BIN']?.replaceAll('\\', '/');
  const isNvmPath =
    executablePath.includes('/.nvm/versions/node/') ||
    (nvmDirectory !== undefined &&
      executablePath.startsWith(`${nvmDirectory}/`)) ||
    (nvmBinaryDirectory !== undefined &&
      executablePath.startsWith(`${nvmBinaryDirectory}/`));

  if (!isNvmPath) {
    return '否';
  }

  return nvmDirectory ? `是（${nvmDirectory}）` : '是';
}

function getCorepackPnpmStatus(pnpmPath: CommandResult): string {
  if (pnpmPath.status !== 'success' || !pnpmPath.output) {
    return pnpmPath.status === 'not-installed' ? '未安装' : '未知';
  }

  try {
    const resolvedPath = realpathSync(pnpmPath.output);
    const normalizedPath = resolvedPath.replaceAll('\\', '/').toLowerCase();

    if (normalizedPath.includes('/corepack/')) {
      return '是';
    }

    const shimSource = readFileSync(pnpmPath.output, 'utf8')
      .slice(0, 16_384)
      .toLowerCase();

    return shimSource.includes('corepack') ? '是' : '否';
  } catch {
    return '未知';
  }
}

function warn(message: string): void {
  console.warn(yellow(`警告：${message}`));
}

function warnMismatch(message: string): void {
  console.warn(red(`警告：${message}`));
}

function main(): void {
  const nodeRequirement =
    findPackageJsonValue('node') ?? '^20.19.0 || >=22.12.0';
  const packageManagerDeclaration = findPackageJsonValue('packageManager');
  const expectedPnpmVersion =
    packageManagerDeclaration?.match(/^pnpm@([^+]+)/)?.[1];
  const packageManager = getPackageManager();
  const pnpmVersion = run('pnpm', ['--version']);
  const pnpmPath = findCommand('pnpm');
  const corepackVersion = run('corepack', ['--version']);
  const corepackPnpmStatus = getCorepackPnpmStatus(pnpmPath);
  const nodeRequirementStatus = satisfiesNodeRequirement(
    process.version,
    nodeRequirement,
  );
  const packageManagerStatus = packageManager.startsWith('pnpm/');
  const pnpmVersionStatus =
    pnpmVersion.status === 'success' &&
    pnpmVersion.output !== undefined &&
    expectedPnpmVersion !== undefined
      ? pnpmVersion.output === expectedPnpmVersion
      : undefined;
  const shell =
    process.env['SHELL'] ??
    process.env['ComSpec'] ??
    process.env['COMSPEC'] ??
    '未知';

  console.log('当前环境');
  console.log(`  系统：${platform()} ${release()}（${arch()}）`);
  console.log(`  Shell: ${shell}`);
  console.log(
    `  Node.js：${
      nodeRequirementStatus === true
        ? green(process.version)
        : nodeRequirementStatus === false
          ? red(process.version)
          : yellow(process.version)
    }（项目要求：${nodeRequirement}）`,
  );
  console.log(`  Node.js 路径：${process.execPath}`);
  const nvmStatus = getNvmStatus();
  console.log(
    `  是否由 nvm 管理：${
      nvmStatus.startsWith('是') ? green(nvmStatus) : yellow(nvmStatus)
    }`,
  );
  console.log(
    `  当前包管理器：${
      packageManagerStatus
        ? green(packageManager)
        : packageManager === '未知'
          ? yellow(packageManager)
          : red(packageManager)
    }`,
  );
  const formattedPnpmVersion = formatCommandResult(pnpmVersion);
  console.log(
    `  pnpm：${
      pnpmVersionStatus === true
        ? green(formattedPnpmVersion)
        : pnpmVersionStatus === false
          ? red(formattedPnpmVersion)
          : yellow(formattedPnpmVersion)
    }${expectedPnpmVersion ? `（项目要求：${expectedPnpmVersion}）` : ''}`,
  );
  console.log(`  pnpm 路径：${formatCommandResult(pnpmPath)}`);
  const formattedCorepackVersion = formatCommandResult(corepackVersion);
  console.log(
    `  Corepack：${
      corepackVersion.status === 'success'
        ? green(formattedCorepackVersion)
        : yellow(formattedCorepackVersion)
    }`,
  );
  console.log(
    `  pnpm 是否由 Corepack 提供：${
      corepackPnpmStatus === '是'
        ? green(corepackPnpmStatus)
        : yellow(corepackPnpmStatus)
    }`,
  );

  if (nodeRequirementStatus === false) {
    warnMismatch(
      `Node.js ${process.version} 不满足项目要求 ${nodeRequirement}。`,
    );
  } else if (nodeRequirementStatus === undefined) {
    warn(`无法判断当前 Node.js 是否满足项目要求 ${nodeRequirement}。`);
  }

  if (!packageManager.startsWith('pnpm/')) {
    if (packageManager === '未知') {
      warn('无法确定调用 prepare 的包管理器。');
    } else {
      warnMismatch(`prepare 由 ${packageManager} 调用，但项目要求使用 pnpm。`);
    }
  }

  if (pnpmVersion.status !== 'success' || !pnpmVersion.output) {
    warn('无法确定当前安装的 pnpm 版本。');
  } else if (
    expectedPnpmVersion &&
    pnpmVersion.output !== expectedPnpmVersion
  ) {
    warnMismatch(
      `pnpm ${pnpmVersion.output} 与项目要求的版本 ${expectedPnpmVersion} 不一致。`,
    );
  }

  if (corepackVersion.status === 'failed') {
    warn('无法确定 Corepack 版本。');
  }

  if (corepackPnpmStatus === '未知') {
    warn('无法确定 pnpm 是否由 Corepack 提供。');
  }
}

try {
  main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  warn(`环境检测失败：${message}`);
}
