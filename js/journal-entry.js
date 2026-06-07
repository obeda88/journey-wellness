/* Journey - Journal Entry Form */

let currentPrompt = null;
let selectedPhotos = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  initializeForm();
  loadPrompt();
  renderLargeMoodSelector('mood-selector-large');
  setupPhotoUpload();
  setupFormHandlers();
  setupTagsInput();
  updateBackButton();
});

// Initialize form
function initializeForm() {
  const form = document.getElementById('entry-form');
  if (!form) return;

  // Set today's date
  const todayDate = new Date();
  const dateDisplay = todayDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  const dateElement = document.querySelector('.header-subtitle');
  if (dateElement) {
    dateElement.textContent = dateDisplay;
  }
}

// Load and display prompt
function loadPrompt() {
  if (!window.promptsData || !window.promptsData.prompts) {
    console.error('Prompts data not loaded');
    return;
  }

  const prompts = window.promptsData.prompts;
  const randomIndex = Math.floor(Math.random() * prompts.length);
  currentPrompt = prompts[randomIndex];

  const promptDisplay = document.getElementById('entry-prompt-display');
  if (promptDisplay) {
    promptDisplay.textContent = currentPrompt.text;
  }
}

// Get another prompt
document.addEventListener('DOMContentLoaded', function() {
  const newPromptBtn = document.getElementById('new-prompt-btn');
  if (newPromptBtn) {
    newPromptBtn.addEventListener('click', function(e) {
      e.preventDefault();
      loadPrompt();
      document.getElementById('entry-prompt-display').style.animation = 'fadeIn 0.3s ease-out';
    });
  }
});

// Setup photo upload
function setupPhotoUpload() {
  const fileInput = document.getElementById('entry-photos');
  const uploadArea = document.querySelector('.upload-area');
  
  if (!fileInput) return;

  // Handle file selection
  fileInput.addEventListener('change', handlePhotoSelect);

  // Drag and drop
  if (uploadArea) {
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('drag-over');
      
      const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
      fileInput.files = e.dataTransfer.items ? Array.from(e.dataTransfer.items)
        .filter(item => item.kind === 'file' && item.type.startsWith('image/'))
        .map(item => item.getAsFile()) : files;
      
      handlePhotoSelect({ target: { files: fileInput.files } });
    });
  }
}

// Handle photo selection
function handlePhotoSelect(event) {
  const files = Array.from(event.target.files);
  
  files.forEach(file => {
    if (file.type.startsWith('image/') && file.size < 10 * 1024 * 1024) { // 10MB limit
      const reader = new FileReader();
      
      reader.onload = function(e) {
        selectedPhotos.push({
          id: Date.now() + Math.random(),
          data: e.target.result,
          name: file.name
        });
        displayPhotoPreview();
      };
      
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image (max 10MB)');
    }
  });
}

// Display photo preview
function displayPhotoPreview() {
  const preview = document.getElementById('photo-preview');
  if (!preview) return;

  preview.innerHTML = '';
  
  selectedPhotos.forEach(photo => {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item animate-pop-in';
    photoItem.innerHTML = `
      <img src="${photo.data}" alt="${photo.name}">
      <button type="button" class="photo-remove" title="Remove photo">×</button>
    `;

    const removeBtn = photoItem.querySelector('.photo-remove');
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      selectedPhotos = selectedPhotos.filter(p => p.id !== photo.id);
      displayPhotoPreview();
    });

    preview.appendChild(photoItem);
  });
}

// Setup form handlers
function setupFormHandlers() {
  const form = document.getElementById('entry-form');
  if (!form) return;

  // Submit form
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    submitEntry();
  });

  // Save as draft
  const draftBtn = document.getElementById('save-draft-btn');
  if (draftBtn) {
    draftBtn.addEventListener('click', function(e) {
      e.preventDefault();
      submitEntry(true);
    });
  }
}

// Submit entry
function submitEntry(isDraft = false) {
  const mood = document.getElementById('selected-mood').value;
  const avatar = document.getElementById('selected-avatar').value;
  const content = document.getElementById('entry-content').value.trim();
  const category = document.getElementById('entry-category').value;
  const tags = getTags();

  // Validation
  if (!mood) {
    alert('Please select a mood');
    return;
  }

  if (!content) {
    alert('Please write something');
    return;
  }

  // Check if entry already exists for today
  if (!isDraft) {
    const todayEntries = getEntriesByDate(new Date());
    if (todayEntries.length > 0) {
      alert('You have already written a journal entry today! You can only post one entry per day.');
      return;
    }
  }

  const entry = {
    mood,
    avatar,
    category,
    content,
    prompt: currentPrompt ? currentPrompt.text : '',
    tags,
    photos: selectedPhotos,
    isDraft,
    isFavorite: false
  };

  // Save entry
  const savedEntry = saveEntry(entry);

  if (savedEntry) {
    showNotification(isDraft ? 'Draft saved!' : 'Entry saved!');
    setTimeout(() => {
      window.location.href = 'journey-dashboard.html';
    }, 1500);
  } else {
    alert('Error saving entry. Please try again.');
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification animate-slide-in';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 24px;
    left: 24px;
    right: 24px;
    background-color: var(--color-happy);
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 600;
    z-index: 1000;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => notification.remove(), 300);
  }, 2500);
}

// Setup tags input
function setupTagsInput() {
  const tagsInput = document.getElementById('entry-tags');
  if (!tagsInput) return;

  tagsInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(this.value.trim());
      this.value = '';
    }
  });

  tagsInput.addEventListener('blur', function() {
    const tags = this.value.split(',').filter(t => t.trim());
    tags.forEach(tag => addTag(tag.trim()));
    this.value = '';
  });
}

// Add tag
function addTag(tagText) {
  if (!tagText) return;

  const tagsList = document.getElementById('tags-list');
  if (!tagsList) return;

  // Check if tag already exists
  const existingTags = Array.from(tagsList.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase());
  if (existingTags.includes(tagText.toLowerCase())) return;

  const tag = document.createElement('div');
  tag.className = 'tag animate-pop-in';
  tag.innerHTML = `
    ${tagText}
    <span class="tag-remove">×</span>
  `;

  const removeBtn = tag.querySelector('.tag-remove');
  removeBtn.addEventListener('click', () => tag.remove());

  tagsList.appendChild(tag);
}

// Get tags
function getTags() {
  const tagsList = document.getElementById('tags-list');
  if (!tagsList) return [];

  return Array.from(tagsList.querySelectorAll('.tag'))
    .map(tag => tag.textContent.replace('×', '').trim());
}

// Update back button
function updateBackButton() {
  const backBtn = document.querySelector('.btn-back');
  if (backBtn) {
    backBtn.href = 'journey-dashboard.html';
  }
}

// Add animation keyframes
const style = document.createElement('style');
style.innerHTML = `
  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(20px);
    }
  }
`;
document.head.appendChild(style);
