
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography/typography";
import { CheckCircle, Hand, StopCircle, ChevronDown, ChevronUp } from "lucide-react";

type DuplicationMode = "auto-replace" | "stop-and-ask" | "manual-review";

export function DuplicationPolicyTab() {
  const [selectedMode, setSelectedMode] = useState<DuplicationMode>("auto-replace");
  const [expandedExamples, setExpandedExamples] = useState<Set<DuplicationMode>>(new Set());

  const duplicationOptions = [
    {
      id: "auto-replace" as DuplicationMode,
      title: "Automatically Replace Invalid/Rejected",
      badge: "Recommended for simple workflows",
      badgeColor: "bg-blue-100 text-blue-800",
      description: "Monto will automatically replace duplicates if the original version is marked Invalid or Rejected.",
      example: "INV-0098 (Rejected) → INV-0098 (Submitted)",
      note: "No manual steps required.",
      icon: CheckCircle,
      iconColor: "text-blue-600"
    },
    {
      id: "stop-and-ask" as DuplicationMode,
      title: "Stop and Ask",
      badge: "Recommended for complex approvals",
      badgeColor: "bg-amber-100 text-amber-800",
      description: "Monto auto-replaces rejected invoices, but asks you to decide if both are valid (e.g. Submitted vs. Approved).",
      example: "INV-0098 (Submitted) ↔ INV-0098 (Approved)",
      note: "You pick the one to track.",
      icon: Hand,
      iconColor: "text-amber-600"
    },
    {
      id: "manual-review" as DuplicationMode,
      title: "Manual Review Required",
      badge: "Full control",
      badgeColor: "bg-red-100 text-red-800",
      description: "Monto pauses for every duplicate, no matter its status. You always decide.",
      example: "Every match must be reviewed",
      note: "For organizations with strict invoice handling policies.",
      icon: StopCircle,
      iconColor: "text-red-600"
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

  const selectedOption = duplicationOptions.find(option => option.id === selectedMode);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <Typography variant="h5" className="text-grey-900 mb-2">
          Duplication Handling Policy
        </Typography>
        <Typography variant="body1" className="text-grey-600">
          How should Monto deal with duplicate invoices from your portals?
        </Typography>
      </div>

      {/* Radio Group Cards */}
      <RadioGroup value={selectedMode} onValueChange={(value) => setSelectedMode(value as DuplicationMode)}>
        <div className="space-y-3">
          {duplicationOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedMode === option.id;
            const isExampleExpanded = expandedExamples.has(option.id);
            
            return (
              <div key={option.id} className="relative">
                <Label htmlFor={option.id} className="cursor-pointer">
                  <Card 
                    className={`transition-all duration-200 ${
                      isSelected 
                        ? "border-blue-500 border-2 shadow-sm bg-blue-50/30" 
                        : "border-grey-200 hover:border-grey-300 hover:shadow-sm"
                    }`}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Radio Button */}
                        <div className="flex items-center pt-0.5">
                          <RadioGroupItem value={option.id} id={option.id} />
                        </div>
                        
                        {/* Icon */}
                        <div className="flex-shrink-0 pt-0.5">
                          <IconComponent 
                            size={20} 
                            className={option.iconColor}
                            strokeWidth={1.5}
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <Typography variant="h6" className="text-grey-900 mb-1">
                                {option.title}
                              </Typography>
                              <Badge className={`text-xs ${option.badgeColor} hover:${option.badgeColor}`}>
                                {option.badge}
                              </Badge>
                            </div>
                            {isSelected && (
                              <Badge className="bg-blue-600 text-white text-xs">
                                Selected
                              </Badge>
                            )}
                          </div>
                          
                          <Typography variant="body2" className="text-grey-600 leading-relaxed">
                            {option.description}
                          </Typography>
                          
                          {/* Collapsible Example */}
                          <div className="border-t border-grey-200 pt-3">
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
                              <div className="mt-3 space-y-2">
                                <Typography variant="body3" className="text-grey-700 font-mono bg-grey-50 px-3 py-2 rounded">
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

      {/* Footer Status */}
      <div className="pt-4 border-t border-grey-200">
        <Typography variant="body3" className="text-grey-600">
          <span className="font-medium">Currently active mode:</span> {selectedOption?.title}
        </Typography>
      </div>
    </div>
  );
}
