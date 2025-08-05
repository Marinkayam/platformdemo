
export interface PortalUser {
  id: string;
  portal: string;
  username: string;
  supplierName?: string;
  status: "Connected" | "Validating" | "Disconnected";
  userType: "Monto" | "External";
  linkedSmartConnections: number;
  lastUpdated: string;
  isReadOnly: boolean;
  twoFAMethod?: 'authenticator' | 'sms' | 'email' | 'other';
  phoneNumber?: string;
  verificationEmail?: string;
  issue?: string;
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
