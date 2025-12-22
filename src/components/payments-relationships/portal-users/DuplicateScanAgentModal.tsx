import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TriangleAlert, Eye, EyeOff, Pencil } from 'lucide-react';

export interface ExistingAgentData {
  username: string;
  userType: string;
  portal: string;
  portalLink: string;
  password: string;
  status: string;
}

interface DuplicateScanAgentContentProps {
  onUpdateExisting: (data: ExistingAgentData) => void;
  onCreateAnyway: () => void;
  onBack: () => void;
  existingAgent: ExistingAgentData;
}

export function DuplicateScanAgentContent({
  onUpdateExisting,
  onCreateAnyway,
  onBack,
  existingAgent
}: DuplicateScanAgentContentProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<ExistingAgentData>(existingAgent);

  const handleChange = (field: keyof ExistingAgentData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateExisting = () => {
    onUpdateExisting(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-50/60 rounded-full">
            <TriangleAlert size={18} className="text-amber-400" strokeWidth={2} />
          </div>
          <h2 className="text-lg font-medium text-gray-900">
            Duplicate Scan Agent Detected
          </h2>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          We found 1 existing scan agent with a matching username. Usernames are considered identical regardless of upper/lower case for detection — you can still create a new agent if required.
        </p>
      </div>

      {/* Existing Agent Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Existing Agent(s):</h3>

        <div className="grid grid-cols-2 gap-4">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Username</label>
            <Input
              type="text"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              className="bg-white"
            />
          </div>

          {/* User Type */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">User Type</label>
            <Input
              type="text"
              value={formData.userType}
              onChange={(e) => handleChange('userType', e.target.value)}
              className="bg-white"
            />
          </div>

          {/* Portal */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Portal</label>
            <Input
              type="text"
              value={formData.portal}
              onChange={(e) => handleChange('portal', e.target.value)}
              className="bg-white"
            />
          </div>

          {/* Portal Link */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Portal Link</label>
            <Input
              type="url"
              value={formData.portalLink}
              onChange={(e) => handleChange('portalLink', e.target.value)}
              className="bg-white text-primary/80"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="bg-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Status</label>
            <div className="flex items-center h-[38px]">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50/70 text-emerald-600 border border-emerald-100">
                {formData.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between pt-2">
        <Button
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleUpdateExisting}
            className="flex items-center gap-2 border-primary text-primary hover:bg-primary/5"
          >
            <Pencil size={14} />
            Update Existing Agent
          </Button>
          <Button
            onClick={onCreateAnyway}
            className="bg-primary hover:bg-primary/90"
          >
            Create Anyway
          </Button>
        </div>
      </div>
    </div>
  );
}
