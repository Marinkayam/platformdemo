
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface PortalOption {
  id: string;
  name: string;
  category: string;
}

export interface ReceivableOption {
  id: string;
  name: string;
  companyName: string;
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
}

export interface DedicatedUserData {
  confirmed: boolean;
}

export interface ConnectionSetupData {
  payableName: string;
  selectedReceivable: ReceivableOption | null;
}

export interface AddAgentState {
  flowType: "add-agent" | "new-connection";
  currentStep: number;
  connectionSetupData: ConnectionSetupData;
  selectedPortal: PortalOption | null;
  userType: UserType | null;
  existingUserData: ExistingUserData;
  dedicatedUserData: DedicatedUserData;
}

interface AddAgentContextType {
  state: AddAgentState;
  setFlowType: (flowType: "add-agent" | "new-connection") => void;
  setCurrentStep: (step: number) => void;
  updateConnectionSetupData: (data: Partial<ConnectionSetupData>) => void;
  setSelectedPortal: (portal: PortalOption | null) => void;
  setUserType: (type: UserType | null) => void;
  updateExistingUserData: (data: Partial<ExistingUserData>) => void;
  updateDedicatedUserData: (data: Partial<DedicatedUserData>) => void;
  resetState: () => void;
  getTotalSteps: () => number;
}

const AddAgentContext = createContext<AddAgentContextType | undefined>(undefined);

const initialState: AddAgentState = {
  flowType: "add-agent",
  currentStep: 1,
  connectionSetupData: {
    payableName: "",
    selectedReceivable: null,
  },
  selectedPortal: null,
  userType: null,
  existingUserData: {
    email: "",
    password: "",
    confirmPassword: "",
    portalLink: "",
    twoFactorMethod: "redirect",
  },
  dedicatedUserData: {
    confirmed: false,
  },
};

export function AddAgentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AddAgentState>(initialState);

  const setFlowType = (flowType: "add-agent" | "new-connection") => {
    setState(prev => ({ 
      ...prev, 
      flowType,
      currentStep: 1 // Reset to first step when changing flow type
    }));
  };

  const setCurrentStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const updateConnectionSetupData = (data: Partial<ConnectionSetupData>) => {
    setState(prev => ({
      ...prev,
      connectionSetupData: { ...prev.connectionSetupData, ...data }
    }));
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

  const getTotalSteps = () => {
    return state.flowType === "new-connection" ? 5 : 3;
  };

  return (
    <AddAgentContext.Provider
      value={{
        state,
        setFlowType,
        setCurrentStep,
        updateConnectionSetupData,
        setSelectedPortal,
        setUserType,
        updateExistingUserData,
        updateDedicatedUserData,
        resetState,
        getTotalSteps,
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
