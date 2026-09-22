import React from 'react';
import { DIRECTIONS } from '../hooks/useSnakeGame';

export default function MobileControls({ onDirectionChange }) {
  const handlePress = (e, dir) => {
    e.preventDefault();
    onDirectionChange(dir);
  };

  return (
    <div className="mobile-controls-wrapper" aria-label="Touch Direction Controls">
      <div className="dpad-row dpad-top">
        <button
          type="button"
          className="dpad-btn dpad-up"
          onTouchStart={(e) => handlePress(e, DIRECTIONS.UP)}
          onClick={(e) => handlePress(e, DIRECTIONS.UP)}
          aria-label="Move Up"
        >
          ▲
        </button>
      </div>
      <div className="dpad-row dpad-middle">
        <button
          type="button"
          className="dpad-btn dpad-left"
          onTouchStart={(e) => handlePress(e, DIRECTIONS.LEFT)}
          onClick={(e) => handlePress(e, DIRECTIONS.LEFT)}
          aria-label="Move Left"
        >
          ◀
        </button>
        <button
          type="button"
          className="dpad-btn dpad-down"
          onTouchStart={(e) => handlePress(e, DIRECTIONS.DOWN)}
          onClick={(e) => handlePress(e, DIRECTIONS.DOWN)}
          aria-label="Move Down"
        >
          ▼
        </button>
        <button
          type="button"
          className="dpad-btn dpad-right"
          onTouchStart={(e) => handlePress(e, DIRECTIONS.RIGHT)}
          onClick={(e) => handlePress(e, DIRECTIONS.RIGHT)}
          aria-label="Move Right"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
