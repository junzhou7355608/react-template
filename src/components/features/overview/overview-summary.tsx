import {
  ArrowDownRight,
  ArrowUpRight,
  CircleCheck,
  Clock3,
  CreditCard,
  PackageCheck,
  UsersRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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

const activities = [
  { title: '华东区域完成本周订单确认', time: '10分钟前', status: '已完成' },
  {
    title: '客户「远山科技」更新了联系信息',
    time: '32分钟前',
    status: '已更新',
  },
  { title: '新的服务申请等待分配负责人', time: '1小时前', status: '待处理' },
];

export function OverviewSummary() {
  return (
    <section className="space-y-8 py-8 sm:py-10" aria-label="业务概览">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const MetricIcon = metric.icon;
          const TrendIcon = metric.trendUp ? ArrowUpRight : ArrowDownRight;

          return (
            <Card key={metric.label} className="gap-5 py-5">
              <CardHeader className="gap-0">
                <div className="flex items-center justify-between gap-4">
                  <CardDescription>{metric.label}</CardDescription>
                  <span className="grid size-9 place-items-center rounded-xl bg-muted text-muted-foreground">
                    <MetricIcon aria-hidden="true" className="size-4" />
                  </span>
                </div>
                <CardTitle className="mt-4 text-2xl tracking-tight">
                  {metric.value}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <TrendIcon
                  aria-hidden="true"
                  className={`size-3.5 ${metric.trendUp ? 'text-emerald-600' : 'text-amber-600'}`}
                />
                <span>{metric.trend}</span>
                <span>{metric.trendLabel}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>最近动态</CardTitle>
              <CardDescription className="mt-1">
                团队空间里刚刚发生的事情
              </CardDescription>
            </div>
            <Badge variant="outline">3 条更新</Badge>
          </div>
        </CardHeader>
        <CardContent className="divide-y p-0">
          {activities.map((activity) => (
            <div
              key={activity.title}
              className="flex items-center gap-3 px-6 py-4 sm:px-7"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted">
                <CircleCheck
                  aria-hidden="true"
                  className="size-4 text-muted-foreground"
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{activity.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {activity.time}
                </p>
              </div>
              <Badge
                variant={activity.status === '待处理' ? 'secondary' : 'outline'}
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
