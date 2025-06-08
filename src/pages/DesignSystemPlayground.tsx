import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Typography } from "@/components/ui/typography/typography"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown"
import { ApplyGloballyModal } from "@/components/ui/apply-globally-modal"
import { componentUsageData } from "@/data/componentUsage"
import { useToast } from "@/hooks/use-toast"
import { 
  ChevronDown, 
  MoreVertical, 
  ArrowLeft, 
  Download, 
  Search,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  X,
  Home,
  ChevronRight,
  Settings,
  Users,
  Mail,
  Globe
} from "lucide-react"

export default function DesignSystemPlayground() {
  const [activeTab, setActiveTab] = useState("buttons")
  const [radioValue, setRadioValue] = useState("option1")
  const [multiSelect, setMultiSelect] = useState<string[]>([])
  const [switchValue, setSwitchValue] = useState(false)
  const [dropdownValue, setDropdownValue] = useState("")
  const { toast } = useToast()

  const toggleMultiSelect = (value: string) => {
    setMultiSelect(prev => 
      prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  const showToast = (variant: "default" | "destructive" | "success" | "warning" | "info") => {
    const toastConfig = {
      default: { title: "Default Toast", description: "This is a default notification." },
      destructive: { title: "Error occurred", description: "Something went wrong. Please try again." },
      success: { title: "Success!", description: "Your action was completed successfully." },
      warning: { title: "Warning", description: "Please review before proceeding." },
      info: { title: "Information", description: "Here's some important information for you." }
    }

    toast({
      variant,
      title: toastConfig[variant].title,
      description: toastConfig[variant].description,
    })
  }

  const handleApplyGlobally = (componentType: string, selectedPages: string[]) => {
    console.log(`Applying ${componentType} changes to:`, selectedPages)
    toast({
      variant: "success",
      title: "Changes Applied Successfully",
      description: `${componentType} updates have been applied to ${selectedPages.length} page${selectedPages.length !== 1 ? 's' : ''}.`,
    })
  }

  const sidebarSections = [
    { id: "buttons", label: "Buttons" },
    { id: "badges", label: "Badges" },
    { id: "forms", label: "Form Elements" },
    { id: "dropdowns", label: "Dropdowns" },
    { id: "toggles", label: "Toggles" },
    { id: "tabs", label: "Tab Navigation" },
    { id: "grids", label: "Grid Layout" },
    { id: "cards", label: "Cards & Padding" },
    { id: "spacing", label: "Spacing System" },
    { id: "tables", label: "Table System" },
    { id: "layouts", label: "Layout Components" },
    { id: "alerts", label: "Alerts" },
    { id: "toasts", label: "Toast Notifications" },
    { id: "progress", label: "Progress Indicators" },
    { id: "breadcrumbs", label: "Breadcrumbs" },
    { id: "typography", label: "Typography" },
  ]

  const renderApplyGloballyButton = (componentType: string) => {
    const usageKey = componentType.toLowerCase() as keyof typeof componentUsageData
    const usageData = componentUsageData[usageKey] || []
    
    return (
      <ApplyGloballyModal
        componentType={componentType}
        usageData={usageData}
        onApply={(selectedPages) => handleApplyGlobally(componentType, selectedPages)}
      >
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          Apply Globally
        </Button>
      </ApplyGloballyModal>
    )
  }

  return (
    <div className="min-h-screen bg-background-default">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-background-paper border-r border-grey-300 min-h-screen">
          <div className="p-6 border-b border-grey-300">
            <Typography variant="h3" className="text-grey-900">Design System</Typography>
            <Typography variant="body2" className="text-grey-600 mt-1">Component Library</Typography>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {sidebarSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeTab === section.id
                        ? "bg-primary-lighter text-primary-dark font-medium"
                        : "text-grey-700 hover:bg-grey-200 hover:text-grey-900"
                    }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Buttons Section */}
          {activeTab === "buttons" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Buttons</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Interactive elements for user actions</Typography>
                </div>
                {renderApplyGloballyButton("Button")}
              </div>

              <div className="space-y-4">
                <Button variant="default">Default Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="destructive">Destructive Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="link">Link Button</Button>
              </div>
            </div>
          )}

          {/* Badges Section */}
          {activeTab === "badges" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Badges</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Status indicators and labels</Typography>
                </div>
                {renderApplyGloballyButton("Badge")}
              </div>

              <div className="space-y-4">
                <Badge variant="default">Default Badge</Badge>
                <Badge variant="success">Success Badge</Badge>
                <Badge variant="warning">Warning Badge</Badge>
                <Badge variant="error">Error Badge</Badge>
              </div>
            </div>
          )}

          {/* Form Elements Section */}
          {activeTab === "forms" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Form Elements</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Input fields and form controls with clean focus styles</Typography>
                </div>
                {renderApplyGloballyButton("Form")}
              </div>

              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="text-input">Text Input</Label>
                  <Input 
                    id="text-input" 
                    type="text" 
                    placeholder="Enter text here..." 
                    className="focus:ring-1 focus:ring-primary-main focus:border-primary-main"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-input">Email Input</Label>
                  <Input 
                    id="email-input" 
                    type="email" 
                    placeholder="Enter email..." 
                    className="focus:ring-1 focus:ring-primary-main focus:border-primary-main"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-input">Password Input</Label>
                  <Input 
                    id="password-input" 
                    type="password" 
                    placeholder="Enter password..." 
                    className="focus:ring-1 focus:ring-primary-main focus:border-primary-main"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea">Textarea</Label>
                  <Textarea 
                    id="textarea" 
                    placeholder="Enter multi-line text here..." 
                    className="focus:ring-1 focus:ring-primary-main focus:border-primary-main"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="select-input">Select Input</Label>
                  <Select>
                    <SelectTrigger className="focus:ring-1 focus:ring-primary-main focus:border-primary-main">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Dropdowns Section */}
          {activeTab === "dropdowns" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Dropdowns</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Dropdown menus and selectors</Typography>
                </div>
                {renderApplyGloballyButton("Dropdown")}
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Basic Dropdown Menu</Typography>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        Open Menu <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Filter Dropdown (Single Select)</Typography>
                  <FilterDropdown
                    label="Status"
                    value={dropdownValue || "All"}
                    options={["All", "Pending", "Approved", "Rejected"]}
                    onSelect={(value) => setDropdownValue(typeof value === 'string' ? value : '')}
                    multiSelect={false}
                  />
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Filter Dropdown (Multi Select)</Typography>
                  <FilterDropdown
                    label="Categories"
                    value={multiSelect}
                    options={["Finance", "Operations", "Marketing", "Sales"]}
                    onSelect={(value) => setMultiSelect(Array.isArray(value) ? value : [])}
                    multiSelect={true}
                  />
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Searchable Dropdown</Typography>
                  <FilterDropdown
                    label="Location"
                    value=""
                    options={["New York", "San Francisco", "Los Angeles", "Chicago", "Miami", "Seattle"]}
                    onSelect={() => {}}
                    searchable={true}
                  />
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Action Menu (Table)</Typography>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-error-main">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Radio Group</Typography>
                  <RadioGroup value={radioValue} onValueChange={setRadioValue} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option1" id="radio1" />
                      <Label htmlFor="radio1">Option 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option2" id="radio2" />
                      <Label htmlFor="radio2">Option 2</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option3" id="radio3" />
                      <Label htmlFor="radio3">Option 3</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {/* Toggles Section */}
          {activeTab === "toggles" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Toggles</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Switch controls for binary states</Typography>
                </div>
                {renderApplyGloballyButton("Toggle")}
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Typography variant="h4" className="text-grey-800 mb-4">Basic Switch</Typography>
                  <div className="flex items-center space-x-3">
                    <Switch 
                      id="basic-switch" 
                      checked={switchValue}
                      onCheckedChange={setSwitchValue}
                    />
                    <Label htmlFor="basic-switch">Enable notifications</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h4" className="text-grey-800 mb-4">Switch States</Typography>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Switch id="switch-on" checked={true} onCheckedChange={() => {}} />
                      <Label htmlFor="switch-on">Enabled (ON)</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch id="switch-off" checked={false} onCheckedChange={() => {}} />
                      <Label htmlFor="switch-off">Disabled (OFF)</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch id="switch-disabled" checked={false} disabled />
                      <Label htmlFor="switch-disabled" className="text-grey-500">Disabled State</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation Section */}
          {activeTab === "tabs" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Tab Navigation</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Navigation tabs with counts and active states</Typography>
                </div>
                {renderApplyGloballyButton("Tab")}
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Basic Tabs</Typography>
                  <Tabs defaultValue="tab1" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="tab1">Overview</TabsTrigger>
                      <TabsTrigger value="tab2">Details</TabsTrigger>
                      <TabsTrigger value="tab3">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab1" className="mt-4">
                      <Typography variant="body1">Overview content goes here.</Typography>
                    </TabsContent>
                    <TabsContent value="tab2" className="mt-4">
                      <Typography variant="body1">Details content goes here.</Typography>
                    </TabsContent>
                    <TabsContent value="tab3" className="mt-4">
                      <Typography variant="body1">Settings content goes here.</Typography>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          )}

          {/* Grid Layout Section */}
          {activeTab === "grids" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Grid Layout Examples</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Responsive grid layouts with labeled spacing tokens</Typography>
                </div>
                {renderApplyGloballyButton("Grid")}
              </div>

              <div className="space-y-8">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Single Column Grid</Typography>
                  <Typography variant="body2" className="text-grey-600 mb-3">Gap: 4 (1rem / 16px)</Typography>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-primary-lighter p-4 rounded-lg">
                      <Typography variant="body2" className="text-primary-dark">Single Item</Typography>
                    </div>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Two Column Grid (50/50)</Typography>
                  <Typography variant="body2" className="text-grey-600 mb-3">Gap: 6 (1.5rem / 24px)</Typography>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-info-lighter p-4 rounded-lg">
                      <Typography variant="body2" className="text-info-dark">Item 1</Typography>
                    </div>
                    <div className="bg-info-lighter p-4 rounded-lg">
                      <Typography variant="body2" className="text-info-dark">Item 2</Typography>
                    </div>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Three Column Grid</Typography>
                  <Typography variant="body2" className="text-grey-600 mb-3">Gap: 4 (1rem / 16px)</Typography>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-success-lighter p-4 rounded-lg">
                      <Typography variant="body2" className="text-success-dark">Item 1</Typography>
                    </div>
                    <div className="bg-success-lighter p-4 rounded-lg">
                      <Typography variant="body2" className="text-success-dark">Item 2</Typography>
                    </div>
                    <div className="bg-success-lighter p-4 rounded-lg">
                      <Typography variant="body2" className="text-success-dark">Item 3</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cards Section */}
          {activeTab === "cards" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Cards & Padding</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Flexible card components with padding examples</Typography>
                </div>
                {renderApplyGloballyButton("Card")}
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card description goes here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="body1">This is the main content of the card.</Typography>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline">Action</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}

          {/* Spacing System Section */}
          {activeTab === "spacing" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Spacing System</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Consistent spacing tokens for layout</Typography>
                </div>
                {renderApplyGloballyButton("Spacing")}
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-grey-200">Padding: 4 (1rem / 16px)</div>
                <div className="p-6 bg-grey-300">Padding: 6 (1.5rem / 24px)</div>
                <div className="p-8 bg-grey-400">Padding: 8 (2rem / 32px)</div>
              </div>
            </div>
          )}

          {/* Tables Section */}
          {activeTab === "tables" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Table System</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Responsive tables with headers and data</Typography>
                </div>
                {renderApplyGloballyButton("Table")}
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-grey-300">
                  <thead>
                    <tr>
                      <th className="border-b border-grey-300 p-4 text-left">Header 1</th>
                      <th className="border-b border-grey-300 p-4 text-left">Header 2</th>
                      <th className="border-b border-grey-300 p-4 text-left">Header 3</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b border-grey-300 p-4">Data 1</td>
                      <td className="border-b border-grey-300 p-4">Data 2</td>
                      <td className="border-b border-grey-300 p-4">Data 3</td>
                    </tr>
                    <tr>
                      <td className="border-b border-grey-300 p-4">Data 4</td>
                      <td className="border-b border-grey-300 p-4">Data 5</td>
                      <td className="border-b border-grey-300 p-4">Data 6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Layout Components Section */}
          {activeTab === "layouts" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Layout Components</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Flexible layout components for responsive design</Typography>
                </div>
                {renderApplyGloballyButton("Layout")}
              </div>

              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 p-4 bg-grey-200">Column 1</div>
                  <div className="flex-1 p-4 bg-grey-300">Column 2</div>
                </div>
              </div>
            </div>
          )}

          {/* Alerts Section */}
          {activeTab === "alerts" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Alerts</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Static notification components</Typography>
                </div>
                {renderApplyGloballyButton("Alert")}
              </div>

              <div className="space-y-4">
                <Alert>
                  <AlertTitle>Alert Title</AlertTitle>
                  <AlertDescription>This is an alert description.</AlertDescription>
                </Alert>
              </div>
            </div>
          )}

          {/* Toast Notifications Section */}
          {activeTab === "toasts" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Toast Notifications</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Temporary notification messages</Typography>
                </div>
                {renderApplyGloballyButton("Toast")}
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Toast Variants</Typography>
                  <div className="flex flex-wrap gap-4">
                    <Button onClick={() => showToast("default")}>Show Default Toast</Button>
                    <Button onClick={() => showToast("success")}>Show Success Toast</Button>
                    <Button onClick={() => showToast("warning")}>Show Warning Toast</Button>
                    <Button onClick={() => showToast("info")}>Show Info Toast</Button>
                    <Button onClick={() => showToast("destructive")}>Show Error Toast</Button>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Toast Style Examples</Typography>
                  <div className="space-y-3 max-w-md">
                    <div className="bg-background-paper border border-grey-300 rounded-lg p-4 shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <Typography variant="subtitle2" className="text-grey-900 mb-1">Default Toast</Typography>
                          <Typography variant="body2" className="text-grey-700">This is a default notification.</Typography>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-success-main border border-success-main rounded-lg p-4 shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <Typography variant="subtitle2" className="text-white mb-1">Success!</Typography>
                          <Typography variant="body2" className="text-white">Your action was completed successfully.</Typography>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-white hover:bg-opacity-20">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-error-main border border-error-main rounded-lg p-4 shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <Typography variant="subtitle2" className="text-white mb-1">Error occurred</Typography>
                          <Typography variant="body2" className="text-white">Something went wrong. Please try again.</Typography>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-white hover:bg-opacity-20">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-warning-main border border-warning-main rounded-lg p-4 shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <Typography variant="subtitle2" className="text-warning-contrast-text mb-1">Warning</Typography>
                          <Typography variant="body2" className="text-warning-contrast-text opacity-90">Please review before proceeding.</Typography>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-warning-contrast-text hover:bg-black hover:bg-opacity-20">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-info-main border border-info-main rounded-lg p-4 shadow-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <Typography variant="subtitle2" className="text-white mb-1">Information</Typography>
                          <Typography variant="body2" className="text-white">Here's some important information for you.</Typography>
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-white hover:bg-white hover:bg-opacity-20">
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Indicators Section */}
          {activeTab === "progress" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Progress Indicators</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Visual indicators for ongoing processes</Typography>
                </div>
                {renderApplyGloballyButton("Progress")}
              </div>

              <div className="space-y-4">
                <Progress value={50} />
              </div>
            </div>
          )}

          {/* Breadcrumbs Section */}
          {activeTab === "breadcrumbs" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Breadcrumbs</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Navigation breadcrumbs for user orientation</Typography>
                </div>
                {renderApplyGloballyButton("Breadcrumb")}
              </div>

              <div className="space-y-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Library</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>/</BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Data</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          )}

          {/* Typography Section */}
          {activeTab === "typography" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="h2" className="text-grey-900 mb-4">Typography</Typography>
                  <Typography variant="body1" className="text-grey-700 mb-6">Typography system with weights, sizes, alignment and utilities</Typography>
                </div>
                {renderApplyGloballyButton("Typography")}
              </div>

              <div className="space-y-8">
                {/* Headings */}
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Headings</Typography>
                  <div className="space-y-4">
                    <Typography variant="h1" className="text-grey-900">H1 Heading</Typography>
                    <Typography variant="h2" className="text-grey-900">H2 Heading</Typography>
                    <Typography variant="h3" className="text-grey-900">H3 Heading</Typography>
                    <Typography variant="h4" className="text-grey-900">H4 Heading</Typography>
                    <Typography variant="h5" className="text-grey-900">H5 Heading</Typography>
                    <Typography variant="h6" className="text-grey-900">H6 Heading</Typography>
                  </div>
                </div>

                {/* Body Text */}
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Body Text</Typography>
                  <div className="space-y-3">
                    <Typography variant="subtitle1" className="text-grey-800">Subtitle 1 - Primary subtitles</Typography>
                    <Typography variant="subtitle2" className="text-grey-700">Subtitle 2 - Secondary subtitles</Typography>
                    <Typography variant="body1" className="text-grey-700">Body 1 - Default body text for main content</Typography>
                    <Typography variant="body2" className="text-grey-600">Body 2 - Small body text for secondary content</Typography>
                    <Typography variant="caption" className="text-grey-500">Caption - Image captions and meta information</Typography>
                    <Typography variant="overline" className="text-grey-500">Overline - Category labels</Typography>
                  </div>
                </div>

                {/* Font Weights */}
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Font Weights</Typography>
                  <div className="space-y-3">
                    <div className="text-lg font-light text-grey-700">Light (300) - Subtle emphasis</div>
                    <div className="text-lg font-normal text-grey-700">Normal (400) - Regular body text</div>
                    <div className="text-lg font-medium text-grey-700">Medium (500) - Subtle hierarchy</div>
                    <div className="text-lg font-semibold text-grey-700">Semibold (600) - Strong emphasis</div>
                    <div className="text-lg font-bold text-grey-700">Bold (700) - Maximum emphasis</div>
                  </div>
                </div>

                {/* Font Sizes */}
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Font Sizes</Typography>
                  <div className="space-y-3">
                    <div className="text-xs text-grey-700">Extra Small (12px) - Micro content</div>
                    <div className="text-sm text-grey-700">Small (14px) - Secondary information</div>
                    <div className="text-base text-grey-700">Base (16px) - Default body text</div>
                    <div className="text-lg text-grey-700">Large (18px) - Prominent content</div>
                    <div className="text-xl text-grey-700">Extra Large (20px) - Small headings</div>
                    <div className="text-2xl text-grey-700">2XL (24px) - Section titles</div>
                    <div className="text-3xl text-grey-700">3XL (30px) - Page titles</div>
                  </div>
                </div>

                {/* Line Heights */}
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Line Heights</Typography>
                  <div className="space-y-4">
                    <div className="text-base leading-tight text-grey-700">
                      Tight (1.25) - Compact layouts and headings with reduced vertical space for efficient use.
                    </div>
                    <div className="text-base leading-normal text-grey-700">
                      Normal (1.5) - Default line height for body text providing optimal readability and comfort.
                    </div>
                    <div className="text-base leading-relaxed text-grey-700">
                      Relaxed (1.625) - Improved readability with additional breathing room between lines.
                    </div>
                  </div>
                </div>

                {/* Text Alignment */}
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Text Alignment</Typography>
                  <div className="space-y-3">
                    <div className="text-left text-grey-700">Left aligned text (default)</div>
                    <div className="text-center text-grey-700">Center aligned text</div>
                    <div className="text-right text-grey-700">Right aligned text</div>
                    <div className="text-justify text-grey-700">Justified text that spreads content evenly across the full width of the container for clean edges.</div>
                  </div>
                </div>

                {/* Text Decoration */}
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Text Decoration & Utilities</Typography>
                  <div className="space-y-3">
                    <div className="text-grey-700">Normal text</div>
                    <div className="underline text-grey-700">Underlined text</div>
                    <div className="line-through text-grey-700">Strike-through text</div>
                    <div className="uppercase text-grey-700">Uppercase text</div>
                    <div className="lowercase text-grey-700">LOWERCASE TEXT</div>
                    <div className="capitalize text-grey-700">capitalized text</div>
                  </div>
                </div>

                {/* Text Truncation */}
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Text Truncation</Typography>
                  <div className="space-y-3 max-w-xs">
                    <div className="truncate text-grey-700">
                      This is a very long text that will be truncated with an ellipsis when it exceeds the container width
                    </div>
                    <div className="text-grey-700 break-words">
                      This text will break at word boundaries: superlongwordthatwillbreakappropriately
                    </div>
                  </div>
                </div>

                {/* Letter Spacing */}
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Letter Spacing</Typography>
                  <div className="space-y-3">
                    <div className="tracking-tight text-grey-700">Tight tracking (-0.025em)</div>
                    <div className="tracking-normal text-grey-700">Normal tracking (0em)</div>
                    <div className="tracking-wide text-grey-700">Wide tracking (0.025em)</div>
                    <div className="tracking-wider text-grey-700">Wider tracking (0.05em)</div>
                    <div className="tracking-widest text-grey-700">Widest tracking (0.1em)</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
