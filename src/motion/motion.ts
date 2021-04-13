import React, { useLayoutEffect, useRef } from 'react';

export function Motion(props: { as: string, children: React.ReactNode[], className: string }) {
  const { as, children, ...other } = props
  
  const ref = useRef<HTMLElement>()
  const prevRect = useRef<DOMRect>()

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }
    const nextRect = ref.current.getBoundingClientRect()
    if (!prevRect.current) {
      prevRect.current = nextRect
      return
    }
    const diff = prevRect.current.bottom - nextRect.bottom 
    prevRect.current = nextRect
    if (diff === 0) {
      return
    }
    ref.current.animate([
      {
        transform: `translate(0, ${diff}px)`,
      },
      { transform: 'translateX(0) translate(0, 0)' },
    ], {
        duration: Math.abs(1.8 * diff),
        easing: 'ease-out',
    })
  })

  return React.createElement(as, { ...other, ref }, children)
}