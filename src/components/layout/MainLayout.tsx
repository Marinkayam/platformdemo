
import { LogOut, Settings } from "lucide-react";
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
  const handleMyCompanyClick = () => {
    navigate("/workspace");
  };
  const handleSettingsClick = () => {
    navigate("/settings");
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
      <SidebarInset className="overflow-x-hidden">
        <header className="sticky top-0 z-50 h-16 bg-[#FAFAFA] border-b border-[#E4E5E9]">
          <div className="flex h-full items-center px-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            </div>
            <div className="flex-1">
              {/* Space for breadcrumbs or page title if needed */}
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
            {/* Hidden notifications for demo */}
            <div className="relative hidden">
              <div className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-300" style={{ backgroundColor: '#E6E7EB' }}>
                <NotificationsPopover />
              </div>
              <span className="absolute top-0 right-0 block w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[#FAFAFA]" />
            </div>
            {/* Hidden user settings for demo */}
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                 <button className="w-8 h-8 rounded-full flex items-center justify-center font-medium cursor-pointer hover:opacity-80 transition-opacity border border-gray-300" style={{ backgroundColor: '#EFEBFF', color: '#7B59FF' }}>
                   L
                 </button>
               </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">Lisa Smith</p>
                  <p className="text-xs text-muted-foreground">lisa.smith@example.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer py-2" onClick={handleMyCompanyClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                    <path d="M10 6h4"/>
                    <path d="M10 10h4"/>
                    <path d="M10 14h4"/>
                    <path d="M10 18h4"/>
                  </svg>
                  <span>My Company</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer py-2 hidden" onClick={handleSettingsClick}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                     <path d="m14.305 19.53.923-.382"/>
                     <path d="m15.228 16.852-.923-.383"/>
                     <path d="m16.852 15.228-.383-.923"/>
                     <path d="m16.852 20.772-.383.924"/>
                     <path d="m19.148 15.228.383-.923"/>
                     <path d="m19.53 21.696-.382-.924"/>
                     <path d="M2 21a8 8 0 0 1 10.434-7.62"/>
                     <path d="m20.772 16.852.924-.383"/>
                     <path d="m20.772 19.148.924.383"/>
                     <circle cx="10" cy="8" r="5"/>
                     <circle cx="18" cy="18" r="3"/>
                   </svg>
                   <span>Settings</span>
                 </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer py-2" onClick={handleLogout}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="m16 17 5-5-5-5"/>
                    <path d="M21 12H9"/>
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  </svg>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex-1 bg-white overflow-hidden">
          <div className="w-full h-full px-6 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-12 lg:py-16 overflow-x-hidden">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
      <ChatAIModal isOpen={isChatAIModalOpen} onClose={() => setIsChatAIModalOpen(false)} />
    </SidebarProvider>
  );
}
