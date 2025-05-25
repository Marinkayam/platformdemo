import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
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
  return <div className={cn("space-y-2", className)}>
      {title}
      
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
                <div className={cn("flex items-center gap-3 px-3 py-3 text-sm rounded-md transition-colors w-full", "text-[#3F4758] hover:bg-[#F4F4F7]", isSubmenuActive && "bg-[#F0EDFF] text-[#7B59FF] font-semibold")}>
                  {item.icon && <item.icon size={20} className={isSubmenuActive ? "text-[#7B59FF]" : "text-[#3F4758]"} />}
                  <span className="font-medium">{item.title}</span>
                </div>
                
                <div className="ml-8 mt-1 space-y-1">
                  {item.items?.map(subItem => {
                const isSubActive = pathname === "/invoices" && (subItem.href?.includes("pending") && isInvoicePendingActive || subItem.href?.includes("overdue") && isInvoiceOverdueActive || subItem.href?.includes("cleared") && isInvoiceClearedActive);
                return <Link key={subItem.title} to={subItem.href || "#"} className={cn("block px-3 py-2 text-sm rounded-md transition-colors", "text-[#3F4758] hover:bg-[#F4F4F7]", isSubActive && "text-[#7B59FF] font-semibold bg-[#F0EDFF]")}>
                        {subItem.title}
                      </Link>;
              })}
                </div>
              </div>;
        }
        return <Link key={item.title} to={item.href || "#"} className={cn("flex items-center gap-3 px-3 py-3 text-sm rounded-md transition-colors w-full", "text-[#3F4758] hover:bg-[#F4F4F7]", isActive && "bg-[#F0EDFF] text-[#7B59FF] font-semibold")}>
              {item.icon && <item.icon size={20} className={isActive ? "text-[#7B59FF]" : "text-[#3F4758]"} />}
              <span className="font-medium">{item.title}</span>
            </Link>;
      })}
      </div>
    </div>;
}