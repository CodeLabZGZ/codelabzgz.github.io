"use client"

import { SWRConfig } from "swr"

export default function Provider({ children }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (resource, init) =>
          fetch(resource, init).then(res => res.json())
      }}
    >
      {children}
    </SWRConfig>
  )
}
