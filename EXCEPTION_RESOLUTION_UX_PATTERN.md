# Exception Resolution Pattern

## Purpose:
Guides users through identifying, understanding, and resolving exceptions (errors, warnings, or validation issues) that prevent invoice processing. This pattern helps users make informed decisions about how to handle data conflicts, missing information, or validation failures.

## When to use:
- When an invoice or document has validation errors that block processing
- When duplicate records are detected that require user decision
- When PO validation fails (not found, closed, currency mismatch, insufficient funds)
- When smart connection credentials are invalid or missing
- When data extraction from documents needs user verification or correction
- When system-detected anomalies require user acknowledgment or action

## When NOT to use:
- For general success messages or confirmations (use toast notifications instead)
- For informational help text (use info banners or tooltips)
- For field-level validation errors (use inline field validation)
- For loading states or progress indicators
- For non-blocking suggestions or recommendations

## Visual structure:

### Container Layout:
```
┌─────────────────────────────────────────────┐
│ Resolve Exception [ExceptionType Badge]     │
│                                             │
│ 🌟 Auto-resolution message (if applicable) │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ Exception Banner (Error/Warning)     │   │
│ │ [Icon] Title: Description            │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ ┌─────────────────────────────────────┐   │
│ │ Exception Banner (Info/Action)       │   │
│ │ [Icon] Title: Action guidance        │   │
│ └─────────────────────────────────────┘   │
│                                             │
│ [Resolution Content Area]                   │
│ - Comparison tables                         │
│ - Radio button options                      │
│ - Input fields                              │
│ - Upload zones                              │
│                                             │
│ [Action Button(s)] ────────────────────────►│
└─────────────────────────────────────────────┘
```

### Exception Banner Component:
- **Left**: Icon (14px, variant-specific color)
- **Center**: Title (font-medium) + Description text (sm)
- **Right** (optional): Action button aligned to right
- **Variants**: error (red), warning (amber), info (purple/white), success (green)
- **Icons**: alert (FileX2), circle (AlertCircle), info (Info), sparkles (WandSparkles), triangle-alert (TriangleAlert)

### Header Pattern:
- **Title**: "Resolve Exception" (text-lg font-medium)
- **Badge**: Exception type chip (e.g., "Duplication", "PO Validation")
- **Auto-resolution note**: Sparkles icon + text explaining automatic monitoring

## States:

### 1. Initial State
- Exception details displayed in banner(s)
- Resolution options visible but not selected
- Action buttons disabled until valid selection/input

### 2. Selection State
- User selects resolution method (radio buttons)
- Relevant input fields or UI appear based on selection
- Real-time validation feedback shown (for manual entry)

### 3. Validation State (Manual Entry)
**Valid Input:**
- Green border on input field
- CheckCircle icon (green)
- Success message with additional context
- Preview details shown (if applicable)

**Invalid Input:**
- Red border on input field
- AlertCircle icon (red)
- Error message explaining the issue
- Action button remains disabled

### 4. Ready to Resolve
- Valid selection or input provided
- Action button enabled
- Preview or summary shown (if applicable)

### 5. Confirmation Modal (Optional)
- User clicks main action button
- Modal appears with confirmation details
- User confirms or cancels the action

### 6. Resolution Complete
- Modal closes
- Toast notification shows success
- Exception banner(s) removed from view
- Activity logged to timeline (if applicable)

## Behavior rules:

### Validation
1. **Real-time validation**: Input fields validate on change, not on blur
2. **Visual feedback**: Icons and colors indicate validation state immediately
3. **Clear messaging**: Validation messages explain what's wrong and what's needed
4. **Contextual details**: Valid entries show preview information when available

### Resolution Methods
1. **Multiple options**: Present 2-4 resolution paths as radio buttons
2. **Smart suggestions**: Show AI-filtered suggestions when available (max 3)
3. **Manual override**: Always allow manual entry as fallback option
4. **File upload**: Support document upload for verification/replacement

### Progressive Disclosure
1. **Hide inactive options**: Only show input UI for selected resolution method
2. **Expand on selection**: Radio button selection reveals related fields
3. **Contextual actions**: Show action buttons only when relevant

### Action Buttons
1. **Primary action**: Single "Resolve" or specific action button (e.g., "Keep Current")
2. **Dynamic labels**: Button text reflects selected action
3. **Disabled state**: Button disabled until valid resolution selected
4. **Variant matching**: Error severity uses destructive variant, warnings use default

### Feedback
1. **Toast notifications**: Success/error messages after resolution attempt
2. **Activity logging**: Exception resolutions logged to invoice timeline
3. **Auto-refresh**: Exceptions re-validate after resolution to clear or show new issues

### Auto-Resolution Messaging
1. **Sparkles icon**: Yellow/gold color to indicate AI/automatic behavior
2. **Informative text**: "Monto continuously monitors portal data. If conditions change, exceptions may be resolved automatically — no action needed on your end."
3. **Placement**: Appears below title/badge, above exception banners

## Component boundaries:

### Inside the Exception Resolution Component:
- Exception type badge
- Auto-resolution message
- Exception banner(s) displaying errors/warnings
- Resolution option selector (RadioGroup)
- Input fields for manual entry
- File upload zones
- Suggested items list (if applicable)
- Comparison tables (for duplicates)
- Primary action button(s)
- Confirmation modal

### Outside (Must be provided by parent):
- Exception data and validation logic
- Resolution handlers (callbacks)
- Navigation actions
- Data fetching/updating
- Toast notification system
- Activity timeline integration

## Resolution Modal Pattern:

### Structure:
```
Dialog
├── DialogHeader
│   └── DialogTitle: "Resolve [Exception Type]"
├── DialogContent
│   ├── Exception Summary (gray box)
│   ├── RadioGroup (resolution methods)
│   │   ├── Upload Option
│   │   │   └── File upload zone (on selection)
│   │   ├── Manual Entry Option
│   │   │   └── Input + validation feedback
│   │   └── Suggested Items Option
│   │       └── Selectable card grid
│   └── [Dynamic content based on selection]
└── DialogFooter
    ├── Cancel Button (outline)
    └── Resolve Button (primary, conditionally enabled)
```

### File Upload Zone:
- Dashed border when empty
- Upload icon + instructional text
- Accepted file types displayed
- File preview when selected (icon + name + checkmark)
- Click to change file

### Suggested Items:
- Cards with border (gray when unselected, primary when selected)
- Checkmark icon for valid suggestions (green)
- Key metadata displayed (PO number, currency, TRA, buyer, etc.)
- Click entire card to select
- Selected card shows primary check icon

## Exception Banner Variants:

### Error (Red)
- **Background**: `bg-red-50/50 border border-red-200`
- **Icon color**: `text-error-main` (#DF1C41)
- **Text color**: #DF1C41
- **Use for**: Critical blocking issues

### Warning (Amber)
- **Background**: `bg-amber-50 border border-amber-200`
- **Icon color**: `text-warning-main`
- **Text color**: amber-900
- **Use for**: Non-critical issues that need attention

### Info (Purple/White)
- **Background**: `bg-white border border-primary`
- **Icon color**: `text-primary`
- **Text color**: gray-900
- **Use for**: Action guidance, next steps

### Success (Green)
- **Background**: `bg-green-50 border border-green-200`
- **Icon color**: `text-success-main`
- **Text color**: green-900
- **Use for**: Confirmation of valid state

## Related components / patterns:

### Exception Banner (`ExceptionBanner`)
- Reusable alert component for displaying exception messages
- Supports error, warning, info, success variants
- Configurable icons and inline action buttons

### Badge Pill (`BadgePill`)
- Small colored chips for exception type labels
- Variants: error, warning, info, success
- Secondary style for subtle appearance

### Confirmation Dialog
- Standard dialog pattern for confirming destructive actions
- Shows summary of what will happen
- Cancel + Confirm buttons

### Comparison Table (`ComparisonTable`)
- Side-by-side comparison of duplicate records
- Highlights differences between versions
- Read-only display for decision-making

### Radio Selection with Progressive Disclosure
- Radio buttons reveal relevant UI on selection
- Only one option active at a time
- Supports nested input fields, file uploads, or suggestion lists

## Implementation Notes:

### Exception Types Supported:
1. **PO Validation**: not-found, currency-mismatch, insufficient-funds, po-closed
2. **Duplication**: Multiple versions of same invoice
3. **Smart Connection**: Invalid credentials, authentication failures
4. **Data Extraction**: Missing or incorrect extracted data
5. **File Upload**: Corrupted or invalid documents

### Resolution Flows:
1. **Inline Resolution**: Exception resolves within the same page
2. **Modal Resolution**: Opens dialog for complex multi-step resolution
3. **Navigation Resolution**: Redirects to another page (e.g., Smart Connections)

### Data Flow:
```
Exception Detected → Display Banners → User Selects Resolution
→ Validate Input → Enable Action → User Confirms
→ Submit Resolution → Update State → Show Feedback
→ Re-validate → Clear or Show New Exceptions
```

### Accessibility:
- Radio groups properly labeled
- Icons are decorative (not essential for understanding)
- Validation messages associated with inputs
- Keyboard navigation supported
- Focus management in modals

---

**Note**: This pattern documents the existing UX implementation. Do not modify or redesign without reviewing how changes affect all exception types across the application.
