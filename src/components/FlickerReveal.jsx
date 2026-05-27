/**
 * FlickerReveal — wraps any element and plays a "cold light bulb warming up"
 * flicker animation when it first mounts. Each element gets its own randomised
 * flicker pattern so they never look synchronised.
 *
 * Usage:
 *   <FlickerReveal delay={0.2}>
 *     <h1>Hello</h1>
 *   </FlickerReveal>
 *
 * Props:
 *   delay    (number, default 0)   – seconds before the flicker starts
 *   children (ReactNode)           – content to wrap
 *   as       (string, default 'div') – HTML element to render as
 *   className (string)             – forwarded to the wrapper element
 *   style    (object)              – forwarded to the wrapper element
 *
 * How it works:
 *   The component builds a randomised keyframe sequence:
 *     OFF → erratic short flashes → brief full-on → another flutter → steady ON
 *   This is injected as a one-shot CSS animation (@keyframes) into a <style>
 *   tag. When the component unmounts the style is removed so there's no leak.
 */

import { useEffect, useRef, useState } from 'react'

// Each mount gets a unique animation name so concurrent instances never clash.
let _counter = 0

/**
 * Build a CSS @keyframes string that mimics a fluorescent / old tungsten bulb
 * clicking on. Each call returns a slightly different sequence.
 */
function buildFlickerKeyframes(name) {
  // We define waypoints as [percentage, opacity, brightness].
  // "brightness" is expressed as a CSS filter value (1 = normal, >1 = overdriven).

  // Seed a tiny deterministic "random" sequence from the counter so SSR-safe.
  const seed = _counter % 97
  const r = (offset) => ((seed * 9301 + offset * 49297) % 233280) / 233280

  // Build the flicker sequence:
  const frames = [
    // Start totally off
    [0,   0,   0.0],
    // First attempt – short dim flash
    [r(1) * 4 + 3,  r(2) * 0.25 + 0.05,  0.3],
    [r(3) * 2 + 6,  0,   0.0],
    // Second attempt
    [r(4) * 3 + 9,  r(5) * 0.4 + 0.1,   0.5],
    [r(6) * 2 + 13, r(7) * 0.15,         0.2],
    [r(8) * 2 + 16, 0,   0.0],
    // Longer on-flash — "warming up"
    [r(9) * 4 + 20, r(10) * 0.5 + 0.3,  0.8],
    [r(11)*2 + 27,  r(12) * 0.4 + 0.2,  0.6],
    [r(13)*2 + 31,  0,   0.0],
    // Almost there — stays on longer
    [r(14)*3 + 35,  r(15) * 0.3 + 0.6,  1.0],
    [r(16)*2 + 41,  r(17) * 0.2 + 0.5,  0.9],
    [r(18)*1 + 45,  r(19) * 0.3 + 0.6,  1.1],
    // Final settle — full brightness, tiny warm flicker residual
    [55,  0.92,  1.05],
    [62,  0.95,  1.02],
    [70,  0.97,  1.01],
    [80,  0.98,  1.005],
    [100, 1.0,   1.0],
  ]

  const stops = frames
    .map(([pct, opacity, bright]) => {
      const filter = bright < 0.01
        ? 'brightness(0)'
        : `brightness(${bright.toFixed(3)})`
      return `  ${pct.toFixed(1)}% { opacity: ${opacity.toFixed(3)}; filter: ${filter}; }`
    })
    .join('\n')

  return `@keyframes ${name} {\n${stops}\n}`
}

export default function FlickerReveal({
  delay = 0,
  duration = 1.6,
  children,
  as: Tag = 'div',
  className,
  style,
  ...rest
}) {
  const [animName] = useState(() => {
    _counter++
    return `flicker_${_counter}_${Date.now()}`
  })

  const styleElRef = useRef(null)

  useEffect(() => {
    // Inject the keyframes once per instance.
    const css = buildFlickerKeyframes(animName)
    const el = document.createElement('style')
    el.textContent = css
    document.head.appendChild(el)
    styleElRef.current = el

    return () => {
      // Clean up to avoid style tag accumulation on navigation.
      if (styleElRef.current && document.head.contains(styleElRef.current)) {
        document.head.removeChild(styleElRef.current)
      }
    }
  }, [animName])

  const animStyle = {
    opacity: 0,
    animation: `${animName} ${duration}s ease-out ${delay}s forwards`,
    ...style,
  }

  return (
    <Tag className={className} style={animStyle} {...rest}>
      {children}
    </Tag>
  )
}
