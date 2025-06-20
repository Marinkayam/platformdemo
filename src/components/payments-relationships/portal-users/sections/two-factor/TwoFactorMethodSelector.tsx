
import React from "react";
import { Label } from "@/components/ui/label";
import { Shield, Smartphone, Mail } from "lucide-react";

interface TwoFactorMethodSelectorProps {
  currentTwoFAMethod: string;
  onMethodChange: (method: string) => void;
}

export function TwoFactorMethodSelector({
  currentTwoFAMethod,
  onMethodChange
}: TwoFactorMethodSelectorProps) {
  const methodOptions = [
    { value: 'authenticator', label: 'Authenticator App', icon: Shield, description: 'Most secure option using apps like Google Authenticator' },
    { value: 'sms', label: 'SMS Verification', icon: Smartphone, description: 'Receive codes via text message to your phone' },
    { value: 'email', label: 'Email Verification', icon: Mail, description: 'Receive codes via email to your inbox' }
  ];

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-sm font-medium">Choose Verification Method</Label>
        <p className="text-xs text-gray-500 mt-1">Select how you want to receive verification codes</p>
      </div>
      
      <div className="grid gap-3">
        {methodOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = currentTwoFAMethod === option.value;
          
          return (
            <div
              key={option.value}
              className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-primary bg-primary/5' 
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              onClick={() => onMethodChange(option.value)}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-md ${isSelected ? 'bg-primary/10' : 'bg-gray-100'}`}>
                  <IconComponent className={`h-4 w-4 ${isSelected ? 'text-primary' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                      {option.label}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${isSelected ? 'text-primary/70' : 'text-gray-500'}`}>
                    {option.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
