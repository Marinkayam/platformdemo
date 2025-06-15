import { LogOut } from "lucide-react";
import { NotificationsPopover } from "../notifications/NotificationsPopover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { ChatAIModal } from "@/components/ui/ChatAIModal";

interface MainLayoutProps {
  // children: React.ReactNode; // Removed children prop
}
export function MainLayout({
  // children // Removed children prop
}: MainLayoutProps) {
  const navigate = useNavigate();
  const [isChatAIModalOpen, setIsChatAIModalOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, you would clear auth tokens/state here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    // Redirect to login page
    navigate("/login");
  };
  const handleMyWorkspaceClick = () => {
    navigate("/settings");
  };
  const handleLogoClick = () => {
    navigate("/design-system");
  };
  const handleOpenChatAIModal = () => {
    setIsChatAIModalOpen(true);
  };

  return <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar onChatAIOpen={handleOpenChatAIModal} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-[64px] border-b px-4 flex items-center justify-between gap-3 bg-zinc-50 py-0 my-0">
            <div className="flex items-center gap-2">
              <button onClick={handleLogoClick} className="hover:opacity-80 transition-opacity">
                
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <NotificationsPopover />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-medium cursor-pointer hover:bg-purple-200 transition-colors">
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
          
          <main className="flex-1 overflow-y-auto bg-white">
            <div className="px-8 py-4 bg-white">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <ChatAIModal isOpen={isChatAIModalOpen} onClose={() => setIsChatAIModalOpen(false)} />
    </SidebarProvider>;
}
