
import { Sidebar } from "./Sidebar";
import { Bell, Settings } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b px-4 flex items-center justify-end gap-3 bg-white">
          <button className="p-2 rounded-full hover:bg-slate-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2 rounded-full hover:bg-slate-100">
            <Settings size={20} />
          </button>
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-medium">
            M
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
