# Monto Design System - Comprehensive Report

Based on analysis of `/src/pages/DesignSystemPlayground.tsx`

Last Updated: January 2025

---

## 1. COLOR PALETTE

### Primary Colors (Purple Brand)
| Name | Hex Code | Usage |
|------|----------|-------|
| `primary-lighter` | #EFEBFF | Lightest purple for subtle backgrounds |
| `primary-light` | #BEADFF | Light purple for secondary elements |
| `primary-main` | #7B59FF | Main brand purple for primary actions |
| `primary-dark` | #523BAA | Dark purple for active states |
| `primary-darker` | #291E55 | Darkest purple for maximum emphasis |
| `primary-contrast-text` | #FFFFFF | White text for primary backgrounds |

### Status Colors (Semantic)
| Status | Hex Code | Usage |
|--------|----------|-------|
| Success | #10B981 | Successful operations |
| Warning | #F59E0B | Warnings or caution |
| Error | #EF4444 | Errors or critical issues |
| Info | #3B82F6 | General information |

### Badge System Colors
| Type | Hex Code | Background | Usage |
|------|----------|------------|-------|
| Success | #007737 | #E6F4EA | Positive states (Paid, Settled, Live, Connected) |
| Error | #DF1C41 | #FFEBEE | Error states (Rejected, Disconnected, Error) |
| Warning | #D48806 | #FFF8E1 | Processing/Pending (In Process, Validating) |
| Info | #1750FB | #E3F2FD | Information (External Submission) |
| Neutral | #9CA3AF | #F3F4F6 | Inactive states |
| Processing | #7B59FF | #F3E8FF | Primary brand (RTP Prepared, RTP Sent) |
| Black | #000000 | #E5E7EB | Excluded items |

### Grey Scale
| Name | Hex Code | Usage |
|------|----------|-------|
| `grey-300` | #F6F7F9 | Lightest grey for backgrounds |
| `grey-200` | #E6E7EB | Light grey for borders and dividers |
| `grey-300` | #D3D6DB | Medium grey for secondary text |
| `grey-400` | #B6B9BF | Dark grey for text and icons |
| `grey-500` | #818799 | Darker grey for primary text |
| `grey-600` | #545B6D | Darkest grey for headings |
| `grey-700` | #363A45 | Very dark grey |
| `grey-800` | #1F2128 | Almost black |
| `grey-900` | #000000 | True black |

### Custom Brand Colors
| Purpose | Hex Code | Usage |
|---------|----------|-------|
| Primary Brand | #7B59FF | Purple theme color |
| Text Primary | #38415F | Main text color |
| Text Secondary | #8C92A3 | Secondary text |
| Info Background | #EBF1FF | Light blue background |
| Info Border | #C7D9FF | Light blue border |
| Info Text | #253EA7 | Dark blue text |

---

## 2. TYPOGRAPHY

### Font Family
- **Primary**: Inter, sans-serif

### Typography Scale

#### Heading Scale
| Style | Size | Weight | Line Height | Usage | Example |
|-------|------|--------|-------------|-------|---------|
| H1 | 24px (1.5rem) | 600 (semibold) | 1.25 | Dashboard welcome headers, main page titles | "Good morning, Nitsan!" |
| H2 | 20px (1.25rem) | 600 (semibold) | 1.3 | Dashboard sections, major content areas | "Portal Records", "Purchase Orders" |
| H3 | 18px (1.125rem) | 500 (medium) | 1.4 | Component titles, section headers | "Account Receivables" |
| H4 | 16px (1rem) | 600 (semibold) | 1.4 | Entity identifiers, action buttons | "PO-12345" |
| H5 | 14px (0.875rem) | 500 (medium) | 1.4 | Descriptions, helper text, secondary info | "Recent portal record activity" |

#### Body Text Scale
| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Body Large | 16px (1rem) | 400 (normal) | 1.5 | Lead paragraphs, important descriptions |
| Body Default | 14px (0.875rem) | 400 (normal) | 1.5 | Standard body text, form descriptions |
| Caption | 12px (0.75rem) | 400 (normal) | 1.4 | Helper text, metadata, fine print |

#### Data Display
| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Large Metrics | 30px (1.875rem) | 700 (bold) | 1.1 | Dashboard metrics, KPI numbers |
| Medium Metrics | 20px (1.25rem) | 600 (semibold) | 1.3 | Secondary metrics and status |

### CSS Classes
```css
/* Section Headers */
.text-2xl { font-size: 1.5rem; font-weight: 600; line-height: 1.25; }

/* Dashboard Section Headers */
.text-xl { font-size: 1.25rem; font-weight: 600; line-height: 1.3; }

/* Card/Modal Titles */
.text-lg { font-size: 1.125rem; font-weight: 500; line-height: 1.4; }

/* Component Headers */
.text-base { font-size: 1rem; font-weight: 600; line-height: 1.4; }

/* Small Titles & Labels */
.text-sm { font-size: 0.875rem; font-weight: 500; line-height: 1.4; }

/* Data Display */
.text-3xl.font-bold { font-size: 1.875rem; font-weight: 700; line-height: 1.1; }
```

### Usage Examples
```tsx
// Page Headers
<h1 className="text-2xl font-bold text-gray-900">Good morning, Nitsan!</h1>

// Section Headers
<h2 className="text-xl font-semibold text-[#061237] tracking-tight">Portal Records</h2>
<h2 className="text-xl font-semibold text-[#061237] tracking-tight">Purchase Orders</h2>

// Component Titles
<h3 className="text-lg font-semibold text-[#061237]">Account Receivables</h3>
<h4 className="text-base font-semibold text-[#061237]">PO-12345</h4>

// Labels
<label className="text-sm font-medium text-grey-800">Portal</label>

// Metrics
<div className="text-3xl font-bold text-[#061237]">$73.5M</div>
<div className="text-3xl font-bold text-gray-900">120</div>

// Status Text
<p className="text-xl font-semibold text-blue-600">185</p>
<span className="text-sm font-medium text-green-700">All systems healthy</span>
```

---

## 3. COMPONENTS LIBRARY

### 3.1 Button Components
**Location**: `@/components/ui/button`

#### Variants
- **Primary** (default): Purple background (`bg-primary-main`)
- **Secondary**: Grey background
- **Outline**: Transparent background with border
- **Ghost**: Transparent background, no border
- **Link**: Text-only button
- **Destructive**: Red for dangerous actions

#### Sizes
- `sm` - Small button
- `default` - Standard size
- `lg` - Large button
- `icon` - Icon-only button

#### States
- Default
- Hover
- Disabled
- Active/Focus

#### Usage Examples
```tsx
<Button variant="default" size="default">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="link">Link Button</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### 3.2 Badge Components

#### StatusBadge (Main)
**Location**: `src/components/ui/status-badge.tsx`
**Count**: 32+ statuses across 7 categories

**Categories**:

1. **Success** (Green)
   - Paid
   - Settled
   - Partially Settled
   - Live
   - Connected
   - New
   - Fully Invoiced
   - Partially Invoiced

2. **Error** (Red)
   - Rejected By Buyer
   - Disconnected
   - Error
   - Unavailable
   - Pending Action

3. **Warning** (Yellow/Orange)
   - In Process
   - Validating
   - Building
   - Approved By Buyer

4. **Info** (Blue)
   - External Submission

5. **Neutral** (Grey)
   - Inactive

6. **Processing** (Purple)
   - RTP Prepared
   - RTP Sent
   - Awaiting SC
   - Rejected By Monto

7. **Black**
   - Excluded

#### Specialized Badge Components

1. **Purchase Order StatusBadge**
   - New
   - Pending Approval
   - Rejected
   - Cancelled
   - Partially Invoiced
   - Fully Invoiced

2. **AgentUserTypeBadge**
   - Monto
   - Customer

3. **PaymentHabitBadge**
   - Excellent
   - Good
   - Fair
   - Poor

4. **PortalStatusBadge**
   - Active
   - Inactive
   - Pending
   - Error

5. **MatchTypeBadge**
   - Primary
   - Alternate
   - Unmatched
   - Conflict

6. **Integration Hub Status**
   - Connected
   - Coming Soon

#### Usage Examples
```tsx
<StatusBadge status="Paid" />
<StatusBadge status="Approved By Buyer" />
<StatusBadge status="In Process" />
```

### 3.3 Form Elements
**Location**: `@/components/ui/`

#### Basic Inputs
- **Input** - Text, email, password fields
- **Textarea** - Multi-line text input
- **Label** - Form field labels

#### Selection Elements
- **Select** - Dropdown selection
- **Checkbox** - Single/multiple selection
- **RadioGroup** - Single selection from options
- **Switch** - Toggle on/off

#### Advanced Inputs
- **Slider** - Value selection with draggable control
- **InputOTP** - 6-digit code input with separator
- **FormField** - Read-only display fields for data presentation

#### Usage Examples
```tsx
// Basic Input
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="Enter email" />

// Textarea
<Label htmlFor="message">Message</Label>
<Textarea id="message" placeholder="Enter your message" />

// Select
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>

// Checkbox
<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>

// Radio Group
<RadioGroup value={value} onValueChange={setValue}>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="r1" />
    <Label htmlFor="r1">Option 1</Label>
  </div>
</RadioGroup>

// Switch
<div className="flex items-center space-x-2">
  <Switch id="notifications" />
  <Label htmlFor="notifications">Enable notifications</Label>
</div>

// Slider
<Slider value={[50]} max={100} step={1} />

// FormField (Read-only)
<FormField label="Invoice Number" value="INV-2024-001" />
<FormField label="Total Amount" value="$1,234.56" />
```

### 3.4 Navigation Components

#### TabsNav
**Location**: `@/components/common/TabsNav`
- Standardized tab navigation component
- Used across all tabbed interfaces

```tsx
const tabs = [
  { id: "tab1", icon: <Icon />, label: "Tab 1", tooltip: null },
  { id: "tab2", icon: <Icon />, label: "Tab 2", count: 5, tooltip: null },
];

<TabsNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
```

#### Tabs
**Location**: `@/components/ui/tabs`
- Tab container with trigger and content areas
- Supports multiple tab panels

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Breadcrumbs
**Location**: `@/components/ui/breadcrumb`
- Hierarchical navigation display
- Shows current page context

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/invoices">Invoices</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>INV-001</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### 3.5 Filter Components

#### DataTableFacetedFilter
**Location**: `@/components/dashboard/filters/DataTableFacetedFilter`
- Modern filter with search capability
- Multi-select with count display
- Used for: Status, Buyer, Portal, Transaction Type, Owner, Source

```tsx
<DataTableFacetedFilter
  title="Status"
  options={statusOptions}
  selectedValues={filters.status}
  onFilterChange={(values) => handleFilterChange('status', values)}
/>
```

#### FilterDropdown
**Location**: `@/components/invoices/filters/FilterDropdown`
- Legacy filter component

#### DateRangePicker
**Location**: `@/components/invoices/filters/DateRangePicker`
- Date range selection for filtering

```tsx
<DateRangePicker
  value={{ from: filters.dueDate.from, to: filters.dueDate.to }}
  onChange={(range) => handleFilterChange('dueDate', range)}
/>
```

#### InvoiceActions
**Location**: `@/components/invoices/InvoiceActions`
- Compact search component
- Responsive (collapses to icon-only mode)
- Prevents layout jumps

### 3.6 Table Components

#### TableSystem
**Location**: `@/components/ui/TableSystem`
- Data tables with sticky columns
- Sorting capabilities
- Responsive design

#### Table
**Location**: `@/components/ui/table`
- Basic table structure
- Components: Table, TableBody, TableCell, TableHead, TableHeader, TableRow

```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data 1</TableCell>
      <TableCell>Data 2</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### 3.7 Alert Components
**Location**: `@/components/ui/alert`

**Variants**:
- **Info** - Information alerts with blue theme
- **Success** - Success messages with green theme
- **Warning** - Warning messages with orange theme
- **Error** - Error messages with red theme
- **Dismissable** - Closeable alerts with X button

```tsx
<Alert variant="info">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>This is an informational message.</AlertDescription>
</Alert>

<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Operation completed successfully.</AlertDescription>
</Alert>

<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Please review before continuing.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>An error occurred.</AlertDescription>
</Alert>
```

### 3.8 Progress Indicators

#### Progress Bar
**Location**: `@/components/ui/progress`
- Linear progress indicator
- Thin style (2px height)
- Shows completion percentage

```tsx
<Progress value={66} />
```

#### WizardProgress
**Location**: `@/components/ui/wizard-progress`
- Multi-step wizard progress
- Used in modals
- Shows current step with visual indicator

**Examples**:
- Upload ERP Payment Report (4 steps)
- Add Scan Agent (3 steps)

```tsx
<WizardProgress
  steps={[
    { id: 1, label: "Upload File" },
    { id: 2, label: "Map Fields" },
    { id: 3, label: "Review" },
    { id: 4, label: "Complete" }
  ]}
  currentStep={2}
/>
```

### 3.9 Modal Components

#### Dialog
**Location**: `@/components/ui/dialog`
- Standard modal dialog
- Components: DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger

```tsx
<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description text.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button>Save Changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### AlertDialog
**Location**: `@/components/ui/alert-dialog`
- Confirmation dialogs
- Destructive actions
- Components: AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction

```tsx
<AlertDialog>
  <AlertDialogTrigger>Delete Item</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### 3.10 Layout Components

#### Card
**Location**: `@/components/ui/card`
- Container component
- Components: Card, CardContent, CardDescription, CardHeader, CardTitle

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

#### ResizablePanelGroup
**Location**: `@/components/ui/resizable`
- Split view layouts
- Draggable resize handles
- Used in detail pages

```tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={50}>
    <div>Left Panel</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div>Right Panel</div>
  </ResizablePanel>
</ResizablePanelGroup>
```

#### RequestToPayTransactionHeader
**Location**: `@/components/ui/request-to-pay-transaction-header`
- Specialized header for RTP transactions

### 3.11 Utility Components

#### Tooltip
**Location**: `@/components/ui/tooltip`
- Hover information display
- Components: TooltipProvider, TooltipTrigger, TooltipContent

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Tooltip content</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### TextEffect
**Location**: `@/components/ui/text-effect`
- Animated text entrance
- Presets: slide, fade
- Per-word or per-character animation

```tsx
<TextEffect
  per="word"
  as="h1"
  preset="slide"
  className="text-4xl font-bold"
  delay={0.1}
>
  Welcome to Monto
</TextEffect>
```

#### TextColor
**Location**: `@/components/ui/text-color`
- Gradient text effects

```tsx
<TextColor>Develop. Preview. Ship.</TextColor>
```

### 3.12 Brand Assets

#### MontoLogo
**Location**: `@/components/MontoLogo`
- Primary brand logo in purple

```tsx
<MontoLogo />
```

#### MontoIcon
**Location**: `@/components/MontoIcon`
- Icon version of logo

```tsx
<MontoIcon />
```

---

## 4. DESIGN SYSTEM ORGANIZATION

The design system is organized into **21 main sections**:

1. **Home** - Overview and quick navigation
2. **Color Palette** - Primary, status, and grey colors
3. **Typography** - Font system and text styles
4. **Buttons** - Button variants and states
5. **Status Badges** - Badge system and components
6. **Tab Navigation** - Tabbed interfaces
7. **Filter Components** - Modern filtering system
8. **Layout Patterns** - Page layout standards
9. **Table System** - Data table components
10. **Form Elements** - Input and selection controls
11. **Layout Components** - Structural components
12. **Alerts** - Alert and notification messages
13. **Progress** - Progress indicators and wizards
14. **Modals** - Dialog and alert modals
15. **Toast Notifications** - Toast message system
16. **Breadcrumbs** - Hierarchical navigation
17. **Brand Assets** - Logo and icon assets
18. **Portal Logos** - Third-party portal logos
19. **Design Tokens** - CSS variables and tokens
20. **Icons** - Icon library (Lucide React)
21. **Grid System** - Layout grid system

---

## 5. DESIGN TOKENS

### Color Tokens
```css
--monto-primary: #7B59FF
--monto-secondary: #9B7EFE
--grey-900: #1A1A1A
--grey-600: #6B7280
--grey-300: #D1D5DB
--background-paper: #FFFFFF
```

### Spacing Tokens
```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
--spacing-2xl: 48px
```

### Typography Tokens
```css
--font-family: Inter, sans-serif
--font-size-xs: 12px
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
--font-size-xl: 20px
```

---

## 6. ICON LIBRARY

**Library**: Lucide React
**Stroke Width**: 0.75 (standard), 1.0 (for specific cases)

### Icon Categories

#### Navigation Icons (5)
- **LayoutDashboard** - Home dashboard
- **WandSparkles** - Portals Dashboard
- **ArrowLeftRight** - Request-to-Pay module
- **Cable** - Connection Hub
- **Building** - My Company settings

#### Dashboard Icons (11)
- **TrendingUp** - Transaction trends
- **ArrowRight** - Navigate to details
- **FileText** - Documents/invoices
- **BarChart** - Chart view toggle
- **List** - List view toggle
- **Link** - Connection status
- **TriangleAlert** - Exception/warning (red)
- **Building** - Total customers metric
- **CreditCard** - Connected portals
- **Calendar** - Date selector
- **ChevronDown** - Period dropdown

#### Action Icons
- **Copy** - Copy to clipboard
- **ChevronRight** - Expand row details
- **Search** - Search functionality
- **Check** - Confirmation/success
- **X** - Close/cancel
- **MoreVertical** - Additional options
- **Edit** - Edit actions
- **Eye/EyeOff** - Show/hide

#### Status Icons
- **AlertCircle** - Warning/error
- **Info** - Information
- **CheckCircle** - Success confirmation
- **Clock** - Time/pending status

### Icon Sizes
- **16px** - Small icons (inline text)
- **20px** - Medium icons (buttons)
- **24px** - Large icons (headers)

### Icon Colors
- **Grey-900** (#1A1A1A) - Primary
- **Grey-600** (#6B7280) - Secondary
- **#7B59FF** - Brand purple
- **Context-specific** - Red for errors, green for success

---

## 7. USAGE PATTERNS

### Spacing System
```css
/* Gap Spacing */
gap-2: 8px
gap-4: 16px
gap-6: 24px
gap-8: 32px

/* Padding */
p-4: 16px (all sides)
p-6: 24px (all sides)
p-8: 32px (all sides)
p-10: 40px (all sides)
px-4: 16px (horizontal)
py-2: 8px (vertical)

/* Margin */
mb-4: 16px (bottom)
mt-6: 24px (top)
mx-auto: auto (horizontal centering)
```

### Layout Standards
- Consistent page layouts prevent layout jumps
- Fixed container widths for stable rendering
- Proper spacing between sections
- Responsive breakpoints: `md:` (768px), `lg:` (1024px), `xl:` (1280px)

### Component Composition
- Components are composable and reusable
- Consistent prop patterns across similar components
- Semantic HTML structure
- Accessible by default

---

## 8. ACCESSIBILITY FEATURES

### Typography
- **Proportional sizing** based on rem units
- **Minimum font size**: 12px for readability
- **Line height**: 1.4-1.5 for body text, 1.1-1.3 for headings

### Color Contrast
- All text meets WCAG AA standards
- 4.5:1 contrast ratio for normal text
- 3:1 contrast ratio for large text (18px+)

### Interactive Elements
- **Semantic HTML** elements (button, a, input, etc.)
- **Keyboard navigation** support (Tab, Enter, Escape)
- **Screen reader** friendly labels and ARIA attributes
- **Focus states** on all interactive elements
- **Touch targets**: Minimum 44x44px for mobile

### Forms
- Clear labels associated with inputs
- Error messages linked to form fields
- Required field indicators
- Helpful placeholder text

---

## 9. RESPONSIVE DESIGN

### Breakpoints
```css
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Grid System
- Mobile-first approach
- Flexible grid layouts: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Gap spacing adjusts at breakpoints
- Responsive typography scaling

### Component Behavior
- Tables: Horizontal scroll on mobile
- Modals: Full screen on mobile, centered on desktop
- Filters: Collapse to dropdown on mobile
- Navigation: Hamburger menu on mobile

---

## 10. DESIGN PRINCIPLES

### 1. Consistency
Unified patterns across all interfaces ensure a cohesive user experience.
- Reusable components
- Standardized spacing
- Consistent color usage
- Unified typography

### 2. Clarity
Clear hierarchy and intuitive navigation guide users through tasks.
- Visual hierarchy through typography
- Color-coded status indicators
- Clear button labels
- Contextual help text

### 3. Efficiency
Optimized workflows and responsive design maximize productivity.
- Keyboard shortcuts
- Quick filters and search
- Batch actions
- Responsive layouts

### 4. Accessibility
Design for all users regardless of ability.
- WCAG AA compliance
- Keyboard navigation
- Screen reader support
- High contrast modes

---

## 11. GETTING STARTED

### Installation
Components are built using shadcn/ui and Tailwind CSS.

### Using Components
```tsx
// Import components
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";

// Use in your application
function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent>
        <StatusBadge status="Paid" />
        <Button variant="primary">View Invoice</Button>
      </CardContent>
    </Card>
  );
}
```

### Customization
- Colors defined in `tailwind.config.js`
- Typography scale in Tailwind theme
- Component variants using className prop

---

## 12. COMPONENT QUICK REFERENCE

| Component | Location | Primary Use |
|-----------|----------|-------------|
| Button | `@/components/ui/button` | Actions, CTAs |
| Badge | `@/components/ui/badge` | Status indicators |
| StatusBadge | `@/components/ui/status-badge` | Portal/Invoice status |
| Card | `@/components/ui/card` | Content containers |
| Input | `@/components/ui/input` | Text entry |
| Select | `@/components/ui/select` | Dropdown selection |
| Table | `@/components/ui/table` | Data display |
| Dialog | `@/components/ui/dialog` | Modal windows |
| Alert | `@/components/ui/alert` | Notifications |
| Tabs | `@/components/ui/tabs` | Content organization |
| FormField | `@/components/ui/form-field` | Read-only data display |
| TabsNav | `@/components/common/TabsNav` | Tab navigation |

---

## 13. PORTAL LOGOS

The system includes logos for major procurement portals:
- SAP Ariba
- Coupa
- Bill.com
- Oracle Procurement
- Amazon Business
- Apple Business
- Tipalti

**Usage**:
```tsx
import { getPortalLogoUrl } from "@/lib/utils";

<img src={getPortalLogoUrl("SAP Ariba")} alt="SAP Ariba logo" />
```

---

## CHANGELOG

### Latest Updates (January 2025)
- Added FormField component for read-only data display
- Enhanced Smart Connection tab
- Added Portal Invoice Records tab to Purchase Orders
- Improved Line Items design with rounded corners and divider
- Updated Design System Playground documentation

---

This comprehensive design system ensures consistency, maintainability, and scalability across the entire Monto platform. All components follow established patterns and can be easily integrated into new features.

For questions or suggestions, please refer to the Design System Playground at `/design-system` in the application.
