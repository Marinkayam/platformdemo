
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
        <h6 className="text-lg font-semibold text-gray-900 mb-1">License & Package</h6>
        <p className="text-base text-gray-600">
          Overview of your Monto plan and features.
        </p>
      </div>
      <Card className="shadow-none border border-[#ececec] rounded-xl">
        <CardContent className="p-10 space-y-7">
          <div>
            <label className="block text-[15px] mb-2 font-medium text-gray-800">Smart Connects (SC)</label>
            <Input className="h-12 bg-gray-100 text-base font-normal" value="Up to 50" disabled />
          </div>
          <div>
            <label className="block text-[15px] mb-2 font-medium text-gray-800">Users (Monto + View Only)</label>
            <Input className="h-12 bg-gray-100 text-base font-normal" value="10 Monto / 5 View Only" disabled />
          </div>
          <div>
            <label className="block text-[15px] mb-2 font-medium text-gray-800">Invoices Tracked</label>
            <Input className="h-12 bg-gray-100 text-base font-normal" value="Up to 2,000" disabled />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none border border-[#ececec] rounded-xl">
        <CardContent className="p-10">
          <div className="mb-6">
            <h6 className="text-lg font-semibold text-gray-900 mb-1">Premium Features</h6>
            <p className="text-base text-gray-600">
              Included in your plan:
            </p>
          </div>
          
          <div className="space-y-4">
            <TooltipProvider>
              {premiumFeatures.map((feature) => {
                const IconComponent = feature.icon;
                const isLocked = feature.status === "locked";
                
                return (
                  <div key={feature.name} className="flex items-center justify-between">
                    <div className={`flex items-center gap-3 ${isLocked ? "opacity-50" : ""}`}>
                      <IconComponent 
                        size={16} 
                        className={isLocked ? "text-gray-400" : "text-green-600"} 
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {feature.name}
                      </span>
                    </div>
                    
                    {isLocked ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-300 cursor-help">
                            🔒 Locked
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This feature is part of Monto's Premium Package</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        ✅ Included
                      </Badge>
                    )}
                  </div>
                );
              })}
            </TooltipProvider>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Interested in premium features?{" "}
              <button className="text-primary hover:underline font-medium">
                Contact Us
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
