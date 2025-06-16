
export interface PortalRecordFilters {
  portal: string[];
  buyer: string[];
  status: string;
  type: string;
  search: string;
  needsAttention: boolean;
}

export const defaultPortalRecordFilters: PortalRecordFilters = {
  portal: [],
  buyer: [],
  status: "All",
  type: "All",
  search: "",
  needsAttention: false
};
