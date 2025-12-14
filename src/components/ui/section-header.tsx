import React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Main title of the section */
  title: string;
  /** Optional subtitle/description text */
  subtitle?: string;
  /** Optional className for the container */
  className?: string;
  /** Filter components to render in the filters row */
  filters?: React.ReactNode;
  /** Show search field */
  showSearch?: boolean;
  /** Search value (controlled) */
  searchValue?: string;
  /** Search change handler */
  onSearchChange?: (value: string) => void;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Optional action button(s) to render on the right side of the title */
  actions?: React.ReactNode;
  /** Size variant */
  size?: "default" | "compact";
}

/**
 * SectionHeader Component
 *
 * A reusable header component for sections with title, subtitle, filters, and search.
 * Follows Monto design system patterns for consistent styling across the platform.
 *
 * @example
 * // Basic usage
 * <SectionHeader
 *   title="Associate Portal Records"
 *   subtitle="Select an RTP from the suggestions below."
 * />
 *
 * @example
 * // With filters and search
 * <SectionHeader
 *   title="Request-to-Pay"
 *   subtitle="Manage your payment requests."
 *   filters={
 *     <>
 *       <DataTableFacetedFilter title="Status" options={statusOptions} ... />
 *       <DataTableFacetedFilter title="Buyer" options={buyerOptions} ... />
 *     </>
 *   }
 *   showSearch
 *   searchValue={search}
 *   onSearchChange={setSearch}
 * />
 */
export function SectionHeader({
  title,
  subtitle,
  className,
  filters,
  showSearch = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  actions,
  size = "default",
}: SectionHeaderProps) {
  const handleClearSearch = () => {
    onSearchChange?.("");
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Title Row */}
      <div className="flex items-start justify-between gap-4">
        <div className={cn("space-y-1", size === "compact" && "space-y-0.5")}>
          <h2 className={cn(
            "font-semibold text-foreground",
            size === "default" ? "text-lg" : "text-base"
          )}>
            {title}
          </h2>
          {subtitle && (
            <p className={cn(
              "text-muted-foreground",
              size === "default" ? "text-sm" : "text-xs"
            )}>
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex-shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Filters Row */}
      {(filters || showSearch) && (
        <div className="flex items-center gap-2 flex-wrap">
          {/* Filter components slot */}
          {filters}

          {/* Search field */}
          {showSearch && (
            <div className={cn("relative", filters ? "ml-auto" : "")}>
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 h-9 w-[200px] bg-white"
              />
              {searchValue && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="absolute right-1 top-1.5 h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * SectionHeaderCard Component
 *
 * A variant that wraps the section header in a card container with border and background.
 * Use this when the section needs visual separation from surrounding content.
 */
interface SectionHeaderCardProps extends SectionHeaderProps {
  /** Content to render below the header */
  children?: React.ReactNode;
}

export function SectionHeaderCard({
  children,
  className,
  ...props
}: SectionHeaderCardProps) {
  return (
    <div className={cn(
      "border border-border rounded-lg p-6 bg-background",
      className
    )}>
      <div className="space-y-6">
        <SectionHeader {...props} />
        {children}
      </div>
    </div>
  );
}
