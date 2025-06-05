import * as React from "react"
import { useState } from "react"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface EnhancedTableProps extends Omit<React.HTMLAttributes<HTMLTableElement>, 'onScroll'> {
  onScroll?: (scrolled: boolean) => void;
}

const EnhancedTable = React.forwardRef<
  HTMLTableElement,
  EnhancedTableProps
>(({ className, onScroll, ...props }, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrolled = e.currentTarget.scrollLeft > 0;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
      onScroll?.(scrolled);
    }
  };

  return (
    <div className="rounded-xl border overflow-hidden bg-white">
      <div 
        className="relative w-full overflow-x-auto"
        onScroll={handleScroll}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#e5e7eb transparent'
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            div::-webkit-scrollbar { height: 4px; }
            div::-webkit-scrollbar-track { background: transparent; }
            div::-webkit-scrollbar-thumb { 
              background-color: #e5e7eb; 
              border-radius: 2px; 
            }
            div::-webkit-scrollbar-thumb:hover { background-color: #d1d5db; }
          `
        }} />
        <table
          ref={ref}
          className={cn("w-full caption-bottom text-sm font-normal font-sans", className)}
          {...props}
        />
      </div>
    </div>
  )
})
EnhancedTable.displayName = "EnhancedTable"

const EnhancedTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("bg-[#F6F7F9] border-b border-gray-200", className)} {...props} />
))
EnhancedTableHeader.displayName = "EnhancedTableHeader"

const EnhancedTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("divide-y divide-gray-100 [&_tr:last-child]:border-0", className)}
    {...props}
  />
))
EnhancedTableBody.displayName = "EnhancedTableBody"

const EnhancedTableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-gray-200 bg-[#F6F7F9] font-semibold [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
EnhancedTableFooter.displayName = "EnhancedTableFooter"

const EnhancedTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    clickable?: boolean;
  }
>(({ className, clickable = false, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "h-[65px] border-b transition-colors bg-white",
      clickable && "hover:bg-gray-50 cursor-pointer",
      "data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
EnhancedTableRow.displayName = "EnhancedTableRow"

interface EnhancedTableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
  sticky?: boolean;
  isScrolled?: boolean;
}

const EnhancedTableHead = React.forwardRef<
  HTMLTableCellElement,
  EnhancedTableHeadProps
>(({ className, children, sortable, sortDirection, onSort, sticky, isScrolled, ...props }, ref) => {
  const getSortIcon = () => {
    if (!sortDirection) return <ArrowUpDown className="h-4 w-4" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="h-4 w-4" />
      : <ArrowDown className="h-4 w-4" />;
  };

  const content = sortable ? (
    <button
      onClick={onSort}
      className="flex items-center gap-2 hover:text-gray-900 transition-colors"
      aria-label={`Sort by ${children}`}
    >
      {children}
      {getSortIcon()}
    </button>
  ) : children;

  return (
    <th
      ref={ref}
      className={cn(
        "h-[65px] px-4 text-left align-middle font-semibold text-gray-700 text-sm min-w-[150px] font-sans [&:has([role=checkbox])]:pr-0",
        sticky && "sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 transition-shadow duration-200",
        sticky && isScrolled && "shadow-[2px_0_8px_rgba(0,0,0,0.15)]",
        className
      )}
      {...props}
    >
      {content}
    </th>
  )
})
EnhancedTableHead.displayName = "EnhancedTableHead"

const EnhancedTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    sticky?: boolean;
    isScrolled?: boolean;
  }
>(({ className, sticky, isScrolled, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "h-[65px] px-4 align-middle text-sm font-normal font-sans min-w-[150px] [&:has([role=checkbox])]:pr-0",
      sticky && "sticky left-0 z-10 bg-white border-r border-gray-100 transition-shadow duration-200",
      sticky && isScrolled && "shadow-[2px_0_8px_rgba(0,0,0,0.15)]",
      className
    )}
    {...props}
  />
))
EnhancedTableCell.displayName = "EnhancedTableCell"

const EnhancedTableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
EnhancedTableCaption.displayName = "EnhancedTableCaption"

export {
  EnhancedTable,
  EnhancedTableHeader,
  EnhancedTableBody,
  EnhancedTableFooter,
  EnhancedTableHead,
  EnhancedTableRow,
  EnhancedTableCell,
  EnhancedTableCaption,
}
