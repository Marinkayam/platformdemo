
import React from "react";

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

const PortalManagementIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
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
  React.createElement('path', { d: "M7 3.34V5a3 3 0 0 0 3 3" }),
  React.createElement('path', { d: "M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" }),
  React.createElement('path', { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54" }),
  React.createElement('path', { d: "M12 2a10 10 0 1 0 9.54 13" }),
  React.createElement('path', { d: "M20 6V4a2 2 0 1 0-4 0v2" }),
  React.createElement('rect', { width: "8", height: "5", x: "14", y: "6", rx: "1" })
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
    icon: DashboardIcon,
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: InvoicesIcon,
    items: [
      { title: "Pending Actions", href: "/invoices?status=pending" },
      { title: "Overdue", href: "/invoices?status=overdue" },
      { title: "Cleared", href: "/invoices?status=cleared" },
    ],
  },
  {
    title: "Portal Management",
    href: "/portal-management",
    icon: PortalManagementIcon,
  },
  {
    title: "Smart Connections",
    href: "/smart-connections",
    icon: SmartConnectionsIcon,
  },
  {
    title: "Purchase Order",
    href: "/purchase-order",
    icon: PurchaseOrderIcon,
  },
  {
    title: "Portal Records",
    href: "/portal-records",
    icon: PortalRecordsIcon,
  },
];

export const navUser: NavItem[] = [
  {
    title: "Need Help?",
    icon: HelpIcon,
  },
];
