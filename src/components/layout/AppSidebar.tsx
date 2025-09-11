import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarSeparator } from "@/components/ui/sidebar";
import { CompanyLogo } from "@/components/common/CompanyLogo";
import { SidebarSection } from "./SidebarSection";
import { SidebarUserProfile } from "./sidebar/SidebarUserProfile";
import { SidebarNotifications } from "./sidebar/SidebarNotifications";
import { HeaderToggle } from "./sidebar/HeaderToggle";
import { navMain, navUser } from "@/data/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import { useCompany } from "@/context/CompanyContext";

interface AppSidebarProps {
  onChatAIOpen: () => void;
}

export function AppSidebar({ onChatAIOpen }: AppSidebarProps) {
  const { state: sidebarState } = useSidebar();
  const { companyInfo } = useCompany();
  const isCollapsed = sidebarState === "collapsed";
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="z-40 w-64 bg-[#FAFAFA] border-r border-[#E4E5E9] transition-all duration-300">
      <SidebarHeader className="border-b border-[#E4E5E9] h-[64px] flex items-center justify-center p-0">
        {isCollapsed ? (
          <div className="flex items-center justify-center">
            <CompanyLogo collapsed={true} />
          </div>
        ) : (
          <div className="w-full flex items-center h-full px-6 gap-3">
            <CompanyLogo collapsed={false} />
            <span className="text-base font-normal text-foreground">{companyInfo.name || "Monto LTD"}</span>
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent className="bg-[#FAFAFA] overflow-y-auto transition-all duration-300 px-3 py-[24px]">
        <div className="space-y-6">
          <SidebarSection items={navMain} />
        </div>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-[#E4E5E9] px-3 py-4 bg-[#FAFAFA] space-y-3">
        <SidebarSection items={navUser} onChatAIOpen={onChatAIOpen} />
        <SidebarSeparator />
        <div className="space-y-2">
          <HeaderToggle />
          <SidebarNotifications />
          <SidebarUserProfile />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
