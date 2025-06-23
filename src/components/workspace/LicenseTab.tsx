
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Typography } from "@/components/ui/typography/typography";
import { Check, Lock, BarChart3, Users, FileText, Link, UserCheck, Receipt } from "lucide-react";

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
      icon: Link
    },
    {
      label: "Users (Monto + View Only)",
      value: "10 Monto / 5 View Only",
      icon: UserCheck
    },
    {
      label: "Invoices Tracked",
      value: "Up to 2,000",
      icon: Receipt
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <Typography variant="h5" className="text-grey-900 mb-2">
          License & Package
        </Typography>
        <Typography variant="body2" className="text-grey-600">
          Overview of your Monto plan and features.
        </Typography>
      </div>

      {/* License Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {licenseInfo.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card 
              key={item.label} 
              className="group border-grey-300 hover:border-grey-400 transition-all duration-200 hover:shadow-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-lg bg-grey-100 flex items-center justify-center group-hover:bg-grey-200 transition-colors duration-200">
                  <IconComponent 
                    size={20} 
                    className="text-grey-600 group-hover:text-grey-700 transition-colors duration-200"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <Typography variant="caption" className="text-grey-600 uppercase tracking-wide mb-1 block">
                    {item.label}
                  </Typography>
                  <Typography variant="h6" className="text-grey-900 font-semibold">
                    {item.value}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Premium Features Section */}
      <div className="mt-16 pt-8 border-t border-grey-300">
        <div className="text-center mb-8">
          <Typography variant="h6" className="text-grey-900 mb-2">
            Premium Features
          </Typography>
          <Typography variant="body2" className="text-grey-600">
            Included in your plan:
          </Typography>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TooltipProvider>
            {premiumFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const isLocked = feature.status === "locked";
              
              return (
                <Card 
                  key={feature.name} 
                  className={`group transition-all duration-200 hover:scale-[1.02] ${
                    isLocked 
                      ? "border-grey-300 bg-grey-50 hover:border-grey-400" 
                      : "border-primary-main bg-primary-main hover:border-primary-dark hover:shadow-lg"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-12 h-12 mx-auto rounded-lg flex items-center justify-center ${
                      isLocked 
                        ? "bg-white border border-grey-200" 
                        : "bg-white/20 backdrop-blur-sm"
                    }`}>
                      <IconComponent 
                        size={20} 
                        className={isLocked ? "text-grey-600" : "text-white"} 
                        strokeWidth={1.5}
                      />
                    </div>
                    
                    <Typography 
                      variant="subtitle1" 
                      className={isLocked ? "text-grey-700" : "text-white"}
                    >
                      {feature.name}
                    </Typography>
                    
                    <div className="flex justify-center">
                      {isLocked ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge variant="secondary" className="bg-white border-grey-200 text-grey-700 hover:bg-grey-50">
                              <Lock size={12} className="mr-1" />
                              Locked
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>This feature is part of Monto's Premium Package</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                          <Check size={12} className="mr-1" />
                          Included
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  
                  {isLocked && (
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-grey-700 text-white text-xs hover:bg-grey-800">
                        PREMIUM
                      </Badge>
                    </div>
                  )}
                </Card>
              );
            })}
          </TooltipProvider>
        </div>

        {/* Contact Section */}
        <div className="mt-8 pt-6 border-t border-grey-200 text-center">
          <Typography variant="body2" className="text-grey-600 mb-4">
            Interested in premium features?
          </Typography>
          <Button className="bg-primary-main hover:bg-primary-dark text-white px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
