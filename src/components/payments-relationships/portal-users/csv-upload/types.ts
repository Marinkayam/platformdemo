
import { PortalUser } from '@/types/portalUser';

export type WizardStepId = 'upload' | 'mapping' | 'review' | 'summary' | 'connecting';

export interface Step {
  id: WizardStepId;
  name: string;
}

export interface ValidatedUser extends Partial<PortalUser> {
  _row: number;
  _errors: string[];
  _warnings: string[];
  _status: 'valid' | 'warning' | 'error';
}

export interface MontoField {
  key: keyof PortalUser | 'password';
  label: string;
  required: boolean;
  description: string;
}

export const MONTO_FIELDS: MontoField[] = [
  { key: 'portal', label: 'Portal', required: true, description: "The name of the portal (e.g., Coupa, SAP Ariba)." },
  { key: 'username', label: 'Username', required: true, description: "The login email or username for the portal user." },
  { key: 'password', label: 'Password', required: false, description: "The password for the portal user. Will not be stored." },
];
