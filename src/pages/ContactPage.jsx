import { motion } from 'framer-motion'
import styles from './ContactPage.module.css'
import FlickerReveal from '../components/FlickerReveal'

const CONTACTS = [
  {
    id: 'email',
    platform: 'Email',
    handle: 'kwiatkowski.mtz@gmail.com',
    href: 'mailto:kwiatkowski.mtz@gmail.com',
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@kwiiatkov',
    href: 'https://instagram.com/kwiiatkov',
  },
  {
    id: 'discord',
    platform: 'Discord',
    handle: 'kwiatkov',
    href: null, // Discord has no universal profile link — displayed as plain text
  },
]

const YEAR = new Date().getFullYear()

export default function ContactPage() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Headline ── */}
      <header className={styles.header}>
        <FlickerReveal as="span" className={styles.eyebrow} delay={0.06} duration={1.3}>
          ◢ reach out
        </FlickerReveal>
        <FlickerReveal as="h1" className={styles.title} delay={0.16} duration={1.6}>
          contact
        </FlickerReveal>
      </header>

      {/* ── Contact methods ── */}
      <section className={styles.contacts} aria-label="Contact information">
        {CONTACTS.map((c, i) => (
          <FlickerReveal
            key={c.id}
            className={styles.contactRow}
            delay={0.3 + i * 0.1}
            duration={1.3}
          >
            <span className={styles.platform}>{c.platform}</span>
            <span className={styles.separator}>—</span>
            {c.href ? (
              <a
                href={c.href}
                className={styles.handle}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {c.handle}
              </a>
            ) : (
              <span className={styles.handle}>{c.handle}</span>
            )}
          </FlickerReveal>
        ))}
      </section>

      {/* ── Footer: copyright + ownership note ── */}
      <footer className={styles.footer}>
        <FlickerReveal as="p" className={styles.copyright} delay={0.65} duration={1.2}>
          © {YEAR} Mateusz Kwiatkowski. All rights reserved.
        </FlickerReveal>
        <FlickerReveal as="p" className={styles.disclaimer} delay={0.78} duration={1.2}>
          If there are any problems regarding the ownership of images, audio, text, or
          any other content on this site, please contact me using one of the methods
          listed above.<br></br>
          ICONS FOR INSTAGRAM,SPOTIFY,SOUNDCLOUD AND YOUTUBE ARE MADE USING REACT PATHS.
        </FlickerReveal>
      </footer>
    </motion.div>
  )
}
