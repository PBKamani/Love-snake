import { useState, useEffect, useRef, useCallback } from 'react';
import { getStoredBestScore, saveBestScore } from '../utils/storage';

export const GRID_SIZE = 20;

export const DIRECTIONS = {
  UP: { x: 0, y: -1, name: 'UP' },
  DOWN: { x: 0, y: 1, name: 'DOWN' },
  LEFT: { x: -1, y: 0, name: 'LEFT' },
  RIGHT: { x: 1, y: 0, name: 'RIGHT' },
};

const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
  { x: 7, y: 10 },
];

const INITIAL_DIRECTION = DIRECTIONS.RIGHT;
const COMBO_WINDOW_MS = 3500;

/**
 * Calculates game tick interval based on score (smooth speed curve)
 * 0–10: Easy (160ms -> 140ms)
 * 10–25: Medium (140ms -> 115ms)
 * 25–50: Fast (115ms -> 95ms)
 * 50+: Challenging (95ms -> 75ms)
 */
function getSpeedForScore(score) {
  if (score < 10) {
    return Math.max(140, 160 - score * 2);
  } else if (score < 25) {
    return Math.max(115, 140 - (score - 10) * 1.6);
  } else if (score < 50) {
    return Math.max(95, 115 - (score - 25) * 0.8);
  } else {
    return Math.max(75, 95 - (score - 50) * 0.4);
  }
}

function getRandomFoodPosition(snake) {
  const occupied = new Set(snake.map(segment => `${segment.x},${segment.y}`));
  const available = [];

  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (!occupied.has(`${x},${y}`)) {
        available.push({ x, y });
      }
    }
  }

  if (available.length === 0) return { x: 0, y: 0 };
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

export function useSnakeGame({ onEatHeart, onGameOver, onMilestone, soundEnabled = true }) {
  const [gameState, setGameState] = useState('start'); // 'start' | 'playing' | 'paused' | 'gameover'
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 14, y: 10 });
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(getStoredBestScore());
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [combo, setCombo] = useState(1);
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [lastEatenLocation, setLastEatenLocation] = useState(null);

  // Direction handling with queue to prevent self-collision on rapid keypresses
  const directionRef = useRef(INITIAL_DIRECTION);
  const nextDirectionRef = useRef(INITIAL_DIRECTION);
  const lastEatTimeRef = useRef(0);
  const comboTimeoutRef = useRef(null);

  // Sync high score from storage on mount
  useEffect(() => {
    setBestScore(getStoredBestScore());
  }, []);

  const changeDirection = useCallback((newDir) => {
    if (gameState !== 'playing') return;

    const current = directionRef.current;
    // Disallow immediate 180° turn
    const isOpposite = (newDir.x + current.x === 0 && newDir.y + current.y === 0);
    if (!isOpposite) {
      nextDirectionRef.current = newDir;
    }
  }, [gameState]);

  const startGame = useCallback(() => {
    const initSnake = [...INITIAL_SNAKE];
    const initialFood = getRandomFoodPosition(initSnake);
    setSnake(initSnake);
    setFood(initialFood);
    directionRef.current = DIRECTIONS.RIGHT;
    nextDirectionRef.current = DIRECTIONS.RIGHT;
    setScore(0);
    setCombo(1);
    setIsNewRecord(false);
    setActiveMilestone(null);
    setGameState('playing');
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(prev => (prev === 'playing' ? 'paused' : prev === 'paused' ? 'playing' : prev));
  }, []);

  const resetGame = useCallback(() => {
    setGameState('start');
    setSnake(INITIAL_SNAKE);
    setScore(0);
    setCombo(1);
    setIsNewRecord(false);
    setActiveMilestone(null);
  }, []);

  // Combo decay timer
  const registerEatCombo = useCallback(() => {
    const now = Date.now();
    let currentCombo = 1;

    if (now - lastEatTimeRef.current <= COMBO_WINDOW_MS) {
      setCombo(prev => {
        currentCombo = prev + 1;
        return currentCombo;
      });
    } else {
      setCombo(1);
      currentCombo = 1;
    }

    lastEatTimeRef.current = now;

    if (comboTimeoutRef.current) {
      clearTimeout(comboTimeoutRef.current);
    }
    comboTimeoutRef.current = setTimeout(() => {
      setCombo(1);
    }, COMBO_WINDOW_MS);

    return currentCombo;
  }, []);

  // Game Loop tick
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = getSpeedForScore(score);

    const timer = setInterval(() => {
      setSnake(currentSnake => {
        const currentDir = nextDirectionRef.current;
        directionRef.current = currentDir;

        const head = currentSnake[0];
        const newHead = {
          x: head.x + currentDir.x,
          y: head.y + currentDir.y,
        };

        // Wall collision check
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setGameState('gameover');
          if (onGameOver) onGameOver(score);
          return currentSnake;
        }

        // Self collision check (ignore tail if moving normally, but check if growing)
        const isSelfCollision = currentSnake.some((segment, index) => {
          // Exclude the very last segment because it moves away unless eating
          if (index === currentSnake.length - 1) return false;
          return segment.x === newHead.x && segment.y === newHead.y;
        });

        if (isSelfCollision) {
          setGameState('gameover');
          if (onGameOver) onGameOver(score);
          return currentSnake;
        }

        // Check food collision
        const ateFood = newHead.x === food.x && newHead.y === food.y;
        let newSnake;

        if (ateFood) {
          newSnake = [newHead, ...currentSnake]; // grow
          const newScore = score + 1;
          setScore(newScore);
          setLastEatenLocation({ x: food.x, y: food.y, timestamp: Date.now() });

          // Update Best Score
          const isRecord = saveBestScore(newScore);
          if (isRecord) {
            setIsNewRecord(true);
            setBestScore(newScore);
          }

          // Combo
          const activeCombo = registerEatCombo();

          // Milestone triggers at 25 and 50 (10-heart popup removed)
          if (newScore === 25 || newScore === 50) {
            setActiveMilestone(newScore);
            if (onMilestone) onMilestone(newScore);
          }

          // Spawn new food
          const nextFood = getRandomFoodPosition(newSnake);
          setFood(nextFood);

          // Callback for message & sound
          if (onEatHeart) {
            onEatHeart(newScore, activeCombo, { x: food.x, y: food.y });
          }
        } else {
          newSnake = [newHead, ...currentSnake.slice(0, -1)];
        }

        return newSnake;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [gameState, score, food, onEatHeart, onGameOver, onMilestone, registerEatCombo]);

  return {
    gameState,
    snake,
    food,
    direction: directionRef.current,
    score,
    bestScore,
    isNewRecord,
    combo,
    activeMilestone,
    lastEatenLocation,
    startGame,
    pauseGame,
    resetGame,
    changeDirection,
    closeMilestone: () => setActiveMilestone(null),
  };
}
