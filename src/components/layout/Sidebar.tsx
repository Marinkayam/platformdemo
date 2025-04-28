
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Clock, 
  CheckSquare, 
  AlertCircle, 
  Globe, 
  Brain, 
  ShoppingCart,  
  FileBox
} from "lucide-react";

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ href, icon, label, active }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const SidebarSubItem = ({ href, label, active }: Omit<SidebarItemProps, "icon">) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center pl-10 py-1.5 rounded-md text-sm transition-colors",
        active
          ? "text-primary font-medium"
          : "text-sidebar-foreground hover:text-primary"
      )}
    >
      {label}
    </Link>
  );
};

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = window.location.pathname;
  
  return (
    <aside className={cn("w-[220px] border-r bg-sidebar flex flex-col h-screen sticky top-0", className)}>
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="text-primary">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="font-semibold text-xl">Monto</span>
        </div>
      </div>
      
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          <SidebarItem
            href="/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            active={pathname === "/dashboard"}
          />
          
          <div className="pt-2">
            <SidebarItem
              href="/invoices"
              icon={<FileText size={18} />}
              label="Invoices"
              active={pathname.includes("/invoices")}
            />
            <div className="mt-1 space-y-1">
              <SidebarSubItem 
                href="/invoices/overdue" 
                label="Overdue" 
                active={pathname === "/invoices/overdue"} 
              />
              <SidebarSubItem 
                href="/invoices/pending" 
                label="Pending Actions" 
                active={pathname === "/invoices/pending"} 
              />
              <SidebarSubItem 
                href="/invoices/cleared" 
                label="Cleared" 
                active={pathname === "/invoices/cleared"} 
              />
            </div>
          </div>
          
          <SidebarItem
            href="/portal-management"
            icon={<Globe size={18} />}
            label="Portal Management"
            active={pathname === "/portal-management"}
          />
          
          <SidebarItem
            href="/smart-connections"
            icon={<Brain size={18} />}
            label="Smart Connections"
            active={pathname === "/smart-connections"}
          />
          
          <SidebarItem
            href="/purchase-order"
            icon={<ShoppingCart size={18} />}
            label="Purchase Order"
            active={pathname === "/purchase-order"}
          />
          
          <SidebarItem
            href="/portal-records"
            icon={<FileBox size={18} />}
            label="Portal Records"
            active={pathname === "/portal-records"}
          />
        </nav>
      </div>
      
      <div className="p-4 border-t mt-auto">
        <button className="w-full flex items-center justify-center gap-2 py-2 text-sm text-sidebar-foreground hover:text-primary">
          <span>Need Help?</span>
        </button>
      </div>
    </aside>
  );
}
