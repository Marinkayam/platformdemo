export interface ComponentUsage {
  page: string;
  route: string;
  instances: number;
  components: string[];
}

export const componentUsageData = {
  buttons: [
    {
      page: "Login",
      route: "/login",
      instances: 1,
      components: ["Login Button"]
    },
    {
      page: "Dashboard",
      route: "/dashboard",
      instances: 8,
      components: ["View All Invoices", "View All Smart Connections", "Action Buttons"]
    },
    {
      page: "Invoices List",
      route: "/invoices",
      instances: 12,
      components: ["Filter Buttons", "Export Button", "Bulk Actions", "Table Actions"]
    },
    {
      page: "Invoice Detail",
      route: "/invoices/:id",
      instances: 6,
      components: ["Exception Actions", "PDF Controls", "Note Actions"]
    },
    {
      page: "Smart Connections",
      route: "/smart-connections",
      instances: 5,
      components: ["Add Agent", "New Connection", "Table Actions"]
    },
    {
      page: "Add Agent Wizard",
      route: "/payments-relationships/add-agent",
      instances: 4,
      components: ["Navigation Buttons", "Form Submissions"]
    },
    {
      page: "Purchase Orders",
      route: "/payments-relationships",
      instances: 8,
      components: ["Filter Actions", "Export Button", "Table Actions"]
    },
    {
      page: "Portal Records",
      route: "/payments-relationships",
      instances: 6,
      components: ["Filter Actions", "Export Button", "Table Actions"]
    }
  ] as ComponentUsage[],

  badges: [
    {
      page: "Dashboard",
      route: "/dashboard",
      instances: 15,
      components: ["Invoice Status", "Exception Indicators"]
    },
    {
      page: "Invoices List",
      route: "/invoices",
      instances: 156,
      components: ["Status Badges", "Priority Indicators"]
    },
    {
      page: "Invoice Detail",
      route: "/invoices/:id",
      instances: 8,
      components: ["Current Status", "Exception Badges"]
    },
    {
      page: "Smart Connections",
      route: "/smart-connections",
      instances: 24,
      components: ["Connection Status", "Agent Type Badges"]
    },
    {
      page: "Purchase Orders",
      route: "/payments-relationships",
      instances: 89,
      components: ["PO Status", "Processing State"]
    },
    {
      page: "Portal Records",
      route: "/payments-relationships",
      instances: 67,
      components: ["Record Status", "Type Indicators"]
    }
  ] as ComponentUsage[],

  tabs: [
    {
      page: "Invoices List",
      route: "/invoices",
      instances: 1,
      components: ["Main Navigation Tabs"]
    },
    {
      page: "Invoice Detail",
      route: "/invoices/:id",
      instances: 1,
      components: ["Detail View Tabs"]
    },
    {
      page: "Purchase Orders",
      route: "/payments-relationships",
      instances: 1,
      components: ["Main Navigation Tabs"]
    },
    {
      page: "Portal Records",
      route: "/payments-relationships",
      instances: 1,
      components: ["Record Type Tabs"]
    }
  ] as ComponentUsage[],

  filters: [
    {
      page: "Invoices List",
      route: "/invoices",
      instances: 6,
      components: ["Status Filter", "Buyer Filter", "Date Range", "Search"]
    },
    {
      page: "Smart Connections",
      route: "/smart-connections",
      instances: 4,
      components: ["Portal Filter", "Status Filter", "Search"]
    },
    {
      page: "Purchase Orders",
      route: "/payments-relationships",
      instances: 5,
      components: ["Status Filter", "Vendor Filter", "Date Range", "Search"]
    },
    {
      page: "Portal Records",
      route: "/payments-relationships",
      instances: 4,
      components: ["Type Filter", "Status Filter", "Search"]
    }
  ] as ComponentUsage[],

  tables: [
    {
      page: "Dashboard",
      route: "/dashboard",
      instances: 1,
      components: ["Recent Invoices Table"]
    },
    {
      page: "Invoices List",
      route: "/invoices",
      instances: 1,
      components: ["Main Invoices Table"]
    },
    {
      page: "Smart Connections",
      route: "/smart-connections",
      instances: 1,
      components: ["Connections Table", "Agents Table"]
    },
    {
      page: "Purchase Orders",
      route: "/payments-relationships",
      instances: 1,
      components: ["Main Purchase Orders Table"]
    },
    {
      page: "Portal Records",
      route: "/payments-relationships",
      instances: 1,
      components: ["Records Table"]
    }
  ] as ComponentUsage[],

  forms: [
    {
      page: "Login",
      route: "/login",
      instances: 1,
      components: ["Login Form"]
    },
    {
      page: "Add Agent Wizard",
      route: "/payments-relationships/add-agent",
      instances: 4,
      components: ["User Type Form", "Portal Selection", "Credentials Form", "2FA Setup"]
    },
    {
      page: "New Smart Connection",
      route: "/payments-relationships/new-relationship",
      instances: 4,
      components: ["Connection Setup", "Portal Form", "Credentials", "User Type"]
    }
  ] as ComponentUsage[],

  layout: [
    {
      page: "All Pages",
      route: "/*",
      instances: 1,
      components: ["Main Layout", "Sidebar", "Header"]
    },
    {
      page: "Invoice Detail",
      route: "/invoices/:id",
      instances: 2,
      components: ["Resizable Panels", "Content Layout"]
    }
  ] as ComponentUsage[],

  progress: [
    {
      page: "Add Agent Wizard",
      route: "/payments-relationships/add-agent",
      instances: 1,
      components: ["Step Progress Indicator"]
    },
    {
      page: "New Smart Connection",
      route: "/payments-relationships/new-relationship",
      instances: 1,
      components: ["Wizard Progress"]
    }
  ] as ComponentUsage[],

  modals: [
    {
      page: "Invoices List",
      route: "/invoices",
      instances: 3,
      components: ["Export Modal", "Exclude Modal", "Table Customization"]
    },
    {
      page: "Smart Connections",
      route: "/smart-connections",
      instances: 4,
      components: ["View Details", "Edit Agent", "Deactivate Agent", "Add Agent"]
    },
    {
      page: "Invoice Detail",
      route: "/invoices/:id",
      instances: 5,
      components: ["Exception Modals", "Contact Customer", "Force Submit"]
    }
  ] as ComponentUsage[]
};
