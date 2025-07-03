
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography/typography";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DuplicationMode = "auto-replace" | "stop-and-ask";

export function DuplicationPolicyTab() {
  const [selectedMode, setSelectedMode] = useState<DuplicationMode>("stop-and-ask");
  
  const [showSaveModal, setShowSaveModal] = useState(false);

  const duplicationOptions = [
    {
      id: "auto-replace" as DuplicationMode,
      title: "Auto Replacement",
      description: "Monto will automatically replace older invoices if they're marked Invalid or Rejected. This option provides seamless processing when duplicate invoices are detected with clearly invalid statuses. The system will keep the newer version and archive the older one without interrupting your workflow.",
      details: "Best for: High-volume environments where speed is essential and you trust the status indicators. The replacement happens silently when the original invoice status is Invalid, Rejected, or Cancelled."
    },
    {
      id: "stop-and-ask" as DuplicationMode,
      title: "Stop and Ask",
      description: "Monto pauses and asks you to choose the valid invoice when both are in acceptable statuses. This gives you full control over which version to keep when duplicates are detected. You'll receive a notification and can review both invoices before making a decision.",
      details: "Best for: Environments requiring manual review and approval processes. Recommended when both invoices have valid statuses like Submitted, Approved, or Paid, ensuring no important invoice data is accidentally replaced."
    }
  ];


  const handleSave = () => {
    setShowSaveModal(false);
    // Handle save logic here
    console.log('Duplication policy saved:', selectedMode);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <Typography variant="h5" className="text-grey-900">
          Duplication Handling Policy
        </Typography>
        <Typography variant="body1" className="text-grey-600">
          How should Monto deal with duplicate invoices from your portals?
        </Typography>
      </div>

      {/* Radio Group Cards */}
      <RadioGroup value={selectedMode} onValueChange={(value) => setSelectedMode(value as DuplicationMode)}>
        <div className="space-y-6">
          {duplicationOptions.map((option) => {
            const isSelected = selectedMode === option.id;
            
            return (
              <div key={option.id} className="relative">
                <Label htmlFor={option.id} className="cursor-pointer">
                  <Card 
                    className={`transition-all duration-300 ${
                      isSelected 
                        ? "border-primary border-2 shadow-md bg-primary/5" 
                        : "border-grey-200 hover:border-primary/30 hover:shadow-sm hover:bg-grey-50/50"
                    }`}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        {/* Radio Button */}
                        <div className="flex items-center pt-1">
                          <RadioGroupItem value={option.id} id={option.id} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <Typography variant="h6" className="text-grey-900">
                              {option.title}
                            </Typography>
                            {isSelected && (
                              <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                                ✓ Selected
                              </div>
                            )}
                          </div>
                          
                          <Typography variant="body2" className="text-grey-600 leading-relaxed">
                            {option.description}
                          </Typography>
                          
                          <Typography variant="body3" className="text-grey-500 text-sm">
                            {option.details}
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Label>
              </div>
            );
          })}
        </div>
      </RadioGroup>

      {/* Save Button */}
      <div className="pt-8 border-t border-grey-200 flex justify-end">
        <Button 
          onClick={() => setShowSaveModal(true)}
          className="bg-primary-main hover:bg-primary-dark text-white px-8 py-2"
        >
          Save Policy
        </Button>
      </div>

      {/* Confirmation Modal */}
      <AlertDialog open={showSaveModal} onOpenChange={setShowSaveModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Duplication Policy?</AlertDialogTitle>
            <AlertDialogDescription>
              This will update how Monto handles duplicate invoices across all your connected portals. 
              The new policy will take effect immediately for all future duplicate detections.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSave} className="bg-primary-main hover:bg-primary-dark">
              Save Policy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
