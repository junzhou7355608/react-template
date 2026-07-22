import { ExternalLink, FileJson2, GitPullRequest, Route } from 'lucide-react';

import { CodeBlock } from '@/components/features/docs/code-block';
import { routeSnippet } from '@/components/features/docs/docs-data';
import { SectionHeading } from '@/components/features/docs/section-heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const apiSnippet = `# 先修改唯一源文件
api.yaml

# 再生成类型安全客户端
pnpm gen:api`;

const projectTree = `src/
├── api/          # OpenAPI 生成产物
├── components/   # 功能、布局与 UI
├── lib/          # Router、Query 与请求实例
├── routes/       # TanStack 文件路由
├── stores/       # Jotai atoms
└── styles/       # Tailwind 与主题`;

const qualityCommands = `pnpm check-all
pnpm build
pnpm gen:api
pnpm gen:icons`;

export function WorkflowSection() {
  return (
    <>
      <section id="workflow" className="scroll-mt-24 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Workflow"
          title="从源定义到可验证产物"
          description="路由、接口和图标都有单一来源。生成文件随源文件提交，但不直接手工编辑。"
        />

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <Card className="shadow-none">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <Route className="size-4" aria-hidden="true" />
                <Badge variant="outline">Router</Badge>
              </div>
              <CardTitle>添加文件路由</CardTitle>
              <CardDescription>
                路由树由 Vite 插件生成，无需维护集中配置。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock label="src/routes/about.tsx">{routeSnippet}</CodeBlock>
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader>
              <div className="mb-2 flex items-center gap-2">
                <FileJson2 className="size-4" aria-hidden="true" />
                <Badge variant="outline">OpenAPI</Badge>
              </div>
              <CardTitle>生成请求客户端</CardTitle>
              <CardDescription>
                SDK、类型、Zod schema 与 Query hooks 从同一规范生成。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock label="Terminal">{apiSnippet}</CodeBlock>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.7fr)]">
          <CodeBlock label="Project structure">{projectTree}</CodeBlock>
          <CodeBlock label="Quality commands">{qualityCommands}</CodeBlock>
        </div>
      </section>

      <section id="open-source" className="scroll-mt-24 py-16 sm:py-20">
        <Card className="border-primary/20 bg-primary text-primary-foreground shadow-none">
          <CardContent className="grid gap-8 py-4 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-4 flex items-center gap-2 text-primary-foreground/70">
                <GitPullRequest className="size-4" aria-hidden="true" />
                <span className="font-mono text-xs tracking-wider uppercase">
                  Open source
                </span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                在 MIT 协议下自由使用与改造
              </h2>
              <p className="mt-3 max-w-2xl text-sm/6 text-primary-foreground/70 sm:text-base/7">
                欢迎通过 Issue 和 Pull Request
                参与改进。提交前请阅读贡献指南，并运行项目约定的完整检查。
              </p>
            </div>
            <Button asChild variant="secondary">
              <a
                href="https://github.com/junzhou7355608/react-template"
                rel="noreferrer"
                target="_blank"
              >
                参与项目
                <ExternalLink aria-hidden="true" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
