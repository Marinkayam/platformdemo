import { LogOut } from "lucide-react";
import { NotificationsPopover } from "../notifications/NotificationsPopover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { ChatAIModal } from "@/components/ui/ChatAIModal";

export function MainLayout() {
  const navigate = useNavigate();
  const [isChatAIModalOpen, setIsChatAIModalOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate("/login");
  };
  const handleMyWorkspaceClick = () => {
    navigate("/workspace");
  };
  const handleLogoClick = () => {
    navigate("/design-system");
  };
  const handleOpenChatAIModal = () => {
    setIsChatAIModalOpen(true);
  };

  return (
    <SidebarProvider>
      <AppSidebar onChatAIOpen={handleOpenChatAIModal} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-[#FAFAFA] border-b border-[#E4E5E9]">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            {/* You can add breadcrumbs or page title here if needed */}
          </div>
          <div className="flex items-center gap-3 ml-auto pr-4">
            <div className="relative">
              <NotificationsPopover />
              <span className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#FAFAFA]" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-medium cursor-pointer hover:bg-purple-200 transition-colors">
                  M
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">User Profile</p>
                  <p className="text-xs text-muted-foreground">user@example.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleMyWorkspaceClick}>
                  <span>My Workspace</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 bg-white min-h-0">
          <div className="px-2 sm:px-4 md:px-6 py-3 bg-white max-w-[1440px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
      <ChatAIModal isOpen={isChatAIModalOpen} onClose={() => setIsChatAIModalOpen(false)} />
    </SidebarProvider>
  );
}
