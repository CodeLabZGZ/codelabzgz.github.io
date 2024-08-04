"use client"

import { CartesianGrid, Line, LineChart as LineChartRe, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
const chartData = [
  { month: "Enero", points: 0 },
  { month: "Febrero", points: 0 },
  { month: "Marzo", points: 0 },
  { month: "Abril", points: 0 },
  { month: "Mayo", points: 0 },
  { month: "Junio", points: 0 },
  { month: "Julio", points: 0 },
  { month: "Agosto", points: 0 },
  { month: "Septiembre", points: 150 },
  { month: "Octubre", points: 250 },
  { month: "Noviembre", points: 50 },
  { month: "Diciembre", points: 250 }
]

const chartConfig = {
  points: {
    label: "Puntos",
    color: "hsl(var(--chart-1))"
  }
}

export function LineChart() {
  return (
    <Card className="rounded">
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>Enero - Diciembre 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChartRe accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="points"
              type="bump"
              stroke="var(--color-points)"
              strokeWidth={2}
              dot={false}
            />
          </LineChartRe>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
