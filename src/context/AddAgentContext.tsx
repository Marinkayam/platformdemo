
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface PortalOption {
  id: string;
  name: string;
  category: string;
}

export interface UserType {
  type: "existing" | "dedicated";
}

export interface ExistingUserData {
  email: string;
  password: string;
  confirmPassword: string;
  portalLink: string;
  twoFactorMethod: "redirect" | "authenticator";
  redirectEmail?: string;
  redirectPhone?: string;
  authSecret?: string;
  externalSubmission?: boolean;
}

export interface DedicatedUserData {
  confirmed: boolean;
}

export interface AddAgentState {
  currentStep: number;
  selectedPortal: PortalOption | null;
  userType: UserType | null;
  existingUserData: ExistingUserData;
  dedicatedUserData: DedicatedUserData;
}

interface AddAgentContextType {
  state: AddAgentState;
  setCurrentStep: (step: number) => void;
  setSelectedPortal: (portal: PortalOption | null) => void;
  setUserType: (type: UserType | null) => void;
  updateExistingUserData: (data: Partial<ExistingUserData>) => void;
  updateDedicatedUserData: (data: Partial<DedicatedUserData>) => void;
  resetState: () => void;
}

const AddAgentContext = createContext<AddAgentContextType | undefined>(undefined);

const initialState: AddAgentState = {
  currentStep: 1,
  selectedPortal: null,
  userType: null,
  existingUserData: {
    email: "",
    password: "",
    confirmPassword: "",
    portalLink: "",
    twoFactorMethod: "redirect",
    externalSubmission: false,
  },
  dedicatedUserData: {
    confirmed: false,
  },
};

export function AddAgentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AddAgentState>(initialState);

  const setCurrentStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const setSelectedPortal = (portal: PortalOption | null) => {
    setState(prev => ({ ...prev, selectedPortal: portal }));
  };

  const setUserType = (type: UserType | null) => {
    setState(prev => ({ ...prev, userType: type }));
  };

  const updateExistingUserData = (data: Partial<ExistingUserData>) => {
    setState(prev => ({
      ...prev,
      existingUserData: { ...prev.existingUserData, ...data }
    }));
  };

  const updateDedicatedUserData = (data: Partial<DedicatedUserData>) => {
    setState(prev => ({
      ...prev,
      dedicatedUserData: { ...prev.dedicatedUserData, ...data }
    }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return (
    <AddAgentContext.Provider
      value={{
        state,
        setCurrentStep,
        setSelectedPortal,
        setUserType,
        updateExistingUserData,
        updateDedicatedUserData,
        resetState,
      }}
    >
      {children}
    </AddAgentContext.Provider>
  );
}

export function useAddAgent() {
  const context = useContext(AddAgentContext);
  if (context === undefined) {
    throw new Error("useAddAgent must be used within an AddAgentProvider");
  }
  return context;
}
