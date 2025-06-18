
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Lock } from "lucide-react";

export function LicenseTab() {
  const premiumFeatures = [
    { name: "PO Dashboard", status: "included" as const, icon: Check },
    { name: "Connections", status: "locked" as const, icon: Lock },
    { name: "Custom Divisions View", status: "locked" as const, icon: Lock },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h6 className="text-lg font-semibold text-grey-900 mb-1">License & Package</h6>
        <p className="text-base text-grey-600">
          Overview of your Monto plan and features.
        </p>
      </div>

      <Card className="shadow-none border border-grey-400 rounded-xl">
        <CardContent className="p-10">
          <div className="mb-8">
            <h6 className="text-lg font-semibold text-grey-900 mb-1">Premium Features</h6>
            <p className="text-base text-grey-600">
              Included in your plan:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TooltipProvider>
              {premiumFeatures.map((feature) => {
                const IconComponent = feature.icon;
                const isLocked = feature.status === "locked";
                
                return (
                  <div key={feature.name} className={`relative p-6 rounded-lg border-2 transition-all ${
                    isLocked 
                      ? "border-grey-400 bg-grey-200" 
                      : "border-primary-light bg-primary-lighter"
                  }`}>
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isLocked 
                          ? "bg-grey-500" 
                          : "bg-primary-light"
                      }`}>
                        <IconComponent 
                          size={20} 
                          className={isLocked ? "text-grey-600" : "text-primary-main"} 
                        />
                      </div>
                      
                      <h6 className={`text-sm font-semibold ${
                        isLocked ? "text-grey-600" : "text-grey-900"
                      }`}>
                        {feature.name}
                      </h6>
                      
                      {isLocked ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="bg-white text-grey-600 border-grey-500 cursor-help text-xs">
                              🔒 Locked
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This feature is part of Monto's Premium Package</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Badge className="bg-success-main text-white border-success-main text-xs">
                          ✅ Included
                        </Badge>
                      )}
                    </div>
                    
                    {isLocked && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-primary-main text-primary-contrast-text text-xs px-2 py-1 rounded-full font-medium">
                          PREMIUM FEATURE
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </TooltipProvider>
          </div>

          <div className="mt-8 pt-6 border-t border-grey-400 text-center">
            <p className="text-sm text-grey-600 mb-3">
              Interested in premium features?
            </p>
            <button className="bg-primary-main text-primary-contrast-text px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium">
              Contact Us
            </button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none border border-grey-400 rounded-xl">
        <CardContent className="p-10 space-y-7">
          <div>
            <label className="block text-[15px] mb-2 font-medium text-grey-800">Smart Connects (SC)</label>
            <Input className="h-12 bg-grey-200 text-base font-normal" value="Up to 50" disabled />
          </div>
          <div>
            <label className="block text-[15px] mb-2 font-medium text-grey-800">Users (Monto + View Only)</label>
            <Input className="h-12 bg-grey-200 text-base font-normal" value="10 Monto / 5 View Only" disabled />
          </div>
          <div>
            <label className="block text-[15px] mb-2 font-medium text-grey-800">Invoices Tracked</label>
            <Input className="h-12 bg-grey-200 text-base font-normal" value="Up to 2,000" disabled />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
