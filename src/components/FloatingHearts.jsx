import React, { useMemo } from 'react';

export default function FloatingHearts() {
  // Generate 30 decorative floating hearts with varied depths, speeds, colors, and glows
  const ambientHearts = useMemo(() => {
    const hearts = [];
    const heartChars = ['♡', '♥', '💕', '💖', '💗', '💓', '✨', '🌸', '💘', '♡'];
    const colorPalette = [
      '#ff4d6d',
      '#ff7597',
      '#ffaec0',
      '#ff2a6d',
      '#f78fb3',
      '#ffe5ec',
    ];

    const totalCount = 30;

    for (let i = 0; i < totalCount; i++) {
      // Varied horizontal positioning across the full width
      const leftPos = ((i * 3.3 + (i % 7) * 4.2) % 94 + 3).toFixed(1);
      
      // Varied sizes: 11px to 32px
      const sizeList = [12, 15, 18, 22, 26, 32];
      const sizePx = sizeList[i % sizeList.length];

      // Varied opacity levels for depth (faint background vs crisp foreground)
      const opacities = [0.12, 0.18, 0.25, 0.32, 0.42, 0.52];
      const opacityVal = opacities[i % opacities.length];

      // Varied slow duration between 14s and 26s
      const durationSec = (14 + (i % 6) * 2.2).toFixed(1);

      // Negative delays so the screen is immediately populated with floating hearts
      const delaySec = (-(i * 0.8 + 1.5)).toFixed(1);

      // Subtle horizontal sway variant
      const swayVariant = (i % 3) + 1; // 1, 2, or 3

      // Glow on select hearts
      const hasGlow = i % 4 === 0;

      hearts.push({
        id: i,
        char: heartChars[i % heartChars.length],
        left: `${leftPos}%`,
        size: `${sizePx}px`,
        color: colorPalette[i % colorPalette.length],
        opacity: opacityVal,
        duration: `${durationSec}s`,
        delay: `${delaySec}s`,
        swayClass: `sway-type-${swayVariant}`,
        hasGlow,
      });
    }
    return hearts;
  }, []);

  return (
    <div className="ambient-background" aria-hidden="true">
      {ambientHearts.map((h) => (
        <span
          key={h.id}
          className={`ambient-heart ${h.swayClass} ${h.hasGlow ? 'glow-heart' : ''}`}
          style={{
            left: h.left,
            fontSize: h.size,
            color: h.color,
            opacity: h.opacity,
            animationDuration: h.duration,
            animationDelay: h.delay,
          }}
        >
          {h.char}
        </span>
      ))}
    </div>
  );
}
