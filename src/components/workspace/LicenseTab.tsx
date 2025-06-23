
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Lock, BarChart3, Users, FileText } from "lucide-react";

export function LicenseTab() {
  const premiumFeatures = [
    { name: "PO Dashboard", status: "included" as const, icon: BarChart3 },
    { name: "Connections", status: "locked" as const, icon: Users },
    { name: "Custom Divisions View", status: "locked" as const, icon: FileText },
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

      {/* Premium Features Section - Solid Design */}
      <div className="mt-12 pt-8 border-t border-grey-300">
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
                  className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-[1.02] ${
                    isLocked 
                      ? "bg-gradient-to-br from-grey-100 to-grey-200 border-2 border-grey-300 hover:border-grey-400" 
                      : "bg-gradient-to-br from-primary-main to-primary-dark border-2 border-primary-main hover:border-primary-dark shadow-lg hover:shadow-xl"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="p-8 text-center space-y-6">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                      isLocked 
                        ? "bg-white shadow-sm" 
                        : "bg-white/20 backdrop-blur-sm shadow-lg"
                    }`}>
                      <IconComponent 
                        size={28} 
                        className={`transition-all duration-300 ${
                          isLocked 
                            ? "text-grey-600" 
                            : "text-white"
                        }`} 
                      />
                    </div>
                    
                    <h6 className={`text-lg font-bold transition-colors duration-300 ${
                      isLocked ? "text-grey-700" : "text-white"
                    }`}>
                      {feature.name}
                    </h6>
                    
                    <div className="flex justify-center">
                      {isLocked ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm cursor-help">
                              <Lock size={14} className="text-grey-600" />
                              <span className="text-sm font-medium text-grey-700">Locked</span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This feature is part of Monto's Premium Package</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                          <Check size={14} className="text-white" />
                          <span className="text-sm font-medium text-white">Included</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isLocked && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-grey-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                        PREMIUM
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </TooltipProvider>
        </div>

        <div className="mt-10 pt-8 border-t border-grey-200 text-center">
          <p className="text-sm text-grey-600 mb-6">
            Interested in premium features?
          </p>
          <button className="bg-primary-main text-white px-8 py-4 rounded-xl hover:bg-primary-dark transition-all duration-300 font-semibold hover:scale-105 hover:shadow-lg">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
