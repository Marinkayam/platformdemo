
import React from "react";
import { Cloud, Settings, BarChart3, Star, Bot, Building2 } from "lucide-react";
import ChatAIIcon from "@/components/ui/chat-ai-icon";

// Custom SVG components for the navigation icons
const DashboardIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  },
  React.createElement('rect', { width: "7", height: "9", x: "3", y: "3", rx: "1" }),
  React.createElement('rect', { width: "7", height: "5", x: "14", y: "3", rx: "1" }),
  React.createElement('rect', { width: "7", height: "9", x: "14", y: "12", rx: "1" }),
  React.createElement('rect', { width: "7", height: "5", x: "3", y: "16", rx: "1" })
  )
);

const CompanyIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  },
  React.createElement('path', { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" }),
  React.createElement('path', { d: "M6 12h4" }),
  React.createElement('path', { d: "M6 8h4" }),
  React.createElement('path', { d: "M16 8h2" }),
  React.createElement('path', { d: "M16 12h2" }),
  React.createElement('path', { d: "M16 16h2" }),
  React.createElement('path', { d: "M18 22V16h4" })
  )
);

const InvoicesIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  },
  React.createElement('path', { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" }),
  React.createElement('path', { d: "M14 2v4a2 2 0 0 0 2 2h4" }),
  React.createElement('path', { d: "M10 9H8" }),
  React.createElement('path', { d: "M16 13H8" }),
  React.createElement('path', { d: "M16 17H8" })
  )
);

const SmartConnectionsIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  },
  React.createElement('path', { d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" }),
  React.createElement('path', { d: "M9 13a4.5 4.5 0 0 0 3-4" }),
  React.createElement('path', { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5" }),
  React.createElement('path', { d: "M3.477 10.896a4 4 0 0 1 .585-.396" }),
  React.createElement('path', { d: "M6 18a4 4 0 0 1-1.967-.516" }),
  React.createElement('path', { d: "M12 13h4" }),
  React.createElement('path', { d: "M12 18h6a2 2 0 0 1 2 2v1" }),
  React.createElement('path', { d: "M12 8h8" }),
  React.createElement('path', { d: "M16 8V5a2 2 0 0 1 2-2" }),
  React.createElement('circle', { cx: "16", cy: "13", r: ".5" }),
  React.createElement('circle', { cx: "18", cy: "3", r: ".5" }),
  React.createElement('circle', { cx: "20", cy: "21", r: ".5" }),
  React.createElement('circle', { cx: "20", cy: "8", r: ".5" })
  )
);

const PurchaseOrderIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  },
  React.createElement('path', { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" }),
  React.createElement('path', { d: "M14 8H8" }),
  React.createElement('path', { d: "M16 12H8" }),
  React.createElement('path', { d: "M13 16H8" })
  )
);

const PortalRecordsIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  },
  React.createElement('path', { d: "M8 2v4" }),
  React.createElement('path', { d: "M12 2v4" }),
  React.createElement('path', { d: "M16 2v4" }),
  React.createElement('rect', { width: "16", height: "18", x: "4", y: "4", rx: "2" }),
  React.createElement('path', { d: "M8 10h6" }),
  React.createElement('path', { d: "M8 14h8" }),
  React.createElement('path', { d: "M8 18h5" })
  )
);

const PortalsDashboardIcon = ({ size = 20, className }: { size?: number; className?: string }) =>
  React.createElement(
    'svg',
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "0.75",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className
    },
    React.createElement('path', { d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" }),
    React.createElement('path', { d: "M20 3v4" }),
    React.createElement('path', { d: "M22 5h-4" }),
    React.createElement('path', { d: "M4 17v2" }),
    React.createElement('path', { d: "M5 18H3" })
  );

const HelpIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  },
  React.createElement('circle', { cx: "12", cy: "12", r: "10" }),
  React.createElement('path', { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
  React.createElement('point', { x: "12", y: "17" })
  )
);

const ChevronDownIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  React.createElement('svg', {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  },
  React.createElement('path', { d: "m6 9 6 6 6-6" })
  )
);

export interface NavItem {
  title: string;
  href?: string;
  icon?: any;
  items?: NavItem[];
  id?: string;
}

export const navMain: NavItem[] = [
  {
    title: "Home Page",
    href: "/",
    icon: DashboardIcon,
  },
  {
    title: "Portals Dashboard",
    href: "/portals-dashboard",
    icon: PortalsDashboardIcon,
    items: [
      { title: "Overview", href: "/portals-dashboard" },
      {
        title: "Portal Records",
        href: "/portal-records",
        icon: PortalRecordsIcon,
        items: [
          { title: "All Records", href: "/portal-records" },
          { title: "Unmatched Records", href: "/portal-records?tab=unmatched" },
          { title: "Conflict Records", href: "/portal-records?tab=conflict" },
        ]
      },
      {
        title: "Purchase Orders",
        href: "/purchase-orders",
        icon: PurchaseOrderIcon,
        items: [
          { title: "All POs", href: "/purchase-orders" },
          { title: "New POs", href: "/purchase-orders?status=new" },
          { title: "Low Funds POs", href: "/purchase-orders?status=low-funds" },
        ]
      },
    ],
  },
  {
    title: "RTPs",
    href: "/invoices",
    icon: InvoicesIcon,
    items: [
      { title: "All RTPs", href: "/invoices" },
      { title: "Pending Actions", href: "/invoices?status=pending" },
      { title: "Overdue", href: "/invoices?status=overdue" },
      { title: "Settled", href: "/invoices?status=settled" },
    ],
  },
  {
    title: "Payments Relationships",
    href: "/payments-relationships",
    icon: Bot,
    items: [
      { title: "Smart Connections", href: "/payments-relationships" },
      { title: "Portal Users", href: "/payments-relationships?tab=portal-users" },
    ],
  },
  {
    title: "My Company",
    href: "/workspace",
    icon: Building2,
  },
  {
    title: "Design System",
    href: "/design-system",
    icon: Settings,
  },
];

export const navUser: NavItem[] = [
  {
    id: "chat-ai-nav",
    title: "",
    icon: ChatAIIcon,
  },
];

export { ChevronDownIcon };
