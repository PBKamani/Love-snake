/**
 * Love messages for Nidhi with exact nickname spellings:
 * Vamps, Vampyy, Penguine, Cupcake, Muffine, Abyy, Nid, Nini
 */
export const LOVE_MESSAGES = [
  "Hurray Nidhi! ❤️",
  "Well done Nidhi! 💕",
  "Good job Abyy! 🥰",
  "Penguine, you are awesome! 🐧❤️",
  "Amazing job Vamps! 💗",
  "Go go Vampyy! 💕",
  "That's my Nini! 🥹❤️",
  "Awww, good one Cupcake! 🧁💕",
  "Muffine did it! 😭❤️",
  "Nid, you're doing amazing! 💖",
  "Yayyy Nidhi! Another heart! ❤️",
  "That's my girl! 🥰",
  "You're too good at this, Vampyy! 💕",
  "Penguine is on fire! 🔥❤️",
  "Keep going, Cupcake! 🧁💗",
  "Abyy, you're absolutely adorable! 🥹💕",
  "Nini collected another love! ❤️",
  "Vamps, that was perfect! 💖",
  "Muffine, I'm proud of you! 🥰",
  "Nid is unstoppable! 💕",
  "One more heart for my favorite girl! ❤️",
  "Awww Nidhi, you're so cute! 🥹",
  "Penguine got another one! 🐧❤️",
  "Cupcake, you're amazing! 🧁💗",
  "Vampyy strikes again! 😌❤️",
  "Nini, you're crushing it! 💕",
  "Abyy + hearts = perfect combination! ❤️",
  "Muffine, keep collecting my hearts! 🥰",
  "Vamps, you're my champion! 🏆❤️",
  "Nidhi, every heart looks good on you! 💗",
  "Infinite love for you, Nini! 💖✨",
  "My beautiful Abyy shines so bright! 💕",
  "Best player in the world, Vampyy! 👑❤️",
  "Cutest Penguine ever! 🐧✨"
];

let lastMessageIndex = -1;

/**
 * Returns a random message from the pool, preventing immediate repetition.
 */
export function getRandomLoveMessage() {
  if (LOVE_MESSAGES.length <= 1) return LOVE_MESSAGES[0] || "Love you Nidhi! ❤️";

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * LOVE_MESSAGES.length);
  } while (newIndex === lastMessageIndex);

  lastMessageIndex = newIndex;
  return LOVE_MESSAGES[newIndex];
}
