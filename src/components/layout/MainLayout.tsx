
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { ChatAIModal } from "@/components/ui/ChatAIModal";
import { useLayout } from "@/context/LayoutContext";

export function MainLayout() {
  const [isChatAIModalOpen, setIsChatAIModalOpen] = useState(false);
  const { headerVisible } = useLayout();

  const handleOpenChatAIModal = () => {
    setIsChatAIModalOpen(true);
  };

  return (
    <SidebarProvider>
      <AppSidebar onChatAIOpen={handleOpenChatAIModal} />
      <SidebarInset className="overflow-x-hidden h-screen flex flex-col">
        {headerVisible && (
          <header className="flex-shrink-0 sticky top-0 z-50 h-16 bg-[#FAFAFA] border-b border-[#E4E5E9]">
            <div className="flex h-full items-center px-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              </div>
              <div className="flex-1">
                {/* Space for breadcrumbs or page title if needed */}
              </div>
            </div>
          </header>
        )}
        {!headerVisible && (
          <div className="fixed top-4 left-4 z-[60] bg-white rounded-md shadow-lg border">
            <SidebarTrigger className="p-2" />
          </div>
        )}
        <main className="flex-1 bg-white overflow-y-auto min-h-0">
          <div className="w-full px-6 sm:px-8 md:px-12 lg:px-16 py-6 sm:py-8 md:py-12 lg:py-16">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
      <ChatAIModal isOpen={isChatAIModalOpen} onClose={() => setIsChatAIModalOpen(false)} />
    </SidebarProvider>
  );
}
