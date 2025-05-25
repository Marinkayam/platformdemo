
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar";
import MontoLogo from "@/components/MontoLogo";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Globe, Brain, ShoppingCart, FileBox, HelpCircle } from "lucide-react";

export function AppSidebar() {
  const location = useLocation();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Invoices",
      href: "/invoices",
      icon: FileText,
    },
    {
      title: "Portal Management",
      href: "/portal-management",
      icon: Globe,
    },
    {
      title: "Smart Connections",
      href: "/smart-connections",
      icon: Brain,
    },
    {
      title: "Purchase Order",
      href: "/purchase-order",
      icon: ShoppingCart,
    },
    {
      title: "Portal Records",
      href: "/portal-records",
      icon: FileBox,
    },
  ];

  return (
    <Sidebar variant="sidebar" className="w-64 bg-[#FAFAFA] border-r border-[#E4E5E9] transition-all duration-300">
      <SidebarHeader className="border-b border-[#E4E5E9] px-4 pt-6 pb-4 py-[16px]">
        <div className="flex items-center">
          <MontoLogo className="w-[104px] h-[31px]" />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-[#FAFAFA] overflow-y-auto transition-all duration-300 px-4 py-4">
        <nav className="space-y-5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-[#7C3AED] text-white"
                    : "text-[#01173E] hover:bg-[#F3F4F6]"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-[#E4E5E9] px-4 py-6 bg-[#FAFAFA]">
        <Link
          to="#"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-[#01173E] hover:bg-[#F3F4F6]"
        >
          <HelpCircle size={20} />
          <span className="font-medium">Need Help?</span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
