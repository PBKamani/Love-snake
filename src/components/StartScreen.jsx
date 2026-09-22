import React from 'react';

export default function StartScreen({ onStartGame, onOpenLetter }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-card start-card">
        <div className="heart-header-icon">💕</div>
        <h1 className="romantic-title">LOVE SNAKE</h1>
        <div className="heart-subtitle-icon">💕</div>

        <div className="start-greeting">
          <p className="greeting-lead">Hey Nidhi ❤️</p>
          <p className="greeting-body">
            A tiny game made especially for you.<br />
            Collect the glowing hearts and have fun! 🥰
          </p>
        </div>

        <div className="start-actions">
          <button
            type="button"
            className="romantic-btn primary-btn pulse-glow"
            onClick={onStartGame}
            autoFocus
          >
            START GAME 💕
          </button>

          <button
            type="button"
            className="romantic-btn secondary-btn"
            onClick={onOpenLetter}
          >
            💌 Open My Message
          </button>
        </div>

        <p className="author-credit">
          Made with ❤️ by Priyanshu
        </p>
      </div>
    </div>
  );
}
