
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <Button 
          variant="ghost" 
          className="w-full justify-between p-0 h-auto font-normal text-[#8C92A3] hover:text-[#38415F] transition-colors"
        >
          <span className="text-sm">Other Resolution Options</span>
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${showOtherOptions ? 'rotate-180' : ''}`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <div className="bg-[#FAFBFC] rounded-xl border border-[#E4E5E9] p-6">
          <RadioGroup value={selectedAction || ''} onValueChange={onSelectedActionChange}>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <RadioGroupItem 
                  value="force_submit" 
                  id="force-submit" 
                  className="mt-1 border-[#D1D5DB] data-[state=checked]:border-[#7B59FF] data-[state=checked]:bg-[#7B59FF]" 
                />
                <div className="flex-1">
                  <Label htmlFor="force-submit" className="font-medium text-[#38415F] cursor-pointer text-sm leading-5">
                    Force submit
                  </Label>
                  <p className="text-sm text-[#8C92A3] mt-1 leading-5">
                    Submit the invoice despite missing data
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <RadioGroupItem 
                  value="exclude" 
                  id="exclude" 
                  className="mt-1 border-[#D1D5DB] data-[state=checked]:border-[#7B59FF] data-[state=checked]:bg-[#7B59FF]" 
                />
                <div className="flex-1">
                  <Label htmlFor="exclude" className="font-medium text-[#38415F] cursor-pointer text-sm leading-5">
                    Exclude from submission
                  </Label>
                  <p className="text-sm text-[#8C92A3] mt-1 leading-5">
                    Remove this invoice from processing
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <RadioGroupItem 
                  value="resolve_outside" 
                  id="resolve-outside" 
                  className="mt-1 border-[#D1D5DB] data-[state=checked]:border-[#7B59FF] data-[state=checked]:bg-[#7B59FF]" 
                />
                <div className="flex-1">
                  <Label htmlFor="resolve-outside" className="font-medium text-[#38415F] cursor-pointer text-sm leading-5">
                    Resolve outside monto
                  </Label>
                  <p className="text-sm text-[#8C92A3] mt-1 leading-5">
                    Mark as resolved if handled externally
                  </p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
