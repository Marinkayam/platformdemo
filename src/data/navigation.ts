
import React from "react";
import { Cloud, BarChart3, Star } from "lucide-react";
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
    strokeWidth: "0.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  },
  React.createElement('path', { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" }),
  React.createElement('path', { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" }),
  React.createElement('path', { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" }),
  React.createElement('path', { d: "M10 6h4" }),
  React.createElement('path', { d: "M10 10h4" }),
  React.createElement('path', { d: "M10 14h4" }),
  React.createElement('path', { d: "M10 18h4" })
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
  React.createElement('path', { d: "m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" }),
  React.createElement('path', { d: "m14 7 3 3" }),
  React.createElement('path', { d: "M5 6v4" }),
  React.createElement('path', { d: "M19 14v4" }),
  React.createElement('path', { d: "M10 2v2" }),
  React.createElement('path', { d: "M7 8H3" }),
  React.createElement('path', { d: "M21 16h-4" }),
  React.createElement('path', { d: "M11 3H9" })
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
  React.createElement('path', { d: "M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1" }),
  React.createElement('path', { d: "M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9" }),
  React.createElement('path', { d: "M21 21v-2h-4" }),
  React.createElement('path', { d: "M3 5h4V3" }),
  React.createElement('path', { d: "M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3" })
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
      strokeWidth: "1",
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

const HeartIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
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
  React.createElement('path', { d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" })
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
      },
      {
        title: "Purchase Orders",
        href: "/purchase-orders",
        icon: PurchaseOrderIcon,
      },
    ],
  },
  {
    title: "Request-to-Pay",
    href: "/invoices",
    icon: InvoicesIcon,
    items: [
      { title: "All Request-to-Pay", href: "/invoices" },
      { title: "Pending Actions", href: "/invoices?status=pending" },
      { title: "Overdue", href: "/invoices?status=overdue" },
      { title: "Settled", href: "/invoices?status=settled" },
    ],
  },
  {
    title: "Connection Hub",
    href: "/payments-relationships",
    icon: SmartConnectionsIcon,
    items: [
      { title: "Smart Connections", href: "/payments-relationships" },
      { title: "Scan Agents", href: "/payments-relationships?tab=scan-agents" },
    ],
  },
  {
    title: "My Company",
    href: "/workspace",
    icon: CompanyIcon,
  },
  {
    title: "Design System",
    href: "/design-system",
    icon: HeartIcon,
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
