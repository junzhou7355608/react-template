import {
  Braces,
  Component,
  FileCode2,
  Gauge,
  Network,
  Route,
} from 'lucide-react';

import { CodeBlock } from '@/components/features/docs/code-block';
import { installSnippet } from '@/components/features/docs/docs-data';
import { SectionHeading } from '@/components/features/docs/section-heading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stackItems = [
  {
    description: 'React Compiler 与 TypeScript 严格检查构成组件基础。',
    icon: Component,
    title: 'React 19',
  },
  {
    description: '文件路由、意图预加载与滚动位置恢复已配置。',
    icon: Route,
    title: 'TanStack Router',
  },
  {
    description: 'QueryClient、Axios 与 OpenAPI 生成客户端协同工作。',
    icon: Network,
    title: '数据请求',
  },
  {
    description: '使用轻量 atoms 管理真正需要跨组件共享的状态。',
    icon: Braces,
    title: 'Jotai',
  },
  {
    description: 'Tailwind CSS 4 与 Radix Nova 组件采用语义 token。',
    icon: FileCode2,
    title: 'shadcn/ui',
  },
  {
    description: 'ESLint、Prettier、Knip、Husky 与构建检查开箱即用。',
    icon: Gauge,
    title: '质量链路',
  },
];

export function GettingStartedSection() {
  return (
    <>
      <section id="quick-start" className="scroll-mt-24 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Quick start"
          title="三条命令进入开发"
          description="模板固定了 Node.js 与 pnpm 的兼容范围。安装时会输出环境信息并自动配置 Git hooks。"
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <CodeBlock>{installSnippet}</CodeBlock>
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>环境要求</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Node.js</span>
                <Badge variant="outline">20.19+ / 22.12+</Badge>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">pnpm</span>
                <Badge variant="outline">10.34.5</Badge>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">开发服务</span>
                <Badge variant="secondary">Vite</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="stack" className="scroll-mt-24 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Stack"
          title="职责清晰的技术组合"
          description="每一项依赖都有明确边界：路由、客户端状态、服务端状态和请求生成链路互不混用。"
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stackItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="shadow-none">
                <CardHeader>
                  <div className="mb-3 grid size-9 place-items-center rounded-lg border bg-muted">
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm/6 text-muted-foreground">
                  {item.description}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
