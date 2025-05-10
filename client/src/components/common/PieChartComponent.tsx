'use client';

import { TrendingUp } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type ChartConfig } from '@/components/ui/chart';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// ✅ Replace chartData with boys and girls only
const chartData = [
  { group: 'boys', students: 320, fill: 'var(--color-boys)' },
  { group: 'girls', students: 280, fill: 'var(--color-girls)' },
];

// ✅ Update chartConfig accordingly
const chartConfig = {
  students: {
    label: 'Students',
  },
  boys: {
    label: 'Boys',
    color: 'hsl(var(--chart-1))',
  },
  girls: {
    label: 'Girls',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function PieChartComponent() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Gender Distribution</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="students" hideLabel />}
            />
            <Pie data={chartData} dataKey="students">
              <LabelList
                dataKey="group"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total students for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
