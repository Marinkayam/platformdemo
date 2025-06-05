
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from "@/lib/toast-helpers";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Check, Info, X, Download, BadgeCheck, Heart, Star, CheckCircle, Loader2, ArrowLeft, Palette, Settings, ExternalLink, Users, FileText, Package } from "lucide-react";

export default function DesignSystemPlayground() {
  const [basicCheckbox, setBasicCheckbox] = useState(false);
  const [checkedCheckbox, setCheckedCheckbox] = useState(true);
  const [requiredCheckbox, setRequiredCheckbox] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [switchChecked, setSwitchChecked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoadingAction = (action: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showSuccessToast("Success!", `${action} completed successfully`);
    }, 2000);
  };

  const testToasts = () => {
    showInfoToast("Information", "Here's some helpful information for you");
    setTimeout(() => {
      showSuccessToast("Operation successful", "Your changes have been saved successfully");
    }, 1000);
    setTimeout(() => {
      showErrorToast("Error occurred", "Something went wrong with the operation");
    }, 2000);
    setTimeout(() => {
      showWarningToast("Warning message", "Please check your input before proceeding");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background-default">
      {/* Header */}
      <div className="bg-background-paper border-b border-grey-300 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-grey-600 hover:text-grey-800 hover:bg-grey-200">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-lighter rounded-lg">
                <Palette className="h-5 w-5 text-primary-main" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-grey-900">Design System</h1>
                <p className="text-sm text-grey-600">Monto UI Components & Design Tokens</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-background-paper rounded-xl border border-grey-300 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-grey-900 mb-4">Components</h3>
              <nav className="space-y-2">
                <a href="#typography" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Typography</a>
                <a href="#buttons" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Buttons</a>
                <a href="#status-badges" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Status Badges</a>
                <a href="#chips-badges" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Chips & Badges</a>
                <a href="#inputs" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Inputs</a>
                <a href="#controls" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Controls</a>
                <a href="#alerts" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Alerts</a>
                <a href="#modals" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Modals</a>
                <a href="#table-rows" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Table Rows</a>
                <a href="#spacing" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Spacing</a>
                <a href="#cards" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Cards</a>
                <a href="#colors" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Colors</a>
                <a href="#toasts" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Toast Notifications</a>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-12">

            {/* Typography Section */}
            <section id="typography" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Typography</h2>
                <p className="text-grey-600">Consistent text hierarchy using Studio Feixen Sans</p>
              </div>
              
              <div className="grid gap-6">
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <h1 className="text-6xl font-medium text-grey-900">Heading 1</h1>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">60px / font-medium</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <h2 className="text-5xl font-medium text-grey-900">Heading 2</h2>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">48px / font-medium</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <h3 className="text-3xl font-medium text-grey-900">Heading 3</h3>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">30px / font-medium</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <h4 className="text-2xl font-medium text-grey-900">Heading 4</h4>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">24px / font-medium</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-base font-semibold text-grey-800">Subtitle 1 - Primary subtitles</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">16px / font-semibold</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-base font-medium text-grey-800">Subtitle 2 - Medium weight</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">16px / font-medium</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-base font-normal text-grey-700">Body 1 - Main content text for readability</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">16px / font-normal</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-base font-light text-grey-700">Body 1 Light - Light weight content</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">16px / font-light</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-sm font-normal text-grey-600">Body 2 - Secondary content and descriptions</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">14px / font-normal</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-sm font-bold text-grey-800">Body 2 Bold - Emphasized secondary content</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">14px / font-bold</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-normal text-grey-500">Caption - Meta information and fine print</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">12px / font-normal</span>
                </div>
              </div>
            </section>

            {/* Buttons Section */}
            <section id="buttons" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Buttons</h2>
                <p className="text-grey-600">Interactive elements with consistent styling</p>
              </div>
              
              <div className="grid gap-8">
                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Button Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Primary</Button>
                    <Button variant="secondary" className="bg-grey-200 hover:bg-grey-300 text-grey-800">Secondary</Button>
                    <Button variant="destructive" className="bg-error-main hover:bg-error-dark text-error-contrast-text">Destructive</Button>
                    <Button variant="outline" className="border-primary-main text-primary-main hover:bg-primary-main hover:text-primary-contrast-text">Outline</Button>
                    <Button variant="ghost" className="text-primary-main hover:bg-primary-lighter">Ghost</Button>
                    <Button variant="link" className="text-primary-main hover:underline p-0 h-auto">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Link Button
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Button Sizes</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text h-7 px-2 text-xs">Extra Small</Button>
                    <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Small</Button>
                    <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Default</Button>
                    <Button size="lg" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Large</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Button States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Normal</Button>
                    <Button disabled className="bg-grey-300 text-grey-500 cursor-not-allowed">Disabled</Button>
                    <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">
                      <Download className="mr-2 h-4 w-4" />
                      With Icon
                    </Button>
                    <Button 
                      onClick={() => handleLoadingAction("Save")}
                      disabled={loading}
                      className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text"
                    >
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Loading State
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Status Badges Section */}
            <section id="status-badges" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Status Badges</h2>
                <p className="text-grey-600">Invoice status indicators matching RTP table design</p>
              </div>
              
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Process Status</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100 font-normal">RTP Prepared</Badge>
                    <Badge className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100 font-normal">Awaiting SC</Badge>
                    <Badge className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100 font-normal">RTP Sent</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Action Required</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 font-normal">Pending Action</Badge>
                    <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 font-normal">Rejected by Buyer</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Approval Status</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 font-normal">Approved by Buyer</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">External Status</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 font-normal">External Submission</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Payment Status</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 font-normal">Paid</Badge>
                    <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 font-normal">Settled</Badge>
                    <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 font-normal">Partially Settled</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Other Status</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-grey-100 text-grey-700 border-grey-300 hover:bg-grey-200 font-normal">Excluded</Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* Chips & Badges Section */}
            <section id="chips-badges" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Chips & Badges</h2>
                <p className="text-grey-600">Interactive chips and informational badges</p>
              </div>
              
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Basic Badges</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-primary-lighter text-primary-dark border-primary-light font-normal">Default</Badge>
                    <Badge variant="secondary" className="bg-grey-200 text-grey-700 border-grey-300 font-normal">Secondary</Badge>
                    <Badge variant="outline" className="border-grey-400 text-grey-700 bg-background-paper font-normal">Outlined</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Semantic Badges</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-success-lighter text-success-dark border-success-light font-normal">Success</Badge>
                    <Badge className="bg-warning-lighter text-warning-dark border-warning-light font-normal">Warning</Badge>
                    <Badge className="bg-error-lighter text-error-dark border-error-light font-normal">Error</Badge>
                    <Badge className="bg-info-lighter text-info-dark border-info-light font-normal">Info</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Interactive Chips</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-primary-lighter text-primary-dark border-primary-light cursor-pointer hover:bg-primary-light font-normal">
                      Clickable
                    </Badge>
                    <Badge className="bg-primary-lighter text-primary-dark border-primary-light cursor-pointer hover:bg-primary-light font-normal">
                      Deletable
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                    <Badge className="bg-success-lighter text-success-dark border-success-light cursor-pointer hover:bg-success-light font-normal">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      With Icon
                    </Badge>
                  </div>
                </div>
              </div>
            </section>

            {/* Inputs Section */}
            <section id="inputs" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Form Inputs</h2>
                <p className="text-grey-600">Input components for data collection</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-grey-800 font-medium">Default Input</Label>
                  <Input placeholder="Enter text..." className="border-grey-400 focus-visible:ring-0 focus-visible:border-primary-main bg-background-paper" />
                </div>
                
                <div className="space-y-2">
                  <Label className="text-grey-800 font-medium">With Helper Text</Label>
                  <Input placeholder="Type something" className="border-grey-400 focus-visible:ring-0 focus-visible:border-primary-main bg-background-paper" />
                  <p className="text-sm text-grey-600">This is helpful guidance text</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-grey-800 font-medium">Error State</Label>
                  <Input placeholder="Error input" className="border-error-main focus-visible:ring-0 focus-visible:border-error-main bg-background-paper" />
                  <p className="text-sm text-error-main">This field has a validation error</p>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-grey-800 font-medium">Disabled Input</Label>
                  <Input placeholder="Disabled" disabled className="bg-grey-200 border-grey-300 text-grey-500" />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label className="text-grey-800 font-medium">Textarea</Label>
                <Textarea placeholder="Enter multiline text here..." className="border-grey-400 focus-visible:ring-0 focus-visible:border-primary-main bg-background-paper" />
              </div>
            </section>

            {/* Controls Section */}
            <section id="controls" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Controls</h2>
                <p className="text-grey-600">Interactive form controls and toggles</p>
              </div>
              
              <div className="grid gap-8">
                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Checkboxes</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id="basic" 
                        checked={basicCheckbox}
                        onCheckedChange={(checked) => setBasicCheckbox(checked === true)}
                        className="border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main"
                      />
                      <Label htmlFor="basic" className="text-grey-700">Basic checkbox option</Label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id="checked" 
                        checked={checkedCheckbox}
                        onCheckedChange={(checked) => setCheckedCheckbox(checked === true)}
                        className="border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main"
                      />
                      <Label htmlFor="checked" className="text-grey-700">Pre-selected option</Label>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Checkbox disabled className="border-grey-300 bg-grey-100" />
                      <Label className="text-grey-500">Disabled option</Label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Radio Buttons</h3>
                  <RadioGroup value={radioValue} onValueChange={setRadioValue} className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="option1" id="radio1" className="border-grey-400 text-primary-main" />
                      <Label htmlFor="radio1" className="text-grey-700">First option</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="option2" id="radio2" className="border-grey-400 text-primary-main" />
                      <Label htmlFor="radio2" className="text-grey-700">Second option</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="option3" id="radio3" className="border-grey-400 text-primary-main" />
                      <Label htmlFor="radio3" className="text-grey-700">Third option</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Switches</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg border-grey-300">
                      <div>
                        <Label className="text-grey-800 font-medium">Email Notifications</Label>
                        <p className="text-sm text-grey-600">Receive updates via email</p>
                      </div>
                      <Switch 
                        checked={switchChecked}
                        onCheckedChange={setSwitchChecked}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg border-grey-300">
                      <div>
                        <Label className="text-grey-800 font-medium">Auto Save</Label>
                        <p className="text-sm text-grey-600">Save changes automatically</p>
                      </div>
                      <Switch 
                        checked={autoSave}
                        onCheckedChange={setAutoSave}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Alert Cases Section */}
            <section id="alerts" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Alert Cases</h2>
                <p className="text-grey-600">User notifications and system messages</p>
              </div>
              
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Standard Alerts</h3>
                  <div className="space-y-4">
                    <Alert className="border-info-light bg-info-lighter">
                      <Info className="h-4 w-4 text-info-main" />
                      <AlertDescription className="text-info-dark">
                        This is an informational alert with important details for the user.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="border-success-light bg-success-lighter">
                      <Check className="h-4 w-4 text-success-main" />
                      <AlertDescription className="text-success-dark">
                        Operation completed successfully! Your changes have been saved.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="border-warning-light bg-warning-lighter">
                      <AlertTriangle className="h-4 w-4 text-warning-main" />
                      <AlertDescription className="text-warning-dark">
                        Please review your input before proceeding with this action.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="border-error-light bg-error-lighter">
                      <X className="h-4 w-4 text-error-main" />
                      <AlertDescription className="text-error-dark">
                        An error occurred while processing your request. Please try again.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Filled Alerts</h3>
                  <div className="space-y-4">
                    <Alert className="bg-info-main text-info-contrast-text border-0">
                      <Info className="h-4 w-4 text-info-contrast-text" />
                      <AlertDescription className="text-info-contrast-text">
                        High contrast informational alert for maximum visibility.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="bg-success-main text-success-contrast-text border-0">
                      <Check className="h-4 w-4 text-success-contrast-text" />
                      <AlertDescription className="text-success-contrast-text">
                        Bold success message for completed operations.
                      </AlertDescription>
                    </Alert>

                    <Alert className="bg-warning-main text-warning-contrast-text border-0">
                      <AlertTriangle className="h-4 w-4 text-warning-contrast-text" />
                      <AlertDescription className="text-warning-contrast-text">
                        Important warning message requiring immediate attention.
                      </AlertDescription>
                    </Alert>

                    <Alert className="bg-error-main text-error-contrast-text border-0">
                      <X className="h-4 w-4 text-error-contrast-text" />
                      <AlertDescription className="text-error-contrast-text">
                        Critical error alert with high contrast for urgent situations.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </div>
            </section>

            {/* Modals Section */}
            <section id="modals" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Modals</h2>
                <p className="text-grey-600">Dialog components for user interactions</p>
              </div>
              
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Basic Modal</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Open Modal</Button>
                    </DialogTrigger>
                    <DialogContent className="bg-background-paper border border-grey-300 rounded-xl shadow-xl">
                      <DialogHeader>
                        <DialogTitle className="text-grey-900">Modal Title</DialogTitle>
                        <DialogDescription className="text-grey-600">
                          This is a basic modal dialog component with a title and description.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-grey-700">Modal content goes here. You can add forms, buttons, or any other content.</p>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" className="border-grey-300 text-grey-700 hover:bg-grey-200">
                          Cancel
                        </Button>
                        <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">
                          Confirm
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </section>

            {/* Table Rows Section */}
            <section id="table-rows" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Table Rows</h2>
                <p className="text-grey-600">Table row components with different states</p>
              </div>
              
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Row States</h3>
                  <div className="border border-grey-300 rounded-lg overflow-hidden">
                    <div className="bg-grey-200 px-4 py-3 border-b border-grey-300">
                      <div className="grid grid-cols-4 gap-4 text-sm font-medium text-grey-800">
                        <span>Name</span>
                        <span>Status</span>
                        <span>Date</span>
                        <span>Actions</span>
                      </div>
                    </div>
                    
                    <div className="bg-background-paper px-4 py-3 border-b border-grey-300 hover:bg-grey-100 transition-colors">
                      <div className="grid grid-cols-4 gap-4 text-sm text-grey-700">
                        <span>Normal Row</span>
                        <Badge className="bg-success-lighter text-success-dark border-success-light font-normal w-fit">Active</Badge>
                        <span>2024-01-15</span>
                        <Button size="sm" variant="outline" className="border-grey-300 text-grey-700 w-fit">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="bg-primary-lighter px-4 py-3 border-b border-grey-300">
                      <div className="grid grid-cols-4 gap-4 text-sm text-grey-700">
                        <span>Selected Row</span>
                        <Badge className="bg-info-lighter text-info-dark border-info-light font-normal w-fit">Pending</Badge>
                        <span>2024-01-16</span>
                        <Button size="sm" variant="outline" className="border-grey-300 text-grey-700 w-fit">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="bg-grey-100 px-4 py-3 opacity-60">
                      <div className="grid grid-cols-4 gap-4 text-sm text-grey-500">
                        <span>Disabled Row</span>
                        <Badge className="bg-grey-200 text-grey-600 border-grey-300 font-normal w-fit">Inactive</Badge>
                        <span>2024-01-17</span>
                        <Button size="sm" variant="outline" disabled className="w-fit">Edit</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Spacing Section */}
            <section id="spacing" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Spacing System</h2>
                <p className="text-grey-600">Consistent spacing using 4px base unit</p>
              </div>
              
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Spacing Scale</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-1 bg-primary-main rounded" style={{ height: '4px' }}></div>
                      <span className="text-sm font-mono text-grey-600">1 (4px)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-2 bg-primary-main rounded" style={{ height: '8px' }}></div>
                      <span className="text-sm font-mono text-grey-600">2 (8px)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-3 bg-primary-main rounded" style={{ height: '12px' }}></div>
                      <span className="text-sm font-mono text-grey-600">3 (12px)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-4 bg-primary-main rounded" style={{ height: '16px' }}></div>
                      <span className="text-sm font-mono text-grey-600">4 (16px)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-6 bg-primary-main rounded" style={{ height: '24px' }}></div>
                      <span className="text-sm font-mono text-grey-600">6 (24px)</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-8 bg-primary-main rounded" style={{ height: '32px' }}></div>
                      <span className="text-sm font-mono text-grey-600">8 (32px)</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cards Section */}
            <section id="cards" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Cards</h2>
                <p className="text-grey-600">Content containers with different elevations</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-grey-300 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium text-grey-900">Basic Card</CardTitle>
                    <p className="text-sm text-grey-600">Simple content container</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-grey-700">Standard card with minimal elevation for organizing content.</p>
                  </CardContent>
                </Card>
                
                <Card className="border-2 border-grey-300 shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium text-grey-900">Outlined Card</CardTitle>
                    <p className="text-sm text-grey-600">Enhanced border styling</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-grey-700">Card with prominent border for visual separation.</p>
                  </CardContent>
                </Card>
                
                <Card className="border-grey-300 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-medium text-grey-900">Elevated Card</CardTitle>
                    <p className="text-sm text-grey-600">Higher elevation design</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-grey-700">Card with increased shadow for floating appearance.</p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Colors Section */}
            <section id="colors" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Color Palette</h2>
                <p className="text-grey-600">Monto design system color tokens</p>
              </div>
              
              <div className="grid gap-8">
                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Primary Colors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="space-y-2">
                      <div className="h-16 bg-primary-lighter rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">primary-lighter</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-primary-light rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">primary-light</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-primary-main rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">primary-main</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-primary-dark rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">primary-dark</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-primary-darker rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">primary-darker</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Semantic Colors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="h-16 bg-success-main rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">success-main</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-warning-main rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">warning-main</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-error-main rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">error-main</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-info-main rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">info-main</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Grey Scale</h3>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    <div className="space-y-2">
                      <div className="h-16 bg-grey-200 rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">grey-200</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-grey-300 rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">grey-300</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-grey-500 rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">grey-500</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-grey-700 rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">grey-700</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-grey-800 rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">grey-800</p>
                    </div>
                    <div className="space-y-2">
                      <div className="h-16 bg-grey-900 rounded-lg border border-grey-300"></div>
                      <p className="text-sm font-mono text-grey-600">grey-900</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Toast Testing Section */}
            <section id="toasts" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Toast Notifications</h2>
                <p className="text-grey-600">Enhanced notification components with Monto styling</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => showSuccessToast("Success!", "Operation completed successfully")} className="bg-success-main hover:bg-success-dark text-success-contrast-text">
                  <Check className="mr-2 h-4 w-4" />
                  Success Toast
                </Button>
                <Button onClick={() => showErrorToast("Error!", "Something went wrong")} className="bg-error-main hover:bg-error-dark text-error-contrast-text">
                  <X className="mr-2 h-4 w-4" />
                  Error Toast
                </Button>
                <Button onClick={() => showInfoToast("Info", "Here's some information")} className="bg-info-main hover:bg-info-dark text-info-contrast-text">
                  <Info className="mr-2 h-4 w-4" />
                  Info Toast
                </Button>
                <Button onClick={() => showWarningToast("Warning", "Please be careful")} className="bg-warning-main hover:bg-warning-dark text-warning-contrast-text">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Warning Toast
                </Button>
              </div>
            </section>

          </div>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
}
