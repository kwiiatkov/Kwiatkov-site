import styles from './Navbar.module.css'

const NAV_ITEMS = [
  { id: 'home',    label: 'home' },
  { id: 'about',   label: 'about' },
  { id: 'music',   label: 'music' },
  { id: 'socials', label: 'socials' },
  { id: 'contact',   label: 'Contact' },
]

export default function Navbar({ activePage, onNavigate }) {
  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <button
        className={styles.logo}
        onClick={() => onNavigate('home')}
        aria-label="Go to home"
      >
        KWIATKOV
      </button>

      <div className={styles.links}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`${styles.link} ${activePage === item.id ? styles.active : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-current={activePage === item.id ? 'page' : undefined}
            /*
              These data attributes let SplashScreen.jsx measure each
              button's position to draw arrows pointing at them.
              Safe to leave here permanently — no visual effect.
            */
            data-splash-nav={item.id}
            data-splash-label={item.label}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
