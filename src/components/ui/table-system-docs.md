
# Unified Table System Documentation

## Overview
This unified table system provides consistent styling, behavior, and functionality across all tables in the application. It includes enhanced accessibility, responsive design, and standardized interactions.

## Core Components

### 1. EnhancedTable
The main table wrapper with built-in scroll detection and shadow effects.

### 2. UnifiedStatusBadge
Standardized status badges that automatically detect context and apply appropriate styling.

### 3. TableTemplate
A complete table implementation with sorting, actions, and common patterns built-in.

## Usage Examples

### Basic Table Implementation
```tsx
import { TableTemplate, createStatusColumn, createCurrencyColumn } from "@/components/ui/table-template";

const MyTable = ({ data }) => {
  const columns = [
    { key: 'name', label: 'Name', sortable: true, sticky: true },
    createStatusColumn('status', 'Status', 'invoice'),
    createCurrencyColumn('total', 'Total Amount', 'currency'),
  ];

  return (
    <TableTemplate
      data={data}
      columns={columns}
      onRowClick={(item) => navigate(`/item/${item.id}`)}
      footerContent={`Total: ${data.length} items`}
    />
  );
};
```

### With Actions
```tsx
import { commonActions } from "@/components/ui/table-actions";

const TableWithActions = ({ data }) => {
  const getRowActions = (item) => [
    commonActions.view(() => navigate(`/view/${item.id}`)),
    commonActions.edit(() => setEditItem(item)),
    commonActions.delete(() => handleDelete(item.id))
  ];

  return (
    <TableTemplate
      data={data}
      columns={columns}
      getRowActions={getRowActions}
    />
  );
};
```

### Custom Column Rendering
```tsx
const customColumns = [
  {
    key: 'user',
    label: 'User',
    render: (user, item) => (
      <div className="flex items-center gap-2">
        <Avatar src={user.avatar} />
        <span>{user.name}</span>
      </div>
    )
  },
  {
    key: 'date',
    label: 'Date',
    render: (date) => format(new Date(date), 'MMM d, yyyy')
  }
];
```

## Migration Guide

### From Existing Tables
1. Replace `Table` imports with `EnhancedTable` components
2. Update status badges to use `UnifiedStatusBadge`
3. Add truncation with `TruncatedCell` for long content
4. Implement sorting with built-in `TableTemplate` if needed

### Example Migration
```tsx
// Before
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// After
import { 
  EnhancedTable, 
  EnhancedTableBody, 
  EnhancedTableCell, 
  EnhancedTableHead, 
  EnhancedTableHeader, 
  EnhancedTableRow 
} from "@/components/ui/enhanced-table";
```

## Features

### ✅ Accessibility
- ARIA labels on sortable headers
- Keyboard navigation support
- Screen reader optimizations
- Focus management

### ✅ Responsive Design
- Horizontal scroll with shadow indicators
- Sticky first column behavior
- Mobile-friendly touch interactions
- Consistent spacing across breakpoints

### ✅ Interactive Features
- Sortable headers with visual feedback
- Row hover states and click handlers
- Action menus with common patterns
- Tooltip system for truncated content

### ✅ Consistent Styling
- Unified color palette across all tables
- Standardized typography (Inter font family)
- Consistent row heights (65px)
- Harmonized status badge designs

## Status Badge Types
The `UnifiedStatusBadge` automatically detects context or you can specify:
- `invoice`: For invoice-related statuses
- `portal`: For portal record statuses  
- `purchase-order`: For PO statuses
- `smart-connection`: For connection statuses
- `auto`: Automatically detects (default)

## Best Practices
1. Always use sticky first columns for ID/name fields
2. Implement row actions for interactive tables
3. Add tooltips for truncated content
4. Use semantic column helpers when possible
5. Provide meaningful empty states
6. Include footer summaries for data tables
