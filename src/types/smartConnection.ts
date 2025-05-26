
export interface SmartConnection {
  id: string;
  receivableEntity: string;
  payableEntity: string;
  receivableErp: string;
  payableErp: string;
  status: "Live" | "In Process" | "Unavailable" | "Disconnected";
  agentCount: number;
  lastUpdated: string;
  isActive: boolean;
  agents: Agent[];
}

export interface Agent {
  id: string;
  portalName: string;
  type: "Monto" | "External";
  status: "Connected" | "Disconnected" | "Error";
  portalUser: string;
  role: "Submit Invoice" | "Monitor Invoice" | "Both";
}

export interface SmartConnectionFilters {
  status: string[];
  receivableEntity: string[];
  payable: string[];
  portal: string[];
  search: string;
  viewInactive: boolean;
}

export const defaultSmartConnectionFilters: SmartConnectionFilters = {
  status: [],
  receivableEntity: [],
  payable: [],
  portal: [],
  search: "",
  viewInactive: false,
};
