export interface DocumentationLink {
  href: string;
  label: string;
}

export const documentationLinks: DocumentationLink[] = [
  { href: '#overview', label: '项目概览' },
  { href: '#quick-start', label: '快速开始' },
  { href: '#stack', label: '技术栈' },
  { href: '#ui', label: 'UI 组件' },
  { href: '#state', label: '状态管理' },
  { href: '#workflow', label: '开发工作流' },
  { href: '#open-source', label: '开源协作' },
];

export const installSnippet = `corepack enable
pnpm install
pnpm dev`;

export const routeSnippet = `import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})`;

export const atomSnippet = `import { atom } from 'jotai'

export const completedStepsAtom = atom<string[]>([])
export const progressAtom = atom((get) => {
  return get(completedStepsAtom).length
})`;

export const querySnippet = `const statusQuery = useQuery({
  queryKey: ['template-status'],
  queryFn: fetchTemplateStatus,
})`;
