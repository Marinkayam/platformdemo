
export interface PortalOption {
  id: string;
  name: string;
  category: string;
}

const portals: PortalOption[] = [
  { id: "ariba", name: "Ariba", category: "Enterprise ERP" },
  { id: "coupa", name: "Coupa", category: "Enterprise ERP" },
  { id: "oracle-cloud", name: "Oracle Cloud/iSupplier", category: "Enterprise ERP" },
  { id: "workday", name: "Workday", category: "Enterprise ERP" },
  { id: "microsoft", name: "Microsoft", category: "Enterprise ERP" },
  { id: "amazon", name: "Amazon", category: "Enterprise ERP" },
  { id: "taulia", name: "Taulia", category: "P2P Platforms" },
  { id: "tungsten", name: "Tungsten", category: "P2P Platforms" },
  { id: "bill", name: "Bill", category: "P2P Platforms" },
  { id: "opentext", name: "Opentext", category: "P2P Platforms" },
  { id: "jaggaer", name: "Jaggaer", category: "P2P Platforms" },
  { id: "corcentric", name: "Corcentric", category: "P2P Platforms" },
  { id: "paymode-x", name: "Paymode-X", category: "Payment Networks" },
  { id: "tipalti", name: "Tipalti", category: "Payment Networks" },
  { id: "gep", name: "GEP", category: "Payment Networks" },
  { id: "transcepta", name: "Transcepta", category: "Payment Networks" },
  { id: "open-invoice", name: "Open Invoice", category: "Payment Networks" },
  { id: "nipendo", name: "Nipendo", category: "Payment Networks" },
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
