import { useState, useEffect } from 'react'
export const useDebounce = (initValue: any, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(initValue)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(initValue)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [initValue, delay])
  return debounceValue
}
