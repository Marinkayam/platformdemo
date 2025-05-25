import { Settings, LogOut } from "lucide-react";
import { NotificationsPopover } from "../notifications/NotificationsPopover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
interface MainLayoutProps {
  children: React.ReactNode;
}
export function MainLayout({
  children
}: MainLayoutProps) {
  const navigate = useNavigate();
  const handleLogout = () => {
    // In a real app, you would clear auth tokens/state here
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    // Redirect to homepage or login page
    navigate("/");
  };
  return <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-[64px] border-b px-6 flex items-center justify-between gap-3 bg-white">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
            </div>
            
            <div className="flex items-center gap-3">
              <NotificationsPopover />
              
              <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                <Settings size={20} />
              </button>
              
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
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto bg-white">
            <div className="px-8 py-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>;
}