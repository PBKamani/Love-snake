import React from 'react';

export default function MilestoneModal({ milestone, onClose, onOpenLetter }) {
  if (!milestone) return null;

  let title = '💕 Milestone Reached!';
  let message = 'You are doing amazing, Nidhi!';
  let icon = '💖';

  if (milestone === 25) {
    title = '💗 25 Hearts!';
    message = 'Sending you 25 kisses! 💋';
    icon = '💋';
  } else if (milestone === 50) {
    title = '💖 50 HEARTS! 💖';
    message = 'You found a special surprise... Priyanshu loves you endlessly!';
    icon = '👑';
  }

  return (
    <div className="modal-backdrop milestone-backdrop" onClick={onClose}>
      <div
        className="modal-card milestone-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="milestone-icon">{icon}</div>
        <h2 className="milestone-title">{title}</h2>
        <p className="milestone-message">{message}</p>

        <div className="milestone-actions">
          <button
            type="button"
            className="romantic-btn primary-btn pulse-glow"
            onClick={onClose}
            autoFocus
          >
            Continue Playing 💕
          </button>

          {milestone === 50 && (
            <button
              type="button"
              className="romantic-btn secondary-btn"
              onClick={() => {
                onClose();
                if (onOpenLetter) onOpenLetter();
              }}
            >
              💌 Open Secret Letter
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
