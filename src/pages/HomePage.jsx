import { motion } from 'framer-motion'
import styles from './HomePage.module.css'
import FlickerReveal from '../components/FlickerReveal'

/* ────────────────────────────────────────────────────────────────
   HOMEPAGE "WHAT YOU CAN DO HERE" LIST
   ──────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    tag: '01',
    title: 'learn about him',
    blurb: 'Who Kwiatkov is, what he makes, why he makes it.',
    icon: '/images/kwiatekBiegnie.jpg',
    pageId: 'about',
  },
  {
    tag: '02',
    title: 'See & preview his music',
    blurb: 'Basically a portfolio — just pick a genre and hit play, it will redirect you to it.',
    icon: '/images/musicPreview.png',
    pageId: 'music',
  },
  {
    tag: '03',
    title: 'Go to his other socials',
    blurb: 'soundcloud, spotify, youtube, instagram — all in one place.',
    icon: '/images/Socials.png',
    pageId: 'socials',
  },
   {
    tag: '04',
    title: 'Contact him',
    blurb: 'Collaborations? Want to buy a beat? Want something created? Perfect places to reach him',
    icon: '/images/ContactHim.png',
    pageId: 'contact',
  },
]

const NICKNAMES = [
  'Prod.by.Zzster',
  'Kwiatkov',
  'Maricari',
  'Kwiatkov',
  'NuzProduce',
  'Kwiatkov',
  'OutTiss',
  'Kwiatkov',
  'Brewer',
  'Kwiatkov',
]

export default function HomePage({ onNavigate }) {
  const goTo = (id) => {
    if (id && typeof onNavigate === 'function') onNavigate(id)
  }

  const marqueeText = NICKNAMES.map((n) => `${n}`).join('  •  ') + '  •  '

  return (
    // Outer page wrapper keeps the existing slide-in/out page transition
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Hero block ─────────────────────────────────────── */}
      <div className={styles.hero}>
        <FlickerReveal as="span" className={styles.eyebrow} delay={0.05} duration={1.4}>
          ◢ Welcome, to the official site of
        </FlickerReveal>

        <FlickerReveal as="h1" className={styles.title} delay={0.18} duration={1.7}>
          kwiatkov<span className={styles.titleDot}>.</span>
        </FlickerReveal>


      </div>

      {/* ── "What you can do" panel ────────────────────────── */}
      <div className={styles.panel}>
        <FlickerReveal as="span" className={styles.panelTag} delay={0.5} duration={1.2}>
          — here you can
        </FlickerReveal>

        <ul className={styles.featureList}>
          {FEATURES.map((f, i) => (
            <FlickerReveal
              key={f.tag}
              as="li"
              className={styles.feature}
              delay={0.55 + i * 0.12}
              duration={1.4}
              onClick={() => goTo(f.pageId)}
              role={f.pageId ? 'button' : undefined}
              tabIndex={f.pageId ? 0 : -1}
              onKeyDown={(e) => {
                if (!f.pageId) return
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  goTo(f.pageId)
                }
              }}
              data-clickable={Boolean(f.pageId)}
            >
              <img className={styles.featureIcon} src={f.icon}/>
              <span className={styles.featureTag}>{f.tag}</span>
              <div className={styles.featureBody}>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureBlurb}>{f.blurb}</p>
              </div>
              <span className={styles.featureArrow}>→</span>
            </FlickerReveal>
          ))}
        </ul>
      </div>

      {/* ── Footer marquee strip ───────────────────────────── */}
      <FlickerReveal className={styles.marquee} delay={0.9} duration={1.3}>
        <span>{marqueeText}</span>
        <span>{marqueeText}</span>
      </FlickerReveal>
    </motion.div>
  )
}
