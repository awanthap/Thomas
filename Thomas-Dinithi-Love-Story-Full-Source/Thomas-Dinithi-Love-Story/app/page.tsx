"use client";

import { useRef, useState } from "react";

const memories = [
  {
    src: "/memories/memory-1.webp",
    alt: "Thomas and Dinithi smiling together at a restaurant",
    caption: "The kind of ordinary day I never want to forget.",
  },
  {
    src: "/memories/memory-2.webp",
    alt: "Thomas and Dinithi smiling together in matching light colours",
    caption: "Matching light, matching smiles.",
  },
  {
    src: "/memories/memory-3.webp",
    alt: "Thomas and Dinithi dressed up together on a night out",
    caption: "A little dressed up, a lot in love.",
  },
  {
    src: "/memories/memory-4.webp",
    alt: "A joyful candid selfie of Thomas and Dinithi",
    caption: "Blurry, happy, and wonderfully real.",
  },
  {
    src: "/memories/memory-5.webp",
    alt: "Dinithi leaning close to Thomas for an outdoor selfie",
    caption: "My favourite place is right beside you.",
  },
  {
    src: "/memories/memory-6.webp",
    alt: "Thomas and Dinithi standing together by the sea at night",
    caption: "By the sea, where the whole world felt quiet.",
  },
  {
    src: "/memories/memory-7.webp",
    alt: "Thomas and Dinithi smiling together in a sunny park",
    caption: "Sunshine looks better on us.",
  },
  {
    src: "/memories/memory-8.webp",
    alt: "Thomas and Dinithi sitting close together in a park",
    caption: "My forever favourite view.",
  },
];

const reasons = [
  { icon: "☀", title: "Your smile", text: "It can turn the most ordinary moment into my favourite part of the day." },
  { icon: "⌂", title: "Your comfort", text: "With you, I can be completely myself—and somehow that always feels like home." },
  { icon: "✦", title: "Your silly side", text: "Thank you for matching my weirdness, my laughter, and every unserious little moment." },
  { icon: "♡", title: "Your heart", text: "The way you care, listen, and stay close means more to me than I can ever explain." },
  { icon: "↗", title: "Our adventures", text: "Big plans or tiny outings, everything becomes a story worth keeping when you are there." },
  { icon: "∞", title: "Simply you", text: "Not a perfect version. Not a different version. You—exactly as you are." },
];

const notes = [261.63, 329.63, 392, 523.25, 392, 329.63, 293.66, 329.63, 440, 392, 329.63, 261.63];

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicTimerRef = useRef<number | null>(null);

  const toggleReason = (index: number) => {
    setRevealed((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  const stopMelody = async () => {
    if (musicTimerRef.current) window.clearTimeout(musicTimerRef.current);
    musicTimerRef.current = null;
    if (audioContextRef.current && audioContextRef.current.state !== "closed") {
      await audioContextRef.current.close();
    }
    audioContextRef.current = null;
    setMusicPlaying(false);
  };

  const toggleMelody = async () => {
    if (musicPlaying) {
      await stopMelody();
      return;
    }

    const context = new AudioContext();
    audioContextRef.current = context;
    const start = context.currentTime + 0.08;

    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const noteStart = start + index * 0.58;
      oscillator.type = index % 3 === 0 ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(frequency, noteStart);
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.075, noteStart + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.48);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(noteStart);
      oscillator.stop(noteStart + 0.5);
    });

    setMusicPlaying(true);
    musicTimerRef.current = window.setTimeout(() => {
      void stopMelody();
    }, notes.length * 580 + 900);
  };

  return (
    <main>
      {!opened ? (
        <section className="opening" aria-label="A surprise for Thomas">
          <div className="opening-hearts" aria-hidden="true">
            <span>♡</span><span>✦</span><span>♡</span><span>✧</span><span>♡</span>
          </div>
          <div className="opening-card">
            <p className="eyebrow">A little something from Dinithi</p>
            <div className="envelope" aria-hidden="true">
              <span className="envelope-heart">♥</span>
            </div>
            <h1>Hey, Thomas <span aria-hidden="true">♡</span></h1>
            <p className="opening-copy">
              I gathered a few of my favourite pieces of us into one little place.
            </p>
            <button className="primary-button" onClick={() => setOpened(true)}>
              Open my heart <span aria-hidden="true">→</span>
            </button>
            <p className="tiny-note">Made with love, just for you</p>
          </div>
        </section>
      ) : (
        <div className="story-shell">
          <header className="topbar">
            <a className="brand" href="#top" aria-label="Back to the beginning">
              T <span>♥</span> D
            </a>
            <button className="music-button" onClick={() => void toggleMelody()} aria-pressed={musicPlaying}>
              <span className={musicPlaying ? "music-bars playing" : "music-bars"} aria-hidden="true">
                <i /><i /><i />
              </span>
              {musicPlaying ? "Pause melody" : "Play our melody"}
            </button>
          </header>

          <section className="hero" id="top">
            <div className="hero-photo-wrap">
              <img
                className="hero-photo"
                src="/memories/memory-7.webp"
                alt="Thomas and Dinithi smiling together in a sunny park"
              />
              <span className="photo-tape tape-one" aria-hidden="true" />
              <span className="photo-tape tape-two" aria-hidden="true" />
            </div>
            <div className="hero-copy">
              <p className="eyebrow">To my favourite person</p>
              <h1>Thomas, you make my world feel softer.</h1>
              <p>
                Every laugh, every adventure, and even the quiet ordinary moments
                feel more beautiful because I get to share them with you.
              </p>
              <a className="primary-button" href="#memories">
                Walk through our story <span aria-hidden="true">↓</span>
              </a>
              <p className="signature">always yours, Dinithi</p>
            </div>
            <div className="hero-doodle" aria-hidden="true">you + me</div>
          </section>

          <section className="memory-section" id="memories">
            <div className="section-heading">
              <p className="eyebrow">Our little collection</p>
              <h2>Pieces of us I never want to lose.</h2>
              <p>
                There is no perfect pose here—just real smiles, small adventures,
                and the kind of memories that make my heart feel full.
              </p>
            </div>
            <div className="memory-wall">
              {memories.map((memory, index) => (
                <figure className={index % 3 === 1 ? "memory-card tilted-right" : "memory-card"} key={memory.src}>
                  <img src={memory.src} alt={memory.alt} loading={index > 2 ? "lazy" : "eager"} />
                  <figcaption>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {memory.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="letter-section" id="letter">
            <div className="letter-collage" aria-label="Two memories of Thomas and Dinithi">
              <img src="/memories/memory-6.webp" alt="Thomas and Dinithi together at the beach" />
              <img src="/memories/memory-8.webp" alt="Thomas and Dinithi sitting together in a park" />
              <span className="collage-note">my safe place ♡</span>
            </div>
            <div className="letter-wrap">
              <p className="eyebrow">A letter I mean with all my heart</p>
              <h2>For you, Thomas</h2>
              <button
                className={letterOpen ? "sealed-letter open" : "sealed-letter"}
                onClick={() => setLetterOpen((current) => !current)}
                aria-expanded={letterOpen}
              >
                <span className="letter-front">
                  <span className="wax-seal">D</span>
                  <strong>{letterOpen ? "Fold the letter" : "Tap to read my letter"}</strong>
                </span>
                <span className="letter-paper">
                  <span className="dear">My dearest Thomas,</span>
                  <span>
                    I hope you know how precious you are to me—not only in the big,
                    exciting moments, but in all the quiet spaces in between.
                  </span>
                  <span>
                    Thank you for being the person I can laugh with, be silly with,
                    dream with, and simply sit beside. You bring warmth into my days
                    in a way no one else can.
                  </span>
                  <span>
                    Wherever life takes us, I hope we keep choosing one another,
                    collecting memories, and finding home in the same place: together.
                  </span>
                  <span className="letter-signoff">With all my love,<br /><b>Dinithi ♡</b></span>
                </span>
              </button>
            </div>
          </section>

          <section className="reasons-section" id="reasons">
            <div className="section-heading light">
              <p className="eyebrow">In case you ever wonder</p>
              <h2>A few reasons you are so special to me.</h2>
              <p>Tap every card, Thomas. I hid a little truth inside each one.</p>
            </div>
            <div className="reason-grid">
              {reasons.map((reason, index) => {
                const isOpen = revealed.includes(index);
                return (
                  <button
                    className={isOpen ? "reason-card revealed" : "reason-card"}
                    key={reason.title}
                    onClick={() => toggleReason(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="reason-number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="reason-icon" aria-hidden="true">{reason.icon}</span>
                    <span className="reason-prompt">{isOpen ? reason.title : "Tap to reveal"}</span>
                    <span className="reason-answer">{reason.text}</span>
                  </button>
                );
              })}
            </div>
            <p className="reveal-count" aria-live="polite">
              {revealed.length === reasons.length
                ? "You found them all ♡"
                : revealed.length + " of " + reasons.length + " little truths discovered"}
            </p>
          </section>

          <section className="surprise-section">
            <div className="surprise-copy">
              <p className="eyebrow">One last thing</p>
              <h2>I saved my favourite surprise for the end.</h2>
              <p>No wrapping paper needed. Just tap the little gift.</p>
            </div>
            <button className="gift-button" onClick={() => setSurpriseOpen(true)} aria-label="Open Dinithi's final surprise">
              <span className="gift-lid" aria-hidden="true" />
              <span className="gift-box" aria-hidden="true">
                <span className="gift-ribbon" />
              </span>
              <strong>Tap to open</strong>
            </button>
          </section>

          <footer>
            <p>Made for Thomas, with every bit of Dinithi&apos;s heart.</p>
            <a href="#top">Back to our beginning ↑</a>
          </footer>

          {surpriseOpen && (
            <div className="modal-backdrop" role="presentation" onMouseDown={() => setSurpriseOpen(false)}>
              <div
                className="surprise-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="surprise-title"
                onMouseDown={(event) => event.stopPropagation()}
              >
                <div className="confetti" aria-hidden="true">
                  {Array.from({ length: 28 }, (_, index) => (
                    <span
                      key={index}
                      style={{
                        left: ((index * 37) % 100) + "%",
                        animationDelay: ((index % 8) * -0.18) + "s",
                      }}
                    >
                      {index % 3 === 0 ? "♥" : index % 3 === 1 ? "✦" : "♡"}
                    </span>
                  ))}
                </div>
                <button className="modal-close" onClick={() => setSurpriseOpen(false)} aria-label="Close surprise">×</button>
                <img src="/memories/memory-3.webp" alt="Thomas and Dinithi dressed up together" />
                <p className="eyebrow">My forever answer</p>
                <h2 id="surprise-title">Thomas, I choose you.</h2>
                <p>
                  In the happiest moments, the quiet ones, and every chapter still
                  waiting for us—in every version of life, I would still find you
                  and choose you all over again.
                </p>
                <div className="final-signature">I love you ♡<br /><span>— Dinithi</span></div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
