import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Loader2, Heart, Star, Download, BadgeCheck, Eye, EyeOff } from 'lucide-react';
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from '@/lib/toast-helpers';

const DesignSystemPlayground = () => {
  const [toggleStates, setToggleStates] = useState({
    notifications: false,
    darkMode: false,
    autoSave: true,
  });
  const [loadingStates, setLoadingStates] = useState({
    saving: false,
    uploading: false,
    processing: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    basic: '',
    labeled: '',
    withHelper: '',
    error: '',
    password: '',
    textarea: ''
  });

  // Color palette data based on Monto design tokens
  const colorTokens = [
    { name: 'primary-lighter', class: 'bg-primary-lighter', hex: '#EFEBFF' },
    { name: 'primary-light', class: 'bg-primary-light', hex: '#BEADFF' },
    { name: 'primary-main', class: 'bg-primary-main', hex: '#7B59FF' },
    { name: 'primary-dark', class: 'bg-primary-dark', hex: '#523BAA' },
    { name: 'primary-darker', class: 'bg-primary-darker', hex: '#291E55' },
    { name: 'secondary-lighter', class: 'bg-secondary-lighter', hex: '#E6E7EB' },
    { name: 'secondary-light', class: 'bg-secondary-light', hex: '#6F768B' },
    { name: 'secondary-main', class: 'bg-secondary-main', hex: '#1D153B' },
    { name: 'secondary-dark', class: 'bg-secondary-dark', hex: '#181231' },
    { name: 'secondary-darker', class: 'bg-secondary-darker', hex: '#0A0714' },
    { name: 'grey-0', class: 'bg-grey-0', hex: '#FFFFFF' },
    { name: 'grey-100', class: 'bg-grey-100', hex: '#707C87' },
    { name: 'grey-200', class: 'bg-grey-200', hex: '#F4F6F8' },
    { name: 'grey-300', class: 'bg-grey-300', hex: '#F1F1F3' },
    { name: 'grey-400', class: 'bg-grey-400', hex: '#E6E7EB' },
    { name: 'grey-500', class: 'bg-grey-500', hex: '#8C94A9' },
    { name: 'grey-600', class: 'bg-grey-600', hex: '#818799' },
    { name: 'grey-700', class: 'bg-grey-700', hex: '#586079' },
    { name: 'grey-800', class: 'bg-grey-800', hex: '#38415F' },
    { name: 'grey-900', class: 'bg-grey-900', hex: '#061237' },
    { name: 'info-main', class: 'bg-info-main', hex: '#375DFB' },
    { name: 'success-main', class: 'bg-success-main', hex: '#007737' },
    { name: 'warning-main', class: 'bg-warning-main', hex: '#F2AE40' },
    { name: 'error-main', class: 'bg-error-main', hex: '#DF1C41' },
    { name: 'background-default', class: 'bg-background-default', hex: '#F4F6F8' },
    { name: 'background-paper', class: 'bg-background-paper', hex: '#FFFFFF' },
  ];

  const spacingValues = [
    { name: 'p-1', class: 'p-1', value: '0.25rem' },
    { name: 'p-2', class: 'p-2', value: '0.5rem' },
    { name: 'p-4', class: 'p-4', value: '1rem' },
    { name: 'p-6', class: 'p-6', value: '1.5rem' },
    { name: 'p-8', class: 'p-8', value: '2rem' },
    { name: 'p-10', class: 'p-10', value: '2.5rem' },
    { name: 'p-12', class: 'p-12', value: '3rem' },
    { name: 'p-16', class: 'p-16', value: '4rem' },
    { name: 'p-20', class: 'p-20', value: '5rem' },
    { name: 'p-24', class: 'p-24', value: '6rem' },
  ];

  const borderRadiusValues = [
    { name: 'rounded-xs', class: 'rounded-xs', value: '0.125rem' },
    { name: 'rounded-sm', class: 'rounded-sm', value: '0.25rem' },
    { name: 'rounded', class: 'rounded', value: '0.375rem' },
    { name: 'rounded-lg', class: 'rounded-lg', value: '0.5rem' },
    { name: 'rounded-xl', class: 'rounded-xl', value: '0.75rem' },
    { name: 'rounded-2xl', class: 'rounded-2xl', value: '1rem' },
    { name: 'rounded-3xl', class: 'rounded-3xl', value: '1.5rem' },
    { name: 'rounded-full', class: 'rounded-full', value: '9999px' },
  ];

  const shadowValues = [
    { name: 'shadow-sm', class: 'shadow-sm' },
    { name: 'shadow', class: 'shadow' },
    { name: 'shadow-md', class: 'shadow-md' },
    { name: 'shadow-lg', class: 'shadow-lg' },
    { name: 'shadow-xl', class: 'shadow-xl' },
    { name: 'shadow-2xl', class: 'shadow-2xl' },
  ];

  const handleToggle = (key: string) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLoadingDemo = (key: string) => {
    setLoadingStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setLoadingStates(prev => ({ ...prev, [key]: false }));
    }, 3000);
  };

  const showToast = (type: string) => {
    switch (type) {
      case 'success':
        showSuccessToast("Success!", "Your action was completed successfully.");
        break;
      case 'error':
        showErrorToast("Error!", "Something went wrong. Please try again.");
        break;
      case 'info':
        showInfoToast("Information", "Here's some helpful information for you.");
        break;
      case 'warning':
        showWarningToast("Warning", "Please review this important information.");
        break;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background-default p-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-6xl font-sans font-bold text-secondary-main mb-4">
              Design System Playground
            </h1>
            <p className="text-lg text-grey-700 font-sans">
              Exploring Monto's Design Tokens
            </p>
          </div>

          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Buttons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-sans font-medium text-grey-800 mb-4">Button Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-sans font-medium text-grey-800 mb-4">Button Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-sans font-medium text-grey-800 mb-4">Button States</h3>
                <div className="flex flex-wrap gap-4">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                  <Button>
                    <Star className="mr-2 h-4 w-4" />
                    With Icon
                  </Button>
                  <Button>
                    Download
                    <Download className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inputs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Inputs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="text-xl font-sans font-medium text-grey-800 mb-4">Form Input Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Basic Input</label>
                    <Input
                      placeholder="Enter text..."
                      value={inputValues.basic}
                      onChange={(e) => setInputValues(prev => ({ ...prev, basic: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="labeled-input">Labeled Input</Label>
                    <Input
                      id="labeled-input"
                      placeholder="With label"
                      value={inputValues.labeled}
                      onChange={(e) => setInputValues(prev => ({ ...prev, labeled: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="helper-input">With Helper Text</Label>
                    <Input
                      id="helper-input"
                      placeholder="Type something"
                      value={inputValues.withHelper}
                      onChange={(e) => setInputValues(prev => ({ ...prev, withHelper: e.target.value }))}
                    />
                    <p className="text-sm text-grey-600">This is some helpful text</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="error-input">Error State</Label>
                    <Input
                      id="error-input"
                      placeholder="Error input"
                      value={inputValues.error}
                      onChange={(e) => setInputValues(prev => ({ ...prev, error: e.target.value }))}
                      className="border-error-main focus:ring-error-main"
                    />
                    <p className="text-sm text-error-main">This field has an error</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-input">Password Input</Label>
                    <div className="relative">
                      <Input
                        id="password-input"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={inputValues.password}
                        onChange={(e) => setInputValues(prev => ({ ...prev, password: e.target.value }))}
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-grey-500" />
                        ) : (
                          <Eye className="h-4 w-4 text-grey-500" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Text Areas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Text Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="textarea">Basic Textarea</Label>
                <Textarea
                  id="textarea"
                  placeholder="Enter multiline text here..."
                  value={inputValues.textarea}
                  onChange={(e) => setInputValues(prev => ({ ...prev, textarea: e.target.value }))}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Typography */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Typography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-6xl font-sans font-bold text-secondary-main">Heading 1</h1>
                <h2 className="text-5xl font-sans font-bold text-secondary-main">Heading 2</h2>
                <h3 className="text-4xl font-sans font-bold text-secondary-main">Heading 3</h3>
                <h4 className="text-3xl font-sans font-bold text-secondary-main">Heading 4</h4>
                <h5 className="text-2xl font-sans font-bold text-secondary-main">Heading 5</h5>
                <h6 className="text-xl font-sans font-bold text-secondary-main">Heading 6</h6>
                <p className="text-lg font-sans font-medium text-grey-800">Subtitle 1</p>
                <p className="text-base font-sans font-medium text-grey-700">Subtitle 2</p>
                <p className="text-base font-sans text-grey-700">Body 1 - Main text for content</p>
                <p className="text-sm font-sans text-grey-600">Body 2 - Secondary text</p>
                <p className="text-sm font-sans text-grey-500">Body 3 - Light text for subtle information</p>
                <p className="text-small-text font-sans text-grey-600">Caption text for images and meta info</p>
                <p className="text-overline font-sans text-grey-600 uppercase tracking-wider">OVERLINE TEXT FOR LABELS</p>
                <p className="text-sm font-sans font-medium text-grey-800">BUTTON TEXT</p>
                <p className="text-xs font-sans text-grey-500">Small text for fine print</p>
              </div>
            </CardContent>
          </Card>

          {/* Checkboxes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Checkboxes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="basic" />
                  <Label htmlFor="basic">Basic Checkbox</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="checked" defaultChecked />
                  <Label htmlFor="checked">Checked Checkbox</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="required" required />
                  <Label htmlFor="required">Required Checkbox</Label>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-sans font-medium text-grey-800 mb-3">Sizes</h4>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="small" className="h-3 w-3" />
                    <Label htmlFor="small" className="text-sm">Small</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="default" />
                    <Label htmlFor="default">Default</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox id="large" className="h-5 w-5" />
                    <Label htmlFor="large" className="text-lg">Large</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Toggles & Switches */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Toggles & Switches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-sm text-grey-600">Receive email notifications</p>
                  </div>
                  <Switch
                    checked={toggleStates.notifications}
                    onCheckedChange={() => handleToggle('notifications')}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-grey-600">Toggle dark theme</p>
                  </div>
                  <Switch
                    checked={toggleStates.darkMode}
                    onCheckedChange={() => handleToggle('darkMode')}
                  />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Auto Save</p>
                    <p className="text-sm text-grey-600">Automatically save changes</p>
                  </div>
                  <Switch
                    checked={toggleStates.autoSave}
                    onCheckedChange={() => handleToggle('autoSave')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chips/Badges */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Chips & Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outlined</Badge>
                <Badge className="bg-success-main text-white">Success</Badge>
                <Badge className="bg-warning-main text-white">Warning</Badge>
                <Badge className="bg-error-main text-white">Error</Badge>
                <Badge variant="destructive" className="group">
                  Deletable
                  <button className="ml-1 text-xs hover:bg-white/20 rounded-full p-0.5">
                    ×
                  </button>
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Tooltips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Tooltips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover Me</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This is a helpful tooltip</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Success Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-success-main text-white">
                    <p>Success message tooltip</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Warning Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-warning-main text-white">
                    <p>Warning message tooltip</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Error Tooltip</Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-error-main text-white">
                    <p>Error message tooltip</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          {/* Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Default Card</h4>
                  <p className="text-sm text-grey-600">Small size</p>
                  <p className="text-sm text-grey-500 mt-2">Basic card content</p>
                </Card>

                <Card className="p-4 border-2">
                  <h4 className="font-medium mb-2">Outlined Card</h4>
                  <p className="text-sm text-grey-600">Default size</p>
                  <p className="text-sm text-grey-500 mt-2">Card with outline</p>
                </Card>

                <Card className="p-6 shadow-lg">
                  <h4 className="font-medium mb-2">Elevated Card</h4>
                  <p className="text-sm text-grey-600">Large size</p>
                  <p className="text-sm text-grey-500 mt-2">Card with elevation</p>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Icons */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Icons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="text-center">
                  <BadgeCheck className="h-8 w-8 text-primary-main mx-auto mb-2" />
                  <p className="text-sm text-grey-600">Badge Check Icon</p>
                </div>
                <div className="text-center">
                  <Heart className="h-8 w-8 text-error-main mx-auto mb-2" />
                  <p className="text-sm text-grey-600">Heart Icon</p>
                </div>
                <div className="text-center">
                  <Star className="h-8 w-8 text-warning-main mx-auto mb-2" />
                  <p className="text-sm text-grey-600">Star Icon</p>
                </div>
                <div className="text-center">
                  <Download className="h-8 w-8 text-info-main mx-auto mb-2" />
                  <p className="text-sm text-grey-600">Download Icon</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-success-main mx-auto mb-2" />
                  <p className="text-sm text-grey-600">Check Circle Icon</p>
                </div>
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 text-warning-main mx-auto mb-2" />
                  <p className="text-sm text-grey-600">Alert Triangle Icon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Loading States */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Loading States
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-sans font-medium text-grey-800 mb-4">Skeleton Loading</h3>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-sans font-medium text-grey-800 mb-4">Button Loading States</h3>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    onClick={() => handleLoadingDemo('saving')}
                    disabled={loadingStates.saving}
                  >
                    {loadingStates.saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Document'
                    )}
                  </Button>
                  <Button 
                    onClick={() => handleLoadingDemo('uploading')}
                    disabled={loadingStates.uploading}
                    variant="secondary"
                  >
                    {loadingStates.uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      'Upload File'
                    )}
                  </Button>
                  <Button 
                    onClick={() => handleLoadingDemo('processing')}
                    disabled={loadingStates.processing}
                    variant="outline"
                  >
                    {loadingStates.processing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Process Data'
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Banners & Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Banners & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="border-info-main bg-info-main/10">
                <Info className="h-4 w-4 text-info-main" />
                <AlertTitle className="text-info-main">Information</AlertTitle>
                <AlertDescription className="text-info-main/80">
                  This is an informational banner to provide helpful context.
                </AlertDescription>
              </Alert>
              
              <Alert className="border-success-main bg-success-main/10">
                <CheckCircle className="h-4 w-4 text-success-main" />
                <AlertTitle className="text-success-main">Success</AlertTitle>
                <AlertDescription className="text-success-main/80">
                  Your operation completed successfully!
                </AlertDescription>
              </Alert>
              
              <Alert className="border-warning-main bg-warning-main/10">
                <AlertTriangle className="h-4 w-4 text-warning-main" />
                <AlertTitle className="text-warning-main">Warning</AlertTitle>
                <AlertDescription className="text-warning-main/80">
                  Please review this important information before proceeding.
                </AlertDescription>
              </Alert>
              
              <Alert className="border-error-main bg-error-main/10">
                <AlertCircle className="h-4 w-4 text-error-main" />
                <AlertTitle className="text-error-main">Error</AlertTitle>
                <AlertDescription className="text-error-main/80">
                  Something went wrong. Please check your input and try again.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Toast Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Toast Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => showToast('success')} variant="outline">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Show Success Toast
                </Button>
                <Button onClick={() => showToast('error')} variant="outline">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Show Error Toast
                </Button>
                <Button onClick={() => showToast('info')} variant="outline">
                  <Info className="mr-2 h-4 w-4" />
                  Show Info Toast
                </Button>
                <Button onClick={() => showToast('warning')} variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Show Warning Toast
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Modals & Dialogs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Modals & Dialogs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Simple Modal</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Simple Dialog</DialogTitle>
                      <DialogDescription>
                        This is a basic modal dialog with some content.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-sm text-grey-600">
                        This modal demonstrates the basic structure and styling of our dialog component.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Confirmation Modal</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Confirm Action</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to proceed with this action? This cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <Alert className="border-warning-main bg-warning-main/10">
                        <AlertTriangle className="h-4 w-4 text-warning-main" />
                        <AlertDescription className="text-warning-main/80">
                          This action is permanent and cannot be reversed.
                        </AlertDescription>
                      </Alert>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Info Modal</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-info-main" />
                        Information
                      </DialogTitle>
                      <DialogDescription>
                        Here's some additional information about this feature.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-grey-600">
                        This modal provides detailed information and can include various content types.
                      </p>
                      <div className="bg-grey-200 p-3 rounded-lg">
                        <p className="text-sm font-medium">Quick Tip:</p>
                        <p className="text-sm text-grey-600">
                          You can customize modals to fit your specific use case.
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button>Got it</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Color Palette
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {colorTokens.map((color) => (
                  <div key={color.name} className="text-center">
                    <div
                      className={`w-20 h-20 ${color.class} rounded-lg border border-grey-400 mx-auto mb-2 shadow-sm`}
                    />
                    <p className="text-small-text font-sans text-grey-800 font-medium">
                      {color.name}
                    </p>
                    <p className="text-overline font-mono text-grey-600">
                      {color.hex}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Spacing Scale */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Spacing Scale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {spacingValues.map((spacing) => (
                  <div key={spacing.name} className="text-center">
                    <div className="bg-grey-200 rounded-lg inline-block mb-2">
                      <div className={`bg-primary-main ${spacing.class} rounded-lg`}>
                        <div className="w-8 h-8"></div>
                      </div>
                    </div>
                    <p className="text-small-text font-sans text-grey-800 font-medium">
                      {spacing.name}
                    </p>
                    <p className="text-overline font-mono text-grey-600">
                      {spacing.value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Border Radius */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Border Radius
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {borderRadiusValues.map((radius) => (
                  <div key={radius.name} className="text-center">
                    <div className={`w-20 h-20 bg-primary-light ${radius.class} mx-auto mb-2 shadow-sm`} />
                    <p className="text-small-text font-sans text-grey-800 font-medium">
                      {radius.name}
                    </p>
                    <p className="text-overline font-mono text-grey-600">
                      {radius.value}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shadows */}
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-sans text-secondary-main">
                Shadows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {shadowValues.map((shadow) => (
                  <div key={shadow.name} className="text-center">
                    <div className={`w-20 h-20 bg-background-paper rounded-lg ${shadow.class} mx-auto mb-2`} />
                    <p className="text-small-text font-sans text-grey-800 font-medium">
                      {shadow.name}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DesignSystemPlayground;
