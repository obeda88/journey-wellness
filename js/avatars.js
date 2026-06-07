/* Journey - Avatar System */

// Avatar to mood mapping
const AVATAR_SYSTEM = {
  owl: {
    name: 'Owl',
    emoji: '🦉',
    mood: 'peaceful',
    color: '#A8D8A8',
    traits: ['wise', 'calm', 'observant']
  },
  fox: {
    name: 'Fox',
    emoji: '🦊',
    mood: 'happy',
    color: '#FFD166',
    traits: ['clever', 'playful', 'cheerful']
  },
  squirrel: {
    name: 'Squirrel',
    emoji: '🐿️',
    mood: 'excited',
    color: '#FFB74D',
    traits: ['bouncy', 'energetic', 'curious']
  },
  cat: {
    name: 'Cat',
    emoji: '🐱',
    mood: 'frustrated',
    color: '#FF6B6B',
    traits: ['independent', 'expressive', 'feisty']
  },
  sloth: {
    name: 'Sloth',
    emoji: '🦥',
    mood: 'tired',
    color: '#D9A5D9',
    traits: ['cozy', 'slow', 'peaceful']
  },
  duck: {
    name: 'Duck',
    emoji: '🦆',
    mood: 'loved',
    color: '#C8E6C9',
    traits: ['warm', 'gentle', 'connected']
  },
  lamb: {
    name: 'Lamb',
    emoji: '🐑',
    mood: 'sad',
    color: '#B8B8D8',
    traits: ['gentle', 'tender', 'vulnerable']
  },
  butterfly: {
    name: 'Butterfly',
    emoji: '🦋',
    mood: 'grateful',
    color: '#FFE5B4',
    traits: ['transforming', 'beautiful', 'free']
  }
};

// Get avatar by mood
function getAvatarByMood(mood) {
  for (const [key, avatar] of Object.entries(AVATAR_SYSTEM)) {
    if (avatar.mood === mood) {
      return { key, ...avatar };
    }
  }
  return null;
}

// Get all moods with avatars
function getAllMoodsWithAvatars() {
  return Object.entries(AVATAR_SYSTEM).map(([key, avatar]) => ({
    key,
    ...avatar
  }));
}

// Render mood selector (small grid)
function renderMoodSelector(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const moods = getAllMoodsWithAvatars();
  container.innerHTML = '';

  moods.forEach((mood) => {
    const moodBtn = document.createElement('button');
    moodBtn.type = 'button';
    moodBtn.className = `mood-option ${mood.mood}`;
    moodBtn.dataset.mood = mood.mood;
    moodBtn.dataset.avatar = mood.key;
    moodBtn.innerHTML = `
      <div class="mood-avatar">${mood.emoji}</div>
      <div class="mood-label">${mood.name}</div>
    `;

    moodBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleMoodSelect(moodBtn, mood.mood, mood.key);
    });

    container.appendChild(moodBtn);
  });
}

// Render large mood selector with avatars (for entry form)
function renderLargeMoodSelector(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const moods = getAllMoodsWithAvatars();
  container.innerHTML = '';

  moods.forEach((mood) => {
    const moodOption = document.createElement('button');
    moodOption.type = 'button';
    moodOption.className = `mood-option ${mood.mood}`;
    moodOption.dataset.mood = mood.mood;
    moodOption.dataset.avatar = mood.key;
    moodOption.innerHTML = `
      <div class="mood-avatar">${mood.emoji}</div>
      <div class="mood-label">${mood.name}</div>
    `;

    moodOption.addEventListener('click', (e) => {
      e.preventDefault();
      handleLargeMoodSelect(moodOption, mood.mood, mood.key);
    });

    container.appendChild(moodOption);
  });
}

// Handle mood selection (small)
function handleMoodSelect(element, mood, avatar) {
  const selector = element.parentElement;
  const allOptions = selector.querySelectorAll('.mood-option');
  
  allOptions.forEach((opt) => opt.classList.remove('selected'));
  element.classList.add('selected');

  const moodInput = document.getElementById('selected-mood');
  const avatarInput = document.getElementById('selected-avatar');
  
  if (moodInput) moodInput.value = mood;
  if (avatarInput) avatarInput.value = avatar;
}

// Handle mood selection (large)
function handleLargeMoodSelect(element, mood, avatar) {
  const selector = element.parentElement;
  const allOptions = selector.querySelectorAll('.mood-option');
  
  allOptions.forEach((opt) => opt.classList.remove('selected'));
  element.classList.add('selected');

  const moodInput = document.getElementById('selected-mood');
  const avatarInput = document.getElementById('selected-avatar');
  
  if (moodInput) moodInput.value = mood;
  if (avatarInput) avatarInput.value = avatar;

  // Trigger animation
  element.style.animation = 'none';
  setTimeout(() => {
    element.style.animation = '';
  }, 10);
}

// Get color for mood
function getMoodColor(mood) {
  const avatar = Object.values(AVATAR_SYSTEM).find(a => a.mood === mood);
  return avatar ? avatar.color : '#FFFFFF';
}

// Format avatar with color badge
function formatAvatarBadge(emoji, color) {
  return `<span style="background-color: ${color}; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; font-size: 24px;">${emoji}</span>`;
}
