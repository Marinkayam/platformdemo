
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Upload, X, CheckCircle, AlertCircle, Building, Globe, Users, Shield } from 'lucide-react';

interface WorkspaceData {
  companyName: string;
  timezone: string;
  logo: File | null;
  teamMembers: string[];
}

interface PortalConnection {
  id: string;
  portal: string;
  username: string;
  password: string;
  url?: string;
  status: 'idle' | 'connecting' | 'connected' | 'failed';
  poCount?: number;
  invoiceCount?: number;
  error?: string;
}

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData>({
    companyName: 'Acme Corporation', // Pre-filled from HubSpot
    timezone: 'Asia/Jerusalem',
    logo: null,
    teamMembers: []
  });
  
  const [emailInput, setEmailInput] = useState('');
  const [connections, setConnections] = useState<PortalConnection[]>([]);
  const [currentConnection, setCurrentConnection] = useState({
    portal: '',
    username: '',
    password: '',
    url: ''
  });

  const timezones = [
    { value: 'Asia/Jerusalem', label: 'Israel (GMT+2)' },
    { value: 'America/New_York', label: 'Eastern Time (GMT-5)' },
    { value: 'Europe/London', label: 'London (GMT+0)' },
    { value: 'Europe/Berlin', label: 'Central Europe (GMT+1)' },
    { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' }
  ];

  const popularPortals = [
    { value: 'coupa', label: 'Coupa' },
    { value: 'ariba', label: 'SAP Ariba' },
    { value: 'oracle', label: 'Oracle Procurement' },
    { value: 'jaggaer', label: 'Jaggaer' },
    { value: 'custom', label: 'Add Custom Portal' }
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

  const isStep1Valid = workspaceData.timezone && workspaceData.companyName;

  const handleConnectPortal = async () => {
    if (!currentConnection.portal || !currentConnection.username || !currentConnection.password) return;

    const newConnection: PortalConnection = {
      id: Date.now().toString(),
      ...currentConnection,
      status: 'connecting'
    };

    setConnections(prev => [...prev, newConnection]);
    setCurrentConnection({ portal: '', username: '', password: '', url: '' });

    // Simulate connection process
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success rate
      setConnections(prev => prev.map(conn => 
        conn.id === newConnection.id 
          ? { 
              ...conn, 
              status: success ? 'connected' : 'failed',
              poCount: success ? Math.floor(Math.random() * 300) + 50 : undefined,
              invoiceCount: success ? Math.floor(Math.random() * 500) + 100 : undefined,
              error: success ? undefined : 'Invalid credentials. Please check your username and password.'
            }
          : conn
      ));
    }, 2000);
  };

  const hasSuccessfulConnection = connections.some(conn => conn.status === 'connected');

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
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold text-grey-900 flex items-center justify-center gap-2">
            <Shield className="h-8 w-8" />
            Connect Your Procurement Portals
          </CardTitle>
          <CardDescription className="text-grey-600">
            Monto uses these credentials to fetch live POs and invoices. Your data is encrypted end-to-end.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Portal Connection Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Portal Connection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Portal</Label>
                  <Select value={currentConnection.portal} onValueChange={(value) => 
                    setCurrentConnection(prev => ({ ...prev, portal: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your portal" />
                    </SelectTrigger>
                    <SelectContent>
                      {popularPortals.map(portal => (
                        <SelectItem key={portal.value} value={portal.value}>
                          {portal.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Username/Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={currentConnection.username}
                    onChange={(e) => setCurrentConnection(prev => ({ ...prev, username: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={currentConnection.password}
                    onChange={(e) => setCurrentConnection(prev => ({ ...prev, password: e.target.value }))}
                  />
                  <p className="text-xs text-grey-500">Your password is encrypted and never stored in plain text.</p>
                </div>
                <div className="space-y-2">
                  <Label>Portal URL (if required)</Label>
                  <Input
                    placeholder="https://your-portal.com"
                    value={currentConnection.url}
                    onChange={(e) => setCurrentConnection(prev => ({ ...prev, url: e.target.value }))}
                  />
                </div>
              </div>

              <Button 
                onClick={handleConnectPortal}
                disabled={!currentConnection.portal || !currentConnection.username || !currentConnection.password}
                className="w-full"
              >
                Connect Portal User
              </Button>
            </CardContent>
          </Card>

          {/* Connection Results */}
          {connections.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-grey-900">Portal Connections</h3>
              {connections.map(connection => (
                <Card key={connection.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-grey-600" />
                        <div>
                          <p className="font-medium text-grey-900">{connection.portal}</p>
                          <p className="text-sm text-grey-600">{connection.username}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {connection.status === 'connecting' && (
                          <>
                            <Progress value={60} className="w-20" />
                            <span className="text-sm text-grey-600">Connecting...</span>
                          </>
                        )}
                        {connection.status === 'connected' && (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-sm text-green-600">
                              Connected • {connection.poCount} POs, {connection.invoiceCount} Invoices
                            </span>
                          </>
                        )}
                        {connection.status === 'failed' && (
                          <>
                            <AlertCircle className="h-5 w-5 text-red-600" />
                            <span className="text-sm text-red-600">Failed</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {connection.status === 'failed' && connection.error && (
                      <Alert variant="destructive" className="mt-3">
                        <AlertDescription>{connection.error}</AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Continue Button */}
          <div className="flex justify-center pt-4">
            <Button 
              disabled={!hasSuccessfulConnection}
              size="lg"
              className="min-w-48"
            >
              Continue to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
