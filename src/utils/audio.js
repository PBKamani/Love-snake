// Web Audio API Synthesizer for romantic, kawaii sound effects and gentle ambient BGM

let audioCtx = null;
let bgmInterval = null;
let isBgmPlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a cute marimba / glass bell chime when a heart is eaten
 */
export function playEatSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  // Sweet ascending chime: 523.25 (C5) -> 659.25 (E5) -> 783.99 (G5)
  osc.frequency.setValueAtTime(587.33, now); // D5
  osc.frequency.exponentialRampToValueAtTime(880.0, now + 0.12); // A5

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);

  // Tiny sparkle harmonic
  const sparkOsc = ctx.createOscillator();
  const sparkGain = ctx.createGain();
  sparkOsc.type = 'triangle';
  sparkOsc.frequency.setValueAtTime(1174.66, now + 0.05); // D6
  sparkGain.gain.setValueAtTime(0.08, now + 0.05);
  sparkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
  sparkOsc.connect(sparkGain);
  sparkGain.connect(ctx.destination);
  sparkOsc.start(now + 0.05);
  sparkOsc.stop(now + 0.22);
}

/**
 * Play ascending celebratory sparkle arpeggio for combos
 */
export function playComboSound(multiplier = 2) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const baseFreqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  const count = Math.min(baseFreqs.length, multiplier + 1);

  baseFreqs.slice(0, count).forEach((freq, idx) => {
    const startTime = ctx.currentTime + idx * 0.06;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.15, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.2);
  });
}

/**
 * Soft, gentle game over chime (tender descending notes)
 */
export function playGameOverSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [659.25, 587.33, 523.25, 440.0]; // E5, D5, C5, A4
  notes.forEach((freq, idx) => {
    const startTime = ctx.currentTime + idx * 0.12;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.15, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.35);
  });
}

/**
 * Sweet celebratory sound for new high score or milestone
 */
export function playCelebrationSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
  notes.forEach((freq, idx) => {
    const startTime = ctx.currentTime + idx * 0.09;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.18, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.4);
  });
}

/**
 * Play a tiny soft click/pop for UI buttons
 */
export function playButtonSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

/**
 * Gentle romantic music synthesizer (loops soothing chords: Fmaj7 -> G -> Em7 -> Am7)
 */
export function startBGM() {
  if (isBgmPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isBgmPlaying = true;

  // Gentle celesta-like romantic chords progression (Fmaj7 -> G -> Em7 -> Am7)
  const chordProgression = [
    [349.23, 440.0, 523.25, 659.25], // Fmaj7 (F4, A4, C5, E5)
    [392.0, 493.88, 587.33, 783.99], // G (G4, B4, D5, G5)
    [329.63, 392.0, 493.88, 587.33], // Em7 (E4, G4, B4, D5)
    [440.0, 523.25, 659.25, 880.0]   // Am7 (A4, C5, E5, A5)
  ];

  let step = 0;

  const playStep = () => {
    if (!isBgmPlaying) return;
    const currentChord = chordProgression[step % chordProgression.length];
    step++;

    currentChord.forEach((freq, noteIdx) => {
      const noteTime = ctx.currentTime + noteIdx * 0.18;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      // Very soft ambient background volume
      gain.gain.setValueAtTime(0.025, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, noteTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 1.2);
    });
  };

  playStep();
  bgmInterval = setInterval(playStep, 1600);
}

export function stopBGM() {
  isBgmPlaying = false;
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}
