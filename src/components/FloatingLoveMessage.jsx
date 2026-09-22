import React, { useEffect } from 'react';

/**
 * Single floating love message that animates strictly inside the dedicated message area
 */
function SingleFloatingMessage({ message, onComplete }) {
  useEffect(() => {
    // 4.6 seconds duration so Nidhi can comfortably read the message
    const timer = setTimeout(() => {
      onComplete(message.id);
    }, 4600);

    return () => clearTimeout(timer);
  }, [message.id, onComplete]);

  return (
    <div className="love-message-pill-wrapper">
      <div className="love-message-pill">
        <span className="sparkle-icon">✨</span>
        <span className="love-pill-text">{message.text}</span>
        <span className="heart-icon">💖</span>
      </div>
    </div>
  );
}

/**
 * Dedicated Love Message Area placed directly ABOVE the game board
 * Completely self-contained: messages never leave this area.
 */
export default function FloatingLoveMessage({ messages, onRemoveMessage }) {
  // Show the latest message prominently, cleanly animated inside the area
  const activeMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  return (
    <div className="love-message-area" aria-live="polite">
      {activeMessage ? (
        <SingleFloatingMessage
          key={activeMessage.id}
          message={activeMessage}
          onComplete={onRemoveMessage}
        />
      ) : (
        <div className="love-message-placeholder">
          <span className="placeholder-heart">♡</span>
          <span className="placeholder-text">Collect hearts for love notes</span>
          <span className="placeholder-heart">♡</span>
        </div>
      )}
    </div>
  );
}
