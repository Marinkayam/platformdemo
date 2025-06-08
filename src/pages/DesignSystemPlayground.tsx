
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
import { InvoiceTabs } from "@/components/invoices/InvoiceTabs"
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown"
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
  Mail
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
    { id: "typography", label: "Utility Text" },
  ]

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
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Buttons</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Interactive elements for user actions</Typography>
              </div>

              {/* Button Variants */}
              <div className="space-y-6">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Button Variants</Typography>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="destructive">Destructive Button</Button>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Button Sizes</Typography>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Button Groups</Typography>
                  <div className="space-y-4">
                    {/* Primary + Secondary Group */}
                    <div className="flex gap-2">
                      <Button variant="default">Primary Action</Button>
                      <Button variant="secondary">Secondary Action</Button>
                    </div>

                    {/* Radio Button Selection */}
                    <div className="space-y-3">
                      <Typography variant="subtitle2" className="text-grey-800">Radio Selection</Typography>
                      <RadioGroup value={radioValue} onValueChange={setRadioValue} className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option1" id="option1" />
                          <Label htmlFor="option1">Option 1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option2" id="option2" />
                          <Label htmlFor="option2">Option 2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option3" id="option3" />
                          <Label htmlFor="option3">Option 3</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Multi-Selection */}
                    <div className="space-y-3">
                      <Typography variant="subtitle2" className="text-grey-800">Multi-Selection</Typography>
                      <div className="flex gap-6">
                        {["Filter 1", "Filter 2", "Filter 3"].map((filter) => (
                          <div key={filter} className="flex items-center space-x-2">
                            <Checkbox 
                              id={filter}
                              checked={multiSelect.includes(filter)}
                              onCheckedChange={() => toggleMultiSelect(filter)}
                            />
                            <Label htmlFor={filter}>{filter}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Badges Section */}
          {activeTab === "badges" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Badges</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Status indicators and labels</Typography>
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Badge Variants</Typography>
                  <div className="flex flex-wrap gap-4">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Status Badges</Typography>
                  <div className="flex flex-wrap gap-4">
                    <Badge className="bg-success-main text-success-contrast-text">Approved</Badge>
                    <Badge className="bg-warning-main text-warning-contrast-text">Pending</Badge>
                    <Badge className="bg-error-main text-error-contrast-text">Rejected</Badge>
                    <Badge className="bg-info-main text-info-contrast-text">In Review</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Elements Section */}
          {activeTab === "forms" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Form Elements</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Input fields and form controls with improved focus styles</Typography>
              </div>

              <div className="space-y-6 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="text-input">Text Input</Label>
                  <Input 
                    id="text-input" 
                    type="text" 
                    placeholder="Enter text here..." 
                    className="focus:ring-2 focus:ring-primary-main focus:ring-offset-2 focus:border-primary-main"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email-input">Email Input</Label>
                  <Input 
                    id="email-input" 
                    type="email" 
                    placeholder="Enter email..." 
                    className="focus:ring-2 focus:ring-primary-main focus:ring-offset-2 focus:border-primary-main"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password-input">Password Input</Label>
                  <Input 
                    id="password-input" 
                    type="password" 
                    placeholder="Enter password..." 
                    className="focus:ring-2 focus:ring-primary-main focus:ring-offset-2 focus:border-primary-main"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea">Textarea</Label>
                  <Textarea 
                    id="textarea" 
                    placeholder="Enter multi-line text here..." 
                    className="focus:ring-2 focus:ring-primary-main focus:ring-offset-2 focus:border-primary-main"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="select-input">Select Input</Label>
                  <Select>
                    <SelectTrigger className="focus:ring-2 focus:ring-primary-main focus:ring-offset-2 focus:border-primary-main">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-background-paper border border-grey-300 shadow-lg z-50">
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
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Dropdowns</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Dropdown menus and selectors</Typography>
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
                    <DropdownMenuContent className="bg-background-paper border border-grey-300 shadow-lg z-50">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                      <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Filter Dropdown</Typography>
                  <FilterDropdown
                    label="Status"
                    options={[
                      { value: "pending", label: "Pending" },
                      { value: "approved", label: "Approved" },
                      { value: "rejected", label: "Rejected" }
                    ]}
                    selectedValues={[]}
                    onSelectionChange={() => {}}
                    placeholder="Select status..."
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
                    <DropdownMenuContent className="bg-background-paper border border-grey-300 shadow-lg z-50">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-error-main">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          )}

          {/* Toggles Section */}
          {activeTab === "toggles" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Toggles</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Switch controls for binary states</Typography>
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
                      <Label htmlFor="switch-on">Enabled (On)</Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch id="switch-off" checked={false} onCheckedChange={() => {}} />
                      <Label htmlFor="switch-off">Disabled (Off)</Label>
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
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Tab Navigation</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Navigation tabs with counts and active states</Typography>
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Invoice List Tabs</Typography>
                  <InvoiceTabs />
                </div>

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
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Grid Layout Examples</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Responsive grid layouts with gap spacing</Typography>
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

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Four Column Grid</Typography>
                  <Typography variant="body2" className="text-grey-600 mb-3">Gap: 6 (1.5rem / 24px)</Typography>
                  <div className="grid grid-cols-4 gap-6">
                    <div className="bg-warning-lighter p-4 rounded-lg">
                      <Typography variant="body2" className="text-warning-contrast-text">Item 1</Typography>
                    </div>
                    <div className="bg-warning-lighter p-4 rounded-lg">
                      <Typography variant="body2" className="text-warning-contrast-text">Item 2</Typography>
                    </div>
                    <div className="bg-warning-lighter p-4 rounded-lg">
                      <Typography variant="body2" className="text-warning-contrast-text">Item 3</Typography>
                    </div>
                    <div className="bg-warning-lighter p-4 rounded-lg">
                      <Typography variant="body2" className="text-warning-contrast-text">Item 4</Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cards & Padding Section */}
          {activeTab === "cards" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Cards & Padding</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Card layouts with visual padding examples</Typography>
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Padding Examples</Typography>
                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="bg-grey-200 bg-opacity-30">
                        <CardTitle className="text-sm">Small Padding (p-2)</CardTitle>
                        <CardDescription>8px padding</CardDescription>
                      </CardHeader>
                      <CardContent className="p-2 bg-primary-lighter bg-opacity-20">
                        <Typography variant="body2">Content with small padding</Typography>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="bg-grey-200 bg-opacity-30">
                        <CardTitle className="text-sm">Medium Padding (p-4)</CardTitle>
                        <CardDescription>16px padding</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 bg-primary-lighter bg-opacity-20">
                        <Typography variant="body2">Content with medium padding</Typography>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="bg-grey-200 bg-opacity-30">
                        <CardTitle className="text-sm">Large Padding (p-6)</CardTitle>
                        <CardDescription>24px padding</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 bg-primary-lighter bg-opacity-20">
                        <Typography variant="body2">Content with large padding</Typography>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="bg-grey-200 bg-opacity-30">
                        <CardTitle className="text-sm">Extra Large Padding (p-8)</CardTitle>
                        <CardDescription>32px padding</CardDescription>
                      </CardHeader>
                      <CardContent className="p-8 bg-primary-lighter bg-opacity-20">
                        <Typography variant="body2">Content with extra large padding</Typography>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Spacing System Section */}
          {activeTab === "spacing" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Spacing System</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Design system spacing tokens and values</Typography>
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Spacing Scale</Typography>
                  <div className="space-y-3">
                    {[
                      { token: "space-1", value: "4px", class: "p-1" },
                      { token: "space-2", value: "8px", class: "p-2" },
                      { token: "space-3", value: "12px", class: "p-3" },
                      { token: "space-4", value: "16px", class: "p-4" },
                      { token: "space-6", value: "24px", class: "p-6" },
                      { token: "space-8", value: "32px", class: "p-8" },
                      { token: "space-12", value: "48px", class: "p-12" },
                      { token: "space-16", value: "64px", class: "p-16" },
                    ].map((spacing) => (
                      <div key={spacing.token} className="flex items-center gap-4">
                        <div className="w-24 text-sm font-mono text-grey-600">{spacing.token}</div>
                        <div className="w-16 text-sm text-grey-600">{spacing.value}</div>
                        <div className="bg-primary-lighter border border-primary-main">
                          <div className={`bg-primary-main ${spacing.class}`}>
                            <div className="bg-background-paper text-xs text-grey-800 p-1">Content</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table System Section */}
          {activeTab === "tables" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Table System</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Data tables with proper styling and interactions</Typography>
              </div>

              <div className="space-y-6">
                <div className="border border-grey-300 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-grey-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-grey-800">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-grey-800">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-grey-800">Amount</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-grey-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-background-paper divide-y divide-grey-300">
                      <tr className="hover:bg-grey-200 transition-colors">
                        <td className="px-4 py-3 text-sm text-grey-900">Invoice #001</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-success-main text-success-contrast-text">Approved</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-grey-900">$1,234.56</td>
                        <td className="px-4 py-3 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-background-paper border border-grey-300 shadow-lg z-50">
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-error-main">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                      <tr className="hover:bg-grey-200 transition-colors">
                        <td className="px-4 py-3 text-sm text-grey-900">Invoice #002</td>
                        <td className="px-4 py-3">
                          <Badge className="bg-warning-main text-warning-contrast-text">Pending</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm text-grey-900">$2,567.89</td>
                        <td className="px-4 py-3 text-center">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-background-paper border border-grey-300 shadow-lg z-50">
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem className="text-error-main">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Layout Components Section */}
          {activeTab === "layouts" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Layout Components</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Structural layout elements</Typography>
              </div>

              <div className="space-y-8">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Page Header</Typography>
                  <div className="bg-background-paper border border-grey-300 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm">
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                          <Typography variant="h3" className="text-grey-900">Page Title</Typography>
                          <Typography variant="body2" className="text-grey-600">Subtitle or description</Typography>
                        </div>
                      </div>
                      <Button>
                        <Download className="h-4 w-4 mr-2" />
                        Action
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Resizable Panel Group</Typography>
                  <div className="h-64 border border-grey-300 rounded-lg overflow-hidden">
                    <ResizablePanelGroup direction="horizontal">
                      <ResizablePanel defaultSize={30} minSize={20}>
                        <div className="p-4 h-full bg-primary-lighter">
                          <Typography variant="body2" className="text-primary-dark">Left Panel</Typography>
                        </div>
                      </ResizablePanel>
                      <ResizableHandle />
                      <ResizablePanel defaultSize={70} minSize={30}>
                        <div className="p-4 h-full bg-info-lighter">
                          <Typography variant="body2" className="text-info-dark">Right Panel</Typography>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Sticky Footer / Action Bar</Typography>
                  <div className="bg-background-paper border border-grey-300 rounded-lg overflow-hidden">
                    <div className="p-6 h-32 bg-grey-200">
                      <Typography variant="body1" className="text-grey-700">Main content area</Typography>
                    </div>
                    <div className="border-t border-grey-300 p-4 bg-background-paper sticky bottom-0">
                      <div className="flex justify-end gap-3">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Alerts Section */}
          {activeTab === "alerts" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Alerts</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Alert messages and notifications</Typography>
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Alert Variants</Typography>
                  <div className="space-y-4">
                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertTitle>Information</AlertTitle>
                      <AlertDescription>
                        This is an informational alert message.
                      </AlertDescription>
                    </Alert>

                    <Alert className="border-success-main bg-success-lighter">
                      <CheckCircle className="h-4 w-4 text-success-dark" />
                      <AlertTitle className="text-success-dark">Success</AlertTitle>
                      <AlertDescription className="text-success-dark">
                        Your action was completed successfully.
                      </AlertDescription>
                    </Alert>

                    <Alert className="border-warning-main bg-warning-lighter">
                      <AlertTriangle className="h-4 w-4 text-warning-contrast-text" />
                      <AlertTitle className="text-warning-contrast-text">Warning</AlertTitle>
                      <AlertDescription className="text-warning-contrast-text">
                        Please review this information carefully.
                      </AlertDescription>
                    </Alert>

                    <Alert className="border-error-main bg-error-lighter">
                      <AlertCircle className="h-4 w-4 text-error-dark" />
                      <AlertTitle className="text-error-dark">Error</AlertTitle>
                      <AlertDescription className="text-error-dark">
                        An error occurred. Please try again.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Dismissable Alert</Typography>
                  <Alert className="border-info-main bg-info-lighter">
                    <Info className="h-4 w-4 text-info-dark" />
                    <AlertTitle className="text-info-dark">Dismissable Alert</AlertTitle>
                    <AlertDescription className="text-info-dark">
                      This alert can be dismissed by the user.
                    </AlertDescription>
                    <Button variant="ghost" size="sm" className="absolute top-2 right-2 h-6 w-6 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </Alert>
                </div>
              </div>
            </div>
          )}

          {/* Toast Notifications Section */}
          {activeTab === "toasts" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Toast Notifications</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Temporary notification messages</Typography>
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
                  <Typography variant="h4" className="text-grey-800 mb-4">Toast Examples</Typography>
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
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Indicators Section */}
          {activeTab === "progress" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Progress Indicators</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Progress bars and loading states</Typography>
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Progress Bars</Typography>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <Typography variant="body2" className="text-grey-700 mb-2">25% Complete</Typography>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <Typography variant="body2" className="text-grey-700 mb-2">50% Complete</Typography>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div>
                      <Typography variant="body2" className="text-grey-700 mb-2">75% Complete</Typography>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <Typography variant="body2" className="text-grey-700 mb-2">100% Complete</Typography>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Breadcrumbs Section */}
          {activeTab === "breadcrumbs" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Breadcrumbs</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Navigation breadcrumbs showing page hierarchy</Typography>
              </div>

              <div className="space-y-6">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Breadcrumb Examples</Typography>
                  <div className="space-y-4">
                    <div>
                      <Typography variant="body2" className="text-grey-600 mb-2">2-level breadcrumb</Typography>
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="flex items-center gap-1">
                              <Home className="h-4 w-4" />
                              Home
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4" />
                          </BreadcrumbSeparator>
                          <BreadcrumbItem>
                            <BreadcrumbPage>Current Page</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>

                    <div>
                      <Typography variant="body2" className="text-grey-600 mb-2">3-level breadcrumb</Typography>
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="flex items-center gap-1">
                              <Home className="h-4 w-4" />
                              Home
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4" />
                          </BreadcrumbSeparator>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/invoices">Invoices</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4" />
                          </BreadcrumbSeparator>
                          <BreadcrumbItem>
                            <BreadcrumbPage>Invoice Detail</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>

                    <div>
                      <Typography variant="body2" className="text-grey-600 mb-2">4-level breadcrumb</Typography>
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="flex items-center gap-1">
                              <Home className="h-4 w-4" />
                              Home
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4" />
                          </BreadcrumbSeparator>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/smart-connections">Smart Connections</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4" />
                          </BreadcrumbSeparator>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/smart-connections/add-agent">Add Agent</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4" />
                          </BreadcrumbSeparator>
                          <BreadcrumbItem>
                            <BreadcrumbPage>User Type Selection</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Typography Section */}
          {activeTab === "typography" && (
            <div className="space-y-8">
              <div>
                <Typography variant="h2" className="text-grey-900 mb-4">Utility Text</Typography>
                <Typography variant="body1" className="text-grey-700 mb-6">Typography system with various styles and utilities</Typography>
              </div>

              <div className="space-y-8">
                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Font Weights</Typography>
                  <div className="space-y-2">
                    <Typography variant="body1" className="font-light text-grey-700">Light text (font-weight: 300)</Typography>
                    <Typography variant="body1" className="font-normal text-grey-700">Normal text (font-weight: 400)</Typography>
                    <Typography variant="body1" className="font-medium text-grey-700">Medium text (font-weight: 500)</Typography>
                    <Typography variant="body1" className="font-semibold text-grey-700">Semibold text (font-weight: 600)</Typography>
                    <Typography variant="body1" className="font-bold text-grey-700">Bold text (font-weight: 700)</Typography>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Text Sizes</Typography>
                  <div className="space-y-2">
                    <div className="text-xs text-grey-700">Extra small text (text-xs)</div>
                    <div className="text-sm text-grey-700">Small text (text-sm)</div>
                    <div className="text-base text-grey-700">Base text (text-base)</div>
                    <div className="text-lg text-grey-700">Large text (text-lg)</div>
                    <div className="text-xl text-grey-700">Extra large text (text-xl)</div>
                    <div className="text-2xl text-grey-700">2X large text (text-2xl)</div>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Text Colors</Typography>
                  <div className="space-y-2">
                    <div className="text-grey-900">Primary text (grey-900)</div>
                    <div className="text-grey-800">Secondary text (grey-800)</div>
                    <div className="text-grey-700">Body text (grey-700)</div>
                    <div className="text-grey-600">Muted text (grey-600)</div>
                    <div className="text-grey-500">Subtle text (grey-500)</div>
                    <div className="text-primary-main">Primary color text (primary-main)</div>
                    <div className="text-success-main">Success color text (success-main)</div>
                    <div className="text-warning-main">Warning color text (warning-main)</div>
                    <div className="text-error-main">Error color text (error-main)</div>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Text Alignment</Typography>
                  <div className="space-y-2">
                    <div className="text-left text-grey-700">Left aligned text</div>
                    <div className="text-center text-grey-700">Center aligned text</div>
                    <div className="text-right text-grey-700">Right aligned text</div>
                    <div className="text-justify text-grey-700">Justified text that spans multiple lines to demonstrate how text justification works across longer content blocks.</div>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Text Decoration</Typography>
                  <div className="space-y-2">
                    <div className="underline text-grey-700">Underlined text</div>
                    <div className="line-through text-grey-700">Strikethrough text</div>
                    <div className="no-underline text-primary-main">Link without underline</div>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Line Heights</Typography>
                  <div className="space-y-4">
                    <div className="leading-tight text-grey-700">
                      Tight line height (leading-tight). This text demonstrates how tight line spacing affects readability when text wraps to multiple lines in a paragraph.
                    </div>
                    <div className="leading-normal text-grey-700">
                      Normal line height (leading-normal). This text demonstrates how normal line spacing affects readability when text wraps to multiple lines in a paragraph.
                    </div>
                    <div className="leading-relaxed text-grey-700">
                      Relaxed line height (leading-relaxed). This text demonstrates how relaxed line spacing affects readability when text wraps to multiple lines in a paragraph.
                    </div>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Text Truncation</Typography>
                  <div className="space-y-2">
                    <div className="truncate text-grey-700 max-w-xs">
                      This is a very long text that will be truncated when it exceeds the maximum width
                    </div>
                    <div className="text-ellipsis overflow-hidden text-grey-700 max-w-xs">
                      This text shows ellipsis when it overflows the container
                    </div>
                  </div>
                </div>

                <div>
                  <Typography variant="h4" className="text-grey-800 mb-4">Letter Spacing</Typography>
                  <div className="space-y-2">
                    <div className="tracking-tight text-grey-700">Tight letter spacing</div>
                    <div className="tracking-normal text-grey-700">Normal letter spacing</div>
                    <div className="tracking-wide text-grey-700">Wide letter spacing</div>
                    <div className="tracking-wider text-grey-700">Wider letter spacing</div>
                    <div className="tracking-widest text-grey-700">Widest letter spacing</div>
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
