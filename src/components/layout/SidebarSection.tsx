import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { NavItem } from "@/data/navigation";
interface SidebarSectionProps {
  title?: string;
  items: NavItem[];
  className?: string;
}
export function SidebarSection({
  title,
  items,
  className
}: SidebarSectionProps) {
  const {
    pathname,
    search
  } = useLocation();
  const {
    state
  } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = useState(true);
  const isCollapsed = state === "collapsed";
  return <div className={cn("space-y-1", className)}>
      {title && !isCollapsed}
      
      <div className="space-y-1">
        {items.map(item => {
        const isActive = item.href ? pathname === item.href || pathname.includes(item.href) : false;
        const hasSubmenu = item.items && item.items.length > 0;
        if (hasSubmenu) {
          const isInvoicePendingActive = pathname === "/invoices" && search.includes("pending");
          const isInvoiceOverdueActive = pathname === "/invoices" && search.includes("overdue");
          const isInvoiceClearedActive = pathname === "/invoices" && search.includes("cleared");
          const isSubmenuActive = pathname.includes("/invoices");
          return <div key={item.title}>
                
                
                {!isCollapsed && <div className={cn("ml-6 mt-1 space-y-1 transition-all duration-300 overflow-hidden", openSubmenu ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
                    {item.items?.map(subItem => {
                const isSubActive = pathname === "/invoices" && (subItem.href?.includes("pending") && isInvoicePendingActive || subItem.href?.includes("overdue") && isInvoiceOverdueActive || subItem.href?.includes("cleared") && isInvoiceClearedActive);
                return <Link key={subItem.title} to={subItem.href || "#"} className={cn("block px-3 py-2 text-sm rounded-md transition-colors", "hover:text-purple-700 hover:bg-gray-50", isSubActive && "text-purple-700 font-semibold bg-purple-50")}>
                          {subItem.title}
                        </Link>;
              })}
                  </div>}
              </div>;
        }
        return <Link key={item.title} to={item.href || "#"} className={cn("flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors", "hover:bg-gray-100", isActive && "bg-purple-100 text-purple-700 font-semibold")}>
              {item.icon && <item.icon size={18} className={isActive ? "text-purple-600" : "text-gray-600"} />}
              {!isCollapsed && <span className={isActive ? "text-purple-700" : "text-gray-700"}>{item.title}</span>}
            </Link>;
      })}
      </div>
    </div>;
}