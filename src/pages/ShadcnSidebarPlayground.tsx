import React, { useState } from "react";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarTrigger } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { MontoLogo } from "@/components/MontoLogo";
import { navMain, navUser } from "@/data/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@/data/navigation";

function SidebarNavSection({ items, collapsed }: { items: any[]; collapsed: boolean }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const handleExpand = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="space-y-1">
      {items.map((item) => {
        const isActive = item.href && (pathname === item.href || pathname.startsWith(item.href));
        const hasSubmenu = item.items && item.items.length > 0;
        const isExpanded = expanded[item.title];
        if (collapsed) {
          return (
            <div key={item.title} className="flex flex-col items-center">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      if (hasSubmenu) {
                        handleExpand(item.title);
                        if (item.href) navigate(item.href);
                      } else if (item.href) {
                        navigate(item.href);
                      }
                    }}
                    className={`flex flex-col items-center justify-center w-12 h-12 my-1 rounded-md transition-colors
                      ${isActive ? "bg-[#F0EDFF] text-[#7B59FF]" : "text-[#3F4758] hover:bg-[#F4F4F7]"}`}
                  >
                    {item.icon && (
                      typeof item.icon === 'function'
                        ? item.icon({ size: 16, className: isActive ? "text-[#7B59FF]" : "text-[#3F4758]", strokeWidth: 1.5 })
                        : React.createElement(item.icon, { size: 16, className: isActive ? "text-[#7B59FF]" : "text-[#3F4758]", strokeWidth: 1.5 })
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">{item.title}</TooltipContent>
              </Tooltip>
              {hasSubmenu && (
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleExpand(item.title)}
                      className={`flex items-center justify-center w-6 h-6 rounded transition-colors mt-0.5
                        ${isExpanded ? "text-[#7B59FF]" : "text-[#3F4758] hover:bg-[#F4F4F7]"}`}
                    >
                      <ChevronDownIcon
                        size={16}
                        className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}`}
                      />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title} menu</TooltipContent>
                </Tooltip>
              )}
              {/* Collapsed submenu: show as a vertical list of icons if expanded */}
              {hasSubmenu && isExpanded && (
                <div className="flex flex-col items-center mt-1">
                  {item.items.map((subItem: any) => {
                    const isSubActive = subItem.href && (pathname === subItem.href || pathname.startsWith(subItem.href));
                    return (
                      <Tooltip key={subItem.title} delayDuration={0}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => subItem.href && navigate(subItem.href)}
                            className={`w-10 h-10 my-0.5 rounded-md flex items-center justify-center transition-colors
                              ${isSubActive ? "bg-[#F0EDFF] text-[#7B59FF]" : "text-[#3F4758] hover:bg-[#F4F4F7]"}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7B59FF]" style={{ opacity: isSubActive ? 1 : 0.3 }} />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="right">{subItem.title}</TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }
        // Expanded sidebar
        return (
          <div key={item.title}>
            <button
              onClick={() => {
                if (hasSubmenu) {
                  handleExpand(item.title);
                  if (item.href) navigate(item.href);
                } else if (item.href) {
                  navigate(item.href);
                }
              }}
              className={`flex items-center gap-3 px-3 py-3 text-sm font-normal rounded-md transition-colors w-full text-left
                ${isActive ? "bg-[#F0EDFF] text-[#7B59FF]" : "text-[#3F4758] hover:bg-[#F4F4F7]"}`}
              style={{ minHeight: 44 }}
            >
              {item.icon && (
                typeof item.icon === 'function'
                  ? item.icon({ size: 16, className: isActive ? "text-[#7B59FF]" : "text-[#3F4758]", strokeWidth: 1.5 })
                  : React.createElement(item.icon, { size: 16, className: isActive ? "text-[#7B59FF]" : "text-[#3F4758]", strokeWidth: 1.5 })
              )}
              <span className="font-normal flex-1 text-left truncate">{item.title}</span>
              {hasSubmenu && (
                <ChevronDownIcon
                  size={16}
                  className={`transition-transform duration-200 ml-auto ${isExpanded ? "rotate-180" : "rotate-0"} ${isActive ? "text-[#7B59FF]" : "text-[#3F4758]"}`}
                />
              )}
            </button>
            {/* Submenu */}
            {hasSubmenu && isExpanded && (
              <div className="ml-8 mt-1 space-y-1 transition-all duration-200">
                {item.items.map((subItem: any) => {
                  const isSubActive = subItem.href && (pathname === subItem.href || pathname.startsWith(subItem.href));
                  return (
                    <button
                      key={subItem.title}
                      onClick={() => subItem.href && navigate(subItem.href)}
                      className={`block px-3 py-2 text-sm font-normal rounded-md transition-colors text-left w-full
                        ${isSubActive ? "text-[#7B59FF] bg-[#F0EDFF]" : "text-[#3F4758] hover:bg-[#F4F4F7]"}`}
                    >
                      {subItem.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ShadcnSidebarPlayground() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const collapsed = !sidebarOpen;

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar
          variant="sidebar"
          className={`transition-all duration-300 border-r border-[#E4E5E9] ${collapsed ? "w-14 min-w-[56px] max-w-[56px] bg-red-100" : "w-64 min-w-[256px] max-w-[256px] bg-[#FAFAFA]"}`}
          style={collapsed ? { width: 56, minWidth: 56, maxWidth: 56, background: '#fecaca', borderRight: '2px solid #7B59FF', display: 'flex', flexDirection: 'column', alignItems: 'center' } : {}}
        >
          {/* Debug: Always show a test icon at the top */}
          <div className="w-full flex items-center justify-center py-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#7B59FF" />
            </svg>
          </div>
          <SidebarHeader className="border-b border-[#E4E5E9] h-[64px] flex items-center justify-center p-0">
            <div className={`flex items-center ${collapsed ? "justify-center w-full" : "gap-2 w-full h-full px-4"}`}>
              {!collapsed && <MontoLogo className="w-[94px] h-[28px] block" />}
            </div>
          </SidebarHeader>
          <SidebarContent className={`overflow-y-auto transition-all duration-300 ${collapsed ? "px-1" : "px-3 py-[24px]"}`}>
            <SidebarNavSection items={navMain} collapsed={collapsed} />
          </SidebarContent>
          <SidebarFooter className={`border-t border-[#E4E5E9] ${collapsed ? "px-1 py-2" : "px-3 py-4"}` + (collapsed ? " bg-red-100" : " bg-[#FAFAFA]") }>
            <SidebarNavSection items={navUser} collapsed={collapsed} />
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top header with SidebarTrigger */}
          <header className="h-[64px] border-b px-4 flex items-center justify-between gap-3 bg-zinc-50 py-0 my-0">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="mr-2" />
              <span className="font-semibold text-lg text-[#061237]">Sidebar Playground</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Placeholder for notifications and user menu */}
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-medium cursor-pointer">M</div>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-white">
            <div className="px-8 py-4 bg-white">
              <h1 className="text-2xl font-bold mb-4">shadcn/ui Sidebar Playground</h1>
              <p>Try collapsing/expanding the sidebar and navigating. All icons, colors, and logic are preserved from your current design system.</p>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
} 