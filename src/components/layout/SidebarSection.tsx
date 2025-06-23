
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem, ChevronDownIcon } from "@/data/navigation";

interface SidebarSectionProps {
  title?: string;
  items: NavItem[];
  className?: string;
  onChatAIOpen?: () => void;
}

export function SidebarSection({
  title,
  items,
  className,
  onChatAIOpen
}: SidebarSectionProps) {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Initialize expanded items based on current page
  useEffect(() => {
    if (pathname.includes("/invoices")) {
      setExpandedItems(prev => new Set(prev).add("RTPs"));
    } else if (pathname.includes("/portal-records")) {
      setExpandedItems(prev => new Set(prev).add("Portal Records"));
    } else if (pathname.includes("/purchase-orders")) {
      setExpandedItems(prev => new Set(prev).add("Purchase Orders"));
    } else if (pathname.includes("/payments-relationships")) {
      setExpandedItems(prev => new Set(prev).add("Payments Relationships"));
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

  const handleItemClick = (item: NavItem) => {
    if (item.items && item.items.length > 0) {
      toggleExpanded(item.title);
      if (item.href) {
        navigate(item.href);
      }
    }
  };

  const isItemActive = (item: NavItem) => {
    if (item.href) {
      return pathname === item.href || pathname.includes(item.href.split('?')[0]);
    }
    return false;
  };

  const getSubItemActiveState = (item: NavItem, subItem: NavItem) => {
    const basePath = subItem.href?.split('?')[0] || '';
    const query = subItem.href?.split('?')[1] || '';
    
    if (item.title === "RTPs") {
      if (subItem.href === "/invoices" && pathname === "/invoices" && !search) return true;
      if (query && search.includes(query.split('=')[1])) return true;
    } else if (item.title === "Portal Records") {
      if (subItem.href === "/portal-records" && pathname === "/portal-records" && !search) return true;
      if (query && search.includes(query.split('=')[1])) return true;
    } else if (item.title === "Purchase Orders") {
      if (subItem.href === "/purchase-orders" && pathname === "/purchase-orders" && !search) return true;
      if (query && search.includes(query.split('=')[1])) return true;
    } else if (item.title === "Payments Relationships") {
      if (subItem.href === "/payments-relationships" && pathname === "/payments-relationships" && !search) return true;
      if (query && search.includes(query.split('=')[1])) return true;
    }
    
    return false;
  };

  return (
    <div className={cn("space-y-2", className)}>
      {title}
      
      <div className="space-y-1">
        {items.map(item => {
          const isActive = isItemActive(item);
          const hasSubmenu = item.items && item.items.length > 0;
          const isExpanded = expandedItems.has(item.title);

          if (hasSubmenu) {
            return (
              <div key={item.title}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "flex items-center justify-between gap-3 px-3 py-3 text-sm font-normal rounded-md transition-colors w-full text-left",
                    "text-[#3F4758] hover:bg-[#F4F4F7]",
                    isActive && "bg-[#F0EDFF] text-[#7B59FF] font-normal"
                  )}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && (
                      <item.icon 
                        size={20} 
                        className={isActive ? "text-[#7B59FF]" : "text-[#3F4758]"} 
                        strokeWidth={1.5}
                      />
                    )}
                    <span className="font-normal">{item.title}</span>
                  </div>
                  <ChevronDownIcon 
                    size={16} 
                    className={cn(
                      "transition-transform duration-200",
                      isExpanded ? "rotate-180" : "rotate-0",
                      isActive ? "text-[#7B59FF]" : "text-[#3F4758]"
                    )}
                    strokeWidth={1.5}
                  />
                </button>
                
                {isExpanded && (
                  <div className="ml-8 mt-1 space-y-1 transition-all duration-200">
                    {item.items?.map(subItem => {
                      const isSubActive = getSubItemActiveState(item, subItem);
                      
                      return (
                        <Link 
                          key={subItem.title} 
                          to={subItem.href || "#"} 
                          className={cn(
                            "block px-3 py-2 text-sm font-normal rounded-md transition-colors text-left",
                            "text-[#3F4758] hover:bg-[#F4F4F7]",
                            isSubActive && "text-[#7B59FF] font-normal bg-[#F0EDFF]"
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
              key={item.id || item.title} 
              to={item.href || "#"} 
              className={cn(
                "flex items-center gap-3 px-3 py-3 text-sm font-normal rounded-md transition-colors w-full text-left",
                "text-[#3F4758] hover:bg-[#F4F4F7]",
                isActive && "bg-[#F0EDFF] text-[#7B59FF] font-normal"
              )}
              onClick={item.id === "chat-ai-nav" && onChatAIOpen ? onChatAIOpen : undefined}
            >
              {item.icon && (
                typeof item.icon === 'function' 
                  ? item.icon({ size: 20, className: isActive ? "text-[#7B59FF]" : "text-[#3F4758]", strokeWidth: 1.5 })
                  : React.createElement(item.icon, { size: 20, className: isActive ? "text-[#7B59FF]" : "text-[#3F4758]", strokeWidth: 1.5 })
              )}
              {item.title && <span className="font-normal">{item.title}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
