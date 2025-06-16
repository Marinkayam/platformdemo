
export interface PortalRecordFilters {
  portal: string[];
  buyer: string[];
  status: string;
  type: string;
  search: string;
}

export const defaultPortalRecordFilters: PortalRecordFilters = {
  portal: [],
  buyer: [],
  status: "All",
  type: "All",
  search: ""
};
