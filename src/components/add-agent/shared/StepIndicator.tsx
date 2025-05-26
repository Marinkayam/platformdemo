
import { useAddAgent } from "@/context/AddAgentContext";

export function StepIndicator() {
  const { state } = useAddAgent();

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return "Select Portal";
      case 2:
        return "Choose User Type";
      case 3:
        return "Configure Credentials";
      default:
        return "";
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="text-sm text-gray-500">
        Step {state.currentStep} of 3
      </div>
      <h1 className="text-3xl font-semibold text-gray-900">
        {getStepTitle(state.currentStep)}
      </h1>
      <div className="flex justify-center space-x-3 mt-6">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-2 w-12 rounded-full transition-colors ${
              step <= state.currentStep
                ? "bg-[#7B59FF]"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
