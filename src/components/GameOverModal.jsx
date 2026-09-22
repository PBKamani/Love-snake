import React from 'react';

export default function GameOverModal({
  score,
  bestScore,
  isNewRecord,
  onPlayAgain,
  onOpenLetter,
  onClose,
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card gameover-card"
        onClick={(e) => e.stopPropagation()} // Prevent clicking inside card from closing
      >
        {/* Cute top-right X Close button */}
        <button
          type="button"
          className="close-modal-btn"
          onClick={onClose}
          aria-label="Close Game Over dialog"
          title="Close dialog"
        >
          ✕
        </button>

        <div className="gameover-heart-icon">💔</div>
        <h2 className="modal-title">Oops!</h2>
        <p className="gameover-subtext">
          Our little snake got into trouble! 🥺
        </p>

        {isNewRecord && (
          <div className="record-banner">
            ✨ NEW LOVE RECORD! ✨
          </div>
        )}

        <div className="gameover-stats">
          <div className="stat-box">
            <span className="stat-label">❤️ Love Collected</span>
            <span className="stat-val">{score}</span>
          </div>
          <div className="stat-box">
            <span className="stat-label">🏆 Best</span>
            <span className="stat-val">{bestScore}</span>
          </div>
        </div>

        <div className="gameover-actions">
          <button
            type="button"
            className="romantic-btn primary-btn pulse-glow"
            onClick={onPlayAgain}
            autoFocus
          >
            PLAY AGAIN 💕
          </button>

          <button
            type="button"
            className="romantic-btn secondary-btn"
            onClick={onOpenLetter}
          >
            💌 Open My Message
          </button>
        </div>
      </div>
    </div>
  );
}
