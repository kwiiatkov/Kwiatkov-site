import { motion } from 'framer-motion'
import SocialPanel from '../components/SocialPanel'
import { socials } from '../data/socials'
import styles from './SocialsPage.module.css'
import FlickerReveal from '../components/FlickerReveal'

export default function SocialsPage() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page header */}
      <div className={styles.header}>
        <FlickerReveal as="span" className={styles.eyebrow} delay={0.08} duration={1.3}>
          — select a platform
        </FlickerReveal>
        <FlickerReveal as="h1" className={styles.title} delay={0.18} duration={1.6}>
          socials
        </FlickerReveal>
        <FlickerReveal as="p" className={`${styles.subtitle} ${styles.subtitleDesktop}`} delay={0.3} duration={1.4}>
          hover to preview &mdash; click to open
        </FlickerReveal>
        <FlickerReveal as="p" className={`${styles.subtitle} ${styles.subtitleMobile}`} delay={0.3} duration={1.4}>
          tap to open
        </FlickerReveal>
      </div>

      {/* Character-select row */}
      <FlickerReveal className={styles.selectRow} delay={0.25} duration={1.5}>
        {socials.map((social, i) => (
          <SocialPanel
            key={social.id}
            social={social}
            index={i}
            totalCount={socials.length}
          />
        ))}
      </FlickerReveal>

      {/* Footer note */}
      
    </motion.div>
  )
}
