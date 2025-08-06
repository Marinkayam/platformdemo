
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { FormData } from './types';

interface ExistingUserSetupStepProps {
    selectedPortal: string;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    showConfirmPassword: boolean;
    setShowConfirmPassword: (show: boolean) => void;
}

export function ExistingUserSetupStep({ selectedPortal, formData, setFormData, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }: ExistingUserSetupStepProps) {
  const getPortalLogoUrl = (portalName: string) => `/portal-logos/${portalName.toLowerCase().replace(/\s+/g, '-')}.svg`;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Portal</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full overflow-hidden flex items-center justify-center bg-white border">
              <img
                src={getPortalLogoUrl(selectedPortal)}
                alt={`${selectedPortal} logo`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/portal-logos/placeholder.svg';
                }}
              />
            </div>
            <Input value={selectedPortal} disabled className="pl-12" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Username</Label>
          <Input
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            placeholder="Enter portal username"
          />
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter portal password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Confirm Password</Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              placeholder="Confirm portal password"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-sm text-red-600">Passwords do not match</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="enable2FA">Enable Two-Factor Authentication</Label>
          <Switch
            id="enable2FA"
            checked={formData.enable2FA}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, enable2FA: checked }))}
          />
        </div>
        {formData.enable2FA && (
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <Label>2FA Method</Label>
              <Select
                value={formData.twoFAMethod}
                onValueChange={(value: 'authenticator' | 'sms' | 'email' | 'other') => 
                  setFormData(prev => ({ ...prev, twoFAMethod: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select 2FA method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="authenticator">Authenticator App</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.twoFAMethod === 'sms' && (
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="Enter phone number"
                />
              </div>
            )}
            {formData.twoFAMethod === 'email' && (
              <div className="space-y-2">
                <Label>Verification Email</Label>
                <Input
                  value={formData.verificationEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, verificationEmail: e.target.value }))}
                  placeholder="Enter verification email"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
