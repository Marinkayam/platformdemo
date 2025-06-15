
export interface PortalOption {
  id: string;
  name: string;
  category: string;
}

const portals: PortalOption[] = [
  { id: "sap-ariba", name: "SAP Ariba", category: "Enterprise ERP" },
  { id: "amazon-payee", name: "Amazon", category: "Enterprise ERP" },
  { id: "coupa", name: "Coupa", category: "Enterprise ERP" },
  { id: "oracle-erp", name: "Oracle", category: "Enterprise ERP" },
  { id: "workday", name: "Workday", category: "Enterprise ERP" },
  { id: "netsuite", name: "NetSuite", category: "Mid-Market" },
  { id: "sage-intacct", name: "Sage Intacct", category: "Mid-Market" },
  { id: "tipalti", name: "Tipalti", category: "Mid-Market" },
];

export function getPortalsByCategory() {
  const categories = [...new Set(portals.map(p => p.category))];
  return categories.map(category => ({
    category,
    portals: portals.filter(p => p.category === category)
  }));
}

export function getAllPortals() {
  return portals;
}

export function searchPortals(query: string) {
  return portals.filter(portal => 
    portal.name.toLowerCase().includes(query.toLowerCase())
  );
}
