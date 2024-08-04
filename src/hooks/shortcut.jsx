import { useEffect } from "react"

export function useShortcut({ key, callback }) {
  const downHandler = e => {
    if (
      (e.key === key.toLowerCase() || e.key === key.toUpperCase()) &&
      (e.metaKey || e.ctrlKey)
    ) {
      e.preventDefault()
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", downHandler)
    return () => document.removeEventListener("keydown", downHandler)
  })
}
