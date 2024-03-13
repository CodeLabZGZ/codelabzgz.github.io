import { EventCard } from "@/components/app/event-card"
import { getAllFilesMeta } from "@/lib/mdx"

export default async function Page() {
  const allEvents = await getAllFilesMeta()

  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {allEvents.map((event) => (
        <EventCard
          key={event.slug}
          title={event.title}
          banner={event.banner}
          slug={event.slug}
          startDate={event.startDate}
          endDate={event.endDate}
          format={event["info-format"]}
        />
      ))}
    </div>
  )
}
