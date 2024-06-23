import { Card, CardContent } from "@/components/ui/card"

export default function Schedule({ values }) {
  return (
    <div className="mx-auto grid max-w-4xl gap-4">
      {values.map(({day, month, title, description, startTime, endTime }) => (
        <Card>
          <CardContent className="p-4 gap-4 grid grid-cols-[100px_1fr] items-start">
            <div className="flex flex-col items-center gap-1">
              <div className="text-2xl font-bold">{day}</div>
              <div className="text-sm text-muted-foreground capitalize">{month}</div>
            </div>
            <div className="space-y-0.5">
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{startTime} {endTime && "-"} {endTime}</p>
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
