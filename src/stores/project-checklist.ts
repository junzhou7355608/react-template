import { atom } from 'jotai';

export interface ProjectSetupStep {
  description: string;
  id: string;
  label: string;
}

export const projectSetupSteps: ProjectSetupStep[] = [
  {
    id: 'install',
    label: '安装依赖',
    description: '使用 Corepack 和项目固定的 pnpm 版本。',
  },
  {
    id: 'environment',
    label: '配置环境变量',
    description: '从 .env.example 创建本地私有覆盖。',
  },
  {
    id: 'quality',
    label: '运行质量检查',
    description: '在提交前执行 pnpm check-all。',
  },
];

export const completedSetupStepsAtom = atom<string[]>([]);

export const setupProgressAtom = atom((get) => {
  const completedSteps = get(completedSetupStepsAtom);
  return Math.round((completedSteps.length / projectSetupSteps.length) * 100);
});
