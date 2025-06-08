
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Palette,
  Type,
  Square,
  MousePointer,
  Award,
  Navigation,
  Filter,
  Table as TableIcon,
  Settings,
  Layout,
  AlertCircle,
  BarChart3,
  Layers,
  Bell,
  ChevronDown,
  Navigation2,
  Zap,
  Copy,
  Check,
  AlertTriangle,
  Info,
  CheckCircle
} from 'lucide-react';
import { MontoLogo } from "@/components/MontoLogo";
import MontoIcon from "@/components/MontoIcon";
import { toast } from "@/hooks/use-toast";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { id: "color-palette", label: "Color Palette", icon: <Palette size={18} /> },
  { id: "typography", label: "Typography", icon: <Type size={18} /> },
  { id: "spacing-layout", label: "Spacing & Layout", icon: <Square size={18} /> },
  { id: "buttons", label: "Buttons", icon: <MousePointer size={18} /> },
  { id: "status-badges", label: "Status Badges", icon: <Award size={18} /> },
  { id: "tab-navigation", label: "Tab Navigation", icon: <Navigation size={18} /> },
  { id: "filter-components", label: "Filter Components", icon: <Filter size={18} /> },
  { id: "table-system", label: "Table System", icon: <TableIcon size={18} /> },
  { id: "form-elements", label: "Form Elements", icon: <Settings size={18} /> },
  { id: "layout-components", label: "Layout Components", icon: <Layout size={18} /> },
  { id: "alerts", label: "Alerts", icon: <AlertCircle size={18} /> },
  { id: "progress", label: "Progress", icon: <BarChart3 size={18} /> },
  { id: "modals", label: "Modals", icon: <Layers size={18} /> },
  { id: "toast-notifications", label: "Toast Notifications", icon: <Bell size={18} /> },
  { id: "dropdowns", label: "Dropdowns", icon: <ChevronDown size={18} /> },
  { id: "breadcrumbs", label: "Breadcrumbs", icon: <Navigation2 size={18} /> },
  { id: "brand-assets", label: "Brand Assets", icon: <Zap size={18} /> },
];

const ColorSwatch = ({ name, description, hex, className }: { name: string; description: string; hex: string; className: string }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `${text} copied!` });
  };

  return (
    <div className="border border-grey-300 rounded-lg p-4 bg-background-paper">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-16 h-16 rounded-lg ${className} border border-grey-300`}></div>
        <button 
          onClick={() => copyToClipboard(hex)}
          className="p-2 hover:bg-grey-200 rounded-md transition-colors"
        >
          <Copy size={16} className="text-grey-600" />
        </button>
      </div>
      <h4 className="font-medium text-grey-900 mb-1">{name}</h4>
      <p className="text-sm text-grey-600 mb-2">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-grey-700">{hex}</span>
      </div>
    </div>
  );
};

const TypographyExample = ({ variant, example, className }: { variant: string; example: string; className: string }) => (
  <div className="border border-grey-300 rounded-lg p-4 bg-background-paper">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-grey-600">{variant}</span>
      <button 
        onClick={() => navigator.clipboard.writeText(className)}
        className="p-1 hover:bg-grey-200 rounded transition-colors"
      >
        <Copy size={12} className="text-grey-500" />
      </button>
    </div>
    <div className={className}>{example}</div>
    <div className="text-xs text-grey-500 mt-2 font-mono">{className}</div>
  </div>
);

export default function DesignSystemPlayground() {
  const [activeSection, setActiveSection] = useState("color-palette");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    terms: false,
    category: ''
  });

  const renderColorPalette = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Primary Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ColorSwatch 
            name="primary-lighter" 
            description="Lightest purple for subtle backgrounds" 
            hex="#EFEBFF" 
            className="bg-primary-lighter" 
          />
          <ColorSwatch 
            name="primary-light" 
            description="Light purple for secondary elements" 
            hex="#BEADFF" 
            className="bg-primary-light" 
          />
          <ColorSwatch 
            name="primary-main" 
            description="Main brand purple for primary actions" 
            hex="#7B59FF" 
            className="bg-primary-main" 
          />
          <ColorSwatch 
            name="primary-dark" 
            description="Dark purple for active states" 
            hex="#523BAA" 
            className="bg-primary-dark" 
          />
          <ColorSwatch 
            name="primary-darker" 
            description="Darkest purple for maximum emphasis" 
            hex="#291E55" 
            className="bg-primary-darker" 
          />
          <ColorSwatch 
            name="primary-contrast-text" 
            description="White text for primary backgrounds" 
            hex="#FFFFFF" 
            className="bg-primary-contrast-text border-2" 
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Status Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ColorSwatch 
            name="success-main" 
            description="Green for success states" 
            hex="#007737" 
            className="bg-success-main" 
          />
          <ColorSwatch 
            name="error-main" 
            description="Red for error states" 
            hex="#DF1C41" 
            className="bg-error-main" 
          />
          <ColorSwatch 
            name="warning-main" 
            description="Orange for warning states" 
            hex="#F2AE40" 
            className="bg-warning-main" 
          />
          <ColorSwatch 
            name="info-main" 
            description="Blue for information" 
            hex="#375DFB" 
            className="bg-info-main" 
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Grey Scale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ColorSwatch 
            name="grey-900" 
            description="Near black for maximum contrast" 
            hex="#061237" 
            className="bg-grey-900" 
          />
          <ColorSwatch 
            name="grey-800" 
            description="Very dark grey for primary text" 
            hex="#38415F" 
            className="bg-grey-800" 
          />
          <ColorSwatch 
            name="grey-600" 
            description="Darker grey for body text" 
            hex="#818799" 
            className="bg-grey-600" 
          />
          <ColorSwatch 
            name="grey-400" 
            description="Medium grey for borders" 
            hex="#E6E7EB" 
            className="bg-grey-400" 
          />
          <ColorSwatch 
            name="grey-200" 
            description="Light grey for backgrounds" 
            hex="#F4F6F8" 
            className="bg-grey-200" 
          />
          <ColorSwatch 
            name="grey-0" 
            description="Pure white" 
            hex="#FFFFFF" 
            className="bg-grey-0 border-2" 
          />
        </div>
      </div>
    </div>
  );

  const renderTypography = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Headings</h2>
        <div className="space-y-4">
          <TypographyExample variant="H1" example="The quick brown fox jumps" className="text-6xl font-medium text-grey-900" />
          <TypographyExample variant="H2" example="The quick brown fox jumps" className="text-5xl font-medium text-grey-900" />
          <TypographyExample variant="H3" example="The quick brown fox jumps" className="text-2xl font-medium text-grey-900" />
          <TypographyExample variant="H4" example="The quick brown fox jumps" className="text-xl font-bold text-grey-900" />
          <TypographyExample variant="H5" example="The quick brown fox jumps" className="text-lg font-semibold text-grey-900" />
          <TypographyExample variant="H6" example="The quick brown fox jumps" className="text-base font-medium text-grey-900" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Body Text</h2>
        <div className="space-y-4">
          <TypographyExample variant="Body Large" example="The quick brown fox jumps over the lazy dog" className="text-lg font-normal text-grey-700" />
          <TypographyExample variant="Body Default" example="The quick brown fox jumps over the lazy dog" className="text-base font-normal text-grey-700" />
          <TypographyExample variant="Body Small" example="The quick brown fox jumps over the lazy dog" className="text-sm font-normal text-grey-700" />
          <TypographyExample variant="Caption" example="The quick brown fox jumps over the lazy dog" className="text-xs font-normal text-grey-600" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Utility Text</h2>
        <div className="space-y-4">
          <TypographyExample variant="Label" example="Form Label" className="text-sm font-medium text-grey-800" />
          <TypographyExample variant="Overline" example="CATEGORY LABEL" className="text-xs font-medium uppercase tracking-wide text-grey-600" />
          <TypographyExample variant="Helper Text" example="This is helper text for forms" className="text-xs font-normal text-grey-500" />
          <TypographyExample variant="Subheading" example="Section Subheading" className="text-lg font-semibold text-grey-800" />
        </div>
      </div>
    </div>
  );

  const renderSpacingLayout = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Spacing Scale</h2>
        <div className="space-y-4">
          {[
            { name: "xs", value: "0.25rem", pixels: "4px", class: "p-1" },
            { name: "sm", value: "0.5rem", pixels: "8px", class: "p-2" },
            { name: "md", value: "1rem", pixels: "16px", class: "p-4" },
            { name: "lg", value: "1.5rem", pixels: "24px", class: "p-6" },
            { name: "xl", value: "2rem", pixels: "32px", class: "p-8" },
            { name: "2xl", value: "3rem", pixels: "48px", class: "p-12" },
          ].map((space) => (
            <div key={space.name} className="border border-grey-300 rounded-lg p-4 bg-background-paper">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-grey-900">{space.name}</span>
                <span className="text-sm text-grey-600">{space.value} ({space.pixels})</span>
              </div>
              <div className="bg-grey-200 rounded">
                <div className={`bg-primary-light rounded ${space.class}`}>
                  <div className="bg-primary-main rounded h-4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Layout Examples</h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Card with Standard Padding</CardTitle>
              <CardDescription>This card uses our standard padding tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-grey-700">Content area with proper spacing using design system tokens.</p>
            </CardContent>
          </Card>

          <div className="bg-background-paper border border-grey-300 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Grid with Gap</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-primary-lighter p-4 rounded text-center">Item 1</div>
              <div className="bg-primary-lighter p-4 rounded text-center">Item 2</div>
              <div className="bg-primary-lighter p-4 rounded text-center">Item 3</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderButtons = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Button Sizes</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Small</Button>
          <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Default</Button>
          <Button size="lg" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Large</Button>
          <Button size="icon" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text"><Settings /></Button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Button Groups</h2>
        <div className="flex gap-2">
          <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">First</Button>
          <Button variant="outline">Second</Button>
          <Button variant="outline">Third</Button>
        </div>
      </div>
    </div>
  );

  const renderStatusBadges = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Status Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Badge className="bg-success-lighter text-success-darker border-success-main">Paid</Badge>
            <p className="text-xs text-grey-600">Success state</p>
          </div>
          <div className="space-y-2">
            <Badge className="bg-error-lighter text-error-darker border-error-main">Rejected</Badge>
            <p className="text-xs text-grey-600">Error state</p>
          </div>
          <div className="space-y-2">
            <Badge className="bg-warning-lighter text-warning-contrast-text border-warning-main">Pending</Badge>
            <p className="text-xs text-grey-600">Warning state</p>
          </div>
          <div className="space-y-2">
            <Badge className="bg-info-lighter text-info-darker border-info-main">Processing</Badge>
            <p className="text-xs text-grey-600">Info state</p>
          </div>
          <div className="space-y-2">
            <Badge className="bg-primary-lighter text-primary-darker border-primary-main">Active</Badge>
            <p className="text-xs text-grey-600">Primary state</p>
          </div>
          <div className="space-y-2">
            <Badge variant="secondary">Inactive</Badge>
            <p className="text-xs text-grey-600">Secondary state</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabNavigation = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Tab Navigation</h2>
        <Tabs defaultValue="tab1" className="w-full">
          <TabsList className="bg-grey-200">
            <TabsTrigger value="tab1" className="data-[state=active]:bg-primary-main data-[state=active]:text-primary-contrast-text">Overview</TabsTrigger>
            <TabsTrigger value="tab2" className="data-[state=active]:bg-primary-main data-[state=active]:text-primary-contrast-text">Analytics</TabsTrigger>
            <TabsTrigger value="tab3" className="data-[state=active]:bg-primary-main data-[state=active]:text-primary-contrast-text">Reports</TabsTrigger>
            <TabsTrigger value="tab4" className="data-[state=active]:bg-primary-main data-[state=active]:text-primary-contrast-text">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>A comprehensive overview of your data</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the overview tab content.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab2" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Detailed analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the analytics tab content.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab3" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Generate and view reports</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the reports tab content.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tab4" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the settings tab content.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  const renderFormElements = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Form Elements</h2>
        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
            <CardDescription>A functional form example with validation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your name" 
                  className="border-grey-400 focus:border-primary-main focus:ring-primary-main"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Enter your email" 
                  className="border-grey-400 focus:border-primary-main focus:ring-primary-main"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger className="border-grey-400 focus:border-primary-main focus:ring-primary-main">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea 
                id="message" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Enter your message" 
                className="border-grey-400 focus:border-primary-main focus:ring-primary-main min-h-[100px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={formData.terms}
                onCheckedChange={(checked) => setFormData({...formData, terms: checked as boolean})}
                className="border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main"
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions *
              </Label>
            </div>
            <Button 
              className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text"
              disabled={!formData.name || !formData.email || !formData.message || !formData.terms}
            >
              Submit Form
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Input States</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Default State</Label>
            <Input placeholder="Default input" className="border-grey-400" />
          </div>
          <div className="space-y-2">
            <Label>Success State</Label>
            <Input placeholder="Valid input" className="border-success-main focus:border-success-main focus:ring-success-main" />
          </div>
          <div className="space-y-2">
            <Label>Error State</Label>
            <Input placeholder="Invalid input" className="border-error-main focus:border-error-main focus:ring-error-main" />
            <p className="text-xs text-error-main">This field is required</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Progress Indicators</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Basic Progress</Label>
            <Progress value={33} className="bg-grey-200" />
            <p className="text-xs text-grey-600 mt-1">33% Complete</p>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Advanced Progress</Label>
            <Progress value={67} className="bg-grey-200" />
            <p className="text-xs text-grey-600 mt-1">67% Complete</p>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Complete</Label>
            <Progress value={100} className="bg-grey-200" />
            <p className="text-xs text-grey-600 mt-1">100% Complete</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Step Progress</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-main text-primary-contrast-text text-sm font-medium">
              <Check size={16} />
            </div>
            <div className="flex-1 h-1 bg-primary-main rounded"></div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-main text-primary-contrast-text text-sm font-medium">
              2
            </div>
            <div className="flex-1 h-1 bg-grey-300 rounded"></div>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-grey-300 text-grey-600 text-sm font-medium">
              3
            </div>
          </div>
          <div className="flex justify-between text-sm text-grey-600">
            <span>Completed</span>
            <span>In Progress</span>
            <span>Upcoming</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderModals = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Modal Examples</h2>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Basic Modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="modal-name" className="text-right">Name</Label>
                  <Input id="modal-name" defaultValue="John Doe" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="modal-username" className="text-right">Username</Label>
                  <Input id="modal-username" defaultValue="@johndoe" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Action</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex justify-center mb-4">
                  <AlertTriangle className="h-12 w-12 text-warning-main" />
                </div>
                <AlertDialogTitle className="text-center">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-center">
                  This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-error-main hover:bg-error-dark text-error-contrast-text">Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-info-main text-info-main hover:bg-info-lighter">Info Modal</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="flex justify-center mb-4">
                  <Info className="h-12 w-12 text-info-main" />
                </div>
                <DialogTitle className="text-center">Information</DialogTitle>
                <DialogDescription className="text-center">
                  Here's some important information you should know about this feature.
                  This modal demonstrates the info variant with an icon.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Got it</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );

  const renderTableSystem = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Table System</h2>
        <Card>
          <CardHeader>
            <CardTitle>Data Table</CardTitle>
            <CardDescription>A sample data table with proper styling</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-grey-300">
                  <TableHead className="text-grey-800 font-medium">Invoice</TableHead>
                  <TableHead className="text-grey-800 font-medium">Status</TableHead>
                  <TableHead className="text-grey-800 font-medium">Method</TableHead>
                  <TableHead className="text-right text-grey-800 font-medium">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-grey-200">
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>
                    <Badge className="bg-success-lighter text-success-darker border-success-main">Paid</Badge>
                  </TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow className="border-grey-200">
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell>
                    <Badge className="bg-warning-lighter text-warning-contrast-text border-warning-main">Pending</Badge>
                  </TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
                <TableRow className="border-grey-200">
                  <TableCell className="font-medium">INV003</TableCell>
                  <TableCell>
                    <Badge className="bg-error-lighter text-error-darker border-error-main">Unpaid</Badge>
                  </TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell className="text-right">$350.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderBrandAssets = () => {
    const copyMontoLogoSVG = () => {
      const svg = `<svg viewBox="0 0 120 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8h4v20H8V8zm8 0h4l6 12 6-12h4v20h-4V16l-6 12-6-12v12h-4V8zm28 0h4v16h8v4H44V8zm12 0h12v4h-8v4h6v4h-6v4h8v4H56V8zm20 0h4v20h-4V8z" fill="#7B59FF"/>
      </svg>`;
      navigator.clipboard.writeText(svg);
      toast({ title: "Copied to clipboard", description: "Monto logo SVG copied!" });
    };

    const copyMontoIconSVG = () => {
      const svg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 4h4v16H2V4zm8 0h4l3 8 3-8h4v16h-4V12l-3 8-3-8v8h-4V4z" fill="#7B59FF"/>
      </svg>`;
      navigator.clipboard.writeText(svg);
      toast({ title: "Copied to clipboard", description: "Monto icon SVG copied!" });
    };

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Brand Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monto Logo</CardTitle>
                <CardDescription>Primary brand logo in purple</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center p-8 bg-grey-50 rounded-lg">
                  <MontoLogo className="h-8 w-auto" style={{ color: '#7B59FF' }} />
                </div>
                <Button 
                  onClick={copyMontoLogoSVG}
                  variant="outline" 
                  className="w-full"
                >
                  <Copy size={16} className="mr-2" />
                  Copy SVG Code
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monto Icon</CardTitle>
                <CardDescription>Icon version in purple</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center p-8 bg-grey-50 rounded-lg">
                  <MontoIcon className="h-8 w-auto" style={{ color: '#7B59FF' }} />
                </div>
                <Button 
                  onClick={copyMontoIconSVG}
                  variant="outline" 
                  className="w-full"
                >
                  <Copy size={16} className="mr-2" />
                  Copy SVG Code
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Usage Guidelines</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-grey-900 mb-2">Primary Color Usage</h4>
                  <p className="text-sm text-grey-700">
                    Always use the primary purple color (#7B59FF) for brand assets. This ensures consistency across all applications.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-grey-900 mb-2">Minimum Size</h4>
                  <p className="text-sm text-grey-700">
                    Maintain minimum dimensions to ensure legibility. Logo should not be smaller than 80px wide.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-grey-900 mb-2">Clear Space</h4>
                  <p className="text-sm text-grey-700">
                    Provide adequate clear space around the logo equal to the height of the "M" in the wordmark.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "color-palette": return renderColorPalette();
      case "typography": return renderTypography();
      case "spacing-layout": return renderSpacingLayout();
      case "buttons": return renderButtons();
      case "status-badges": return renderStatusBadges();
      case "tab-navigation": return renderTabNavigation();
      case "form-elements": return renderFormElements();
      case "progress": return renderProgress();
      case "modals": return renderModals();
      case "table-system": return renderTableSystem();
      case "brand-assets": return renderBrandAssets();
      default: return renderColorPalette();
    }
  };

  return (
    <div className="flex h-screen bg-background-default">
      {/* Sidebar */}
      <div className="w-64 bg-common-white border-r border-grey-300 flex flex-col">
        <div className="p-6 border-b border-grey-300">
          <h1 className="text-xl font-semibold text-grey-900">Design System</h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left ${
                activeSection === item.id 
                  ? 'bg-primary-lighter text-primary-main font-medium' 
                  : 'text-grey-700 hover:bg-grey-200'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
