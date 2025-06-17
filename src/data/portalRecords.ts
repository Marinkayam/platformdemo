
import { PortalRecord } from "@/types/portalRecord";
import { generatePortalRecordsData } from "./portalRecords/generator";
import { demoRecords } from "./portalRecords/demoData";

// Generate portal records for all invoices
export const portalRecordsData: PortalRecord[] = generatePortalRecordsData();

// Export demo records for consistency
export const allPortalRecords = demoRecords;
