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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from "@/lib/toast-helpers";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Check, Info, X, Download, BadgeCheck, Heart, Star, CheckCircle, Loader2, ArrowLeft, Palette, Settings, Users, FileText, Package, MoreVertical, ChevronRight, Home } from "lucide-react";

export default function DesignSystemPlayground() {
  const [basicCheckbox, setBasicCheckbox] = useState(false);
  const [checkedCheckbox, setCheckedCheckbox] = useState(true);
  const [requiredCheckbox, setRequiredCheckbox] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [switchChecked, setSwitchChecked] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(33);

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
                <a href="#dropdowns" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Dropdowns</a>
                <a href="#controls" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Controls</a>
                <a href="#alerts" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Alerts</a>
                <a href="#modals" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Modals</a>
                <a href="#table-rows" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Table Rows</a>
                <a href="#breadcrumbs" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Breadcrumbs</a>
                <a href="#progress" className="block px-3 py-2 text-sm text-grey-700 hover:bg-grey-200 rounded-lg transition-colors">Progress</a>
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
                  <p className="text-base font-bold text-grey-800">Body Bold - Maximum emphasis</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">16px / font-bold</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-base font-semibold text-grey-800">Body Semibold - Strong emphasis</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">16px / font-semibold</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-base font-medium text-grey-800">Body Medium - Medium emphasis</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">16px / font-medium</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-base font-normal text-grey-700">Body Normal - Default content text</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">16px / font-normal</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-base font-light text-grey-700">Body Light - Elegant subtle text</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">16px / font-light</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-sm font-bold text-grey-800">Small Bold - Emphasized secondary</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">14px / font-bold</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-sm font-semibold text-grey-800">Small Semibold - Strong secondary</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">14px / font-semibold</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-sm font-medium text-grey-700">Small Medium - Medium secondary</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">14px / font-medium</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-grey-300 pb-4">
                  <p className="text-sm font-normal text-grey-600">Small Normal - Secondary content</p>
                  <span className="text-sm text-grey-500 font-mono bg-grey-200 px-2 py-1 rounded">14px / font-normal</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-xs font-normal text-grey-500">Caption - Meta information</p>
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
                    <Button variant="destructive" className="bg-error-main hover:bg-error-dark text-white">Destructive</Button>
                    <Button variant="outline" className="border-primary-main text-primary-main hover:bg-primary-main hover:text-primary-contrast-text">Outline</Button>
                    <Button variant="ghost" className="text-primary-main hover:bg-primary-lighter">Ghost</Button>
                    <Button variant="link" className="text-primary-main hover:underline p-0 h-auto">
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
                    <Badge className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">RTP Prepared</Badge>
                    <Badge className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Awaiting SC</Badge>
                    <Badge className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">RTP Sent</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Action Required</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Pending Action</Badge>
                    <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Rejected by Buyer</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Approval Status</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Approved by Buyer</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">External Status</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">External Submission</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Payment Status</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Paid</Badge>
                    <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Settled</Badge>
                    <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Partially Settled</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Other Status</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-grey-100 text-grey-700 border-grey-300 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Excluded</Badge>
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
                    <Badge className="bg-primary-lighter text-primary-dark border-primary-light hover:bg-primary-main hover:text-primary-contrast-text font-normal">Default</Badge>
                    <Badge variant="secondary" className="bg-grey-200 text-grey-700 border-grey-300 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Secondary</Badge>
                    <Badge variant="outline" className="border-grey-400 text-grey-700 bg-background-paper hover:bg-primary-main hover:text-primary-contrast-text font-normal">Outlined</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Semantic Badges</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-success-lighter text-success-dark border-success-light hover:bg-primary-main hover:text-primary-contrast-text font-normal">Success</Badge>
                    <Badge className="bg-warning-lighter text-warning-dark border-warning-light hover:bg-primary-main hover:text-primary-contrast-text font-normal">Warning</Badge>
                    <Badge className="bg-error-lighter text-error-dark border-error-light hover:bg-primary-main hover:text-primary-contrast-text font-normal">Error</Badge>
                    <Badge className="bg-info-lighter text-info-dark border-info-light hover:bg-primary-main hover:text-primary-contrast-text font-normal">Info</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Interactive Chips</h3>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-primary-lighter text-primary-dark border-primary-light cursor-pointer hover:bg-primary-main hover:text-primary-contrast-text font-normal">
                      Clickable
                    </Badge>
                    <Badge className="bg-primary-lighter text-primary-dark border-primary-light cursor-pointer hover:bg-primary-main hover:text-primary-contrast-text font-normal">
                      Deletable
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                    <Badge className="bg-success-lighter text-success-dark border-success-light cursor-pointer hover:bg-primary-main hover:text-primary-contrast-text font-normal">
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

            {/* Dropdowns Section */}
            <section id="dropdowns" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Dropdown Fields</h2>
                <p className="text-grey-600">Select components and dropdown menus</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-grey-800 font-medium">Basic Select</Label>
                  <Select>
                    <SelectTrigger className="border-grey-400 focus:ring-0 focus:border-primary-main bg-background-paper">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-background-paper border border-grey-300 shadow-lg z-50">
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-grey-800 font-medium">With Helper Text</Label>
                  <Select>
                    <SelectTrigger className="border-grey-400 focus:ring-0 focus:border-primary-main bg-background-paper">
                      <SelectValue placeholder="Choose wisely" />
                    </SelectTrigger>
                    <SelectContent className="bg-background-paper border border-grey-300 shadow-lg z-50">
                      <SelectItem value="good">Good Choice</SelectItem>
                      <SelectItem value="better">Better Choice</SelectItem>
                      <SelectItem value="best">Best Choice</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-grey-600">Select the most appropriate option</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-grey-800 font-medium">Dropdown Menu</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-grey-400 text-grey-700 hover:bg-grey-200">
                        Actions
                        <MoreVertical className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background-paper border border-grey-300 shadow-lg z-50">
                      <DropdownMenuItem className="cursor-pointer hover:bg-grey-100">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-grey-100">Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-grey-100 text-error-main">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-2">
                  <Label className="text-grey-800 font-medium">Disabled Select</Label>
                  <Select disabled>
                    <SelectTrigger className="bg-grey-200 border-grey-300 text-grey-500 cursor-not-allowed">
                      <SelectValue placeholder="Disabled select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disabled">Not available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                    <Alert className="border-blue-200 bg-blue-50">
                      <Info className="h-4 w-4 text-blue-700" />
                      <AlertDescription className="text-blue-700">
                        This is an informational alert with important details for the user.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="border-green-200 bg-green-50">
                      <Check className="h-4 w-4 text-green-700" />
                      <AlertDescription className="text-green-700">
                        Operation completed successfully! Your changes have been saved.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertTriangle className="h-4 w-4 text-orange-700" />
                      <AlertDescription className="text-orange-700">
                        Please review your input before proceeding with this action.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="border-red-200 bg-red-50">
                      <X className="h-4 w-4 text-red-700" />
                      <AlertDescription className="text-red-700">
                        An error occurred while processing your request. Please try again.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Filled Alerts</h3>
                  <div className="space-y-4">
                    <Alert className="bg-blue-600 text-white border-0">
                      <Info className="h-4 w-4 text-white" />
                      <AlertDescription className="text-white">
                        High contrast informational alert for maximum visibility.
                      </AlertDescription>
                    </Alert>
                    
                    <Alert className="bg-green-600 text-white border-0">
                      <Check className="h-4 w-4 text-white" />
                      <AlertDescription className="text-white">
                        Bold success message for completed operations.
                      </AlertDescription>
                    </Alert>

                    <Alert className="bg-orange-600 text-white border-0">
                      <AlertTriangle className="h-4 w-4 text-white" />
                      <AlertDescription className="text-white">
                        Important warning message requiring immediate attention.
                      </AlertDescription>
                    </Alert>

                    <Alert className="bg-red-600 text-white border-0">
                      <X className="h-4 w-4 text-white" />
                      <AlertDescription className="text-white">
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
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Modal Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Basic Modal</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-background-paper border border-grey-300 rounded-xl shadow-xl">
                        <DialogHeader>
                          <DialogTitle className="text-grey-900">Basic Modal</DialogTitle>
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

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-warning-main text-warning-main hover:bg-warning-main hover:text-white">Confirmation Modal</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-background-paper border border-warning-main rounded-xl shadow-xl">
                        <DialogHeader>
                          <DialogTitle className="text-warning-main flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Confirm Action
                          </DialogTitle>
                          <DialogDescription className="text-grey-600">
                            Are you sure you want to proceed? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="bg-warning-lighter p-4 rounded-lg border border-warning-light">
                            <p className="text-warning-dark text-sm">
                              This is a warning modal used for confirmations that require user attention.
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button variant="outline" className="border-grey-300 text-grey-700 hover:bg-grey-200">
                            Cancel
                          </Button>
                          <Button className="bg-warning-main hover:bg-warning-dark text-white">
                            Proceed
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-info-main text-info-main hover:bg-info-main hover:text-white">Info Modal</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-background-paper border border-info-main rounded-xl shadow-xl">
                        <DialogHeader>
                          <DialogTitle className="text-info-main flex items-center gap-2">
                            <Info className="h-5 w-5" />
                            Information
                          </DialogTitle>
                          <DialogDescription className="text-grey-600">
                            Here's some important information you should know.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="bg-info-lighter p-4 rounded-lg border border-info-light">
                            <p className="text-info-dark text-sm">
                              This modal provides informational content to help users understand features or processes.
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button className="bg-info-main hover:bg-info-dark text-info-contrast-text">
                            Got it
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
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
                      <div className="grid grid-cols-5 gap-4 text-sm font-medium text-grey-800">
                        <span>Name</span>
                        <span>Status</span>
                        <span>Date</span>
                        <span>Amount</span>
                        <span>Actions</span>
                      </div>
                    </div>
                    
                    <div className="bg-background-paper px-4 py-3 border-b border-grey-300">
                      <div className="grid grid-cols-5 gap-4 text-sm text-grey-700 items-center">
                        <span>Invoice #001</span>
                        <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal w-fit">Paid</Badge>
                        <span>2024-01-15</span>
                        <span>$1,250.00</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background-paper border border-grey-300 shadow-lg z-50">
                            <DropdownMenuItem className="cursor-pointer hover:bg-grey-100">View</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-grey-100">Edit</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-grey-100 text-error-main">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <div className="bg-primary-lighter px-4 py-3 border-b border-grey-300">
                      <div className="grid grid-cols-5 gap-4 text-sm text-grey-700 items-center">
                        <span>Invoice #002</span>
                        <Badge className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal w-fit">RTP Sent</Badge>
                        <span>2024-01-16</span>
                        <span>$2,750.00</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background-paper border border-grey-300 shadow-lg z-50">
                            <DropdownMenuItem className="cursor-pointer hover:bg-grey-100">View</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-grey-100">Edit</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-grey-100 text-error-main">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <div className="bg-background-paper px-4 py-3">
                      <div className="grid grid-cols-5 gap-4 text-sm text-grey-700 items-center">
                        <span>Invoice #003</span>
                        <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal w-fit">Pending Action</Badge>
                        <span>2024-01-17</span>
                        <span>$890.00</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background-paper border border-grey-300 shadow-lg z-50">
                            <DropdownMenuItem className="cursor-pointer hover:bg-grey-100">View</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-grey-100">Edit</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer hover:bg-grey-100 text-error-main">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Breadcrumbs Section */}
            <section id="breadcrumbs" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Breadcrumbs</h2>
                <p className="text-grey-600">Navigation breadcrumb components</p>
              </div>
              
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Basic Breadcrumbs</h3>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                          <Home className="h-4 w-4" />
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4 text-grey-400" />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                          Invoices
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4 text-grey-400" />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-grey-900 font-medium">
                          Invoice #12345
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Complex Navigation</h3>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                          Dashboard
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4 text-grey-400" />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                          Financial Management
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4 text-grey-400" />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                          Real-time Payments
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4 text-grey-400" />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-grey-900 font-medium">
                          Setup Wizard
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
            </section>

            {/* Progress Indicators Section */}
            <section id="progress" className="bg-background-paper rounded-xl border border-grey-300 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-grey-900 mb-2">Progress Indicators</h2>
                <p className="text-grey-600">Progress bars and loading indicators</p>
              </div>
              
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Progress Bars</h3>
                  <div className="space-y-6">
                    <div>
                      <Label className="text-grey-700 mb-2 block">Upload Progress - 33%</Label>
                      <Progress value={33} className="h-2 bg-grey-200" />
                    </div>
                    
                    <div>
                      <Label className="text-grey-700 mb-2 block">Processing - 66%</Label>
                      <Progress value={66} className="h-3 bg-grey-200" />
                    </div>
                    
                    <div>
                      <Label className="text-grey-700 mb-2 block">Complete - 100%</Label>
                      <Progress value={100} className="h-4 bg-grey-200" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Step Indicators</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-main text-primary-contrast-text flex items-center justify-center text-sm font-medium">
                        1
                      </div>
                      <span className="ml-2 text-sm text-grey-700">Setup</span>
                    </div>
                    <div className="h-px bg-primary-main flex-1"></div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-main text-primary-contrast-text flex items-center justify-center text-sm font-medium">
                        2
                      </div>
                      <span className="ml-2 text-sm text-grey-700">Configure</span>
                    </div>
                    <div className="h-px bg-grey-300 flex-1"></div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-grey-300 text-grey-600 flex items-center justify-center text-sm font-medium">
                        3
                      </div>
                      <span className="ml-2 text-sm text-grey-500">Review</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-grey-800 mb-4">Loading States</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="h-5 w-5 animate-spin text-primary-main" />
                      <span className="text-grey-700">Loading content...</span>
                    </div>
                    
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-full bg-grey-200" />
                      <Skeleton className="h-4 w-3/4 bg-grey-200" />
                      <Skeleton className="h-4 w-1/2 bg-grey-200" />
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
                <p className="text-grey-600">Enhanced notification components with status badge styling</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => showSuccessToast("Success!", "Operation completed successfully")} className="bg-green-600 hover:bg-green-700 text-white">
                  <Check className="mr-2 h-4 w-4" />
                  Success Toast
                </Button>
                <Button onClick={() => showErrorToast("Error!", "Something went wrong")} className="bg-red-600 hover:bg-red-700 text-white">
                  <X className="mr-2 h-4 w-4" />
                  Error Toast
                </Button>
                <Button onClick={() => showInfoToast("Info", "Here's some information")} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Info className="mr-2 h-4 w-4" />
                  Info Toast
                </Button>
                <Button onClick={() => showWarningToast("Warning", "Please be careful")} className="bg-orange-600 hover:bg-orange-700 text-white">
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
