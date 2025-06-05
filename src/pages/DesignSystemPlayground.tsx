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
      <div className="bg-background-paper rounded-lg p-8 shadow-md">
        <h1 className="text-5xl font-medium mb-2 text-grey-900 font-sans">Design System Playground</h1>
        <p className="text-lg text-grey-600 mb-8 font-sans">Exploring Monto's Design Tokens</p>
        
        {/* Buttons Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Buttons</h2>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-grey-700 font-sans">Button Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text font-medium">Default</Button>
              <Button variant="secondary" className="bg-secondary-lighter text-grey-800 hover:bg-grey-300 font-medium">Secondary</Button>
              <Button variant="destructive" className="bg-error-main hover:bg-error-dark text-error-contrast-text font-medium">Destructive</Button>
              <Button variant="outline" className="border-primary-main text-primary-main hover:bg-primary-main hover:text-primary-contrast-text font-medium">Outline</Button>
              <Button variant="ghost" className="text-primary-main hover:bg-primary-lighter font-medium">Ghost</Button>
              <Button variant="link" className="text-primary-main underline-offset-4 hover:underline font-medium">Link</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-grey-700 font-sans">Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text font-medium">Small</Button>
              <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text font-medium">Default</Button>
              <Button size="lg" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text font-medium">Large</Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-grey-700 font-sans">Button States</h3>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text font-medium">Normal</Button>
              <Button disabled className="bg-grey-400 text-grey-600 cursor-not-allowed font-medium">Disabled</Button>
              <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text font-medium">
                <Download className="mr-2 h-4 w-4" />
                With Icon
              </Button>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Inputs Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Inputs</h2>
          <p className="text-base text-grey-600 font-sans">Form Input Components</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans font-medium">Basic Input</Label>
              <Input placeholder="Enter text..." className="border-grey-400 focus-visible:ring-0 focus-visible:border-primary-main bg-background-paper" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans font-medium">Labeled Input</Label>
              <Input placeholder="With label" className="border-grey-400 focus-visible:ring-0 focus-visible:border-primary-main bg-background-paper" />
            </div>
            
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans font-medium">With Helper Text</Label>
              <Input placeholder="Type something" className="border-grey-400 focus-visible:ring-0 focus-visible:border-primary-main bg-background-paper" />
              <p className="text-sm text-grey-500 font-sans">This is some helpful text</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans font-medium">Error State</Label>
              <Input placeholder="Error input" className="border-error-main focus-visible:ring-0 focus-visible:border-error-main bg-background-paper" />
              <p className="text-sm text-error-main font-sans">This field has an error</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans font-medium">Password Input</Label>
              <Input type="password" placeholder="Enter password" className="border-grey-400 focus-visible:ring-0 focus-visible:border-primary-main bg-background-paper" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-grey-700 font-sans">Text Areas</h3>
            <div className="space-y-2">
              <Label className="text-grey-700 font-sans font-medium">Basic Textarea</Label>
              <Textarea placeholder="Enter multiline text here..." className="border-grey-400 focus-visible:ring-0 focus-visible:border-primary-main bg-background-paper" />
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Typography Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-6xl font-medium text-grey-900 font-sans">Heading 1</h1>
            <h2 className="text-5xl font-medium text-grey-900 font-sans">Heading 2</h2>
            <h3 className="text-3xl font-medium text-grey-900 font-sans">Heading 3</h3>
            <h4 className="text-2xl font-medium text-grey-900 font-sans">Heading 4</h4>
            <h5 className="text-xl font-semibold text-grey-900 font-sans">Heading 5</h5>
            <h6 className="text-lg font-medium text-grey-900 font-sans">Heading 6</h6>
            <p className="text-base font-semibold text-grey-800 font-sans">Subtitle1</p>
            <p className="text-sm font-normal text-grey-700 font-sans">Subtitle2</p>
            <p className="text-base font-normal text-grey-800 font-sans">Body1 - Main text for content</p>
            <p className="text-sm font-normal text-grey-700 font-sans">Body2 - Secondary text</p>
            <p className="text-sm font-light text-grey-600 font-sans">Body3 - Light text for subtle information</p>
            <p className="text-xs font-normal text-grey-600 font-sans">Caption text for images and meta info</p>
            <p className="text-overline font-medium text-grey-800 font-sans uppercase tracking-wide">OVERLINE TEXT FOR LABELS</p>
            <p className="text-xs font-medium text-grey-800 font-sans uppercase">BUTTON TEXT</p>
            <p className="text-small-text font-normal text-grey-600 font-sans">Small text for fine print</p>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Checkboxes Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Checkboxes</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="basic" 
                checked={basicCheckbox}
                onCheckedChange={(checked) => setBasicCheckbox(checked === true)}
                className="border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main data-[state=checked]:text-primary-contrast-text"
              />
              <Label htmlFor="basic" className="text-grey-700 font-sans font-normal">Basic Checkbox</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="checked" 
                checked={checkedCheckbox}
                onCheckedChange={(checked) => setCheckedCheckbox(checked === true)}
                className="border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main data-[state=checked]:text-primary-contrast-text"
              />
              <Label htmlFor="checked" className="text-grey-700 font-sans font-normal">Checked Checkbox</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="required" 
                checked={requiredCheckbox}
                onCheckedChange={(checked) => setRequiredCheckbox(checked === true)}
                className="border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main data-[state=checked]:text-primary-contrast-text"
              />
              <Label htmlFor="required" className="text-grey-700 font-sans font-normal">Required Checkbox</Label>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-grey-700 font-sans">Sizes</h3>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Checkbox className="h-3 w-3 border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main rounded-xs" />
                <Label className="text-sm text-grey-700 font-sans">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-4 w-4 border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main" />
                <Label className="text-grey-700 font-sans">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox className="h-5 w-5 border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main" />
                <Label className="text-lg text-grey-700 font-sans">Large</Label>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Radio Buttons Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Radio Buttons</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-grey-700 font-sans">Basic Radio Group</h3>
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

            <h3 className="text-xl font-semibold text-grey-700 font-sans">Horizontal Radio Group</h3>
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

            <h3 className="text-xl font-semibold text-grey-700 font-sans">Radio Button Variants</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-base font-medium text-grey-700 font-sans">Size Variants</p>
                <div className="flex items-center space-x-6">
                  <RadioGroup defaultValue="small-demo" className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small-demo" className="h-3 w-3 border-grey-400 text-primary-main" />
                      <Label className="text-sm text-grey-700 font-sans">Small</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default-demo" className="h-4 w-4 border-grey-400 text-primary-main" />
                      <Label className="text-grey-700 font-sans">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large-demo" className="h-5 w-5 border-grey-400 text-primary-main" />
                      <Label className="text-lg text-grey-700 font-sans">Large</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Toggles & Switches Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Toggles & Switches</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg border-grey-300 bg-background-paper">
              <div>
                <Label className="text-grey-700 font-sans font-medium">Notifications</Label>
                <p className="text-sm text-grey-600 font-sans">Receive email notifications</p>
              </div>
              <Switch 
                checked={switchChecked}
                onCheckedChange={setSwitchChecked}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg border-grey-300 bg-background-paper">
              <div>
                <Label className="text-grey-700 font-sans font-medium">Dark Mode</Label>
                <p className="text-sm text-grey-600 font-sans">Toggle dark theme</p>
              </div>
              <Switch 
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg border-grey-300 bg-background-paper">
              <div>
                <Label className="text-grey-700 font-sans font-medium">Auto Save</Label>
                <p className="text-sm text-grey-600 font-sans">Automatically save changes</p>
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
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Chips & Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-primary-main text-primary-contrast-text font-medium">Default</Badge>
            <Badge variant="secondary" className="bg-secondary-lighter text-grey-800 font-medium">Secondary</Badge>
            <Badge variant="outline" className="border-grey-400 text-grey-700 font-medium">Outlined</Badge>
            <Badge className="bg-success-main text-success-contrast-text font-medium">Success</Badge>
            <Badge className="bg-warning-main text-warning-contrast-text font-medium">Warning</Badge>
            <Badge className="bg-error-main text-error-contrast-text font-medium">Error</Badge>
            <Badge className="bg-primary-main text-primary-contrast-text font-medium">
              Deletable
              <X className="ml-1 h-3 w-3" />
            </Badge>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Status Badges Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Status Badges</h2>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-grey-700 font-sans">Connection Status</h3>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-success-main text-success-contrast-text font-medium">
                <CheckCircle className="mr-1 h-3 w-3" />
                Connected
              </Badge>
              <Badge className="bg-error-main text-error-contrast-text font-medium">
                <X className="mr-1 h-3 w-3" />
                Disconnected
              </Badge>
              <Badge className="bg-warning-main text-warning-contrast-text font-medium">
                <AlertTriangle className="mr-1 h-3 w-3" />
                Warning
              </Badge>
              <Badge className="bg-info-main text-info-contrast-text font-medium">
                <Info className="mr-1 h-3 w-3" />
                Processing
              </Badge>
            </div>

            <h3 className="text-xl font-semibold text-grey-700 font-sans">System Status</h3>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-success-main text-success-contrast-text font-medium">Active</Badge>
              <Badge className="bg-grey-500 text-common-white font-medium">Inactive</Badge>
              <Badge className="bg-warning-main text-warning-contrast-text font-medium">Pending</Badge>
              <Badge className="bg-error-main text-error-contrast-text font-medium">Failed</Badge>
              <Badge className="bg-info-main text-info-contrast-text font-medium">In Progress</Badge>
              <Badge className="bg-primary-main text-primary-contrast-text font-medium">Complete</Badge>
            </div>

            <h3 className="text-xl font-semibold text-grey-700 font-sans">Priority Levels</h3>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-error-main text-error-contrast-text font-medium">High Priority</Badge>
              <Badge className="bg-warning-main text-warning-contrast-text font-medium">Medium Priority</Badge>
              <Badge className="bg-success-main text-success-contrast-text font-medium">Low Priority</Badge>
              <Badge className="bg-grey-400 text-grey-800 font-medium">Normal</Badge>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Tooltips Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Tooltips</h2>
          <TooltipProvider>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" className="border-grey-400 text-grey-700 hover:bg-grey-200 font-medium">Hover Me</Button>
                </TooltipTrigger>
                <TooltipContent className="bg-grey-800 text-common-white">
                  <p className="font-sans">Basic tooltip content</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="bg-success-main hover:bg-success-dark text-success-contrast-text font-medium">Success Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent className="bg-success-main text-success-contrast-text">
                  <p className="font-sans">Success message</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="bg-warning-main hover:bg-warning-dark text-warning-contrast-text font-medium">Warning Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent className="bg-warning-main text-warning-contrast-text">
                  <p className="font-sans">Warning message</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="bg-error-main hover:bg-error-dark text-error-contrast-text font-medium">Error Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent className="bg-error-main text-error-contrast-text">
                  <p className="font-sans">Error message</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </section>

        <Separator className="my-8" />

        {/* Cards Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="shadow-sm border-grey-300 bg-background-paper">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium text-grey-900 font-sans">Default Card</CardTitle>
                <p className="text-sm text-grey-600 font-sans">Small size</p>
              </CardHeader>
              <CardContent>
                <p className="text-grey-700 font-sans">Basic card content</p>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-grey-300 bg-background-paper">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium text-grey-900 font-sans">Outlined Card</CardTitle>
                <p className="text-sm text-grey-600 font-sans">Default size</p>
              </CardHeader>
              <CardContent>
                <p className="text-grey-700 font-sans">Card with outline</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg border-grey-300 bg-background-paper">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium text-grey-900 font-sans">Elevated Card</CardTitle>
                <p className="text-sm text-grey-600 font-sans">Large size</p>
              </CardHeader>
              <CardContent>
                <p className="text-grey-700 font-sans">Card with elevation</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Icons Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Icons</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <BadgeCheck className="h-5 w-5 text-primary-main" />
              <span className="text-grey-700 font-sans">Badge Check Icon</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-error-main" />
              <span className="text-grey-700 font-sans">Heart Icon</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-warning-main" />
              <span className="text-grey-700 font-sans">Star Icon</span>
            </div>
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-success-main" />
              <span className="text-grey-700 font-sans">Download Icon</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success-main" />
              <span className="text-grey-700 font-sans">Check Circle Icon</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-warning-main" />
              <span className="text-grey-700 font-sans">Alert Triangle Icon</span>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Loading States Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Loading States</h2>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-grey-700 font-sans">Skeleton Loading</h3>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px] bg-grey-300" />
              <Skeleton className="h-4 w-[200px] bg-grey-300" />
              <Skeleton className="h-4 w-[300px] bg-grey-300" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-grey-700 font-sans">Button Loading States</h3>
            <div className="flex gap-4">
              <Button 
                onClick={() => handleLoadingAction("Save Document")}
                disabled={loading}
                className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text font-medium"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Document
              </Button>
              <Button 
                onClick={() => handleLoadingAction("Upload File")}
                disabled={loading}
                className="bg-success-main hover:bg-success-dark text-success-contrast-text font-medium"
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Upload File
              </Button>
              <Button 
                onClick={() => handleLoadingAction("Process Data")}
                disabled={loading}
                className="bg-info-main hover:bg-info-dark text-info-contrast-text font-medium"
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
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Banners & Alerts</h2>
          <div className="space-y-4">
            <Alert className="border-info-main bg-info-lighter">
              <Info className="h-4 w-4 text-info-main" />
              <div>
                <h4 className="text-info-main font-medium font-sans">Information</h4>
                <p className="text-info-dark font-sans">This is an informational banner to provide helpful context.</p>
              </div>
            </Alert>
            
            <Alert className="border-success-main bg-success-lighter">
              <Check className="h-4 w-4 text-success-main" />
              <div>
                <h4 className="text-success-main font-medium font-sans">Success</h4>
                <p className="text-success-dark font-sans">Your operation completed successfully!</p>
              </div>
            </Alert>
            
            <Alert className="border-warning-main bg-warning-lighter">
              <AlertTriangle className="h-4 w-4 text-warning-main" />
              <div>
                <h4 className="text-warning-main font-medium font-sans">Warning</h4>
                <p className="text-warning-dark font-sans">Please review this important information before proceeding.</p>
              </div>
            </Alert>
            
            <Alert className="border-error-main bg-error-lighter">
              <X className="h-4 w-4 text-error-main" />
              <div>
                <h4 className="text-error-main font-medium font-sans">Error</h4>
                <p className="text-error-dark font-sans">Something went wrong. Please check your input and try again.</p>
              </div>
            </Alert>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Toast Notifications Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Toast Notifications</h2>
          <div className="flex gap-4">
            <Button onClick={() => showSuccessToast("Success!", "Operation completed successfully")} className="bg-success-main hover:bg-success-dark text-success-contrast-text font-medium">
              Show Success Toast
            </Button>
            <Button onClick={() => showErrorToast("Error!", "Something went wrong")} className="bg-error-main hover:bg-error-dark text-error-contrast-text font-medium">
              Show Error Toast
            </Button>
            <Button onClick={() => showInfoToast("Info", "Here's some information")} className="bg-primary-lighter hover:bg-primary-light text-primary-darker font-medium">
              Show Info Toast
            </Button>
            <Button onClick={() => showWarningToast("Warning", "Please be careful")} className="bg-warning-main hover:bg-warning-dark text-warning-contrast-text font-medium">
              Show Warning Toast
            </Button>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Modals & Dialogs Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Modals & Dialogs</h2>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-grey-400 text-grey-700 hover:bg-grey-200 font-medium">Simple Modal</Button>
              </DialogTrigger>
              <DialogContent className="bg-background-paper border-grey-300">
                <DialogHeader>
                  <DialogTitle className="text-grey-900 font-sans font-medium">Simple Modal</DialogTitle>
                  <DialogDescription className="text-grey-600 font-sans">
                    This is a basic modal dialog with some content.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-grey-700 font-sans">Modal content goes here...</p>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-warning-main hover:bg-warning-dark text-warning-contrast-text font-medium">Confirmation Modal</Button>
              </DialogTrigger>
              <DialogContent className="bg-background-paper border-grey-300">
                <DialogHeader>
                  <DialogTitle className="text-grey-900 font-sans font-medium">Confirm Action</DialogTitle>
                  <DialogDescription className="text-grey-600 font-sans">
                    Are you sure you want to proceed with this action?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" className="border-grey-400 text-grey-700 hover:bg-grey-200 font-medium">Cancel</Button>
                  <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text font-medium">Confirm</Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-info-main hover:bg-info-dark text-info-contrast-text font-medium">Info Modal</Button>
              </DialogTrigger>
              <DialogContent className="bg-background-paper border-grey-300">
                <DialogHeader>
                  <DialogTitle className="text-grey-900 font-sans font-medium">Information</DialogTitle>
                  <DialogDescription className="text-grey-600 font-sans">
                    Here's some important information you should know.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-grey-700 font-sans">Detailed information content...</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Color Palette Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-primary-lighter rounded-lg flex items-center justify-center text-grey-900 text-sm font-medium font-sans">primary-lighter</div>
              <p className="text-xs text-grey-600 text-center font-mono">#EFEBFF</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-light rounded-lg flex items-center justify-center text-grey-900 text-sm font-medium font-sans">primary-light</div>
              <p className="text-xs text-grey-600 text-center font-mono">#BEADFF</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-main rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">primary-main</div>
              <p className="text-xs text-grey-600 text-center font-mono">#7B59FF</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-dark rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">primary-dark</div>
              <p className="text-xs text-grey-600 text-center font-mono">#523BAA</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-darker rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">primary-darker</div>
              <p className="text-xs text-grey-600 text-center font-mono">#291E55</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-lighter rounded-lg flex items-center justify-center text-grey-900 text-sm font-medium font-sans">secondary-lighter</div>
              <p className="text-xs text-grey-600 text-center font-mono">#E6E7EB</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-light rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">secondary-light</div>
              <p className="text-xs text-grey-600 text-center font-mono">#6F768B</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-main rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">secondary-main</div>
              <p className="text-xs text-grey-600 text-center font-mono">#1D153B</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-dark rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">secondary-dark</div>
              <p className="text-xs text-grey-600 text-center font-mono">#181231</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-darker rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">secondary-darker</div>
              <p className="text-xs text-grey-600 text-center font-mono">#0A0714</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-0 border border-grey-300 rounded-lg flex items-center justify-center text-grey-900 text-sm font-medium font-sans">grey-0</div>
              <p className="text-xs text-grey-600 text-center font-mono">#FFFFFF</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-100 rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">grey-100</div>
              <p className="text-xs text-grey-600 text-center font-mono">#707C87</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-200 rounded-lg flex items-center justify-center text-grey-900 text-sm font-medium font-sans">grey-200</div>
              <p className="text-xs text-grey-600 text-center font-mono">#F4F6F8</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-300 rounded-lg flex items-center justify-center text-grey-900 text-sm font-medium font-sans">grey-300</div>
              <p className="text-xs text-grey-600 text-center font-mono">#F1F1F3</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-400 rounded-lg flex items-center justify-center text-grey-900 text-sm font-medium font-sans">grey-400</div>
              <p className="text-xs text-grey-600 text-center font-mono">#E6E7EB</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-500 rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">grey-500</div>
              <p className="text-xs text-grey-600 text-center font-mono">#8C94A9</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-600 rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">grey-600</div>
              <p className="text-xs text-grey-600 text-center font-mono">#818799</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-700 rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">grey-700</div>
              <p className="text-xs text-grey-600 text-center font-mono">#586079</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-800 rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">grey-800</div>
              <p className="text-xs text-grey-600 text-center font-mono">#38415F</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-grey-900 rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">grey-900</div>
              <p className="text-xs text-grey-600 text-center font-mono">#061237</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-info-main rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">info-main</div>
              <p className="text-xs text-grey-600 text-center font-mono">#375DFB</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-success-main rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">success-main</div>
              <p className="text-xs text-grey-600 text-center font-mono">#007737</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-warning-main rounded-lg flex items-center justify-center text-grey-900 text-sm font-medium font-sans">warning-main</div>
              <p className="text-xs text-grey-600 text-center font-mono">#F2AE40</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-error-main rounded-lg flex items-center justify-center text-white text-sm font-medium font-sans">error-main</div>
              <p className="text-xs text-grey-600 text-center font-mono">#DF1C41</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-background-default rounded-lg flex items-center justify-center text-grey-900 text-sm font-medium font-sans">background-default</div>
              <p className="text-xs text-grey-600 text-center font-mono">#F4F6F8</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-background-paper border border-grey-300 rounded-lg flex items-center justify-center text-grey-900 text-sm font-medium font-sans">background-paper</div>
              <p className="text-xs text-grey-600 text-center font-mono">#FFFFFF</p>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Spacing Scale Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Spacing Scale</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-primary-main rounded-xs"></div>
              <span className="text-grey-700 font-sans font-medium">p-1</span>
              <span className="text-grey-600 font-mono text-sm">0.25rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-8 bg-primary-main rounded-xs"></div>
              <span className="text-grey-700 font-sans font-medium">p-2</span>
              <span className="text-grey-600 font-mono text-sm">0.5rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-4 h-8 bg-primary-main rounded-xs"></div>
              <span className="text-grey-700 font-sans font-medium">p-4</span>
              <span className="text-grey-600 font-mono text-sm">1rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-6 h-8 bg-primary-main rounded-xs"></div>
              <span className="text-grey-700 font-sans font-medium">p-6</span>
              <span className="text-grey-600 font-mono text-sm">1.5rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary-main rounded-xs"></div>
              <span className="text-grey-700 font-sans font-medium">p-8</span>
              <span className="text-grey-600 font-mono text-sm">2rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-8 bg-primary-main rounded-xs"></div>
              <span className="text-grey-700 font-sans font-medium">p-10</span>
              <span className="text-grey-600 font-mono text-sm">2.5rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-primary-main rounded-xs"></div>
              <span className="text-grey-700 font-sans font-medium">p-12</span>
              <span className="text-grey-600 font-mono text-sm">3rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-8 bg-primary-main rounded-xs"></div>
              <span className="text-grey-700 font-sans font-medium">p-16</span>
              <span className="text-grey-600 font-mono text-sm">4rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-8 bg-primary-main rounded-xs"></div>
              <span className="text-grey-700 font-sans font-medium">p-20</span>
              <span className="text-grey-600 font-mono text-sm">5rem</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-8 bg-primary-main rounded-xs"></div>
              <span className="text-grey-700 font-sans font-medium">p-24</span>
              <span className="text-grey-600 font-mono text-sm">6rem</span>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Border Radius Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-xs mx-auto mb-2"></div>
              <p className="text-sm text-grey-700 font-sans font-medium">rounded-xs</p>
              <p className="text-xs text-grey-600 font-mono">0.125rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-sm mx-auto mb-2"></div>
              <p className="text-sm text-grey-700 font-sans font-medium">rounded-sm</p>
              <p className="text-xs text-grey-600 font-mono">0.25rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded mx-auto mb-2"></div>
              <p className="text-sm text-grey-700 font-sans font-medium">rounded</p>
              <p className="text-xs text-grey-600 font-mono">0.375rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-lg mx-auto mb-2"></div>
              <p className="text-sm text-grey-700 font-sans font-medium">rounded-lg</p>
              <p className="text-xs text-grey-600 font-mono">0.5rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-xl mx-auto mb-2"></div>
              <p className="text-sm text-grey-700 font-sans font-medium">rounded-xl</p>
              <p className="text-xs text-grey-600 font-mono">0.75rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-2xl mx-auto mb-2"></div>
              <p className="text-sm text-grey-700 font-sans font-medium">rounded-2xl</p>
              <p className="text-xs text-grey-600 font-mono">1rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-3xl mx-auto mb-2"></div>
              <p className="text-sm text-grey-700 font-sans font-medium">rounded-3xl</p>
              <p className="text-xs text-grey-600 font-mono">1.5rem</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-main rounded-full mx-auto mb-2"></div>
              <p className="text-sm text-grey-700 font-sans font-medium">rounded-full</p>
              <p className="text-xs text-grey-600 font-mono">9999px</p>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Shadows Section */}
        <section className="space-y-6">
          <h2 className="text-3xl font-medium text-grey-800 font-sans">Shadows</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-background-paper rounded-lg shadow-sm border border-grey-300">
              <p className="text-grey-700 font-medium font-sans">shadow-sm</p>
            </div>
            <div className="p-6 bg-background-paper rounded-lg shadow border border-grey-300">
              <p className="text-grey-700 font-medium font-sans">shadow</p>
            </div>
            <div className="p-6 bg-background-paper rounded-lg shadow-md border border-grey-300">
              <p className="text-grey-700 font-medium font-sans">shadow-md</p>
            </div>
          </div>
        </section>
      </div>
      
      <Toaster />
    </div>
  );
}
