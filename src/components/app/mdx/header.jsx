import { Badge } from "@/components/ui/badge"

export default function Header({ badge, title, subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center">
      <Badge variant="secondary">{badge}</Badge>
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
        {title}
      </h2>
      <p className="max-w-[900px] text-muted-foreground md:text-base/relaxed">
        {subtitle}
      </p>
    </div>
  )
}
