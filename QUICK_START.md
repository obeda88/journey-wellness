# Journey - Quick Start Guide

## Getting Started

### 1. Open the App
Simply open `index.html` in your browser:
```
file:///path/to/journey/index.html
```

Or serve locally with a simple HTTP server:
```bash
# Python 3
python -m http.server 8000

# Node.js (with http-server)
npx http-server

# Then visit: http://localhost:8000
```

### 2. Create Your First Entry
1. Click the ✏️ **floating button** (bottom right)
2. You'll be taken to the entry creation page
3. **Select a mood** - Choose the animal avatar that matches how you feel
4. **Read the prompt** - Today's reflection question appears automatically
5. **Write your entry** - Share your thoughts, feelings, and experiences
6. **Add a photo** (optional) - Drag & drop or click to upload images
7. **Add tags** (optional) - Help organize your memories (e.g., #family, #work)
8. **Choose category** - Select from Reflection, Gratitude, Creative, etc.
9. **Save** - Your entry is saved instantly to your browser

### 3. Answer Daily Prompts
On the home page:
1. See "Today's Reflection" section
2. Read the prompt question
3. Write your answer in the text box
4. Click "Save Reflection"

### 4. View Your Entries
- **Main feed** shows all entries with:
  - Animal avatar for mood
  - Entry date and time
  - Category tag
  - Entry preview (first 100 characters)
  - Photo thumbnails
  - Entry tags
- Click **"Read More"** to view the full entry
- Click **heart** to mark as favorite

### 5. Check Your Mood
- **Quick mood check** sidebar shows all 8 moods
- Click to see how many entries you have for each mood
- Visual way to track your emotional patterns

## Entry Structure

Each entry contains:
```
Date & Time        (e.g., "Today at 2:30 PM")
Mood & Avatar      (🦉 Peaceful, 🦊 Happy, etc.)
Category          (Reflection, Gratitude, etc.)
Content           (Your full journal text)
Prompt           (The question that inspired it)
Photos           (Up to 10MB each, unlimited quantity)
Tags             (Custom keywords for organization)
```

## Animal Avatars Reference

| Mood | Avatar | Color | Use Case |
|------|--------|-------|----------|
| Peaceful | 🦉 Owl | Green | Calm, meditative, reflective days |
| Happy | 🦊 Fox | Yellow | Good days, joyful moments |
| Excited | 🐿️ Squirrel | Orange | Energetic, adventurous feelings |
| Frustrated | 🐱 Cat | Red | Challenging moments, venting |
| Tired | 🦥 Sloth | Lavender | Low energy, rest days |
| Loved | 🦆 Duck | Sage | Appreciation, gratitude, connection |
| Sad | 🐑 Lamb | Mauve | Processing difficult emotions |
| Grateful | 🦋 Butterfly | Peach | Growth, transformation, healing |

## Daily Prompts (Examples)

Journey includes 30 rotating prompts:
- "How are you feeling today?"
- "What are you grateful for?"
- "Describe your ideal day"
- "What does self-care look like for you?"
- "Write about a memory that brings you comfort"
- "What are your hopes for tomorrow?"
- "Describe something beautiful you noticed"

Get a new prompt anytime with **"Get another prompt"** button.

## Photo Upload Tips

### How to Add Photos
1. **Drag & drop**: Drag images directly onto the upload area
2. **Click to browse**: Click the upload area to select files
3. **Multiple photos**: Add as many photos as you want
4. **Preview**: See all photos before saving
5. **Remove**: Click the **×** button on any photo to remove

### Photo Support
- **Formats**: JPG, PNG, GIF, WebP, etc.
- **Size**: Up to 10MB per photo
- **Storage**: Photos are embedded in your entries (stored locally)
- **Display**: Show as thumbnails on entry cards

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Escape` | Close entry modal |
| `Tab` | Navigate form elements |
| `Enter` | Submit form (when on button) |
| `Ctrl/Cmd + S` | Quick save (future feature) |

## Data Management

### Your Privacy
- All data stored **locally in your browser**
- No server, no cloud, no tracking
- Data never leaves your device
- You have complete control

### Backup Your Entries
Future export feature will allow you to:
1. Download all entries as JSON
2. Import them on another device
3. Keep a personal backup

### Clear Data
To start fresh (careful!):
1. Open browser DevTools (F12)
2. Go to Application → LocalStorage
3. Find `journey_entries`
4. Delete the entry

## Customization

### Change Colors
Edit `css/design-system.css`:
```css
--color-happy: #FFD166;  /* Change to your color */
```

### Add More Prompts
Edit `data/prompts.json` and add:
```json
{
  "id": 31,
  "text": "Your new prompt question here?"
}
```

### Modify Categories
Edit `journal-entry.html` and update the select options:
```html
<option value="my-category">My Category</option>
```

## Troubleshooting

### Entries Not Saving?
- Check if LocalStorage is enabled
- Try a different browser
- Clear browser cache and try again

### Photos Not Showing?
- Check file size (max 10MB)
- Try a different image format
- Ensure JavaScript is enabled

### App Running Slow?
- Check if you have many entries
- Clear old entries you don't need
- Try a different browser

### Can't Find My Entries?
- Check the sort order (click "Sort" button)
- Use filters by mood or category
- Check browser's LocalStorage isn't disabled

## File Organization

```
index.html              - Main journal feed page
journal-entry.html      - Entry creation page
css/
  ├── design-system.css - Core styling
  └── journal.css       - Journal styles
js/
  ├── app.js            - Feed logic
  ├── journal-entry.js  - Entry form logic
  ├── avatars.js        - Avatar system
  ├── storage.js        - Data management
  └── ui.js             - UI helpers
data/
  ├── moods.json        - Mood definitions
  ├── prompts.json      - Journal prompts
  └── colors.json       - Color palette
```

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Mobile Safari | ✅ Full |
| Chrome Mobile | ✅ Full |

## Tips for Best Results

1. **Journal daily** - Makes a bigger impact over time
2. **Be honest** - No judgment, just expression
3. **Use photos** - Visual memories enhance reflection
4. **Answer prompts** - They guide deeper thinking
5. **Add tags** - Helps you find memories later
6. **Review past entries** - See how you've grown
7. **Enjoy the process** - Self-care shouldn't be a task

## FAQ

**Q: Where is my data stored?**
A: In your browser's LocalStorage. Everything stays on your device.

**Q: Can I access entries from another computer?**
A: Not yet, but you can export and import in the future.

**Q: How many entries can I save?**
A: Depends on browser storage (~5-10MB limit). Thousands of text entries fit easily.

**Q: Can I sync across devices?**
A: Not currently, but it's a planned feature.

**Q: Are my entries secure?**
A: As secure as your computer. Since it's local, no one can hack it remotely.

**Q: What if I delete an entry by mistake?**
A: The app will ask for confirmation. If deleted, you'll need to export a backup first.

## Version Info

- **Version**: 1.0
- **Last Updated**: June 2, 2026
- **Status**: MVP Complete - All 3 features implemented

---

## Next Steps

1. **Start journaling** - Create your first entry!
2. **Explore moods** - Try different avatars
3. **Upload photos** - Add visual memories
4. **Answer prompts** - Engage with daily questions
5. **Review patterns** - See your mood trends

**Remember**: Your journal is a safe space. There's no right or wrong way to express yourself.

Let's start your Journey! 🌸
