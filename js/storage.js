/* Journey - Storage System (LocalStorage) */

const STORAGE_KEY = 'journey_entries';
const SETTINGS_KEY = 'journey_settings';

// Initialize storage
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(SETTINGS_KEY)) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({
      theme: 'light',
      notifications: true
    }));
  }
}

// Save entry
function saveEntry(entry) {
  try {
    const entries = getAllEntries();
    
    if (entry.id) {
      // Update existing entry
      const index = entries.findIndex(e => e.id === entry.id);
      if (index !== -1) {
        entries[index] = {
          ...entries[index],
          ...entry,
          updatedAt: new Date().toISOString()
        };
      }
    } else {
      // Create new entry
      const newEntry = {
        id: generateId(),
        ...entry,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      entries.unshift(newEntry);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return entries[0];
  } catch (error) {
    console.error('Error saving entry:', error);
    return null;
  }
}

// Get all entries
function getAllEntries() {
  try {
    const entries = localStorage.getItem(STORAGE_KEY);
    return entries ? JSON.parse(entries) : [];
  } catch (error) {
    console.error('Error retrieving entries:', error);
    return [];
  }
}

// Get entry by ID
function getEntryById(id) {
  try {
    const entries = getAllEntries();
    return entries.find(e => e.id === id) || null;
  } catch (error) {
    console.error('Error retrieving entry:', error);
    return null;
  }
}

// Delete entry
function deleteEntry(id) {
  try {
    const entries = getAllEntries();
    const filtered = entries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting entry:', error);
    return false;
  }
}

// Get entries by date
function getEntriesByDate(date) {
  try {
    const entries = getAllEntries();
    const dateStr = new Date(date).toISOString().split('T')[0];
    return entries.filter(e => e.createdAt.split('T')[0] === dateStr);
  } catch (error) {
    console.error('Error filtering entries:', error);
    return [];
  }
}

// Get entries by mood
function getEntriesByMood(mood) {
  try {
    const entries = getAllEntries();
    return entries.filter(e => e.mood === mood);
  } catch (error) {
    console.error('Error filtering entries:', error);
    return [];
  }
}

// Get entries by category
function getEntriesByCategory(category) {
  try {
    const entries = getAllEntries();
    return entries.filter(e => e.category === category);
  } catch (error) {
    console.error('Error filtering entries:', error);
    return [];
  }
}

// Save settings
function saveSettings(settings) {
  try {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving settings:', error);
    return null;
  }
}

// Get settings
function getSettings() {
  try {
    const settings = localStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : {};
  } catch (error) {
    console.error('Error retrieving settings:', error);
    return {};
  }
}

// Generate unique ID
function generateId() {
  return `entry_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  }
}

// Format time
function formatTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// Get stats
function getStats() {
  try {
    const entries = getAllEntries();
    const moods = {};
    const categories = {};

    entries.forEach(entry => {
      // Count moods
      moods[entry.mood] = (moods[entry.mood] || 0) + 1;
      // Count categories
      categories[entry.category] = (categories[entry.category] || 0) + 1;
    });

    return {
      totalEntries: entries.length,
      moods,
      categories,
      lastEntry: entries[0] ? new Date(entries[0].createdAt) : null
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return {
      totalEntries: 0,
      moods: {},
      categories: {},
      lastEntry: null
    };
  }
}

// Export entries as JSON
function exportEntries() {
  try {
    const entries = getAllEntries();
    const dataStr = JSON.stringify(entries, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `journey_entries_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting entries:', error);
  }
}

// Clear all entries (careful!)
function clearAllEntries() {
  if (confirm('Are you sure you want to delete all entries? This cannot be undone.')) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return true;
    } catch (error) {
      console.error('Error clearing entries:', error);
      return false;
    }
  }
  return false;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initializeStorage);
