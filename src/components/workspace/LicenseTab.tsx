
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
          <div className="mb-8">
            <h6 className="text-lg font-semibold text-gray-900 mb-1">Premium Features</h6>
            <p className="text-base text-gray-600">
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
                      ? "border-gray-200 bg-gray-50" 
                      : "border-green-200 bg-green-50"
                  }`}>
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isLocked 
                          ? "bg-gray-200" 
                          : "bg-green-100"
                      }`}>
                        <IconComponent 
                          size={20} 
                          className={isLocked ? "text-gray-400" : "text-green-600"} 
                        />
                      </div>
                      
                      <h6 className={`text-sm font-semibold ${
                        isLocked ? "text-gray-500" : "text-gray-800"
                      }`}>
                        {feature.name}
                      </h6>
                      
                      {isLocked ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="outline" className="bg-white text-gray-500 border-gray-300 cursor-help text-xs">
                              🔒 Locked
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This feature is part of Monto's Premium Package</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                          ✅ Included
                        </Badge>
                      )}
                    </div>
                    
                    {isLocked && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          PREMIUM FEATURE
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </TooltipProvider>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600 mb-3">
              Interested in premium features?
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
              Upgrade to Business Plan
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
