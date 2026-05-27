import { motion } from 'framer-motion'
import { genres } from '../data/music'
import styles from './MusicPage.module.css'
import FlickerReveal from '../components/FlickerReveal'

/* ════════════════════════════════════════════════════════════
   MUSIC PAGE
   Edit track links in src/data/music.js — each track now supports
   three optional link fields: soundcloud, youtube, spotify
   ════════════════════════════════════════════════════════════ */

/* ── Platform icon SVGs ─────────────────────────────────────── */
function SoundCloudIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M1.175 12.225c-.017 0-.034.002-.05.003.002-.018.003-.037.003-.055 0-.57.462-1.032 1.032-1.032.203 0 .392.059.55.161C2.84 10.28 3.92 9.5 5.19 9.5c.406 0 .79.082 1.14.228C6.69 8.095 8.045 7 9.667 7c1.88 0 3.404 1.524 3.404 3.404 0 .077-.003.153-.008.229.175-.04.358-.063.546-.063 1.307 0 2.368 1.06 2.368 2.368 0 1.307-1.06 2.368-2.368 2.368H1.175C.527 14.306 0 13.779 0 13.13c0-.649.527-1.176 1.175-1.176v.271z"/>
      <path d="M17.5 15a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm0-1a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM20 14h1a1 1 0 100-2h-1v2z" opacity="0"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function SpotifyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  )
}

/* ── Platform button ────────────────────────────────────────── */
function PlatformBtn({ url, label, platform, children }) {
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.platformBtn} ${styles[`platform_${platform}`]}`}
      aria-label={label}
      title={label}
    >
      {children}
    </a>
  )
}

/* ── Track card ─────────────────────────────────────────────── */
function TrackCard({ track, index, sectionDelay }) {
  const hasAnyLink = track.soundcloud || track.youtube || track.spotify

  return (
    <FlickerReveal
      as="article"
      className={styles.trackCard}
      delay={sectionDelay + index * 0.06}
      duration={1.3}
    >
      <div className={styles.cover}>
        {track.cover ? (
          <img src={track.cover} alt={`${track.title} cover`} />
        ) : (
          <div className={styles.coverPlaceholder} aria-hidden="true">
            <span>♪</span>
          </div>
        )}
      </div>

      <div className={styles.trackBody}>
        <h4 className={styles.trackTitle}>{track.title}</h4>
        <span className={styles.trackLength}>{track.length}</span>

        {/* Platform buttons — only renders buttons that have a URL */}
        <div className={styles.platformBtns} data-empty={!hasAnyLink}>
          <PlatformBtn
            url={track.soundcloud}
            platform="soundcloud"
            label={`${track.title} on SoundCloud`}
          >
            <SoundCloudIcon />
          </PlatformBtn>
          <PlatformBtn
            url={track.youtube}
            platform="youtube"
            label={`${track.title} on YouTube`}
          >
            <YouTubeIcon />
          </PlatformBtn>
          <PlatformBtn
            url={track.spotify}
            platform="spotify"
            label={`${track.title} on Spotify`}
          >
            <SpotifyIcon />
          </PlatformBtn>
          {!hasAnyLink && (
            <span className={styles.noLinks}>coming soon</span>
          )}
        </div>
      </div>
    </FlickerReveal>
  )
}

function GenreSection({ genre, sectionIndex }) {
  const sectionDelay = 0.35 + sectionIndex * 0.1

  return (
    <div className={styles.genre}>
      <FlickerReveal as="header" className={styles.genreHeader} delay={sectionDelay} duration={1.4}>
        <span className={styles.genreNumber}>
          {String(sectionIndex + 1).padStart(2, '0')}
        </span>
        <h2 className={styles.genreName}>{genre.name}</h2>
      </FlickerReveal>

      <FlickerReveal as="p" className={styles.genreDescription} delay={sectionDelay + 0.05} duration={1.2}>
        {genre.description}
      </FlickerReveal>

      <div className={styles.trackGrid}>
        {genre.tracks.map((track, i) => (
          <TrackCard
            key={track.id}
            track={track}
            index={i}
            sectionDelay={sectionDelay + 0.1}
          />
        ))}
      </div>
    </div>
  )
}

export default function MusicPage() {
  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className={styles.pageHeader}>
        <FlickerReveal as="span" className={styles.eyebrow} delay={0.08} duration={1.3}>
          ◢ catalogue // by genre
        </FlickerReveal>
        <FlickerReveal as="h1" className={styles.title} delay={0.18} duration={1.6}>
          music
        </FlickerReveal>
        <FlickerReveal as="p" className={styles.subtitle} delay={0.3} duration={1.4}>
          click the platform icons to open a track
        </FlickerReveal>
      </header>

      <div className={styles.genres}>
        {genres.map((g, i) => (
          <GenreSection key={g.id} genre={g} sectionIndex={i} />
        ))}
      </div>
    </motion.div>
  )
}
