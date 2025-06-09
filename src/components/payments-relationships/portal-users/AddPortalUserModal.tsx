
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PortalSelection } from '@/components/onboarding/PortalSelection';
import { Eye, EyeOff } from 'lucide-react';
import { PortalUser } from '@/types/portalUser';

interface AddPortalUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  portalUser?: PortalUser;
  onSave: (portalUser: Partial<PortalUser>) => void;
}

export function AddPortalUserModal({ 
  isOpen, 
  onClose, 
  mode, 
  portalUser, 
  onSave 
}: AddPortalUserModalProps) {
  const [formData, setFormData] = useState({
    portal: portalUser?.portal || '',
    username: portalUser?.username || '',
    password: '',
    portalUrl: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const isReadOnly = mode === 'edit' && portalUser?.isReadOnly;
  const isEdit = mode === 'edit';

  const handleSave = () => {
    onSave({
      portal: formData.portal,
      username: formData.username,
      status: 'Validating',
      userType: 'External',
      linkedSmartConnections: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      isReadOnly: false,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEdit ? 'Portal User Details' : 'Add Portal User'}
            {isReadOnly && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="secondary">Monto User</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This user was added by Monto. You can view but not edit.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <PortalSelection
            value={formData.portal}
            onChange={(value) => setFormData(prev => ({ ...prev, portal: value }))}
          />

          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium text-grey-800">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="e.g. jdoe@company.com"
              value={formData.username}
              onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
              disabled={isReadOnly}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-grey-800">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder={isEdit ? "••••••••" : "Enter your portal password"}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                disabled={isReadOnly}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isReadOnly}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portalUrl" className="text-sm font-medium text-grey-800">
              Portal URL (optional)
            </Label>
            <Input
              id="portalUrl"
              placeholder="Optional – custom login URL"
              value={formData.portalUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, portalUrl: e.target.value }))}
              disabled={isReadOnly}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              {isReadOnly ? 'Close' : 'Cancel'}
            </Button>
            {!isReadOnly && (
              <Button onClick={handleSave}>
                {isEdit ? 'Update Portal User' : 'Add Portal User'}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
