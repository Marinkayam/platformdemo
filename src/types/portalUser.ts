
export interface PortalUser {
  id: string;
  portal: string;
  username: string;
  status: "Connected" | "Validating" | "Disconnected";
  userType: "Monto" | "External";
  linkedSmartConnections: number;
  lastUpdated: string;
  isReadOnly: boolean;
}

export interface PortalUserFilters {
  status: string[];
  portal: string[];
  userType: string[];
  search: string;
}

export const defaultPortalUserFilters: PortalUserFilters = {
  status: [],
  portal: [],
  userType: [],
  search: "",
};
