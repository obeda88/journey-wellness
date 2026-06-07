/* Journey - Avatar System */

// Avatar to mood mapping
const AVATAR_SYSTEM = {
  owl: {
    name: 'Peaceful',
    emoji: '🦉',
    mood: 'peaceful',
    color: '#A8D8A8',
    traits: ['wise', 'calm', 'observant']
  },
  fox: {
    name: 'Happy',
    emoji: '🦊',
    mood: 'happy',
    color: '#FFD166',
    traits: ['clever', 'playful', 'cheerful']
  },
  squirrel: {
    name: 'Excited',
    emoji: '🐿️',
    mood: 'excited',
    color: '#FFB74D',
    traits: ['bouncy', 'energetic', 'curious']
  },
  cat: {
    name: 'Frustrated',
    emoji: '🐱',
    mood: 'frustrated',
    color: '#FF6B6B',
    traits: ['independent', 'expressive', 'feisty']
  },
  sloth: {
    name: 'Tired',
    emoji: '🦥',
    mood: 'tired',
    color: '#D9A5D9',
    traits: ['cozy', 'slow', 'peaceful']
  },
  duck: {
    name: 'Loved',
    emoji: '🦆',
    mood: 'loved',
    color: '#C8E6C9',
    traits: ['warm', 'gentle', 'connected']
  },
  lamb: {
    name: 'Sad',
    emoji: '🐑',
    mood: 'sad',
    color: '#B8B8D8',
    traits: ['gentle', 'tender', 'vulnerable']
  },
  butterfly: {
    name: 'Grateful',
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

// Additional animal emojis for custom avatars
const ADDITIONAL_ANIMALS = [
  '🐺', '🐻', '🐼', '🐰', '🦔', '🦌', '🐭', '🐹',
  '🐯', '🦁', '🐨', '🐵', '🐘', '🦒', '🐴', '🐮',
  '🐷', '🐶', '🐈', '🐺',
  '🦅', '🦜', '🐧', '🦚', '🦢', '🦩', '🐦',
  '🐸', '🐊', '🐍', '🦎', '🦖',
  '🐋', '🐬', '🐙', '🐠', '🦈', '🐳',
  '🐝', '🐞', '🐌', '🕷️',
  '🦄', '🐉', '🐲'
];

const COLOR_PALETTE = [
  '#A8D8A8', '#FFD166', '#FFB74D', '#FFB3BA',
  '#D9A5D9', '#C8E6C9', '#B8D8E8', '#FFE5B4',
  '#B8B8D8', '#FF9AA2'
];

const CUSTOM_AVATARS_KEY = 'journey-custom-avatars';

function getCustomAvatars() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_AVATARS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}

function persistCustomAvatars(list) {
  localStorage.setItem(CUSTOM_AVATARS_KEY, JSON.stringify(list));
}

function deleteCustomAvatar(id) {
  persistCustomAvatars(getCustomAvatars().filter(a => a.id !== id));
}

// Get all moods with avatars
function getAllMoodsWithAvatars() {
  const builtIn = Object.entries(AVATAR_SYSTEM).map(([key, avatar]) => ({
    key,
    ...avatar
  }));
  return [...builtIn, ...getCustomAvatars()];
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
    const customClass = mood.isCustom ? ' custom-avatar-option' : '';
    moodOption.className = `mood-option ${mood.mood}${customClass}`;
    moodOption.dataset.mood = mood.mood;
    moodOption.dataset.avatar = mood.key;
    moodOption.innerHTML = `
      <div class="mood-avatar"${mood.isCustom && mood.color ? ` style="background-color: ${mood.color};"` : ''}>${mood.emoji}</div>
      <div class="mood-label">${mood.name}</div>
      ${mood.isCustom ? `<button type="button" class="custom-avatar-delete" title="Remove custom avatar">×</button>` : ''}
    `;

    moodOption.addEventListener('click', (e) => {
      if (e.target.closest('.custom-avatar-delete')) return;
      e.preventDefault();
      handleLargeMoodSelect(moodOption, mood.mood, mood.key);
    });

    if (mood.isCustom) {
      const deleteBtn = moodOption.querySelector('.custom-avatar-delete');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (confirm(`Remove custom avatar "${mood.name}"?`)) {
          deleteCustomAvatar(mood.id);
          renderLargeMoodSelector(containerId);
        }
      });
    }

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

// ===== CUSTOM AVATAR MODAL =====
let selectedAnimal = null;
let selectedColor = null;

function renderAnimalPicker() {
  const container = document.getElementById('animal-picker');
  if (!container) return;
  container.innerHTML = '';
  ADDITIONAL_ANIMALS.forEach((animal) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'animal-picker-item' + (selectedAnimal === animal ? ' selected' : '');
    item.textContent = animal;
    item.addEventListener('click', () => {
      selectedAnimal = animal;
      renderAnimalPicker();
    });
    container.appendChild(item);
  });
}

function renderColorPicker() {
  const container = document.getElementById('color-picker');
  if (!container) return;
  container.innerHTML = '';
  COLOR_PALETTE.forEach((color) => {
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'color-picker-item' + (selectedColor === color ? ' selected' : '');
    item.style.backgroundColor = color;
    item.addEventListener('click', () => {
      selectedColor = color;
      renderColorPicker();
    });
    container.appendChild(item);
  });
}

function openAvatarModal() {
  selectedAnimal = null;
  selectedColor = null;
  const nameInput = document.getElementById('custom-avatar-name');
  if (nameInput) nameInput.value = '';
  const overlay = document.getElementById('avatar-modal-overlay');
  if (overlay) {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  renderAnimalPicker();
  renderColorPicker();
}

function closeAvatarModal() {
  const overlay = document.getElementById('avatar-modal-overlay');
  if (overlay) {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function saveNewAvatar() {
  const nameInput = document.getElementById('custom-avatar-name');
  const name = nameInput ? nameInput.value.trim() : '';
  if (!name) {
    if (nameInput) nameInput.focus();
    return;
  }
  if (!selectedAnimal) return;
  if (!selectedColor) return;

  const id = 'custom-' + Date.now();
  const avatar = {
    id,
    key: id,
    name,
    emoji: selectedAnimal,
    color: selectedColor,
    mood: id,
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  const list = getCustomAvatars();
  list.push(avatar);
  persistCustomAvatars(list);

  closeAvatarModal();
  renderLargeMoodSelector('mood-selector-large');
}

let confirmModalCallback = null;

function showConfirmModal(message, onConfirm) {
  const msgEl = document.getElementById('confirm-modal-message');
  if (msgEl) msgEl.textContent = message;
  confirmModalCallback = onConfirm;
  const overlay = document.getElementById('confirm-modal-overlay');
  if (overlay) overlay.classList.add('show');
}

function closeConfirmModal() {
  const overlay = document.getElementById('confirm-modal-overlay');
  if (overlay) overlay.classList.remove('show');
  confirmModalCallback = null;
}

function avatarModalHasInput() {
  const nameInput = document.getElementById('custom-avatar-name');
  const hasName = nameInput && nameInput.value.trim() !== '';
  return hasName || selectedAnimal !== null || selectedColor !== null;
}

function handleCancelAvatar() {
  if (avatarModalHasInput()) {
    showConfirmModal('Discard your new avatar?', closeAvatarModal);
  } else {
    closeAvatarModal();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-avatar-btn');
  const closeBtn = document.getElementById('avatar-modal-close');
  const cancelBtn = document.getElementById('avatar-modal-cancel');
  const saveBtn = document.getElementById('save-avatar-btn');
  const overlay = document.getElementById('avatar-modal-overlay');
  const confirmOverlay = document.getElementById('confirm-modal-overlay');
  const confirmCancelBtn = document.getElementById('confirm-modal-cancel');
  const confirmConfirmBtn = document.getElementById('confirm-modal-confirm');

  if (addBtn) addBtn.addEventListener('click', openAvatarModal);
  if (closeBtn) closeBtn.addEventListener('click', handleCancelAvatar);
  if (cancelBtn) cancelBtn.addEventListener('click', handleCancelAvatar);
  if (saveBtn) saveBtn.addEventListener('click', saveNewAvatar);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) handleCancelAvatar();
    });
  }
  if (confirmCancelBtn) confirmCancelBtn.addEventListener('click', closeConfirmModal);
  if (confirmConfirmBtn) {
    confirmConfirmBtn.addEventListener('click', () => {
      const cb = confirmModalCallback;
      closeConfirmModal();
      if (cb) cb();
    });
  }
  if (confirmOverlay) {
    confirmOverlay.addEventListener('click', (e) => {
      if (e.target === confirmOverlay) closeConfirmModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (confirmOverlay && confirmOverlay.classList.contains('show')) {
        closeConfirmModal();
      } else {
        handleCancelAvatar();
      }
    }
  });
});
