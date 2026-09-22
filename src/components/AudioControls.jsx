import React from 'react';

export default function AudioControls({
  musicEnabled,
  soundEnabled,
  onToggleMusic,
  onToggleSound,
}) {
  return (
    <div className="audio-controls" aria-label="Audio Preferences">
      <button
        type="button"
        className={`audio-btn ${musicEnabled ? 'active' : ''}`}
        onClick={onToggleMusic}
        title={musicEnabled ? 'Mute Music' : 'Play Music'}
        aria-label={musicEnabled ? 'Mute Romantic Music' : 'Play Romantic Music'}
      >
        <span className="audio-icon">{musicEnabled ? '🎵' : '🔇'}</span>
        <span className="audio-text">{musicEnabled ? 'Music ON' : 'Music OFF'}</span>
      </button>

      <button
        type="button"
        className={`audio-btn ${soundEnabled ? 'active' : ''}`}
        onClick={onToggleSound}
        title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
        aria-label={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
      >
        <span className="audio-icon">{soundEnabled ? '🔔' : '🔕'}</span>
        <span className="audio-text">{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
      </button>
    </div>
  );
}
