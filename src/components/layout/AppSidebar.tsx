import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { CompanyLogo } from "@/components/common/CompanyLogo";
import { SidebarSection } from "./SidebarSection";
import { navMain, navUser } from "@/data/navigation";
import { useSidebar } from "@/components/ui/sidebar";

interface AppSidebarProps {
  onChatAIOpen: () => void;
}

export function AppSidebar({ onChatAIOpen }: AppSidebarProps) {
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="z-50 w-64 bg-[#FAFAFA] border-r border-[#E4E5E9] transition-all duration-300">
      <SidebarHeader className="border-b border-[#E4E5E9] h-[64px] flex items-center justify-center p-0">
        {isCollapsed ? (
          <div className="flex items-center justify-center">
            <CompanyLogo collapsed={true} />
          </div>
        ) : (
          <div className="w-full flex items-center h-full px-6 gap-3">
            <CompanyLogo collapsed={false} />
            <span className="text-base font-normal text-foreground">Monto</span>
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent className="bg-[#FAFAFA] overflow-y-auto transition-all duration-300 px-3 py-[24px]">
        <div className="space-y-6">
          <SidebarSection items={navMain} />
        </div>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-[#E4E5E9] px-3 py-4 bg-[#FAFAFA]">
        <SidebarSection items={navUser} onChatAIOpen={onChatAIOpen} />
      </SidebarFooter>
    </Sidebar>
  );
}
