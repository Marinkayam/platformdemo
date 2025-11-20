# SelectableCard Component

A reusable card component with selection and interactive hover states, part of the Monto design system.

## Overview

The `SelectableCard` component provides a consistent, interactive card interface with built-in selection states, hover effects, and accessibility features. It's designed for scenarios where users need to select from multiple options presented in a card layout.

## Features

- ✅ Consistent styling with border, shadow, and padding
- ✅ Interactive hover effects with shadow transition
- ✅ Selection state with primary border highlight
- ✅ Disabled state support
- ✅ Fully accessible with click handlers
- ✅ Composable with sub-components for structured content

## Components

### SelectableCard
Main container with selection and hover states.

**Props:**
- `selected?: boolean` - Whether the card is currently selected
- `onSelect?: () => void` - Callback when card is clicked
- `disabled?: boolean` - Whether the card is disabled
- `className?: string` - Additional CSS classes
- Standard HTML div attributes

### SelectableCardContent
Content wrapper with consistent spacing between fields.

### SelectableCardField
Wrapper for label/value pairs within the card.

### SelectableCardLabel
Label text with consistent styling (small, gray, medium weight).

### SelectableCardValue
Value text with consistent styling (small, dark gray).

## Usage Examples

### Basic Usage

```tsx
import {
  SelectableCard,
  SelectableCardContent,
  SelectableCardField,
  SelectableCardLabel,
  SelectableCardValue,
} from "@/components/ui/selectable-card"

function InvoiceSelector() {
  const [selectedId, setSelectedId] = useState("")

  return (
    <SelectableCard
      selected={selectedId === "inv-1"}
      onSelect={() => setSelectedId("inv-1")}
    >
      <SelectableCardContent>
        <SelectableCardField>
          <SelectableCardLabel>Invoice Number</SelectableCardLabel>
          <SelectableCardValue>INV-001</SelectableCardValue>
        </SelectableCardField>
        <SelectableCardField>
          <SelectableCardLabel>Amount</SelectableCardLabel>
          <SelectableCardValue>$1,234.56</SelectableCardValue>
        </SelectableCardField>
      </SelectableCardContent>
    </SelectableCard>
  )
}
```

### Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {items.map((item) => (
    <SelectableCard
      key={item.id}
      selected={selectedId === item.id}
      onSelect={() => setSelectedId(item.id)}
    >
      <SelectableCardContent>
        <SelectableCardField>
          <SelectableCardLabel>Name</SelectableCardLabel>
          <SelectableCardValue>{item.name}</SelectableCardValue>
        </SelectableCardField>
      </SelectableCardContent>
    </SelectableCard>
  ))}
</div>
```

### With Custom Content

```tsx
<SelectableCard
  selected={isSelected}
  onSelect={handleSelect}
>
  <div className="space-y-3">
    <h3 className="text-sm font-bold">{title}</h3>
    <p className="text-xs text-gray-500">{description}</p>
    <div className="flex gap-2">
      <Badge>{status}</Badge>
    </div>
  </div>
</SelectableCard>
```

### Disabled State

```tsx
<SelectableCard
  disabled={!isAvailable}
  onSelect={handleSelect}
>
  <SelectableCardContent>
    {/* content */}
  </SelectableCardContent>
</SelectableCard>
```

## Styling

The component uses the following design tokens:

- **Border:** `border-gray-200` (default), `border-primary` with `border-2` (selected)
- **Border Radius:** `rounded-lg`
- **Padding:** `p-4`
- **Shadow:** `shadow-sm` (default), `shadow-md` (hover)
- **Background:** `bg-white`
- **Transition:** `transition-all` for smooth state changes

### Hover States

- Border changes to `border-primary/30`
- Shadow increases to `shadow-md`

### Selection States

- Border becomes `border-primary` with `border-2` thickness
- No background color change (maintains white)

## Accessibility

- Keyboard accessible (inherits div click behavior)
- Visual feedback for all states
- Disabled state prevents interaction
- Cursor changes appropriately (pointer, not-allowed)

## Design System Integration

This component is part of the Monto UI design system and follows established patterns:

- Consistent with other card components
- Uses standard color palette
- Maintains spacing scale
- Follows interaction patterns

## Related Components

- `Card` - Basic card component without selection
- `Badge` - For status indicators within cards
- `Button` - For actions within cards

## When to Use

Use `SelectableCard` when you need to:
- Present multiple options for user selection
- Show structured data in a selectable format
- Create invoice/record selection interfaces
- Build comparison or choice interfaces

## When Not to Use

Don't use `SelectableCard` when:
- You need a simple container (use `Card` instead)
- Selection isn't required (use `Card` instead)
- You need complex nested interactions (consider custom component)
- You need multi-step forms (consider wizard pattern)
