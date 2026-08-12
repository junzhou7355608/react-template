import { GitBranch, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const stackLabels = [
  'React 19',
  'TypeScript 6',
  'Vite 8',
  'TanStack',
  'Jotai',
  'shadcn/ui',
];

export function DocsHero() {
  return (
    <section
      id="overview"
      className="flex flex-1 flex-col justify-start py-16 sm:py-24 lg:py-28"
    >
      <div className="max-w-none">
        <div>
          <Badge variant="secondary">
            <Sparkles data-icon="inline-start" aria-hidden="true" />
            开源 React 项目模板
          </Badge>
          <h1 className="mt-6 text-4xl/snug font-semibold tracking-[-0.035em] sm:text-5xl/snug lg:text-6xl/snug">
            从可靠的工程基础，开始下一次构建。
          </h1>
          <p className="mt-6 max-w-xl text-base/7 text-muted-foreground sm:text-lg/8">
            React、TypeScript、Vite 与 shadcn/ui 已配置完成，专注于业务本身。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}
