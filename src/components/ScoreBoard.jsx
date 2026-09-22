import React from 'react';

export default function ScoreBoard({ score, bestScore, combo, isNewRecord }) {
  return (
    <div className="scoreboard-container">
      {/* Current Score Card */}
      <div className="score-badge current-score">
        <span className="score-icon">❤️</span>
        <div className="score-details">
          <span className="score-label">Love Collected</span>
          <span className="score-value">{score}</span>
        </div>
      </div>

      {/* Combo Indicator */}
      {combo > 1 && (
        <div className="combo-badge" role="status">
          <span className="combo-sparkle">✨</span>
          <span className="combo-text">LOVE COMBO x{combo}!</span>
          <span className="combo-sparkle">💕</span>
        </div>
      )}

      {/* High Score Card */}
      <div className="score-badge best-score">
        <span className="score-icon">🏆</span>
        <div className="score-details">
          <span className="score-label">Best</span>
          <span className="score-value">{bestScore}</span>
        </div>
        {isNewRecord && (
          <span className="new-record-pill">NEW RECORD! ✨</span>
        )}
      </div>
    </div>
  );
}
