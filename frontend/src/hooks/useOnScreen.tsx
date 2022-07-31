import { MutableRefObject, useEffect, useMemo, useState } from "react"

export default function useOnScreen(ref: MutableRefObject<any>) {

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = useMemo(() => new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting)
  ), [ref])

  useEffect(() => {
    if(!ref.current) return;
    observer.observe(ref.current)
    // Remove the observer as soon as the component is unmounted
    return () => { observer.disconnect() }
  }, [ref])

  return isIntersecting
}