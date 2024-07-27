"use client"

import { formatDate } from "@/lib/utils"
import { toJpeg } from "html-to-image"
import { useCallback, useRef } from "react"

export default function Page({ event, name, date, cert }) {
  console.log(cert)
  const ref = useRef(null)

  const options = { day: "2-digit", month: "2-digit", year: "numeric" }
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return
    }

    toJpeg(ref.current, { cacheBust: true })
      .then(dataUrl => {
        const link = document.createElement("a")
        link.download = name.toLocaleLowerCase().replaceAll(" ", "-") + ".jpg"
        link.href = dataUrl
        link.click()
      })
      .catch(err => {
        console.log(err)
      })
  }, [ref])

  return (
    <>
      <div className="relative h-[690px] w-[980px]" ref={ref}>
        <img src="/cert.webp" height={690} width={980} className="opacity-95" />
        <span className="absolute left-0 top-0 ml-[100px] mt-[162px] select-none font-semibold">
          {event}
        </span>
        <span className="absolute left-0 top-0 ml-[100px] mt-[255px] select-none text-3xl font-bold capitalize">
          {name}
        </span>
        <time
          className="absolute left-0 top-0 ml-[100px] mt-[405px] select-none font-mono text-sm font-bold"
          dateTime={date}
        >
          {formatDate({ date: new Date(date), options, timeZone })}
        </time>
        <span className="absolute right-0 top-0 -mr-[52px] mt-[130px] -rotate-90 select-none font-mono text-2xs uppercase tracking-wide">
          CODELABZGZCERT-{cert}
        </span>
      </div>
      <button onClick={onButtonClick}>Click me</button>
    </>
  )
}
