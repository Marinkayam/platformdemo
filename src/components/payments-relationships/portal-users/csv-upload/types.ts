
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
