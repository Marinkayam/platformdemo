
import { PortalUser } from "@/types/portalUser";

export type WizardStep = 'portal' | 'userType' | 'setup' | 'connecting' | 'success';
export type UserType = 'existing' | 'dedicated';

export type FormData = {
    username: string;
    password: string;
    enable2FA: boolean;
    twoFAMethod: PortalUser['twoFAMethod'];
    phoneNumber: string;
    verificationEmail: string;
};
