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
  status: "Connected" | "Disconnected" | "Validating";
  lastSync: string;
  agents: Agent[];
}
