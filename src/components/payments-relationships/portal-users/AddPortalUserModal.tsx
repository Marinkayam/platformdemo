import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PortalSelection } from '@/components/onboarding/PortalSelection';
import { Eye, EyeOff, Upload, Download, FileSpreadsheet, UserPlus, Loader2, Check, X } from 'lucide-react';
import { PortalUser } from '@/types/portalUser';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { DesignTabs } from '@/components/ui/design-tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

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
  const [activeTab, setActiveTab] = useState<'single' | 'csv'>('single');
  const [formData, setFormData] = useState({
    portal: portalUser?.portal || '',
    username: portalUser?.username || '',
    password: '',
    portalUrl: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [enable2FA, setEnable2FA] = useState(false);
  const [twoFAMethod, setTwoFAMethod] = useState<'authenticator' | 'sms' | 'email' | 'other' | undefined>(undefined);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentProgressText, setCurrentProgressText] = useState('');
  const [currentProgressIcon, setCurrentProgressIcon] = useState<JSX.Element | null>(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [showCustomURLField, setShowCustomURLField] = useState(false);

  const isReadOnly = mode === 'edit' && portalUser?.isReadOnly;
  const isEdit = mode === 'edit';

  const portalsRequiringCustomURL = ['oracle-procurement', 'jaggaer'];

  const handleSave = async () => {
    if (!formData.portal || !formData.username || !formData.password) {
      toast({
        variant: "destructive",
        title: "Missing required fields",
        description: "Please fill in all required fields (Portal, Username, Password)"
      });
      return;
    }

    if (enable2FA) {
      if (!twoFAMethod) {
        toast({
          variant: "destructive",
          title: "Missing 2FA method",
          description: "Please select a 2FA method"
        });
        return;
      }

      if (twoFAMethod === 'sms' && !phoneNumber) {
        toast({
          variant: "destructive",
          title: "Phone number required",
          description: "Phone number required for SMS method"
        });
        return;
      }

      if (twoFAMethod === 'email' && !verificationEmail) {
        toast({
          variant: "destructive",
          title: "Verification email required",
          description: "Verification email required for Email method"
        });
        return;
      }

      // Basic email validation regex
      if (twoFAMethod === 'email' && verificationEmail && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(verificationEmail)) {
        toast({
          variant: "destructive",
          title: "Invalid email format",
          description: "Please enter a valid email address"
        });
        return;
      }
    }

    setIsProcessing(true);
    setCurrentProgressIcon(<Loader2 className="h-4 w-4 animate-spin text-primary-main" />);
    setCurrentProgressText(`Connecting to ${formData.portal || 'portal'}...`);
    setProgressPercentage(0);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setProgressPercentage(35);
    setCurrentProgressText(`Validating credentials...`);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setProgressPercentage(65);
    setCurrentProgressText(`Creating secure connection agent...`);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setProgressPercentage(85);
    setCurrentProgressText(`Finalizing connection...`);

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success or failure randomly for demonstration
    const isSuccess = Math.random() > 0.3; // 70% success rate
    let finalStatus: PortalUser['status'] = 'Validating';
    let issue: string | undefined = undefined;

    if (isSuccess) {
      finalStatus = 'Connected';
      setProgressPercentage(100);
      setCurrentProgressIcon(<Check className="h-4 w-4 text-green-500" />);
      setCurrentProgressText('User added to your table!');
      toast({
        variant: "success",
        title: "User connected successfully",
        description: "Monto is now syncing data from your portal."
      });
    } else {
      finalStatus = 'Disconnected';
      issue = 'Invalid password'; // Example issue, replace with actual error from backend
      setProgressPercentage(100);
      setCurrentProgressIcon(<X className="h-4 w-4 text-red-500" />);
      setCurrentProgressText('Couldn\'t connect — you can fix this later in the Portal Users tab.');
      toast({
        variant: "destructive",
        title: "We couldn't connect with this user",
        description: "Fix the issue anytime from the Portal Users table."
      });
    }

    onSave({
      portal: formData.portal,
      username: formData.username,
      status: finalStatus,
      userType: 'External',
      linkedSmartConnections: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      isReadOnly: false,
      twoFAMethod: enable2FA ? twoFAMethod : undefined,
      phoneNumber: enable2FA && twoFAMethod === 'sms' ? phoneNumber : undefined,
      verificationEmail: enable2FA && twoFAMethod === 'email' ? verificationEmail : undefined,
      issue: issue,
    });

    // Auto-close modal after a short delay
    setTimeout(() => {
      onClose();
      setIsProcessing(false);
      // Reset form fields
      setFormData({ portal: '', username: '', password: '', portalUrl: '' });
      setEnable2FA(false);
      setTwoFAMethod(undefined);
      setPhoneNumber('');
      setVerificationEmail('');
      setCurrentProgressText('');
      setCurrentProgressIcon(null);
      setProgressPercentage(0);
    }, 2000); // 2 seconds delay
  };

  const handleFileUpload = (file: File) => {
    if (file.type !== 'text/csv') {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a CSV file"
      });
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleCSVDownload = () => {
    const csvContent = 'Portal,Username,Password,Portal Login URL\nCoupa,user@company.com,password123,\nSAP Ariba,user2@company.com,password456,https://custom.ariba.com';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portal-users-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCSVUpload = () => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please select a CSV file to upload"
      });
      return;
    }

    // Here you would typically process the CSV file
    // For now, we'll just show a success message
    toast({
      variant: "success",
      title: "Portal users uploaded",
      description: "Monto will begin validating and building agents now."
    });

    onClose();
  };

  const tabs = [
    { id: 'single', label: 'Singular Upload' },
    { id: 'csv', label: 'Upload CSV File' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEdit ? 'Portal User Details' : 'Add Portal Users'}
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

        <DesignTabs
          tabs={tabs.map(tab => ({ id: tab.id, label: tab.label }))}
          activeTab={activeTab}
          onTabChange={(id) => setActiveTab(id as 'single' | 'csv')}
          className="mt-0 -mb-4"
        />

        {activeTab === 'single' && (
          <div className="space-y-6 mt-0">
            <p className="text-sm text-grey-600 mb-0 mt-8">
              Connect a single portal user to Monto.
              We'll use this login to securely access your buyer portal and start building your connection.
            </p>

            {/* Portal and Portal URL Group */}
            <div className="space-y-4">
              <PortalSelection
                value={formData.portal}
                onChange={(value) => {
                  setFormData(prev => ({ ...prev, portal: value }));
                  setShowCustomURLField(portalsRequiringCustomURL.includes(value));
                }}
              />
              {showCustomURLField && (
                <div className="space-y-2 transition-opacity duration-300 ease-in-out opacity-100">
                  <Label htmlFor="portalUrl" className="text-sm font-medium text-grey-800">
                    Portal Login URL (optional)
                  </Label>
                  <p className="text-xs text-grey-600">This portal requires a custom login URL to access your account.</p>
                  <Input
                    id="portalUrl"
                    placeholder="Paste your custom login link"
                    value={formData.portalUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, portalUrl: e.target.value }))}
                    disabled={isReadOnly}
                  />
                </div>
              )}
            </div>

            {/* Username and Password Group */}
            <div className="space-y-4 mt-8">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-grey-800">
                  Portal Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="The login you use to sign into this portal."
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
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
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Securely encrypted — we never store it in plain text.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-10">
              <Switch
                id="2fa-toggle"
                checked={enable2FA}
                onCheckedChange={setEnable2FA}
                disabled={isReadOnly}
              />
              <Label htmlFor="2fa-toggle" className="text-sm font-medium text-grey-800">
                Enable Two-Factor Authentication
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="cursor-help">?</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>We'll prompt for your 2FA code during login if required.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {enable2FA && (
              <div className="space-y-4 mt-6">
                <p className="text-sm text-grey-600">
                  Select how your portal verifies login with 2FA.
                </p>

                <div className="space-y-2">
                  <Label htmlFor="2fa-method" className="text-sm font-medium text-grey-800">
                    2FA Method
                  </Label>
                  <Select
                    onValueChange={(value: 'authenticator' | 'sms' | 'email' | 'other') => setTwoFAMethod(value)}
                    value={twoFAMethod}
                    disabled={isReadOnly}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a 2FA method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="authenticator">
                        Authenticator App (TOTP)
                        <p className="text-xs text-grey-500 mt-1">Use a code from Google Authenticator or similar app</p>
                      </SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="other">
                        Other (optional fallback)
                        <p className="text-xs text-grey-500 mt-1">You'll be prompted for a code only when your portal requires it.</p>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {(twoFAMethod === 'sms' || twoFAMethod === 'email') && (
                  <div className="space-y-2">
                    <Label htmlFor="verification-target" className="text-sm font-medium text-grey-800">
                      {twoFAMethod === 'sms' ? 'Phone Number' : 'Verification Email'}
                    </Label>
                    <Input
                      id="verification-target"
                      type={twoFAMethod === 'sms' ? 'tel' : 'email'}
                      placeholder={twoFAMethod === 'sms' ? '+1 555 123 4567' : 'your.email@company.com'}
                      value={twoFAMethod === 'sms' ? phoneNumber : verificationEmail}
                      onChange={(e) => twoFAMethod === 'sms' ? setPhoneNumber(e.target.value) : setVerificationEmail(e.target.value)}
                      disabled={isReadOnly}
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                {isReadOnly ? 'Close' : 'Cancel'}
              </Button>
              {!isReadOnly && (
                <Button onClick={handleSave} disabled={isProcessing}>
                  {isEdit ? 'Update Portal User' : 'Add Portal User'}
                </Button>
              )}
            </div>

            {isProcessing && (
              <div className="mt-4 p-3 rounded-md bg-grey-200 text-sm flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  {currentProgressIcon}
                  <span>{currentProgressText}</span>
                </div>
                <Progress value={progressPercentage} className="w-full h-2 bg-grey-300" indicatorClassName="bg-primary-main" />
                <span className="text-xs text-grey-600 self-end">{progressPercentage}%</span>
              </div>
            )}
          </div>
        )}

        {activeTab === 'csv' && (
          <div className="space-y-2 mt-0">
            <p className="text-sm text-grey-600 mb-0 mt-0">
              Upload a CSV file to add multiple portal users at once.
              We'll validate each row and automatically build your connections.
            </p>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCSVDownload}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Template
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="cursor-help">?</Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>The template includes Portal, Username, Password, Portal Login URL</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                selectedFile ? "border-primary-main bg-primary-main/5" : "border-grey-300 hover:border-primary-main"
              )}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => !selectedFile && !isUploading && document.getElementById('csv-upload')?.click()}
            >
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileInputChange}
              />

              {!selectedFile && !isUploading ? (
                <>
                  <Upload className="h-8 w-8 text-grey-400 mx-auto mb-2" />
                  <p className="text-sm text-grey-600">
                    Drag & drop your CSV file here or{' '}
                    <span className="text-primary-main underline">click to browse</span>
                  </p>
                  <p className="text-xs text-grey-500 mt-1">CSV format only, up to 50MB</p>
                </>
              ) : isUploading ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-grey-800">Uploading CSV file...</p>
                  <div
                    className="w-full bg-grey-200 rounded-full h-2"
                  >
                    <div
                      className="h-2 rounded-full bg-primary-main transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-grey-500">{uploadProgress}%</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-grey-800">{selectedFile.name}</p>
                  <p className="text-xs text-grey-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="text-grey-500 hover:text-grey-700"
                  >
                    Remove file
                  </Button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleCSVUpload}
                disabled={!selectedFile || isUploading}
              >
                Upload File
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
