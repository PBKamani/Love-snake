const BEST_SCORE_KEY = 'love_snake_best_score';
const SOUND_KEY = 'love_snake_sound_enabled';
const MUSIC_KEY = 'love_snake_music_enabled';

export function getStoredBestScore() {
  try {
    const val = localStorage.getItem(BEST_SCORE_KEY);
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function saveBestScore(score) {
  try {
    const current = getStoredBestScore();
    if (score > current) {
      localStorage.setItem(BEST_SCORE_KEY, score.toString());
      return true; // New record
    }
  } catch {
    // Ignore storage errors in private/iframe modes
  }
  return false;
}

export function getStoredSoundEnabled() {
  try {
    const val = localStorage.getItem(SOUND_KEY);
    return val !== null ? val === 'true' : true; // default true
  } catch {
    return true;
  }
}

export function saveSoundEnabled(enabled) {
  try {
    localStorage.setItem(SOUND_KEY, enabled.toString());
  } catch {
    // Ignore
  }
}

export function getStoredMusicEnabled() {
  try {
    const val = localStorage.getItem(MUSIC_KEY);
    return val !== null ? val === 'true' : false; // default false so browser doesn't block
  } catch {
    return false;
  }
}

export function saveMusicEnabled(enabled) {
  try {
    localStorage.setItem(MUSIC_KEY, enabled.toString());
  } catch {
    // Ignore
  }
}
