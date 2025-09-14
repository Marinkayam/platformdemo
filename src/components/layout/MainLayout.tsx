
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
        <div className="flex-shrink-0 sticky top-0 z-50 h-12">
          <div className="flex h-full items-center px-4">
            <SidebarTrigger className="p-1.5 h-8 w-8 hover:bg-gray-100 rounded-md" />
            {headerVisible && (
              <div className="flex-1 ml-4">
                {/* Space for breadcrumbs or page title if needed */}
              </div>
            )}
          </div>
        </div>
        <main className="flex-1 bg-white overflow-y-auto min-h-0">
          <div className="w-full px-8 py-6">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
      <ChatAIModal isOpen={isChatAIModalOpen} onClose={() => setIsChatAIModalOpen(false)} />
    </SidebarProvider>
  );
}
