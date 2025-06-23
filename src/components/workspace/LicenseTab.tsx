
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

  const licenseInfo = [
    {
      label: "Smart Connects (SC)",
      value: "Up to 50",
      icon: "🔗"
    },
    {
      label: "Users (Monto + View Only)",
      value: "10 Monto / 5 View Only",
      icon: "👥"
    },
    {
      label: "Invoices Tracked",
      value: "Up to 2,000",
      icon: "📄"
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h6 className="text-lg font-semibold text-grey-900 mb-1">License & Package</h6>
        <p className="text-base text-grey-600">
          Overview of your Monto plan and features.
        </p>
      </div>

      {/* License Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {licenseInfo.map((item, index) => (
          <Card 
            key={item.label} 
            className="group shadow-none border border-grey-300 rounded-xl hover:shadow-md transition-all duration-300 hover:border-primary-light"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6 text-center">
              <div className="mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h6 className="text-sm font-medium text-grey-800 mb-3 leading-tight">
                {item.label}
              </h6>
              <div className="text-lg font-semibold text-grey-900 group-hover:text-primary-main transition-colors duration-300">
                {item.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Premium Features Section - Moved to bottom */}
      <div className="mt-12 pt-8 border-t border-grey-300">
        <Card className="shadow-none border border-grey-300 rounded-xl overflow-hidden">
          <CardContent className="p-8">
            <div className="mb-8 text-center">
              <h6 className="text-lg font-semibold text-grey-900 mb-2">Premium Features</h6>
              <p className="text-base text-grey-600">
                Included in your plan:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TooltipProvider>
                {premiumFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  const isLocked = feature.status === "locked";
                  
                  return (
                    <div 
                      key={feature.name} 
                      className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        isLocked 
                          ? "border-grey-300 bg-grey-50 hover:border-grey-400" 
                          : "border-primary-light bg-primary-lighter hover:border-primary-main hover:shadow-lg"
                      }`}
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                          isLocked 
                            ? "bg-grey-300 group-hover:bg-grey-400" 
                            : "bg-primary-light group-hover:bg-primary-main"
                        }`}>
                          <IconComponent 
                            size={20} 
                            className={`transition-colors duration-300 ${
                              isLocked 
                                ? "text-grey-600" 
                                : "text-primary-main group-hover:text-white"
                            }`} 
                          />
                        </div>
                        
                        <h6 className={`text-sm font-semibold transition-colors duration-300 ${
                          isLocked ? "text-grey-600" : "text-grey-900 group-hover:text-primary-main"
                        }`}>
                          {feature.name}
                        </h6>
                        
                        {isLocked ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className="bg-white text-grey-600 border-grey-400 cursor-help text-xs hover:border-grey-500 transition-colors duration-300">
                                🔒 Locked
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This feature is part of Monto's Premium Package</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Badge className="bg-success-main text-white border-success-main text-xs hover:bg-success-dark transition-colors duration-300">
                            ✅ Included
                          </Badge>
                        )}
                      </div>
                      
                      {isLocked && (
                        <div className="absolute top-3 right-3">
                          <div className="bg-primary-main text-primary-contrast-text text-xs px-2 py-1 rounded-full font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                            PREMIUM FEATURE
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </TooltipProvider>
            </div>

            <div className="mt-8 pt-6 border-t border-grey-300 text-center">
              <p className="text-sm text-grey-600 mb-4">
                Interested in premium features?
              </p>
              <button className="bg-primary-main text-primary-contrast-text px-6 py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg">
                Contact Us
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
