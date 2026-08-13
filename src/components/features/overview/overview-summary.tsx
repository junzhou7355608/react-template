import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  CreditCard,
  PackageCheck,
  UsersRound,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const metrics = [
  {
    label: '今日订单',
    value: '128',
    trend: '+12.6%',
    trendLabel: '较昨日',
    trendUp: true,
    icon: PackageCheck,
  },
  {
    label: '待处理事项',
    value: '24',
    trend: '8',
    trendLabel: '项即将到期',
    trendUp: false,
    icon: Clock3,
  },
  {
    label: '本月收入',
    value: '¥128,420',
    trend: '+8.4%',
    trendLabel: '较上月同期',
    trendUp: true,
    icon: CreditCard,
  },
  {
    label: '活跃客户',
    value: '1,286',
    trend: '-2.1%',
    trendLabel: '较上周',
    trendUp: false,
    icon: UsersRound,
  },
] as const;

export function OverviewSummary() {
  return (
    <section className="py-5 sm:py-10" aria-label="业务概览">
      <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {metrics.map((metric) => {
          const MetricIcon = metric.icon;
          const TrendIcon = metric.trendUp ? ArrowUpRight : ArrowDownRight;

          return (
            <Card
              key={metric.label}
              className="gap-3 border-white/20 bg-white/10 py-3 text-white shadow-black/10 backdrop-blur-xl [--card-spacing:--spacing(3)] sm:gap-5 sm:py-5 sm:[--card-spacing:--spacing(4)]"
            >
              <CardHeader className="gap-0">
                <div className="flex items-center justify-between gap-4">
                  <CardDescription className="text-xs text-white/70 sm:text-sm">
                    {metric.label}
                  </CardDescription>
                  <span className="grid size-8 place-items-center rounded-lg bg-white/10 text-white/80 sm:size-9 sm:rounded-xl">
                    <MetricIcon
                      aria-hidden="true"
                      className="size-3.5 sm:size-4"
                    />
                  </span>
                </div>
                <CardTitle className="mt-3 text-xl tracking-tight sm:mt-4 sm:text-2xl">
                  {metric.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex min-w-0 items-center gap-1 text-xs whitespace-nowrap text-white/65 sm:gap-1.5">
                <TrendIcon
                  aria-hidden="true"
                  className={`size-3.5 ${metric.trendUp ? 'text-emerald-300' : 'text-amber-300'}`}
                />
                <span>{metric.trend}</span>
                <span>{metric.trendLabel}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
