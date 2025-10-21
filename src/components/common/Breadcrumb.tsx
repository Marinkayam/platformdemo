import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <Link 
        to="/portals-dashboard" 
        className="text-[#586079] hover:text-[#7B59FF] transition-colors"
      >
        Portals Dashboard
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-3 w-3 text-[#586079]" />
          {item.href && !item.isActive ? (
            <Link 
              to={item.href} 
              className="text-[#586079] hover:text-[#7B59FF] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className={`${
                item.isActive 
                  ? "text-[#061237] font-medium" 
                  : "text-[#586079]"
              }`}
              aria-current={item.isActive ? "page" : undefined}
            >
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// Helper function to generate common breadcrumb paths
export const createBreadcrumbs = {
  portalsDashboard: () => [],
  
  purchaseOrders: () => [
    { label: "Purchase Orders", isActive: true }
  ],
  
  portalRecords: (status?: string) => {
    const items = [
      { label: "Portal Records", href: "/portal-records", isActive: !status }
    ];

    if (status === "unmatched") {
      items[0].isActive = false;
      items.push({ label: "Unmatched", href: "/portal-records?status=unmatched", isActive: true });
    } else if (status === "conflicts") {
      items[0].isActive = false;
      items.push({ label: "Conflicts", href: "/portal-records?status=conflicts", isActive: true });
    } else if (status === "rejected") {
      items[0].isActive = false;
      items.push({ label: "Rejected", href: "/portal-records?status=rejected", isActive: true });
    }

    return items;
  },
  
  invoices: (status?: string) => {
    const items = [
      { label: "Invoices", isActive: !status }
    ];
    
    if (status === "pending") {
      items.push({ label: "Pending Action RTPs", isActive: true });
    } else if (status === "rejected") {
      items.push({ label: "Rejected", isActive: true });
    }
    
    return items;
  },
  
  smartConnections: () => [
    { label: "Smart Connections", isActive: true }
  ]
};