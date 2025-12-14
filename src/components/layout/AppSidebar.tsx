import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarSeparator } from "@/components/ui/sidebar";
import { CompanyLogo } from "@/components/common/CompanyLogo";
import { SidebarSection } from "./SidebarSection";
import { SidebarUserProfile } from "./sidebar/SidebarUserProfile";
import { SidebarNotifications } from "./sidebar/SidebarNotifications";
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
    <Sidebar variant="sidebar" collapsible="icon" className="z-40 w-64 bg-white border-r border-[#E4E5E9] transition-all duration-300">
      <SidebarHeader className="border-b border-[#E4E5E9] h-[64px] flex items-center justify-start p-0">
        <div className={`flex items-center gap-3 mt-[10px] ${isCollapsed ? 'justify-center w-full' : '-ml-[100px]'}`}>
          {isCollapsed ? (
            <CompanyLogo collapsed={true} />
          ) : (
            <>
              <CompanyLogo collapsed={false} />
              <span className="text-base font-semibold text-foreground">{companyInfo.name || "Monto LTD"}</span>
            </>
          )}
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-white overflow-y-auto transition-all duration-300 px-3 py-[24px]">
        <div className="space-y-6">
          <SidebarSection items={navMain} />
        </div>
        <div className="mt-auto space-y-2">
          <SidebarNotifications />
          <SidebarUserProfile />
        </div>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-[#E4E5E9] px-3 py-4 bg-white space-y-3">
        <SidebarSection items={navUser} onChatAIOpen={onChatAIOpen} />
      </SidebarFooter>
    </Sidebar>
  );
}
