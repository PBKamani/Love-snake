import React, { useRef, useEffect } from 'react';
import { GRID_SIZE } from '../hooks/useSnakeGame';

// Helper to draw a heart shape on canvas
function drawHeart(ctx, x, y, width, height, color, glowColor = null, glowBlur = 0) {
  ctx.save();
  if (glowColor && glowBlur > 0) {
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = glowBlur;
  }
  ctx.fillStyle = color;
  ctx.beginPath();
  const topCurveHeight = height * 0.3;
  ctx.moveTo(x + width / 2, y + height);
  // Left curve
  ctx.bezierCurveTo(
    x, y + height * 0.65,
    x, y,
    x + width / 2, y + topCurveHeight
  );
  // Right curve
  ctx.bezierCurveTo(
    x + width, y,
    x + width, y + height * 0.65,
    x + width / 2, y + height
  );
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Helper to draw a 4-pointed sparkle star
function drawSparkle(ctx, cx, cy, size, rotation, opacity) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotation);
  ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
  ctx.shadowColor = '#ffe5ec';
  ctx.shadowBlur = 6;
  ctx.beginPath();
  for (let i = 0; i < 4; i++) {
    ctx.lineTo(0, -size);
    ctx.lineTo(size * 0.22, -size * 0.22);
    ctx.rotate(Math.PI / 2);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export default function SnakeCanvas({
  snake,
  food,
  direction,
  lastEatenLocation,
  gameState,
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  // Trigger particle burst when food is eaten
  useEffect(() => {
    if (lastEatenLocation) {
      const { x, y } = lastEatenLocation;
      const count = 12;
      const newParticles = [];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const speed = 1.8 + Math.random() * 2.8;
        newParticles.push({
          x: x + 0.5,
          y: y + 0.5,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          size: 4 + Math.random() * 5,
          isHeart: Math.random() > 0.4,
          color: Math.random() > 0.5 ? '#ff4d6d' : '#ff7597',
        });
      }
      particlesRef.current.push(...newParticles);
    }
  }, [lastEatenLocation]);

  // Main Canvas Rendering Loop
  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cellSize = width / GRID_SIZE;
      const time = Date.now() * 0.003;

      // 1. Clear & Background Gradient (Deep romantic plum/magenta)
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#180420');
      bgGrad.addColorStop(0.5, '#22072e');
      bgGrad.addColorStop(1, '#2c0a3a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle Glowing Grid Lines
      ctx.strokeStyle = 'rgba(255, 105, 180, 0.09)';
      ctx.lineWidth = 1;
      for (let i = 1; i < GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(width, i * cellSize);
        ctx.stroke();
      }

      // 3. Subtle ambient background heart watermarks
      ctx.save();
      ctx.globalAlpha = 0.04;
      drawHeart(ctx, width * 0.15, height * 0.2, 50, 46, '#ff4d6d');
      drawHeart(ctx, width * 0.75, height * 0.65, 60, 56, '#ff7597');
      drawHeart(ctx, width * 0.45, height * 0.8, 40, 37, '#ffaec0');
      ctx.restore();

      // 4. Render Heart Food ❤️ (Glowing, pulsing, bobbing)
      if (food) {
        const foodPulse = Math.sin(time * 3) * 0.12 + 1; // 0.88 - 1.12
        const bobbing = Math.sin(time * 2) * 2;
        const foodSize = cellSize * 0.88 * foodPulse;
        const fx = food.x * cellSize + (cellSize - foodSize) / 2;
        const fy = food.y * cellSize + (cellSize - foodSize) / 2 + bobbing;

        // Outer Heart Glow
        ctx.save();
        ctx.shadowColor = '#ff2a6d';
        ctx.shadowBlur = 18;

        // Food Heart Gradient
        const heartGrad = ctx.createLinearGradient(fx, fy, fx + foodSize, fy + foodSize);
        heartGrad.addColorStop(0, '#ff7aa2');
        heartGrad.addColorStop(0.5, '#ff3366');
        heartGrad.addColorStop(1, '#e0004d');

        drawHeart(ctx, fx, fy, foodSize, foodSize, heartGrad, '#ff3366', 15);

        // 3D Glass Highlight on Food Heart
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.beginPath();
        ctx.ellipse(
          fx + foodSize * 0.32,
          fy + foodSize * 0.32,
          foodSize * 0.18,
          foodSize * 0.1,
          -Math.PI / 4,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();

        // Twinkling Starburst Sparkles around the food heart
        const sparkle1X = fx + foodSize * 1.1 + Math.sin(time * 2) * 3;
        const sparkle1Y = fy - foodSize * 0.1;
        const sparkle2X = fx - foodSize * 0.15;
        const sparkle2Y = fy + foodSize * 0.9 + Math.cos(time * 2) * 3;

        drawSparkle(ctx, sparkle1X, sparkle1Y, 5, time * 1.5, 0.85);
        drawSparkle(ctx, sparkle2X, sparkle2Y, 4, -time * 1.5, 0.7);
      }

      // 5. Render Snake Body Segments (from tail to neck)
      const segmentRadius = cellSize * 0.38;
      const len = snake.length;

      for (let i = len - 1; i >= 1; i--) {
        const seg = snake[i];
        const segX = seg.x * cellSize + cellSize * 0.08;
        const segY = seg.y * cellSize + cellSize * 0.08;
        const segW = cellSize * 0.84;
        const segH = cellSize * 0.84;

        // Gradient shades of pink: vibrant rose down to baby marshmallow pink
        const factor = i / Math.max(1, len - 1);
        const r = Math.round(255 - factor * 8);
        const g = Math.round(110 + factor * 75);
        const b = Math.round(155 + factor * 60);
        const baseColor = `rgb(${r}, ${g}, ${b})`;

        ctx.save();
        // Drop shadow / soft glow
        ctx.shadowColor = 'rgba(255, 64, 129, 0.4)';
        ctx.shadowBlur = 8;

        // Squircle body segment
        ctx.fillStyle = baseColor;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(segX, segY, segW, segH, segmentRadius);
        } else {
          ctx.rect(segX, segY, segW, segH);
        }
        ctx.fill();

        // 3D Jelly / Marshmallow Highlight on top-left
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.42)';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(segX + 2, segY + 2, segW * 0.55, segH * 0.35, segmentRadius * 0.6);
        } else {
          ctx.rect(segX + 2, segY + 2, segW * 0.55, segH * 0.35);
        }
        ctx.fill();
        ctx.restore();
      }

      // 6. Render Snake Head (Index 0)
      if (snake.length > 0) {
        const head = snake[0];
        const hx = head.x * cellSize + cellSize * 0.05;
        const hy = head.y * cellSize + cellSize * 0.05;
        const hw = cellSize * 0.9;
        const hh = cellSize * 0.9;
        const headRadius = cellSize * 0.42;

        ctx.save();
        // Head Glow
        ctx.shadowColor = 'rgba(255, 77, 109, 0.6)';
        ctx.shadowBlur = 12;

        // Head Base: Cute glossy pink
        const headGrad = ctx.createLinearGradient(hx, hy, hx + hw, hy + hh);
        headGrad.addColorStop(0, '#ffa4bc');
        headGrad.addColorStop(0.5, '#ff7597');
        headGrad.addColorStop(1, '#ff5277');

        ctx.fillStyle = headGrad;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(hx, hy, hw, hh, headRadius);
        } else {
          ctx.rect(hx, hy, hw, hh);
        }
        ctx.fill();

        // 3D Glass Highlight on head
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.48)';
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(hx + 3, hy + 3, hw * 0.6, hh * 0.32, headRadius * 0.6);
        }
        ctx.fill();

        // 6a. Adorable Floating Heart on Head (Crown / Antenna)
        const heartCrownSize = cellSize * 0.38;
        let crownX = hx + hw / 2 - heartCrownSize / 2;
        let crownY = hy - heartCrownSize * 0.65 + Math.sin(time * 4) * 1.5;

        // Subtle offset based on direction
        if (direction) {
          if (direction.name === 'UP') crownY = hy - heartCrownSize * 0.8;
          if (direction.name === 'DOWN') crownY = hy + hh - heartCrownSize * 0.2;
          if (direction.name === 'LEFT') crownX = hx - heartCrownSize * 0.1;
          if (direction.name === 'RIGHT') crownX = hx + hw - heartCrownSize * 0.9;
        }

        drawHeart(ctx, crownX, crownY, heartCrownSize, heartCrownSize, '#ff3366', '#ff7597', 8);

        // 6b. Eyes, Blush, Smile, and Tongue orientation
        // Calculate eye offsets based on movement direction
        let eyeLookX = 0;
        let eyeLookY = 0;
        if (direction) {
          eyeLookX = direction.x * 2.5;
          eyeLookY = direction.y * 2.5;
        }

        const eyeRadius = cellSize * 0.11;
        const leftEyeCenter = { x: hx + hw * 0.32 + eyeLookX, y: hy + hh * 0.45 + eyeLookY };
        const rightEyeCenter = { x: hx + hw * 0.68 + eyeLookX, y: hy + hh * 0.45 + eyeLookY };

        // Eye Pupils (Big dark kawaii anime eyes)
        ctx.fillStyle = '#260420';
        ctx.beginPath();
        ctx.arc(leftEyeCenter.x, leftEyeCenter.y, eyeRadius, 0, Math.PI * 2);
        ctx.arc(rightEyeCenter.x, rightEyeCenter.y, eyeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Eye Specular Catchlights (Primary top-left white sparkle)
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(leftEyeCenter.x - eyeRadius * 0.35, leftEyeCenter.y - eyeRadius * 0.35, eyeRadius * 0.45, 0, Math.PI * 2);
        ctx.arc(rightEyeCenter.x - eyeRadius * 0.35, rightEyeCenter.y - eyeRadius * 0.35, eyeRadius * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // Secondary tiny catchlight (bottom-right)
        ctx.beginPath();
        ctx.arc(leftEyeCenter.x + eyeRadius * 0.38, leftEyeCenter.y + eyeRadius * 0.38, eyeRadius * 0.22, 0, Math.PI * 2);
        ctx.arc(rightEyeCenter.x + eyeRadius * 0.38, rightEyeCenter.y + eyeRadius * 0.38, eyeRadius * 0.22, 0, Math.PI * 2);
        ctx.fill();

        // 6c. Rosy Blushing Cheeks
        ctx.fillStyle = 'rgba(255, 64, 129, 0.55)';
        ctx.beginPath();
        ctx.arc(hx + hw * 0.2 + eyeLookX, hy + hh * 0.62 + eyeLookY, cellSize * 0.11, 0, Math.PI * 2);
        ctx.arc(hx + hw * 0.8 + eyeLookX, hy + hh * 0.62 + eyeLookY, cellSize * 0.11, 0, Math.PI * 2);
        ctx.fill();

        // 6d. Smiling Mouth
        const mouthCenter = { x: hx + hw * 0.5 + eyeLookX, y: hy + hh * 0.64 + eyeLookY };
        ctx.strokeStyle = '#260420';
        ctx.lineWidth = 1.6;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(mouthCenter.x, mouthCenter.y, cellSize * 0.12, 0.15 * Math.PI, 0.85 * Math.PI);
        ctx.stroke();

        // 6e. Cute Little Pink Tongue sticking out (:P)
        ctx.fillStyle = '#ff2a6d';
        ctx.beginPath();
        ctx.arc(mouthCenter.x, mouthCenter.y + cellSize * 0.12, cellSize * 0.08, 0, Math.PI);
        ctx.fill();

        ctx.restore();
      }

      // 7. Render Particle Bursts (Heart and sparkle particles)
      const currentParticles = particlesRef.current;
      for (let i = currentParticles.length - 1; i >= 0; i--) {
        const p = currentParticles[i];
        p.x += (p.vx * 0.016);
        p.y += (p.vy * 0.016);
        p.life -= 0.024;

        if (p.life <= 0) {
          currentParticles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        const px = p.x * cellSize;
        const py = p.y * cellSize;

        if (p.isHeart) {
          drawHeart(ctx, px - p.size / 2, py - p.size / 2, p.size, p.size, p.color);
        } else {
          drawSparkle(ctx, px, py, p.size * 0.8, p.life * 4, p.life);
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [snake, food, direction, gameState]);

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        width={440}
        height={440}
        className="game-canvas"
      />
    </div>
  );
}
