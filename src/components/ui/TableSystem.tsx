
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/**
 * 🩷 Pink Heart Table System
 * Premium table design with sticky columns, consistent styling, and smooth interactions
 * To use this style, mention "🩷" and get "🩷🩷" confirmation
 */

interface Column<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
  sticky?: boolean;
  className?: string; // For applying column-specific styles
  headerClassName?: string; // Separate styling for header cells
}

interface TableSystemProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  rowClassName?: string;
  onRowClick?: (item: T, index: number) => void;
}

export function TableSystem<T>({ data, columns, className, rowClassName, onRowClick }: TableSystemProps<T>) {
  return (
    <div className={cn("rounded-xl border overflow-hidden bg-white animate-fade-in", className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
              {columns.map((column, index) => {
                // Remove bg-white from className for headers to prevent override
                const headerClassName = column.className?.replace('bg-white', '') || '';
                
                return (
                  <TableHead
                    key={column.key}
                    className={cn(
                      "h-[50px] px-4 text-left align-middle font-semibold text-gray-700 text-sm",
                      // 🩷 Pink Heart Style: First column gets special treatment
                      index === 0 && column.sticky && "bg-[rgb(246,247,249)] sticky left-0 z-10 border-r border-gray-200",
                      !column.sticky && "bg-[#F6F7F9]",
                      column.headerClassName || headerClassName
                    )}
                  >
                    {column.label}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-[65px] text-center text-sm text-gray-600 py-2 align-middle bg-white">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item: T, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={cn("hover:bg-gray-50 transition-colors bg-white", rowClassName)}
                  onClick={onRowClick ? () => onRowClick(item, rowIndex) : undefined}
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={column.key}
                      className={cn(
                        "px-4 py-3 text-sm text-gray-900",
                        // 🩷 Pink Heart Style: Sticky column with proper layering
                        colIndex === 0 && column.sticky && "sticky left-0 z-10 bg-white border-r border-gray-200",
                        column.className
                      )}
                    >
                      {/* Apply special formatting for INV- and CP- prefixes */}
                      {colIndex === 0 && typeof column.render(item) === 'string' ? (
                        <span className={cn(
                          "cursor-pointer hover:underline",
                          (column.render(item) as string).toLowerCase().startsWith('inv-') || 
                          (column.render(item) as string).toLowerCase().startsWith('cp-') 
                            ? 'font-semibold' 
                            : ''
                        )}>
                          {column.render(item)}
                        </span>
                      ) : (
                        column.render(item)
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
