
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography/typography";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  const [expandedExamples, setExpandedExamples] = useState<Set<DuplicationMode>>(new Set());
  const [showSaveModal, setShowSaveModal] = useState(false);

  const duplicationOptions = [
    {
      id: "auto-replace" as DuplicationMode,
      title: "Auto Replacement",
      badge: "Simple workflows",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      description: "Monto will automatically replace older invoices if they're marked Invalid or Rejected.",
      example: "INV-0098 (Rejected) ➝ INV-0098 (Submitted)",
      note: "Replacement happens silently when original status is Invalid or Rejected."
    },
    {
      id: "stop-and-ask" as DuplicationMode,
      title: "Stop and Ask",
      badge: "Recommended",
      badgeColor: "bg-primary-50 text-primary-700 border-primary-200",
      description: "Monto pauses and asks you to choose the valid invoice when both are in acceptable statuses.",
      example: "INV-0098 (Submitted) ⟷ INV-0098 (Approved)\nYou choose which version to keep.",
      note: "For when both invoices have valid statuses like Submitted, Approved, or Paid."
    }
  ];

  const toggleExample = (modeId: DuplicationMode) => {
    setExpandedExamples(prev => {
      const newSet = new Set(prev);
      if (newSet.has(modeId)) {
        newSet.delete(modeId);
      } else {
        newSet.add(modeId);
      }
      return newSet;
    });
  };

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
        <div className="space-y-8">
          {duplicationOptions.map((option) => {
            const isSelected = selectedMode === option.id;
            const isExampleExpanded = expandedExamples.has(option.id);
            
            return (
              <div key={option.id} className="relative">
                <Label htmlFor={option.id} className="cursor-pointer">
                  <Card 
                    className={`transition-all duration-200 ${
                      isSelected 
                        ? "border-primary-main border-2 shadow-sm bg-primary-main/5" 
                        : "border-grey-200 hover:border-grey-300 hover:shadow-sm"
                    }`}
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        {/* Radio Button */}
                        <div className="flex items-center pt-1">
                          <RadioGroupItem value={option.id} id={option.id} />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 space-y-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-3">
                              <Typography variant="h6" className="text-grey-900">
                                {option.title}
                              </Typography>
                              <Badge className={`text-sm font-normal border ${option.badgeColor}`}>
                                {option.badge}
                              </Badge>
                            </div>
                            {isSelected && (
                              <Badge className="bg-primary-main text-white text-sm font-normal">
                                Selected
                              </Badge>
                            )}
                          </div>
                          
                          <Typography variant="body2" className="text-grey-600 leading-relaxed">
                            {option.description}
                          </Typography>
                          
                          {/* Collapsible Example */}
                          <div className="border-t border-grey-200 pt-6">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleExample(option.id);
                              }}
                              className="flex items-center gap-2 text-sm text-grey-600 hover:text-grey-800 transition-colors"
                            >
                              <span>Show Example</span>
                              {isExampleExpanded ? (
                                <ChevronUp size={16} />
                              ) : (
                                <ChevronDown size={16} />
                              )}
                            </button>
                            
                            {isExampleExpanded && (
                              <div className="mt-6 space-y-4">
                                <Typography variant="body3" className="text-grey-700 font-mono bg-grey-50 px-4 py-3 rounded-md whitespace-pre-line">
                                  {option.example}
                                </Typography>
                                <Typography variant="caption" className="text-grey-500">
                                  {option.note}
                                </Typography>
                              </div>
                            )}
                          </div>
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
