# Table System Pattern

## Purpose:
Provides a consistent, high-performance tabular data display system for complex business data across the Monto platform. Tables serve as the primary interface for viewing, sorting, filtering, and managing collections of records (invoices, purchase orders, portal records, etc.).

## When to use:
- Displaying collections of structured data (10+ records)
- When users need to compare multiple data points across records
- When sorting, filtering, or pagination is required
- For data that requires row-level actions or batch operations
- When horizontal scrolling is acceptable for wide datasets

## When NOT to use:
- For small lists (< 5 items) - use cards or simple lists instead
- For highly hierarchical data - consider tree views
- When mobile-first responsive design is critical - tables don't collapse well
- For real-time collaborative editing - tables are read-focused

## Visual structure:

### Layout Components:
```
┌─────────────────────────────────────────────────────────────┐
│ Table Container (rounded-xl border bg-white)                │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Table Header (sticky, bg-[#F6F7F9])                     │ │
│ │ ┌─────────┬─────────┬─────────┬─────────┬──────────┐   │ │
│ │ │ Col 1   │ Col 2   │ Col 3   │ Col 4   │ Actions  │   │ │
│ │ │ (sticky)│         │         │         │          │   │ │
│ │ └─────────┴─────────┴─────────┴─────────┴──────────┘   │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Table Body (divide-y divide-gray-50)                    │ │
│ │ ┌─────────┬─────────┬─────────┬─────────┬──────────┐   │ │
│ │ │ Data 1  │ Data 2  │ Data 3  │ Data 4  │ [⋮]      │   │ │
│ │ ├─────────┼─────────┼─────────┼─────────┼──────────┤   │ │
│ │ │ Data 1  │ Data 2  │ Data 3  │ Data 4  │ [⋮]      │   │ │
│ │ └─────────┴─────────┴─────────┴─────────┴──────────┘   │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Table Footer (optional, sticky, bg-[#F6F7F9])           │ │
│ │ Totals, Summaries, Aggregations                         │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ Pagination (bg-white border-t)                              │
│ Showing X-Y of Z • [< 1 2 3 4 5 >]                         │
└─────────────────────────────────────────────────────────────┘
```

### Measurements & Spacing:
- **Row height**: 65px (h-[65px])
- **Header height**: 50px-65px depending on context
- **Minimum table width**: 1200px-2200px (varies by table)
- **Cell padding**: 16px (px-4)
- **Border radius**: 12px (rounded-xl)
- **Header background**: #F6F7F9
- **Row hover**: gray-50
- **Border color**: gray-50 (rows), gray-200 (sticky column divider)

## States:

### 1. Default State
- White background with subtle borders
- Header row with light gray background (#F6F7F9)
- Clear visual hierarchy with consistent spacing
- First column sticky on scroll (if configured)

### 2. Loading State
- **Component**: TableSkeleton
- Shows animated shimmer effect
- Preserves table structure (rows × columns)
- Displays same number of rows as expected data
- Includes footer skeleton if footer is present
- **Purpose**: Prevents layout shift, maintains context

### 3. Empty State
- Centered message: "No data found" or context-specific message
- Full table width, single merged cell
- **Height**: 65px to maintain consistency
- Gray text (#6B7280)
- **Examples**:
  - "No invoices found."
  - "No portal records found."
  - "No purchase orders match your filters."

### 4. Hover State (Row)
- Background changes to gray-50 (hover:bg-gray-50)
- Smooth transition (transition-colors)
- Entire row highlights on hover
- Indicates interactivity

### 5. Active/Selected State
- Not currently implemented in base table
- Can be added via `data-[state=selected]:bg-muted`
- Used for batch operations or multi-select scenarios

### 6. Sorted State
- Column header shows sort indicator (↑ ↓)
- Visual feedback on which column is active
- Direction indicator rotates on toggle
- Only one column sorted at a time

### 7. Horizontal Scroll State
- Triggered when content width exceeds container
- First column remains sticky (left: 0)
- Border-right appears on sticky column for visual separation
- Scroll indicator shadows (optional, not currently implemented)

## Interaction rules:

### Navigation
1. **Row Click**: Navigates to detail view (when `onRowClick` provided)
2. **Entire row** is clickable, not just first column
3. Cursor changes to pointer on hover if clickable
4. Keyboard navigation: Tab through focusable elements, Enter to activate

### Sorting
1. **Click column header** to sort
2. **First click**: Ascending order (↑)
3. **Second click**: Descending order (↓)
4. **Third click**: Return to default/unsorted (optional)
5. Visual indicator in header shows active sort
6. **Handled by parent**: Parent component manages sort state and data transformation

### Actions
1. **Row-level actions**: Dropdown menu in Actions column (⋮)
2. **Inline actions**: Icons/buttons for quick actions (assign, edit, delete)
3. **Batch actions**: Toolbar appears when rows selected (if checkboxes enabled)
4. **Action handlers**: Always provided by parent component

### Pagination
1. Located below table in separate component
2. Shows: "Showing X-Y of Z items"
3. Controls: Previous, Page numbers, Next
4. **Default page size**: 10-20 items (configurable)
5. **State management**: Parent component handles page state
6. Current page highlighted

### Sticky Columns
1. **First column default**: Sticky on horizontal scroll
2. **Header**: Sticky on vertical scroll
3. **Footer** (if present): Sticky at bottom during scroll
4. **Z-index layering**:
   - Header: z-30
   - Sticky column: z-10
   - Footer: z-20
   - Ensures proper overlap behavior

### Horizontal Scrolling
1. Minimum width enforced (prevents column collapse)
2. Overflow-x-auto on container
3. First column sticky with right border for separation
4. Smooth scrolling behavior
5. **Pink Heart Style**: Special formatting for ID columns (INV-, CP- prefixes)

## Column configuration:

### Column Definition (TableSystem):
```typescript
interface Column<T> {
  key: string;              // Unique identifier
  label: string;            // Display name in header
  render: (item: T) => ReactNode;  // Cell renderer
  sticky?: boolean;         // Enable sticky positioning
  className?: string;       // Cell-specific styles
  headerClassName?: string; // Header-specific styles
}
```

### Common Column Types:
1. **ID Column**: Sticky, bold font, clickable, auto-formatted (INV-, CP-)
2. **Status Column**: Badge/pill component, color-coded
3. **Date Column**: Formatted date strings, sortable
4. **Amount Column**: Right-aligned, currency formatted, bold
5. **User Column**: Avatar + name, or email
6. **Actions Column**: Right-aligned, dropdown menu, always visible

### Column Width Strategy:
- **Fixed layout**: `table-fixed` class with min-width
- **No explicit widths**: Columns auto-distribute available space
- **Overflow handling**: Text truncation with tooltips (not automatic)

## Component boundaries:

### Table System Responsibilities (TableSystem.tsx):
- Rendering table structure (header, body, footer)
- Sticky column positioning
- Empty state display
- Row hover effects
- **Pink Heart Style**: Special ID formatting for first column
- Basic layout and spacing

### Parent Component Responsibilities:
- **Data fetching and management**
- **Sorting logic** (sort state, transform data)
- **Filtering logic**
- **Pagination state** (current page, page size)
- **Action handlers** (onClick, onSort, onAssign, etc.)
- **Column definitions** (what to show, how to render)
- **Loading state management**
- **Modal/dialog management** (for row actions)

### Primitive Table Components (table.tsx):
- `Table`: Base table element with scrolling container
- `TableHeader`: Sticky header section
- `TableBody`: Scrollable body section
- `TableFooter`: Optional sticky footer
- `TableRow`: Individual row styling
- `TableHead`: Header cell styling
- `TableCell`: Body cell styling

These primitives provide:
- Consistent styling foundation
- Sticky positioning structure
- Accessible HTML semantics
- Ref forwarding for advanced use cases

## Supported features:

### Pagination
- **Implementation**: Separate component below table
- **Page size options**: Configurable (default 10-20)
- **Navigation**: First, Previous, Page numbers, Next, Last
- **Display**: "Showing X-Y of Z items"
- **State**: Managed by parent, passed as props

### Sorting
- **Single column sort**: One column active at a time
- **Sort directions**: Ascending, Descending, None
- **Visual indicator**: Arrow icon in header
- **Logic**: Handled by parent via `useSortedInvoices` or custom hook
- **Persistence**: Not persisted across sessions (parent responsibility)

### Sticky Elements
- **Sticky header**: Always visible during vertical scroll
- **Sticky first column**: Always visible during horizontal scroll
- **Sticky footer**: Always visible at bottom (when present)
- **Border separation**: Right border on sticky column

### Row Actions
- **Dropdown menu**: Three-dot menu (⋮) in Actions column
- **Inline actions**: Quick action buttons/icons in cells
- **Bulk actions**: Checkbox column + toolbar (if implemented)
- **Navigation**: Click row to view details

### Empty States
- Custom messages per context
- Maintains table structure
- Can include call-to-action (future enhancement)

### Loading States
- Skeleton screens with shimmer animation
- Preserves column count and structure
- Shows expected row count
- Prevents layout shift

## Design tokens:

### Colors
- **Table background**: `bg-white`
- **Header background**: `bg-[#F6F7F9]`
- **Row hover**: `hover:bg-gray-50`
- **Border (rows)**: `border-gray-50`
- **Border (sticky)**: `border-gray-200`
- **Text primary**: `text-gray-900`
- **Text secondary**: `text-gray-700`
- **Text muted**: `text-gray-600`

### Typography
- **Header**: font-semibold, text-sm, text-gray-700
- **Cell**: font-normal, text-sm, text-gray-900
- **Font family**: font-sans (system font stack)

### Spacing
- **Cell padding**: px-4 (16px horizontal)
- **Row height**: h-[65px]
- **Border radius**: rounded-xl (12px)

### Z-index layers
- **Header**: z-30 (highest)
- **Footer**: z-20
- **Sticky column**: z-10
- **Body**: z-0

## Constraints and limitations:

### Performance
- **Maximum recommended rows**: 50-100 visible rows before virtualization needed
- **Pagination required**: For datasets > 100 items
- **No built-in virtualization**: Consider react-window for very large datasets
- **Client-side operations**: Sorting, filtering happen in memory

### Responsive behavior
- **Not mobile-optimized**: Tables don't collapse gracefully
- **Minimum width enforced**: 1200px-2200px depending on table
- **Horizontal scrolling**: Required on small screens
- **Consider alternatives**: Card views for mobile/narrow screens

### Accessibility
- **Semantic HTML**: Proper `<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>` usage
- **Not implemented**: ARIA labels, keyboard navigation helpers
- **Not implemented**: Screen reader announcements for sort changes
- **Future enhancement**: Full ARIA support, focus management

### Browser support
- **Sticky positioning**: Requires modern browsers (IE11 not supported)
- **CSS Grid/Flexbox**: Modern browser features used
- **Tested on**: Chrome, Firefox, Safari, Edge (latest versions)

### Data handling
- **No built-in state**: Parent provides all data and handlers
- **Immutable data expected**: Parent should manage data updates
- **No built-in caching**: Parent handles memoization if needed
- **Type-safe**: Generic `<T>` for full TypeScript support

## Related components:

### TableSkeleton
- Loading state placeholder
- Maintains table structure during data fetch
- Configurable rows and columns
- Optional footer skeleton

### Pagination Components
- `InvoicesPagination`
- `PortalRecordsPagination`
- Separate from table, placed below
- Consistent styling across implementations

### Column-specific components
- **BadgePill**: Status indicators
- **Avatar**: User representations
- **Dropdown menus**: Action lists
- **Tooltips**: Additional context on hover

### Hooks
- `useSortedInvoices`: Sorting logic for invoices
- `usePortalRecordsTable`: Table state management for portal records
- Custom hooks per table implementation for specialized logic

## Implementation patterns:

### Basic Table (TableSystem)
```tsx
<TableSystem
  data={items}
  columns={columns}
  onRowClick={(item) => navigate(`/detail/${item.id}`)}
/>
```

### Complex Table (Custom Implementation)
```tsx
<Table>
  <TableHeader>
    <TableRow>
      {columns.map(col => <TableHead key={col.key}>{col.label}</TableHead>)}
    </TableRow>
  </TableHeader>
  <TableBody>
    {isLoading ? (
      <TableSkeleton rows={10} columns={columns.length} />
    ) : items.length === 0 ? (
      <EmptyState />
    ) : (
      items.map(item => <TableRow key={item.id}>...</TableRow>)
    )}
  </TableBody>
  <TableFooter>
    <TableRow>...</TableRow>
  </TableFooter>
</Table>
```

### Sticky Column Pattern
- First column gets `sticky left-0 z-10 bg-white border-r border-gray-200`
- Header for sticky column gets `bg-[#F6F7F9]` instead of `bg-white`
- Ensures proper layering and visual separation

## Best practices:

### Performance
1. Paginate large datasets (> 50 rows)
2. Memoize column definitions
3. Use `useMemo` for computed values
4. Avoid inline function definitions in renders
5. Consider virtualization for 500+ rows

### UX
1. Show loading skeletons, not spinners
2. Maintain table structure during loading
3. Provide clear empty states with context
4. Use sticky columns sparingly (first column only)
5. Keep action menus consistent across rows

### Accessibility
1. Use semantic HTML (`<table>`, not `<div>`)
2. Provide clear header labels
3. Ensure sufficient color contrast
4. Make row click targets large (65px height)
5. Support keyboard navigation

### Data Management
1. Parent owns all state
2. Table is purely presentational
3. Provide explicit handlers for all actions
4. Use TypeScript generics for type safety
5. Validate data before rendering

---

**Note**: This pattern documents the existing table implementation. Tables are composed of primitive components (`table.tsx`) and either use the `TableSystem` wrapper for simple cases or custom implementations for complex scenarios. Always refer to existing table implementations (InvoiceTable, PortalRecordsTable, PurchaseOrderTable) as reference examples.
