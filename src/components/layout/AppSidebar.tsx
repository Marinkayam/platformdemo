
import { 
  Sidebar, SidebarContent, SidebarHeader, SidebarFooter, 
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton,
  SidebarRail
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LayoutDashboard, FileText, Globe, Brain, ShoppingCart, FileBox } from "lucide-react";

export function AppSidebar() {
  const pathname = window.location.pathname;
  
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarRail />
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="text-primary">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="font-semibold text-xl">Monto</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard" isActive={pathname === "/dashboard"}>
              <Link to="/dashboard">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Invoices" isActive={pathname.includes("/invoices")}>
              <Link to="/invoices">
                <FileText size={18} />
                <span>Invoices</span>
              </Link>
            </SidebarMenuButton>
            
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={pathname === "/invoices" && window.location.search.includes("pending")}
                >
                  <Link to="/invoices?status=pending">Pending Actions</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={pathname === "/invoices" && window.location.search.includes("overdue")}
                >
                  <Link to="/invoices?status=overdue">Overdue</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={pathname === "/invoices" && window.location.search.includes("cleared")}
                >
                  <Link to="/invoices?status=cleared">Cleared</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Portal Management" isActive={pathname === "/portal-management"}>
              <Link to="/portal-management">
                <Globe size={18} />
                <span>Portal Management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Smart Connections" isActive={pathname === "/smart-connections"}>
              <Link to="/smart-connections">
                <Brain size={18} />
                <span>Smart Connections</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Purchase Order" isActive={pathname === "/purchase-order"}>
              <Link to="/purchase-order">
                <ShoppingCart size={18} />
                <span>Purchase Order</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Portal Records" isActive={pathname === "/portal-records"}>
              <Link to="/portal-records">
                <FileBox size={18} />
                <span>Portal Records</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <button className="w-full flex items-center justify-center gap-2 py-2 text-sm text-sidebar-foreground hover:text-primary">
          <span>Need Help?</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
