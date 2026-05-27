import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './AboutPage.module.css'
import FlickerReveal from '../components/FlickerReveal'

/* ════════════════════════════════════════════════════════════════════
   ABOUT PAGE — CARD CAROUSEL
   ──────────────────────────────────────────────────────────────────
   One card sits in the middle. The neighbour cards peek out from
   behind / beside it so it's obvious there are more. Use the arrow
   buttons (or click a neighbour card) to slide to the next one.

   HOW TO EDIT
     - To change a topic title: edit `topic` in the card object.
     - To change the body text: edit `content`. Newlines render
       as paragraphs (split on \n).
     - To change the icon: edit `icon` (a single character / emoji).
     - To reorder: just move the objects around in FLASHCARDS.

   NOTE: 8 cards baked in per the request. Add more freely — the
   carousel handles any length (wraps around automatically).
   ════════════════════════════════════════════════════════════════════ */

const FLASHCARDS = [
  {
    id: 'Story',
    icon: 'src/images/FirstSoundtrack.png',
    topic: 'Story',
    content:
      'I first began making beats around 2021 in LMMS as a soundtrack to a game I never realeased, then after I discovered FL studio I moved on to making Polish joke songs under a name "maricari", which I continued doing not so long ago and you can find on soundcloud. First non-soundtrack or joke songs I made were phonks (give me a break it was 2022), then thankfully I moved onto breakcore/jungle tracks. Releasing 2 albums on my spotify in 2024 I decided that I`m bored with breakcore and moved onto making any other generic beat, which I tried to sell, which gave no results so all the stuff is still dusting on my soundcloud.',
  },
  {
    id: 'inspiration',
    icon: 'src/images/SpotifyPlaylist.png',
    topic: 'Inspiration',
    content:
      'I am actually unsure what inspired me to do soundtracks in the first place, later on I do know machine girl with their Neon White soundtrack was what made me keep going. For my breakcore era it was machine girl, Vertigoaway, Vierre Cloud, Nedaj and TOKYOPILL. My 808 beats era ALL comes down mostly to bxnji aka 7timex and I think he hates me for glazing him so much, other than that it was TayoLoxs, prodby668, lungskull, Lumi Athena, but also ofc also Carti, F1lthy, Pierre, Yeat and Lancey Foux. The others like hardstyle or lo-fi stuff just kind of came ot me, but for my dubstep era it`s all Camellia and playing too much osu!Mania',
  },
    {
    id: 'SideQuests',
    icon: 'src/images/TwitchStreamer.png',
    topic: 'Side Quests',
    content:
      'Despite music being almost my whole thing, I had (and still some of them do) MANY side things: video editing, youtube letsplays, speedruns, twitch streaming, flipnote animations, gif making(really)',
  },
  {
    id: 'AboutMe',
    icon: 'src/images/quietKen.png',
    topic: 'About Me',
    content:
      'I`m 18 yo from Poland and producing has been kind of my main thing, but other than that I can play a bit on a guitar',
  },
  {
    id: 'Games',
    icon: 'src/images/GryBro.png',
    topic: 'Games',
    content:
      'This is what I wasted most of my life on, so here`s a list of games I remember playing: || CS2, Roblox, Osu(mostly mania), Battlefield 2042/1/5, Hotline Miami1/2, Dying Light1/2, Celeste, Ultrakill, Max Payne 3, GTA5, Wolfenstein The New Colossus/Order, A dance of fire and ice, Geometry Dash, Minecraft, Forager, Stick it to the stickman, KatanaZero, Undertale, Deltarune, Everhood, ENA: DreamBBQ, Omori, HalfSword, Slime Rancher, Trepang2, DeadIsland2, Bloons TD6, The Elephant Collection, Skate3/4, Clone Drone in the Danger Zone, Deep Rock Galactic, Ultimate Chicken Horse, Postal2, Fortnite, Crossout, Superhot, Marvel Rivals, Castle Crashers, Super Chibi Knight, Titanfall 2, ForzaHorizon4, ChickenInvaders2/3/4/5/Universe, SCP: Secret Lab, Drunken Wrestrels2, Rounds, Move or Die, Stick Fight: The Game, SeaOfThieves, Splasher, DDraceNetwork, Peggle, Clustertruck, Super Meat Boy, Loop-Loop DX(holy goated niche), Swarm, Content warning, Lethal Company, PayDay2, Getting Over It, Multiversus, PeoplePlayground, Just Cause3, For Honor, Crab game, ETS2, Among us, LeagueOfLegends',
  },
    {
    id: 'process',
    icon: '↯',
    topic: 'process',
    content:
      '',
  },
  {
    id: 'random',
    icon: '✦',
    topic: 'random facts',
    content:
      '',
  },
    {
    id: 'now',
    icon: 'src/images/Money.png',
    topic: 'Buisness stuff',
    content:
      'I`m always down to either collaborate with someone or even make a song for them. MOST of the beats and music that is on my platforms is avaible for sale. If you`re interested in either of those check out the "contact" page.',
  },
]

export default function AboutPage() {
  const [current, setCurrent] = useState(0)
  const total = FLASHCARDS.length

  const next = () => setCurrent((c) => (c + 1) % total)
  const prev = () => setCurrent((c) => (c - 1 + total) % total)

  const offsetOf = (i) => {
    let d = i - current
    if (d > total / 2) d -= total
    else if (d < -total / 2) d += total
    return d
  }

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className={styles.header}>
        <FlickerReveal as="span" className={styles.eyebrow} delay={0.08} duration={1.3}>
          ◢ flip through the cards
        </FlickerReveal>
        <FlickerReveal as="h1" className={styles.title} delay={0.18} duration={1.6}>
          about
        </FlickerReveal>
        <FlickerReveal as="p" className={styles.subtitle} delay={0.32} duration={1.4}>
          use the arrows or select a card to navigate
        </FlickerReveal>
      </header>

      {/* ── Carousel ─────────────────────────────────────────── */}
      <div className={styles.carousel}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={prev}
          aria-label="Previous card"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className={styles.deck}>
          {FLASHCARDS.map((card, i) => {
            const offset = offsetOf(i)
            const absOff = Math.abs(offset)
            const isCenter = offset === 0
            const isVisible = absOff <= 2

            return (
              <motion.article
                key={card.id}
                className={styles.card}
                data-center={isCenter}
                animate={{
                  x: `${offset * 62}%`,
                  scale: isCenter ? 1 : absOff === 1 ? 0.84 : 0.7,
                  opacity: !isVisible ? 0 : isCenter ? 1 : absOff === 1 ? 0.55 : 0.22,
                  rotateZ: offset * -4,
                }}
                style={{ zIndex: 20 - absOff }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                onClick={() => {
                  if (!isCenter && isVisible) setCurrent(i)
                }}
                aria-hidden={!isCenter}
                tabIndex={isCenter ? 0 : -1}
              >
                <img className={styles.cardIcon} src={card.icon}/>
                <h3 className={styles.cardTopic}>{card.topic}</h3>
                <div className={styles.cardContent}>
                  {card.content.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={next}
          aria-label="Next card"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <FlickerReveal as="p" className={styles.counter} delay={0.6} duration={1.2}>
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </FlickerReveal>
    </motion.div>
  )
}
