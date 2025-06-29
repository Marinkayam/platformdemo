import { DuplicationPolicyTab } from "./DuplicationPolicyTab";
import { Typography } from "@/components/ui/typography/typography";

export function PoliciesTab() {
  return (
    <div className="space-y-12 animate-fade-in">
      <div className="space-y-4">
        <Typography variant="h5" className="text-grey-900">
          Policies
        </Typography>
        <Typography variant="body1" className="text-grey-600">
          Manage your company policies. More policy types will appear here soon.
        </Typography>
      </div>

      {/* Duplication Policy Section */}
      <section className="space-y-8">
        <Typography variant="h6" className="text-grey-900">
          Duplication Policy
        </Typography>
        <DuplicationPolicyTab />
      </section>

      {/* Future policy sections can be added here */}
    </div>
  );
} 