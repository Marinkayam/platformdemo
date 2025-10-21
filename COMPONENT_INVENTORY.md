# Component Inventory - Monto Platform

**Generated**: January 2025
**Project**: Platform Demo v4
**Framework**: React 18 + TypeScript + Vite

---

## Table of Contents
1. [Component Library](#1-component-library)
2. [Tailwind Configuration](#2-tailwind-configuration)
3. [Global CSS Files](#3-global-css-files)
4. [UI Dependencies](#4-ui-dependencies)
5. [Custom Utilities & Helpers](#5-custom-utilities--helpers)
6. [Font System](#6-font-system)
7. [File Structure](#7-file-structure)

---

## 1. Component Library

### All Components in `@/components/ui/` (71 files)

| # | Component File | Type | Description |
|---|----------------|------|-------------|
| 1 | `ChatAIModal.tsx` | Modal | AI chat interface modal |
| 2 | `TableSystem.tsx` | Data Display | Advanced table system with sticky columns |
| 3 | `accordion.tsx` | Layout | Collapsible accordion component |
| 4 | `agent-user-type-badge.tsx` | Badge | Badge for agent user types (Monto/Customer) |
| 5 | `alert-dialog.tsx` | Modal | Confirmation/alert dialogs |
| 6 | `alert.tsx` | Feedback | Alert messages (info/success/warning/error) |
| 7 | `apply-globally-modal.tsx` | Modal | Modal for applying settings globally |
| 8 | `aspect-ratio.tsx` | Layout | Aspect ratio container |
| 9 | `auto-created-tag.tsx` | Badge | Tag for auto-created items |
| 10 | `avatar.tsx` | Display | User avatar component |
| 11 | `badge-pill.tsx` | Badge | Pill-style badge |
| 12 | `badge.tsx` | Badge | Base badge component |
| 13 | `breadcrumb.tsx` | Navigation | Breadcrumb navigation |
| 14 | `button.tsx` | Input | Button with variants (primary/secondary/ghost/outline/destructive) |
| 15 | `calendar.tsx` | Input | Date picker calendar |
| 16 | `card.tsx` | Layout | Card container with header/content/footer |
| 17 | `carousel.tsx` | Display | Image/content carousel |
| 18 | `chart.tsx` | Data Display | Chart components (Recharts integration) |
| 19 | `chat-ai-icon.tsx` | Icon | AI chat icon |
| 20 | `checkbox.tsx` | Input | Checkbox input |
| 21 | `collapsible.tsx` | Layout | Collapsible content container |
| 22 | `command.tsx` | Input | Command palette/search |
| 23 | `context-menu.tsx` | Navigation | Right-click context menu |
| 24 | `design-filter-chip.tsx` | Filter | Filter chip component |
| 25 | `design-filter-dropdown.tsx` | Filter | Filter dropdown component |
| 26 | `design-tabs.tsx` | Navigation | Design system tabs |
| 27 | `dialog.tsx` | Modal | Dialog/modal component |
| 28 | `drawer.tsx` | Layout | Slide-out drawer panel |
| 29 | `dropdown-menu.tsx` | Navigation | Dropdown menu |
| 30 | `enhanced-tooltip.tsx` | Overlay | Enhanced tooltip with rich content |
| 31 | `exception-banner.tsx` | Feedback | Exception/warning banner |
| 32 | `file-upload.tsx` | Input | File upload component |
| 33 | `form.tsx` | Input | Form components and context |
| 34 | `form-field.tsx` | Display | Read-only form field display |
| 35 | `hover-card.tsx` | Overlay | Hover card popover |
| 36 | `input-otp.tsx` | Input | OTP/PIN code input |
| 37 | `input.tsx` | Input | Text input field |
| 38 | `label.tsx` | Input | Form label |
| 39 | `menubar.tsx` | Navigation | Menubar component |
| 40 | `navigation-menu.tsx` | Navigation | Navigation menu |
| 41 | `pagination.tsx` | Navigation | Pagination controls |
| 42 | `popover.tsx` | Overlay | Popover component |
| 43 | `progress.tsx` | Feedback | Progress bar |
| 44 | `radio-group.tsx` | Input | Radio button group |
| 45 | `request-to-pay-transaction-header.tsx` | Display | RTP transaction header |
| 46 | `resizable.tsx` | Layout | Resizable panels |
| 47 | `scroll-area.tsx` | Layout | Custom scrollable area |
| 48 | `select.tsx` | Input | Select dropdown |
| 49 | `separator.tsx` | Layout | Visual separator/divider |
| 50 | `sheet.tsx` | Modal | Sheet/drawer modal |
| 51 | `sidebar.tsx` | Navigation | Sidebar navigation |
| 52 | `skeleton.tsx` | Feedback | Loading skeleton |
| 53 | `slider.tsx` | Input | Range slider |
| 54 | `sonner.tsx` | Feedback | Toast notifications (Sonner integration) |
| 55 | `status-badge.tsx` | Badge | Status badge system (32+ statuses) |
| 56 | `switch.tsx` | Input | Toggle switch |
| 57 | `table-actions.tsx` | Data Display | Table action buttons |
| 58 | `table-skeleton.tsx` | Feedback | Table loading skeleton |
| 59 | `table.tsx` | Data Display | Table components |
| 60 | `tabs.tsx` | Navigation | Tab navigation |
| 61 | `text-color.tsx` | Typography | Gradient text effects |
| 62 | `text-effect.tsx` | Typography | Animated text effects |
| 63 | `textarea.tsx` | Input | Multi-line text input |
| 64 | `toast.tsx` | Feedback | Toast notification |
| 65 | `toaster.tsx` | Feedback | Toast container |
| 66 | `toggle-group.tsx` | Input | Toggle button group |
| 67 | `toggle.tsx` | Input | Toggle button |
| 68 | `tooltip.tsx` | Overlay | Tooltip component |
| 69 | `typewriter-text.tsx` | Typography | Typewriter animation effect |
| 70 | `use-toast.ts` | Hook | Toast notification hook |
| 71 | `wizard-progress.tsx` | Feedback | Multi-step wizard progress |
| 72 | `typography/typography.tsx` | Typography | Typography components |

### Component Categories

**Input Components (22)**
- button, checkbox, input, textarea, select, radio-group, switch, slider, calendar, file-upload, input-otp, command, label, form, toggle, toggle-group

**Layout Components (11)**
- card, accordion, collapsible, aspect-ratio, resizable, scroll-area, separator, drawer, sheet, sidebar

**Navigation Components (9)**
- tabs, breadcrumb, pagination, navigation-menu, menubar, dropdown-menu, context-menu, design-tabs

**Badge Components (5)**
- badge, badge-pill, status-badge, agent-user-type-badge, auto-created-tag

**Modal/Overlay Components (7)**
- dialog, alert-dialog, popover, hover-card, ChatAIModal, apply-globally-modal, tooltip, enhanced-tooltip

**Feedback Components (8)**
- alert, toast, toaster, sonner, progress, skeleton, table-skeleton, exception-banner, wizard-progress

**Data Display Components (5)**
- table, TableSystem, chart, table-actions, request-to-pay-transaction-header, avatar, carousel, form-field

**Typography/Animation Components (4)**
- text-effect, text-color, typewriter-text, typography

**Special Components (2)**
- chat-ai-icon, design-filter-chip, design-filter-dropdown

---

## 2. Tailwind Configuration

**File**: `tailwind.config.ts`

### Custom Colors

#### Primary Colors (Purple Brand)
```typescript
'primary-lighter': '#EFEBFF'   // Lightest purple
'primary-light': '#BEADFF'     // Light purple
'primary-main': '#7B59FF'      // Main brand purple ⭐
'primary-dark': '#523BAA'      // Dark purple
'primary-darker': '#291E55'    // Darkest purple
'primary-contrast-text': '#FFFFFF'
```

#### Secondary Colors
```typescript
'secondary-lighter': '#E6E7EB'
'secondary-light': '#6F768B'
'secondary-main': '#1D153B'
'secondary-dark': '#181231'
'secondary-darker': '#0A0714'
'secondary-contrast-text': '#FFFFFF'
```

#### Grey Scale (10 shades)
```typescript
'grey-0': '#FFFFFF'
'grey-100': '#707C87'
'grey-200': '#F4F6F8'
'grey-300': '#F1F1F3'
'grey-400': '#E6E7EB'
'grey-500': '#8C94A9'
'grey-600': '#818799'
'grey-700': '#586079'
'grey-800': '#38415F'
'grey-900': '#061237'
```

#### Semantic Colors
```typescript
'info-main': '#375DFB'
'success-main': '#007737'
'warning-main': '#F2AE40'
'error-main': '#DF1C41'
```

#### Background Colors
```typescript
'background-default': '#F4F6F8'
'background-paper': '#FFFFFF'
'divider': 'rgba(140, 148, 169, 0.2)'
'modal-overlay': 'rgba(1, 23, 62, 0.25)'
'monto-purple': '#7B59FF'
```

### Font Family
```typescript
fontFamily: {
  sans: ['Studio Feixen Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  mono: ['Studio Feixen Sans', 'Inter', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace']
}
```

### Font Sizes (Custom)
```typescript
'overline': ['0.625rem', { 'lineHeight': '1.2' }]      // 10px
'small-text': ['0.6875rem', { 'lineHeight': '1.25' }]  // 11px
```

### Border Radius
```typescript
'xs': '0.125rem'    // 2px
'sm': '0.25rem'     // 4px
'DEFAULT': '0.375rem' // 6px
'lg': '0.5rem'      // 8px
'xl': '0.75rem'     // 12px
'2xl': '1rem'       // 16px
'3xl': '1.5rem'     // 24px
'full': '9999px'    // Fully rounded
```

### Spacing Scale
```typescript
'1': '0.25rem'   // 4px
'2': '0.5rem'    // 8px
'4': '1rem'      // 16px
'6': '1.5rem'    // 24px
'8': '2rem'      // 32px
'10': '2.5rem'   // 40px
'12': '3rem'     // 48px
'16': '4rem'     // 64px
'20': '5rem'     // 80px
'24': '6rem'     // 96px
```

### Animations
```typescript
keyframes: {
  'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' }},
  'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' }}
}
animation: {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out'
}
```

### Container
```typescript
container: {
  center: true,
  padding: '2rem',
  screens: { '2xl': '1400px' }
}
```

### Plugins
- `tailwindcss-animate` - Animation utilities

### Dark Mode
- Mode: `class`
- Full dark mode color palette defined with HSL color space

---

## 3. Global CSS Files

### 3.1 `src/index.css` (Main Stylesheet)

**Purpose**: Global styles, CSS variables, custom animations

#### CSS Variables (Light Mode)
```css
--background: 0 0% 100%
--foreground: 240 10% 3.9%
--card: 0 0% 100%
--primary: 240 5.9% 10%
--secondary: 240 4.8% 95.9%
--destructive: 0 84.2% 60.2%
--border: 240 5.9% 90%
--radius: 0.5rem
--chart-1 through --chart-5
```

#### Custom Animations

1. **Slide In Animations**
```css
@keyframes slide-in-from-left
@keyframes slide-in-from-right
.animate-slide-in-from-left
.animate-slide-in-from-right
```

2. **Vertical Line Animation** (Auto-created rows)
```css
@keyframes slide-in-vertical
.auto-created-row td:first-child::before {
  background-color: #7B59FF; /* Purple vertical line */
}
```

3. **Pending Action Row** (Red vertical line)
```css
.pending-action-row td:first-child::before {
  background-color: #EF4444; /* Red vertical line */
}
```

4. **Gradient Animation** (TextColor component)
```css
@keyframes gradient-x
.animate-gradient-x
```

5. **Fade In Up**
```css
@keyframes fadeInUp
```

6. **Slide Right**
```css
@keyframes slideRight
```

#### Font Imports
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import './styles/fonts.css'; /* Studio Feixen Sans */
```

### 3.2 `src/styles/fonts.css` (Custom Fonts)

**Purpose**: Studio Feixen Sans font-face declarations

```css
@font-face Studio Feixen Sans - Light (300)
@font-face Studio Feixen Sans - Book (400)
@font-face Studio Feixen Sans - Medium (500)
@font-face Studio Feixen Sans - Bold (700)
```

**Font Files Location**: `/public/Fonts/`
- `StudioFeixenSans-Light.woff2`
- `StudioFeixenSans-Book.woff2`
- `StudioFeixenSans-Medium.woff2`
- `StudioFeixenSans-Bold.woff2`

### 3.3 `src/App.css`

**Purpose**: Application-specific styles (if any)

---

## 4. UI Dependencies

### Core Framework Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.1 | React library |
| `react-dom` | ^18.3.1 | React DOM rendering |
| `react-router-dom` | ^6.30.1 | Client-side routing |
| `typescript` | ^5.4.5 | TypeScript support |
| `vite` | ^5.4.19 | Build tool & dev server |

### Radix UI Components (22 packages)

**Base Library**: Radix UI - Unstyled, accessible component primitives

| Package | Version | Component |
|---------|---------|-----------|
| `@radix-ui/react-accordion` | ^1.2.0 | Accordion |
| `@radix-ui/react-alert-dialog` | ^1.0.5 | Alert Dialog |
| `@radix-ui/react-aspect-ratio` | ^1.1.0 | Aspect Ratio |
| `@radix-ui/react-avatar` | ^1.1.0 | Avatar |
| `@radix-ui/react-checkbox` | ^1.0.4 | Checkbox |
| `@radix-ui/react-collapsible` | ^1.1.0 | Collapsible |
| `@radix-ui/react-context-menu` | ^2.2.1 | Context Menu |
| `@radix-ui/react-dialog` | ^1.0.5 | Dialog |
| `@radix-ui/react-dropdown-menu` | ^2.0.6 | Dropdown Menu |
| `@radix-ui/react-hover-card` | ^1.1.1 | Hover Card |
| `@radix-ui/react-label` | ^2.0.2 | Label |
| `@radix-ui/react-menubar` | ^1.1.1 | Menubar |
| `@radix-ui/react-navigation-menu` | ^1.2.0 | Navigation Menu |
| `@radix-ui/react-popover` | ^1.1.14 | Popover |
| `@radix-ui/react-progress` | ^1.1.0 | Progress |
| `@radix-ui/react-radio-group` | ^1.2.0 | Radio Group |
| `@radix-ui/react-scroll-area` | ^1.1.0 | Scroll Area |
| `@radix-ui/react-select` | ^2.0.0 | Select |
| `@radix-ui/react-separator` | ^1.1.0 | Separator |
| `@radix-ui/react-slider` | ^1.2.0 | Slider |
| `@radix-ui/react-slot` | ^1.0.2 | Slot (composition) |
| `@radix-ui/react-switch` | ^1.2.2 | Switch |
| `@radix-ui/react-tabs` | ^1.0.4 | Tabs |
| `@radix-ui/react-toast` | ^1.1.5 | Toast |
| `@radix-ui/react-toggle` | ^1.1.0 | Toggle |
| `@radix-ui/react-toggle-group` | ^1.1.0 | Toggle Group |
| `@radix-ui/react-tooltip` | ^1.1.4 | Tooltip |

### Animation & Motion

| Package | Version | Purpose |
|---------|---------|---------|
| `framer-motion` | ^12.23.12 | Animation library for React |
| `tailwindcss-animate` | ^1.0.7 | Tailwind animation utilities |

### Icons & Visual

| Package | Version | Purpose |
|---------|---------|---------|
| `lucide-react` | ^0.462.0 | Icon library (100+ icons) |

### Data Visualization

| Package | Version | Purpose |
|---------|---------|---------|
| `recharts` | ^2.12.7 | Chart library |
| `@tanstack/react-table` | ^8.21.3 | Headless table library |

### Form Management

| Package | Version | Purpose |
|---------|---------|---------|
| `react-hook-form` | ^7.51.0 | Form state management |
| `@hookform/resolvers` | ^3.10.0 | Form validation resolvers |
| `zod` | ^3.22.4 | Schema validation |
| `input-otp` | ^1.2.4 | OTP input component |

### Date & Time

| Package | Version | Purpose |
|---------|---------|---------|
| `date-fns` | ^3.6.0 | Date formatting & manipulation |
| `react-day-picker` | ^8.10.1 | Calendar/date picker |

### UI Utilities

| Package | Version | Purpose |
|---------|---------|---------|
| `class-variance-authority` | ^0.7.0 | Component variants utility |
| `clsx` | ^2.1.0 | Conditional className utility |
| `tailwind-merge` | ^2.6.0 | Merge Tailwind classes |
| `cmdk` | ^0.2.1 | Command menu (⌘K) |
| `sonner` | ^1.7.4 | Toast notifications |
| `vaul` | ^0.9.9 | Drawer component |

### Data Handling

| Package | Version | Purpose |
|---------|---------|---------|
| `papaparse` | ^5.4.1 | CSV parsing |
| `xlsx` | ^0.18.5 | Excel file handling |

### State Management & Data Fetching

| Package | Version | Purpose |
|---------|---------|---------|
| `@tanstack/react-query` | ^5.56.2 | Data fetching & caching |

### Carousel & Panels

| Package | Version | Purpose |
|---------|---------|---------|
| `embla-carousel-react` | ^8.3.0 | Carousel component |
| `react-resizable-panels` | ^2.1.9 | Resizable panel layouts |

### Theming

| Package | Version | Purpose |
|---------|---------|---------|
| `next-themes` | ^0.3.0 | Theme management (dark mode) |

### Development Tools

| Package | Version | Purpose |
|---------|---------|---------|
| `lovable-tagger` | ^1.1.8 | Development tagging tool |

### CSS & Styling

| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | ^3.4.17 | Utility-first CSS framework |
| `autoprefixer` | ^10.4.19 | CSS vendor prefixing |
| `postcss` | ^8.4.38 | CSS processing |
| `@tailwindcss/typography` | ^0.5.15 | Typography plugin |

---

## 5. Custom Utilities & Helpers

### 5.1 `src/lib/utils.ts` - Core Utilities

#### `cn()` - Class Name Merger
```typescript
export function cn(...inputs: ClassValue[]): string
```
**Purpose**: Merges Tailwind classes intelligently, preventing conflicts
**Uses**: `clsx` + `tailwind-merge`
**Example**: `cn("text-red-500", "text-blue-500")` → `"text-blue-500"`

#### `formatCurrency()` - Currency Formatter
```typescript
export function formatCurrency(amount: number, currency: string): string
```
**Purpose**: Formats numbers as currency with proper locale
**Example**: `formatCurrency(1234.56, "USD")` → `"$1,234.56"`

#### `formatOwnerName()` - Owner Name Formatter
```typescript
export const formatOwnerName = (owner: string): string
```
**Purpose**: Converts email addresses to formatted names
**Example**: `formatOwnerName("john.doe@example.com")` → `"John Doe"`

#### `getPortalLogoUrl()` - Portal Logo URL Generator
```typescript
export const getPortalLogoUrl = (portalName: string): string
```
**Purpose**: Returns the correct logo path for portal names
**Supports**: 22 portal logos (SAP Ariba, Coupa, Oracle, etc.)
**Example**: `getPortalLogoUrl("SAP Ariba")` → `"/portal-logos/ariba.png"`

**Supported Portals**:
- SAP Ariba, Coupa, Oracle, Tipalti, Amazon, Apple, AT&T
- Bill.com, Facturaxion, Fieldglass, iSupplier, KissFlow
- Qualcomm, Sainsburys, Segment, Shopify, StoreNext
- Taulia, Teradata, Tungsten, Walmart, Workday
- Meta, Tradeshift, OpenText

---

### 5.2 `src/lib/badge-colors.ts` - Badge Color System

#### `BADGE_COLORS` - Color Palette
```typescript
export const BADGE_COLORS = {
  success: { border: '#007737', text: '#007737', background: '#E6F4EA' },
  error: { border: '#DF1C41', text: '#DF1C41', background: '#FFEBEE' },
  warning: { border: '#D48806', text: '#D48806', background: '#FFF8E1' },
  info: { border: '#1750FB', text: '#1750FB', background: '#E3F2FD' },
  neutral: { border: '#9CA3AF', text: '#9CA3AF', background: '#F3F4F6' },
  processing: { border: '#7B59FF', text: '#7B59FF', background: '#F3E8FF' }
}
```

#### `STATUS_MAPPING` - Status to Color Mapping
```typescript
export const STATUS_MAPPING = {
  success: ['paid', 'settled', 'live', 'connected', 'new', ...],
  error: ['rejected by buyer', 'disconnected', 'error', ...],
  warning: ['external submission', 'approved by buyer', ...],
  info: ['in process', 'validating', 'building', ...],
  neutral: ['excluded', 'inactive'],
  processing: ['rtp prepared', 'rtp sent', 'awaiting sc', ...]
}
```

#### `getStatusColor()` - Get Color by Status
```typescript
export const getStatusColor = (status: string): typeof BADGE_COLORS[keyof typeof BADGE_COLORS]
```
**Purpose**: Returns the appropriate color scheme for a given status string
**Example**: `getStatusColor("Paid")` → `{ border: '#007737', ... }`

---

### 5.3 `src/lib/toast-helpers.ts` - Toast Notification Helpers

#### Toast Helper Functions
```typescript
export const showSuccessToast = (title: string, description?: string)
export const showErrorToast = (title: string, description?: string)
export const showWarningToast = (title: string, description?: string)
export const showInfoToast = (title: string, description?: string)
```

**Purpose**: Simplified toast notification functions
**Example**:
```typescript
showSuccessToast("Payment Processed", "Invoice #12345 has been paid")
showErrorToast("Failed to Save", "Please check your connection")
```

---

### 5.4 `src/lib/portalUtils.ts` - Portal Utilities

**Purpose**: Portal-specific utility functions (specific implementation details not read)

---

### 5.5 `src/lib/rtp-status-tooltips.ts` - RTP Status Tooltips

**Purpose**: Request-to-Pay status tooltip definitions (specific implementation details not read)

---

## 6. Font System

### Primary Font Stack
```css
font-family: 'Studio Feixen Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'
```

### Studio Feixen Sans (Custom Brand Font)

**Source**: `/public/Fonts/` directory
**Format**: WOFF2 (optimized web fonts)
**Display**: `swap` (prevents invisible text during loading)

**Weights Available**:
- **300** - Light (`StudioFeixenSans-Light.woff2`)
- **400** - Book/Regular (`StudioFeixenSans-Book.woff2`)
- **500** - Medium (`StudioFeixenSans-Medium.woff2`)
- **700** - Bold (`StudioFeixenSans-Bold.woff2`)

### Inter (Fallback Font)

**Source**: Google Fonts CDN
**Weights**: 300, 400, 500, 600, 700
**Display**: `swap`

### Monospace Font Stack
```css
font-family: 'Studio Feixen Sans', 'Inter', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'
```

---

## 7. File Structure

### Component Organization

```
src/
├── components/
│   ├── ui/                          # 71 UI components
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form-field.tsx
│   │   ├── input.tsx
│   │   ├── status-badge.tsx
│   │   ├── table.tsx
│   │   ├── TableSystem.tsx
│   │   ├── tabs.tsx
│   │   ├── typography/
│   │   │   └── typography.tsx
│   │   └── ... (68 more files)
│   │
│   ├── common/                      # Shared components
│   ├── dashboard/                   # Dashboard components
│   ├── invoices/                    # Invoice components
│   ├── portal-records/              # Portal record components
│   ├── purchase-orders/             # Purchase order components
│   └── ... (other feature folders)
│
├── lib/                             # Utilities & helpers
│   ├── utils.ts                     # Core utilities (cn, formatCurrency, etc.)
│   ├── badge-colors.ts              # Badge color system
│   ├── toast-helpers.ts             # Toast notification helpers
│   ├── portalUtils.ts               # Portal utilities
│   └── rtp-status-tooltips.ts       # RTP tooltips
│
├── styles/                          # Global styles
│   └── fonts.css                    # Custom font declarations
│
├── index.css                        # Main stylesheet (Tailwind + custom)
└── App.css                          # App-specific styles
```

### Public Assets

```
public/
├── Fonts/                           # Custom font files
│   ├── StudioFeixenSans-Light.woff2
│   ├── StudioFeixenSans-Book.woff2
│   ├── StudioFeixenSans-Medium.woff2
│   └── StudioFeixenSans-Bold.woff2
│
└── portal-logos/                    # Portal logo images
    ├── ariba.png
    ├── coupa.png
    ├── oracle.png
    ├── tipalti.png
    ├── amazon.png
    ├── meta.svg
    ├── tradeshift.svg
    └── ... (22 total logos)
```

---

## Summary Statistics

- **Total UI Components**: 71 files
- **Component Categories**: 9 categories
- **UI Dependencies**: 40+ packages
- **Radix UI Primitives**: 22 components
- **Custom Utilities**: 5 files
- **Portal Logos Supported**: 22 portals
- **Custom Fonts**: Studio Feixen Sans (4 weights)
- **Fallback Fonts**: Inter (5 weights)
- **Custom Colors**: 40+ color tokens
- **Custom Animations**: 6+ keyframe animations
- **Global CSS Files**: 3 files

---

## Key Technologies

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.3.1 |
| **TypeScript** | Type Safety | 5.4.5 |
| **Vite** | Build Tool | 5.4.19 |
| **Tailwind CSS** | Styling | 3.4.17 |
| **Radix UI** | Component Primitives | Latest |
| **shadcn/ui** | Component System | Custom |
| **Framer Motion** | Animations | 12.23.12 |
| **Lucide React** | Icons | 0.462.0 |
| **React Hook Form** | Forms | 7.51.0 |
| **TanStack Query** | Data Fetching | 5.56.2 |
| **TanStack Table** | Tables | 8.21.3 |
| **Recharts** | Charts | 2.12.7 |
| **date-fns** | Date Utils | 3.6.0 |
| **Zod** | Validation | 3.22.4 |

---

**Last Updated**: January 2025
**Maintained By**: Monto Platform Team
**Related Docs**: `DESIGN_SYSTEM.md`
