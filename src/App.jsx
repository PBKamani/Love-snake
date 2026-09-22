import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSnakeGame, DIRECTIONS } from './hooks/useSnakeGame';
import SnakeCanvas from './components/SnakeCanvas';
import ScoreBoard from './components/ScoreBoard';
import FloatingLoveMessage from './components/FloatingLoveMessage';
import FloatingHearts from './components/FloatingHearts';
import StartScreen from './components/StartScreen';
import GameOverModal from './components/GameOverModal';
import LoveLetterModal from './components/LoveLetterModal';
import MilestoneModal from './components/MilestoneModal';
import MobileControls from './components/MobileControls';
import AudioControls from './components/AudioControls';

import { getRandomLoveMessage } from './data/loveMessages';
import {
  playEatSound,
  playComboSound,
  playCelebrationSound,
  playGameOverSound,
  playButtonSound,
  startBGM,
  stopBGM,
} from './utils/audio';
import {
  getStoredMusicEnabled,
  saveMusicEnabled,
  getStoredSoundEnabled,
  saveSoundEnabled,
} from './utils/storage';

import './App.css';

export default function App() {
  const [musicEnabled, setMusicEnabled] = useState(getStoredMusicEnabled);
  const [soundEnabled, setSoundEnabled] = useState(getStoredSoundEnabled);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [floatingMessages, setFloatingMessages] = useState([]);
  const [isGameOverDismissed, setIsGameOverDismissed] = useState(false);

  // Touch swipe coordinates for game board
  const touchStartRef = useRef(null);

  // Sound & music handlers
  const handleToggleMusic = useCallback(() => {
    playButtonSound();
    setMusicEnabled((prev) => {
      const next = !prev;
      saveMusicEnabled(next);
      if (next) {
        startBGM();
      } else {
        stopBGM();
      }
      return next;
    });
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      saveSoundEnabled(next);
      if (next) playButtonSound();
      return next;
    });
  }, []);

  // Heart eaten callback -> Spawn floating love message above board & play sound
  const handleEatHeart = useCallback(
    (newScore, activeCombo) => {
      if (soundEnabled) {
        if (activeCombo > 1) {
          playComboSound(activeCombo);
        } else {
          playEatSound();
        }
      }

      // Generate random compliment from Nidhi's message list
      const messageText = getRandomLoveMessage();
      const newMessage = {
        id: `msg-${Date.now()}-${Math.random()}`,
        text: messageText,
      };

      setFloatingMessages((prev) => [...prev, newMessage]);
    },
    [soundEnabled]
  );

  const handleRemoveFloatingMessage = useCallback((id) => {
    setFloatingMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const handleGameOver = useCallback(
    () => {
      setIsGameOverDismissed(false);
      if (soundEnabled) {
        playGameOverSound();
      }
    },
    [soundEnabled]
  );

  const handleMilestone = useCallback(
    () => {
      if (soundEnabled) {
        playCelebrationSound();
      }
    },
    [soundEnabled]
  );

  // Initialize Snake game hook
  const {
    gameState,
    snake,
    food,
    direction,
    score,
    bestScore,
    isNewRecord,
    combo,
    activeMilestone,
    lastEatenLocation,
    startGame,
    pauseGame,
    changeDirection,
    closeMilestone,
  } = useSnakeGame({
    onEatHeart: handleEatHeart,
    onGameOver: handleGameOver,
    onMilestone: handleMilestone,
    soundEnabled,
  });

  // Start BGM if user already had it enabled and interacts
  const handleStartGame = () => {
    playButtonSound();
    setIsGameOverDismissed(false);
    if (musicEnabled) {
      startBGM();
    }
    startGame();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't handle game keys if letter modal or milestone is open
      if (isLetterOpen || activeMilestone) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          changeDirection(DIRECTIONS.UP);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          changeDirection(DIRECTIONS.DOWN);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          changeDirection(DIRECTIONS.LEFT);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          changeDirection(DIRECTIONS.RIGHT);
          break;
        case ' ': // Space for pause/resume
          e.preventDefault();
          if (gameState === 'playing' || gameState === 'paused') {
            pauseGame();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, pauseGame, gameState, isLetterOpen, activeMilestone]);

  // Touch Swipe handlers for Canvas/Board
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current || !e.changedTouches || e.changedTouches.length === 0) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const dx = endX - touchStartRef.current.x;
    const dy = endY - touchStartRef.current.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Minimum swipe threshold
    if (Math.max(absDx, absDy) > 25) {
      if (absDx > absDy) {
        // Horizontal swipe
        if (dx > 0) changeDirection(DIRECTIONS.RIGHT);
        else changeDirection(DIRECTIONS.LEFT);
      } else {
        // Vertical swipe
        if (dy > 0) changeDirection(DIRECTIONS.DOWN);
        else changeDirection(DIRECTIONS.UP);
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div className="love-snake-app">
      {/* 30 decorative floating hearts in the background */}
      <FloatingHearts />

      {/* Main Game Container */}
      <main className="game-wrapper">
        {/* Header section */}
        <header className="app-header">
          <div className="title-row">
            <h1 className="main-brand">💕 LOVE SNAKE 💕</h1>
            <AudioControls
              musicEnabled={musicEnabled}
              soundEnabled={soundEnabled}
              onToggleMusic={handleToggleMusic}
              onToggleSound={handleToggleSound}
            />
          </div>
          <p className="sub-tagline">Made with love for Nidhi ❤️</p>
        </header>

        {/* Score & Combo Board */}
        <ScoreBoard
          score={score}
          bestScore={bestScore}
          combo={combo}
          isNewRecord={isNewRecord}
        />

        {/* Dedicated Floating Love Message Stage: Immediately ABOVE the Game Board */}
        <FloatingLoveMessage
          messages={floatingMessages}
          onRemoveMessage={handleRemoveFloatingMessage}
        />

        {/* Board Display with Canvas */}
        <div
          className="game-board-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <SnakeCanvas
            snake={snake}
            food={food}
            direction={direction}
            lastEatenLocation={lastEatenLocation}
            gameState={gameState}
          />

          {/* Paused Overlay */}
          {gameState === 'paused' && (
            <div className="pause-overlay">
              <div className="pause-badge">
                <span>⏸️ Game Paused</span>
                <p className="pause-hint">Press Space or button to continue 💕</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons & Mobile D-pad */}
        <footer className="game-footer">
          <div className="footer-actions">
            {gameState === 'playing' && (
              <button
                type="button"
                className="romantic-pill-btn"
                onClick={pauseGame}
                aria-label="Pause Game"
              >
                ⏸️ Pause
              </button>
            )}
            {gameState === 'paused' && (
              <button
                type="button"
                className="romantic-pill-btn active"
                onClick={pauseGame}
                aria-label="Resume Game"
              >
                ▶️ Resume
              </button>
            )}
            {gameState === 'gameover' && (
              <button
                type="button"
                className="romantic-pill-btn primary-action-pill"
                onClick={handleStartGame}
                aria-label="Play Again"
              >
                🔄 Play Again 💕
              </button>
            )}
            <button
              type="button"
              className="romantic-pill-btn letter-btn"
              onClick={() => {
                playButtonSound();
                setIsLetterOpen(true);
              }}
            >
              💌 Open My Message
            </button>
          </div>

          {/* On-screen Directional Controls for Mobile / Touch */}
          <MobileControls onDirectionChange={changeDirection} />
        </footer>
      </main>

      {/* Start Screen Overlay */}
      {gameState === 'start' && (
        <StartScreen
          onStartGame={handleStartGame}
          onOpenLetter={() => {
            playButtonSound();
            setIsLetterOpen(true);
          }}
        />
      )}

      {/* Game Over Screen with Close (X) button */}
      {gameState === 'gameover' && !isGameOverDismissed && (
        <GameOverModal
          score={score}
          bestScore={bestScore}
          isNewRecord={isNewRecord}
          onPlayAgain={handleStartGame}
          onOpenLetter={() => {
            playButtonSound();
            setIsLetterOpen(true);
          }}
          onClose={() => setIsGameOverDismissed(true)}
        />
      )}

      {/* Milestone Celebrations (25 and 50 hearts) */}
      <MilestoneModal
        milestone={activeMilestone}
        onClose={closeMilestone}
        onOpenLetter={() => {
          playButtonSound();
          setIsLetterOpen(true);
        }}
      />

      {/* Secret Love Letter Modal */}
      <LoveLetterModal
        isOpen={isLetterOpen}
        onClose={() => setIsLetterOpen(false)}
      />
    </div>
  );
}
