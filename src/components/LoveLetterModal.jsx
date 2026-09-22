import React, { useEffect } from 'react';

export default function LoveLetterModal({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop letter-backdrop" onClick={onClose}>
      <div
        className="modal-card letter-card"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside card
      >
        <button
          type="button"
          className="close-letter-btn"
          onClick={onClose}
          aria-label="Close letter"
        >
          ✕
        </button>

        <div className="letter-header">
          <span className="envelope-stamp">💌</span>
          <h2 className="letter-title">A Message For You</h2>
        </div>

        <div className="letter-paper">
          <p className="salutation">To my favorite person, ❤️</p>
          <div className="letter-body">
            <p>I made this little game just for you.</p>
            <p>
              It may look like a simple Snake game, but every heart you collect represents a little piece of my love for you.
            </p>
            <p>
              No matter how high your score gets, you'll never be able to collect as many hearts as I have for you. ❤️
            </p>
          </div>
          <div className="letter-signature">
            <p>Love,</p>
            <p className="signature-name">Priyanshu 💕</p>
          </div>
        </div>

        <button
          type="button"
          className="romantic-btn primary-btn letter-close-action"
          onClick={onClose}
        >
          Back to Game 🥰
        </button>
      </div>
    </div>
  );
}
