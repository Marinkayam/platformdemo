import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import { SmartConnectionStatusBadge } from "@/components/ui/smart-connection-status-badge";
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown";
import { ActiveFiltersList } from "@/components/invoices/filters/ActiveFiltersList";
import { InvoiceFilters as InvoiceFiltersType } from "@/components/invoices/filters/types";
import { InvoiceTabs } from "@/components/invoices/InvoiceTabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  CheckCircle,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  X,
  ArrowLeft,
  Home
} from 'lucide-react';
import { MontoLogo } from "@/components/MontoLogo";
import MontoIcon from "@/components/MontoIcon";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

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

  // Filter state for demonstration - using correct property names
  const [filters, setFilters] = useState<InvoiceFiltersType>({
    status: [],
    total: "All",
    dueDate: {
      from: "",
      to: ""
    },
    buyer: [],
    portal: [],
    transactionType: "All",
    owner: [],
    search: ""
  });

  // Table sort state
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Tab states
  const [activeInvoiceTab, setActiveInvoiceTab] = useState("all");
  const [activeDetailTab, setActiveDetailTab] = useState("financial");

  // Form states
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [selectedGenericOption, setSelectedGenericOption] = useState<string>("");
  const [selectedSearchableOption, setSelectedSearchableOption] = useState<string | null>(null);
  const [selectedRadioOption, setSelectedRadioOption] = useState<string>("left");

  const navigate = useNavigate();

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (key: keyof InvoiceFiltersType, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleRemoveFilter = (key: string, value: string) => {
    if (key === 'search') {
      setFilters(prev => ({ ...prev, search: '' }));
    } else {
      setFilters(prev => ({
        ...prev,
        [key]: Array.isArray(prev[key as keyof InvoiceFiltersType]) 
          ? (prev[key as keyof InvoiceFiltersType] as string[]).filter(item => item !== value)
          : []
      }));
    }
  };

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
        <div className="space-y-6">
          {[
            { name: "xs", value: "0.25rem", pixels: "4px", class: "p-1", token: "--space-xs" },
            { name: "sm", value: "0.5rem", pixels: "8px", class: "p-2", token: "--space-sm" },
            { name: "md", value: "1rem", pixels: "16px", class: "p-4", token: "--space-md" },
            { name: "lg", value: "1.5rem", pixels: "24px", class: "p-6", token: "--space-lg" },
            { name: "xl", value: "2rem", pixels: "32px", class: "p-8", token: "--space-xl" },
            { name: "2xl", value: "3rem", pixels: "48px", class: "p-12", token: "--space-2xl" },
          ].map((space) => (
            <div key={space.name} className="border border-grey-300 rounded-lg p-4 bg-background-paper">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-grey-900">{space.name}</span>
                  <span className="text-xs font-mono text-grey-600 bg-grey-200 px-2 py-1 rounded">{space.token}</span>
                </div>
                <span className="text-sm text-grey-600">{space.value} ({space.pixels})</span>
              </div>
              <div className="bg-grey-200 rounded-md p-2 border-2 border-dashed border-grey-400">
                <div className={`bg-primary-lighter rounded-md ${space.class} border-2 border-dashed border-primary-main`}>
                  <div className="bg-primary-main rounded-md h-6 text-center text-primary-contrast-text text-xs leading-6 font-medium">
                    Content Area
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Grid Layout Examples</h2>
        <div className="space-y-8">
          {/* Single Item Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Single Item Grid</CardTitle>
              <CardDescription>grid-cols-1 with gap-4 spacing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 border-2 border-dashed border-grey-300 p-4 rounded-lg">
                <div className="bg-primary-lighter border border-primary-light rounded-lg p-6 text-center text-primary-main font-medium relative">
                  <span className="absolute top-2 left-2 text-xs bg-primary-main text-primary-contrast-text px-2 py-1 rounded">gap-4</span>
                  Single Grid Item (100% width)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two Items Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Two Items Grid (50/50)</CardTitle>
              <CardDescription>grid-cols-2 with gap-4 spacing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 border-2 border-dashed border-grey-300 p-4 rounded-lg">
                {[1, 2].map((item) => (
                  <div key={item} className="bg-primary-lighter border border-primary-light rounded-lg p-6 text-center text-primary-main font-medium relative">
                    {item === 1 && <span className="absolute top-2 left-2 text-xs bg-primary-main text-primary-contrast-text px-2 py-1 rounded">gap-4</span>}
                    Item {item} (50% width)
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Three Items Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Three Items Grid (Equal Thirds)</CardTitle>
              <CardDescription>grid-cols-3 with gap-4 spacing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 border-2 border-dashed border-grey-300 p-4 rounded-lg">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-primary-lighter border border-primary-light rounded-lg p-4 text-center text-primary-main font-medium relative">
                    {item === 1 && <span className="absolute top-1 left-1 text-xs bg-primary-main text-primary-contrast-text px-1 py-0.5 rounded">gap-4</span>}
                    Item {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Four Items Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Four Items Grid</CardTitle>
              <CardDescription>grid-cols-2 lg:grid-cols-4 with gap-4 spacing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-2 border-dashed border-grey-300 p-4 rounded-lg">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-primary-lighter border border-primary-light rounded-lg p-4 text-center text-primary-main font-medium relative">
                    {item === 1 && <span className="absolute top-1 left-1 text-xs bg-primary-main text-primary-contrast-text px-1 py-0.5 rounded">gap-4</span>}
                    Item {item}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Card with Padding Visualization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "Standard Card", padding: "p-6", token: "--space-6", pixels: "24px" },
            { name: "Compact Card", padding: "p-4", token: "--space-4", pixels: "16px" },
          ].map((card) => (
            <Card key={card.name} className="border-2 border-dashed border-primary-light">
              <CardHeader className={`${card.padding} border-2 border-dashed border-grey-400 bg-grey-100`}>
                <CardTitle className="text-lg flex items-center gap-2">
                  {card.name}
                  <span className="text-xs font-mono bg-primary-main text-primary-contrast-text px-2 py-1 rounded">
                    {card.token}
                  </span>
                </CardTitle>
                <CardDescription>
                  Using {card.padding} class ({card.pixels} padding)
                </CardDescription>
              </CardHeader>
              <CardContent className={`${card.padding} border-2 border-dashed border-success-light bg-success-lighter`}>
                <p className="text-grey-700">
                  Content area showing the visual padding space around text and elements.
                </p>
              </CardContent>
            </Card>
          ))}
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
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Button Groups & Selection</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-grey-800 mb-3">Simple Button Group</h3>
            <div className="flex gap-2">
              <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Primary</Button>
              <Button variant="outline">Secondary</Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-grey-800 mb-3">Radio Button Selection</h3>
            <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="flex gap-4">
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

          <div>
            <h3 className="text-lg font-medium text-grey-800 mb-3">Multi-Selection</h3>
            <div className="flex flex-wrap gap-2">
              {["Option A", "Option B", "Option C", "Option D"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox 
                    id={option}
                    checked={selectedMultiple.includes(option)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedMultiple([...selectedMultiple, option]);
                      } else {
                        setSelectedMultiple(selectedMultiple.filter(item => item !== option));
                      }
                    }}
                  />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStatusBadges = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Invoice Status Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "Paid",
            "Pending Action", 
            "Settled",
            "Rejected by Buyer",
            "Rejected by Monto",
            "Approved by Buyer",
            "RTP Prepared",
            "RTP Sent",
            "Awaiting SC",
            "External Submission",
            "Partially Settled",
            "Excluded"
          ].map((status) => (
            <div key={status} className="space-y-2 p-3 border border-grey-300 rounded-lg bg-background-paper">
              <StatusBadge status={status as any} />
              <p className="text-xs text-grey-600">{status}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Smart Connection Status Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "Live",
            "Inactive", 
            "Disconnected",
            "In Process",
            "Unavailable"
          ].map((status) => (
            <div key={status} className="space-y-2 p-3 border border-grey-300 rounded-lg bg-background-paper">
              <SmartConnectionStatusBadge status={status as "Live" | "Inactive" | "Disconnected" | "In Process" | "Unavailable"} />
              <p className="text-xs text-grey-600">{status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabNavigation = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Tabs</h2>
        <div className="bg-background-paper border border-grey-300 rounded-lg p-6">
          <InvoiceTabs
            tabs={[
              { id: "all", label: "All RTPs", count: 1234 },
              { id: "pending", label: "Pending Action", count: 43 },
              { id: "overdue", label: "Overdue", count: 12 },
              { id: "settled", label: "Settled", count: 856 },
            ]}
            activeTab={activeInvoiceTab}
            onTabChange={setActiveInvoiceTab}
          />
          
          <div className="mt-4 p-4 bg-grey-200 rounded-lg">
            <p className="text-sm text-grey-700">
              <strong>Active Tab:</strong> {activeInvoiceTab} - This matches the exact styling from the /invoices page with proper underlines, counts, and hover states.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFilterComponents = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Filter Components</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Interactive Filter System</CardTitle>
            <CardDescription>Functional filters with state management and removable chips</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <FilterDropdown
                label="Status"
                value={filters.status}
                options={["All", "Paid", "Pending Action", "Settled", "Rejected by Buyer", "Approved by Buyer"]}
                onSelect={(value) => handleFilterChange("status", value)}
                multiSelect
              />
              
              <FilterDropdown
                label="Portal"
                value={filters.portal}
                options={["All", "Ariba", "Coupa", "Oracle", "Concur", "Bill"]}
                onSelect={(value) => handleFilterChange("portal", value)}
                multiSelect
                searchable
              />
              
              <FilterDropdown
                label="Buyer"
                value={filters.buyer}
                options={["All", "Acme Corp", "Global Inc", "Tech Solutions", "Manufacturing Co"]}
                onSelect={(value) => handleFilterChange("buyer", value)}
                multiSelect
                searchable
              />
              
              <FilterDropdown
                label="Owner"
                value={filters.owner}
                options={["All", "John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"]}
                onSelect={(value) => handleFilterChange("owner", value)}
              />
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-400 h-4 w-4" />
                <Input
                  placeholder="Search invoices..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                  className="pl-10 w-64 h-9 border border-grey-400 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-main focus:border-primary-main"
                />
              </div>
            </div>
            
            {/* Active Filters */}
            <ActiveFiltersList 
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
            />
            
            {/* Filter Description */}
            <div className="text-sm text-grey-600 bg-grey-200 p-4 rounded-lg">
              <h4 className="font-medium text-grey-800 mb-2">How Filters Work:</h4>
              <ul className="space-y-1">
                <li>• Select multiple values in dropdown filters</li>
                <li>• Use search to find specific invoices</li>
                <li>• Click filter chips to remove them</li>
                <li>• Filters are applied in real-time</li>
                <li>• Combine multiple filters for precise results</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderTableSystem = () => {
    const sampleData = [
      { id: 1, number: "INV-001", buyer: "Acme Corp", status: "Paid", portal: "Ariba", total: 250000, owner: "John Doe" },
      { id: 2, number: "INV-002", buyer: "Global Inc", status: "Pending Action", portal: "Coupa", total: 150000, owner: "Jane Smith" },
      { id: 3, number: "INV-003", buyer: "Tech Solutions", status: "Settled", portal: "Oracle", total: 350000, owner: "Mike Johnson" },
      { id: 4, number: "INV-004", buyer: "Manufacturing Co", status: "Rejected by Buyer", portal: "Bill", total: 125000, owner: "Sarah Wilson" },
    ];

    const renderSortButton = (field: string, label: string) => {
      const isActive = sortField === field;
      const SortIcon = !isActive ? ArrowUpDown : sortDirection === 'asc' ? ArrowUp : ArrowDown;
      
      return (
        <button
          onClick={() => handleSort(field)}
          className="flex items-center gap-2 hover:text-grey-900 transition-colors"
          aria-label={`Sort by ${label}`}
        >
          {label}
          <SortIcon className="h-4 w-4" />
        </button>
      );
    };

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Table System</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Interactive Data Table</CardTitle>
              <CardDescription>Full-featured table with sorting, hover effects, and proper styling</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border overflow-hidden bg-background-paper">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
                        <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-grey-200">
                          {renderSortButton('number', 'Invoice Number')}
                        </TableHead>
                        <TableHead>
                          {renderSortButton('buyer', 'Buyer')}
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Portal</TableHead>
                        <TableHead>
                          {renderSortButton('total', 'Total')}
                        </TableHead>
                        <TableHead>
                          {renderSortButton('owner', 'Owner')}
                        </TableHead>
                        <TableHead className="w-[80px] text-center">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    
                    <TableBody className="divide-y divide-grey-100">
                      {sampleData.map((item) => (
                        <TableRow key={item.id} className="h-[65px] hover:bg-grey-50 cursor-pointer transition-colors">
                          <TableCell className="sticky left-0 z-10 bg-background-paper border-r border-grey-200 font-medium">
                            {item.number}
                          </TableCell>
                          <TableCell>{item.buyer}</TableCell>
                          <TableCell>
                            <StatusBadge status={item.status as any} />
                          </TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-grey-200 text-grey-700 rounded text-xs font-medium">
                              {item.portal}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium">
                            ${item.total.toLocaleString()}
                          </TableCell>
                          <TableCell>{item.owner}</TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-grey-600 bg-grey-200 p-4 rounded-lg">
                <h4 className="font-medium text-grey-800 mb-2">Table Features:</h4>
                <ul className="space-y-1">
                  <li>• Sortable columns with visual indicators</li>
                  <li>• Hover effects for better interactivity</li>
                  <li>• Sticky first column for horizontal scrolling</li>
                  <li>• Status badges with proper styling</li>
                  <li>• Action buttons with vertical kebab menu (⋮)</li>
                  <li>• Proper spacing and typography</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderFormElements = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Form Elements</h2>
        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
            <CardDescription>A functional form example with proper focus styles</CardDescription>
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
                  className="border-grey-400 focus:border-primary-main"
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
                  className="border-grey-400 focus:border-primary-main"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger className="border-grey-400 focus:border-primary-main">
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
                className="border-grey-400 focus:border-primary-main min-h-[100px]"
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
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Input Focus States</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Default State</Label>
            <Input placeholder="Default input" className="border-grey-400" />
            <p className="text-xs text-grey-500">No focus - grey border</p>
          </div>
          <div className="space-y-2">
            <Label>Focus State (Single Border)</Label>
            <Input placeholder="Focused input" className="border-primary-main" />
            <p className="text-xs text-grey-500">Active focus - single primary border</p>
          </div>
          <div className="space-y-2">
            <Label>Error State</Label>
            <Input placeholder="Invalid input" className="border-error-main focus:border-error-main" />
            <p className="text-xs text-error-main">This field is required</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLayoutComponents = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Layout Components</h2>
        
        <div className="space-y-8">
          {/* Page Header */}
          <Card>
            <CardHeader>
              <CardTitle>Page Header</CardTitle>
              <CardDescription>Standard page header with back button, title, and action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-grey-300 rounded-lg p-4 bg-grey-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                      <h1 className="text-xl font-semibold text-grey-900">Invoice Detail</h1>
                      <p className="text-sm text-grey-600">INV-2024-001 • Due March 15, 2024</p>
                    </div>
                  </div>
                  <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resizable Panel Group */}
          <Card>
            <CardHeader>
              <CardTitle>Resizable Panel Group</CardTitle>
              <CardDescription>Used in detail pages for flexible layouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 border border-grey-300 rounded-lg overflow-hidden">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full p-4 bg-primary-lighter">
                      <h3 className="font-medium text-primary-main mb-2">Left Panel</h3>
                      <p className="text-sm text-grey-700">Invoice details and information would go here. This panel is resizable.</p>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50} minSize={30}>
                    <div className="h-full p-4 bg-success-lighter">
                      <h3 className="font-medium text-success-main mb-2">Right Panel</h3>
                      <p className="text-sm text-grey-700">PDF viewer or additional content would go here. Drag the handle to resize.</p>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </CardContent>
          </Card>

          {/* Action Bar / Sticky Footer */}
          <Card>
            <CardHeader>
              <CardTitle>Sticky Action Bar</CardTitle>
              <CardDescription>Bottom action bar for forms and detail pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-grey-300 rounded-lg p-4 bg-grey-50">
                <div className="flex items-center justify-between p-4 bg-background-paper border border-grey-300 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-grey-600">2 items selected</span>
                    <Badge variant="secondary">Changes pending</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Cancel</Button>
                    <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Alert Components</h2>
        
        <div className="space-y-6">
          {/* Info Alert */}
          <Alert className="border-info-main bg-info-lighter">
            <Info className="h-4 w-4 text-info-main" />
            <AlertTitle className="text-info-main">Information</AlertTitle>
            <AlertDescription className="text-info-dark">
              This is an informational alert. It provides helpful context or guidance to users.
            </AlertDescription>
          </Alert>

          {/* Success Alert */}
          <Alert className="border-success-main bg-success-lighter">
            <CheckCircle className="h-4 w-4 text-success-main" />
            <AlertTitle className="text-success-main">Success</AlertTitle>
            <AlertDescription className="text-success-dark">
              Operation completed successfully! Your changes have been saved.
            </AlertDescription>
          </Alert>

          {/* Warning Alert */}
          <Alert className="border-warning-main bg-warning-lighter">
            <AlertTriangle className="h-4 w-4 text-warning-main" />
            <AlertTitle className="text-warning-main">Warning</AlertTitle>
            <AlertDescription className="text-warning-dark">
              Please review this action carefully before proceeding. This may affect other invoices.
            </AlertDescription>
          </Alert>

          {/* Error Alert */}
          <Alert className="border-error-main bg-error-lighter">
            <AlertCircle className="h-4 w-4 text-error-main" />
            <AlertTitle className="text-error-main">Error</AlertTitle>
            <AlertDescription className="text-error-dark">
              An error occurred while processing your request. Please try again.
            </AlertDescription>
          </Alert>

          {/* Dismissable Alert */}
          <Alert className="border-info-main bg-info-lighter relative">
            <Info className="h-4 w-4 text-info-main" />
            <AlertTitle className="text-info-main">Dismissable Alert</AlertTitle>
            <AlertDescription className="text-info-dark">
              This alert can be dismissed by clicking the X button.
            </AlertDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute top-2 right-2 h-6 w-6 p-0 text-info-main hover:bg-info-main hover:text-info-contrast-text"
              onClick={() => toast({ title: "Alert dismissed" })}
            >
              <X className="h-3 w-3" />
            </Button>
          </Alert>
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
            <Label className="text-sm font-medium mb-2 block">Basic Progress (Thin Style)</Label>
            <Progress value={33} className="bg-grey-200 h-2" />
            <p className="text-xs text-grey-600 mt-1">33% Complete</p>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Advanced Progress</Label>
            <Progress value={67} className="bg-grey-200 h-2" />
            <p className="text-xs text-grey-600 mt-1">67% Complete</p>
          </div>
          <div>
            <Label className="text-sm font-medium mb-2 block">Complete</Label>
            <Progress value={100} className="bg-grey-200 h-2" />
            <p className="text-xs text-grey-600 mt-1">100% Complete</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Step Progress with Numbered Steps</h2>
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

  const renderBreadcrumbs = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Breadcrumb Navigation</h2>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Two Level Breadcrumb</CardTitle>
              <CardDescription>Basic navigation with home and current page</CardDescription>
            </CardHeader>
            <CardContent>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                      <Home className="h-4 w-4" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-grey-900 font-medium">Invoices</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Three Level Breadcrumb</CardTitle>
              <CardDescription>Navigation showing section hierarchy</CardDescription>
            </CardHeader>
            <CardContent>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                      <Home className="h-4 w-4" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                      Invoices
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-grey-900 font-medium">Pending Action</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Four Level Breadcrumb</CardTitle>
              <CardDescription>Deep navigation with detailed hierarchy</CardDescription>
            </CardHeader>
            <CardContent>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                      <Home className="h-4 w-4" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                      Invoices
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                      Pending Action
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-grey-900 font-medium">INV-2024-001</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </CardContent>
          </Card>
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

  const renderBrandAssets = () => {
    const copyMontoLogoSVG = () => {
      const svg = `<svg viewBox="0 0 120 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8h4v20H8V8zm8 0h4l6 12 6-12h4v20h-4V16l-6 12-6-12v12h-4V8zm28 0h4v16h8v4H44V8zm12 0h12v4h-8v4h6v4h-6v4h8v4H56V8z" fill="#7B59FF"/>
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
                  <MontoLogo className="h-8 w-auto text-primary-main" />
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
                  <MontoIcon className="h-8 w-auto text-primary-main" />
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

  const renderToastNotifications = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Toast Notifications</h2>
        <p className="text-grey-600 mb-4">Ephemeral messages providing feedback on an operation. They appear at the top right of the screen.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-background-paper p-6">
            <CardTitle className="mb-4">Default Toast</CardTitle>
            <CardDescription className="mb-4">A standard toast notification.</CardDescription>
            <Button
              onClick={() => toast({ title: "Event Scheduled", description: "Your meeting has been successfully scheduled." })}
              className="bg-primary-main text-primary-contrast-text hover:bg-primary-dark"
            >
              Show Default Toast
            </Button>
          </Card>
          <Card className="bg-background-paper p-6">
            <CardTitle className="mb-4">Success Toast</CardTitle>
            <CardDescription className="mb-4">A toast indicating a successful operation.</CardDescription>
            <Button
              onClick={() => toast({ title: "Success!", description: "Changes saved successfully.", variant: "success" })}
              className="bg-success-main text-primary-contrast-text hover:bg-success-dark"
            >
              Show Success Toast
            </Button>
          </Card>
          <Card className="bg-background-paper p-6">
            <CardTitle className="mb-4">Destructive Toast</CardTitle>
            <CardDescription className="mb-4">A toast for destructive actions.</CardDescription>
            <Button
              onClick={() => toast({ title: "Account Deleted", description: "Your account has been permanently deleted.", variant: "destructive" })}
              className="bg-error-main text-primary-contrast-text hover:bg-error-dark"
            >
              Show Destructive Toast
            </Button>
          </Card>
          <Card className="bg-background-paper p-6">
            <CardTitle className="mb-4">Info Toast</CardTitle>
            <CardDescription className="mb-4">A toast providing informative messages.</CardDescription>
            <Button
              onClick={() => toast({ title: "Heads Up!", description: "New updates are available for download.", variant: "info" })}
              className="bg-info-main text-primary-contrast-text hover:bg-info-dark"
            >
              Show Info Toast
            </Button>
          </Card>
          <Card className="bg-background-paper p-6">
            <CardTitle className="mb-4">Warning Toast</CardTitle>
            <CardDescription className="mb-4">A toast for warning messages.</CardDescription>
            <Button
              onClick={() => toast({ title: "Warning!", description: "Some data might be incomplete.", variant: "warning" })}
              className="bg-warning-main text-primary-contrast-text hover:bg-warning-dark"
            >
              Show Warning Toast
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderDropdowns = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Dropdowns</h2>
        <p className="text-grey-600 mb-4">Dropdown components for single and multiple selections.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-background-paper p-6">
            <CardTitle className="mb-4">Other Resolution Option Dropdown</CardTitle>
            <CardDescription className="mb-4">A dropdown with specific resolution options.</CardDescription>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="other-resolution-option">Other Resolution Options</Label>
              <Select onValueChange={setSelectedOption} value={selectedOption}>
                <SelectTrigger id="other-resolution-option" className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option-a">Option A</SelectItem>
                  <SelectItem value="option-b">Option B</SelectItem>
                  <SelectItem value="other">Other Resolution Option</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card className="bg-background-paper p-6">
            <CardTitle className="mb-4">Generic Dropdown</CardTitle>
            <CardDescription className="mb-4">A general purpose dropdown with various choices.</CardDescription>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="generic-dropdown">Choose an Item</Label>
              <Select onValueChange={setSelectedGenericOption} value={selectedGenericOption}>
                <SelectTrigger id="generic-dropdown" className="w-full">
                  <SelectValue placeholder="Select an item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="item-1">Item 1</SelectItem>
                  <SelectItem value="item-2">Item 2</SelectItem>
                  <SelectItem value="item-3">Item 3</SelectItem>
                  <SelectItem value="item-4">Item 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card className="bg-background-paper p-6">
            <CardTitle className="mb-4">Searchable Dropdown</CardTitle>
            <CardDescription className="mb-4">A dropdown with a search input for filtering options.</CardDescription>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="searchable-dropdown">Searchable Options</Label>
              <FilterDropdown
                label="Select a fruit"
                value={selectedSearchableOption || ""}
                options={["Apple", "Banana", "Cherry", "Date", "Grape", "Lemon", "Mango", "Orange", "Peach", "Pear", "Pineapple", "Strawberry", "Watermelon"]}
                onSelect={(value) => setSelectedSearchableOption(value as string)}
                multiSelect={false}
                searchable
              />
            </div>
          </Card>
          <Card className="bg-background-paper p-6">
            <CardTitle className="mb-4">Radio Button Dropdown</CardTitle>
            <CardDescription className="mb-4">A dropdown that uses radio buttons for selection.</CardDescription>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="radio-dropdown">Select an alignment</Label>
              <Select onValueChange={setSelectedRadioOption} value={selectedRadioOption}>
                <SelectTrigger id="radio-dropdown" className="w-full">
                  <SelectValue placeholder="Select an alignment" />
                </SelectTrigger>
                <SelectContent>
                  <RadioGroup onValueChange={setSelectedRadioOption} value={selectedRadioOption} className="p-1">
                    <div className="flex items-center space-x-2 p-1.5 hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer">
                      <RadioGroupItem value="left" id="left-radio" />
                      <Label htmlFor="left-radio">Left</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-1.5 hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer">
                      <RadioGroupItem value="center" id="center-radio" />
                      <Label htmlFor="center-radio">Center</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-1.5 hover:bg-accent hover:text-accent-foreground rounded-sm cursor-pointer">
                      <RadioGroupItem value="right" id="right-radio" />
                      <Label htmlFor="right-radio">Right</Label>
                    </div>
                  </RadioGroup>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "color-palette": return renderColorPalette();
      case "typography": return renderTypography();
      case "spacing-layout": return renderSpacingLayout();
      case "buttons": return renderButtons();
      case "status-badges": return renderStatusBadges();
      case "tab-navigation": return renderTabNavigation();
      case "filter-components": return renderFilterComponents();
      case "table-system": return renderTableSystem();
      case "form-elements": return renderFormElements();
      case "layout-components": return renderLayoutComponents();
      case "alerts": return renderAlerts();
      case "progress": return renderProgress();
      case "breadcrumbs": return renderBreadcrumbs();
      case "modals": return renderModals();
      case "brand-assets": return renderBrandAssets();
      case "toast-notifications": return renderToastNotifications();
      case "dropdowns": return renderDropdowns();
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
          <div className="mb-6 flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold text-grey-900">Design System Playground</h1>
          </div>
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
