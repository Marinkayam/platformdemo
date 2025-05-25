
import { 
  Sidebar, SidebarContent, SidebarHeader, SidebarFooter, 
  SidebarTrigger, useSidebar
} from "@/components/ui/sidebar";
import MontoLogo from "@/components/MontoLogo";
import MontoIcon from "@/components/MontoIcon";
import { SidebarSection } from "./SidebarSection";
import { navMain, navUser } from "@/data/navigation";

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  return (
    <Sidebar 
      variant="sidebar" 
      collapsible="icon" 
      className="bg-[#FAFAFA] border-r border-[#E4E5E9] transition-all duration-300"
    >
      <SidebarHeader className="border-b border-[#E4E5E9] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isCollapsed ? (
              <MontoIcon className="w-6 h-6" />
            ) : (
              <MontoLogo className="w-[104px] h-[31px]" />
            )}
          </div>
          <SidebarTrigger className="ml-auto text-[#7B59FF] hover:bg-[#F0EDFF] transition-colors" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#FAFAFA] overflow-y-auto transition-all duration-300 p-4">
        <div className="space-y-6">
          <SidebarSection title="Platform" items={navMain} />
        </div>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-[#E4E5E9] p-4 bg-[#FAFAFA]">
        <SidebarSection items={navUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
