
import { PageHeader } from "@/components/common/PageHeader";

export default function Settings() {
  return (
    <div>
      <PageHeader 
        title="Settings" 
        subtitle="Manage your account preferences and application settings" 
      />
      
      <div className="space-y-6">
        {/* Settings content will be added here in the future */}
        <div className="text-center py-12">
          <p className="text-gray-500">Settings page coming soon...</p>
        </div>
      </div>
    </div>
  );
}
