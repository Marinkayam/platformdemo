
import { MontoField, Step } from './types';

export const WIZARD_STEPS: Step[] = [
  { id: 'upload', name: 'Upload File' },
  { id: 'mapping', name: 'Map Fields' },
  { id: 'review', name: 'Review Data' },
  { id: 'summary', name: 'Summary & Import' },
];

export const MONTO_FIELDS: MontoField[] = [
  { key: 'portal', label: 'Portal', required: true, description: "The name of the portal (e.g., Coupa, SAP Ariba)." },
  { key: 'username', label: 'Username', required: true, description: "The login email or username for the portal user." },
  { key: 'password', label: 'Password', required: false, description: "The password for the portal user. Will not be stored." },
];
