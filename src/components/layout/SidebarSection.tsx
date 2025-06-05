
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem, ChevronDownIcon } from "@/data/navigation";

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
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Initialize Invoices as expanded if user is on invoices page
  useEffect(() => {
    if (pathname.includes("/invoices")) {
      setExpandedItems(prev => new Set(prev).add("RTPs"));
    }
  }, [pathname]);

  const toggleExpanded = (itemTitle: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemTitle)) {
        newSet.delete(itemTitle);
      } else {
        newSet.add(itemTitle);
      }
      return newSet;
    });
  };

  const handleRTPsClick = () => {
    toggleExpanded("RTPs");
    navigate("/invoices");
  };

  return (
    <div className={cn("space-y-2", className)}>
      {title}
      
      <div className="space-y-1">
        {items.map(item => {
          const isActive = item.href ? pathname === item.href || pathname.includes(item.href) : false;
          const hasSubmenu = item.items && item.items.length > 0;
          const isExpanded = expandedItems.has(item.title);

          if (hasSubmenu) {
            const isAllRTPsActive = pathname === "/invoices" && !search;
            const isInvoicePendingActive = pathname === "/invoices" && search.includes("pending");
            const isInvoiceOverdueActive = pathname === "/invoices" && search.includes("overdue");
            const isInvoiceSettledActive = pathname === "/invoices" && search.includes("settled");
            const isSubmenuActive = pathname.includes("/invoices");

            return (
              <div key={item.title}>
                <button
                  onClick={item.title === "RTPs" ? handleRTPsClick : () => toggleExpanded(item.title)}
                  className={cn(
                    "flex items-center justify-between gap-3 px-3 py-3 text-sm rounded-md transition-colors w-full",
                    "text-[#3F4758] hover:bg-[#F4F4F7]",
                    isSubmenuActive && "bg-[#F0EDFF] text-[#7B59FF] font-semibold"
                  )}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && (
                      <item.icon 
                        size={20} 
                        className={isSubmenuActive ? "text-[#7B59FF]" : "text-[#3F4758]"} 
                      />
                    )}
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <ChevronDownIcon 
                    size={16} 
                    className={cn(
                      "transition-transform duration-200",
                      isExpanded ? "rotate-180" : "rotate-0",
                      isSubmenuActive ? "text-[#7B59FF]" : "text-[#3F4758]"
                    )}
                  />
                </button>
                
                {isExpanded && (
                  <div className="ml-8 mt-1 space-y-1 transition-all duration-200">
                    {item.items?.map(subItem => {
                      const isSubActive = pathname === "/invoices" && (
                        (subItem.href === "/invoices" && isAllRTPsActive) ||
                        (subItem.href?.includes("pending") && isInvoicePendingActive) ||
                        (subItem.href?.includes("overdue") && isInvoiceOverdueActive) ||
                        (subItem.href?.includes("settled") && isInvoiceSettledActive)
                      );
                      
                      return (
                        <Link 
                          key={subItem.title} 
                          to={subItem.href || "#"} 
                          className={cn(
                            "block px-3 py-2 text-sm rounded-md transition-colors",
                            "text-[#3F4758] hover:bg-[#F4F4F7]",
                            isSubActive && "text-[#7B59FF] font-semibold bg-[#F0EDFF]"
                          )}
                        >
                          {subItem.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link 
              key={item.title} 
              to={item.href || "#"} 
              className={cn(
                "flex items-center gap-3 px-3 py-3 text-sm rounded-md transition-colors w-full",
                "text-[#3F4758] hover:bg-[#F4F4F7]",
                isActive && "bg-[#F0EDFF] text-[#7B59FF] font-semibold"
              )}
            >
              {item.icon && (
                <item.icon 
                  size={20} 
                  className={isActive ? "text-[#7B59FF]" : "text-[#3F4758]"} 
                />
              )}
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
