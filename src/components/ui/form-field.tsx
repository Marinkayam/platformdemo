/**
 * FormField Component
 *
 * A read-only form field component for displaying labeled data values.
 * Used throughout the application for consistent display of financial data,
 * portal records, and other read-only information.
 *
 * Features:
 * - Light gray background (bg-gray-50)
 * - Subtle border (border-gray-200)
 * - 14px label text (text-sm text-gray-500)
 * - Regular weight value text (text-sm text-gray-900)
 * - Rounded corners with padding
 *
 * Usage:
 * ```tsx
 * <FormField label="Invoice Number" value="INV-2024-001" />
 * <FormField label="Total Amount" value="$1,234.56" />
 * ```
 */

interface FormFieldProps {
  label: string;
  value: string;
}

export function FormField({ label, value }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-sm text-gray-900 bg-gray-50 rounded-md py-2 px-3 border border-gray-200">
        {value}
      </div>
    </div>
  );
}
