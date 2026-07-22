import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const iconsDir = 'src/components/icons';
const customIconsDir = `${iconsDir}/custom`;
const iconTypesSource = `import type { ComponentPropsWithoutRef } from 'react';

export interface IconComponentProps
  extends Partial<Omit<ComponentPropsWithoutRef<'svg'>, 'stroke'>> {
  stroke?: string | number;
  size?: number;
  color?: string;
}
`;
const iconsIndexSource = `export type { IconComponentProps } from './types';
export * from './custom';
`;

mkdirSync(iconsDir, { recursive: true });
writeFileSync(join(iconsDir, 'types.ts'), iconTypesSource);
writeFileSync(join(iconsDir, 'index.ts'), iconsIndexSource);
rmSync(customIconsDir, { force: true, recursive: true });

const svgr = spawnSync(
  'pnpm',
  [
    'exec',
    'svgr',
    '-d',
    `./${customIconsDir}`,
    '--filename-case',
    'kebab',
    './src/assets/icons/flags',
  ],
  { stdio: 'inherit' },
);

if (svgr.status !== 0) {
  process.exit(svgr.status ?? 1);
}

const prettier = spawnSync(
  'pnpm',
  ['exec', 'prettier', '--write', `${iconsDir}/**/*.{ts,tsx}`],
  { stdio: 'inherit' },
);

if (prettier.status !== 0) {
  process.exit(prettier.status ?? 1);
}
