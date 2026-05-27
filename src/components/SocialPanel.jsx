import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './SocialPanel.module.css'

export default function SocialPanel({ social, index, totalCount }) {
  const [hovered, setHovered] = useState(false)

  const handleClick = () => {
    window.open(social.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      className={styles.panel}
      data-hovered={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        '--brand': social.color,
        '--brand-text': social.colorText,
      }}
    >
      {/* Diagonal slash divider (right side) — hidden on last panel */}
      {index < totalCount - 1 && (
        <div className={styles.slashDivider} aria-hidden="true" />
      )}

      {/* Icon */}
      <div className={styles.iconWrap}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d={social.iconPath} />
        </svg>
      </div>

      {/* Platform name + label */}
      <div className={styles.nameGroup}>
        <span className={styles.name}>{social.name}</span>
        <span className={styles.platform}>{social.platform}</span>
      </div>

      {/* Hover quote — slides up */}
      <AnimatePresence>
        {hovered && (
          <motion.p
            className={styles.quote}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
          >
            &ldquo;{social.quote}&rdquo;
          </motion.p>
        )}
      </AnimatePresence>

      {/* Bottom edge accent line that fills on hover */}
      <motion.div
        className={styles.accentLine}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </motion.div>
  )
}
