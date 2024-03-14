import { EventCard } from "@/components/app/event-card"
import { getAllFilesMeta } from "@/lib/mdx"

export default async function Page() {
  const now = new Date().getTime();
  const allEvents = await getAllFilesMeta()

  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {allEvents
        .filter(event => {
          const startDate = new Date(event.startDate).getTime();
          const endDate = new Date(event.endDate).getTime();
          return startDate <= now && now <= endDate;
        })
        .map((event) => (
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
