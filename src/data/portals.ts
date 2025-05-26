
import { PortalOption } from "@/context/AddAgentContext";

export const portalOptions: PortalOption[] = [
  // Popular ERPs
  { id: "sap-ariba", name: "SAP Ariba", category: "Enterprise ERP" },
  { id: "sap-concur", name: "SAP Concur", category: "Enterprise ERP" },
  { id: "coupa", name: "Coupa", category: "Enterprise ERP" },
  { id: "oracle-erp", name: "Oracle ERP Cloud", category: "Enterprise ERP" },
  { id: "workday", name: "Workday", category: "Enterprise ERP" },
  { id: "netsuite", name: "NetSuite", category: "Enterprise ERP" },
  
  // Mid-market
  { id: "sage-intacct", name: "Sage Intacct", category: "Mid-Market" },
  { id: "microsoft-dynamics", name: "Microsoft Dynamics 365", category: "Mid-Market" },
  { id: "acumatica", name: "Acumatica", category: "Mid-Market" },
  { id: "epicor", name: "Epicor ERP", category: "Mid-Market" },
  
  // Small business
  { id: "quickbooks", name: "QuickBooks Online", category: "Small Business" },
  { id: "xero", name: "Xero", category: "Small Business" },
  { id: "freshbooks", name: "FreshBooks", category: "Small Business" },
  { id: "wave", name: "Wave Accounting", category: "Small Business" },
  
  // Specialized
  { id: "basware", name: "Basware", category: "Specialized AP" },
  { id: "tipalti", name: "Tipalti", category: "Specialized AP" },
  { id: "bill-com", name: "Bill.com", category: "Specialized AP" },
  { id: "bottomline", name: "Bottomline Technologies", category: "Specialized AP" },
];

export const getPortalsByCategory = () => {
  const categories = ["Enterprise ERP", "Mid-Market", "Small Business", "Specialized AP"];
  return categories.map(category => ({
    category,
    portals: portalOptions.filter(portal => portal.category === category)
  }));
};

export const searchPortals = (query: string): PortalOption[] => {
  if (!query.trim()) return portalOptions;
  
  const lowerQuery = query.toLowerCase();
  return portalOptions.filter(portal =>
    portal.name.toLowerCase().includes(lowerQuery) ||
    portal.category.toLowerCase().includes(lowerQuery)
  );
};
