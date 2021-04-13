import React, { useLayoutEffect, useRef } from 'react';

interface IMotion {
  as: string,
  children: React.ReactNode[]
  handleRender: (ref: React.MutableRefObject<HTMLElement>, current: DOMRect, prev?: DOMRect) => void,
}

export function Motion(props: IMotion) {
  const { handleRender, as, children, ...other } = props
  
  const ref = useRef<HTMLElement>() as React.MutableRefObject<HTMLElement>
  const prevRect = useRef<DOMRect>()

  useLayoutEffect(() => {
    const currentRect = ref.current!.getBoundingClientRect()
    handleRender(ref, currentRect, prevRect.current )
    prevRect.current = currentRect
  })

  return React.createElement(as, { ...other, ref }, children)
}