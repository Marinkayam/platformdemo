import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useBreadcrumbs, BreadcrumbItem } from "@/utils/breadcrumbUtils";
import { cn } from "@/lib/utils";

interface UniversalBreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
  separator?: React.ReactNode;
  extraParams?: Record<string, any>;
}

export function UniversalBreadcrumb({
  items,
  showHome = true,
  className = "",
  separator = <ChevronRight className="h-3 w-3 text-gray-400" />,
  extraParams
}: UniversalBreadcrumbProps) {
  const location = useLocation();
  const generatedItems = useBreadcrumbs(extraParams);
  const breadcrumbItems = items || generatedItems;

  // Don't show breadcrumbs on home/dashboard
  if (location.pathname === '/' || location.pathname === '/dashboard') {
    return null;
  }

  return (
    <nav
      className={cn(
        "flex items-center space-x-1 text-sm text-gray-600",
        className
      )}
      aria-label="Breadcrumb"
    >
      {showHome && (
        <>
          <Link
            to="/dashboard"
            className="flex items-center hover:text-primary transition-colors"
            aria-label="Home"
          >
            <Home className="h-4 w-4" />
          </Link>
          {breadcrumbItems.length > 0 && separator}
        </>
      )}

      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && separator}
          {item.href && !item.isActive ? (
            <Link
              to={item.href}
              className="hover:text-primary transition-colors truncate max-w-[200px]"
              title={item.label}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={cn(
                "truncate max-w-[200px]",
                item.isActive
                  ? "text-gray-900 font-medium"
                  : "text-gray-600"
              )}
              aria-current={item.isActive ? "page" : undefined}
              title={item.label}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// Wrapper component for pages that need breadcrumbs in the header
export function PageWithBreadcrumb({
  children,
  breadcrumbItems,
  className = "",
  showBreadcrumb = true
}: {
  children: React.ReactNode;
  breadcrumbItems?: BreadcrumbItem[];
  className?: string;
  showBreadcrumb?: boolean;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {showBreadcrumb && (
        <div className="mb-4">
          <UniversalBreadcrumb items={breadcrumbItems} />
        </div>
      )}
      {children}
    </div>
  );
}