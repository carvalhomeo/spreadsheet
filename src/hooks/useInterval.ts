'use client'

import { useEffect, useRef } from 'react'

export function useInterval(callback, delay) {
  const savedCallback = useRef<typeof callback>()

  function tick() {
    savedCallback.current()
  }

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    const id = setInterval(tick, delay)
    return () => clearInterval(id)
  }, [delay])
}
