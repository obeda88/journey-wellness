/* Journey - Main App */

let allPrompts = [];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  initializePage();
  setupListeners();
  renderFeed();
  displayTodayDate();
  loadPrompts();
});

// Initialize page
function initializePage() {
  renderLargeMoodSelector('mood-selector-large');
  renderMoodSelector('mood-selector');
}

// Setup event listeners
function setupListeners() {
  // FAB button
  const fabBtn = document.getElementById('new-entry-fab');
  if (fabBtn) {
    fabBtn.addEventListener('click', openEntryModal);
  }

  // Menu button
  const menuBtn = document.getElementById('menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => alert('Menu coming soon!'));
  }

  // Skip prompt
  const skipBtn = document.getElementById('skip-prompt');
  if (skipBtn) {
    skipBtn.addEventListener('click', skipPrompt);
  }

  // Save prompt reflection
  const saveBtns = document.querySelectorAll('#save-prompt-btn');
  saveBtns.forEach(btn => {
    btn.addEventListener('click', savePromptReflection);
  });
}

// Display today's date
function displayTodayDate() {
  const dateElement = document.getElementById('today-date');
  if (!dateElement) return;

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  dateElement.textContent = dateStr;
}

// Load prompts
function loadPrompts() {
  if (window.promptsData && window.promptsData.prompts) {
    allPrompts = window.promptsData.prompts;
    displayDailyPrompt();
  }
}

// Display daily prompt
function displayDailyPrompt() {
  if (allPrompts.length === 0) return;

  const today = new Date().toDateString();
  const seed = today.split(' ').reduce((sum, word) => sum + word.charCodeAt(0), 0);
  const promptIndex = Math.abs(seed) % allPrompts.length;
  const dailyPrompt = allPrompts[promptIndex];

  const promptText = document.getElementById('daily-prompt');
  if (promptText) {
    promptText.textContent = dailyPrompt.text;
  }
}

// Skip prompt
function skipPrompt(e) {
  e.preventDefault();
  const promptSection = e.target.closest('.prompt-section');
  if (promptSection) {
    promptSection.style.display = 'none';
  }
}

// Save prompt reflection
function savePromptReflection(e) {
  e.preventDefault();
  const textarea = document.getElementById('prompt-answer');
  const answer = textarea.value.trim();

  if (!answer) {
    alert('Please write something');
    return;
  }

  // Save as entry
  const entry = {
    mood: 'peaceful',
    avatar: 'owl',
    category: 'reflection',
    content: answer,
    prompt: document.getElementById('daily-prompt').textContent,
    tags: ['reflection', 'prompt'],
    photos: [],
    isDraft: false,
    isFavorite: false
  };

  const savedEntry = saveEntry(entry);
  if (savedEntry) {
    textarea.value = '';
    alert('Reflection saved!');
    renderFeed();
  }
}

// Open entry modal (now redirect to entry page)
function openEntryModal() {
  handleWriteJournalClick();
}

// Handle write journal click
function handleWriteJournalClick() {
  const todayEntries = getEntriesByDate(new Date());
  if (todayEntries.length > 0) {
    alert('You have already written a journal entry today! Please come back tomorrow or delete your existing entry from the feed.');
  } else {
    window.location.href = 'journal-entry.html';
  }
}

// Render journal feed
function renderFeed() {
  const entryList = document.getElementById('entry-list');
  if (!entryList) return;

  const entries = getAllEntries();

  if (entries.length === 0) {
    entryList.innerHTML = '<p class="empty-state">No entries yet. Start journaling to see them here!</p>';
    return;
  }

  entryList.innerHTML = '';

  entries.forEach((entry, index) => {
    const card = createEntryCard(entry);
    card.style.animation = `slideIn 0.3s ease-out ${index * 50}ms forwards`;
    card.style.opacity = '0';
    entryList.appendChild(card);
  });
}

// Create entry card
function createEntryCard(entry) {
  const card = document.createElement('div');
  card.className = 'card entry-card';
  card.dataset.entryId = entry.id;

  // Get avatar
  const avatarData = getAvatarByMood(entry.mood);
  const avatarEmoji = avatarData ? avatarData.emoji : '✨';
  const avatarColor = getMoodColor(entry.mood);

  // Format date
  const createdDate = formatDate(entry.createdAt);
  const createdTime = formatTime(entry.createdAt);

  // Truncate content
  const preview = entry.content.substring(0, 100) + (entry.content.length > 100 ? '...' : '');

  // Get category label
  const categoryLabel = entry.category.charAt(0).toUpperCase() + entry.category.slice(1);

  // Build photos HTML
  let photosHTML = '';
  if (entry.photos && entry.photos.length > 0) {
    photosHTML = '<div class="entry-photos">';
    entry.photos.slice(0, 3).forEach(photo => {
      photosHTML += `
        <div class="entry-photo-thumb">
          <img src="${photo.data}" alt="Entry photo">
        </div>
      `;
    });
    if (entry.photos.length > 3) {
      photosHTML += `<div class="entry-photo-thumb" style="display: flex; align-items: center; justify-content: center; background-color: rgba(92, 64, 51, 0.1); font-weight: bold; color: var(--text-dark);">+${entry.photos.length - 3}</div>`;
    }
    photosHTML += '</div>';
  }

  // Build tags HTML
  let tagsHTML = '';
  if (entry.tags && entry.tags.length > 0) {
    tagsHTML = '<div class="entry-tags">';
    entry.tags.forEach(tag => {
      tagsHTML += `<div class="entry-tag">#${tag}</div>`;
    });
    tagsHTML += '</div>';
  }

  card.innerHTML = `
    <div class="entry-avatar-badge" style="background-color: ${avatarColor};">
      ${avatarEmoji}
    </div>
    <div class="entry-body">
      <div class="entry-meta">
        <span class="entry-date">${createdDate}</span>
        <span class="entry-time">${createdTime}</span>
        <span class="entry-category">${categoryLabel}</span>
      </div>
      <div class="entry-preview">${escapeHtml(preview)}</div>
      ${photosHTML}
      ${tagsHTML}
      <div style="display: flex; gap: 8px; margin-top: 12px;">
        <button class="btn-small" onclick="viewEntry('${entry.id}')">Read More</button>
        <button class="btn-small" onclick="toggleFavorite('${entry.id}')" style="color: ${entry.isFavorite ? 'var(--color-frustrated)' : 'var(--text-light)'};">
          ${entry.isFavorite ? '❤️' : '🤍'}
        </button>
        <button class="btn-small" onclick="deleteEntryHandler('${entry.id}')" style="color: var(--color-accent); border: 1px solid var(--color-accent); background: transparent;">🗑️ Delete</button>
      </div>
    </div>
  `;

  return card;
}

// View entry
function viewEntry(entryId) {
  const entry = getEntryById(entryId);
  if (!entry) return;

  // Create modal or navigate to detail page
  // For now, just alert
  alert(`Entry from ${formatDate(entry.createdAt)}\n\n${entry.content.substring(0, 200)}...`);
}

// Toggle favorite
function toggleFavorite(entryId) {
  const entry = getEntryById(entryId);
  if (!entry) return;

  entry.isFavorite = !entry.isFavorite;
  saveEntry(entry);
  renderFeed();
}

// Delete entry handler
function deleteEntryHandler(entryId) {
  if (confirm('Are you sure you want to delete this entry?')) {
    deleteEntry(entryId);
    renderFeed();
  }
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Handle mood selection from quick check
document.addEventListener('click', function(e) {
  if (e.target.closest('.mood-option')) {
    const btn = e.target.closest('.mood-option');
    const mood = btn.dataset.mood;
    const avatar = btn.dataset.avatar;
    
    // Highlight selection
    const selector = btn.parentElement;
    selector.querySelectorAll('.mood-option').forEach(opt => opt.classList.remove('selected'));
    btn.classList.add('selected');
    
    console.log('Selected mood:', mood, 'Avatar:', avatar);
  }
});

// Add sort functionality
document.addEventListener('DOMContentLoaded', function() {
  const sortBtn = document.getElementById('sort-btn');
  if (sortBtn) {
    sortBtn.addEventListener('click', function() {
      // Toggle sort order (oldest to newest or vice versa)
      const entries = getAllEntries();
      entries.reverse();
      localStorage.setItem('journey_entries', JSON.stringify(entries));
      renderFeed();
    });
  }
});

// Add animations to CSS
const style = document.createElement('style');
style.innerHTML = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .entry-body {
    flex: 1;
    min-width: 0;
  }
`;
document.head.appendChild(style);
