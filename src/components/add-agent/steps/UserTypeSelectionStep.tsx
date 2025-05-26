
import React from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { UserTypeCard } from "../components/UserTypeCard";
import { InfoBanner } from "../components/InfoBanner";

export function UserTypeSelectionStep() {
  const { state, setUserType } = useAddAgent();

  const handleUserTypeSelect = (type: "existing" | "dedicated") => {
    setUserType({ type });
  };

  return (
    <div className="space-y-8">
      <InfoBanner>
        💡 <strong>Pro Tip:</strong> Create a dedicated user for Monto in your AP portal to enable seamless, zero-touch automation.
      </InfoBanner>
      
      <div className="grid md:grid-cols-2 gap-8">
        <UserTypeCard
          type="existing"
          title="Select Existing User"
          description="Use one of your organization's existing portal users to connect Monto."
          benefits={[
            "Quick to set up",
            "Compatible with most portals"
          ]}
          considerations={[
            "Shared use may affect tracking or stability"
          ]}
          selected={state.userType?.type === "existing"}
          onSelect={() => handleUserTypeSelect("existing")}
        />

        <UserTypeCard
          type="dedicated"
          title="Create a Dedicated Monto User"
          description="Set up a separate user in your AP portal exclusively for Monto."
          benefits={[
            "Optimized for automation",
            "Secure and stable",
            "Unlocks advanced features"
          ]}
          considerations={[]}
          selected={state.userType?.type === "dedicated"}
          onSelect={() => handleUserTypeSelect("dedicated")}
          recommended={true}
        />
      </div>
    </div>
  );
}
