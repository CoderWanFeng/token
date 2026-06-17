import { useState, useEffect } from 'react'

/**
 * 监听滚动，返回「是否已滚动超过 threshold px」
 * @param threshold 触发阈值（默认 400px）
 */
export function useScrollThreshold(threshold = 400) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
