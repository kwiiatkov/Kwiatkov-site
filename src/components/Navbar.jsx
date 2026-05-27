import { useState } from 'react'
import styles from './Navbar.module.css'

const NAV_ITEMS = [
  { id: 'home',    label: 'home' },
  { id: 'about',   label: 'about' },
  { id: 'music',   label: 'music' },
  { id: 'socials', label: 'socials' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (id) => {
    onNavigate(id)
    setMenuOpen(false)
  }

  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <button
        className={styles.logo}
        onClick={() => handleNav('home')}
        aria-label="Go to home"
      >
        KWIATKOV
      </button>

      {/* Desktop links */}
      <div className={styles.links}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${styles.link} ${activePage === item.id ? styles.active : ''}`}
            onClick={() => handleNav(item.id)}
            aria-current={activePage === item.id ? 'page' : undefined}
            data-splash-nav={item.id}
            data-splash-label={item.label}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Hamburger button — mobile only */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`${styles.mobileLink} ${activePage === item.id ? styles.active : ''}`}
              onClick={() => handleNav(item.id)}
              aria-current={activePage === item.id ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
