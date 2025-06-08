
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Upload, X, CheckCircle, Building, Users, Eye, EyeOff } from 'lucide-react';
import { StepIndicator } from '@/components/onboarding/StepIndicator';
import { PortalSelection } from '@/components/onboarding/PortalSelection';
import { ConnectedUsersList, ConnectedUser } from '@/components/onboarding/ConnectedUsersList';
import { InvoiceUploadTabs } from '@/components/onboarding/InvoiceUploadTabs';

interface WorkspaceData {
  companyName: string;
  timezone: string;
  logo: File | null;
  teamMembers: string[];
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [portalStep, setPortalStep] = useState(1);
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData>({
    companyName: 'Acme Corporation',
    timezone: 'Asia/Jerusalem',
    logo: null,
    teamMembers: []
  });
  
  const [emailInput, setEmailInput] = useState('');
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([]);
  const [currentPortalForm, setCurrentPortalForm] = useState({
    portal: '',
    username: '',
    password: '',
    url: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const timezones = [
    { value: 'Asia/Jerusalem', label: 'Israel (GMT+2)' },
    { value: 'America/New_York', label: 'Eastern Time (GMT-5)' },
    { value: 'Europe/London', label: 'London (GMT+0)' },
    { value: 'Europe/Berlin', label: 'Central Europe (GMT+1)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' }
  ];

  const handleEmailAdd = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ',') && emailInput.trim()) {
      e.preventDefault();
      const email = emailInput.trim();
      if (email.includes('@') && !workspaceData.teamMembers.includes(email)) {
        setWorkspaceData(prev => ({
          ...prev,
          teamMembers: [...prev.teamMembers, email]
        }));
        setEmailInput('');
      }
    }
  };

  const removeTeamMember = (emailToRemove: string) => {
    setWorkspaceData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(email => email !== emailToRemove)
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setWorkspaceData(prev => ({ ...prev, logo: file }));
    }
  };

  const handleConnectPortalUser = async () => {
    if (!currentPortalForm.portal || !currentPortalForm.username || !currentPortalForm.password) return;

    const newUser: ConnectedUser = {
      id: Date.now().toString(),
      portal: currentPortalForm.portal,
      username: currentPortalForm.username,
      status: 'connecting'
    };

    setConnectedUsers(prev => [...prev, newUser]);
    setCurrentPortalForm({ portal: '', username: '', password: '', url: '' });

    // Simulate connection process
    setTimeout(() => {
      const success = Math.random() > 0.3;
      setConnectedUsers(prev => prev.map(user => 
        user.id === newUser.id 
          ? { 
              ...user, 
              status: success ? 'connected' : 'failed',
              poCount: success ? Math.floor(Math.random() * 300) + 50 : undefined,
              invoiceCount: success ? Math.floor(Math.random() * 500) + 100 : undefined,
              error: success ? undefined : 'Invalid credentials. Please check your username and password.'
            }
          : user
      ));
    }, 2000);
  };

  const removeConnectedUser = (id: string) => {
    setConnectedUsers(prev => prev.filter(user => user.id !== id));
  };

  const isPortalFormValid = currentPortalForm.portal && currentPortalForm.username && currentPortalForm.password;
  const hasMinimumUsers = connectedUsers.filter(user => user.status === 'connected').length >= 2;
  const isStep1Valid = workspaceData.timezone && workspaceData.companyName;

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold text-grey-900 flex items-center justify-center gap-2">
              <Building className="h-8 w-8" />
              Let's Set Up Your Workspace
            </CardTitle>
            <CardDescription className="text-grey-600">
              Get your team ready and establish your company identity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="company-name" className="text-sm font-medium text-grey-800">
                Company Name
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Input
                      id="company-name"
                      value={workspaceData.companyName}
                      disabled
                      className="bg-grey-100 cursor-not-allowed"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Pulled from contract – can't be changed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Timezone */}
            <div className="space-y-2">
              <Label htmlFor="timezone" className="text-sm font-medium text-grey-800">
                Timezone
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Select value={workspaceData.timezone} onValueChange={(value) => 
                      setWorkspaceData(prev => ({ ...prev, timezone: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timezones.map(tz => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Used for scheduling scans, alerts, and SLAs</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Logo Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-grey-800">Company Logo (Optional)</Label>
              <div className="border-2 border-dashed border-grey-300 rounded-lg p-6 text-center hover:border-primary-main transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-grey-400 mx-auto mb-2" />
                  <p className="text-sm text-grey-600">
                    {workspaceData.logo ? workspaceData.logo.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-grey-500 mt-1">JPG, PNG, SVG up to 10MB</p>
                </label>
              </div>
            </div>

            {/* Team Members */}
            <div className="space-y-2">
              <Label htmlFor="team-emails" className="text-sm font-medium text-grey-800 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Invite Collaborators (Optional)
              </Label>
              <Input
                id="team-emails"
                placeholder="Enter email addresses (press Enter or comma to add)"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={handleEmailAdd}
              />
              {workspaceData.teamMembers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {workspaceData.teamMembers.map(email => (
                    <Badge key={email} variant="secondary" className="flex items-center gap-1">
                      {email}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTeamMember(email)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-xs text-grey-500">Invite teammates to help you set up. Press enter or comma after each email.</p>
            </div>

            <Button 
              onClick={() => setCurrentStep(2)}
              disabled={!isStep1Valid}
              className="w-full"
              size="lg"
            >
              Create My Workspace
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-semibold text-grey-900">
            Connect your Portal Accounts
          </CardTitle>
          <CardDescription className="text-grey-600 max-w-2xl mx-auto mt-4">
            Enter the login details you use for your portal account.
            We'll use these to securely fetch your POs and invoices.
            Your credentials are encrypted.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <StepIndicator 
            currentStep={portalStep} 
            onStepClick={setPortalStep}
          />

          {portalStep === 1 && (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Portal User</CardTitle>
                  <CardDescription>
                    ✅ You can add multiple users under the same portal.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <PortalSelection
                    value={currentPortalForm.portal}
                    onChange={(value) => setCurrentPortalForm(prev => ({ ...prev, portal: value }))}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-grey-800">Username</Label>
                      <p className="text-sm text-grey-600">Enter your portal login username</p>
                      <Input
                        type="text"
                        placeholder="Enter your portal login username"
                        value={currentPortalForm.username}
                        onChange={(e) => setCurrentPortalForm(prev => ({ ...prev, username: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-grey-800">Password</Label>
                      <p className="text-sm text-grey-600">Enter your portal password</p>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your portal password"
                          value={currentPortalForm.password}
                          onChange={(e) => setCurrentPortalForm(prev => ({ ...prev, password: e.target.value }))}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <p className="text-xs text-grey-500">🛡️ We encrypt this and never store it in plain text.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-grey-800">Portal URL (optional)</Label>
                    <p className="text-sm text-grey-600">Only if your portal requires a custom login link</p>
                    <Input
                      placeholder="Only if your portal requires a custom login link"
                      value={currentPortalForm.url}
                      onChange={(e) => setCurrentPortalForm(prev => ({ ...prev, url: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Button 
                      onClick={handleConnectPortalUser}
                      disabled={!isPortalFormValid}
                      className="w-full"
                    >
                      Connect Portal User
                    </Button>
                    <p className="text-sm text-grey-500 text-center">
                      Add this portal user to your connection list
                    </p>
                  </div>
                </CardContent>
              </Card>

              <ConnectedUsersList 
                users={connectedUsers}
                onRemoveUser={removeConnectedUser}
              />

              <InvoiceUploadTabs />

              {connectedUsers.length > 0 && (
                <div className="flex justify-center pt-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Button 
                            onClick={() => setPortalStep(2)}
                            disabled={!hasMinimumUsers}
                            size="lg"
                            className="min-w-48"
                          >
                            Continue to Review
                          </Button>
                        </div>
                      </TooltipTrigger>
                      {!hasMinimumUsers && (
                        <TooltipContent>
                          <p>You need to connect at least 2 users to continue.</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
          )}

          {portalStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Review Your Connections</h2>
                <p className="text-grey-600">Verify your portal connections before continuing</p>
              </div>
              
              <ConnectedUsersList 
                users={connectedUsers}
                onRemoveUser={removeConnectedUser}
              />

              <div className="flex justify-center gap-4 pt-4">
                <Button 
                  onClick={() => setPortalStep(1)}
                  variant="outline"
                  size="lg"
                >
                  Add More Users
                </Button>
                <Button 
                  onClick={() => setPortalStep(3)}
                  size="lg"
                  className="min-w-48"
                >
                  Continue to Finish
                </Button>
              </div>
            </div>
          )}

          {portalStep === 3 && (
            <div className="space-y-6 text-center">
              <div className="space-y-4">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                <h2 className="text-2xl font-semibold text-grey-900">Setup Complete!</h2>
                <p className="text-grey-600 max-w-md mx-auto">
                  Your portal connections are ready. Smart Agents are now scanning for POs and invoices.
                </p>
              </div>

              <Alert className="max-w-md mx-auto">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Connected {connectedUsers.filter(u => u.status === 'connected').length} portal users successfully
                </AlertDescription>
              </Alert>

              <Button size="lg" className="min-w-48">
                Continue to Dashboard
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
