export default function Features({ values }) {
  return (
    <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
      {values.map(({ title, description }) => (
        <div className="grid gap-1" key={title}>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      ))}
    </div>
  )
}
