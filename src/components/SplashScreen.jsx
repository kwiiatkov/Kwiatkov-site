import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './SplashScreen.module.css'

const NAV_ITEMS = [
  { id: 'home',    label: 'home' },
  { id: 'about',   label: 'about' },
  { id: 'music',   label: 'music' },
  { id: 'socials', label: 'socials' },
  { id: 'contact',   label: 'contact' },
]

export default function SplashScreen({ onNavigate }) {
  const [arrows, setArrows] = useState([])
  const [ready, setReady]   = useState(false)
  // Re-measure on resize so arrows track nav tabs correctly
  const [, setTick] = useState(0)

  useEffect(() => {
    function measure() {
      const btnEls = Array.from(document.querySelectorAll('[data-splash-nav]'))
      if (!btnEls.length) return
      setArrows(btnEls.map((el) => {
        const rect = el.getBoundingClientRect()
        return {
          id: el.dataset.splashNav,
          cx: rect.left + rect.width / 2,
          bottom: rect.bottom,
        }
      }))
      setReady(true)
    }

    const t = setTimeout(measure, 60)
    const onResize = () => { measure(); setTick(n => n + 1) }
    window.addEventListener('resize', onResize)
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize) }
  }, [])

  const navbarH     = 49
  const viewH       = typeof window !== 'undefined' ? window.innerHeight : 800
  // Y coordinate of the center text block — roughly 45% down the available area
  const textCenterY = navbarH + (viewH - navbarH) * 0.45

  // Arrow start: just above the headline (headline is ~60px tall at mid sizes)
  const arrowStartY = textCenterY - 90
  const arrowStartX = typeof window !== 'undefined' ? window.innerWidth / 2 : 700

  return (
    <motion.div
      className={styles.splash}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Instant exit — the clicked page starts its flicker immediately
      exit={{ opacity: 1, transition: { duration: 0 } }}
      transition={{ duration: 0.25 }}
    >
      <div className={styles.scanlines} aria-hidden="true" />

      <span className={styles.cornerTL} aria-hidden="true">◢</span>
      <span className={styles.cornerTR} aria-hidden="true">◣</span>
      <span className={styles.cornerBL} aria-hidden="true">◥</span>
      <span className={styles.cornerBR} aria-hidden="true">◤</span>

      {/* SVG arrows fanning out from text center up to each nav tab */}
      {ready && (
        <svg className={styles.arrowSvg} aria-hidden="true">
          <defs>
            <marker
              id="ah"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              orient="auto"
            >
              {/* Solid filled triangle pointing in direction of stroke */}
              <path d="M0,1 L0,9 L9,5 Z" fill="#c4b5fd" />
            </marker>
          </defs>

          {arrows.map((a, i) => {
            const endX = a.cx
            const endY = a.bottom + 2

            // Control point: start halfway between source X and target X,
            // at a height slightly above the arrow start so the curve fans upward.
            const cpX = (arrowStartX + endX) / 2
            const cpY = arrowStartY - 40

            const d = `M ${arrowStartX} ${arrowStartY} Q ${cpX} ${cpY} ${endX} ${endY}`

            return (
              <motion.path
                key={a.id}
                d={d}
                fill="none"
                stroke="#c4b5fd"
                strokeWidth="2"
                markerEnd="url(#ah)"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.85 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
              />
            )
          })}
        </svg>
      )}

      {/* Central content — positioned via CSS to sit at ~45% */}
      <div className={styles.center}>
        <motion.div
          className={styles.prompt}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Single-line headline, scaled to never wrap */}
          <h1 className={styles.headline}>click one to begin</h1>

          {/* Large clickable page buttons */}
          <div className={styles.navEcho}>
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                className={styles.echoBtn}
                onClick={() => onNavigate(item.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.07, duration: 0.3 }}
                whileHover={{ scale: 1.04, borderColor: 'rgba(167,139,250,0.7)', color: '#e8e4f0' }}
                whileTap={{ scale: 0.96 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.pulse}
          aria-hidden="true"
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.08, 0.9] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
