
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
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
        {/* Floating sidebar trigger when header is hidden */}
        {!headerVisible && (
          <div className="absolute top-4 left-4 z-50">
            <SidebarTrigger className="p-1.5 h-8 w-8 bg-white hover:bg-gray-100 rounded-md shadow-sm border" />
          </div>
        )}
        {headerVisible && (
          <header className="flex-shrink-0 sticky top-0 z-50 h-16 bg-[#FAFAFA] border-b border-[#E4E5E9]">
            <div className="flex h-full items-center px-4">
              <SidebarTrigger className="p-1.5 h-8 w-8 hover:bg-gray-100 rounded-md" />
              <div className="flex-1">
                {/* Space for breadcrumbs or page title if needed */}
              </div>
            </div>
          </header>
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
