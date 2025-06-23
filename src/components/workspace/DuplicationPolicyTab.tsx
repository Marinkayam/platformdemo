
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography/typography";
import { CheckCircle, Hand, StopCircle, Info } from "lucide-react";

type DuplicationMode = "auto-replace" | "stop-and-ask" | "manual-review";

export function DuplicationPolicyTab() {
  const [selectedMode, setSelectedMode] = useState<DuplicationMode>("stop-and-ask");

  const duplicationOptions = [
    {
      id: "auto-replace" as DuplicationMode,
      title: "Automatically Replace Invalid/Rejected Invoices",
      description: "Monto will auto-replace older invoices only if they're marked Invalid or Rejected.",
      icon: CheckCircle,
      example: "INV-0098 (Rejected) → INV-0098 (Submitted)",
      note: "This happens automatically. No manual action required.",
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: "stop-and-ask" as DuplicationMode,
      title: "Stop and Ask (Recommended)",
      description: "Monto will auto-replace invalid/rejected invoices, but pause and ask you to decide when both invoices are in valid statuses (e.g., Submitted, Approved, Paid).",
      icon: Hand,
      example: "INV-0098 (Submitted) ↔ INV-0098 (Approved) → You choose which version to keep.",
      note: "This ensures you keep the most accurate, business-critical version.",
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      isRecommended: true
    },
    {
      id: "manual-review" as DuplicationMode,
      title: "Manual Review Required",
      description: "Monto will pause every time a duplicate is found, regardless of status. You'll always choose whether to keep the original or replace it.",
      icon: StopCircle,
      example: "All duplicates require your decision",
      note: "Full control over which invoice Monto tracks when duplicates arise.",
      iconColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  ];

  const selectedOption = duplicationOptions.find(option => option.id === selectedMode);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <Typography variant="h5" className="text-grey-900 mb-1">
          Duplication Handling Policy
        </Typography>
        <Typography variant="body1" className="text-grey-600 mb-4">
          How should Monto deal with duplicate invoices from your portals?
        </Typography>
        <Typography variant="body2" className="text-grey-600">
          Monto detects and flags invoices that appear to be duplicates. You can choose how you'd like these handled automatically or manually:
        </Typography>
      </div>

      {/* Radio Group Cards */}
      <RadioGroup value={selectedMode} onValueChange={(value) => setSelectedMode(value as DuplicationMode)}>
        <div className="space-y-4">
          {duplicationOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedMode === option.id;
            
            return (
              <div key={option.id} className="relative">
                <Label htmlFor={option.id} className="cursor-pointer">
                  <Card 
                    className={`transition-all duration-200 hover:shadow-md ${
                      isSelected 
                        ? `${option.borderColor} bg-white border-2 shadow-sm` 
                        : "border-grey-300 hover:border-grey-400"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Radio Button */}
                        <div className="flex items-center pt-1">
                          <RadioGroupItem value={option.id} id={option.id} />
                        </div>
                        
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${option.bgColor} flex items-center justify-center`}>
                          <IconComponent 
                            size={24} 
                            className={option.iconColor}
                            strokeWidth={1.5}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <Typography variant="h6" className="text-grey-900">
                              {option.title}
                            </Typography>
                            {option.isRecommended && (
                              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                Recommended
                              </span>
                            )}
                          </div>
                          
                          <Typography variant="body2" className="text-grey-600">
                            {option.description}
                          </Typography>
                          
                          {/* Example */}
                          <div className="bg-grey-100 p-3 rounded-lg">
                            <Typography variant="caption" className="text-grey-500 uppercase tracking-wide block mb-1">
                              Example:
                            </Typography>
                            <Typography variant="body3" className="text-grey-700 font-mono">
                              {option.example}
                            </Typography>
                          </div>
                          
                          {/* Note */}
                          <div className="flex items-start gap-2 text-sm">
                            <IconComponent size={16} className={`${option.iconColor} flex-shrink-0 mt-0.5`} />
                            <Typography variant="body3" className="text-grey-600">
                              {option.note}
                            </Typography>
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

      {/* Helper Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <Typography variant="subtitle2" className="text-blue-900 mb-1">
                Current Setting: {selectedOption?.title}
              </Typography>
              <Typography variant="body3" className="text-blue-700">
                This setting ensures {selectedMode === "manual-review" ? "full control" : selectedMode === "auto-replace" ? "automatic handling of invalid/rejected duplicates" : "automatic handling with manual review for valid statuses"} over which invoice Monto tracks when duplicates arise.
              </Typography>
              {selectedMode === "stop-and-ask" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Typography variant="body3" className="text-blue-700 underline cursor-help mt-1 inline-block">
                        What are "valid statuses"?
                      </Typography>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Valid statuses include: Submitted, Approved, Paid. Invalid/Rejected invoices are still replaced automatically.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
