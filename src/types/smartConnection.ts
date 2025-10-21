export interface SmartConnection {
  id: string;
  receivableEntity: string;
  payableEntity: string;
  receivableErp: string;
  payableErp: string;
  status: "Connected" | "Connecting" | "Needs Attention" | "Disconnected" | "Inactive";
  agentCount: number;
  lastUpdated: string;
  isActive: boolean;
  agents: Agent[];
  buyer: { name: string; };
  supplier: { name: string; };
  portal: { type: string; user: string; };
}

export interface Agent {
  id: string;
  portalName: string;
  type: "Monto" | "External";
  status: "Connected" | "Disconnected" | "Error" | "Validating" | "Building";
  portalUser: string;
  role: "Submit Invoice" | "Monitor Invoice" | "Both";
  externalSubmission?: boolean;
}

export interface SmartConnectionFilters {
  status: string[];
  receivableEntity: string[];
  payable: string[];
  portal: string[];
  activeStatus: string[];
  search: string;
  viewInactive: boolean;
}

export const defaultSmartConnectionFilters: SmartConnectionFilters = {
  status: [],
  receivableEntity: [],
  payable: [],
  portal: [],
  activeStatus: [],
  search: "",
  viewInactive: false,
};

// Helper function to get user-friendly status categories
export const getSmartConnectionStatusCategory = (connection: SmartConnection): string => {
  if (!connection.isActive) return "Inactive";
  
  const agentStatuses = connection.agents.map(agent => agent.status);
  
  // Failed: All agents are disconnected or in error
  if (agentStatuses.length > 0 && agentStatuses.every(status => status === "Disconnected" || status === "Error")) {
    return "Failed";
  }
  
  // Needs Review: Mixed states with at least one disconnected/error
  if (agentStatuses.some(status => status === "Disconnected" || status === "Error")) {
    return "Needs Review";
  }
  
  // Active: Connected or Connecting
  if (connection.status === "Connected" || connection.status === "Connecting") {
    return "Active";
  }
  
  return "Active";
};
