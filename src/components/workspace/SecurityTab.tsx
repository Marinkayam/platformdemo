
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ConfirmRemoveModal } from "@/components/payments-relationships/portal-users/ConfirmRemoveModal";
import { showSuccessToast } from "@/lib/toast-helpers";

export function SecurityTab() {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  
  return (
    <>
      <div className="space-y-6">
        <div>
          <h6 className="text-lg font-semibold text-gray-900 mb-1">Security</h6>
          <p className="text-base text-gray-600">Manage security settings and access controls.</p>
        </div>
        <Card className="shadow-none border border-[#ececec] rounded-xl">
          <CardContent className="flex flex-col items-center justify-center min-h-[180px] gap-4">
            <span className="text-gray-500 text-lg">Security settings coming soon...</span>
            <Button variant="destructive" onClick={() => setIsRemoveModalOpen(true)}>
              Test Remove Modal
            </Button>
          </CardContent>
        </Card>
      </div>
      <ConfirmRemoveModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={() => {
          setIsRemoveModalOpen(false);
          showSuccessToast("Confirmed!", "The modal is working as expected.");
        }}
        itemName="Test Item"
      />
    </>
  );
}
