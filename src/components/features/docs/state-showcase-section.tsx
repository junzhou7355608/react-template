import { queryOptions, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { RefreshCw, Server, Waypoints } from 'lucide-react';

import { CodeBlock } from '@/components/features/docs/code-block';
import {
  atomSnippet,
  querySnippet,
} from '@/components/features/docs/docs-data';
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
import { Checkbox } from '@/components/ui/checkbox';
import {
  completedSetupStepsAtom,
  projectSetupSteps,
} from '@/stores/project-checklist';

interface TemplateStatus {
  checkedAt: string;
  status: 'ready';
}

function fetchTemplateStatus() {
  return new Promise<TemplateStatus>((resolve) => {
    window.setTimeout(() => {
      resolve({
        status: 'ready',
        checkedAt: new Intl.DateTimeFormat('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }).format(new Date()),
      });
    }, 650);
  });
}

const templateStatusQueryOptions = queryOptions({
  queryKey: ['template-status'],
  queryFn: fetchTemplateStatus,
});

function ProjectChecklist() {
  const [completedSteps, setCompletedSteps] = useAtom(completedSetupStepsAtom);

  return (
    <div className="space-y-3">
      {projectSetupSteps.map((step) => {
        const checked = completedSteps.includes(step.id);

        return (
          <label
            key={step.id}
            className="flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors hover:bg-muted/50 has-focus-visible:ring-2 has-focus-visible:ring-ring"
          >
            <Checkbox
              checked={checked}
              className="mt-0.5"
              onCheckedChange={(nextChecked) => {
                setCompletedSteps((currentSteps) =>
                  nextChecked === true
                    ? [...currentSteps, step.id]
                    : currentSteps.filter((id) => id !== step.id),
                );
              }}
            />
            <span>
              <span className="block text-sm font-medium">{step.label}</span>
              <span className="mt-1 block text-xs/5 text-muted-foreground">
                {step.description}
              </span>
            </span>
          </label>
        );
      })}
    </div>
  );
}

function QueryStatusCard() {
  const statusQuery = useQuery(templateStatusQueryOptions);

  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-lg bg-muted">
            <Server className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-medium">模板状态</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              queryKey: template-status
            </p>
          </div>
        </div>
        <Badge variant={statusQuery.data ? 'default' : 'secondary'}>
          {statusQuery.isPending
            ? '加载中'
            : statusQuery.isFetching
              ? '刷新中'
              : 'Ready'}
        </Badge>
      </div>
      <div className="mt-5 flex items-end justify-between gap-4 border-t pt-4">
        <div>
          <p className="text-xs text-muted-foreground">最近检查</p>
          <p className="mt-1 font-mono text-sm">
            {statusQuery.data?.checkedAt ?? '正在连接…'}
          </p>
        </div>
        <Button
          disabled={statusQuery.isFetching}
          onClick={() => void statusQuery.refetch()}
          size="sm"
          type="button"
          variant="outline"
        >
          <RefreshCw
            className={statusQuery.isFetching ? 'animate-spin' : undefined}
            aria-hidden="true"
          />
          刷新
        </Button>
      </div>
    </div>
  );
}

export function StateShowcaseSection() {
  return (
    <section id="state" className="scroll-mt-24 py-16 sm:py-20">
      <SectionHeading
        eyebrow="State"
        title="按状态来源选择工具"
        description="Jotai 负责客户端共享状态，TanStack Query 负责异步服务端状态。两个示例都可以直接操作。"
      />

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Card className="shadow-none">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <Waypoints className="size-4" aria-hidden="true" />
              <Badge variant="outline">Jotai</Badge>
            </div>
            <CardTitle>跨组件项目清单</CardTitle>
            <CardDescription>
              勾选状态会同步更新页面顶部的项目启动进度。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <ProjectChecklist />
            <CodeBlock label="store.ts">{atomSnippet}</CodeBlock>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <div className="mb-2 flex items-center gap-2">
              <Server className="size-4" aria-hidden="true" />
              <Badge variant="outline">TanStack Query</Badge>
            </div>
            <CardTitle>异步状态刷新</CardTitle>
            <CardDescription>
              示例使用内置模拟请求，不需要启动配套后端。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <QueryStatusCard />
            <CodeBlock label="status-query.tsx">{querySnippet}</CodeBlock>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
