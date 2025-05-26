
import React, { createContext, useContext, useState, ReactNode } from "react";
import { PortalOption, UserType, ExistingUserData, DedicatedUserData } from "./AddAgentContext";

export interface ConnectionSetupData {
  payableName: string;
  receivable: string;
}

export interface NewSmartConnectionState {
  currentStep: number;
  connectionSetup: ConnectionSetupData;
  selectedPortal: PortalOption | null;
  userType: UserType | null;
  existingUserData: ExistingUserData;
  dedicatedUserData: DedicatedUserData;
}

interface NewSmartConnectionContextType {
  state: NewSmartConnectionState;
  setCurrentStep: (step: number) => void;
  updateConnectionSetup: (data: Partial<ConnectionSetupData>) => void;
  setSelectedPortal: (portal: PortalOption | null) => void;
  setUserType: (type: UserType | null) => void;
  updateExistingUserData: (data: Partial<ExistingUserData>) => void;
  updateDedicatedUserData: (data: Partial<DedicatedUserData>) => void;
  resetState: () => void;
}

const NewSmartConnectionContext = createContext<NewSmartConnectionContextType | undefined>(undefined);

const initialState: NewSmartConnectionState = {
  currentStep: 1,
  connectionSetup: {
    payableName: "",
    receivable: "",
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

export function NewSmartConnectionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NewSmartConnectionState>(initialState);

  const setCurrentStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const updateConnectionSetup = (data: Partial<ConnectionSetupData>) => {
    setState(prev => ({
      ...prev,
      connectionSetup: { ...prev.connectionSetup, ...data }
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

  return (
    <NewSmartConnectionContext.Provider
      value={{
        state,
        setCurrentStep,
        updateConnectionSetup,
        setSelectedPortal,
        setUserType,
        updateExistingUserData,
        updateDedicatedUserData,
        resetState,
      }}
    >
      {children}
    </NewSmartConnectionContext.Provider>
  );
}

export function useNewSmartConnection() {
  const context = useContext(NewSmartConnectionContext);
  if (context === undefined) {
    throw new Error("useNewSmartConnection must be used within a NewSmartConnectionProvider");
  }
  return context;
}
