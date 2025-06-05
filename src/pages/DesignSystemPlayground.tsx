import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from "@/lib/toast-helpers";
import { Toaster } from "@/components/ui/toaster";

export default function DesignSystemPlayground() {
  const [switchChecked, setSwitchChecked] = useState(false);

  const testToasts = () => {
    showSuccessToast("Operation successful", "Your changes have been saved successfully");
    setTimeout(() => {
      showErrorToast("Error occurred", "Something went wrong with the operation");
    }, 1000);
    setTimeout(() => {
      showWarningToast("Warning message", "Please check your input before proceeding");
    }, 2000);
    setTimeout(() => {
      showInfoToast("Information", "Here's some helpful information for you");
    }, 3000);
  };

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-8 text-grey-900">Monto Design System</h1>
        
        {/* Toast Notifications Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-grey-800">Toast Notifications</h2>
          <p className="text-grey-600 mb-4">Solid color toasts using Monto design tokens</p>
          <Button onClick={testToasts} className="bg-primary-main hover:bg-primary-dark text-white">
            Test All Toasts
          </Button>
        </section>

        {/* Switch Component Section */}
        <section className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold text-grey-800">Toggle Switch</h2>
          <p className="text-grey-600 mb-4">Enhanced switch with Monto styling and smooth animations</p>
          <div className="flex items-center space-x-3">
            <Switch 
              checked={switchChecked}
              onCheckedChange={setSwitchChecked}
            />
            <span className="text-grey-700">
              {switchChecked ? "Enabled" : "Disabled"}
            </span>
          </div>
        </section>
      </div>
      
      <Toaster />
    </div>
  );
}
