# Journey - Digital Journal App

A cute, simple mobile-first digital journal application designed to help users reflect, feel, and heal on their own terms.

## Features Implemented

### 1. Journaling Prompts with Answer Spaces ✅
- **Daily prompts**: 30 unique reflective questions that rotate daily
- **Quick reflection**: Answer prompts directly on the homepage
- **Entry prompts**: Each journal entry shows the prompt it was written for
- **Prompt rotation**: Get a new prompt with the "Get another prompt" button

**Example Prompts:**
- "How are you feeling today?"
- "What are you grateful for?"
- "Describe your ideal day"
- "Write about a memory that brings you comfort"

### 2. Animal Avatars ✅
- **8 unique mood-based avatars**:
  - 🦉 **Peaceful** (Owl) - Green #A8D8A8
  - 🦊 **Happy** (Fox) - Yellow #FFD166
  - 🐿️ **Excited** (Squirrel) - Orange #FFB74D
  - 🐱 **Frustrated** (Cat) - Red #FF6B6B
  - 🦥 **Tired** (Sloth) - Lavender #D9A5D9
  - 🦆 **Loved** (Duck) - Sage Green #C8E6C9
  - 🐑 **Sad** (Lamb) - Mauve #B8B8D8
  - 🦋 **Grateful** (Butterfly) - Peach #FFE5B4

- **Color-coded moods**: Each mood has its own color badge
- **Avatar selection**: Choose your mood when creating an entry
- **Visual identification**: Avatars appear on each journal entry card for quick mood recognition

### 3. Photo Upload Space ✅
- **Drag & drop upload**: Drag images directly onto the upload area
- **Multi-photo support**: Add multiple photos per entry
- **Photo preview**: See thumbnails of all uploaded photos
- **Photo removal**: Remove unwanted photos before saving
- **Size limit**: 10MB max per photo for optimal performance
- **Format support**: All common image formats (JPG, PNG, GIF, WebP)
- **Entry cards display**: Photos show as thumbnails on journal entry cards

## File Structure

```
journey-journal/
├── index.html              # Main journal feed page
├── journal-entry.html      # New entry creation page
├── css/
│   ├── design-system.css   # Design variables & base components
│   └── journal.css         # Journal-specific styles
├── js/
│   ├── app.js              # Main app logic (feed page)
│   ├── journal-entry.js    # Entry form logic
│   ├── avatars.js          # Avatar system & rendering
│   ├── storage.js          # LocalStorage management
│   └── ui.js               # UI components & helpers
├── data/
│   ├── moods.json          # Mood-to-avatar mappings
│   ├── prompts.json        # Daily prompts library
│   └── colors.json         # Color palette definitions
└── assets/
    ├── avatars/            # Avatar image files
    ├── icons/              # UI icons
    └── illustrations/      # Decorative elements
```

## How to Use

### Creating a New Entry

1. **Open the app** → Click the ✏️ floating action button
2. **Select your mood** → Choose an animal avatar that matches your feeling
3. **Read the prompt** → See today's reflection question
4. **Write your entry** → Express your thoughts (no right or wrong answers)
5. **Add category** → Tag your entry (Reflection, Gratitude, Creative, etc.)
6. **Upload photos** (optional) → Drag & drop images or click to browse
7. **Add tags** (optional) → Help organize your memories
8. **Save entry** → Your entry is saved locally to your browser

### Viewing Your Journal

- **Main feed**: See all your entries with mood avatars and photo thumbnails
- **Entry details**: Click "Read More" to view the full entry
- **Quick mood check**: See how you've been feeling on the sidebar
- **Daily prompt**: Answer today's reflection question on the homepage
- **Favorites**: Mark entries as favorites with the heart button
- **Sort**: Click "Sort" to reverse the entry order

### Data Storage

- **All entries stored locally** in your browser's LocalStorage
- **No account needed** - Everything is private and stays on your device
- **Export available** - Export all entries as JSON for backup
- **Persistent** - Entries remain even after closing the browser

## Design System

### Color Palette
```css
--color-peaceful: #A8D8A8;    /* Soft Green */
--color-happy: #FFD166;        /* Warm Yellow */
--color-excited: #FFB74D;      /* Soft Orange */
--color-frustrated: #FF6B6B;   /* Gentle Red */
--color-tired: #D9A5D9;        /* Muted Lavender */
--color-loved: #C8E6C9;        /* Sage Green */
--color-sad: #B8B8D8;          /* Soft Mauve */
--color-grateful: #FFE5B4;     /* Peach */
--color-bg-main: #FAF8F5;      /* Cream Background */
```

### Typography
- **Headings**: Fredoka, Comfortaa, or Nunito (rounded, friendly)
- **Body**: Inter, Open Sans, or Poppins (clean, readable)

### Spacing Scale
- `4px` - Minimal
- `8px` - Extra small
- `12px` - Small
- `16px` - Medium (default)
- `24px` - Large
- `32px` - Extra large
- `48px` - Section spacing

## Key JavaScript Files

### storage.js
Handles all data persistence:
```javascript
saveEntry(entry)           // Save new or update existing
getAllEntries()            // Get all journal entries
getEntryById(id)           // Get specific entry
deleteEntry(id)            // Remove an entry
getEntriesByMood(mood)     // Filter by mood
getEntriesByCategory(cat)  // Filter by category
exportEntries()            // Export as JSON
```

### avatars.js
Manages the avatar system:
```javascript
renderMoodSelector(id)           // Create mood selector grid
renderLargeMoodSelector(id)      // Create large mood selector
getAvatarByMood(mood)           // Get avatar details
getAllMoodsWithAvatars()        // Get all mood-avatar pairs
getMoodColor(mood)              // Get color for mood
```

### app.js
Main feed page logic:
```javascript
renderFeed()                     // Display all entries
createEntryCard(entry)          // Format entry as card
viewEntry(entryId)              // Open entry details
toggleFavorite(entryId)         // Mark/unmark favorite
```

### journal-entry.js
Entry creation form logic:
```javascript
loadPrompt()                     // Get daily prompt
handlePhotoSelect(event)        // Process photo upload
submitEntry(isDraft)            // Save entry to storage
displayPhotoPreview()           // Show photo thumbnails
getTags()                       // Extract tags from form
```

## Customization

### Add More Moods
1. Edit `data/moods.json` to add new mood entries
2. Update `avatars.js` `AVATAR_SYSTEM` object
3. Add mood color to CSS variables in `css/design-system.css`

### Change Color Theme
Edit `css/design-system.css`:
```css
:root {
  --color-peaceful: #YOUR_COLOR;
  /* ... update other colors */
}
```

### Add More Prompts
1. Edit `data/prompts.json`
2. Add new prompt objects with `id` and `text` fields
3. Prompts rotate daily based on date

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Design

- **Mobile First**: Optimized for 320px - 480px
- **Tablet**: 481px - 768px layout
- **Desktop**: 769px+ graceful degradation

## Accessibility

- ✓ High contrast text (WCAG AA)
- ✓ Touch targets 44px minimum
- ✓ Keyboard navigation support
- ✓ ARIA labels and semantic HTML
- ✓ Color + icons (not color alone)

## Privacy & Security

- **No server**: Everything stays in your browser
- **No tracking**: No analytics or data collection
- **Local storage**: Use browser's built-in storage
- **Export anytime**: Download all your data as JSON

## Future Enhancements

- [ ] Mood analytics & charts
- [ ] Weekly insights & stats
- [ ] Dark mode toggle
- [ ] Cloud sync (optional)
- [ ] Share entries (export to social)
- [ ] Reminders & notifications
- [ ] Search functionality
- [ ] Multi-device sync

## Tips for Best Experience

1. **Pick a mood honestly** - Your mood isn't wrong, just human
2. **Answer the prompt** - It helps you reflect more deeply
3. **Add photos** - Visual memories enhance your journal
4. **Tag consistently** - Makes organizing easier later
5. **Come back regularly** - Daily journaling deepens self-awareness
6. **Export regularly** - Backup your entries as JSON

## Support & Feedback

Journey is designed to be your safe space for reflection. If you have suggestions or encounter issues:

1. Check the console for error messages
2. Clear LocalStorage if entries disappear
3. Backup your data regularly using export

---

**Remember**: "Because self-care shouldn't feel like another task."

Start your Journey today! ✨
