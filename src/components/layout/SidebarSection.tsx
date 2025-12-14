import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavItem, ChevronDownIcon } from "@/data/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";

  // Initialize expanded items based on current page
  useEffect(() => {
    if (pathname.includes("/invoices")) {
      setExpandedItems(prev => new Set(prev).add("Request-to-Pay"));
    } else if (pathname.includes("/portal-records") || pathname.includes("/purchase-orders") || pathname.includes("/portals-dashboard")) {
      setExpandedItems(prev => new Set(prev).add("Portals Dashboard"));
    } else if (pathname.includes("/smart-connections") || pathname.includes("/scan-agents")) {
      setExpandedItems(prev => new Set(prev).add("Connection Hub"));
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
      const basePath = item.href.split('?')[0];
      // Check exact match or if current path starts with the href (for detail pages)
      return pathname === item.href || pathname === basePath || pathname.startsWith(basePath + '/');
    }
    return false;
  };

  const getSubItemActiveState = (parentItem: NavItem, subItem: NavItem) => {
    const basePath = subItem.href?.split('?')[0] || '';
    const query = subItem.href?.split('?')[1] || '';

    if (parentItem.title === "Request-to-Pay") {
      if (subItem.href === "/invoices" && pathname === "/invoices" && !search) return true;
      if (subItem.href === "/invoices" && pathname.startsWith("/invoices/")) return true;
      if (query && search.includes(query.split('=')[1])) return true;
    } else if (parentItem.title === "Portals Dashboard") {
      // Check exact match or if on a detail page
      if (pathname === basePath || pathname.startsWith(basePath + '/')) return true;
    } else if (parentItem.title === "Connection Hub") {
      if (pathname === basePath || pathname.startsWith(basePath + '/')) return true;
    }

    return false;
  };

  const renderSubMenu = (item: NavItem, level: number = 1) => {
    const isExpanded = expandedItems.has(item.title);
    const hasSubmenu = item.items && item.items.length > 0;
    const marginLeft = level === 1 ? "ml-8" : "ml-12"; // Increase indentation for nested levels

    if (!isExpanded || !hasSubmenu) return null;

    return (
      <div className={cn(marginLeft, "mt-1 space-y-1 transition-all duration-200")}>
        {item.items?.map(subItem => {
          const isSubActive = getSubItemActiveState(item, subItem);
          const hasNestedSubmenu = subItem.items && subItem.items.length > 0;
          
          if (hasNestedSubmenu) {
            const isSubExpanded = expandedItems.has(subItem.title);
            
            return (
              <div key={subItem.title}>
                <button
                  onClick={() => handleItemClick(subItem)}
                  className={cn(
                    "flex items-center justify-between gap-2 px-3 py-2 text-sm font-normal rounded-md transition-colors w-full text-left",
                    "text-[#3F4758] hover:bg-[#F4F4F7]",
                    isSubActive && "text-[#7B59FF] font-normal bg-[#EFEBFF]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {subItem.icon && React.createElement(subItem.icon, {
                      size: 16,
                      className: isSubActive ? "text-[#7B59FF]" : "text-[#3F4758]",
                      strokeWidth: 1.5
                    })}
                    <span className="font-normal">{subItem.title}</span>
                  </div>
                  <ChevronDownIcon 
                    size={14} 
                    className={cn(
                      "transition-transform duration-200",
                      isSubExpanded ? "rotate-180" : "rotate-0",
                      isSubActive ? "text-[#7B59FF]" : "text-[#3F4758]"
                    )}
                  />
                </button>
                {renderSubMenu(subItem, level + 1)}
              </div>
            );
          }
          
          return (
            <Link 
              key={subItem.title} 
              to={subItem.href || "#"} 
              className={cn(
                "block px-3 py-2 text-sm font-normal rounded-md transition-colors text-left",
                "text-[#3F4758] hover:bg-[#F4F4F7]",
                isSubActive && "text-[#7B59FF] font-normal bg-[#EFEBFF]"
              )}
            >
              {subItem.title}
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      {title}
      
      <div className="space-y-3">
        {items.map(item => {
          const isActive = isItemActive(item);
          const hasSubmenu = item.items && item.items.length > 0;
          const isExpanded = expandedItems.has(item.title);

          if (isCollapsed) {
            // Only render top-level icons with tooltips in collapsed mode
            return (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      if (item.href) navigate(item.href);
                      if (item.title === "AI Chat" && onChatAIOpen) onChatAIOpen();
                    }}
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg transition-colors",
                      isActive ? "bg-[#EFEBFF] text-[#7B59FF]" : "text-[#3F4758] hover:bg-[#F4F4F7]"
                    )}
                  >
                    {item.icon && React.createElement(item.icon, {
                      size: 19,
                      className: isActive ? "text-[#7B59FF]" : "text-[#3F4758]",
                      strokeWidth: 1.5
                    })}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" align="center">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            );
          }

          if (hasSubmenu) {
            return (
              <div key={item.title}>
                <button
                  onClick={() => handleItemClick(item)}
                  className={cn(
                    "flex items-center justify-between gap-3 px-3 py-3 text-sm font-normal rounded-md transition-colors w-full text-left",
                    "text-[#3F4758] hover:bg-[#F4F4F7]",
                    isActive && "bg-[#EFEBFF] text-[#7B59FF] font-normal"
                  )}
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && React.createElement(item.icon, {
                      size: 16,
                      className: isActive ? "text-[#7B59FF]" : "text-[#3F4758]",
                      strokeWidth: 1.5
                    })}
                    <span className="font-normal">{item.title}</span>
                  </div>
                  <ChevronDownIcon 
                    size={16} 
                    className={cn(
                      "transition-transform duration-200",
                      isExpanded ? "rotate-180" : "rotate-0",
                      isActive ? "text-[#7B59FF]" : "text-[#3F4758]"
                    )}
                  />
                </button>
                
                {renderSubMenu(item)}
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
                isActive && "bg-[#EFEBFF] text-[#7B59FF] font-normal",
                item.hidden && "opacity-0"
              )}
              onClick={item.id === "chat-ai-nav" && onChatAIOpen ? onChatAIOpen : undefined}
            >
              {item.icon && React.createElement(item.icon, {
                size: 16,
                className: isActive ? "text-[#7B59FF]" : "text-[#3F4758]",
                strokeWidth: 1.5
              })}
              {item.title && <span className="font-normal">{item.title}</span>}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
