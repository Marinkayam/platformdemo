
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import { MontoLogo } from "@/components/MontoLogo";
import { SidebarSection } from "./SidebarSection";
import { navMain, navUser } from "@/data/navigation";

interface AppSidebarProps {
  onChatAIOpen: () => void;
}

export function AppSidebar({ onChatAIOpen }: AppSidebarProps) {
  return (
    <Sidebar variant="sidebar" className="w-64 bg-[#FAFAFA] border-r border-[#E4E5E9] transition-all duration-300">
      {/* Use px-6 for the logo to match nav icon alignment */}
      <SidebarHeader className="border-b border-[#E4E5E9] h-[64px] flex items-center justify-start p-0">
        <div className="w-full flex items-center h-full px-6">
          <MontoLogo className="w-[94px] h-[28px] block" />
        </div>
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
