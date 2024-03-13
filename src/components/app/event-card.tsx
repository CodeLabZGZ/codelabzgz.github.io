import Link from "next/link";

const optStart: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
const optEnd: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' };

export function EventCard({slug, banner, format, title, startDate, endDate}) {
  return (
    <Link 
      key={slug} 
      href={`/events/${slug}`}
      className="flex flex-col overflow-hidden rounded-md shadow-lg"
    >
      <div className="flex-shrink-0">
        <img className="w-full object-cover aspect-video" src={banner} alt="" />
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600 hover:underline">
            {format}
          </p>
          <div className="mt-2 block">
            <p className="text-lg font-semibold text-gray-900">{title}</p>
            <p className="mt-3 text-sm font-medium text-gray-500">{startDate.toLocaleDateString('es-ES', optStart)} - {endDate.toLocaleDateString('es-ES', optEnd)}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}
