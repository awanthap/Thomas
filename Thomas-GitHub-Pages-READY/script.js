"use strict";

const opening = document.getElementById("opening");
const story = document.getElementById("story");
const openStory = document.getElementById("openStory");
const letterButton = document.getElementById("letterButton");
const letterPrompt = document.getElementById("letterPrompt");
const reasonCards = Array.from(document.querySelectorAll(".reason-card"));
const revealCount = document.getElementById("revealCount");
const giftButton = document.getElementById("giftButton");
const surpriseModal = document.getElementById("surpriseModal");
const modalClose = document.getElementById("modalClose");
const confetti = document.getElementById("confetti");
const musicButton = document.getElementById("musicButton");
const musicBars = document.getElementById("musicBars");
const musicLabel = document.getElementById("musicLabel");

let audioContext = null;
let musicTimer = null;
let musicPlaying = false;
const notes = [261.63, 329.63, 392, 523.25, 392, 329.63, 293.66, 329.63, 440, 392, 329.63, 261.63];

openStory.addEventListener("click", () => {
  opening.classList.add("hidden");
  story.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "instant" });
});

letterButton.addEventListener("click", () => {
  const isOpen = letterButton.classList.toggle("open");
  letterButton.setAttribute("aria-expanded", String(isOpen));
  letterPrompt.textContent = isOpen ? "Fold the letter" : "Tap to read my letter";
});

reasonCards.forEach((card) => {
  card.addEventListener("click", () => {
    const isRevealed = card.classList.toggle("revealed");
    card.setAttribute("aria-expanded", String(isRevealed));
    const discovered = reasonCards.filter((item) => item.classList.contains("revealed")).length;
    revealCount.textContent =
      discovered === reasonCards.length
        ? "You found them all ♡"
        : discovered + " of " + reasonCards.length + " little truths discovered";
  });
});

function makeConfetti() {
  confetti.replaceChildren();
  for (let index = 0; index < 28; index += 1) {
    const piece = document.createElement("span");
    piece.textContent = index % 3 === 0 ? "♥" : index % 3 === 1 ? "✦" : "♡";
    piece.style.left = ((index * 37) % 100) + "%";
    piece.style.animationDelay = ((index % 8) * -0.18) + "s";
    confetti.appendChild(piece);
  }
}

function openSurprise() {
  makeConfetti();
  surpriseModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeSurprise() {
  surpriseModal.classList.add("hidden");
  document.body.style.overflow = "";
  giftButton.focus();
}

giftButton.addEventListener("click", openSurprise);
modalClose.addEventListener("click", closeSurprise);
surpriseModal.addEventListener("mousedown", (event) => {
  if (event.target === surpriseModal) closeSurprise();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !surpriseModal.classList.contains("hidden")) closeSurprise();
});

async function stopMelody() {
  if (musicTimer) window.clearTimeout(musicTimer);
  musicTimer = null;
  if (audioContext && audioContext.state !== "closed") await audioContext.close();
  audioContext = null;
  musicPlaying = false;
  musicButton.setAttribute("aria-pressed", "false");
  musicBars.classList.remove("playing");
  musicLabel.textContent = "Play our melody";
}

async function toggleMelody() {
  if (musicPlaying) {
    await stopMelody();
    return;
  }

  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  audioContext = new AudioContextClass();
  const start = audioContext.currentTime + 0.08;

  notes.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const noteStart = start + index * 0.58;
    oscillator.type = index % 3 === 0 ? "triangle" : "sine";
    oscillator.frequency.setValueAtTime(frequency, noteStart);
    gain.gain.setValueAtTime(0.0001, noteStart);
    gain.gain.exponentialRampToValueAtTime(0.075, noteStart + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.48);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(noteStart);
    oscillator.stop(noteStart + 0.5);
  });

  musicPlaying = true;
  musicButton.setAttribute("aria-pressed", "true");
  musicBars.classList.add("playing");
  musicLabel.textContent = "Pause melody";
  musicTimer = window.setTimeout(() => void stopMelody(), notes.length * 580 + 900);
}

musicButton.addEventListener("click", () => void toggleMelody());
