import { CalendarDays, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

export function WelcomeHero() {
  return (
    <section
      aria-labelledby="welcome-title"
      className="relative isolate overflow-hidden rounded-b-3xl border-x border-b bg-card px-6 py-10 shadow-sm sm:px-10 sm:py-14 lg:px-14 lg:py-16"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-16 -z-10 size-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 left-1/3 -z-10 size-56 rounded-full bg-chart-2/10 blur-3xl"
      />
      <div className="max-w-2xl">
        <Badge variant="secondary">
          <Sparkles data-icon="inline-start" aria-hidden="true" />
          今日工作摘要
        </Badge>
        <h1
          id="welcome-title"
          className="mt-6 max-w-xl text-4xl/tight font-semibold tracking-[-0.04em] sm:text-5xl"
        >
          早上好，项目用户。
          <br />
          欢迎回到你的工作空间
        </h1>
        <p className="mt-5 max-w-xl text-base/7 text-muted-foreground sm:text-lg">
          这里会集中呈现业务进展、待处理事项和团队动态。先从今天最重要的事情开始吧。
        </p>
        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays aria-hidden="true" className="size-4" />
          <span>星期四 · 2026年8月13日</span>
        </div>
      </div>
    </section>
  );
}
