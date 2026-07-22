import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const apiPath = resolve(projectRoot, 'api.yaml');

const inlineCollectionKeyPatterns = [
  /^(\s*(?:"[^"]+"|'[^']+'|[A-Za-z0-9_-]+)):(?=[[{])/,
  /^(\s*-\s*(?:"[^"]+"|'[^']+'|[A-Za-z0-9_-]+)):(?=[[{])/,
];

function run(command: string, args: string[], label: string): void {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: 'utf8',
  });

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
      `${label} failed with exit code ${String(result.status ?? 1)}.`,
    );
  }
}

function repairInlineCollections(source: string): {
  changedLines: number[];
  repaired: string;
} {
  const changedLines: number[] = [];
  const repaired = source
    .split('\n')
    .map((line, index) => {
      let nextLine = line;

      for (const pattern of inlineCollectionKeyPatterns) {
        if (!pattern.test(nextLine)) {
          continue;
        }

        nextLine = nextLine.replace(pattern, '$1: ');
      }

      if (nextLine !== line) {
        changedLines.push(index + 1);
      }

      return nextLine;
    })
    .join('\n');

  return {
    changedLines,
    repaired,
  };
}

function main(): void {
  const source = readFileSync(apiPath, 'utf8');
  const { changedLines, repaired } = repairInlineCollections(source);

  if (changedLines.length > 0) {
    writeFileSync(apiPath, repaired);
    console.log(
      `Auto-repaired api.yaml inline collection spacing on lines: ${changedLines.join(', ')}.`,
    );
  }

  run('pnpm', ['exec', 'prettier', '--write', 'api.yaml'], 'Format api.yaml');
  run('pnpm', ['exec', 'openapi-ts', '--no-log-file'], 'Generate API client');
  run(
    'pnpm',
    ['exec', 'prettier', '--write', 'src/api/**/*.ts'],
    'Format generated API files',
  );
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
