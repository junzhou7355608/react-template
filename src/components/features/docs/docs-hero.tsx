import { useAtomValue } from 'jotai';
import { ArrowDown, Check, GitBranch, Sparkles } from 'lucide-react';

import { CodeBlock } from '@/components/features/docs/code-block';
import { installSnippet } from '@/components/features/docs/docs-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  projectSetupSteps,
  setupProgressAtom,
} from '@/stores/project-checklist';

const stackLabels = [
  'React 19',
  'TypeScript 6',
  'Vite 8',
  'TanStack',
  'Jotai',
  'shadcn/ui',
];

export function DocsHero() {
  const progress = useAtomValue(setupProgressAtom);
  const completedCount = Math.round(
    (progress / 100) * projectSetupSteps.length,
  );

  return (
    <section id="overview" className="scroll-mt-24 pt-6 sm:pt-12">
      <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(26rem,0.95fr)]">
        <div>
          <Badge variant="secondary">
            <Sparkles data-icon="inline-start" aria-hidden="true" />
            开源 React 项目模板
          </Badge>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
            从可靠的工程基础，开始下一次构建。
          </h1>
          <p className="mt-6 max-w-2xl text-base/7 text-muted-foreground sm:text-lg/8">
            集成路由、请求、状态管理、UI
            组件与完整质量链路。保留清晰约束，同时让业务从一张空白画布开始。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#quick-start">
                开始使用
                <ArrowDown data-icon="inline-end" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href="https://github.com/junzhou7355608/react-template"
                rel="noreferrer"
                target="_blank"
              >
                <GitBranch data-icon="inline-start" aria-hidden="true" />
                查看源码
              </a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {stackLabels.map((label) => (
              <Badge key={label} variant="outline">
                {label}
              </Badge>
            ))}
          </div>
        </div>

        <Card className="relative overflow-visible bg-muted/30 py-0 shadow-none">
          <div
            className="absolute -inset-3 -z-10 rounded-2xl border bg-muted/40"
            aria-hidden="true"
          />
          <CardHeader className="flex flex-row items-center justify-between border-b py-4">
            <div>
              <p className="text-sm font-medium">项目启动台</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {completedCount}/{projectSetupSteps.length} 项准备完成
              </p>
            </div>
            <Badge variant={progress === 100 ? 'default' : 'secondary'}>
              {progress === 100 ? (
                <Check data-icon="inline-start" aria-hidden="true" />
              ) : null}
              {progress}%
            </Badge>
          </CardHeader>
          <CardContent className="space-y-5 py-5">
            <div
              aria-label={`项目准备进度 ${String(progress)}%`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={progress}
              className="h-2 overflow-hidden rounded-full bg-secondary"
              role="progressbar"
            >
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none"
                style={{ width: `${String(progress)}%` }}
              />
            </div>
            <CodeBlock>{installSnippet}</CodeBlock>
            <div className="grid grid-cols-3 gap-2 text-center">
              {['路由就绪', '类型安全', '自动检查'].map((label) => (
                <div
                  key={label}
                  className="rounded-lg border bg-background px-2 py-3 text-xs font-medium"
                >
                  {label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
