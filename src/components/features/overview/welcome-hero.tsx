import { CalendarDays, Sparkles } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import overviewHeroBackground from '@/assets/images/overview-hero.png';
import { Badge } from '@/components/ui/badge';

export function WelcomeHero({ children }: PropsWithChildren) {
  return (
    <section
      aria-labelledby="welcome-title"
      className="relative isolate overflow-hidden rounded-3xl px-6 pt-10 shadow-sm sm:px-10 sm:pt-14 lg:px-14 lg:pt-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${overviewHeroBackground})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-slate-950/15 via-indigo-950/10 to-slate-950/5"
      />
      <div className="relative z-10 max-w-2xl text-white">
        <Badge
          className="border-white/20 bg-white/10 text-white backdrop-blur-md"
          variant="secondary"
        >
          <Sparkles data-icon="inline-start" aria-hidden="true" />
          今日工作摘要
        </Badge>
        <h1
          id="welcome-title"
          className="mt-6 max-w-xl text-4xl/snug font-semibold tracking-[-0.04em] sm:text-5xl/snug"
        >
          早上好，项目用户。
          <br />
          欢迎回到你的工作空间
        </h1>
        <p className="mt-5 max-w-xl text-base/7 text-white/75 sm:text-lg">
          这里会集中呈现业务进展、待处理事项和团队动态。先从今天最重要的事情开始吧。
        </p>
        <div className="mt-8 flex items-center gap-2 text-sm text-white/65">
          <CalendarDays aria-hidden="true" className="size-4" />
          <span>星期四 · 2026年8月13日</span>
        </div>
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
