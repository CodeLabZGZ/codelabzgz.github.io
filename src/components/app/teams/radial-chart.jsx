"use client"

import { RadialBar, RadialBarChart } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

const chartData = [
  { difficulty: "muy fácil", challenges: 275, fill: "var(--color-chrome)" },
  { difficulty: "fácil", challenges: 200, fill: "var(--color-safari)" },
  { difficulty: "medio", challenges: 187, fill: "var(--color-firefox)" },
  { difficulty: "difícil", challenges: 173, fill: "var(--color-edge)" },
  { difficulty: "muy difícil", challenges: 90, fill: "var(--color-other)" }
]

const chartConfig = {
  challenges: {
    label: "Retos"
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))"
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))"
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))"
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))"
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))"
  }
}

export function RadialChart() {
  return (
    <Card className="flex flex-col rounded">
      <CardHeader className="items-center pb-0">
        <CardTitle>Retos completados por dificultad</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={270}
            innerRadius={20}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="difficulty" />}
            />
            <RadialBar dataKey="challenges" background cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
