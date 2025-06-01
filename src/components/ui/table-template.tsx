
import * as React from "react"
import { useState } from "react"
import {
  EnhancedTable,
  EnhancedTableBody,
  EnhancedTableCell,
  EnhancedTableFooter,
  EnhancedTableHead,
  EnhancedTableHeader,
  EnhancedTableRow,
} from "./enhanced-table"
import { UnifiedStatusBadge } from "./unified-status-badge"
import { TruncatedCell, EnhancedTooltipProvider } from "./enhanced-tooltip"
import { TableActions, type TableAction } from "./table-actions"
import { formatCurrency } from "@/lib/utils"

interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  width?: string;
  sticky?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

interface TableTemplateProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (item: T) => void;
  getRowActions?: (item: T) => TableAction[];
  emptyMessage?: string;
  footerContent?: React.ReactNode;
}

export function TableTemplate<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  getRowActions,
  emptyMessage = "No data found.",
  footerContent
}: TableTemplateProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleScroll = (scrolled: boolean) => {
    setIsScrolled(scrolled);
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key!];
      const bVal = b[sortConfig.key!];
      
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <EnhancedTooltipProvider>
      <EnhancedTable onScroll={handleScroll}>
        <EnhancedTableHeader>
          <EnhancedTableRow>
            {columns.map((column, index) => (
              <EnhancedTableHead
                key={String(column.key)}
                sortable={column.sortable}
                sortDirection={sortConfig.key === column.key ? sortConfig.direction : null}
                onSort={() => column.sortable && handleSort(column.key)}
                sticky={column.sticky || index === 0}
                isScrolled={isScrolled}
                style={{ width: column.width }}
              >
                {column.label}
              </EnhancedTableHead>
            ))}
            {getRowActions && (
              <EnhancedTableHead className="w-[80px] text-center">
                Actions
              </EnhancedTableHead>
            )}
          </EnhancedTableRow>
        </EnhancedTableHeader>
        
        <EnhancedTableBody>
          {sortedData.length === 0 ? (
            <EnhancedTableRow>
              <EnhancedTableCell 
                colSpan={columns.length + (getRowActions ? 1 : 0)} 
                className="text-center text-gray-600 align-middle"
              >
                {emptyMessage}
              </EnhancedTableCell>
            </EnhancedTableRow>
          ) : (
            sortedData.map((item, index) => (
              <EnhancedTableRow
                key={index}
                clickable={!!onRowClick}
                onClick={() => onRowClick?.(item)}
              >
                {columns.map((column, colIndex) => {
                  const value = item[column.key];
                  const renderedValue = column.render ? column.render(value, item) : value;
                  
                  return (
                    <EnhancedTableCell
                      key={String(column.key)}
                      sticky={column.sticky || colIndex === 0}
                      isScrolled={isScrolled}
                    >
                      {column.render ? (
                        renderedValue
                      ) : (
                        <TruncatedCell>{String(value)}</TruncatedCell>
                      )}
                    </EnhancedTableCell>
                  );
                })}
                {getRowActions && (
                  <EnhancedTableCell className="text-center">
                    <div onClick={(e) => e.stopPropagation()}>
                      <TableActions actions={getRowActions(item)} />
                    </div>
                  </EnhancedTableCell>
                )}
              </EnhancedTableRow>
            ))
          )}
        </EnhancedTableBody>

        {footerContent && (
          <EnhancedTableFooter>
            <EnhancedTableRow>
              <EnhancedTableCell 
                colSpan={columns.length + (getRowActions ? 1 : 0)}
                className="text-left text-sm text-muted-foreground bg-[#F6F7F9]"
              >
                {footerContent}
              </EnhancedTableCell>
            </EnhancedTableRow>
          </EnhancedTableFooter>
        )}
      </EnhancedTable>
    </EnhancedTooltipProvider>
  );
}

// Helper functions for common table patterns
export const createStatusColumn = <T,>(
  key: keyof T,
  label: string = "Status",
  type?: "invoice" | "portal" | "purchase-order" | "smart-connection"
): TableColumn<T> => ({
  key,
  label,
  sortable: true,
  render: (status: string) => <UnifiedStatusBadge status={status} type={type} />
});

export const createCurrencyColumn = <T,>(
  key: keyof T,
  label: string = "Amount",
  currencyKey?: keyof T
): TableColumn<T> => ({
  key,
  label,
  sortable: true,
  render: (amount: number, item: T) => {
    const currency = currencyKey ? String(item[currencyKey]) : 'USD';
    return <span className="font-medium">{formatCurrency(amount, currency)}</span>;
  }
});

export const createTruncatedColumn = <T,>(
  key: keyof T,
  label: string,
  maxWidth: string = "200px"
): TableColumn<T> => ({
  key,
  label,
  sortable: true,
  render: (value: any) => <TruncatedCell maxWidth={maxWidth}>{String(value)}</TruncatedCell>
});
