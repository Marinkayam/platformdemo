
export const mapAgentStatusToPortalUserStatus = {
  ELIGIBLE: "Connected" as const,
  UNDER_CONSTRUCTION: "Validating" as const,
  INELIGIBLE: "Disconnected" as const,
  Connected: "Connected" as const,
  Validating: "Validating" as const,
  Disconnected: "Disconnected" as const,
  Error: "Disconnected" as const,
  Building: "Validating" as const,
};

export const getStatusTooltip = (status: string): string => {
  switch (status) {
    case "Connected":
      return "Portal user is active and validated";
    case "Validating":
      return "Monto is validating the credentials";
    case "Disconnected":
      return "Monto couldn't validate the credentials. You may need to update them.";
    default:
      return `Status: ${status}`;
  }
};
