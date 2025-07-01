
import { DuplicationPolicyTab } from "./DuplicationPolicyTab";

export function PoliciesTab() {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Duplication Policy Section */}
      <section className="space-y-8">
        <DuplicationPolicyTab />
      </section>

      {/* Future policy sections can be added here */}
    </div>
  );
} 
