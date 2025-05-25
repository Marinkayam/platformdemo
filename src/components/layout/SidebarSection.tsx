
import { useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { CustomSettings } from "@/components/icons/CustomSettings";
import { CustomBell } from "@/components/icons/CustomBell";
import { CustomHeartHandshake } from "@/components/icons/CustomHeartHandshake";
import { NavItem } from "@/data/navigation";

interface SidebarSectionProps {
  items: NavItem[];
}

export function SidebarSection({ items }: SidebarSectionProps) {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const getCustomIcon = (iconName: string) => {
    switch (iconName) {
      case 'Settings':
        return CustomSettings;
      case 'Bell':
        return CustomBell;
      case 'HeartHandshake':
        return CustomHeartHandshake;
      default:
        return null;
    }
  };

  return (
    <nav className="space-y-5">
      {items.map((item) => {
        const isActive = location.pathname === item.href;
        const isExpanded = expandedItems.includes(item.title);
        const hasSubItems = item.items && item.items.length > 0;
        
        const CustomIcon = getCustomIcon(item.title) || item.icon;

        return (
          <div key={item.title}>
            <div className="flex items-center justify-between">
              <a
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors flex-1 ${
                  isActive
                    ? "bg-[#7C3AED] text-white"
                    : "text-[#01173E] hover:bg-[#F3F4F6]"
                }`}
              >
                {CustomIcon && <CustomIcon size={20} />}
                <span className="font-medium">{item.title}</span>
              </a>
              
              {hasSubItems && (
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className="p-1 rounded hover:bg-[#F3F4F6] transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown size={16} className="text-[#01173E]" />
                  ) : (
                    <ChevronRight size={16} className="text-[#01173E]" />
                  )}
                </button>
              )}
            </div>
            
            {hasSubItems && isExpanded && (
              <div className="ml-6 mt-2 space-y-2">
                {item.items.map((subItem) => {
                  const isSubActive = location.pathname === subItem.href;
                  return (
                    <a
                      key={subItem.title}
                      href={subItem.href}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        isSubActive
                          ? "bg-[#7C3AED] text-white"
                          : "text-[#01173E] hover:bg-[#F3F4F6]"
                      }`}
                    >
                      {subItem.title}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
