
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ResolutionOptionsProps {
  selectedAction: string | null;
  showOtherOptions: boolean;
  onSelectedActionChange: (value: string) => void;
  onShowOtherOptionsChange: (show: boolean) => void;
}

export function ResolutionOptions({
  selectedAction,
  showOtherOptions,
  onSelectedActionChange,
  onShowOtherOptionsChange,
}: ResolutionOptionsProps) {
  return (
    <Collapsible open={showOtherOptions} onOpenChange={onShowOtherOptionsChange}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-0 h-auto font-normal">
          <span className="text-sm text-gray-600">Other Resolution Options</span>
          <ChevronDown 
            size={16} 
            className={`text-gray-400 transition-transform ${showOtherOptions ? 'rotate-180' : ''}`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3">
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <RadioGroup value={selectedAction || ''} onValueChange={onSelectedActionChange}>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="force_submit" id="force-submit" className="mt-1" />
                  <div>
                    <Label htmlFor="force-submit" className="font-medium text-gray-900 cursor-pointer">
                      Force Submit
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Submit the invoice despite missing data
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="exclude" id="exclude" className="mt-1" />
                  <div>
                    <Label htmlFor="exclude" className="font-medium text-gray-900 cursor-pointer">
                      Exclude Invoice
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Remove this invoice from processing
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="resolve_outside" id="resolve-outside" className="mt-1" />
                  <div>
                    <Label htmlFor="resolve-outside" className="font-medium text-gray-900 cursor-pointer">
                      Resolved Outside System
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      Mark as resolved if handled externally
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
