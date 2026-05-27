import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import SplashScreen from './components/SplashScreen'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MusicPage from './pages/MusicPage'
import SocialsPage from './pages/SocialsPage'
import ContactPage from './pages/ContactPage'

/* ════════════════════════════════════════════════════════════════════
   BACKGROUND THEME SONG
   ════════════════════════════════════════════════════════════════════ */
const THEME_SONG_SRC = '/audio/MainTheme.wav'
const THEME_SONG_VOLUME = 0.35

const PAGES = {
  home:    HomePage,
  about:   AboutPage,
  music:   MusicPage,
  socials: SocialsPage,
  contact: ContactPage,
}

/* ── Mini player styles ── */
const playerStyles = {
  wrapper: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 14px',
    background: 'rgba(14, 12, 20, 0.88)',
    border: '1px solid #2a2630',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    userSelect: 'none',
  },
  wrapperPlaying: {
    borderColor: 'rgba(139, 92, 246, 0.45)',
    boxShadow: '0 0 18px rgba(139, 92, 246, 0.12)',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    background: 'rgba(139, 92, 246, 0.12)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    color: '#a78bfa',
    cursor: 'pointer',
    flexShrink: 0,
    transition: 'background 0.15s ease, border-color 0.15s ease',
  },
  label: {
    fontFamily: "'Fragment Mono', monospace",
    fontSize: '10px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    lineHeight: 1.3,
  },
  labelTop:    { color: '#6b6580', display: 'block', marginBottom: '2px' },
  labelStatus: { display: 'block', fontWeight: 700, letterSpacing: '0.18em' },
  labelOn:     { color: '#a78bfa' },
  labelOff:    { color: '#3d3850' },
  bars:        { display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px', flexShrink: 0 },
}

const barsKeyframes = `
@keyframes barBounce1 { 0%,100%{height:3px}  50%{height:12px} }
@keyframes barBounce2 { 0%,100%{height:8px}  50%{height:4px}  }
@keyframes barBounce3 { 0%,100%{height:5px}  50%{height:13px} }
@keyframes barBounce4 { 0%,100%{height:10px} 50%{height:3px}  }
`

function MusicBars({ playing }) {
  const anims     = ['barBounce1', 'barBounce2', 'barBounce3', 'barBounce4']
  const durations = ['0.7s', '0.5s', '0.8s', '0.6s']
  return (
    <div style={playerStyles.bars} aria-hidden="true">
      {anims.map((anim, i) => (
        <div key={i} style={{
          width: '3px',
          height: playing ? undefined : '3px',
          background: playing ? '#a78bfa' : '#2a2630',
          transition: 'background 0.3s ease',
          animation: playing ? `${anim} ${durations[i]} ease-in-out infinite` : 'none',
          alignSelf: 'flex-end',
        }} />
      ))}
    </div>
  )
}

function PlayIcon() {
  return <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor" aria-hidden="true"><path d="M0 0.5v12l11-6z"/></svg>
}
function PauseIcon() {
  return <svg width="11" height="13" viewBox="0 0 11 13" fill="currentColor" aria-hidden="true"><rect x="0" y="0.5" width="4" height="12" rx="0.5"/><rect x="7" y="0.5" width="4" height="12" rx="0.5"/></svg>
}

export default function App() {
  /*
    activePage === null  →  splash screen (one-way door, never goes back)
    activePage === 'home' etc  →  real page
  */
  const [activePage, setActivePage] = useState(null)
  const isSplash = activePage === null

  const audioRef   = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // One-way door: null → real page only
  const navigate = useCallback((pageId) => {
    if (pageId && PAGES[pageId]) setActivePage(pageId)
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.paused ? audio.play().catch(() => {}) : audio.pause()
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = THEME_SONG_VOLUME

    const onPlay  = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    audio.addEventListener('play',  onPlay)
    audio.addEventListener('pause', onPause)

    /*
      Music is intentionally NOT started here.
      It only starts once the user navigates away from the splash
      (see the effect below that watches activePage).
      This also means random clicks on the splash background won't
      trigger the "start on first interaction" listener.
    */

    return () => {
      audio.removeEventListener('play',  onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  /*
    Watch activePage: the moment the user leaves the splash, try to
    start the music. Also attach the "first interaction" fallback for
    browsers that block autoplay even after a user gesture.
  */
  useEffect(() => {
    if (isSplash) return  // still on splash — do nothing

    const audio = audioRef.current
    if (!audio) return

    // Try immediate autoplay (works if browser allows it post-gesture)
    audio.play().catch(() => {})

    // Fallback: start on next interaction if autoplay was blocked
    const startOnInteraction = () => {
      if (audio.paused) audio.play().catch(() => {})
      window.removeEventListener('pointerdown', startOnInteraction)
      window.removeEventListener('keydown',     startOnInteraction)
    }
    window.addEventListener('pointerdown', startOnInteraction)
    window.addEventListener('keydown',     startOnInteraction)

    return () => {
      window.removeEventListener('pointerdown', startOnInteraction)
      window.removeEventListener('keydown',     startOnInteraction)
    }
  }, [isSplash])

  const PageComponent = activePage ? (PAGES[activePage] ?? HomePage) : null

  return (
    <>
      <style>{barsKeyframes}</style>
      <audio ref={audioRef} src={THEME_SONG_SRC} loop preload="auto" />

      <Navbar activePage={activePage} onNavigate={navigate} />

      <AnimatePresence mode="wait">
        {isSplash ? (
          <SplashScreen key="splash" onNavigate={navigate} />
        ) : (
          <PageComponent key={activePage} onNavigate={navigate} />
        )}
      </AnimatePresence>

      {/* Music player — hidden entirely while on the splash screen */}
      {!isSplash && (
        <div
          style={{ ...playerStyles.wrapper, ...(isPlaying ? playerStyles.wrapperPlaying : {}) }}
          className="music-player-wrapper"
          role="region"
          aria-label="Background music player"
        >
          <MusicBars playing={isPlaying} />
          <div style={playerStyles.label}>
            <span style={playerStyles.labelTop}>background music</span>
            <span style={{ ...playerStyles.labelStatus, ...(isPlaying ? playerStyles.labelOn : playerStyles.labelOff) }}>
              {isPlaying ? 'on' : 'off'}
            </span>
          </div>
          <button
            type="button"
            onClick={toggle}
            style={playerStyles.btn}
            aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.22)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(139,92,246,0.12)'; e.currentTarget.style.borderColor = 'rgba(139,92,246,0.3)' }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
        </div>
      )}
    </>
  )
}
