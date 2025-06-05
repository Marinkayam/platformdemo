
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
import { AlertTriangle, Check, Info, X, Download, BadgeCheck, Heart, Star, CheckCircle, Loader2 } from "lucide-react";

export default function DesignSystemPlayground() {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [basicCheckbox, setBasicCheckbox] = useState(false);
  const [checkedCheckbox, setCheckedCheckbox] = useState(true);
  const [requiredCheckbox, setRequiredCheckbox] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [loading, setLoading] = useState(false);

  const handleLoadingAction = (action: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showSuccessToast(`${action} completed`, `${action} operation finished successfully`);
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
    <div className="container mx-auto p-8 space-y-12 bg-background-default min-h-screen">
      <div className="bg-background-paper rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-secondary-main font-sans">Design System Playground</h1>
        <p className="text-grey-600 mb-8">Exploring Monto's Design Tokens</p>
        
        {/* Buttons Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Buttons</h2>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-grey-700">Button Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary-main hover:bg-primary-dark text-white">Default</Button>
              <Button variant="secondary" className="bg-grey-200 text-grey-800 hover:bg-grey-300">Secondary</Button>
              <Button variant="destructive" className="bg-error-main hover:bg-error-main/90 text-white">Destructive</Button>
              <Button variant="outline" className="border-primary-main text-primary-main hover:bg-primary-main hover:text-white">Outline</Button>
              <Button variant="ghost" className="text-primary-main hover:bg-primary-lighter">Ghost</Button>
              <Button variant="link" className="text-primary-main underline-offset-4 hover:underline">Link</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-grey-700">Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-white">Small</Button>
              <Button className="bg-primary-main hover:bg-primary-dark text-white">Default</Button>
              <Button size="lg" className="bg-primary-main hover:bg-primary-dark text-white">Large</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-grey-700">Button States</h3>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary-main hover:bg-primary-dark text-white">Normal</Button>
              <Button disabled className="bg-grey-400 text-grey-600 cursor-not-allowed">Disabled</Button>
              <Button className="bg-primary-main hover:bg-primary-dark text-white">
                <Download className="mr-2 h-4 w-4" />
                With Icon
              </Button>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Inputs Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Inputs</h2>
          <p className="text-grey-600">Form Input Components</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans">Basic Input</Label>
              <Input placeholder="Enter text..." className="border-grey-400 focus-visible:ring-1 focus-visible:ring-primary-main focus-visible:border-primary-main" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans">Labeled Input</Label>
              <Input placeholder="With label" className="border-grey-400 focus-visible:ring-1 focus-visible:ring-primary-main focus-visible:border-primary-main" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans">With Helper Text</Label>
              <Input placeholder="Type something" className="border-grey-400 focus-visible:ring-1 focus-visible:ring-primary-main focus-visible:border-primary-main" />
              <p className="text-sm text-grey-500">This is some helpful text</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans">Error State</Label>
              <Input placeholder="Error input" className="border-error-main focus-visible:ring-1 focus-visible:ring-error-main focus-visible:border-error-main" />
              <p className="text-sm text-error-main">This field has an error</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans">Password Input</Label>
              <Input type="password" placeholder="Enter password" className="border-grey-400 focus-visible:ring-1 focus-visible:ring-primary-main focus-visible:border-primary-main" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-grey-700">Text Areas</h3>
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans">Basic Textarea</Label>
              <Textarea placeholder="Enter multiline text here..." className="border-grey-400 focus-visible:ring-1 focus-visible:ring-primary-main focus-visible:border-primary-main" />
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Typography Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-grey-900 font-sans">Heading 1</h1>
            <h2 className="text-3xl font-bold text-grey-900 font-sans">Heading 2</h2>
            <h3 className="text-2xl font-semibold text-grey-900 font-sans">Heading 3</h3>
            <h4 className="text-xl font-semibold text-grey-900 font-sans">Heading 4</h4>
            <h5 className="text-lg font-medium text-grey-900 font-sans">Heading 5</h5>
            <h6 className="text-base font-medium text-grey-900 font-sans">Heading 6</h6>
            <p className="text-lg text-grey-800 font-sans">Subtitle 1</p>
            <p className="text-base text-grey-700 font-sans">Subtitle 2</p>
            <p className="text-base text-grey-800 font-sans">Body 1 - Main text for content</p>
            <p className="text-sm text-grey-700 font-sans">Body 2 - Secondary text</p>
            <p className="text-sm text-grey-600 font-sans">Body 3 - Light text for subtle information</p>
            <p className="text-xs text-grey-600 font-sans">Caption text for images and meta info</p>
            <p className="text-overline font-medium text-grey-800 font-sans uppercase tracking-wide">OVERLINE TEXT FOR LABELS</p>
            <p className="text-sm font-medium text-grey-800 font-sans uppercase">BUTTON TEXT</p>
            <p className="text-small-text text-grey-600 font-sans">Small text for fine print</p>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Checkboxes Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Checkboxes</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="basic" 
                checked={basicCheckbox}
                onCheckedChange={(checked) => setBasicCheckbox(checked === true)}
                className="border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main"
              />
              <Label htmlFor="basic" className="text-grey-700 font-sans">Basic Checkbox</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="checked" 
                checked={checkedCheckbox}
                onCheckedChange={(checked) => setCheckedCheckbox(checked === true)}
                className="border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main"
              />
              <Label htmlFor="checked" className="text-grey-700 font-sans">Checked Checkbox</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="required" 
                checked={requiredCheckbox}
                onCheckedChange={(checked) => setRequiredCheckbox(checked === true)}
                className="border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main"
              />
              <Label htmlFor="required" className="text-grey-700 font-sans">Required Checkbox</Label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-grey-700">Sizes</h3>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Checkbox className="h-3 w-3 border-grey-400 data-[state=checked]:bg-primary-main rounded-xs" />
                <Label className="text-sm text-grey-700 font-sans">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-4 w-4 border-grey-400 data-[state=checked]:bg-primary-main" />
                <Label className="text-grey-700 font-sans">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-5 w-5 border-grey-400 data-[state=checked]:bg-primary-main" />
                <Label className="text-lg text-grey-700 font-sans">Large</Label>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Radio Buttons Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Radio Buttons</h2>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-grey-700">Basic Radio Group</h3>
            <RadioGroup value={radioValue} onValueChange={setRadioValue} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="option1" className="border-grey-400 text-primary-main" />
                <Label htmlFor="option1" className="text-grey-700 font-sans">Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="option2" className="border-grey-400 text-primary-main" />
                <Label htmlFor="option2" className="text-grey-700 font-sans">Option 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option3" id="option3" className="border-grey-400 text-primary-main" />
                <Label htmlFor="option3" className="text-grey-700 font-sans">Option 3</Label>
              </div>
            </RadioGroup>

            <h3 className="text-lg font-medium text-grey-700">Horizontal Radio Group</h3>
            <RadioGroup value={radioValue} onValueChange={setRadioValue} className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="horizontal1" id="horizontal1" className="border-grey-400 text-primary-main" />
                <Label htmlFor="horizontal1" className="text-grey-700 font-sans">Choice A</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="horizontal2" id="horizontal2" className="border-grey-400 text-primary-main" />
                <Label htmlFor="horizontal2" className="text-grey-700 font-sans">Choice B</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="horizontal3" id="horizontal3" className="border-grey-400 text-primary-main" />
                <Label htmlFor="horizontal3" className="text-grey-700 font-sans">Choice C</Label>
              </div>
            </RadioGroup>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Toggles & Switches Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Toggles & Switches</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg border-grey-300">
              <div>
                <Label className="text-grey-700 font-sans font-medium">Notifications</Label>
                <p className="text-sm text-grey-600">Receive email notifications</p>
              </div>
              <Switch 
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg border-grey-300">
              <div>
                <Label className="text-grey-700 font-sans font-medium">Dark Mode</Label>
                <p className="text-sm text-grey-600">Toggle dark theme</p>
              </div>
              <Switch 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg border-grey-300">
              <div>
                <Label className="text-grey-700 font-sans font-medium">Auto Save</Label>
                <p className="text-sm text-grey-600">Automatically save changes</p>
              </div>
              <Switch 
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Chips & Badges Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Chips & Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-primary-main text-white">Default</Badge>
            <Badge variant="secondary" className="bg-grey-200 text-grey-800">Secondary</Badge>
            <Badge variant="outline" className="border-grey-400 text-grey-700">Outlined</Badge>
            <Badge className="bg-success-main text-white">Success</Badge>
            <Badge className="bg-warning-main text-grey-900">Warning</Badge>
            <Badge className="bg-error-main text-white">Error</Badge>
            <Badge className="bg-primary-main text-white">
              Deletable
              <X className="ml-1 h-3 w-3" />
            </Badge>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Status Badges Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Status Badges</h2>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-grey-700">Connection Status</h3>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-success-main text-white">
                <CheckCircle className="mr-1 h-3 w-3" />
                Connected
              </Badge>
              <Badge className="bg-error-main text-white">
                <X className="mr-1 h-3 w-3" />
                Disconnected
              </Badge>
              <Badge className="bg-warning-main text-grey-900">
                <AlertTriangle className="mr-1 h-3 w-3" />
                Warning
              </Badge>
              <Badge className="bg-info-main text-white">
                <Info className="mr-1 h-3 w-3" />
                Processing
              </Badge>
            </div>

            <h3 className="text-lg font-medium text-grey-700">System Status</h3>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-success-main text-white">Active</Badge>
              <Badge className="bg-grey-500 text-white">Inactive</Badge>
              <Badge className="bg-warning-main text-grey-900">Pending</Badge>
              <Badge className="bg-error-main text-white">Failed</Badge>
              <Badge className="bg-info-main text-white">In Progress</Badge>
              <Badge className="bg-primary-main text-white">Complete</Badge>
            </div>

            <h3 className="text-lg font-medium text-grey-700">Priority Levels</h3>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-error-main text-white">High Priority</Badge>
              <Badge className="bg-warning-main text-grey-900">Medium Priority</Badge>
              <Badge className="bg-success-main text-white">Low Priority</Badge>
              <Badge className="bg-grey-400 text-grey-800">Normal</Badge>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Tooltips Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Tooltips</h2>
          <TooltipProvider>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover Me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Basic tooltip content</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="bg-success-main hover:bg-success-main/90 text-white">Success Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent className="bg-success-main text-white">
                  <p>Success message</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="bg-warning-main hover:bg-warning-main/90 text-grey-900">Warning Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent className="bg-warning-main text-grey-900">
                  <p>Warning message</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="bg-error-main hover:bg-error-main/90 text-white">Error Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent className="bg-error-main text-white">
                  <p>Error message</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </section>

        <Separator className="my-8" />

        {/* Cards Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Default Card</CardTitle>
                <p className="text-sm text-grey-600">Small size</p>
              </CardHeader>
              <CardContent>
                <p className="text-grey-700">Basic card content</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-grey-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Outlined Card</CardTitle>
                <p className="text-sm text-grey-600">Default size</p>
              </CardHeader>
              <CardContent>
                <p className="text-grey-700">Card with outline</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Elevated Card</CardTitle>
                <p className="text-sm text-grey-600">Large size</p>
              </CardHeader>
              <CardContent>
                <p className="text-grey-700">Card with elevation</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Icons Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Icons</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <BadgeCheck className="h-5 w-5 text-primary-main" />
              <span className="text-grey-700">Badge Check Icon</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-error-main" />
              <span className="text-grey-700">Heart Icon</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-warning-main" />
              <span className="text-grey-700">Star Icon</span>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-success-main" />
              <span className="text-grey-700">Download Icon</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success-main" />
              <span className="text-grey-700">Check Circle Icon</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning-main" />
              <span className="text-grey-700">Alert Triangle Icon</span>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Loading States Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Loading States</h2>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-grey-700">Skeleton Loading</h3>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] bg-grey-300" />
              <Skeleton className="h-4 w-[200px] bg-grey-300" />
              <Skeleton className="h-4 w-[300px] bg-grey-300" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-grey-700">Button Loading States</h3>
            <div className="flex gap-4">
              <Button 
                onClick={() => handleLoadingAction("Save Document")}
                disabled={loading}
                className="bg-primary-main hover:bg-primary-dark text-white"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Document
              </Button>
              <Button 
                onClick={() => handleLoadingAction("Upload File")}
                disabled={loading}
                className="bg-success-main hover:bg-success-main/90 text-white"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Upload File
              </Button>
              <Button 
                onClick={() => handleLoadingAction("Process Data")}
                disabled={loading}
                className="bg-info-main hover:bg-info-main/90 text-white"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Process Data
              </Button>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Banners & Alerts Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Banners & Alerts</h2>
          <div className="space-y-4">
            <Alert className="border-info-main bg-info-main/10">
              <Info className="h-4 w-4 text-info-main" />
              <div>
                <h4 className="text-info-main font-medium">Information</h4>
                <p className="text-info-main/80">This is an informational banner to provide helpful context.</p>
              </div>
            </Alert>
            
            <Alert className="border-success-main bg-success-main/10">
              <Check className="h-4 w-4 text-success-main" />
              <div>
                <h4 className="text-success-main font-medium">Success</h4>
                <p className="text-success-main/80">Your operation completed successfully!</p>
              </div>
            </Alert>
            
            <Alert className="border-warning-main bg-warning-main/10">
              <AlertTriangle className="h-4 w-4 text-warning-main" />
              <div>
                <h4 className="text-warning-main font-medium">Warning</h4>
                <p className="text-warning-main/80">Please review this important information before proceeding.</p>
              </div>
            </Alert>
            
            <Alert className="border-error-main bg-error-main/10">
              <X className="h-4 w-4 text-error-main" />
              <div>
                <h4 className="text-error-main font-medium">Error</h4>
                <p className="text-error-main/80">Something went wrong. Please check your input and try again.</p>
              </div>
            </Alert>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Toast Notifications Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Toast Notifications</h2>
          <div className="flex gap-4">
            <Button onClick={() => showSuccessToast("Success!", "Operation completed successfully")} className="bg-success-main hover:bg-success-main/90 text-white">
              Show Success Toast
            </Button>
            <Button onClick={() => showErrorToast("Error!", "Something went wrong")} className="bg-error-main hover:bg-error-main/90 text-white">
              Show Error Toast
            </Button>
            <Button onClick={() => showInfoToast("Info", "Here's some information")} className="bg-primary-lighter hover:bg-primary-light text-primary-darker">
              Show Info Toast
            </Button>
            <Button onClick={() => showWarningToast("Warning", "Please be careful")} className="bg-warning-main hover:bg-warning-main/90 text-grey-900">
              Show Warning Toast
            </Button>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Modals & Dialogs Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Modals & Dialogs</h2>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Simple Modal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Simple Modal</DialogTitle>
                  <DialogDescription>
                    This is a basic modal dialog with some content.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-grey-700">Modal content goes here...</p>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-warning-main hover:bg-warning-main/90 text-grey-900">Confirmation Modal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Action</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to proceed with this action?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-primary-main hover:bg-primary-dark text-white">Confirm</Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-info-main hover:bg-info-main/90 text-white">Info Modal</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Information</DialogTitle>
                  <DialogDescription>
                    Here's some important information you should know.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-grey-700">Detailed information content...</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Color Palette Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-primary-lighter rounded flex items-center justify-center text-grey-900 text-sm font-medium">primary-lighter</div>
              <p className="text-xs text-grey-600 text-center">#EFEBFF</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-light rounded flex items-center justify-center text-grey-900 text-sm font-medium">primary-light</div>
              <p className="text-xs text-grey-600 text-center">#BEADFF</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-main rounded flex items-center justify-center text-white text-sm font-medium">primary-main</div>
              <p className="text-xs text-grey-600 text-center">#7B59FF</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-dark rounded flex items-center justify-center text-white text-sm font-medium">primary-dark</div>
              <p className="text-xs text-grey-600 text-center">#523BAA</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-darker rounded flex items-center justify-center text-white text-sm font-medium">primary-darker</div>
              <p className="text-xs text-grey-600 text-center">#291E55</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-lighter rounded flex items-center justify-center text-grey-900 text-sm font-medium">secondary-lighter</div>
              <p className="text-xs text-grey-600 text-center">#E6E7EB</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-light rounded flex items-center justify-center text-white text-sm font-medium">secondary-light</div>
              <p className="text-xs text-grey-600 text-center">#6F768B</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-main rounded flex items-center justify-center text-white text-sm font-medium">secondary-main</div>
              <p className="text-xs text-grey-600 text-center">#1D153B</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-dark rounded flex items-center justify-center text-white text-sm font-medium">secondary-dark</div>
              <p className="text-xs text-grey-600 text-center">#181231</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-darker rounded flex items-center justify-center text-white text-sm font-medium">secondary-darker</div>
              <p className="text-xs text-grey-600 text-center">#0A0714</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-0 border rounded flex items-center justify-center text-grey-900 text-sm font-medium">grey-0</div>
              <p className="text-xs text-grey-600 text-center">#FFFFFF</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-100 rounded flex items-center justify-center text-white text-sm font-medium">grey-100</div>
              <p className="text-xs text-grey-600 text-center">#707C87</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-200 rounded flex items-center justify-center text-grey-900 text-sm font-medium">grey-200</div>
              <p className="text-xs text-grey-600 text-center">#F4F6F8</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-300 rounded flex items-center justify-center text-grey-900 text-sm font-medium">grey-300</div>
              <p className="text-xs text-grey-600 text-center">#F1F1F3</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-400 rounded flex items-center justify-center text-grey-900 text-sm font-medium">grey-400</div>
              <p className="text-xs text-grey-600 text-center">#E6E7EB</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-500 rounded flex items-center justify-center text-white text-sm font-medium">grey-500</div>
              <p className="text-xs text-grey-600 text-center">#8C94A9</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-600 rounded flex items-center justify-center text-white text-sm font-medium">grey-600</div>
              <p className="text-xs text-grey-600 text-center">#818799</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-700 rounded flex items-center justify-center text-white text-sm font-medium">grey-700</div>
              <p className="text-xs text-grey-600 text-center">#586079</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-800 rounded flex items-center justify-center text-white text-sm font-medium">grey-800</div>
              <p className="text-xs text-grey-600 text-center">#38415F</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-900 rounded flex items-center justify-center text-white text-sm font-medium">grey-900</div>
              <p className="text-xs text-grey-600 text-center">#061237</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-info-main rounded flex items-center justify-center text-white text-sm font-medium">info-main</div>
              <p className="text-xs text-grey-600 text-center">#375DFB</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-success-main rounded flex items-center justify-center text-white text-sm font-medium">success-main</div>
              <p className="text-xs text-grey-600 text-center">#007737</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-warning-main rounded flex items-center justify-center text-grey-900 text-sm font-medium">warning-main</div>
              <p className="text-xs text-grey-600 text-center">#F2AE40</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-error-main rounded flex items-center justify-center text-white text-sm font-medium">error-main</div>
              <p className="text-xs text-grey-600 text-center">#DF1C41</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-background-default rounded flex items-center justify-center text-grey-900 text-sm font-medium">background-default</div>
              <p className="text-xs text-grey-600 text-center">#F4F6F8</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-background-paper border rounded flex items-center justify-center text-grey-900 text-sm font-medium">background-paper</div>
              <p className="text-xs text-grey-600 text-center">#FFFFFF</p>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Spacing Scale Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Spacing Scale</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-primary-main"></div>
              <span className="text-grey-700">p-1</span>
              <span className="text-grey-600">0.25rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-8 bg-primary-main"></div>
              <span className="text-grey-700">p-2</span>
              <span className="text-grey-600">0.5rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 h-8 bg-primary-main"></div>
              <span className="text-grey-700">p-4</span>
              <span className="text-grey-600">1rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-8 bg-primary-main"></div>
              <span className="text-grey-700">p-6</span>
              <span className="text-grey-600">1.5rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary-main"></div>
              <span className="text-grey-700">p-8</span>
              <span className="text-grey-600">2rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-8 bg-primary-main"></div>
              <span className="text-grey-700">p-10</span>
              <span className="text-grey-600">2.5rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-primary-main"></div>
              <span className="text-grey-700">p-12</span>
              <span className="text-grey-600">3rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 bg-primary-main"></div>
              <span className="text-grey-700">p-16</span>
              <span className="text-grey-600">4rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-8 bg-primary-main"></div>
              <span className="text-grey-700">p-20</span>
              <span className="text-grey-600">5rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-8 bg-primary-main"></div>
              <span className="text-grey-700">p-24</span>
              <span className="text-grey-600">6rem</span>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Border Radius Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-xs mx-auto mb-2"></div>
              <p className="text-sm text-grey-700">rounded-xs</p>
              <p className="text-xs text-grey-600">0.125rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-sm mx-auto mb-2"></div>
              <p className="text-sm text-grey-700">rounded-sm</p>
              <p className="text-xs text-grey-600">0.25rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded mx-auto mb-2"></div>
              <p className="text-sm text-grey-700">rounded</p>
              <p className="text-xs text-grey-600">0.375rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-grey-700">rounded-lg</p>
              <p className="text-xs text-grey-600">0.5rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-xl mx-auto mb-2"></div>
              <p className="text-sm text-grey-700">rounded-xl</p>
              <p className="text-xs text-grey-600">0.75rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-2xl mx-auto mb-2"></div>
              <p className="text-sm text-grey-700">rounded-2xl</p>
              <p className="text-xs text-grey-600">1rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-3xl mx-auto mb-2"></div>
              <p className="text-sm text-grey-700">rounded-3xl</p>
              <p className="text-xs text-grey-600">1.5rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-grey-700">rounded-full</p>
              <p className="text-xs text-grey-600">9999px</p>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Shadows Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border">
              <p className="text-grey-700 font-medium">shadow-sm</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow border">
              <p className="text-grey-700 font-medium">shadow</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md border">
              <p className="text-grey-700 font-medium">shadow-md</p>
            </div>
          </div>
        </section>
      </div>
      
      <Toaster />
    </div>
  );
}
