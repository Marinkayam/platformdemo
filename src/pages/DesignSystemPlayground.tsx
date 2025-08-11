import React, { useState, useEffect } from 'react';
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
import { PaymentsRelationshipStatusBadge } from "@/components/payments-relationships/PaymentsRelationshipStatusBadge";
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown";
import { ActiveFiltersList } from "@/components/invoices/filters/ActiveFiltersList";
import { InvoiceFilters as InvoiceFiltersType } from "@/components/invoices/filters/types";
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
  Home,
  FileText,
  Building,
  Clock,
  ExternalLink,
  Users,
  TrendingUp,
  Database,
  Link2,
  Hash,
  Plug,
  MinusCircle,
  ArrowRight
} from 'lucide-react';
import { MontoLogo } from "@/components/MontoLogo";
import MontoIcon from "@/components/MontoIcon";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { RequestToPayTransactionHeader } from "@/components/ui/request-to-pay-transaction-header";
import { TableSystem } from "@/components/ui/TableSystem";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency, getPortalLogoUrl, formatOwnerName } from "@/lib/utils";
import { TabsNav } from "@/components/common/TabsNav";

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
  { id: "portal-logos", label: "Portal Logos", icon: <Building size={18} /> },
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

  // Badge system states
  const [badgeActiveTab, setBadgeActiveTab] = useState('components');

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
    search: "",
    userType: [],
    source: []
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

  // Preload portal logos
  useEffect(() => {
    const portalLogos = [
      "SAP Ariba", "Coupa", "Bill", "Oracle Procurement", "Amazon Payee", "Apple", "Tipalti"
    ];
    
    portalLogos.forEach(portal => {
      const img = new Image();
      img.src = getPortalLogoUrl(portal);
    });
  }, []);

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
            name="Status: Success" 
            description="For successful operations" 
            hex="#10B981" 
            className="bg-green-500" 
          />
          <ColorSwatch 
            name="Status: Warning" 
            description="For warnings or caution" 
            hex="#F59E0B" 
            className="bg-yellow-500" 
          />
          <ColorSwatch 
            name="Status: Error" 
            description="For errors or critical issues" 
            hex="#EF4444" 
            className="bg-red-500" 
          />
          <ColorSwatch 
            name="Status: Info" 
            description="For general information" 
            hex="#3B82F6" 
            className="bg-blue-500" 
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Grey Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ColorSwatch 
            name="grey-100" 
            description="Lightest grey for backgrounds" 
            hex="#F6F7F9" 
            className="bg-grey-100" 
          />
          <ColorSwatch 
            name="grey-200" 
            description="Light grey for borders and dividers" 
            hex="#E6E7EB" 
            className="bg-grey-200" 
          />
          <ColorSwatch 
            name="grey-300" 
            description="Medium grey for secondary text" 
            hex="#D3D6DB" 
            className="bg-grey-300" 
          />
          <ColorSwatch 
            name="grey-400" 
            description="Dark grey for text and icons" 
            hex="#B6B9BF" 
            className="bg-grey-400" 
          />
          <ColorSwatch 
            name="grey-500" 
            description="Darker grey for primary text" 
            hex="#818799" 
            className="bg-grey-500" 
          />
          <ColorSwatch 
            name="grey-600" 
            description="Darkest grey for headings" 
            hex="#545B6D" 
            className="bg-grey-600" 
          />
          <ColorSwatch 
            name="grey-700" 
            description="Very dark grey" 
            hex="#363A45" 
            className="bg-grey-700" 
          />
          <ColorSwatch 
            name="grey-800" 
            description="Almost black" 
            hex="#1F2128" 
            className="bg-grey-800" 
          />
          <ColorSwatch 
            name="grey-900" 
            description="True black" 
            hex="#000000" 
            className="bg-grey-900 text-white" 
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
          <TypographyExample variant="H1" example="Heading 1 Example" className="text-5xl font-extrabold" />
          <TypographyExample variant="H2" example="Heading 2 Example" className="text-4xl font-bold" />
          <TypographyExample variant="H3" example="Heading 3 Example" className="text-3xl font-semibold" />
          <TypographyExample variant="H4" example="Heading 4 Example" className="text-2xl font-semibold" />
          <TypographyExample variant="H5" example="Heading 5 Example" className="text-xl font-semibold" />
          <TypographyExample variant="H6" example="Heading 6 Example" className="text-lg font-semibold" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Body Text</h2>
        <div className="space-y-4">
          <TypographyExample variant="Lead" example="This is a lead paragraph for prominent text." className="text-xl text-grey-700" />
          <TypographyExample variant="Paragraph" example="This is a standard paragraph for general content." className="text-base text-grey-600" />
          <TypographyExample variant="Small" example="This is small text for secondary information." className="text-sm text-grey-500" />
          <TypographyExample variant="Extra Small" example="This is extra small text for fine print or captions." className="text-xs text-grey-400" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Links</h2>
        <div className="space-y-4">
          <TypographyExample variant="Link" example="This is a primary link example" className="text-primary-main hover:underline cursor-pointer" />
          <TypographyExample variant="Secondary Link" example="This is a secondary link example" className="text-grey-600 hover:text-primary-main hover:underline cursor-pointer" />
        </div>
      </div>
    </div>
  );

  const renderSpacingLayout = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Basic Spacing</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-primary-lighter p-4 rounded-md text-primary-darker font-medium text-center">
            <p className="mb-2">Small (p-4)</p>
            <div className="w-12 h-12 bg-primary-light mx-auto rounded-md"></div>
          </div>
          <div className="bg-primary-lighter p-6 rounded-md text-primary-darker font-medium text-center">
            <p className="mb-2">Medium (p-6)</p>
            <div className="w-16 h-16 bg-primary-light mx-auto rounded-md"></div>
          </div>
          <div className="bg-primary-lighter p-8 rounded-md text-primary-darker font-medium text-center">
            <p className="mb-2">Large (p-8)</p>
            <div className="w-20 h-20 bg-primary-light mx-auto rounded-md"></div>
          </div>
          <div className="bg-primary-lighter p-10 rounded-md text-primary-darker font-medium text-center">
            <p className="mb-2">Extra Large (p-10)</p>
            <div className="w-24 h-24 bg-primary-light mx-auto rounded-md"></div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Gap Spacing</h2>
        <div className="space-y-4">
          <p className="font-medium text-grey-800">Gap-2</p>
          <div className="flex gap-2 p-4 bg-grey-100 rounded-md">
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
          </div>

          <p className="font-medium text-grey-800">Gap-4</p>
          <div className="flex gap-4 p-4 bg-grey-100 rounded-md">
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
          </div>

          <p className="font-medium text-grey-800">Gap-8</p>
          <div className="flex gap-8 p-4 bg-grey-100 rounded-md">
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Margin Spacing</h2>
        <div className="space-y-4">
          <div className="bg-grey-100 p-4 rounded-md">
            <div className="w-24 h-12 bg-primary-light rounded-md mx-auto mb-4"></div>
            <p className="text-sm text-grey-700 text-center">Element with mb-4</p>
          </div>
          <div className="bg-grey-100 p-4 rounded-md">
            <div className="w-24 h-12 bg-primary-light rounded-md mx-auto mt-6"></div>
            <p className="text-sm text-grey-700 text-center">Element with mt-6</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderButtons = () => {
    const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      toast({ title: "Copied to clipboard", description: `Code copied!` });
    };

    const CodeBlock = ({ code }: { code: string }) => (
      <div className="relative bg-white rounded-md p-3 border border-grey-200 mt-3">
        <pre className="text-xs text-grey-800 font-mono overflow-x-auto whitespace-pre-wrap pr-8">
          <code>{code}</code>
        </pre>
        <button
          onClick={() => copyToClipboard(code)}
          className="absolute top-1.5 right-1.5 p-1 hover:bg-grey-200 rounded-md transition-colors"
        >
          <Copy size={14} className="text-grey-500" />
        </button>
      </div>
    );
    
    return (
      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Primary Buttons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            <div>
              <Button>Primary Button</Button>
              <CodeBlock code={`<Button>Primary Button</Button>`} />
            </div>
            <div>
              <Button disabled>Primary Disabled</Button>
              <CodeBlock code={`<Button disabled>Primary Disabled</Button>`} />
            </div>
            <div>
              <Button variant="outline" className="border-primary-main text-primary-main hover:bg-primary-lighter hover:text-primary-main">Primary Outline</Button>
              <CodeBlock code={`<Button variant="outline" className="border-primary-main text-primary-main hover:bg-primary-lighter hover:text-primary-main">\n  Primary Outline\n</Button>`} />
            </div>
            <div>
              <Button variant="ghost" className="text-primary-main hover:bg-primary-lighter">Primary Ghost</Button>
              <CodeBlock code={`<Button variant="ghost" className="text-primary-main hover:bg-primary-lighter">\n  Primary Ghost\n</Button>`} />
            </div>
            <div>
              <Button variant="link">Primary Link</Button>
              <CodeBlock code={`<Button variant="link">Primary Link</Button>`} />
            </div>
            <div>
              <Button size="sm">Small Button</Button>
              <CodeBlock code={`<Button size="sm">Small Button</Button>`} />
            </div>
            <div>
              <Button size="lg">Large Button</Button>
              <CodeBlock code={`<Button size="lg">Large Button</Button>`} />
            </div>
            <div>
              <Button size="icon"><Search /></Button>
              <CodeBlock code={`<Button size="icon">\n  <Search />\n</Button>`} />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Secondary Buttons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            <div>
              <Button variant="secondary">Secondary Button</Button>
              <CodeBlock code={`<Button variant="secondary">\n  Secondary Button\n</Button>`} />
            </div>
            <div>
              <Button variant="secondary" disabled>Secondary Disabled</Button>
              <CodeBlock code={`<Button variant="secondary" disabled>\n  Secondary Disabled\n</Button>`} />
            </div>
            <div>
              <Button variant="outline">Secondary Outline</Button>
              <CodeBlock code={`<Button variant="outline">\n  Secondary Outline\n</Button>`} />
            </div>
            <div>
              <Button variant="ghost">Secondary Ghost</Button>
              <CodeBlock code={`<Button variant="ghost">Secondary Ghost</Button>`} />
            </div>
            <div>
              <Button variant="link" className="text-grey-700">Secondary Link</Button>
              <CodeBlock code={`<Button variant="link" className="text-grey-700">\n  Secondary Link\n</Button>`} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Destructive Buttons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
            <div>
              <Button variant="destructive">Destructive Button</Button>
              <CodeBlock code={`<Button variant="destructive">\n  Destructive Button\n</Button>`} />
            </div>
            <div>
              <Button variant="destructive" disabled>Destructive Disabled</Button>
              <CodeBlock code={`<Button variant="destructive" disabled>\n  Destructive Disabled\n</Button>`} />
            </div>
            <div>
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500">Destructive Outline</Button>
              <CodeBlock code={`<Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500">\n  Destructive Outline\n</Button>`} />
            </div>
            <div>
              <Button variant="ghost" className="text-red-500 hover:bg-red-50">Destructive Ghost</Button>
              <CodeBlock code={`<Button variant="ghost" className="text-red-500 hover:bg-red-50">\n  Destructive Ghost\n</Button>`} />
            </div>
            <div>
              <Button variant="link" className="text-red-500">Destructive Link</Button>
              <CodeBlock code={`<Button variant="link" className="text-red-500">\n  Destructive Link\n</Button>`} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStatusBadges = () => {

    // Badge Style Functions
    const renderBadge = (text, color, bg, borderColor) => (
      <span 
        className="inline-flex items-center px-3 py-1 rounded-full font-medium border"
        style={{ 
          color: color, 
          backgroundColor: bg, 
          borderColor: borderColor || color + '33',
          fontSize: '12px'
        }}
      >
        {text}
      </span>
    );

    const renderBadgeNoBorder = (text, color, bg) => (
      <span 
        className="inline-flex items-center px-3 py-1 rounded-full font-medium"
        style={{ 
          color: color, 
          backgroundColor: bg,
          fontSize: '12px'
        }}
      >
        {text}
      </span>
    );

    // Primary Color System
    const primaryColors = [
      { name: 'Success', hex: '#007737', usage: 'Positive states', icon: Check },
      { name: 'Error', hex: '#DF1C41', usage: 'Error states', icon: X },
      { name: 'Warning', hex: '#D48806', usage: 'Processing/Pending', icon: AlertCircle },
      { name: 'Info', hex: '#1750FB', usage: 'Information', icon: Info },
      { name: 'Neutral', hex: '#9CA3AF', usage: 'Inactive states', icon: Clock },
      { name: 'Processing', hex: '#7B59FF', usage: 'Primary brand', icon: Zap },
      { name: 'Black', hex: '#000000', usage: 'Excluded', icon: MinusCircle }
    ];

    // Custom Brand Colors
    const brandColors = [
      { purpose: 'Primary Brand', hex: '#7B59FF', usage: 'Purple theme color' },
      { purpose: 'Text Primary', hex: '#38415F', usage: 'Main text color' },
      { purpose: 'Text Secondary', hex: '#8C92A3', usage: 'Secondary text' },
      { purpose: 'Info Background', hex: '#EBF1FF', usage: 'Light blue background' },
      { purpose: 'Info Border', hex: '#C7D9FF', usage: 'Light blue border' },
      { purpose: 'Info Text', hex: '#253EA7', usage: 'Dark blue text' }
    ];

    // Badge Components with their statuses
    const badgeComponents = [
      {
        name: 'StatusBadge (Main)',
        path: 'src/components/ui/status-badge.tsx',
        count: '32+',
        icon: Hash,
        categories: [
          { type: 'Success', color: '#007737', bg: '#E6F4EA', statuses: ['Paid', 'Settled', 'Partially Settled', 'Live', 'Connected', 'New', 'Fully Invoiced', 'Partially Invoiced'] },
          { type: 'Error', color: '#DF1C41', bg: '#FFEBEE', statuses: ['Rejected By Buyer', 'Disconnected', 'Error', 'Unavailable', 'Pending Action'] },
          { type: 'Warning', color: '#D48806', bg: '#FFF8E1', statuses: ['In Process', 'Validating', 'Building', 'Approved By Buyer'] },
          { type: 'Info', color: '#1750FB', bg: '#E3F2FD', statuses: ['External Submission'] },
          { type: 'Neutral', color: '#9CA3AF', bg: '#F3F4F6', statuses: ['Inactive'] },
          { type: 'Processing', color: '#7B59FF', bg: '#F3E8FF', statuses: ['Rtp Prepared', 'Rtp Sent', 'Awaiting Sc', 'Rejected By Monto'] },
          { type: 'Black', color: '#000000', bg: '#E5E7EB', statuses: ['Excluded'] }
        ]
      },
      {
        name: 'Purchase Order StatusBadge',
        path: 'src/components/common/StatusBadge.tsx',
        icon: Database,
        statuses: ['New', 'Pending Approval', 'Rejected', 'Cancelled', 'Partially Invoiced', 'Fully Invoiced'],
        customColors: true
      },
      {
        name: 'AgentUserTypeBadge',
        path: 'src/components/ui/agent-user-type-badge.tsx',
        icon: Users,
        statuses: ['Monto', 'Customer'],
        customColors: true
      },
      {
        name: 'PaymentHabitBadge',
        path: 'src/components/insights/PaymentHabitBadge.tsx',
        icon: TrendingUp,
        statuses: ['Excellent', 'Good', 'Fair', 'Poor']
      },
      {
        name: 'PortalStatusBadge',
        path: 'src/components/portal-records/PortalStatusBadge.tsx',
        icon: ExternalLink,
        statuses: ['Active', 'Inactive', 'Pending', 'Error'],
        customColors: true
      },
      {
        name: 'MatchTypeBadge',
        path: 'src/components/portal-records/MatchTypeBadge.tsx',
        icon: Link2,
        statuses: ['Primary', 'Alternate', 'Unmatched', 'Conflict'],
        customColors: true
      },
      {
        name: 'Integration Hub Status',
        path: 'src/components/workspace/integration-hub/IntegrationCenterNew.tsx',
        icon: Plug,
        statuses: ['Connected', 'Coming Soon'],
        customColors: true
      }
    ];

    return (
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-grey-900 mb-3">Badge System Visual Dashboard</h1>
          <p className="text-lg text-grey-600 mb-2">Comprehensive overview of all badge components and color systems</p>
          <p className="text-sm text-grey-500">View component definitions and live badge examples.</p>
        </div>

        {/* TabsNav for Badge Dashboard */}
        <div className="bg-white rounded-lg mb-8 max-w-md">
          <TabsNav
            activeTab={badgeActiveTab}
            onTabChange={setBadgeActiveTab}
            tabs={[
              { id: "components", label: "Components & Colors" },
              { id: "examples", label: "Badge Examples" },
            ]}
          />
        </div>

        {/* Content */}
        {badgeActiveTab === 'components' && (
          <div className="space-y-8">


            {/* Badge Components */}
            <h2 className="text-2xl font-semibold mb-6">Badge Components & Their Statuses</h2>
            {badgeComponents.map((component) => {
              const Icon = component.icon;
              return (
                <div key={component.name} className="bg-white rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Icon className="mr-3 text-grey-400" size={24} />
                    <div>
                      <h3 className="text-xl font-semibold">{component.name}</h3>
                      <p className="text-sm text-grey-500">{component.path}</p>
                    </div>
                    {component.count && (
                      <span className="ml-auto bg-primary-lighter text-primary-dark px-3 py-1 rounded-full text-sm font-medium">
                        {component.count} statuses
                      </span>
                    )}
                  </div>
                  
                  {component.categories ? (
                    <div className="space-y-3">
                      {component.categories.map((category) => (
                        <div key={category.type} className="border border-grey-200 rounded-xl p-4">
                          <h4 className="font-medium mb-2 flex items-center">
                            <span 
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: category.color }}
                            />
                            {category.type}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {category.statuses.map((status) => 
                              renderBadgeNoBorder(status, category.color, category.bg)
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {component.name === 'AgentUserTypeBadge' ? (
                        <>
                          {renderBadgeNoBorder('Monto', '#7B59FF', '#F3E8FF')}
                          {renderBadgeNoBorder('Customer', '#1750FB', '#E3F2FD')}
                        </>
                      ) : component.name === 'Purchase Order StatusBadge' ? (
                        <> 
                          {renderBadgeNoBorder('New', '#7B59FF', '#F3E8FF')}
                          {renderBadgeNoBorder('Pending Approval', '#D48806', '#FFF8E1')}
                          {renderBadgeNoBorder('Rejected', '#DF1C41', '#FFEBEE')}
                          {renderBadgeNoBorder('Cancelled', '#9CA3AF', '#F3F4F6')}
                          {renderBadgeNoBorder('Partially Invoiced', '#007737', '#E6F4EA')}
                          {renderBadgeNoBorder('Fully Invoiced', '#007737', '#E6F4EA')}
                        </>
                      ) : component.name === 'PortalStatusBadge' ? (
                        <>
                          {renderBadgeNoBorder('Active', '#007737', '#E6F4EA')}
                          {renderBadgeNoBorder('Inactive', '#9CA3AF', '#F3F4F6')}
                          {renderBadgeNoBorder('Pending', '#D48806', '#FFF8E1')}
                          {renderBadgeNoBorder('Error', '#DF1C41', '#FFEBEE')}
                        </>
                      ) : component.name === 'MatchTypeBadge' ? (
                        <>
                          {renderBadgeNoBorder('Primary', '#7B59FF', '#F3E8FF')}
                          {renderBadgeNoBorder('Alternate', '#253EA7', '#EBF1FF')}
                          {renderBadgeNoBorder('Unmatched', '#253EA7', '#EBF1FF')}
                          {renderBadgeNoBorder('Conflict', '#253EA7', '#EBF1FF')}
                        </>
                      ) : component.name === 'Integration Hub Status' ? (
                        <>
                          {renderBadgeNoBorder('Connected', '#007737', '#E6F4EA')}
                          {renderBadgeNoBorder('Coming Soon', '#9CA3AF', '#F3F4F6')}
                        </>
                      ) : (
                        component.statuses.map((status, index) => 
                          renderBadgeNoBorder(
                            status, 
                            primaryColors[index % primaryColors.length].hex,
                            primaryColors[index % primaryColors.length].hex + '20'
                          )
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {badgeActiveTab === 'examples' && (
          <div className="space-y-10">
            {/* Badge Border Comparison */}
            <div className="bg-white rounded-xl p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-grey-800">All Badge Examples</h2>
              </div>
              
              <div className="space-y-6">
                {/* Success States */}
                <div>
                  <h3 className="font-medium text-green-700 mb-3">Success States</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Paid', 'Settled', 'Live', 'Connected', 'New'].map(status => 
                      renderBadgeNoBorder(status, '#007737', '#E6F4EA')
                    )}
                  </div>
                </div>

                {/* Error States */}
                <div>
                  <h3 className="font-medium text-red-700 mb-3">Error States</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Rejected By Buyer', 'Disconnected', 'Error', 'Unavailable'].map(status => 
                      renderBadgeNoBorder(status, '#DF1C41', '#FFEBEE')
                    )}
                  </div>
                </div>

                {/* Processing States */}
                <div>
                  <h3 className="font-medium text-purple-700 mb-3">Processing States</h3>
                  <div className="flex flex-wrap gap-3">
                    {['Rtp Prepared', 'Rtp Sent', 'Awaiting Sc', 'Rejected By Monto'].map(status => 
                      renderBadgeNoBorder(status, '#7B59FF', '#F3E8FF')
                    )}
                  </div>
                </div>

                {/* Warning States */}
                <div>
                  <h3 className="font-medium text-orange-700 mb-3">Warning States</h3>
                  <div className="flex flex-wrap gap-3">
                    {['In Process', 'Validating', 'Building', 'Approved By Buyer'].map(status => 
                      renderBadgeNoBorder(status, '#D48806', '#FFF8E1')
                    )}
                  </div>
                </div>

                {/* Secondary Statuses (Outline) */}
                <div>
                  <h3 className="font-medium text-grey-800 mb-3">Secondary Statuses (Outline)</h3>
                  <div className="flex flex-wrap gap-3">
                    {renderBadge('Missing Credentials', '#DF1C41', 'transparent', '#DF1C4133')}
                    {renderBadge('Authentication Failed', '#DF1C41', 'transparent', '#DF1C4133')}
                    {renderBadge('Configuration Error', '#DF1C41', 'transparent', '#DF1C4133')}
                    {renderBadge('Auto-created from RTP', '#7B59FF', 'transparent', '#E1D6F9')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTabNavigation = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Tab Navigation</h2>
        <p className="text-sm text-grey-600 mb-4">❇️ TabsNav - The standardized navigation component for tabs across the application.</p>

        {/* Restored Invoice Tabs Example using TabsNav */}
        <div>
          <TabsNav
            activeTab={activeInvoiceTab}
            onTabChange={setActiveInvoiceTab}
            tabs={[
              { id: "all", label: "All RTPs", count: 22 },
              { id: "pending", label: "Pending Action", count: 6 },
              { id: "overdue", label: "Overdue", count: 22 },
              { id: "settled", label: "Settled", count: 7 },
            ]}
          />
        </div>
      </div>
    </div>
  );

  const renderFilterComponents = () => {
    const mockOptions = ["Option 1", "Option 2", "Option 3"];
    const mockPortals = ["SAP Ariba", "Coupa", "Bill", "Oracle Procurement"];
    const mockStatuses = ["Connected", "Validating", "Disconnected"];
    const mockUserTypes = ["Monto", "External"];
    const mockOwners = ["John Doe", "Jane Smith", "Mike Johnson"];

    return (
    <div className="space-y-8">
      <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Filter Dropdowns</h2>
          <div className="flex flex-wrap gap-4">
              <FilterDropdown
                label="Status"
              options={mockStatuses}
                value={filters.status}
              onSelect={(value) => handleFilterChange('status', value)}
                multiSelect
              />
              <FilterDropdown
                label="Portal"
              options={mockPortals}
                value={filters.portal}
              onSelect={(value) => handleFilterChange('portal', value)}
                multiSelect
                searchable
              />
              <FilterDropdown
              label="User Type"
              options={mockUserTypes}
              value={filters.userType as string[]}
              onSelect={(value) => handleFilterChange('userType', value)}
                multiSelect
              />
              <FilterDropdown
                label="Owner"
              options={mockOwners}
                value={filters.owner}
              onSelect={(value) => handleFilterChange('owner', value)}
              multiSelect
            />
            <FilterDropdown 
              label="Transaction Type"
              options={["Invoice", "Credit Memo", "All"]}
              value={filters.transactionType}
              onSelect={(value) => handleFilterChange('transactionType', value)}
                />
              </div>
            </div>
            
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Active Filters List</h2>
            <ActiveFiltersList 
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
            />
      </div>
    </div>
  );
  };

  const renderTableSystem = () => {
    // 🩷 Pink Heart Table Style - Premium table design system
    // Mock data for the table system, matching the RTP table structure
    interface InvoiceData {
      id: string;
      number: string;
      buyer: string;
      dueDate: string;
      status: "Paid" | "Pending Action" | "Awaiting SC" | "Rejected by Buyer" | "Settled";
      portal: string;
      total: number;
      currency: string;
      owner: string;
      isPendingTab?: boolean;
    }

    const sampleInvoices: InvoiceData[] = [
      {
        id: "1", number: "INV-40230612", buyer: "European Partners GmbH", dueDate: "2024-06-05",
        status: "Pending Action", portal: "SAP Ariba", total: 4250.80, currency: "EUR", owner: "Anna Mueller"
      },
      {
        id: "2", number: "INV-30230522", buyer: "NewCo Inc", dueDate: "2024-06-10",
        status: "Pending Action", portal: "SAP Ariba", total: 3350.00, currency: "USD", owner: "Jane Smith"
      },
      {
        id: "3", number: "INV-30230522", buyer: "Global Enterprises", dueDate: "2024-05-10",
        status: "Pending Action", portal: "Bill.com", total: 3200.75, currency: "USD", owner: "David Clark"
      },
      {
        id: "4", number: "INV-20230402", buyer: "Tech Solutions Ltd", dueDate: "2024-04-20",
        status: "Pending Action", portal: "Coupa", total: 1750.50, currency: "USD", owner: "Sarah Wilson"
      },
      {
        id: "5", number: "INV-10021301", buyer: "Acme Corporation", dueDate: "2024-04-15",
        status: "Pending Action", portal: "SAP Ariba", total: 2350.25, currency: "USD", owner: "John Doe"
      },
      {
        id: "6", number: "INV-10032100", buyer: "Tesla", dueDate: "2024-03-01",
        status: "Pending Action", portal: "Coupa", total: 18000.00, currency: "USD", owner: "Elon"
      },
      {
        id: "7", number: "INV-100121311", buyer: "Google", dueDate: "09/16/2024",
        status: "Awaiting SC", portal: "Tipalti", total: 15000.50, currency: "USD", owner: "Alice"
      },
      {
        id: "8", number: "INV-100121301", buyer: "Google", dueDate: "09/15/2024",
        status: "Paid", portal: "Amazon Payee", total: 45000.00, currency: "USD", owner: "Lady Gaga"
      },
      {
        id: "9", number: "INV-100121302", buyer: "Microsoft", dueDate: "09/15/2024",
        status: "Paid", portal: "Apple", total: 32150.75, currency: "USD", owner: "Lady Gaga"
      },
    ];

    const columns = [
      {
        key: 'number',
        label: 'Invoice Number',
        sticky: true,
        className: 'w-[180px]',
        render: (item: InvoiceData) => (
          <span className="font-semibold">{item.number}</span>
        ),
      },
      {
        key: 'buyer',
        label: 'Buyer',
        className: 'w-[180px]',
        render: (item: InvoiceData) => item.buyer,
      },
      {
        key: 'dueDate',
        label: 'Due Date',
        className: 'w-[150px]',
        render: (item: InvoiceData) => item.dueDate,
      },
      {
        key: 'status',
        label: 'Status',
        className: 'w-[120px] pr-4',
        render: (item: InvoiceData) => <StatusBadge status={item.status as any} />,
      },
      {
        key: 'portal',
        label: 'Portal',
        className: 'w-[200px]',
        render: (item: InvoiceData) => {
          const portalLogoUrl = getPortalLogoUrl(item.portal);
      return (
            <div className="flex items-center gap-2">
              <img
                src={portalLogoUrl}
                alt={`${item.portal} logo`}
                className="w-5 h-5 object-contain rounded-full"
                width={20}
                height={20}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/portal-logos/placeholder.svg';
                }}
              />
              <span className="font-medium text-gray-700">{item.portal}</span>
            </div>
          );
        },
      },
      {
        key: 'total',
        label: 'Total',
        className: 'w-[180px]',
        render: (item: InvoiceData) => formatCurrency(item.total, item.currency),
      },
      {
        key: 'owner',
        label: 'Owner',
        className: 'w-[150px]',
        render: (item: InvoiceData) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="truncate cursor-help">{formatOwnerName(item.owner)}</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{formatOwnerName(item.owner)}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      },
      {
        key: 'actions',
        label: 'Actions',
        className: 'w-[80px] text-center',
        render: (item: InvoiceData) => (
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        ),
      },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-2">Table System</h2>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-3xl">🩷</span>
            <span className="text-sm text-[#7B59FF] font-medium">Pink Heart Premium Style</span>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>🩷 Premium Data Table</CardTitle>
              <CardDescription>Full-featured table with our signature Pink Heart design system</CardDescription>
            </CardHeader>
            <CardContent>
              <TableSystem<InvoiceData> data={sampleInvoices} columns={columns} />
              
              <div className="mt-6 space-y-4">
                <div className="bg-[#F6F7F9] p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-[#061237] mb-3 flex items-center gap-2">
                    <span className="text-xl">🩷</span> Pink Heart Table Style Rules
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-medium text-[#7B59FF] mb-2">Structure & Layout</h5>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Container: <code className="text-xs bg-white px-1 py-0.5 rounded">rounded-xl border overflow-hidden bg-white</code></li>
                        <li>• Header: <code className="text-xs bg-white px-1 py-0.5 rounded">bg-[#F6F7F9]</code></li>
                        <li>• Header cells: <code className="text-xs bg-white px-1 py-0.5 rounded">h-[50px] font-semibold text-gray-700</code></li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-[#7B59FF] mb-2">Sticky First Column</h5>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Position: <code className="text-xs bg-white px-1 py-0.5 rounded">sticky left-0 z-10</code></li>
                        <li>• Background: <code className="text-xs bg-white px-1 py-0.5 rounded">bg-[rgb(246,247,249)]</code> for header</li>
                        <li>• Border: <code className="text-xs bg-white px-1 py-0.5 rounded">border-r border-gray-200</code></li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-[#7B59FF] mb-2">Typography</h5>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Regular: <code className="text-xs bg-white px-1 py-0.5 rounded">text-sm text-gray-900</code></li>
                        <li>• Clickable: <code className="text-xs bg-white px-1 py-0.5 rounded">cursor-pointer hover:underline</code></li>
                        <li>• INV-/CP- prefix: <code className="text-xs bg-white px-1 py-0.5 rounded">font-semibold</code></li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-[#7B59FF] mb-2">Interactive Elements</h5>
                      <ul className="space-y-1 text-gray-700">
                        <li>• Primary color: <code className="text-xs bg-white px-1 py-0.5 rounded">#7B59FF</code></li>
                        <li>• Hover states with underline</li>
                        <li>• Actions right-aligned</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 mb-2">💡 How to Use</h4>
                  <p className="text-sm text-purple-700">To apply this table style in any component, just mention "🩷" (pink heart) and I'll respond with "🩷🩷" to confirm I'm using this premium design system!</p>
                </div>
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

  const renderPortalLogos = () => {
    const portalLogos = [
      { name: "Amazon Payee", src: "/portal-logos/Amazon Payee.png" },
      { name: "Apple", src: "/portal-logos/apple.png" },
      { name: "Ariba", src: "/portal-logos/ariba.png" },
      { name: "AT&T", src: "/portal-logos/AT&T.png" },
      { name: "Bill", src: "/portal-logos/bill.png" },
      { name: "Coupa", src: "/portal-logos/coupa.png" },
      { name: "Facturaxion", src: "/portal-logos/Facturaxion.png" },
      { name: "Fieldglass", src: "/portal-logos/Fieldglass.png" },
      { name: "iSupplier", src: "/portal-logos/iSupplier.png" },
      { name: "Jagger", src: "/portal-logos/jagger.png" },
      { name: "KissFlow", src: "/portal-logos/KissFlow.png" },
      { name: "Oracle", src: "/portal-logos/oracle.png" },
      { name: "Qualcomm", src: "/portal-logos/Qualcomm.png" },
      { name: "Sainsburys", src: "/portal-logos/Sainsburys.png" },
      { name: "Segment", src: "/portal-logos/Segment.png" },
      { name: "Shopify", src: "/portal-logos/shopify.png" },
      { name: "StoreNext", src: "/portal-logos/StoreNext.png" },
      { name: "Taulia", src: "/portal-logos/taulia.png" },
      { name: "Teradata", src: "/portal-logos/Teradata.png" },
      { name: "Tipalti", src: "/portal-logos/tipalti.png" },
      { name: "Tungsten", src: "/portal-logos/tungsten.png" },
      { name: "Walmart", src: "/portal-logos/walmart.png" },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Portal Logos</h2>
          <p className="text-sm text-grey-600 mb-4">These are the various portal logos used throughout the application.</p>
        </div>
        <Card className="shadow-none">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {portalLogos.map((logo, index) => (
                <div key={index} className="flex flex-col items-center justify-center p-4 border border-grey-300 rounded-lg bg-background-paper">
                  <img src={logo.src} alt={`${logo.name} logo`} className="h-12 w-12 object-contain mb-2" />
                  <p className="text-sm font-medium text-grey-900 text-center">{logo.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderToastNotifications = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Toast Notifications</h2>
        <p className="text-sm text-grey-600 mb-4">Toasts provide brief, timely messages about app processes.</p>
        <p className="text-sm text-grey-600 font-semibold">Component Name: <code className="font-mono text-primary-main">Toast, useToast</code></p>
      </div>

      {/* Interactive Examples - Moved to top */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Interactive Examples</CardTitle>
          <CardDescription>Click buttons to see toast notifications in action</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  title: "Default Toast",
                  description: "This is a default toast notification.",
                })
              }
            >
              Default Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  variant: "success",
                  title: "Success!",
                  description: "Your changes have been saved.",
                })
              }
            >
              Success Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  variant: "info",
                  title: "Information",
                  description: "This is an informational message.",
                })
              }
            >
              Info Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  variant: "warning",
                  title: "Warning!",
                  description: "Something might be wrong.",
                })
              }
            >
              Warning Toast
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast({
                  variant: "destructive",
                  title: "Error!",
                  description: "Something went wrong.",
                })
              }
            >
              Error Toast
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Design Specifications with Visual Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Design Specifications & Visual Examples</CardTitle>
          <CardDescription>Complete styling details and visual representations of all toast variants</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-grey-900">Typography & Layout</h3>
            <div className="space-y-2 text-sm text-grey-600">
              <p><strong>Font Family:</strong> Inter (inherited from system)</p>
              <p><strong>Title Font:</strong> 14px, font-semibold (text-sm font-semibold)</p>
              <p><strong>Description Font:</strong> 14px, font-normal, 90% opacity (text-sm)</p>
              <p><strong>Container:</strong> max-width 420px, rounded-lg, padding 24px, shadow-lg</p>
              <p><strong>Position:</strong> Fixed top-0 sm:bottom-0 sm:right-0 with 16px padding</p>
              <p><strong>Animation:</strong> Slide-in from top (mobile) / bottom (desktop)</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-grey-900">Toast Variants</h3>
            
            {/* Default Toast */}
            <div className="border border-grey-300 rounded-lg p-4">
              <h4 className="font-medium text-grey-900 mb-2">Default Toast</h4>
              <div className="space-y-1 text-sm text-grey-600">
                <p><strong>Border:</strong> 1px solid #7B59FF (border-primary-main)</p>
                <p><strong>Background:</strong> #FFFFFF (bg-white)</p>
                <p><strong>Title Color:</strong> #38415F (text-grey-800)</p>
                <p><strong>Description Color:</strong> #38415F (text-grey-800)</p>
                <p><strong>Usage:</strong> General notifications and confirmations</p>
              </div>
            </div>

            {/* Success Toast with Visual Example */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border border-grey-300 rounded-lg p-4">
                <h4 className="font-medium text-grey-900 mb-3">Success Toast</h4>
                <div className="space-y-2 text-sm text-grey-600">
                  <p><strong>Border:</strong> 1px solid #10B981</p>
                  <p><strong>Background:</strong> #FFFFFF</p>
                  <p><strong>Title Color:</strong> #10B981</p>
                  <p><strong>Description Color:</strong> #000000</p>
                  <p><strong>Close Button:</strong> #000000</p>
                  <p><strong>Usage:</strong> Successful operations, confirmations</p>
                </div>
              </div>
              <div className="border border-[#10B981] bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#10B981] mb-1">Success!</div>
                    <div className="text-sm text-black">Your action was completed successfully.</div>
                  </div>
                  <button className="text-black opacity-70 hover:opacity-100 ml-4">×</button>
                </div>
              </div>
            </div>

            {/* Info Toast with Visual Example */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border border-grey-300 rounded-lg p-4">
                <h4 className="font-medium text-grey-900 mb-3">Info Toast</h4>
                <div className="space-y-2 text-sm text-grey-600">
                  <p><strong>Border:</strong> 1px solid #3B82F6</p>
                  <p><strong>Background:</strong> #FFFFFF</p>
                  <p><strong>Title Color:</strong> #3B82F6</p>
                  <p><strong>Description Color:</strong> #000000</p>
                  <p><strong>Close Button:</strong> #000000</p>
                  <p><strong>Usage:</strong> General information, helpful tips</p>
                </div>
              </div>
              <div className="border border-[#3B82F6] bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#3B82F6] mb-1">Information</div>
                    <div className="text-sm text-black">Here's some helpful information.</div>
                  </div>
                  <button className="text-black opacity-70 hover:opacity-100 ml-4">×</button>
                </div>
              </div>
            </div>

            {/* Warning Toast with Visual Example */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border border-grey-300 rounded-lg p-4">
                <h4 className="font-medium text-grey-900 mb-3">Warning Toast</h4>
                <div className="space-y-2 text-sm text-grey-600">
                  <p><strong>Border:</strong> 1px solid #F59E0B</p>
                  <p><strong>Background:</strong> #FFFFFF</p>
                  <p><strong>Title Color:</strong> #F59E0B</p>
                  <p><strong>Description Color:</strong> #000000</p>
                  <p><strong>Close Button:</strong> #000000</p>
                  <p><strong>Usage:</strong> Caution messages, important notices</p>
                </div>
              </div>
              <div className="border border-[#F59E0B] bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#F59E0B] mb-1">Warning</div>
                    <div className="text-sm text-black">Please be careful with this action.</div>
                  </div>
                  <button className="text-black opacity-70 hover:opacity-100 ml-4">×</button>
                </div>
              </div>
            </div>

            {/* Destructive Toast with Visual Example */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="border border-grey-300 rounded-lg p-4">
                <h4 className="font-medium text-grey-900 mb-3">Destructive Toast</h4>
                <div className="space-y-2 text-sm text-grey-600">
                  <p><strong>Border:</strong> 1px solid #EF4444</p>
                  <p><strong>Background:</strong> #FFFFFF</p>
                  <p><strong>Title Color:</strong> #EF4444</p>
                  <p><strong>Description Color:</strong> #000000</p>
                  <p><strong>Close Button:</strong> #000000</p>
                  <p><strong>Usage:</strong> Errors, failed operations, critical alerts</p>
                </div>
              </div>
              <div className="border border-[#EF4444] bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-[#EF4444] mb-1">Error</div>
                    <div className="text-sm text-black">Something went wrong. Please try again.</div>
                  </div>
                  <button className="text-black opacity-70 hover:opacity-100 ml-4">×</button>
                </div>
              </div>
            </div>

            {/* Toast with Action */}
            <div className="border border-grey-300 rounded-lg p-4">
              <h4 className="font-medium text-grey-900 mb-2">Toast with Action</h4>
              <div className="space-y-1 text-sm text-grey-600">
                <p><strong>Action Button:</strong> Inline button with variant="link"</p>
                <p><strong>Action Style:</strong> Transparent background, hover:bg-secondary</p>
                <p><strong>Action Text:</strong> Same color as toast variant</p>
                <p><strong>Layout:</strong> Action positioned to the right of content</p>
                <p><strong>Usage:</strong> When user action is required (confirm, retry, etc.)</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-grey-900">Implementation Details</h3>
            <div className="space-y-2 text-sm text-grey-600">
              <p><strong>Auto-dismiss:</strong> 3 seconds (TOAST_REMOVE_DELAY = 3000ms)</p>
              <p><strong>Max toasts:</strong> 5 simultaneous toasts (TOAST_LIMIT = 5)</p>
              <p><strong>Close icon:</strong> X icon (Lucide), 16px size (h-4 w-4)</p>
              <p><strong>Close position:</strong> Absolute positioned, top-2 right-2</p>
              <p><strong>Swipe gesture:</strong> Swipe right to dismiss on mobile</p>
              <p><strong>Z-index:</strong> z-[100] to appear above all content</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-grey-900">Helper Functions</h3>
            <div className="space-y-2 text-sm text-grey-600">
              <p><strong>showSuccessToast(title, description)</strong> - Green success toast</p>
              <p><strong>showErrorToast(title, description)</strong> - Red destructive toast</p>
              <p><strong>showWarningToast(title, description)</strong> - Orange warning toast</p>
              <p><strong>showInfoToast(title, description)</strong> - Blue info toast</p>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );

  const renderDropdowns = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Dropdowns</h2>
        <p className="text-sm text-grey-600 mb-4">
          A collection of various dropdown components demonstrating different use cases and styling.
        </p>
        <p className="text-sm text-grey-600 font-semibold">Component Name: <code className="font-mono text-primary-main">Select, FilterDropdown</code></p>
      </div>
      <Card className="shadow-none">
        <CardContent className="p-6 space-y-6">
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
        </CardContent>
      </Card>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "color-palette":
        return renderColorPalette();
      case "typography":
        return renderTypography();
      case "spacing-layout":
        return renderSpacingLayout();
      case "buttons":
        return renderButtons();
      case "status-badges":
        return renderStatusBadges();
      case "tab-navigation":
        return renderTabNavigation();
      case "filter-components":
        return renderFilterComponents();
      case "table-system":
        return renderTableSystem();
      case "form-elements":
        return renderFormElements();
      case "layout-components":
        return renderLayoutComponents();
      case "alerts":
        return renderAlerts();
      case "progress":
        return renderProgress();
      case "modals":
        return renderModals();
      case "toast-notifications":
        return renderToastNotifications();
      case "dropdowns":
        return renderDropdowns();
      case "breadcrumbs":
        return renderBreadcrumbs();
      case "brand-assets":
        return renderBrandAssets();
      case "portal-logos":
        return renderPortalLogos();
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0 border-r bg-white">
        <div className="p-4 flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-700">
            <ArrowLeft size={20} />
          </button>
          <MontoLogo className="h-6" />
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-72px)]">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
                activeSection === item.id
                  ? "bg-[#F0EDFF] text-[#7B59FF] font-semibold"
                  : "text-[#3F4758] hover:bg-[#F4F4F7]"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        {renderSection()}
      </div>
    </div>
  );
}
