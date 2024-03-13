const optStart: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
const optEnd: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' };

export function Header(
  { title, startDate, endDate }:
  { title: string, startDate: Date, endDate: Date}
) {
  return (
    <div className="mx-auto max-w-7xl py-16">
      <div className="mx-auto max-w-prose lg:mx-0 space-y-8">
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 capitalize">
          {title.replaceAll("-", " ")}
        </h2>
        <div className="flex gap-x-4">
          <div className="flex flex-col gap-y-2">
            <span className="uppercase text-xs font-medium">start date</span>
            <time className="text-lg capitalize font-semibold">{startDate.toLocaleDateString('es-ES', optStart)}</time>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className="uppercase text-xs font-medium">end date</span>
            <time className="text-lg capitalize font-semibold">{endDate.toLocaleDateString('es-ES', optEnd)}</time>
          </div>
        </div>
      </div>
    </div>
  )
}