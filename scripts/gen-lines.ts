import { spawnSync } from 'node:child_process';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

interface CliOptions {
  includeGenerated: boolean;
  outputPath: string;
  overLines: number;
  rootDir: string;
  thresholds: number[];
}

interface SourceFile {
  lines: number;
  path: string;
}

interface PriorityRule {
  label: string;
  priority: string;
  threshold: number;
}

type OutputRow = SourceFile & {
  priority: string;
  rank: number;
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const defaultThresholds = [300, 500, 1000];
const priorityLabels = ['最高', '高', '中', '低'];

function printHelp(): void {
  console.log(`Usage: pnpm gen:lines [options]

Options:
  --root <dir>              Directory to scan. Default: src
  --output <file>           Markdown output path. Default: SRC_LINE_COUNTS.md
  --thresholds <list>       Comma-separated priority thresholds. Default: 300,500,1000
  --over <lines>            Only list files with more than this many lines. Default: 0
  --min-lines <lines>       Alias for --over
  --include-generated       Include generated files
  --help                    Show this help
`);
}

function readOptionValue(args: string[], index: number, name: string): string {
  const value = args[index + 1];

  if (!value || value.startsWith('--')) {
    throw new Error(`Missing value for ${name}.`);
  }

  return value;
}

function parsePositiveInteger(value: string, name: string): number {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 0) {
    throw new Error(`${name} must be a non-negative integer.`);
  }

  return parsed;
}

function parseThresholds(value: string): number[] {
  const parsed = value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
    .map((item) => parsePositiveInteger(item, '--thresholds'));
  const uniqueValues = [...new Set(parsed)];

  if (uniqueValues.length === 0) {
    throw new Error('--thresholds must contain at least one number.');
  }

  return uniqueValues.sort((left, right) => left - right);
}

function parseArgs(args: string[]): CliOptions | undefined {
  const options: CliOptions = {
    includeGenerated: false,
    outputPath: 'SRC_LINE_COUNTS.md',
    overLines: 0,
    rootDir: 'src',
    thresholds: defaultThresholds,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === undefined) {
      continue;
    }

    switch (arg) {
      case '--':
        break;
      case '--help':
        printHelp();
        return undefined;
      case '--include-generated':
        options.includeGenerated = true;
        break;
      case '--min-lines':
      case '--over': {
        const value = readOptionValue(args, index, arg);
        options.overLines = parsePositiveInteger(value, arg);
        index += 1;
        break;
      }
      case '--output': {
        options.outputPath = readOptionValue(args, index, arg);
        index += 1;
        break;
      }
      case '--root': {
        options.rootDir = readOptionValue(args, index, arg);
        index += 1;
        break;
      }
      case '--thresholds': {
        const value = readOptionValue(args, index, arg);
        options.thresholds = parseThresholds(value);
        index += 1;
        break;
      }
      default:
        throw new Error(`Unknown option: ${arg}. Use --help to see usage.`);
    }
  }

  return options;
}

function resolveFromProject(path: string): string {
  if (isAbsolute(path)) {
    return path;
  }

  return resolve(projectRoot, path);
}

function toProjectPath(path: string): string {
  return relative(projectRoot, path).split('/').join('/');
}

function collectFiles(directory: string): string[] {
  const entries = readdirSync(directory, { withFileTypes: true }).sort(
    (left, right) => left.name.localeCompare(right.name),
  );
  const files: string[] = [];

  for (const entry of entries) {
    const entryPath = resolve(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectFiles(entryPath));
      continue;
    }

    if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function isBinaryFile(bytes: Buffer): boolean {
  const checkLength = Math.min(bytes.length, 8000);

  for (let index = 0; index < checkLength; index += 1) {
    if (bytes[index] === 0) {
      return true;
    }
  }

  return false;
}

function countLines(bytes: Buffer): number {
  if (bytes.length === 0) {
    return 0;
  }

  let lineBreaks = 0;

  for (const byte of bytes) {
    if (byte === 10) {
      lineBreaks += 1;
    }
  }

  if (bytes[bytes.length - 1] === 10) {
    return lineBreaks;
  }

  return lineBreaks + 1;
}

function isGeneratedPath(projectPath: string): boolean {
  return (
    projectPath.startsWith('src/api/') ||
    projectPath.startsWith('src/components/icons/') ||
    projectPath === 'src/routeTree.gen.ts' ||
    projectPath.includes('.gen.')
  );
}

function buildPriorityRules(thresholds: number[]): PriorityRule[] {
  return thresholds
    .slice()
    .sort((left, right) => right - left)
    .map((threshold, index) => ({
      label: priorityLabels[index] ?? `第 ${String(index + 1)} 级`,
      priority: `P${String(index)}`,
      threshold,
    }));
}

function priorityForLines(lines: number, rules: PriorityRule[]): string {
  const rule = rules.find((item) => lines > item.threshold);

  if (!rule) {
    return '-';
  }

  return `${rule.priority} ${rule.label}`;
}

function scanSourceFiles(options: CliOptions): SourceFile[] {
  const rootPath = resolveFromProject(options.rootDir);
  const files = collectFiles(rootPath);
  const sourceFiles: SourceFile[] = [];

  for (const file of files) {
    const projectPath = toProjectPath(file);

    if (!options.includeGenerated && isGeneratedPath(projectPath)) {
      continue;
    }

    const bytes = readFileSync(file);

    if (isBinaryFile(bytes)) {
      continue;
    }

    sourceFiles.push({
      lines: countLines(bytes),
      path: projectPath,
    });
  }

  return sourceFiles.sort((left, right) => {
    if (right.lines !== left.lines) {
      return right.lines - left.lines;
    }

    return left.path.localeCompare(right.path);
  });
}

function renderPriorityRule(rule: PriorityRule): string {
  return `${rule.priority} ${rule.label}: > ${String(rule.threshold)} 行`;
}

function renderMarkdown(options: CliOptions, files: SourceFile[]): string {
  const rules = buildPriorityRules(options.thresholds);
  const listedFiles = files.filter((file) => file.lines > options.overLines);
  const rows: OutputRow[] = listedFiles.map((file, index) => ({
    ...file,
    priority: priorityForLines(file.lines, rules),
    rank: index + 1,
  }));
  const totalLines = files.reduce((sum, file) => sum + file.lines, 0);
  const generatedPolicy = options.includeGenerated ? '已包含' : '已排除';
  const overPolicy =
    options.overLines > 0
      ? `只列出超过 ${String(options.overLines)} 行的文件`
      : '列出全部文本文件';
  const prioritySummary = rules
    .map((rule) => {
      const label = `${rule.priority} ${rule.label}`;
      const count = rows.filter((row) => row.priority === label).length;

      return `| ${label} | > ${String(rule.threshold)} 行 | ${String(count)} |`;
    })
    .join('\n');
  const tableRows = rows
    .map(
      (row) =>
        `| ${String(row.rank)} | ${String(row.lines)} | ${row.priority} | \`${row.path}\` |`,
    )
    .join('\n');

  return `> 此文件由 \`pnpm gen:lines\` 自动生成，禁止手动修改；如需更新请修改生成脚本或重新运行命令。

# src 文件行数排行

- 扫描目录：\`${options.rootDir}\`
- 文本文件数：${String(files.length)}
- 列出文件数：${String(rows.length)}
- 总行数：${String(totalLines)}
- 生成文件：${generatedPolicy}
- 筛选规则：${overPolicy}
- 优先级规则：${rules.map(renderPriorityRule).join('；')}

## 优先级汇总

| 优先级 | 规则 | 文件数 |
| --- | --- | --- |
${prioritySummary}

## 文件排行

| Rank | Lines | 优先级 | File |
| ---: | ---: | --- | --- |
${tableRows}
`;
}

function formatMarkdown(outputPath: string): void {
  const prettierBin = resolve(
    projectRoot,
    'node_modules/prettier/bin/prettier.cjs',
  );
  const result = spawnSync(
    process.execPath,
    [prettierBin, '--write', outputPath],
    {
      cwd: projectRoot,
      encoding: 'utf8',
    },
  );

  if (result.error) {
    throw result.error;
  }

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }

  if (result.status !== 0) {
    throw new Error(
      `Format markdown failed with exit code ${String(result.status ?? 1)}.`,
    );
  }
}

function main(): void {
  const options = parseArgs(process.argv.slice(2));

  if (!options) {
    return;
  }

  const files = scanSourceFiles(options);
  const markdown = renderMarkdown(options, files);
  const outputPath = resolveFromProject(options.outputPath);

  writeFileSync(outputPath, markdown);
  formatMarkdown(outputPath);
  console.log(`Wrote ${toProjectPath(outputPath)}.`);
}

try {
  main();
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  process.exit(1);
}
