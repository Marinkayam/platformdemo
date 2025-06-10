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

interface Column<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
  sticky?: boolean;
  className?: string; // For applying column-specific styles
}

interface TableSystemProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  rowClassName?: string;
}

export function TableSystem<T>({ data, columns, className, rowClassName }: TableSystemProps<T>) {
  return (
    <div className={cn("rounded-xl border border-gray-200 overflow-hidden bg-white", className)}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "py-4", // Consistent padding
                    column.sticky && "sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200",
                    column.className
                  )}
                >
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-[65px] text-center text-sm text-gray-600 py-2 align-middle bg-white">
                  No data found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item: T, rowIndex) => (
                <TableRow
                  key={rowIndex} // Using rowIndex as a fallback key
                  className={cn("hover:bg-gray-50 cursor-pointer transition-colors bg-white", rowClassName)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={cn(
                        "px-4 py-4", // Consistent padding from InvoiceTableRow
                        column.sticky && "sticky left-0 z-10 bg-white border-r border-gray-100",
                        column.className
                      )}
                    >
                      {column.render(item)}
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