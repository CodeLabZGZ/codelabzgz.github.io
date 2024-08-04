"use client"

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RadarChartRe
} from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
const chartData = [
  { format: "Hackathon", user: 186, community: 160 },
  { format: "Ideathon", user: 185, community: 170 },
  { format: "CTF", user: 207, community: 180 }
]

const chartConfig = {
  user: {
    label: "Usuario",
    color: "hsl(var(--chart-1))"
  },
  community: {
    label: "Comunidad",
    color: "hsl(var(--chart-2))"
  }
}

export function RadarChart() {
  return (
    <Card className="rounded">
      <CardHeader className="items-center pb-4">
        <CardTitle>Formato de competiciones</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChartRe data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <PolarAngleAxis dataKey="format" />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="user"
              fill="var(--color-user)"
              fillOpacity={0}
              stroke="var(--color-user)"
              strokeWidth={2}
            />
            <Radar
              dataKey="community"
              fill="var(--color-community)"
              fillOpacity={0}
              stroke="var(--color-community)"
              strokeWidth={2}
            />
          </RadarChartRe>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
