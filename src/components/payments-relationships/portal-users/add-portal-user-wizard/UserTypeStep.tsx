
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, Shield, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserType } from './types';

interface UserTypeStepProps {
  selectedUserType: UserType | null;
  onUserTypeSelect: (type: UserType) => void;
}

export function UserTypeStep({ selectedUserType, onUserTypeSelect }: UserTypeStepProps) {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label>Select User Type</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="space-y-2 text-sm">
                  <div><strong>Existing User:</strong> Use existing portal credentials. Quick setup but may affect tracking.</div>
                  <div><strong>Monto User:</strong> Dedicated user for Monto integration. Optimized for automation and unlocks advanced features.</div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary-main",
                    selectedUserType === 'existing' && "border-primary-main bg-primary-lighter"
                  )}
                  onClick={() => onUserTypeSelect('existing')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-5 w-5 text-primary-main" />
                      <span className="font-medium">Existing User</span>
                    </div>
                    <p className="text-sm text-grey-600">
                      Quick setup, compatible with most portals. Shared use may affect tracking.
                    </p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Use existing portal credentials. Quick setup but may affect tracking.</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:border-primary-main relative",
                    selectedUserType === 'dedicated' && "border-primary-main bg-primary-lighter"
                  )}
                  onClick={() => onUserTypeSelect('dedicated')}
                >
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-primary-main text-white">Recommended</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-primary-main" />
                      <span className="font-medium">Monto User</span>
                    </div>
                    <p className="text-sm text-grey-600">
                      Optimized for automation, secure and stable, unlocks advanced features.
                    </p>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dedicated user for Monto integration. Optimized for automation and unlocks advanced features.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
