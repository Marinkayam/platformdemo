
import { 
  Sidebar, SidebarContent, SidebarHeader, SidebarFooter, 
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton,
  SidebarRail
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { LayoutDashboard, FileText, Globe, Brain, ShoppingCart, FileBox, HelpCircle } from "lucide-react";

export function AppSidebar() {
  const pathname = window.location.pathname;
  
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarRail />
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="text-purple-500">
            <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <span className="font-semibold text-xl text-gray-800">Monto</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Dashboard" 
              isActive={pathname === "/dashboard"}
              className="hover:bg-purple-50 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700"
            >
              <Link to="/dashboard">
                <LayoutDashboard size={18} className={pathname === "/dashboard" ? "text-purple-600" : "text-gray-600"} />
                <span className={pathname === "/dashboard" ? "text-purple-700 font-medium" : "text-gray-700"}>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Invoices" 
              isActive={pathname.includes("/invoices")}
              className="hover:bg-purple-50 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700"
            >
              <Link to="/invoices">
                <FileText size={18} className={pathname.includes("/invoices") ? "text-purple-600" : "text-gray-600"} />
                <span className={pathname.includes("/invoices") ? "text-purple-700 font-medium" : "text-gray-700"}>Invoices</span>
              </Link>
            </SidebarMenuButton>
            
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={pathname === "/invoices" && window.location.search.includes("pending")}
                  className="hover:text-purple-700 data-[active=true]:text-purple-700 data-[active=true]:font-medium"
                >
                  <Link to="/invoices?status=pending">Pending Actions</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={pathname === "/invoices" && window.location.search.includes("overdue")}
                  className="hover:text-purple-700 data-[active=true]:text-purple-700 data-[active=true]:font-medium"
                >
                  <Link to="/invoices?status=overdue">Overdue</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton 
                  asChild 
                  isActive={pathname === "/invoices" && window.location.search.includes("cleared")}
                  className="hover:text-purple-700 data-[active=true]:text-purple-700 data-[active=true]:font-medium"
                >
                  <Link to="/invoices?status=cleared">Cleared</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Portal Management" 
              isActive={pathname === "/portal-management"}
              className="hover:bg-purple-50 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700"
            >
              <Link to="/portal-management">
                <Globe size={18} className={pathname === "/portal-management" ? "text-purple-600" : "text-gray-600"} />
                <span className={pathname === "/portal-management" ? "text-purple-700 font-medium" : "text-gray-700"}>Portal Management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Smart Connections" 
              isActive={pathname === "/smart-connections"}
              className="hover:bg-purple-50 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700"
            >
              <Link to="/smart-connections">
                <Brain size={18} className={pathname === "/smart-connections" ? "text-purple-600" : "text-gray-600"} />
                <span className={pathname === "/smart-connections" ? "text-purple-700 font-medium" : "text-gray-700"}>Smart Connections</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Purchase Order" 
              isActive={pathname === "/purchase-order"}
              className="hover:bg-purple-50 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700"
            >
              <Link to="/purchase-order">
                <ShoppingCart size={18} className={pathname === "/purchase-order" ? "text-purple-600" : "text-gray-600"} />
                <span className={pathname === "/purchase-order" ? "text-purple-700 font-medium" : "text-gray-700"}>Purchase Order</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Portal Records" 
              isActive={pathname === "/portal-records"}
              className="hover:bg-purple-50 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700"
            >
              <Link to="/portal-records">
                <FileBox size={18} className={pathname === "/portal-records" ? "text-purple-600" : "text-gray-600"} />
                <span className={pathname === "/portal-records" ? "text-purple-700 font-medium" : "text-gray-700"}>Portal Records</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4 bg-white">
        <button className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:text-purple-700 rounded-md hover:bg-purple-50 transition-colors">
          <HelpCircle size={16} />
          <span>Need Help?</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
