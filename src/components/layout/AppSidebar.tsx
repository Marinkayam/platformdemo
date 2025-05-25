
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import MontoLogo from "@/components/MontoLogo";
import { SidebarSection } from "./SidebarSection";
import { navMain, navUser } from "@/data/navigation";

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" className="w-64 bg-[#FAFAFA] border-r border-[#E4E5E9] transition-all duration-300">
      <SidebarHeader className="border-b border-[#E4E5E9] px-4 pt-6 pb-4 py-[16px]">
        <div className="flex items-center">
          <MontoLogo className="w-[104px] h-[31px]" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#FAFAFA] overflow-y-auto transition-all duration-300 px-4 py-4">
        <div className="space-y-6">
          <SidebarSection items={navMain} />
        </div>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-[#E4E5E9] px-4 py-4 bg-[#FAFAFA]">
        <SidebarSection items={navUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
