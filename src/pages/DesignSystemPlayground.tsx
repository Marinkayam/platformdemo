import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Typography } from "@/components/ui/typography/typography";
import { DesignTabs } from "@/components/ui/design-tabs";
import { ApplyGloballyModal } from "@/components/ui/apply-globally-modal";
import { componentUsageData } from "@/data/componentUsage";
import { MontoLogo } from "@/components/MontoLogo";
import { MontoIcon } from "@/components/MontoIcon";
import { 
  AlertCircle, 
  Check, 
  ChevronRight, 
  Download, 
  FileText, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Settings, 
  Trash, 
  Upload, 
  X 
} from "lucide-react";

const DesignSystemPlayground = () => {
  const [activeTab, setActiveTab] = useState("buttons");
  const [activeDesignTab, setActiveDesignTab] = useState("all");
  const [progress, setProgress] = useState(45);

  const designTabs = [
    { id: "all", label: "All Components" },
    { id: "inputs", label: "Inputs", count: 6 },
    { id: "feedback", label: "Feedback", count: 4 },
    { id: "navigation", label: "Navigation", count: 5 },
    { id: "surfaces", label: "Surfaces", count: 3 },
    { id: "data", label: "Data Display", count: 7 },
  ];

  // Simulate progress bar animation
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-8">
        <div>
          <Typography variant="h1" className="text-grey-900">Design System</Typography>
          <Typography variant="body1" className="text-grey-600 mt-2">
            Explore and manage the design system components used throughout the application.
          </Typography>
        </div>

        <DesignTabs 
          tabs={designTabs} 
          activeTab={activeDesignTab} 
          onTabChange={setActiveDesignTab} 
        />

        <Tabs defaultValue="buttons" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-6 gap-2">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="tabs">Tabs</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
          </TabsList>

          {/* Buttons Tab */}
          <TabsContent value="buttons" className="space-y-8">
            <div className="flex items-center justify-between">
              <Typography variant="h3" className="text-grey-900">Button Components</Typography>
              <ApplyGloballyModal 
                componentType="Buttons" 
                usageData={componentUsageData.buttons}
                onApply={(selectedPages) => {
                  console.log('Applying button changes to:', selectedPages);
                }}
              >
                <Button variant="outline" size="sm">Apply Globally</Button>
              </ApplyGloballyModal>
            </div>

            {/* Button Variants */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Button Variants</Typography>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Button Sizes</Typography>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="xs">Extra Small</Button>
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon"><Settings /></Button>
              </div>
            </div>

            {/* Button States */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Button States</Typography>
              <div className="flex flex-wrap gap-4">
                <Button>Enabled</Button>
                <Button disabled>Disabled</Button>
                <Button variant="outline" className="border-dashed">Dashed</Button>
                <Button className="bg-success-main hover:bg-success-dark text-success-contrast-text">Success</Button>
                <Button className="bg-warning-main hover:bg-warning-dark text-warning-contrast-text">Warning</Button>
              </div>
            </div>

            {/* Button with Icons */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Buttons with Icons</Typography>
              <div className="flex flex-wrap gap-4">
                <Button><Plus /> Create New</Button>
                <Button variant="outline"><Download /> Export</Button>
                <Button variant="secondary">Settings <Settings /></Button>
                <Button variant="destructive"><Trash /> Delete</Button>
                <Button variant="ghost"><Search /> Search</Button>
              </div>
            </div>

            {/* Button Groups */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Button Groups</Typography>
              <div className="flex flex-wrap gap-4">
                <div className="flex border rounded-md overflow-hidden">
                  <Button className="rounded-none border-0">Day</Button>
                  <Button className="rounded-none border-0 border-x bg-primary-main">Week</Button>
                  <Button className="rounded-none border-0">Month</Button>
                </div>

                <div className="flex gap-1">
                  <Button variant="outline" size="icon"><ChevronRight className="rotate-180" /></Button>
                  <Button variant="outline">1</Button>
                  <Button variant="outline" className="bg-primary-main text-primary-contrast-text">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline" size="icon"><ChevronRight /></Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-8">
            <div className="flex items-center justify-between">
              <Typography variant="h3" className="text-grey-900">Badge Components</Typography>
              <ApplyGloballyModal 
                componentType="Badges" 
                usageData={componentUsageData.badges}
                onApply={(selectedPages) => {
                  console.log('Applying badge changes to:', selectedPages);
                }}
              >
                <Button variant="outline" size="sm">Apply Globally</Button>
              </ApplyGloballyModal>
            </div>

            {/* Badge Variants */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Badge Variants</Typography>
              <div className="flex flex-wrap gap-4">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </div>

            {/* Status Badges */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Status Badges</Typography>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-success-main text-success-contrast-text">Completed</Badge>
                <Badge className="bg-warning-main text-warning-contrast-text">Pending</Badge>
                <Badge className="bg-error-main text-error-contrast-text">Failed</Badge>
                <Badge className="bg-info-main text-info-contrast-text">Processing</Badge>
                <Badge className="bg-grey-500 text-grey-50">Inactive</Badge>
              </div>
            </div>

            {/* Badge with Icons */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Badges with Icons</Typography>
              <div className="flex flex-wrap gap-4">
                <Badge><Check className="mr-1 h-3 w-3" /> Verified</Badge>
                <Badge variant="outline" className="border-warning-main text-warning-main">
                  <AlertCircle className="mr-1 h-3 w-3" /> Warning
                </Badge>
                <Badge variant="secondary"><X className="mr-1 h-3 w-3" /> Cancelled</Badge>
              </div>
            </div>

            {/* Badge Sizes */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Badge Sizes</Typography>
              <div className="flex flex-wrap items-center gap-4">
                <Badge className="text-xs py-0 px-2">Small</Badge>
                <Badge>Default</Badge>
                <Badge className="text-base py-1 px-3">Large</Badge>
              </div>
            </div>

            {/* Numeric Badges */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Numeric Badges</Typography>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative">
                  <Button variant="outline">
                    Notifications
                  </Button>
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">5</Badge>
                </div>
                <div className="relative">
                  <Button variant="outline">
                    Messages
                  </Button>
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-success-main text-success-contrast-text">3</Badge>
                </div>
                <div className="relative">
                  <Button variant="outline">
                    Alerts
                  </Button>
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-error-main text-error-contrast-text">12</Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tabs Tab */}
          <TabsContent value="tabs" className="space-y-8">
            <div className="flex items-center justify-between">
              <Typography variant="h3" className="text-grey-900">Tab Components</Typography>
              <ApplyGloballyModal 
                componentType="Tabs" 
                usageData={componentUsageData.tabs}
                onApply={(selectedPages) => {
                  console.log('Applying tab changes to:', selectedPages);
                }}
              >
                <Button variant="outline" size="sm">Apply Globally</Button>
              </ApplyGloballyModal>
            </div>

            {/* Default Tabs */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Default Tabs</Typography>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="p-4 border rounded-md mt-2">
                  <Typography variant="body2">Account settings content goes here.</Typography>
                </TabsContent>
                <TabsContent value="password" className="p-4 border rounded-md mt-2">
                  <Typography variant="body2">Password settings content goes here.</Typography>
                </TabsContent>
                <TabsContent value="settings" className="p-4 border rounded-md mt-2">
                  <Typography variant="body2">General settings content goes here.</Typography>
                </TabsContent>
              </Tabs>
            </div>

            {/* Underlined Tabs */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Underlined Tabs</Typography>
              <DesignTabs 
                tabs={[
                  { id: "all", label: "All Items", count: 124 },
                  { id: "active", label: "Active", count: 86 },
                  { id: "archived", label: "Archived", count: 38 }
                ]} 
                activeTab="all" 
                onTabChange={() => {}} 
              />
              <div className="p-4 border rounded-md">
                <Typography variant="body2">Tab content would appear here.</Typography>
              </div>
            </div>

            {/* Vertical Tabs */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Vertical Tabs</Typography>
              <div className="flex border rounded-md overflow-hidden">
                <div className="w-1/4 border-r">
                  <div className="flex flex-col">
                    <button className="p-3 text-left bg-primary-main text-primary-contrast-text">General</button>
                    <button className="p-3 text-left hover:bg-grey-100">Security</button>
                    <button className="p-3 text-left hover:bg-grey-100">Notifications</button>
                    <button className="p-3 text-left hover:bg-grey-100">Data</button>
                  </div>
                </div>
                <div className="w-3/4 p-4">
                  <Typography variant="body2">General settings content would appear here.</Typography>
                </div>
              </div>
            </div>

            {/* Icon Tabs */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Icon Tabs</Typography>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> Overview
                  </TabsTrigger>
                  <TabsTrigger value="analytics" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" /> Analytics
                  </TabsTrigger>
                  <TabsTrigger value="reports" className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> Reports
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" /> Alerts
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4 border rounded-md mt-2">
                  <Typography variant="body2">Overview content goes here.</Typography>
                </TabsContent>
                <TabsContent value="analytics" className="p-4 border rounded-md mt-2">
                  <Typography variant="body2">Analytics content goes here.</Typography>
                </TabsContent>
                <TabsContent value="reports" className="p-4 border rounded-md mt-2">
                  <Typography variant="body2">Reports content goes here.</Typography>
                </TabsContent>
                <TabsContent value="notifications" className="p-4 border rounded-md mt-2">
                  <Typography variant="body2">Alerts content goes here.</Typography>
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* Filters Tab */}
          <TabsContent value="filters" className="space-y-8">
            <div className="flex items-center justify-between">
              <Typography variant="h3" className="text-grey-900">Filter Components</Typography>
              <ApplyGloballyModal 
                componentType="Filters" 
                usageData={componentUsageData.filters}
                onApply={(selectedPages) => {
                  console.log('Applying filter changes to:', selectedPages);
                }}
              >
                <Button variant="outline" size="sm">Apply Globally</Button>
              </ApplyGloballyModal>
            </div>

            {/* Search Filter */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Search Filter</Typography>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-grey-500" />
                  <Input type="search" placeholder="Search..." className="pl-8" />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" /> Filters
                </Button>
              </div>
            </div>

            {/* Dropdown Filters */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Dropdown Filters</Typography>
              <div className="flex flex-wrap gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="a-z">A-Z</SelectItem>
                    <SelectItem value="z-a">Z-A</SelectItem>
                    <SelectItem value="high-low">Price: High to Low</SelectItem>
                    <SelectItem value="low-high">Price: Low to High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Filter Chips</Typography>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  Status: Active
                  <X className="h-3 w-3 cursor-pointer" />
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  Date: This Month
                  <X className="h-3 w-3 cursor-pointer" />
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                  Category: Invoices
                  <X className="h-3 w-3 cursor-pointer" />
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 bg-primary-main/10 text-primary-main border-primary-main/30">
                  Search: "example"
                  <X className="h-3 w-3 cursor-pointer" />
                </Badge>
                <Button variant="ghost" size="xs">Clear All</Button>
              </div>
            </div>

            {/* Advanced Filter Panel */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Advanced Filter Panel</Typography>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Advanced Filters</CardTitle>
                  <CardDescription>Refine your search with multiple criteria</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select>
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="invoices">Invoices</SelectItem>
                          <SelectItem value="payments">Payments</SelectItem>
                          <SelectItem value="orders">Orders</SelectItem>
                          <SelectItem value="customers">Customers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-from">Date From</Label>
                      <Input id="date-from" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date-to">Date To</Label>
                      <Input id="date-to" type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount-range">Amount Range</Label>
                    <div className="pt-2">
                      <Slider defaultValue={[25, 75]} max={100} step={1} />
                    </div>
                    <div className="flex justify-between text-xs text-grey-500">
                      <div>$0</div>
                      <div>$10,000+</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-archived" />
                      <Label htmlFor="include-archived">Include archived items</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="only-flagged" />
                      <Label htmlFor="only-flagged">Only show flagged items</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost">Reset</Button>
                  <Button>Apply Filters</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Tables Tab */}
          <TabsContent value="tables" className="space-y-8">
            <div className="flex items-center justify-between">
              <Typography variant="h3" className="text-grey-900">Table Components</Typography>
              <ApplyGloballyModal 
                componentType="Tables" 
                usageData={componentUsageData.tables}
                onApply={(selectedPages) => {
                  console.log('Applying table changes to:', selectedPages);
                }}
              >
                <Button variant="outline" size="sm">Apply Globally</Button>
              </ApplyGloballyModal>
            </div>

            {/* Basic Table */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Basic Table</Typography>
              <Table>
                <TableCaption>A list of recent invoices</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell><Badge variant="outline" className="bg-success-main/10 text-success-main border-success-main/30">Paid</Badge></TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell><Badge variant="outline" className="bg-warning-main/10 text-warning-main border-warning-main/30">Pending</Badge></TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell className="text-right">$125.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV003</TableCell>
                    <TableCell><Badge variant="outline" className="bg-error-main/10 text-error-main border-error-main/30">Unpaid</Badge></TableCell>
                    <TableCell>Bank Transfer</TableCell>
                    <TableCell className="text-right">$350.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV004</TableCell>
                    <TableCell><Badge variant="outline" className="bg-success-main/10 text-success-main border-success-main/30">Paid</Badge></TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$450.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV005</TableCell>
                    <TableCell><Badge variant="outline" className="bg-info-main/10 text-info-main border-info-main/30">Processing</Badge></TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell className="text-right">$550.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Table with Actions */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Table with Actions</Typography>
              <div className="rounded-md border">
                <div className="flex items-center justify-between p-4 border-b">
                  <Typography variant="subtitle1">Invoices</Typography>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" /> Add Invoice
                    </Button>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Acme Inc.</TableCell>
                      <TableCell><Badge variant="outline" className="bg-success-main/10 text-success-main border-success-main/30">Paid</Badge></TableCell>
                      <TableCell>2023-04-23</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">INV002</TableCell>
                      <TableCell>Globex Corp.</TableCell>
                      <TableCell><Badge variant="outline" className="bg-warning-main/10 text-warning-main border-warning-main/30">Pending</Badge></TableCell>
                      <TableCell>2023-04-22</TableCell>
                      <TableCell className="text-right">$125.00</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">INV003</TableCell>
                      <TableCell>Soylent Corp.</TableCell>
                      <TableCell><Badge variant="outline" className="bg-error-main/10 text-error-main border-error-main/30">Unpaid</Badge></TableCell>
                      <TableCell>2023-04-21</TableCell>
                      <TableCell className="text-right">$350.00</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="flex items-center justify-between px-4 py-2 border-t">
                  <div className="text-sm text-grey-500">
                    Showing 3 of 100 entries
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4 rotate-180" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8">1</Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 bg-primary-main text-primary-contrast-text">2</Button>
                    <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Table */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Scrollable Table</Typography>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>A list of your recent transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-72 rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Array.from({ length: 15 }).map((_, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-medium">TX{String(i + 1).padStart(3, '0')}</TableCell>
                            <TableCell>Payment for {['Invoice', 'Order', 'Subscription'][i % 3]} #{i + 100}</TableCell>
                            <TableCell>{new Date(2023, 3, 20 - i).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">${((i + 1) * 75).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-8">
            <div className="flex items-center justify-between">
              <Typography variant="h3" className="text-grey-900">Form Components</Typography>
              <ApplyGloballyModal 
                componentType="Forms" 
                usageData={componentUsageData.forms}
                onApply={(selectedPages) => {
                  console.log('Applying form changes to:', selectedPages);
                }}
              >
                <Button variant="outline" size="sm">Apply Globally</Button>
              </ApplyGloballyModal>
            </div>

            {/* Basic Form */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Basic Form</Typography>
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Enter your company name" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Form Controls */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Form Controls</Typography>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-input">Text Input</Label>
                    <Input id="text-input" placeholder="Enter text" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-input">Email Input</Label>
                    <Input id="email-input" type="email" placeholder="Enter email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-input">Password Input</Label>
                    <Input id="password-input" type="password" placeholder="Enter password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="textarea">Textarea</Label>
                    <textarea 
                      id="textarea" 
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter longer text"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Checkbox Group</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms">Accept terms and conditions</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="newsletter" />
                        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Radio Group</Label>
                    <RadioGroup defaultValue="option-one">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Option One</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Option Two</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="select">Select</Label>
                    <Select>
                      <SelectTrigger id="select">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="toggle">Toggle</Label>
                      <Switch id="toggle" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Validation */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Form Validation</Typography>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valid-input" className="text-success-main">Valid Input</Label>
                  <Input id="valid-input" className="border-success-main focus-visible:ring-success-main" value="Correct value" />
                  <p className="text-xs text-success-main">This input is valid</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invalid-input" className="text-error-main">Invalid Input</Label>
                  <Input id="invalid-input" className="border-error-main focus-visible:ring-error-main" value="Incorrect value" />
                  <p className="text-xs text-error-main">This input is invalid</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-8" />

        {/* Layout Components */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h3" className="text-grey-900">Layout Components</Typography>
            <ApplyGloballyModal 
              componentType="Layout" 
              usageData={componentUsageData.layout}
              onApply={(selectedPages) => {
                console.log('Applying layout changes to:', selectedPages);
              }}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <Typography variant="h6" className="text-grey-800">Cards</Typography>
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card description goes here</CardDescription>
                </CardHeader>
                <CardContent>
                  <Typography variant="body2">This is the main content of the card.</Typography>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost">Cancel</Button>
                  <Button>Submit</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle>Total Revenue</CardTitle>
                    <CardDescription>Monthly revenue</CardDescription>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-primary-main/10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5 text-primary-main"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-grey-500">+20.1% from last month</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-32 bg-primary-main/10" />
                <CardHeader>
                  <CardTitle>Featured Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <Typography variant="body2">Card with image header.</Typography>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0">Learn more</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          {/* Separators */}
          <div className="space-y-4">
            <Typography variant="h6" className="text-grey-800">Separators</Typography>
            <div className="space-y-4">
              <div>
                <Typography variant="body2">Horizontal Separator</Typography>
                <Separator className="my-4" />
              </div>
              <div className="flex h-5 items-center space-x-4 text-sm">
                <div>Vertical</div>
                <Separator orientation="vertical" />
                <div>Separator</div>
                <Separator orientation="vertical" />
                <div>Example</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h3" className="text-grey-900">Progress Indicators</Typography>
            <ApplyGloballyModal 
              componentType="Progress" 
              usageData={componentUsageData.progress}
              onApply={(selectedPages) => {
                console.log('Applying progress changes to:', selectedPages);
              }}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          {/* Progress Bars */}
          <div className="space-y-4">
            <Typography variant="h6" className="text-grey-800">Progress Bars</Typography>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="body2">Default Progress</Typography>
                  <Typography variant="body2">{progress}%</Typography>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="body2">Success Progress</Typography>
                  <Typography variant="body2">80%</Typography>
                </div>
                <Progress value={80} className="h-2 bg-success-main/20 [&>div]:bg-success-main" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="body2">Warning Progress</Typography>
                  <Typography variant="body2">45%</Typography>
                </div>
                <Progress value={45} className="h-2 bg-warning-main/20 [&>div]:bg-warning-main" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Typography variant="body2">Error Progress</Typography>
                  <Typography variant="body2">20%</Typography>
                </div>
                <Progress value={20} className="h-2 bg-error-main/20 [&>div]:bg-error-main" />
              </div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="space-y-4">
            <Typography variant="h6" className="text-grey-800">Step Indicators</Typography>
            <div className="space-y-8">
              {/* Numbered Steps */}
              <div>
                <Typography variant="subtitle2" className="mb-4">Numbered Steps</Typography>
                <div className="flex justify-between">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-main text-primary-contrast-text flex items-center justify-center">1</div>
                    <Typography variant="caption" className="mt-2">Account</Typography>
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="h-1 w-full bg-primary-main"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-main text-primary-contrast-text flex items-center justify-center">2</div>
                    <Typography variant="caption" className="mt-2">Details</Typography>
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="h-1 w-full bg-grey-300"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-grey-300 text-grey-600 flex items-center justify-center">3</div>
                    <Typography variant="caption" className="mt-2">Confirm</Typography>
                  </div>
                </div>
              </div>

              {/* Icon Steps */}
              <div>
                <Typography variant="subtitle2" className="mb-4">Icon Steps</Typography>
                <div className="flex justify-between">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-success-main text-success-contrast-text flex items-center justify-center">
                      <Check className="h-5 w-5" />
                    </div>
                    <Typography variant="caption" className="mt-2">Upload</Typography>
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="h-1 w-full bg-success-main"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary-main text-primary-contrast-text flex items-center justify-center">
                      <Settings className="h-5 w-5" />
                    </div>
                    <Typography variant="caption" className="mt-2">Process</Typography>
                  </div>
                  <div className="flex-1 flex items-center">
                    <div className="h-1 w-full bg-grey-300"></div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-grey-300 text-grey-600 flex items-center justify-center">
                      <Download className="h-5 w-5" />
                    </div>
                    <Typography variant="caption" className="mt-2">Download</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Dialogs */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h3" className="text-grey-900">Modal Dialogs</Typography>
            <ApplyGloballyModal 
              componentType="Modals" 
              usageData={componentUsageData.modals}
              onApply={(selectedPages) => {
                console.log('Applying modal changes to:', selectedPages);
              }}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          {/* Basic Dialog */}
          <div className="space-y-4">
            <Typography variant="h6" className="text-grey-800">Basic Dialog</Typography>
            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input id="username" value="@peduarte" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>Confirmation Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove your data from our servers.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-end gap-2">
                    <DialogTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogTrigger>
                    <Button variant="destructive">Delete Account</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Alert Dialogs */}
          <div className="space-y-4">
            <Typography variant="h6" className="text-grey-800">Alert Dialogs</Typography>
            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-success-main text-success-main hover:bg-success-main/10">
                    Success Dialog
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <div className="mx-auto my-4 h-12 w-12 rounded-full bg-success-main/20 flex items-center justify-center">
                      <Check className="h-6 w-6 text-success-main" />
                    </div>
                    <DialogTitle className="text-center">Payment Successful</DialogTitle>
                    <DialogDescription className="text-center">
                      Your payment has been successfully processed. We've sent you an email with all the details.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-center">
                    <DialogTrigger asChild>
                      <Button className="bg-success-main hover:bg-success-dark text-success-contrast-text">
                        Continue
                      </Button>
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-error-main text-error-main hover:bg-error-main/10">
                    Error Dialog
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <div className="mx-auto my-4 h-12 w-12 rounded-full bg-error-main/20 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-error-main" />
                    </div>
                    <DialogTitle className="text-center">Payment Failed</DialogTitle>
                    <DialogDescription className="text-center">
                      Your payment could not be processed. Please check your payment details and try again.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex justify-center gap-2">
                    <DialogTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                      <Button className="bg-error-main hover:bg-error-dark text-error-contrast-text">
                        Try Again
                      </Button>
                    </DialogTrigger>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Brand Assets */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-grey-900">Brand Assets</Typography>

          <div className="grid grid-cols-2 gap-8">
            {/* Logo Variants */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Logo Variants</Typography>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="p-4 border border-grey-300 rounded-lg bg-background-paper">
                    <MontoLogo className="mx-auto text-primary-main" />
                  </div>
                  <Typography variant="caption" className="text-grey-600">Primary</Typography>
                </div>
                <div className="text-center space-y-2">
                  <div className="p-4 border border-grey-300 rounded-lg bg-grey-900">
                    <MontoLogo className="mx-auto text-background-paper" />
                  </div>
                  <Typography variant="caption" className="text-grey-600">White</Typography>
                </div>
                <div className="text-center space-y-2">
                  <div className="p-4 border border-grey-300 rounded-lg bg-background-paper">
                    <MontoLogo className="mx-auto text-[#291E55]" />
                  </div>
                  <Typography variant="caption" className="text-grey-600">Dark Purple</Typography>
                </div>
              </div>
            </div>

            {/* Icon Variants */}
            <div className="space-y-4">
              <Typography variant="h6" className="text-grey-800">Icon Variants</Typography>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="p-4 border border-grey-300 rounded-lg bg-background-paper">
                    <MontoIcon className="mx-auto text-primary-main" />
                  </div>
                  <Typography variant="caption" className="text-grey-600">Primary</Typography>
                </div>
                <div className="text-center space-y-2">
                  <div className="p-4 border border-grey-300 rounded-lg bg-grey-900">
                    <MontoIcon className="mx-auto text-background-paper" />
                  </div>
                  <Typography variant="caption" className="text-grey-600">White</Typography>
                </div>
                <div className="text-center space-y-2">
                  <div className="p-4 border border-grey-300 rounded-lg bg-background-paper">
                    <MontoIcon className="mx-auto text-[#291E55]" />
                  </div>
                  <Typography variant="caption" className="text-grey-600">Dark Purple</Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Color Palette */}
          <div className="space-y-4">
            <Typography variant="h6" className="text-grey-800">Color Palette</Typography>
            <div className="grid grid-cols-6 gap-4">
              <div className="space-y-2">
                <div className="h-16 rounded-md bg-primary-main"></div>
                <Typography variant="caption" className="text-grey-600">Primary</Typography>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-md bg-secondary-main"></div>
                <Typography variant="caption" className="text-grey-600">Secondary</Typography>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-md bg-success-main"></div>
                <Typography variant="caption" className="text-grey-600">Success</Typography>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-md bg-warning-main"></div>
                <Typography variant="caption" className="text-grey-600">Warning</Typography>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-md bg-error-main"></div>
                <Typography variant="caption" className="text-grey-600">Error</Typography>
              </div>
              <div className="space-y-2">
                <div className="h-16 rounded-md bg-info-main"></div>
                <Typography variant="caption" className="text-grey-600">Info</Typography>
              </div>
            </div>
            <div className="grid grid-cols-9 gap-2">
              <div className="space-y-1">
                <div className="h-8 rounded-md bg-grey-50"></div>
                <Typography variant="caption" className="text-xs text-grey-600">Grey 50</Typography>
              </div>
              <div className="space-y-1">
                <div className="h-8 rounded-md bg-grey-100"></div>
                <Typography variant="caption" className="text-xs text-grey-600">Grey 100</Typography>
              </div>
              <div className="space-y-1">
                <div className="h-8 rounded-md bg-grey-200"></div>
                <Typography variant="caption" className="text-xs text-grey-600">Grey 200</Typography>
              </div>
              <div className="space-y-1">
                <div className="h-8 rounded-md bg-grey-300"></div>
                <Typography variant="caption" className="text-xs text-grey-600">Grey 300</Typography>
              </div>
              <div className="space-y-1">
                <div className="h-8 rounded-md bg-grey-400"></div>
                <Typography variant="caption" className="text-xs text-grey-600">Grey 400</Typography>
              </div>
              <div className="space-y-1">
                <div className="h-8 rounded-md bg-grey-500"></div>
                <Typography variant="caption" className="text-xs text-grey-600">Grey 500</Typography>
              </div>
              <div className="space-y-1">
                <div className="h-8 rounded-md bg-grey-600"></div>
                <Typography variant="caption" className="text-xs text-grey-600">Grey 600</Typography>
              </div>
              <div className="space-y-1">
                <div className="h-8 rounded-md bg-grey-700"></div>
                <Typography variant="caption" className="text-xs text-grey-600">Grey 700</Typography>
              </div>
              <div className="space-y-1">
                <div className="h-8 rounded-md bg-grey-900"></div>
                <Typography variant="caption" className="text-xs text-grey-600">Grey 900</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemPlayground;
