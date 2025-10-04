# Misinformation Detector - Design Guidelines

## Design Approach

**Selected Approach:** Design System - Material Design 3 principles with productivity tool refinements
**Justification:** As a utility-focused fact-checking tool requiring trust, clarity, and information density, we'll adapt Material Design's elevation system and component patterns while drawing inspiration from professional analysis tools like Grammarly and productivity apps like Notion for data-heavy sections.

**Core Design Principles:**
- Trust through transparency: Clear visual hierarchy showing confidence levels and sources
- Efficiency first: Quick-scan verdicts with progressive disclosure of details
- Professional credibility: Restrained color use, systematic spacing, readable typography

---

## Core Design Elements

### A. Color Palette

**Light Mode:**
- **Primary Brand:** 217 91% 60% (Trust Blue - analysis actions, key CTAs)
- **Background:** 0 0% 98% (Neutral canvas)
- **Surface:** 0 0% 100% (Cards, containers)
- **Success (Safe Verdict):** 142 71% 45% (Forest Green)
- **Warning (Caution):** 38 92% 50% (Amber Alert)
- **Danger (False):** 0 72% 51% (Critical Red)
- **Neutral (Unverified):** 215 14% 34% (Slate Gray)
- **Text Primary:** 222 47% 11% (Deep Navy)
- **Text Secondary:** 215 14% 34% (Muted Slate)

**Dark Mode:**
- **Primary Brand:** 217 91% 70% (Lighter Trust Blue)
- **Background:** 222 47% 11% (Deep Navy)
- **Surface:** 217 33% 17% (Elevated Navy)
- **Surface Elevated:** 217 33% 21% (Cards/Modals)
- **Success:** 142 71% 55%
- **Warning:** 38 92% 60%
- **Danger:** 0 72% 61%
- **Text Primary:** 0 0% 98%
- **Text Secondary:** 217 20% 70%

**Accent Colors (Minimal Use):**
- **Info Highlight:** 199 89% 48% (Cyan - for tips, info badges)
- **Premium Feature:** 271 76% 53% (Purple - for advanced analysis features)

### B. Typography

**Font Families:**
- **Primary:** Inter (400, 500, 600, 700) - body text, UI elements
- **Display/Headers:** Inter (700, 800) - large headings, verdict displays
- **Monospace:** 'JetBrains Mono' or 'Roboto Mono' - for claim IDs, technical data

**Type Scale:**
- **Hero/Display:** text-5xl to text-6xl, font-bold (Verdict, Main Title)
- **Section Headers:** text-2xl to text-3xl, font-semibold
- **Card Titles:** text-lg, font-semibold
- **Body Text:** text-base, font-normal (leading-relaxed for readability)
- **Captions/Meta:** text-sm, font-medium
- **Labels:** text-xs, font-medium, uppercase, tracking-wider

### C. Layout System

**Spacing Primitives:** Use Tailwind units of **2, 4, 6, 8, 12, 16, 24** for consistent rhythm
- **Micro spacing:** gap-2, p-2 (tight element grouping)
- **Standard spacing:** p-4, gap-4, mb-6 (most common use)
- **Section spacing:** py-8, py-12 (between major sections)
- **Page margins:** p-6 to p-8 on mobile, p-12 to p-16 on desktop

**Container Widths:**
- **Main App Container:** max-w-7xl (analysis dashboard, batch view)
- **Single Analysis View:** max-w-4xl (focused claim analysis)
- **Settings/Forms:** max-w-2xl (narrow for readability)

**Grid Patterns:**
- **Results Dashboard:** 3-column grid on desktop (lg:grid-cols-3), 2-col tablet (md:grid-cols-2), 1-col mobile
- **History List:** Single column with alternating background for scan-ability
- **Feature Cards:** 2-column layout (md:grid-cols-2) for comparison features

### D. Component Library

**Navigation:**
- **Top Bar:** Fixed header with app logo, main navigation tabs (Analyze, History, Batch, Settings), dark mode toggle
- **Tab Navigation:** Underline active state with 3px border-b in primary color
- **Breadcrumbs:** For navigating between analysis details and lists

**Cards & Containers:**
- **Analysis Card:** Elevated shadow (shadow-lg), rounded-xl, border-l-4 with verdict color
- **Verdict Display:** Large card with gradient background matching verdict severity, rounded-2xl, shadow-2xl
- **Source Card:** Clean white background, subtle border, hover:shadow-md transition
- **History Item:** List-style card with left verdict indicator strip, hover:bg-surface-hover

**Forms & Inputs:**
- **Text Area:** Large, rounded-lg, border-2 on focus with ring-4 ring-primary/20
- **Toggle Switches:** Material-style with sliding animation for dark mode, settings
- **Dropdowns:** Custom styled with chevron icon, rounded-lg, shadow on open
- **File Upload (Batch):** Drag-drop zone with dashed border, icon center, hover state

**Data Displays:**
- **Confidence Meter:** Horizontal progress bar with percentage label, color-coded by level
- **Source Credibility Badge:** Pill-shaped with icon (shield/checkmark), colored by trust level
- **Statistic Cards:** Large number display, small label below, optional trend indicator
- **Timeline View:** Vertical line with nodes for claim checking history

**Buttons:**
- **Primary CTA:** bg-primary, text-white, px-6 py-3, rounded-lg, shadow-md, hover:shadow-lg transform hover:scale-[1.02]
- **Secondary:** bg-surface, border-2 border-gray-300, hover:border-primary
- **Danger/Delete:** bg-red-600, hover:bg-red-700
- **Icon Buttons:** p-2, rounded-full, hover:bg-gray-100 dark:hover:bg-gray-800

**Modals & Overlays:**
- **Modal Container:** max-w-2xl, rounded-2xl, shadow-2xl, backdrop-blur-sm background
- **Share Dialog:** Centered modal with shareable link, social icons, copy button
- **Confirmation Dialog:** Smaller max-w-md, action buttons at bottom

### E. Animations & Interactions

**Verdict Reveal (Key Moment):**
- Fade-in with scale animation (animate-in from 0.9 to 1.0 scale)
- Pulse-once effect on verdict badge
- Stagger reasoning text appearance (200ms delay)

**Micro-interactions:**
- Button hover: subtle scale transform (1.02), shadow elevation
- Card hover: shadow transition from shadow-md to shadow-lg
- Toggle switches: smooth 200ms slide transition
- Tab switches: 150ms ease-in-out with underline sliding
- Copy button: check icon replacement on success (500ms)

**Loading States:**
- Progress tracker with animated spinner
- Skeleton screens for claim cards while loading history
- Step-by-step analysis visualization (optional): "Analyzing claim → Checking sources → Calculating verdict"

**Page Transitions:**
- Fade between main views (300ms)
- Slide-in for modals and drawers (250ms ease-out)

---

## Feature-Specific Design Patterns

**Batch Analysis View:**
- Grid of claim cards with mini-verdict indicators
- Bulk actions toolbar (select all, export, delete selected)
- Upload interface: prominent drop zone with example format shown

**History Dashboard:**
- Searchable list with filters sidebar (verdict type, date range, impact level)
- Export button (CSV/PDF) in toolbar
- Sortable columns: Date, Claim Preview, Verdict, Confidence Score

**Source Credibility Panel:**
- Accordion-style expansion for each cited source
- Domain trust score with visual indicator (1-5 stars or percentage bar)
- Quick link to source with external icon

**Share Results Feature:**
- Generated shareable URL with preview card
- Social sharing buttons (Twitter, Facebook, Email, Copy Link)
- Optional: QR code generation for easy mobile sharing

**Dark Mode Implementation:**
- Toggle in header (sun/moon icon)
- Persist preference in localStorage
- Smooth transition using CSS variables (300ms)
- Maintain verdict color visibility with adjusted luminosity

---

## Images & Visual Assets

**Hero Section Image:** No large hero image needed - this is a utility app. Use a clean illustrated icon or 3D graphic of a magnifying glass over text/shield as header visual (max 200px height)

**In-App Graphics:**
- **Empty States:** Friendly illustrations for "No history yet", "Upload claims for batch analysis"
- **Verdict Icons:** Custom SVG icons for each verdict type (checkmark shield for safe, warning triangle for caution, X shield for danger, question mark for neutral)
- **Source Logos:** Small favicon-style logos for recognized news domains (if available via API)
- **Loading Animation:** Animated scanning graphic or document-checking illustration

**Icon Library:** Heroicons (outline for navigation, solid for status indicators)

---

## Accessibility & Responsiveness

- **WCAG AAA compliance** for text contrast ratios
- **Keyboard navigation:** Full support with visible focus indicators (ring-2 ring-primary ring-offset-2)
- **Screen reader labels:** Comprehensive aria-labels for verdict results, confidence scores
- **Mobile optimization:** Bottom sheet modals on mobile, sticky analysis button, swipe gestures for history items
- **Responsive breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)