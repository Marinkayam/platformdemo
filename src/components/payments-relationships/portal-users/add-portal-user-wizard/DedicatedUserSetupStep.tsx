
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface DedicatedUserSetupStepProps {
  selectedPortal: string;
  isDedicatedUserConfirmed: boolean;
  setIsDedicatedUserConfirmed: (confirmed: boolean) => void;
}

export function DedicatedUserSetupStep({ selectedPortal, isDedicatedUserConfirmed, setIsDedicatedUserConfirmed }: DedicatedUserSetupStepProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-primary-lighter border-primary-main">
        <CardContent className="p-4">
          <h4 className="font-medium text-primary-main mb-4">Setup Instructions</h4>
          <ol className="space-y-4 list-decimal list-inside">
            <li className="text-grey-700">
              Log into your {selectedPortal} portal
            </li>
            <li className="text-grey-700">
              Create a new user with the username:
              <div className="mt-1 bg-white p-2 rounded border border-grey-200 font-mono text-sm">
                monto_integration_user_001
              </div>
            </li>
            <li className="text-grey-700">
              Assign the required permissions:
              <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                <li>Purchase Order Read Access</li>
                <li>Invoice Management</li>
                <li>Supplier Information Access</li>
                <li>API Integration Rights</li>
              </ul>
            </li>
            <li className="text-grey-700">
              Confirm the user creation
            </li>
          </ol>
        </CardContent>
      </Card>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="confirmDedicatedUser"
          checked={isDedicatedUserConfirmed}
          onCheckedChange={(checked) => setIsDedicatedUserConfirmed(checked as boolean)}
        />
        <Label htmlFor="confirmDedicatedUser">
          I've created this user in {selectedPortal} with the required permissions
        </Label>
      </div>
    </div>
  );
}
