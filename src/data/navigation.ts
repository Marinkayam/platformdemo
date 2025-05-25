
import {
  LayoutDashboard,
  FileText,
  Globe,
  Brain,
  ShoppingCart,
  FileBox,
  HelpCircle,
} from "lucide-react";

export interface NavItem {
  title: string;
  href?: string;
  icon?: any;
  items?: NavItem[];
}

export const navMain: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Invoices",
    icon: FileText,
    items: [
      { title: "Pending Actions", href: "/invoices?status=pending" },
      { title: "Overdue", href: "/invoices?status=overdue" },
      { title: "Cleared", href: "/invoices?status=cleared" },
    ],
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

export const navUser: NavItem[] = [
  {
    title: "Need Help?",
    icon: HelpCircle,
  },
];
