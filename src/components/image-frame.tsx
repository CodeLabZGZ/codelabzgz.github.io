'use client'

export function ImageFrame({
  src,
  alt,
  className = '',
}) {
  return (
    <div className="relative z-10 w-full h-auto mx-auto aspect-video">
      <div className="h-full opacity-100 isolate aspect-video rounded-2xl">
        <div className="h-full w-full">
          <img
            src={src}
            alt={alt || "thumbnail" }
            className={`object-cover object-center w-full h-full rounded-2xl ${className}`}
          />
        </div>
      </div>
    </div>
  )
}