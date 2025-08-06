
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Users, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserType } from './types';

interface UserTypeStepProps {
  selectedUserType: UserType | null;
  onUserTypeSelect: (type: UserType) => void;
}

export function UserTypeStep({ selectedUserType, onUserTypeSelect }: UserTypeStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-600 text-lg font-bold">💡</div>
            <div className="text-left">
              <p className="text-sm font-medium text-blue-900 mb-1">Pro Tip</p>
              <p className="text-sm text-blue-700">
                We recommend using a dedicated Monto user for better security and easier management of your portal connections.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
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
                <span className="font-medium">Dedicated Monto User</span>
              </div>
              <p className="text-sm text-grey-600">
                Optimized for automation, secure and stable, unlocks advanced features.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
