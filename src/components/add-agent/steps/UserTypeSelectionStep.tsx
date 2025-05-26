
import React from "react";
import { useAddAgent } from "@/context/AddAgentContext";
import { UserTypeCard } from "../components/UserTypeCard";

export function UserTypeSelectionStep() {
  const { state, setUserType } = useAddAgent();

  const handleUserTypeSelect = (type: "existing" | "dedicated") => {
    setUserType({ type });
  };

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="text-yellow-600 text-lg">💡</div>
          <div>
            <h3 className="font-medium text-yellow-800">Pro Tip</h3>
            <p className="text-sm text-yellow-700 mt-1">
              For best results, we recommend creating a dedicated user in your portal. This ensures optimal automation performance and security.
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <UserTypeCard
          type="existing"
          title="Use Existing User"
          description="Connect using an existing portal user account"
          benefits={[
            "Quick setup process",
            "Works with any portal user",
            "No additional user creation needed"
          ]}
          considerations={[
            "May affect user activity tracking",
            "Potential stability issues",
            "Limited optimization features"
          ]}
          selected={state.userType?.type === "existing"}
          onSelect={() => handleUserTypeSelect("existing")}
          variant="purple"
        />

        <UserTypeCard
          type="dedicated"
          title="Create Dedicated User"
          description="Set up a dedicated Monto user for optimal automation"
          benefits={[
            "Optimized for automation",
            "Enhanced security features",
            "Advanced monitoring capabilities",
            "Better error handling"
          ]}
          considerations={[
            "Requires admin access to portal",
            "Additional setup steps needed"
          ]}
          selected={state.userType?.type === "dedicated"}
          onSelect={() => handleUserTypeSelect("dedicated")}
          variant="green"
          recommended={true}
        />
      </div>
    </div>
  );
}
