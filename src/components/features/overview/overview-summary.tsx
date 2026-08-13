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
    <section className="py-8 sm:py-10" aria-label="业务概览">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const MetricIcon = metric.icon;
          const TrendIcon = metric.trendUp ? ArrowUpRight : ArrowDownRight;

          return (
            <Card
              key={metric.label}
              className="gap-5 border-white/20 bg-white/10 py-5 text-white shadow-black/10 backdrop-blur-xl"
            >
              <CardHeader className="gap-0">
                <div className="flex items-center justify-between gap-4">
                  <CardDescription className="text-white/70">
                    {metric.label}
                  </CardDescription>
                  <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-white/80">
                    <MetricIcon aria-hidden="true" className="size-4" />
                  </span>
                </div>
                <CardTitle className="mt-4 text-2xl tracking-tight">
                  {metric.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-1.5 text-xs text-white/65">
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
