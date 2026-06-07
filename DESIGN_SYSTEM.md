# Journey - Design System

## Color Palette

### Primary Background
- **Cream/Beige**: `#F5F1ED` or `#FAF8F5`
- Use throughout as main background

### Mood Colors (CSS Variables)
```css
:root {
  --color-peaceful: #A8D8A8;    /* Soft Green */
  --color-happy: #FFD166;        /* Warm Yellow */
  --color-excited: #FFB74D;      /* Soft Orange */
  --color-frustrated: #FF6B6B;   /* Gentle Red */
  --color-tired: #D9A5D9;        /* Muted Lavender */
  --color-loved: #C8E6C9;        /* Sage Green */
  --color-sad: #B8B8D8;          /* Soft Mauve */
  --color-grateful: #FFE5B4;     /* Peach */
  
  --text-dark: #5C4033;          /* Dark Brown */
  --text-light: #8B7355;         /* Light Brown */
  --bg-main: #FAF8F5;            /* Cream */
}
```

## Mood-to-Avatar System

### Peaceful (Green #A8D8A8)
- **Avatar**: Owl
- **Traits**: Wise, calm, observant
- **Emoji Alternative**: 🦉
- **Use**: Meditation, rest, reflection days

### Happy (Yellow #FFD166)
- **Avatar**: Fox
- **Traits**: Cheerful, clever, playful
- **Emoji Alternative**: 🦊
- **Use**: Good days, achievements, joy moments

### Excited (Orange #FFB74D)
- **Avatar**: Squirrel
- **Traits**: Energetic, bouncy, curious
- **Emoji Alternative**: 🐿️
- **Use**: Active days, adventures, new experiences

### Frustrated (Red #FF6B6B)
- **Avatar**: Cat
- **Traits**: Expressive, independent, feisty
- **Emoji Alternative**: 🐱
- **Use**: Challenging moments, venting, tough days

### Tired (Lavender #D9A5D9)
- **Avatar**: Sloth
- **Traits**: Cozy, slow, restful
- **Emoji Alternative**: 🦥
- **Use**: Low energy, recovery, self-care days

### Loved (Sage #C8E6C9)
- **Avatar**: Duck
- **Traits**: Warm, connected, gentle
- **Emoji Alternative**: 🦆
- **Use**: Gratitude, relationships, appreciation

### Sad (Mauve #B8B8D8)
- **Avatar**: Lamb
- **Traits**: Gentle, tender, vulnerable
- **Emoji Alternative**: 🐑
- **Use**: Difficult emotions, processing, support

### Grateful (Peach #FFE5B4)
- **Avatar**: Butterfly
- **Traits**: Transforming, beautiful, emerging
- **Emoji Alternative**: 🦋
- **Use**: Growth, gratitude, transformation

## Typography

### Font Recommendations
- **Headings**: Rounded sans-serif
  - Google Fonts: `Fredoka`, `Comfortaa`, or `Nunito`
  - Size: 24px-32px for main headings
  
- **Body Text**: Clean sans-serif
  - Google Fonts: `Inter`, `Open Sans`, or `Poppins`
  - Size: 14px-16px for mobile
  - Line height: 1.6

- **Special**: Hand-drawn or script for accents (sparingly)
  - Example: Daily prompt headers

### Text Colors
- **Primary text**: `--text-dark` (#5C4033)
- **Secondary text**: `--text-light` (#8B7355)
- **On colored backgrounds**: Use dark text for contrast

## Component Styles

### Entry Card
```css
.entry-card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.entry-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
```

### Mood Badge (Circular)
```css
.mood-badge {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--mood-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}
```

### FAB Button
```css
.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-happy);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.fab:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.fab:active {
  transform: scale(0.95);
}
```

### Button
```css
.btn {
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-primary {
  background: var(--color-happy);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 209, 102, 0.3);
}
```

## Spacing Scale
- `4px` - Minimal spacing
- `8px` - Extra small
- `12px` - Small
- `16px` - Medium (standard)
- `24px` - Large
- `32px` - Extra large
- `48px` - Section spacing

## Border Radius
- `8px` - Small elements (buttons)
- `12px` - Medium elements
- `16px` - Cards, containers
- `24px` - Large sections
- `50%` - Circles (avatars, mood badges)

## Shadows
- **Subtle**: `0 2px 8px rgba(0, 0, 0, 0.08)`
- **Medium**: `0 4px 12px rgba(0, 0, 0, 0.12)`
- **Strong**: `0 6px 16px rgba(0, 0, 0, 0.15)`

## Animations

### Transitions
- **Standard**: `all 0.3s ease`
- **Quick**: `0.15s ease`
- **Slow**: `0.5s ease`

### Keyframes
```css
/* Smooth entrance */
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

/* Playful scale */
@keyframes popIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Gentle bounce */
@keyframes gentle-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
```

## Responsive Breakpoints
- **Mobile**: 320px - 480px (primary focus)
- **Tablet**: 481px - 768px
- **Desktop**: 769px+ (graceful degradation)

## Accessibility

### Contrast Ratios
- All text meets WCAG AA (4.5:1 for normal text)
- Interactive elements have high contrast with backgrounds

### Touch Targets
- Minimum: 44x44px
- Preferred: 48x48px+

### Color Accessibility
- Never rely on color alone
- Use icons + text/color combinations
- Provide mood name labels with colored badges

## Dark Mode (Future)
```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-main: #2A2624;
    --text-dark: #E8E4DF;
    --text-light: #B8B8B0;
  }
  
  .entry-card {
    background: #3E3935;
  }
}
```

## File Assets Checklist
- [ ] Animal avatars (8 characters) - SVG or PNG 256x256px
- [ ] Mood color circles - SVG
- [ ] App icon/logo
- [ ] Geometric background shapes (optional)
- [ ] Loading spinner
- [ ] Icons for navigation/actions
- [ ] Decorative elements

## Implementation Tips

### For Developers
1. Use CSS variables for all colors
2. Keep consistent spacing scale
3. Use standardized transitions
4. Test all colors for contrast
5. Ensure touch targets are 44px+
6. Test animations on mobile devices

### For Designers
1. Always reference this system
2. Use the mood-color mappings consistently
3. Follow the border radius scale
4. Maintain the warm, friendly aesthetic
5. Use animals as primary visual identifier (not just color)

---

**Last Updated**: June 2, 2026
**Version**: 1.0
