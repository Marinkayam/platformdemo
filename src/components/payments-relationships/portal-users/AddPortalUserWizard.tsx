import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Eye, EyeOff, Upload, Download, Check, ArrowLeft, ArrowRight, Building, Users, Shield, FileSpreadsheet, ChevronsUpDown, X, Search } from 'lucide-react';
import { PortalUser } from '@/types/portalUser';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { getPortalLogoUrl } from '@/lib/utils';
import { DesignTabs } from '@/components/ui/design-tabs';
import { CSVImportWizard } from './csv-upload/CSVImportWizard';

interface AddPortalUserWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: Partial<PortalUser>) => void;
  mode?: 'create' | 'edit';
  portalUser?: PortalUser;
}

type WizardStep = 'portal' | 'userType' | 'setup';
type UserType = 'existing' | 'dedicated';

const AVAILABLE_PORTALS = [
  { id: 'coupa', name: 'Coupa', logo: '/portal-logos/coupa.png' },
  { id: 'sap-ariba', name: 'SAP Ariba', logo: '/portal-logos/ariba.png' },
  { id: 'oracle', name: 'Oracle Procurement', logo: '/portal-logos/oracle.png' },
  { id: 'workday', name: 'Workday', logo: '/portal-logos/workday.png' },
  { id: 'bill', name: 'Bill.com', logo: '/portal-logos/bill.png' },
  { id: 'tipalti', name: 'Tipalti', logo: '/portal-logos/tipalti.png' },
  { id: 'amazon', name: 'Amazon Payee', logo: '/portal-logos/amazon.png' },
  { id: 'shopify', name: 'Shopify', logo: '/portal-logos/shopify.png' },
];

export function AddPortalUserWizard({ isOpen, onClose, onSave, mode = 'create', portalUser }: AddPortalUserWizardProps) {
  const [activeTab, setActiveTab] = useState<'singular' | 'csv'>('singular');
  const [currentStep, setCurrentStep] = useState<WizardStep>('portal');
  const [selectedPortal, setSelectedPortal] = useState<string>('');
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    enable2FA: false,
    twoFAMethod: undefined as 'authenticator' | 'sms' | 'email' | 'other' | undefined,
    phoneNumber: '',
    verificationEmail: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isDedicatedUserConfirmed, setIsDedicatedUserConfirmed] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [validationLoading, setValidationLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredPortals = AVAILABLE_PORTALS.filter((portal) =>
    portal.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const query = searchQuery.toLowerCase();

    // Exact match first
    if (aName === query && bName !== query) return -1;
    if (bName === query && aName !== query) return 1;

    // Then alphabetical for partial matches
    return aName.localeCompare(bName);
  });

  const steps = [
    { id: 'portal', label: 'Portal Selection' },
    { id: 'userType', label: 'User Type' },
    { id: 'setup', label: 'Setup' },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const handlePortalSelect = (portal: string) => {
    setSelectedPortal(portal);
  };

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type);
  };

  const handleNext = () => {
    if (currentStep === 'portal' && selectedPortal) {
      setCurrentStep('userType');
    } else if (currentStep === 'userType' && selectedUserType) {
      setCurrentStep('setup');
    }
  };

  const handleBack = () => {
    if (currentStep === 'userType') {
      setCurrentStep('portal');
    } else if (currentStep === 'setup') {
      setCurrentStep('userType');
    }
  };

  const handleSubmit = () => {
    if (selectedUserType === 'dedicated' && !isDedicatedUserConfirmed) {
      toast({
        variant: "destructive",
        title: "Confirmation Required",
        description: "Please confirm that you've created the dedicated user in your portal.",
      });
      return;
    }

    onSave({
      portal: selectedPortal,
      username: formData.username,
      userType: selectedUserType === 'dedicated' ? 'Monto' : 'External',
      status: 'Validating',
      linkedSmartConnections: 0,
      lastUpdated: new Date().toISOString(),
      isReadOnly: false,
      twoFAMethod: formData.twoFAMethod,
      phoneNumber: formData.phoneNumber,
      verificationEmail: formData.verificationEmail,
    });
    onClose();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv' && file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a CSV or XLSX file.",
        });
        return;
      }
      setSelectedFile(file);
      setValidationLoading(true);
      setValidationErrors([]); // Clear previous errors

      // Simulate API call for validation
      setTimeout(() => {
        const errors: string[] = [];
        // Mock validation checks
        if (Math.random() < 0.3) {
          errors.push("Missing required fields in some rows.");
        }
        if (Math.random() < 0.3) {
          errors.push("Duplicate emails found.");
        }
        if (Math.random() < 0.3) {
          errors.push("Some portals are not supported.");
        }
        if (Math.random() < 0.3) {
          errors.push("Invalid password format detected.");
        }

        if (errors.length > 0) {
          setValidationErrors(errors);
          toast({
            variant: "destructive",
            title: "Validation Failed",
            description: "Please review the issues before proceeding.",
          });
        } else {
          toast({
            title: "File Validated",
            description: "CSV/XLSX file is ready for import.",
          });
        }
        setValidationLoading(false);
      }, 2000); // Simulate 2-second validation process
    }
  };

  const handleBulkImport = (users: Partial<PortalUser>[]) => {
    // In a real scenario, you'd likely have a different handler for bulk saves.
    // For now, let's just log them and show a success toast.
    console.log("Importing users:", users);
    toast({
      title: "Import Successful",
      description: `${users.length} users have been imported.`,
    })
    // In a real app, you would probably call a different `onSave` prop for bulk creation
    // and then call `onClose`.
  };

  const renderPortalStep = () => (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-grey-500" />
        <Input
          placeholder="Search a platform or paste a direct portal login link (optional)"
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mt-6">
        {filteredPortals.length > 0 ? (
          <div className="grid grid-cols-6 gap-4">
            {filteredPortals.map((portal) => (
              <Card
                key={portal.id}
                className={cn(
                  "cursor-pointer transition-all hover:border-primary-main w-[100px] h-[100px] p-0 relative",
                  selectedPortal === portal.name && "border-primary-main bg-primary/10"
                )}
                onClick={() => handlePortalSelect(portal.name)}
              >
                {selectedPortal === portal.name && (
                  <div className="absolute top-1.5 right-1.5 bg-primary text-primary-foreground rounded-full p-0.5 flex items-center justify-center">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                <CardContent className="flex flex-col items-center justify-center h-full p-0">
                  <div className="w-full h-full flex items-center justify-center overflow-hidden mb-1 rounded-full">
                    <img
                      src={getPortalLogoUrl(portal.name)}
                      alt={`${portal.name} logo`}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/portal-logos/placeholder.svg';
                      }}
                    />
                  </div>
                  <span className="text-xs font-normal text-grey-900 text-center mb-2">{portal.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed rounded-lg">
            <p className="text-grey-600">🔍 No matching portals found.</p>
            <Button variant="link" className="text-primary mt-1">
              Want to add a new one? Click here.
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderUserTypeStep = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Select User Type</Label>
        <div className="grid grid-cols-2 gap-4">
          <Card
            className={cn(
              "cursor-pointer transition-all hover:border-primary-main",
              selectedUserType === 'existing' && "border-primary-main bg-primary-lighter"
            )}
            onClick={() => handleUserTypeSelect('existing')}
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
            onClick={() => handleUserTypeSelect('dedicated')}
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

  const renderExistingUserSetup = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Portal</Label>
          <Input value={selectedPortal} disabled />
        </div>
        <div className="space-y-2">
          <Label>Username</Label>
          <Input
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            placeholder="Enter portal username"
          />
        </div>
        <div className="space-y-2">
          <Label>Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
        <div className="flex items-center space-x-2">
          <Checkbox
            id="enable2FA"
            checked={formData.enable2FA}
            onCheckedChange={(checked) => setFormData({ ...formData, enable2FA: checked as boolean })}
          />
          <Label htmlFor="enable2FA">Enable Two-Factor Authentication</Label>
        </div>
        {formData.enable2FA && (
          <div className="space-y-4 pl-6">
            <div className="space-y-2">
              <Label>2FA Method</Label>
              <Select
                value={formData.twoFAMethod}
                onValueChange={(value: 'authenticator' | 'sms' | 'email' | 'other') => 
                  setFormData({ ...formData, twoFAMethod: value })}
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
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
            )}
            {formData.twoFAMethod === 'email' && (
              <div className="space-y-2">
                <Label>Verification Email</Label>
                <Input
                  value={formData.verificationEmail}
                  onChange={(e) => setFormData({ ...formData, verificationEmail: e.target.value })}
                  placeholder="Enter verification email"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderDedicatedUserSetup = () => (
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

  const renderCSVUpload = () => (
    <CSVImportWizard onComplete={onClose} onImport={handleBulkImport} />
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(newOpenState) => {
        if (!newOpenState) {
          onClose();
        }
      }}
    >
      <DialogContent className="w-[772px] p-0 overflow-hidden rounded-xl max-w-none">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-grey-900">Add Portal Users</DialogTitle>
        </DialogHeader>
        <div className="px-6 pt-0">
          <DesignTabs
            tabs={[
              { id: 'singular', label: 'Manual Entry' },
              { id: 'csv', label: 'Upload Bulk CSV File' },
            ]}
            activeTab={activeTab}
            onTabChange={(id) => setActiveTab(id as 'singular' | 'csv')}
            className="mb-4"
          />
        </div>
        <div className="p-6 pt-0">
          {activeTab === 'singular' && (
            <div className="space-y-6">
              {currentStep === 'portal' && renderPortalStep()}
              {currentStep === 'userType' && renderUserTypeStep()}
              {currentStep === 'setup' && (
                selectedUserType === 'existing' ? renderExistingUserSetup() : renderDedicatedUserSetup()
              )}

              <div className="flex justify-between pt-4">
                {currentStep !== 'portal' && (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  {currentStep === 'setup' ? (
                    <Button onClick={handleSubmit}>
                      Add Portal User
                    </Button>
                  ) : (
                    <Button onClick={handleNext} disabled={!selectedPortal}>
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'csv' && renderCSVUpload()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
