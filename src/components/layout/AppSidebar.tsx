
import { useState } from "react";
import { 
  Sidebar, SidebarContent, SidebarHeader, SidebarFooter, 
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
  SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton,
  SidebarRail, SidebarTrigger, useSidebar
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Globe, Brain, ShoppingCart, FileBox, HelpCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import MontoLogo from "@/components/MontoLogo";

export function AppSidebar() {
  const { pathname, search } = useLocation();
  const { state } = useSidebar();
  const [openSubmenu, setOpenSubmenu] = useState(true);
  
  // Check if current path is invoices with specific status query
  const isInvoicePendingActive = pathname === "/invoices" && search.includes("pending");
  const isInvoiceOverdueActive = pathname === "/invoices" && search.includes("overdue");
  const isInvoiceClearedActive = pathname === "/invoices" && search.includes("cleared");
  
  const isCollapsed = state === "collapsed";
  
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="bg-[#FAFAFA] border-r border-gray-200">
      <SidebarRail />
      
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {!isCollapsed && (
              <>
                <MontoLogo className="w-[104px] h-[31px]" />
              </>
            )}
            {isCollapsed && (
              <div className="text-purple-500 flex items-center justify-center w-8 h-8">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
            )}
          </div>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#FAFAFA] min-w-[220px] overflow-y-auto transition-all duration-300">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Dashboard" 
              isActive={pathname === "/dashboard"}
              className="hover:bg-gray-100 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700 py-2 px-4 transition-colors"
            >
              <Link to="/dashboard">
                <LayoutDashboard size={18} className={pathname === "/dashboard" ? "text-purple-600" : "text-gray-600"} />
                <span className={pathname === "/dashboard" ? "text-purple-700 font-semibold" : "text-gray-700"}>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem className="mt-1">
            <SidebarMenuButton 
              asChild 
              tooltip="Invoices" 
              isActive={pathname.includes("/invoices")}
              className="hover:bg-gray-100 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700 py-2 px-4 justify-between transition-colors"
              onClick={() => !isCollapsed && setOpenSubmenu(!openSubmenu)}
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText size={18} className={pathname.includes("/invoices") ? "text-purple-600" : "text-gray-600"} />
                  <span className={pathname.includes("/invoices") ? "text-purple-700 font-semibold" : "text-gray-700"}>Invoices</span>
                </div>
                {!isCollapsed && (
                  <ChevronDown className={cn("h-4 w-4 transition-transform", openSubmenu && "rotate-180")} />
                )}
              </div>
            </SidebarMenuButton>
            
            {!isCollapsed && (
              <SidebarMenuSub className={cn("transition-all duration-300 overflow-hidden", 
                openSubmenu ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isInvoicePendingActive}
                    className="hover:text-purple-700 hover:bg-gray-50 data-[active=true]:text-purple-700 data-[active=true]:font-semibold data-[active=true]:bg-purple-50 py-2 transition-colors"
                  >
                    <Link to="/invoices?status=pending">Pending Actions</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isInvoiceOverdueActive}
                    className="hover:text-purple-700 hover:bg-gray-50 data-[active=true]:text-purple-700 data-[active=true]:font-semibold data-[active=true]:bg-purple-50 py-2 transition-colors"
                  >
                    <Link to="/invoices?status=overdue">Overdue</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton 
                    asChild 
                    isActive={isInvoiceClearedActive}
                    className="hover:text-purple-700 hover:bg-gray-50 data-[active=true]:text-purple-700 data-[active=true]:font-semibold data-[active=true]:bg-purple-50 py-2 transition-colors"
                  >
                    <Link to="/invoices?status=cleared">Cleared</Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            )}
          </SidebarMenuItem>
          
          <SidebarMenuItem className="mt-6">
            <SidebarMenuButton 
              asChild 
              tooltip="Portal Management" 
              isActive={pathname === "/portal-management"}
              className="hover:bg-gray-100 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700 py-2 px-4 transition-colors"
            >
              <Link to="/portal-management">
                <Globe size={18} className={pathname === "/portal-management" ? "text-purple-600" : "text-gray-600"} />
                <span className={pathname === "/portal-management" ? "text-purple-700 font-semibold" : "text-gray-700"}>Portal Management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem className="mt-1">
            <SidebarMenuButton 
              asChild 
              tooltip="Smart Connections" 
              isActive={pathname === "/smart-connections"}
              className="hover:bg-gray-100 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700 py-2 px-4 transition-colors"
            >
              <Link to="/smart-connections">
                <Brain size={18} className={pathname === "/smart-connections" ? "text-purple-600" : "text-gray-600"} />
                <span className={pathname === "/smart-connections" ? "text-purple-700 font-semibold" : "text-gray-700"}>Smart Connections</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem className="mt-6">
            <SidebarMenuButton 
              asChild 
              tooltip="Purchase Order" 
              isActive={pathname === "/purchase-order"}
              className="hover:bg-gray-100 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700 py-2 px-4 transition-colors"
            >
              <Link to="/purchase-order">
                <ShoppingCart size={18} className={pathname === "/purchase-order" ? "text-purple-600" : "text-gray-600"} />
                <span className={pathname === "/purchase-order" ? "text-purple-700 font-semibold" : "text-gray-700"}>Purchase Order</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem className="mt-1">
            <SidebarMenuButton 
              asChild 
              tooltip="Portal Records" 
              isActive={pathname === "/portal-records"}
              className="hover:bg-gray-100 data-[active=true]:bg-purple-100 data-[active=true]:text-purple-700 py-2 px-4 transition-colors"
            >
              <Link to="/portal-records">
                <FileBox size={18} className={pathname === "/portal-records" ? "text-purple-600" : "text-gray-600"} />
                <span className={pathname === "/portal-records" ? "text-purple-700 font-semibold" : "text-gray-700"}>Portal Records</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-200 p-4 bg-[#FAFAFA]">
        <SidebarMenuButton 
          tooltip="Need Help?"
          className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-600 hover:text-purple-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          <HelpCircle size={16} />
          <span>Need Help?</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
