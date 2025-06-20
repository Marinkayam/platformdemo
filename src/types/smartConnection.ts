
export interface Agent {
  id: string;
  portalName: string;
  portalUser: string;
  status: "Connected" | "Disconnected" | "Validating";
  type: "Monto" | "Regular";
  lastSync: string;
  issueCount: number;
  issues?: string[];
}

export interface SmartConnection {
  id: string;
  receivableCompany: string;
  payableCompany: string;
  receivableEntity: string;
  payableEntity: string;
  receivableErp?: string;
  payableErp?: string;
  status: "Connected" | "Disconnected" | "Validating" | "Unavailable";
  lastSync: string;
  agents: Agent[];
  isActive?: boolean;
  buyer?: {
    name: string;
    id: string;
  };
  supplier?: {
    name: string;
    id: string;
  };
  portal?: {
    type: string;
    reference: string;
    user?: string;
  };
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
  viewInactive: true
};

export function getSmartConnectionStatusCategory(connection: SmartConnection): string {
  if (connection.status === "Connected") return "Active";
  if (connection.status === "Disconnected" || connection.status === "Unavailable") return "Inactive";
  if (connection.status === "Validating") return "Needs Review";
  return "Failed";
}
