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
import { FormField } from "@/components/ui/form-field";
import { PaymentsRelationshipStatusBadge } from "@/components/payments-relationships/PaymentsRelationshipStatusBadge";
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown";
import { ActiveFiltersList } from "@/components/invoices/filters/ActiveFiltersList";
import { InvoiceFilters as InvoiceFiltersType } from "@/components/invoices/filters/types";
import { DataTableFacetedFilter, Option } from "@/components/dashboard/filters/DataTableFacetedFilter";
import { DateRangePicker } from "@/components/invoices/filters/DateRangePicker";
import { InvoiceActions } from "@/components/invoices/InvoiceActions";
import { TextEffect } from "@/components/ui/text-effect";
import { TextColor } from "@/components/ui/text-color";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
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
  Home,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  X,
  ArrowLeft,
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
  ArrowRight,
  Code,
  Grid3X3,
  Eye,
  BookOpen,
  Play,
  Cpu,
  LayoutDashboard,
  WandSparkles,
  ArrowLeftRight,
  Cable,
  TriangleAlert,
  CreditCard,
  Calendar,
  ChevronRight,
  Plus,
  EllipsisVertical,
  CirclePlus,
  CloudUpload,
  UserPlus,
  FileLock,
  BarChart,
  List,
  Link,
  Key,
  Edit,
  EyeOff
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
import { WizardProgress } from "@/components/ui/wizard-progress";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { id: "home", label: "Home", icon: <Home size={18} /> },
  { id: "color-palette", label: "Color Palette", icon: <Palette size={18} /> },
  { id: "typography", label: "Typography", icon: <Type size={18} /> },
  { id: "buttons", label: "Buttons", icon: <MousePointer size={18} /> },
  { id: "status-badges", label: "Status Badges", icon: <Award size={18} /> },
  { id: "tab-navigation", label: "Tab Navigation", icon: <Navigation size={18} /> },
  { id: "filter-components", label: "Filter Components", icon: <Filter size={18} /> },
  { id: "layout-patterns", label: "Layout Patterns", icon: <Layout size={18} /> },
  { id: "table-system", label: "Table System", icon: <TableIcon size={18} /> },
  { id: "form-elements", label: "Form Elements", icon: <Settings size={18} /> },
  { id: "layout-components", label: "Layout Components", icon: <Layout size={18} /> },
  { id: "alerts", label: "Alerts", icon: <AlertCircle size={18} /> },
  { id: "progress", label: "Progress", icon: <BarChart3 size={18} /> },
  { id: "modals", label: "Modals", icon: <Layers size={18} /> },
  { id: "toast-notifications", label: "Toast Notifications", icon: <Bell size={18} /> },
  { id: "breadcrumbs", label: "Breadcrumbs", icon: <Navigation2 size={18} /> },
  { id: "brand-assets", label: "Brand Assets", icon: <Zap size={18} /> },
  { id: "portal-logos", label: "Portal Logos", icon: <Building size={18} /> },
  { id: "design-tokens", label: "Design Tokens", icon: <Code size={18} /> },
  { id: "icons", label: "Icons", icon: <Zap size={18} /> },
  { id: "grid-system", label: "Grid System", icon: <Grid3X3 size={18} /> },
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
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    terms: false,
    category: '',
    notifications: false,
    volume: [50],
    otpValue: ''
  });

  // Badge system states
  const [badgeActiveTab, setBadgeActiveTab] = useState('components');
  
  // Animation section state
  const [animationVisible, setAnimationVisible] = useState(true);
  
  // Icons section state
  const [activeIconTab, setActiveIconTab] = useState('navigation');
  
  // Code visibility state for all sections
  const [showButtonStatesCode, setShowButtonStatesCode] = useState(false);
  const [showInputStatesCode, setShowInputStatesCode] = useState(false);
  const [showPrimaryButtonsCode, setShowPrimaryButtonsCode] = useState({});
  const [showSecondaryButtonsCode, setShowSecondaryButtonsCode] = useState({});
  const [showDestructiveButtonsCode, setShowDestructiveButtonsCode] = useState({});
  
  // Typography section state
  const [typographyVisibleCode, setTypographyVisibleCode] = useState<string>('');
  
  // Layout patterns section state  
  const [layoutVisibleCode, setLayoutVisibleCode] = useState<string>('');

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

  const handleFilterChange = (key: keyof InvoiceFiltersType, value: string | string[]) => {
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

  // Utility functions for code examples
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `Code copied!` });
  };

  const CodeBlock = ({ code, showCode, setShowCode }: { code: string; showCode?: boolean; setShowCode?: (show: boolean) => void }) => {
    // If showCode and setShowCode are provided, use collapsible version
    if (showCode !== undefined && setShowCode !== undefined) {
      return (
        <div className="mt-6">
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-sm font-medium"
            style={{ color: '#7B59FF' }}
            onMouseEnter={(e) => e.target.style.color = '#5A3FCC'}
            onMouseLeave={(e) => e.target.style.color = '#7B59FF'}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
          {showCode && (
            <div className="mt-3 p-3 bg-gray-50 rounded-md overflow-x-auto">
              <pre className="text-xs text-gray-700">
                <code>{code}</code>
              </pre>
            </div>
          )}
        </div>
      );
    }
    
    // Default non-collapsible version
    return (
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
  };

  const renderHome = () => {
    return (
      <div className="space-y-8">
        <div className="space-y-6">
          <TextEffect
            per="word"
            as="h1"
            preset="slide"
            className="text-4xl font-bold text-grey-900"
            delay={0.1}
          >
            Welcome to Monto's Design System
          </TextEffect>
          
          <div className="flex justify-center">
            <TextColor>Develop. Preview. Ship.</TextColor>
          </div>
          
          <TextEffect
            per="word"
            as="p"
            preset="fade"
            className="text-lg text-grey-600 text-center"
            delay={0.8}
          >
            A comprehensive design system for building consistent and beautiful user interfaces
          </TextEffect>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg hover:border-[#7B59FF]/20 transition-all" onClick={() => setActiveSection("color-palette")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-[#7B59FF]" />
                Color Palette
              </CardTitle>
              <CardDescription>
                Explore our color system including primary, grey, semantic and status colors
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg hover:border-[#7B59FF]/20 transition-all" onClick={() => setActiveSection("typography")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-[#7B59FF]" />
                Typography
              </CardTitle>
              <CardDescription>
                Font families, sizes, weights and text styling guidelines
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg hover:border-[#7B59FF]/20 transition-all" onClick={() => setActiveSection("filter-components")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-[#7B59FF]" />
                Filter Components
              </CardTitle>
              <CardDescription>
                Modern filter system with DataTableFacetedFilter and search components
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg hover:border-[#7B59FF]/20 transition-all" onClick={() => setActiveSection("layout-patterns")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="h-5 w-5 text-[#7B59FF]" />
                Layout Patterns
              </CardTitle>
              <CardDescription>
                Consistent page layouts and spacing standards for preventing layout jumps
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg hover:border-[#7B59FF]/20 transition-all" onClick={() => setActiveSection("table-system")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TableIcon className="h-5 w-5 text-[#7B59FF]" />
                Table System
              </CardTitle>
              <CardDescription>
                Data tables with sticky columns, sorting, and responsive design
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg hover:border-[#7B59FF]/20 transition-all" onClick={() => setActiveSection("buttons")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5 text-[#7B59FF]" />
                Buttons
              </CardTitle>
              <CardDescription>
                Button variants, sizes, states and interaction patterns
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-lg font-semibold text-grey-900 mb-3">Quick Start</h2>
          <div className="space-y-2 text-sm text-grey-600">
            <p>• Navigate through sections using the sidebar on the left</p>
            <p>• Click on any card above to jump directly to that section</p>
            <p>• All components are interactive - try them out!</p>
            <p>• Copy code snippets and component names for your implementation</p>
          </div>
        </div>

        <div className="bg-[#7B59FF]/5 p-6 rounded-lg border border-[#7B59FF]/20">
          <h2 className="text-lg font-semibold text-grey-900 mb-3">Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-[#7B59FF] mb-1">Consistency</h3>
              <p className="text-grey-600">Unified patterns across all interfaces</p>
            </div>
            <div>
              <h3 className="font-medium text-[#7B59FF] mb-1">Clarity</h3>
              <p className="text-grey-600">Clear hierarchy and intuitive navigation</p>
            </div>
            <div>
              <h3 className="font-medium text-[#7B59FF] mb-1">Efficiency</h3>
              <p className="text-grey-600">Optimized workflows and responsive design</p>
            </div>
          </div>
        </div>
      </div>
    );
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
            name="grey-300" 
            description="Lightest grey for backgrounds" 
            hex="#F6F7F9" 
            className="bg-grey-300" 
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

  const renderTypography = () => {
    const toggleCode = (codeId: string) => {
      setTypographyVisibleCode(typographyVisibleCode === codeId ? '' : codeId);
    };

    return (
      <div className="space-y-8">
        {/* Typography Overview */}
        <div className="bg-gradient-to-r from-[#7B59FF]/5 to-purple-50 p-6 rounded-lg border border-[#7B59FF]/10">
          <h2 className="text-2xl font-semibold text-grey-900 mb-4">Typography System</h2>
          <p className="text-grey-600 mb-4">
            Our typography system provides consistent text styling across the platform, ensuring readability, accessibility, and visual hierarchy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-[#7B59FF] mb-2">Consistent Scale</h3>
              <p className="text-grey-600">Proportional sizing based on rem units for accessibility</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-[#7B59FF] mb-2">Semantic Usage</h3>
              <p className="text-grey-600">Clear patterns for headings, body text, and UI elements</p>
            </div>
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="font-semibold text-[#7B59FF] mb-2">Platform Colors</h3>
              <p className="text-grey-600">Integrated with our color system for optimal contrast</p>
            </div>
          </div>
        </div>

        {/* Typography Scale Foundation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Typography Scale</CardTitle>
                <CardDescription>The foundational type scale with size, weight, and line-height specifications</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleCode('typography-scale')}
              >
                <Code className="w-4 h-4 mr-2 opacity-60" />
                {typographyVisibleCode === 'typography-scale' ? 'Hide Code' : 'Show Code'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              {/* Heading Scale */}
              <div>
                <h3 className="font-semibold text-grey-900 mb-4">Heading Scale</h3>
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between p-4 bg-grey-50 rounded-lg border">
                    <div className="flex-1">
                      <h2 className="text-2xl font-semibold text-grey-900">Good morning, Nitsan!</h2>
                      <p className="text-sm text-grey-500 mt-1">Dashboard welcome headers, main page titles</p>
                    </div>
                    <div className="text-right text-xs text-grey-500">
                      <div>24px / 1.5rem</div>
                      <div>font-semibold (600)</div>
                      <div>line-height: 1.25</div>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline justify-between p-4 bg-grey-50 rounded-lg border">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-[#061237] tracking-tight">Portal Records</h2>
                      <p className="text-sm text-grey-500 mt-1">Dashboard sections, major content areas</p>
                    </div>
                    <div className="text-right text-xs text-grey-500">
                      <div>20px / 1.25rem</div>
                      <div>font-semibold (600)</div>
                      <div>line-height: 1.3</div>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline justify-between p-4 bg-grey-50 rounded-lg border">
                    <div className="flex-1">
                      <h3 className="text-lg">Account Receivables</h3>
                      <p className="text-sm text-grey-500 mt-1">Component titles, section headers</p>
                    </div>
                    <div className="text-right text-xs text-grey-500">
                      <div>18px / 1.125rem</div>
                      <div>font-medium (500)</div>
                      <div>line-height: 1.4</div>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline justify-between p-4 bg-grey-50 rounded-lg border">
                    <div className="flex-1">
                      <h4 className="text-base font-semibold text-[#061237]">PO-12345</h4>
                      <p className="text-sm text-grey-500 mt-1">Entity identifiers, action buttons</p>
                    </div>
                    <div className="text-right text-xs text-grey-500">
                      <div>16px / 1rem</div>
                      <div>font-semibold (600)</div>
                      <div>line-height: 1.4</div>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline justify-between p-4 bg-grey-50 rounded-lg border">
                    <div className="flex-1">
                      <h5 className="text-sm font-medium text-[#586079]">Recent portal record activity</h5>
                      <p className="text-sm text-grey-500 mt-1">Descriptions, helper text, secondary info</p>
                    </div>
                    <div className="text-right text-xs text-grey-500">
                      <div>14px / 0.875rem</div>
                      <div>font-medium (500)</div>
                      <div>line-height: 1.4</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Body Text Scale */}
              <div>
                <h3 className="font-semibold text-grey-900 mb-4">Body Text Scale</h3>
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between p-4 bg-grey-50 rounded-lg border">
                    <div className="flex-1">
                      <p className="text-base text-grey-700">Body Large</p>
                      <p className="text-sm text-grey-500 mt-1">Lead paragraphs, important descriptions</p>
                    </div>
                    <div className="text-right text-xs text-grey-500">
                      <div>16px / 1rem</div>
                      <div>font-normal (400)</div>
                      <div>line-height: 1.5</div>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline justify-between p-4 bg-grey-50 rounded-lg border">
                    <div className="flex-1">
                      <p className="text-sm text-grey-600">Body Default</p>
                      <p className="text-sm text-grey-500 mt-1">Standard body text, form descriptions</p>
                    </div>
                    <div className="text-right text-xs text-grey-500">
                      <div>14px / 0.875rem</div>
                      <div>font-normal (400)</div>
                      <div>line-height: 1.5</div>
                    </div>
                  </div>
                  
                  <div className="flex items-baseline justify-between p-4 bg-grey-50 rounded-lg border">
                    <div className="flex-1">
                      <p className="text-xs text-grey-500">Caption</p>
                      <p className="text-sm text-grey-500 mt-1">Helper text, metadata, fine print</p>
                    </div>
                    <div className="text-right text-xs text-grey-500">
                      <div>12px / 0.75rem</div>
                      <div>font-normal (400)</div>
                      <div>line-height: 1.4</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {typographyVisibleCode === 'typography-scale' && (
              <div className="mt-6">
                <CodeBlock code={`{/* Typography Scale - CSS Variables & Classes */}

/* Platform Typography Scale */

/* Section Headers - Largest text used for main sections */
.text-2xl { font-size: 1.5rem; font-weight: 600; line-height: 1.25; }
/* Example: "Setup Complete!", "Review Your Connections" */

/* Dashboard Section Headers */
.text-xl { font-size: 1.25rem; font-weight: 600; line-height: 1.3; }
/* Example: "Portal Records", "Purchase Orders" */

/* Card/Modal Titles */
.text-lg { font-size: 1.125rem; font-weight: 500; line-height: 1.4; }
/* Example: "Add Portal User", modal headers */

/* Component Headers */
.text-base { font-size: 1rem; font-weight: 600; line-height: 1.4; }
/* Example: "Action Required", card section headers */

/* Small Titles & Labels */
.text-sm { font-size: 0.875rem; font-weight: 500; line-height: 1.4; }
/* Example: "Purchase Orders", "Invoice Portal Records" */

/* Data Display Scale */
.text-3xl.font-bold { font-size: 1.875rem; font-weight: 700; line-height: 1.1; }
/* Example: Dashboard metrics, KPI numbers */

/* Real Platform Examples */
// Dashboard Welcome Headers
<h1 className="text-2xl font-bold text-gray-900">Good morning, Nitsan!</h1>

// Section Headers  
<h2 className="text-xl font-semibold text-[#061237] tracking-tight">Portal Records</h2>
<h2 className="text-xl font-semibold text-[#061237] tracking-tight">Purchase Orders</h2>

// Component Titles
<h3 className="text-lg font-semibold text-[#061237]">Account Receivables</h3>
<h4 className="text-base font-semibold text-[#061237]">PO-12345</h4>

// Form Labels & Descriptions
<label className="text-sm font-medium text-grey-800">Portal</label>
<p className="text-sm text-[#586079]">Recent portal record activity</p>

// Helper Text & Metadata
<p className="text-xs text-gray-500">120 portals connected</p>
<span className="text-xs text-[#586079]">invoices</span>

// Large Metrics
<div className="text-3xl font-bold text-[#061237]">$73.5M</div>
<div className="text-3xl font-bold text-gray-900">120</div>

// Medium Metrics & Status
<p className="text-xl font-semibold text-blue-600">185</p>
<span className="text-sm font-medium text-green-700">All systems healthy</span>
<span className="text-sm text-green-600">+12% from last month</span>`} />
              </div>
            )}
          </CardContent>
        </Card>


      </div>
    );
  };

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
          <div className="flex gap-2 p-4 bg-grey-300 rounded-md">
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
          </div>

          <p className="font-medium text-grey-800">Gap-4</p>
          <div className="flex gap-4 p-4 bg-grey-300 rounded-md">
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
          </div>

          <p className="font-medium text-grey-800">Gap-8</p>
          <div className="flex gap-8 p-4 bg-grey-300 rounded-md">
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
            <div className="w-10 h-10 bg-primary-light rounded-md"></div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Margin Spacing</h2>
        <div className="space-y-4">
          <div className="bg-grey-300 p-4 rounded-md">
            <div className="w-24 h-12 bg-primary-light rounded-md mx-auto mb-4"></div>
            <p className="text-sm text-grey-700 text-center">Element with mb-4</p>
          </div>
          <div className="bg-grey-300 p-4 rounded-md">
            <div className="w-24 h-12 bg-primary-light rounded-md mx-auto mt-6"></div>
            <p className="text-sm text-grey-700 text-center">Element with mt-6</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderButtons = () => {
    
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

        {/* Button States Section */}
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Button States</h2>
          <Card className="shadow-none">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-3">
                  <Button className="w-full bg-[#7B59FF] hover:bg-[#6B4FE8] text-white">
                    Default
                  </Button>
                  <p className="text-sm text-grey-600 text-center">Default state</p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-[#6B4FE8] text-white">
                    Hover
                  </Button>
                  <p className="text-sm text-grey-600 text-center">Hover state</p>
                </div>
                <div className="space-y-3">
                  <Button className="w-full bg-[#5B3FD8] text-white">
                    Active
                  </Button>
                  <p className="text-sm text-grey-600 text-center">Active/pressed state</p>
                </div>
                <div className="space-y-3">
                  <Button disabled className="w-full">
                    Disabled
                  </Button>
                  <p className="text-sm text-grey-600 text-center">Disabled state</p>
                </div>
              </div>
              <CodeBlock 
                code={`/* Button States */
.button-primary {
  background: #7B59FF;
  transition: background 200ms ease;
}
.button-primary:hover {
  background: #6B4FE8;
}
.button-primary:active {
  background: #5B3FD8;
}
.button-primary:disabled {
  background: #D1D5DB;
  cursor: not-allowed;
}`}
                showCode={showButtonStatesCode}
                setShowCode={setShowButtonStatesCode}
              />
            </CardContent>
          </Card>
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

        {/* Basic Tabs Example */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-grey-800 mb-4">Basic Tab Navigation</h3>
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

        {/* Tab Navigation with Icons (Invoice Detail Example) */}
        <div>
          <h3 className="text-lg font-medium text-grey-800 mb-4">Tab Navigation with Icons</h3>
          <p className="text-sm text-grey-600 mb-4">Used in invoice detail pages and other inner pages</p>
          <TabsNav
            activeTab={activeDetailTab}
            onTabChange={setActiveDetailTab}
            tabs={[
              { 
                id: "invoice-data", 
                label: "Invoice Data", 
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
              },
              { 
                id: "exceptions", 
                label: "Exceptions", 
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
                count: 2
              },
              { 
                id: "rtp-data", 
                label: "RTP Data", 
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="m7 11V7a5 5 0 0 1 10 0v4"/></svg>
              },
              { 
                id: "portal-records", 
                label: "Portal Records", 
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27,6.96 12,12.01 20.73,6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              },
              { 
                id: "activity", 
                label: "Activity", 
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7"/><path d="M17 12H7"/></svg>,
                count: 5
              },
            ]}
          />
        </div>
      </div>
    </div>
  );

  const renderFilterComponents = () => {
    const mockPortals = ["SAP Ariba", "Coupa", "Bill.com", "Oracle iProcurement"];
    const mockStatuses = ["Pending Action", "Paid", "Settled", "Awaiting SC", "Rejected by Buyer"];
    const mockBuyers = ["Apple Inc", "Microsoft Corp", "Tesla", "Google LLC", "Amazon"];
    const mockOwners = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "David Clark"];
    const mockSources = ["Portal", "Manual", "API", "Email"];

    // Convert to Option format for DataTableFacetedFilter
    const statusOptions: Option[] = mockStatuses.map(status => ({
      label: status,
      value: status,
      count: Math.floor(Math.random() * 50) + 1
    }));

    const portalOptions: Option[] = mockPortals.map(portal => ({
      label: portal,
      value: portal,
      count: Math.floor(Math.random() * 30) + 1
    }));

    const buyerOptions: Option[] = mockBuyers.map(buyer => ({
      label: buyer,
      value: buyer,
      count: Math.floor(Math.random() * 20) + 1
    }));

    const ownerOptions: Option[] = mockOwners.map(owner => ({
      label: owner,
      value: owner,
      count: Math.floor(Math.random() * 15) + 1
    }));

    const sourceOptions: Option[] = mockSources.map(source => ({
      label: source,
      value: source,
      count: Math.floor(Math.random() * 25) + 1
    }));

    const transactionOptions: Option[] = [
      { label: "Invoice", value: "Invoice", count: 45 },
      { label: "Credit Memo", value: "Credit Memo", count: 8 },
      { label: "All", value: "All", count: 53 }
    ];

    return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Modern Filter System</h2>
        <p className="text-sm text-grey-600 mb-4">
          Updated filter components using DataTableFacetedFilter with search, multi-select, and count display.
        </p>
        <p className="text-sm text-grey-600 font-semibold mb-6">Component Name: <code className="font-mono text-primary-main">DataTableFacetedFilter</code></p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-grey-900 mb-3">Filter Controls</h3>
            <div className="flex flex-wrap gap-2">
              <DataTableFacetedFilter
                title="Status"
                options={statusOptions}
                selectedValues={new Set(Array.isArray(filters.status) ? filters.status : [])}
                onSelectionChange={(values) => handleFilterChange('status', Array.from(values))}
              />
              <DataTableFacetedFilter
                title="Buyer"
                options={buyerOptions}
                selectedValues={new Set(Array.isArray(filters.buyer) ? filters.buyer : [])}
                onSelectionChange={(values) => handleFilterChange('buyer', Array.from(values))}
              />
              <DataTableFacetedFilter
                title="Portal"
                options={portalOptions}
                selectedValues={new Set(Array.isArray(filters.portal) ? filters.portal : [])}
                onSelectionChange={(values) => handleFilterChange('portal', Array.from(values))}
              />
              <DataTableFacetedFilter
                title="Transaction"
                options={transactionOptions}
                selectedValues={new Set(filters.transactionType && filters.transactionType !== "All" ? [filters.transactionType] : [])}
                onSelectionChange={(values) => {
                  const value = Array.from(values)[0] || "All";
                  handleFilterChange('transactionType', value);
                }}
              />
              <DataTableFacetedFilter
                title="Owner"
                options={ownerOptions}
                selectedValues={new Set(Array.isArray(filters.owner) ? filters.owner : [])}
                onSelectionChange={(values) => handleFilterChange('owner', Array.from(values))}
              />
              <DataTableFacetedFilter
                title="Source"
                options={sourceOptions}
                selectedValues={new Set(Array.isArray(filters.source) ? filters.source : [])}
                onSelectionChange={(values) => handleFilterChange('source', Array.from(values))}
              />
              <DateRangePicker
                fromDate={filters.dueDate?.from || ""}
                toDate={filters.dueDate?.to || ""}
                onDateChange={(from, to) => handleFilterChange("dueDate", { from, to })}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-grey-900 mb-3">Compact Search Actions</h3>
            <p className="text-sm text-grey-600 mb-3">
              Responsive search component that collapses to icon-only mode to prevent layout movement when filters are active.
            </p>
            <div className="flex gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Normal Mode</Label>
                <InvoiceActions 
                  invoiceCount={42}
                  searchValue=""
                  onSearchChange={() => {}}
                  forceCompact={false}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Compact Mode (forceCompact=true)</Label>
                <InvoiceActions 
                  invoiceCount={42}
                  searchValue=""
                  onSearchChange={() => {}}
                  forceCompact={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };

  const renderLayoutPatterns = () => {
    const toggleCode = (codeId: string) => {
      setLayoutVisibleCode(layoutVisibleCode === codeId ? '' : codeId);
    };

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Page Layout Patterns</h2>
          <p className="text-sm text-grey-600 mb-6">
            Consistent layout patterns used across all pages to prevent layout jumps and ensure proper alignment.
          </p>

          <div className="space-y-8">
            {/* Header + Filters + Table Layout */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Header + Filters + Table Layout</CardTitle>
                    <CardDescription>
                      Standard layout pattern for pages with filters and tables. Uses flexbox with proper constraints to prevent filter-induced layout movement.
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCode('header-filters-table')}
                  >
                    <Code className="w-4 h-4 mr-2 opacity-60" />
                    {layoutVisibleCode === 'header-filters-table' ? 'Hide Code' : 'Show Code'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border space-y-4 font-mono text-xs">
                  <div className="bg-white p-3 rounded border">
                    <div className="text-grey-600 mb-2">{'<PageHeader />'}</div>
                    <div className="text-grey-600">{'<TabsNav />'}</div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <div className="font-semibold mb-2">Filter + Actions Container:</div>
                    <div className="pl-4 space-y-1">
                      <div className="text-blue-600">{'<div className="flex items-center gap-4">'}</div>
                      <div className="pl-4 space-y-1">
                        <div className="text-green-600">{'<div className="flex-1 min-w-0 overflow-hidden">'}</div>
                        <div className="pl-4 text-grey-600">{'<Filters />'}</div>
                        <div className="text-green-600">{'</div>'}</div>
                        
                        <div className="text-green-600">{'<div className="flex-shrink-0">'}</div>
                        <div className="pl-4 text-grey-600">{'<Actions forceCompact={true} />'}</div>
                        <div className="text-green-600">{'</div>'}</div>
                      </div>
                      <div className="text-blue-600">{'</div>'}</div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <div className="text-grey-600">{'<Table />'}</div>
                  </div>
                </div>

                {layoutVisibleCode === 'header-filters-table' && (
                  <div className="mt-4">
                    <CodeBlock code={`{/* Header + Filters + Table Layout */}
<div className="space-y-0">
  {/* Page Header */}
  <div className="bg-white border-b p-4">
    <PageHeader title="Invoice Management" />
    <TabsNav />
  </div>
  
  {/* Filters Section */}
  <div className="bg-grey-50 border-b p-4">
    <div className="flex items-center gap-4">
      <div className="flex-1 min-w-0 overflow-hidden">
        <Filters />
      </div>
      <div className="flex-shrink-0">
        <Actions forceCompact={true} />
      </div>
    </div>
  </div>
  
  {/* Content Area */}
  <div className="p-4">
    <Table />
  </div>
</div>`} />
                  </div>
                )}

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Key CSS Classes:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <code className="bg-white px-1 py-0.5 rounded">flex-1 min-w-0 overflow-hidden</code> - Allows filters to compress</li>
                    <li>• <code className="bg-white px-1 py-0.5 rounded">flex-shrink-0</code> - Prevents actions from shrinking</li>
                    <li>• <code className="bg-white px-1 py-0.5 rounded">forceCompact={true}</code> - Forces search to icon-only mode</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Consistent Page Spacing */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Consistent Page Spacing</CardTitle>
                    <CardDescription>
                      All pages use standardized padding and spacing to eliminate layout jumps between navigation.
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCode('page-spacing')}
                  >
                    <Code className="w-4 h-4 mr-2 opacity-60" />
                    {layoutVisibleCode === 'page-spacing' ? 'Hide Code' : 'Show Code'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border space-y-3 font-mono text-xs">
                  <div className="bg-white p-3 rounded border">
                    <div className="font-semibold mb-2">MainLayout (src/components/layout/MainLayout.tsx):</div>
                    <div className="text-blue-600">{'<div className="w-full px-8 py-6">'}</div>
                    <div className="pl-4 text-grey-600">{'<Outlet /> {/* All page content */'}</div>
                    <div className="text-blue-600">{'</div>'}</div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <div className="font-semibold mb-2">Page Content:</div>
                    <div className="text-green-600">{'<div className="space-y-6">'}</div>
                    <div className="pl-4 text-grey-600">{'/* Page sections with 24px vertical spacing */'}</div>
                    <div className="text-green-600">{'</div>'}</div>
                  </div>
                </div>

                {layoutVisibleCode === 'page-spacing' && (
                  <div className="mt-4">
                    <CodeBlock code={`{/* MainLayout Component */}
export function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <div className="w-full px-8 py-6">
            {children} {/* All page content */}
          </div>
        </main>
      </div>
    </div>
  );
}

{/* Page Component Example */}
export function InvoicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" />
      <FiltersSection />
      <TableSection />
    </div>
  );
}`} />
                  </div>
                )}

                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">Spacing Standards:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• <strong>Page padding:</strong> <code className="bg-white px-1 py-0.5 rounded">px-8 py-6</code> (32px horizontal, 24px vertical)</li>
                    <li>• <strong>Section spacing:</strong> <code className="bg-white px-1 py-0.5 rounded">space-y-6</code> (24px between sections)</li>
                    <li>• <strong>No extra padding:</strong> Pages should not add additional padding on top of MainLayout</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Responsive Search Component */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Responsive Search Component</CardTitle>
                    <CardDescription>
                      Search components with forceCompact mode to prevent layout movement when filters expand.
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCode('responsive-search')}
                  >
                    <Code className="w-4 h-4 mr-2 opacity-60" />
                    {layoutVisibleCode === 'responsive-search' ? 'Hide Code' : 'Show Code'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="font-medium">Normal Mode (forceCompact=false)</Label>
                    <div className="p-3 bg-gray-50 rounded border">
                      <InvoiceActions 
                        invoiceCount={42}
                        searchValue=""
                        onSearchChange={() => {}}
                        forceCompact={false}
                      />
                    </div>
                    <p className="text-xs text-grey-600">Shows full search input by default</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="font-medium">Compact Mode (forceCompact=true)</Label>
                    <div className="p-3 bg-gray-50 rounded border">
                      <InvoiceActions 
                        invoiceCount={42}
                        searchValue=""
                        onSearchChange={() => {}}
                        forceCompact={true}
                      />
                    </div>
                    <p className="text-xs text-grey-600">Shows search icon only, opens dropdown on click</p>
                  </div>
                </div>

                {layoutVisibleCode === 'responsive-search' && (
                  <div className="mt-4">
                    <CodeBlock code={`{/* Responsive Search Usage */}
{/* Normal mode - full search input */}
<InvoiceActions 
  invoiceCount={invoices.length}
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  forceCompact={false} // or omit (default)
/>

{/* Compact mode - icon only, prevents layout shifts */}
<InvoiceActions 
  invoiceCount={invoices.length}
  searchValue={searchValue}
  onSearchChange={setSearchValue}
  forceCompact={true} // Forces icon-only mode
/>

{/* Usage in filter layouts */}
<div className="flex items-center gap-4">
  <div className="flex-1 min-w-0 overflow-hidden">
    <Filters /> {/* Can expand without affecting actions */}
  </div>
  <div className="flex-shrink-0">
    <Actions forceCompact={true} /> {/* Stays fixed width */}
  </div>
</div>`} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Visual Layout Examples */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-grey-900 mb-2">Visual Layout Examples</h3>
                <p className="text-sm text-grey-600 mb-6">
                  Interactive examples of common layout patterns used throughout the platform.
                </p>
              </div>

              {/* Dashboard Card Layout */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Dashboard Card Layout</CardTitle>
                      <CardDescription>Standard 3-column responsive grid used on the home dashboard</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCode('dashboard-cards')}
                    >
                      <Code className="w-4 h-4 mr-2 opacity-60" />
                      {layoutVisibleCode === 'dashboard-cards' ? 'Hide Code' : 'Show Code'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <BarChart className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-medium text-grey-900">Analytics</h4>
                        </div>
                        <p className="text-2xl font-bold text-grey-900">$124,532</p>
                        <p className="text-sm text-grey-600">+12% from last month</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-medium text-grey-900">Growth</h4>
                        </div>
                        <p className="text-2xl font-bold text-grey-900">+23%</p>
                        <p className="text-sm text-grey-600">Revenue increase</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-medium text-grey-900">Users</h4>
                        </div>
                        <p className="text-2xl font-bold text-grey-900">1,234</p>
                        <p className="text-sm text-grey-600">Active this month</p>
                      </CardContent>
                    </Card>
                  </div>

                  {layoutVisibleCode === 'dashboard-cards' && (
                    <div className="mt-4">
                      <CodeBlock code={`{/* Dashboard 3-Column Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
    <CardContent className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <BarChart className="w-4 h-4 text-white" />
        </div>
        <h4 className="font-medium text-grey-900">Analytics</h4>
      </div>
      <p className="text-2xl font-bold text-grey-900">$124,532</p>
      <p className="text-sm text-grey-600">+12% from last month</p>
    </CardContent>
  </Card>
  <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
    <CardContent className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-white" />
        </div>
        <h4 className="font-medium text-grey-900">Growth</h4>
      </div>
      <p className="text-2xl font-bold text-grey-900">+23%</p>
      <p className="text-sm text-grey-600">Revenue increase</p>
    </CardContent>
  </Card>
  <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
    <CardContent className="p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
        <h4 className="font-medium text-grey-900">Users</h4>
      </div>
      <p className="text-2xl font-bold text-grey-900">1,234</p>
      <p className="text-sm text-grey-600">Active this month</p>
    </CardContent>
  </Card>
</div>`} />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Two Column Layout */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Two Column Layout</CardTitle>
                      <CardDescription>Sidebar + content pattern for detail pages</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCode('two-column')}
                    >
                      <Code className="w-4 h-4 mr-2 opacity-60" />
                      {layoutVisibleCode === 'two-column' ? 'Hide Code' : 'Show Code'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-grey-200 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[300px]">
                      <div className="lg:col-span-1 bg-grey-50 p-4 border-r border-grey-200">
                        <h4 className="font-medium mb-3 text-grey-900">Navigation</h4>
                        <nav className="space-y-2">
                          <Button variant="ghost" size="sm" className="w-full justify-start bg-white">
                            <FileText className="w-4 h-4 mr-2" />
                            Overview
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            <BarChart className="w-4 h-4 mr-2" />
                            Analytics
                          </Button>
                          <Button variant="ghost" size="sm" className="w-full justify-start">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </Button>
                        </nav>
                      </div>
                      <div className="lg:col-span-3 p-4">
                        <h4 className="font-medium mb-3 text-grey-900">Main Content</h4>
                        <div className="space-y-4">
                          <Card className="border border-grey-200">
                            <CardContent className="p-4">
                              <h5 className="font-medium mb-2">Section Title</h5>
                              <p className="text-sm text-grey-600">This is the main content area that adapts to different screen sizes while maintaining proper proportions.</p>
                            </CardContent>
                          </Card>
                          <Card className="border border-grey-200">
                            <CardContent className="p-4">
                              <h5 className="font-medium mb-2">Another Section</h5>
                              <p className="text-sm text-grey-600">Content sections maintain consistent spacing and visual hierarchy.</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>

                  {layoutVisibleCode === 'two-column' && (
                    <div className="mt-4">
                      <CodeBlock code={`{/* Two Column Layout */}
<div className="grid grid-cols-1 lg:grid-cols-4 min-h-[300px]">
  {/* Sidebar - 1/4 width on large screens */}
  <div className="lg:col-span-1 bg-grey-50 p-4 border-r border-grey-200">
    <h4 className="font-medium mb-3">Navigation</h4>
    <nav className="space-y-2">
      <Button variant="ghost" size="sm" className="w-full justify-start">
        <FileText className="w-4 h-4 mr-2" />
        Overview
      </Button>
      <Button variant="ghost" size="sm" className="w-full justify-start">
        <BarChart className="w-4 h-4 mr-2" />
        Analytics
      </Button>
      <Button variant="ghost" size="sm" className="w-full justify-start">
        <Settings className="w-4 h-4 mr-2" />
        Settings
      </Button>
    </nav>
  </div>
  
  {/* Main Content - 3/4 width on large screens */}
  <div className="lg:col-span-3 p-4">
    <h4 className="font-medium mb-3">Main Content</h4>
    <div className="space-y-4">
      {/* Content sections */}
    </div>
  </div>
</div>`} />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Complete Page Layout Example */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Complete Page Layout</CardTitle>
                      <CardDescription>Full example of header, filters, and table layout</CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleCode('complete-layout')}
                    >
                      <Code className="w-4 h-4 mr-2 opacity-60" />
                      {layoutVisibleCode === 'complete-layout' ? 'Hide Code' : 'Show Code'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-grey-200 rounded-lg overflow-hidden">
                    {/* Page Header */}
                    <div className="bg-white border-b border-grey-200 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4" />
                          </Button>
                          <div>
                            <h3 className="font-semibold text-grey-900">Invoice Management</h3>
                            <p className="text-sm text-grey-600">Manage all invoices and payments</p>
                          </div>
                        </div>
                        <Button className="bg-[#7B59FF] hover:bg-[#6B4FE8]">
                          <Plus className="w-4 h-4 mr-2" />
                          New Invoice
                        </Button>
                      </div>
                    </div>
                    
                    {/* Filters */}
                    <div className="bg-grey-50 border-b border-grey-200 p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex gap-2 flex-wrap">
                            <Button variant="outline" size="sm">
                              <Filter className="w-4 h-4 mr-2" />
                              Status
                            </Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="w-4 h-4 mr-2" />
                              Date Range
                            </Button>
                            <Badge variant="secondary">Paid</Badge>
                            <Badge variant="secondary">Last 30 days</Badge>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Button variant="ghost" size="sm">
                            <Search className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Table Area */}
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b border-grey-200">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-grey-500" />
                            <div>
                              <p className="font-medium text-grey-900">INV-2024-001</p>
                              <p className="text-sm text-grey-600">March 15, 2024</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className="bg-green-100 text-green-800">Paid</Badge>
                            <p className="font-medium">$1,250.00</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between py-2 border-b border-grey-200">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-grey-500" />
                            <div>
                              <p className="font-medium text-grey-900">INV-2024-002</p>
                              <p className="text-sm text-grey-600">March 14, 2024</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                            <p className="font-medium">$2,100.00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {layoutVisibleCode === 'complete-layout' && (
                    <div className="mt-4">
                      <CodeBlock code={`{/* Complete Page Layout Structure */}
<div className="space-y-0">
  {/* Page Header */}
  <div className="bg-white border-b border-grey-200 p-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="font-semibold text-grey-900">Invoice Management</h3>
          <p className="text-sm text-grey-600">Manage all invoices and payments</p>
        </div>
      </div>
      <Button className="bg-primary hover:bg-primary/90">
        <Plus className="w-4 h-4 mr-2" />
        New Invoice
      </Button>
    </div>
  </div>
  
  {/* Filters Section */}
  <div className="bg-grey-50 border-b border-grey-200 p-4">
    <div className="flex items-center gap-4">
      <div className="flex-1 min-w-0 overflow-hidden">
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Status
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Date Range
          </Button>
          <Badge variant="secondary">Paid</Badge>
          <Badge variant="secondary">Last 30 days</Badge>
        </div>
      </div>
      <div className="flex-shrink-0">
        <Actions forceCompact={true} />
      </div>
    </div>
  </div>
  
  {/* Content Area */}
  <div className="p-4">
    <InvoiceTable data={invoices} />
  </div>
</div>`} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
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
        render: (item: InvoiceData) => <StatusBadge status={item.status as 'paid' | 'pending' | 'overdue' | 'draft'} />,
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
        
        {/* Basic Input Elements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Basic Input Elements</CardTitle>
            <CardDescription>Standard text inputs, email, password, and textarea</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="text-input">Text Input</Label>
                <Input 
                  id="text-input" 
                  placeholder="Enter text here" 
                  className="border-grey-400 focus:border-primary-main"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-input">Email Input</Label>
                <Input 
                  id="email-input" 
                  type="email"
                  placeholder="example@email.com" 
                  className="border-grey-400 focus:border-primary-main"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-input">Password Input</Label>
                <Input 
                  id="password-input" 
                  type="password"
                  placeholder="Enter password" 
                  className="border-grey-400 focus:border-primary-main"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled-input">Disabled Input</Label>
                <Input 
                  id="disabled-input" 
                  placeholder="Disabled input" 
                  disabled
                  className="border-grey-400 bg-grey-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="textarea-example">Textarea</Label>
              <Textarea 
                id="textarea-example" 
                placeholder="Enter your message here..." 
                className="border-grey-400 focus:border-primary-main min-h-[100px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Selection Elements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Selection Elements</CardTitle>
            <CardDescription>Dropdowns, checkboxes, radio groups, and switches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="select-example">Select Dropdown</Label>
                <Select>
                  <SelectTrigger id="select-example" className="border-grey-400 focus:border-primary-main">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label>Checkboxes</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="checkbox1" 
                      className="border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main"
                    />
                    <Label htmlFor="checkbox1" className="text-sm">Option 1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="checkbox2" 
                      className="border-grey-400 data-[state=checked]:bg-primary-main data-[state=checked]:border-primary-main"
                    />
                    <Label htmlFor="checkbox2" className="text-sm">Option 2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="checkbox3" 
                      disabled
                      className="border-grey-400"
                    />
                    <Label htmlFor="checkbox3" className="text-sm">Disabled Option</Label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Radio Group</Label>
                <RadioGroup value={selectedRadioOption} onValueChange={setSelectedRadioOption}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="left" id="radio1" />
                    <Label htmlFor="radio1">Left alignment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="center" id="radio2" />
                    <Label htmlFor="radio2">Center alignment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="right" id="radio3" />
                    <Label htmlFor="radio3">Right alignment</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-4">
                <Label>Switches</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="notifications" 
                      checked={formData.notifications}
                      onCheckedChange={(checked) => setFormData({...formData, notifications: checked})}
                    />
                    <Label htmlFor="notifications" className="text-sm">Enable notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="switch-disabled" disabled />
                    <Label htmlFor="switch-disabled" className="text-sm">Disabled switch</Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Input Elements */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Advanced Input Elements</CardTitle>
            <CardDescription>Sliders, OTP inputs, and specialized controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Volume Slider</Label>
              <div className="px-4">
                <Slider 
                  value={formData.volume} 
                  onValueChange={(value) => setFormData({...formData, volume: value})}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-grey-500 mt-1">
                  <span>0</span>
                  <span>{formData.volume[0]}</span>
                  <span>100</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>OTP Input</Label>
              <InputOTP 
                maxLength={6} 
                value={formData.otpValue}
                onChange={(value) => setFormData({...formData, otpValue: value})}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-sm text-grey-500">Enter the 6-digit code</p>
            </div>
          </CardContent>
        </Card>

        {/* Read-Only Form Fields */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Read-Only Form Fields</CardTitle>
            <CardDescription>Display-only fields for showing data with consistent styling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <FormField label="Invoice Number" value="INV-2024-001" />
              <FormField label="Total Amount" value="$1,234.56 USD" />
              <FormField label="Issue Date" value="April 25, 2025" />
              <FormField label="Due Date" value="July 24, 2025" />
              <FormField label="Portal Status" value="Approved by Buyer" />
              <FormField label="PO Number" value="PO-2024-5678" />
              <FormField label="Currency" value="USD" />
              <FormField label="Payment Terms" value="Net 90" />
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700 mb-2"><strong>Usage:</strong></p>
              <code className="text-xs bg-white px-2 py-1 rounded border border-gray-200 block">
                {'<FormField label="Invoice Number" value="INV-2024-001" />'}
              </code>
              <p className="text-xs text-gray-500 mt-3">
                Used for displaying read-only financial data, portal records, and invoice information throughout the application.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Complete Form Example */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Form Example</CardTitle>
            <CardDescription>A functional form showcasing all elements together</CardDescription>
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

        {/* Input States Section */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Input States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Default</Label>
                  <Input placeholder="Enter text..." className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label>Focused</Label>
                  <Input placeholder="Enter text..." className="w-full ring-2 ring-[#7B59FF] ring-opacity-50" autoFocus />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Error</Label>
                  <Input placeholder="Enter text..." className="w-full border-red-500 ring-red-500" />
                  <p className="text-sm text-red-600">This field is required</p>
                </div>
                <div className="space-y-2">
                  <Label>Disabled</Label>
                  <Input placeholder="Enter text..." className="w-full" disabled />
                </div>
              </div>
              <CodeBlock 
                code={`/* Input States */
.input {
  border: 1px solid #D1D5DB;
  transition: border-color 200ms ease;
}
.input:focus {
  border-color: #7B59FF;
  ring: 2px #7B59FF50;
}
.input.error {
  border-color: #EF4444;
}
.input:disabled {
  background: #F9FAFB;
  cursor: not-allowed;
}`}
                showCode={showInputStatesCode}
                setShowCode={setShowInputStatesCode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Dropdowns Section */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Dropdowns & Select Components</CardTitle>
            <CardDescription>A collection of various dropdown components demonstrating different use cases and styling.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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

  const renderProgress = () => {
    // Sample wizard steps for demo
    const wizardSteps = [
      { id: 'upload', name: 'Upload' },
      { id: 'mapping', name: 'Mapping' },
      { id: 'review', name: 'Review' },
      { id: 'summary', name: 'Summary' }
    ];

    const scanAgentSteps = [
      { id: 'portal', name: 'Select Portal' },
      { id: 'userType', name: 'User Type' },
      { id: 'setup', name: 'Setup' }
    ];

    return (
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

        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Progress Indicators - Modals</h2>
          <p className="text-sm text-grey-600 mb-6">
            Reusable wizard progress component for multi-step modals. Used in "Add Scan Agent" and "Upload ERP Payment Report" modals.
          </p>
          
          <div className="space-y-8">
            <div className="p-6 bg-white border border-grey-300 rounded-lg">
              <Label className="text-sm font-medium mb-4 block">Upload ERP Payment Report Wizard (4 steps)</Label>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-xs text-grey-600 mb-2">Step 1: Upload</p>
                  <WizardProgress steps={wizardSteps} currentStep="upload" />
                </div>
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-xs text-grey-600 mb-2">Step 2: Mapping</p>
                  <WizardProgress steps={wizardSteps} currentStep="mapping" />
                </div>
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-xs text-grey-600 mb-2">Step 3: Review</p>
                  <WizardProgress steps={wizardSteps} currentStep="review" />
                </div>
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-xs text-grey-600 mb-2">Step 4: Summary</p>
                  <WizardProgress steps={wizardSteps} currentStep="summary" />
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-grey-300 rounded-lg">
              <Label className="text-sm font-medium mb-4 block">Add Scan Agent Wizard (3 steps)</Label>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-xs text-grey-600 mb-2">Step 1: Select Portal</p>
                  <WizardProgress steps={scanAgentSteps} currentStep="portal" />
                </div>
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-xs text-grey-600 mb-2">Step 2: User Type</p>
                  <WizardProgress steps={scanAgentSteps} currentStep="userType" />
                </div>
                <div className="p-4 bg-gray-50 rounded">
                  <p className="text-xs text-grey-600 mb-2">Step 3: Setup</p>
                  <WizardProgress steps={scanAgentSteps} currentStep="setup" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Usage</h4>
              <pre className="text-xs text-blue-800 overflow-x-auto">
{`import { WizardProgress } from '@/components/ui/wizard-progress';

const steps = [
  { id: 'step1', name: 'First Step' },
  { id: 'step2', name: 'Second Step' },
  { id: 'step3', name: 'Third Step' }
];

<WizardProgress 
  steps={steps} 
  currentStep="step2" 
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBreadcrumbs = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-grey-900 mb-6">Breadcrumb Navigation</h2>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Two Level Breadcrumb</CardTitle>
              <CardDescription>Basic navigation with parent page name</CardDescription>
            </CardHeader>
            <CardContent>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                      Dashboard
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
                      Dashboard
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
                      Dashboard
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

  const renderDesignTokens = () => {
    const tokens = [
      {
        category: "Colors",
        tokens: [
          { name: "--monto-primary", value: "#7B59FF", description: "Primary brand color" },
          { name: "--monto-secondary", value: "#9B7EFE", description: "Secondary brand color" },
          { name: "--grey-900", value: "#1A1A1A", description: "Primary text color" },
          { name: "--grey-600", value: "#6B7280", description: "Secondary text color" },
          { name: "--grey-300", value: "#D1D5DB", description: "Border color" },
          { name: "--background-paper", value: "#FFFFFF", description: "Card/paper background" },
        ]
      },
      {
        category: "Spacing",
        tokens: [
          { name: "--spacing-xs", value: "4px", description: "Extra small spacing" },
          { name: "--spacing-sm", value: "8px", description: "Small spacing" },
          { name: "--spacing-md", value: "16px", description: "Medium spacing" },
          { name: "--spacing-lg", value: "24px", description: "Large spacing" },
          { name: "--spacing-xl", value: "32px", description: "Extra large spacing" },
          { name: "--spacing-2xl", value: "48px", description: "2x large spacing" },
        ]
      },
      {
        category: "Typography",
        tokens: [
          { name: "--font-family", value: "Inter, sans-serif", description: "Primary font family" },
          { name: "--font-size-xs", value: "12px", description: "Extra small text" },
          { name: "--font-size-sm", value: "14px", description: "Small text" },
          { name: "--font-size-base", value: "16px", description: "Base text size" },
          { name: "--font-size-lg", value: "18px", description: "Large text" },
          { name: "--font-size-xl", value: "20px", description: "Extra large text" },
        ]
      }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Design Tokens</h2>
          <p className="text-sm text-grey-600 mb-4">
            Design tokens are named values that represent design decisions. They create consistency across design and development.
          </p>
        </div>
        
        {tokens.map((category, index) => (
          <Card key={index} className="shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">{category.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.tokens.map((token, tokenIndex) => (
                  <div key={tokenIndex} className="flex items-center justify-between p-3 border border-grey-300 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {category.category === "Colors" && (
                          <div 
                            className="w-8 h-8 rounded border border-grey-300"
                            style={{ backgroundColor: token.value }}
                          ></div>
                        )}
                        <div>
                          <code className="text-sm font-mono font-medium text-grey-900">{token.name}</code>
                          <p className="text-sm text-grey-600">{token.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono text-grey-700 bg-grey-300 px-2 py-1 rounded">
                        {token.value}
                      </code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(token.name)}
                        className="p-1 hover:bg-grey-200 rounded transition-colors"
                      >
                        <Copy size={14} className="text-grey-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Visual Spacing Examples */}
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Visual Spacing Examples</CardTitle>
            <CardDescription>Interactive examples showing how spacing tokens are applied in practice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Padding Examples */}
              <div>
                <h4 className="font-medium text-grey-900 mb-4">Padding Examples</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-1 rounded-md text-blue-900 font-medium text-center border border-blue-200">
                    <p className="mb-2 text-xs">XS (4px)</p>
                    <div className="w-8 h-8 bg-blue-200 mx-auto rounded-md"></div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-md text-blue-900 font-medium text-center border border-blue-200">
                    <p className="mb-2 text-xs">SM (8px)</p>
                    <div className="w-10 h-10 bg-blue-200 mx-auto rounded-md"></div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-md text-blue-900 font-medium text-center border border-blue-200">
                    <p className="mb-2 text-xs">MD (16px)</p>
                    <div className="w-12 h-12 bg-blue-200 mx-auto rounded-md"></div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-md text-blue-900 font-medium text-center border border-blue-200">
                    <p className="mb-2 text-xs">LG (24px)</p>
                    <div className="w-16 h-16 bg-blue-200 mx-auto rounded-md"></div>
                  </div>
                </div>
              </div>

              {/* Gap Examples */}
              <div>
                <h4 className="font-medium text-grey-900 mb-4">Gap Spacing Examples</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-grey-700 mb-2">Gap XS (4px)</p>
                    <div className="flex gap-1 p-3 bg-purple-50 rounded-md border border-purple-200">
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-grey-700 mb-2">Gap SM (8px)</p>
                    <div className="flex gap-2 p-3 bg-purple-50 rounded-md border border-purple-200">
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-grey-700 mb-2">Gap MD (16px)</p>
                    <div className="flex gap-4 p-3 bg-purple-50 rounded-md border border-purple-200">
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-grey-700 mb-2">Gap LG (24px)</p>
                    <div className="flex gap-6 p-3 bg-purple-50 rounded-md border border-purple-200">
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                      <div className="w-8 h-8 bg-purple-200 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Margin Examples */}
              <div>
                <h4 className="font-medium text-grey-900 mb-4">Margin Examples</h4>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded-md border border-green-200">
                    <div className="w-16 h-8 bg-green-200 rounded mb-1"></div>
                    <p className="text-xs text-green-800">Margin Bottom XS (4px)</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md border border-green-200">
                    <div className="w-16 h-8 bg-green-200 rounded mb-2"></div>
                    <p className="text-xs text-green-800">Margin Bottom SM (8px)</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md border border-green-200">
                    <div className="w-16 h-8 bg-green-200 rounded mb-4"></div>
                    <p className="text-xs text-green-800">Margin Bottom MD (16px)</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderIconography = () => {
    const iconCategories = [
      {
        name: "Navigation",
        icons: [
          { component: <Home size={24} />, name: "Home", usage: "Main navigation" },
          { component: <ArrowLeft size={24} />, name: "ArrowLeft", usage: "Back navigation" },
          { component: <ArrowRight size={24} />, name: "ArrowRight", usage: "Forward navigation" },
          { component: <Navigation size={24} />, name: "Navigation", usage: "Menu indicator" },
        ]
      },
      {
        name: "Actions",
        icons: [
          { component: <Search size={24} />, name: "Search", usage: "Search functionality" },
          { component: <Copy size={24} />, name: "Copy", usage: "Copy to clipboard" },
          { component: <X size={24} />, name: "X", usage: "Close/cancel actions" },
          { component: <Check size={24} />, name: "Check", usage: "Confirmation/success" },
        ]
      },
      {
        name: "Interface",
        icons: [
          { component: <Settings size={24} />, name: "Settings", usage: "Configuration" },
          { component: <Bell size={24} />, name: "Bell", usage: "Notifications" },
          { component: <Filter size={24} />, name: "Filter", usage: "Data filtering" },
          { component: <MoreVertical size={24} />, name: "MoreVertical", usage: "Additional options" },
        ]
      },
      {
        name: "Status",
        icons: [
          { component: <AlertCircle size={24} />, name: "AlertCircle", usage: "Warning/error" },
          { component: <Info size={24} />, name: "Info", usage: "Information" },
          { component: <CheckCircle size={24} />, name: "CheckCircle", usage: "Success confirmation" },
          { component: <Clock size={24} />, name: "Clock", usage: "Time/pending status" },
        ]
      }
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Iconography</h2>
          <p className="text-sm text-grey-600 mb-4">
            Our icon system uses Lucide React icons for consistency and scalability across the application.
          </p>
        </div>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Icon Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 border border-grey-300 rounded-lg">
                <h4 className="font-medium text-grey-900 mb-2">Sizes</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Search size={16} className="text-grey-700" />
                    <span className="text-sm">16px - Small icons (inline text)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Search size={20} className="text-grey-700" />
                    <span className="text-sm">20px - Medium icons (buttons)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Search size={24} className="text-grey-700" />
                    <span className="text-sm">24px - Large icons (headers)</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-grey-300 rounded-lg">
                <h4 className="font-medium text-grey-900 mb-2">Colors</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Search size={20} className="text-grey-900" />
                    <span className="text-sm">Grey-900 - Primary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Search size={20} className="text-grey-600" />
                    <span className="text-sm">Grey-600 - Secondary</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Search size={20} style={{ color: "#7B59FF" }} />
                    <span className="text-sm">#7B59FF - Brand</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {iconCategories.map((category, index) => (
          <Card key={index} className="shadow-none">
            <CardHeader>
              <CardTitle className="text-lg">{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.icons.map((icon, iconIndex) => (
                  <div key={iconIndex} className="flex flex-col items-center p-4 border border-grey-300 rounded-lg bg-background-paper hover:bg-grey-50 transition-colors">
                    <div className="flex items-center justify-center w-12 h-12 mb-3 text-grey-700">
                      {icon.component}
                    </div>
                    <code className="text-sm font-mono font-medium text-grey-900 mb-1">{icon.name}</code>
                    <p className="text-xs text-grey-600 text-center">{icon.usage}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderGridSystem = () => {
    const breakpoints = [
      { name: "xs", value: "0px", description: "Extra small devices" },
      { name: "sm", value: "640px", description: "Small devices (phones)" },
      { name: "md", value: "768px", description: "Medium devices (tablets)" },
      { name: "lg", value: "1024px", description: "Large devices (desktops)" },
      { name: "xl", value: "1280px", description: "Extra large devices" },
      { name: "2xl", value: "1536px", description: "2x large devices" },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Grid System</h2>
          <p className="text-sm text-grey-600 mb-4">
            Our responsive grid system is built on Tailwind CSS's flexbox-based grid with 12-column layout support.
          </p>
        </div>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Breakpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-grey-300">
                    <th className="text-left py-2 px-3 text-sm font-medium text-grey-900">Breakpoint</th>
                    <th className="text-left py-2 px-3 text-sm font-medium text-grey-900">Min Width</th>
                    <th className="text-left py-2 px-3 text-sm font-medium text-grey-900">Description</th>
                    <th className="text-left py-2 px-3 text-sm font-medium text-grey-900">Usage</th>
                  </tr>
                </thead>
                <tbody>
                  {breakpoints.map((bp, index) => (
                    <tr key={index} className="border-b border-grey-200">
                      <td className="py-3 px-3">
                        <code className="text-sm font-mono bg-grey-300 px-2 py-1 rounded">{bp.name}</code>
                      </td>
                      <td className="py-3 px-3 text-sm text-grey-700">{bp.value}</td>
                      <td className="py-3 px-3 text-sm text-grey-700">{bp.description}</td>
                      <td className="py-3 px-3 text-sm text-grey-700">
                        <code className="text-xs bg-grey-300 px-1 py-0.5 rounded">{bp.name}:class</code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Grid Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-grey-900 mb-3">12 Column Grid</h4>
                <div className="grid grid-cols-12 gap-2 mb-4">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div key={i} className="bg-[#7B59FF]/20 border border-[#7B59FF]/30 p-2 text-center text-xs rounded">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <CodeBlock code={`<div className="grid grid-cols-12 gap-4">\n  <div className="col-span-3">Quarter</div>\n  <div className="col-span-6">Half</div>\n  <div className="col-span-3">Quarter</div>\n</div>`} />
              </div>

              <div>
                <h4 className="font-medium text-grey-900 mb-3">Responsive Layout</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="bg-[#7B59FF]/20 border border-[#7B59FF]/30 p-4 text-center rounded">
                    <p className="text-sm">1 col on mobile</p>
                    <p className="text-sm">2 cols on tablet</p>
                    <p className="text-sm">3 cols on desktop</p>
                  </div>
                  <div className="bg-[#7B59FF]/20 border border-[#7B59FF]/30 p-4 text-center rounded">
                    <p className="text-sm">Responsive</p>
                  </div>
                  <div className="bg-[#7B59FF]/20 border border-[#7B59FF]/30 p-4 text-center rounded">
                    <p className="text-sm">Layout</p>
                  </div>
                </div>
                <CodeBlock code={`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">\n  <div>Item 1</div>\n  <div>Item 2</div>\n  <div>Item 3</div>\n</div>`} />
              </div>

              <div>
                <h4 className="font-medium text-grey-900 mb-3">Container Sizes</h4>
                <div className="space-y-3">
                  <div className="bg-grey-300 p-3 rounded">
                    <code className="text-sm">max-w-none</code> - Full width
                  </div>
                  <div className="bg-grey-300 p-3 rounded max-w-sm">
                    <code className="text-sm">max-w-sm</code> - 384px
                  </div>
                  <div className="bg-grey-300 p-3 rounded max-w-md">
                    <code className="text-sm">max-w-md</code> - 448px
                  </div>
                  <div className="bg-grey-300 p-3 rounded max-w-lg">
                    <code className="text-sm">max-w-lg</code> - 512px
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAnimationMotion = () => {
    const easingCurves = [
      { name: "ease-in", value: "cubic-bezier(0.4, 0, 1, 1)", description: "Starts slow, speeds up" },
      { name: "ease-out", value: "cubic-bezier(0, 0, 0.2, 1)", description: "Starts fast, slows down" },
      { name: "ease-in-out", value: "cubic-bezier(0.4, 0, 0.2, 1)", description: "Slow start and end" },
      { name: "linear", value: "cubic-bezier(0, 0, 1, 1)", description: "Constant speed" },
    ];

    const animationExamples = [
      { name: "Fade In", class: "animate-fadeIn", duration: "300ms" },
      { name: "Slide Up", class: "animate-slideUp", duration: "400ms" },
      { name: "Scale", class: "animate-scale", duration: "200ms" },
      { name: "Bounce", class: "animate-bounce", duration: "600ms" },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Animation & Motion</h2>
          <p className="text-sm text-grey-600 mb-4">
            Motion design principles and animation guidelines for creating smooth, purposeful interactions.
          </p>
        </div>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Motion Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-grey-300 rounded-lg">
                <h4 className="font-medium text-grey-900 mb-2">Purpose</h4>
                <p className="text-sm text-grey-600">
                  Every animation should have a clear purpose - guide attention, provide feedback, or show relationships.
                </p>
              </div>
              <div className="p-4 border border-grey-300 rounded-lg">
                <h4 className="font-medium text-grey-900 mb-2">Performance</h4>
                <p className="text-sm text-grey-600">
                  Keep animations smooth (60fps) and lightweight. Use transform and opacity for best performance.
                </p>
              </div>
              <div className="p-4 border border-grey-300 rounded-lg">
                <h4 className="font-medium text-grey-900 mb-2">Accessibility</h4>
                <p className="text-sm text-grey-600">
                  Respect users' preferences for reduced motion and provide alternatives when needed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Duration Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-grey-300 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-grey-900">Micro-interactions</h4>
                  <span className="text-sm text-grey-600">100-200ms</span>
                </div>
                <p className="text-sm text-grey-600">Button hovers, focus states, small UI feedback</p>
              </div>
              <div className="p-4 border border-grey-300 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-grey-900">UI Transitions</h4>
                  <span className="text-sm text-grey-600">200-400ms</span>
                </div>
                <p className="text-sm text-grey-600">Modal appearances, dropdown animations, tab switches</p>
              </div>
              <div className="p-4 border border-grey-300 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-grey-900">Page Transitions</h4>
                  <span className="text-sm text-grey-600">400-600ms</span>
                </div>
                <p className="text-sm text-grey-600">Route changes, large layout shifts, complex animations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Easing Curves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {easingCurves.map((curve, index) => (
                <div key={index} className="p-4 border border-grey-300 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-grey-900">{curve.name}</h4>
                      <p className="text-sm text-grey-600">{curve.description}</p>
                    </div>
                    <code className="text-sm bg-grey-300 px-2 py-1 rounded">{curve.value}</code>
                  </div>
                  <div className="relative h-8 bg-grey-300 rounded overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full w-8 bg-[#7B59FF] animate-[slideRight_2s_infinite]"
                      style={{ animationTimingFunction: curve.value }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Interactive Examples</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Button 
                    onClick={() => setAnimationVisible(!animationVisible)}
                    className="bg-[#7B59FF] hover:bg-[#6B4FE8] text-white"
                  >
                    Toggle Animation
                  </Button>
                  <span className="text-sm text-grey-600">Click to see enter/exit animations</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {animationVisible && animationExamples.map((example, index) => (
                    <div 
                      key={index}
                      className={`p-4 bg-[#7B59FF]/10 border border-[#7B59FF]/30 rounded-lg text-center transition-all duration-300 ease-out`}
                      style={{ 
                        animation: `fadeInUp 0.4s ease-out ${index * 100}ms both`
                      }}
                    >
                      <div className="text-sm font-medium text-grey-900 mb-1">{example.name}</div>
                      <div className="text-xs text-grey-600">{example.duration}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-grey-900 mb-3">Common CSS Animations</h4>
                <CodeBlock code={`/* Fade In */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Slide Right */
@keyframes slideRight {
  from { transform: translateX(0); }
  to { transform: translateX(calc(100% - 32px)); }
}

/* Scale */
.animate-scale {
  transition: transform 200ms cubic-bezier(0, 0, 0.2, 1);
}
.animate-scale:hover {
  transform: scale(1.05);
}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderComponentStates = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-grey-900 mb-6">Component States</h2>
          <p className="text-sm text-grey-600 mb-4">
            Visual states provide feedback and guide user interactions across all components.
          </p>
        </div>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Button States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-3">
                <Button className="w-full bg-[#7B59FF] hover:bg-[#6B4FE8] text-white">
                  Default
                </Button>
                <p className="text-sm text-grey-600 text-center">Default state</p>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-[#6B4FE8] text-white">
                  Hover
                </Button>
                <p className="text-sm text-grey-600 text-center">Hover state</p>
              </div>
              <div className="space-y-3">
                <Button className="w-full bg-[#5B3FD8] text-white">
                  Active
                </Button>
                <p className="text-sm text-grey-600 text-center">Active/pressed state</p>
              </div>
              <div className="space-y-3">
                <Button disabled className="w-full">
                  Disabled
                </Button>
                <p className="text-sm text-grey-600 text-center">Disabled state</p>
              </div>
            </div>
            <div className="mt-6">
              <CodeBlock code={`/* Button States */
.button-primary {
  background: #7B59FF;
  transition: background 200ms ease;
}
.button-primary:hover {
  background: #6B4FE8;
}
.button-primary:active {
  background: #5B3FD8;
}
.button-primary:disabled {
  background: #D1D5DB;
  cursor: not-allowed;
}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Loading States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <Button disabled className="w-full">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </Button>
                  <p className="text-sm text-grey-600 text-center">Button loading</p>
                </div>
                <div className="space-y-3 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#7B59FF]"></div>
                  <p className="text-sm text-grey-600">Spinner</p>
                </div>
                <div className="space-y-3">
                  <div className="w-full bg-grey-200 rounded-full h-2">
                    <div className="bg-[#7B59FF] h-2 rounded-full w-3/5 animate-pulse"></div>
                  </div>
                  <p className="text-sm text-grey-600 text-center">Progress bar</p>
                </div>
              </div>
              <CodeBlock code={`/* Loading States */
.spinner {
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.progress-bar {
  background: linear-gradient(90deg, 
    transparent, 
    rgba(123, 89, 255, 0.4), 
    transparent
  );
  animation: shimmer 2s infinite;
}`} />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle className="text-lg">Interactive States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover:shadow-lg hover:border-[#7B59FF]/20 transition-all cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium text-grey-900">Hover Card</h4>
                    <p className="text-sm text-grey-600">Hover me</p>
                  </CardContent>
                </Card>
                <Card className="shadow-md border-[#7B59FF]/30">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium text-grey-900">Selected Card</h4>
                    <p className="text-sm text-grey-600">Selected state</p>
                  </CardContent>
                </Card>
                <Card className="opacity-50">
                  <CardContent className="p-4 text-center">
                    <h4 className="font-medium text-grey-900">Disabled Card</h4>
                    <p className="text-sm text-grey-600">Disabled state</p>
                  </CardContent>
                </Card>
              </div>
              <div>
                <h4 className="font-medium text-grey-900 mb-3">State Guidelines</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <h5 className="font-medium text-grey-900 mb-2">Visual Feedback</h5>
                    <ul className="text-sm text-grey-600 space-y-1">
                      <li>• Provide immediate feedback for all interactions</li>
                      <li>• Use consistent hover effects across similar components</li>
                      <li>• Maintain accessibility standards for all states</li>
                    </ul>
                  </div>
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <h5 className="font-medium text-grey-900 mb-2">Performance</h5>
                    <ul className="text-sm text-grey-600 space-y-1">
                      <li>• Keep state transitions under 200ms</li>
                      <li>• Use CSS transitions for smooth animations</li>
                      <li>• Avoid complex effects that impact performance</li>
                    </ul>
                  </div>
                </div>
              </div>
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

  const renderIcons = () => {
    const IconCard = ({ icon: Icon, name, usage, location, code, customColor }) => {
      const [showCode, setShowCode] = useState(false);

      return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: '#EFEBFF' }}>
                <Icon 
                  strokeWidth={0.75} 
                  className="w-6 h-6" 
                  style={{ color: customColor || '#7B59FF' }} 
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{name}</h3>
                <p className="text-sm text-gray-600">{usage}</p>
              </div>
            </div>
          </div>
          
          <div className="mb-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium" 
              style={{ backgroundColor: '#EFEBFF', color: '#7B59FF' }}>
              {location}
            </span>
          </div>

          <button
            onClick={() => setShowCode(!showCode)}
            className="text-sm font-medium"
            style={{ color: '#7B59FF' }}
            onMouseEnter={(e) => e.target.style.color = '#5A3FCC'}
            onMouseLeave={(e) => e.target.style.color = '#7B59FF'}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>

          {showCode && (
            <div className="mt-3 p-3 bg-gray-50 rounded-md overflow-x-auto">
              <pre className="text-xs text-gray-700">
                <code>{code}</code>
              </pre>
            </div>
          )}
        </div>
      );
    };

    const Tab = ({ label, isActive, onClick, count }) => (
      <button
        onClick={onClick}
        className={`px-4 py-2 font-medium text-sm transition-all border-b-2 text-left`}
        style={{
          color: isActive ? '#7B59FF' : '#6B7280',
          borderBottomColor: isActive ? '#7B59FF' : 'transparent'
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.target.style.color = '#374151';
            e.target.style.borderBottomColor = '#E5E7EB';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.target.style.color = '#6B7280';
            e.target.style.borderBottomColor = 'transparent';
          }
        }}
      >
        {label} 
        <span className="ml-2 text-xs px-2 py-0.5 rounded-full"
          style={{ backgroundColor: '#EFEBFF', color: '#7B59FF' }}>
          {count}
        </span>
      </button>
    );

    const iconsByLocation = {
      navigation: {
        label: 'Navigation Bar',
        description: 'Icons in the side navigation menu',
        icons: [
          {
            icon: LayoutDashboard,
            name: "LayoutDashboard",
            usage: "Home dashboard link",
            location: "Side Navigation",
            code: `import { LayoutDashboard } from 'lucide-react';

function NavHome() {
  return <LayoutDashboard strokeWidth={0.75} />;
}`
          },
          {
            icon: WandSparkles,
            name: "WandSparkles",
            usage: "Portals Dashboard link",
            location: "Side Navigation",
            code: `import { WandSparkles } from 'lucide-react';

function NavPortals() {
  return <WandSparkles strokeWidth={0.75} />;
}`
          },
          {
            icon: ArrowLeftRight,
            name: "ArrowLeftRight",
            usage: "Request-to-Pay module link",
            location: "Side Navigation",
            code: `import { ArrowLeftRight } from 'lucide-react';

function NavRTP() {
  return <ArrowLeftRight strokeWidth={0.75} />;
}`
          },
          {
            icon: Cable,
            name: "Cable",
            usage: "Connection Hub link",
            location: "Side Navigation",
            code: `import { Cable } from 'lucide-react';

function NavConnectionHub() {
  return <Cable strokeWidth={0.75} />;
}`
          },
          {
            icon: Building,
            name: "Building",
            usage: "My Company settings link",
            location: "Side Navigation",
            code: `import { Building } from 'lucide-react';

function NavCompany() {
  return <Building strokeWidth={0.75} />;
}`
          }
        ]
      },
      home: {
        label: 'Home Dashboard',
        description: 'Icons used in dashboard cards and metrics',
        icons: [
          {
            icon: TrendingUp,
            name: "TrendingUp",
            usage: "Transaction trends indicator",
            location: "Transactions Card",
            code: `import { TrendingUp } from 'lucide-react';

function TransactionsTrend() {
  return <TrendingUp strokeWidth={0.75} className="icon" />;
}`
          },
          {
            icon: ArrowRight,
            name: "ArrowRight",
            usage: "Navigate to details link",
            location: "Card Links",
            code: `import { ArrowRight } from 'lucide-react';

function DetailLink() {
  return <ArrowRight strokeWidth={1} className="link-icon" />;
}`
          },
          {
            icon: FileText,
            name: "FileText",
            usage: "Documents/invoices indicator",
            location: "Account Receivables",
            code: `import { FileText } from 'lucide-react';

function DocumentIcon() {
  return <FileText strokeWidth={0.75} />;
}`
          },
          {
            icon: BarChart,
            name: "BarChart",
            usage: "Chart view toggle",
            location: "View Toggle",
            code: `import { BarChart } from 'lucide-react';

function ChartViewToggle() {
  return <BarChart strokeWidth={0.75} />;
}`
          },
          {
            icon: List,
            name: "List",
            usage: "List view toggle",
            location: "View Toggle",
            code: `import { List } from 'lucide-react';

function ListViewToggle() {
  return <List strokeWidth={0.75} />;
}`
          },
          {
            icon: Link,
            name: "Link",
            usage: "Connection status/errors",
            location: "Smart Connection Card",
            code: `import { Link } from 'lucide-react';

function ConnectionIcon() {
  return <Link strokeWidth={0.75} />;
}`
          },
          {
            icon: TriangleAlert,
            name: "TriangleAlert",
            usage: "Exception/warning indicator",
            location: "Exception Cards",
            customColor: '#EF4444',
            code: `import { TriangleAlert } from 'lucide-react';

function ExceptionAlert() {
  return <TriangleAlert strokeWidth={0.75} className="text-red-500" />;
}`
          },
          {
            icon: Building,
            name: "Building",
            usage: "Total customers metric",
            location: "Metrics Tile",
            code: `import { Building } from 'lucide-react';

function CustomersMetric() {
  return <Building strokeWidth={0.75} />;
}`
          },
          {
            icon: CreditCard,
            name: "CreditCard",
            usage: "Connected portals metric",
            location: "Metrics Tile",
            code: `import { CreditCard } from 'lucide-react';

function PortalsMetric() {
  return <CreditCard strokeWidth={0.75} />;
}`
          },
          {
            icon: Calendar,
            name: "Calendar",
            usage: "Date/period selector",
            location: "Date Picker",
            code: `import { Calendar } from 'lucide-react';

function DateSelector() {
  return <Calendar strokeWidth={0.75} />;
}`
          },
          {
            icon: ChevronDown,
            name: "ChevronDown",
            usage: "Period dropdown",
            location: "Date Picker",
            code: `import { ChevronDown } from 'lucide-react';

function PeriodDropdown() {
  return <ChevronDown strokeWidth={1} />;
}`
          }
        ]
      },
      rtp: {
        label: 'Request-to-Pay',
        description: 'Icons in the Request-to-Pay module',
        icons: [
          {
            icon: Copy,
            name: "Copy",
            usage: "Copy invoice number to clipboard",
            location: "Table Rows",
            code: `import { Copy } from 'lucide-react';

function CopyInvoiceButton() {
  return <Copy strokeWidth={0.75} onClick={copyToClipboard} />;
}`
          },
          {
            icon: ChevronRight,
            name: "ChevronRight",
            usage: "Expand row details",
            location: "Table Rows",
            code: `import { ChevronRight } from 'lucide-react';

function ExpandRow({ expanded }) {
  return <ChevronRight 
    strokeWidth={1} 
    className={expanded ? 'rotate-90' : ''} 
  />;
}`
          }
        ]
      },
      connection: {
        label: 'Connection Hub',
        description: 'Icons in Smart Connections and Scan Agents',
        icons: [
          {
            icon: ChevronDown,
            name: "ChevronDown",
            usage: "Filter dropdowns",
            location: "Filter Controls",
            code: `import { ChevronDown } from 'lucide-react';

function FilterDropdown() {
  return <ChevronDown strokeWidth={1} />;
}`
          },
          {
            icon: ChevronRight,
            name: "ChevronRight",
            usage: "Expand row details",
            location: "Table Rows",
            code: `import { ChevronRight } from 'lucide-react';

function ExpandRow({ expanded }) {
  return <ChevronRight strokeWidth={1} className={expanded ? 'rotate-90' : ''} />;
}`
          },
          {
            icon: TriangleAlert,
            name: "TriangleAlert",
            usage: "Missing credentials warning",
            location: "Issues Column",
            customColor: '#F97316',
            code: `import { TriangleAlert } from 'lucide-react';

function IssueIndicator() {
  return <TriangleAlert strokeWidth={0.75} className="text-orange-500" />;
}`
          },
          {
            icon: Plus,
            name: "Plus",
            usage: "Add Scan Agent button",
            location: "Scan Agents Tab",
            code: `import { Plus } from 'lucide-react';

function AddScanAgentButton() {
  return <Plus strokeWidth={1} />;
}`
          },
          {
            icon: Search,
            name: "Search",
            usage: "Search bar icon",
            location: "Search Input",
            code: `import { Search } from 'lucide-react';

function SearchIcon() {
  return <Search strokeWidth={0.75} />;
}`
          },
          {
            icon: EllipsisVertical,
            name: "EllipsisVertical",
            usage: "Row actions menu",
            location: "Action Menu",
            code: `import { EllipsisVertical } from 'lucide-react';

function ActionMenu() {
  return <EllipsisVertical strokeWidth={0.75} />;
}`
          },
          {
            icon: CirclePlus,
            name: "CirclePlus",
            usage: "Connect portal action",
            location: "Portal Connection",
            code: `import { CirclePlus } from 'lucide-react';

function ConnectPortal() {
  return <CirclePlus strokeWidth={0.75} />;
}`
          }
        ]
      },
      company: {
        label: 'My Company',
        description: 'Icons in Company Info, Team, and License sections',
        icons: [
          {
            icon: CloudUpload,
            name: "CloudUpload",
            usage: "Upload company logo",
            location: "Company Info Tab",
            code: `import { CloudUpload } from 'lucide-react';

function LogoUpload() {
  return <CloudUpload strokeWidth={0.75} />;
}`
          },
          {
            icon: ChevronDown,
            name: "ChevronDown",
            usage: "Timezone/dropdown fields",
            location: "Form Dropdowns",
            code: `import { ChevronDown } from 'lucide-react';

function FormDropdown() {
  return <ChevronDown strokeWidth={1} />;
}`
          },
          {
            icon: UserPlus,
            name: "UserPlus",
            usage: "Add new team member",
            location: "Team Tab",
            code: `import { UserPlus } from 'lucide-react';

function AddMemberButton() {
  return <UserPlus strokeWidth={0.75} />;
}`
          },
          {
            icon: EllipsisVertical,
            name: "EllipsisVertical",
            usage: "Team member actions",
            location: "Team Tab",
            code: `import { EllipsisVertical } from 'lucide-react';

function MemberActions() {
  return <EllipsisVertical strokeWidth={0.75} />;
}`
          },
          {
            icon: Link,
            name: "Link",
            usage: "Smart Connects feature",
            location: "License Tab",
            code: `import { Link } from 'lucide-react';

function SmartConnectsCard() {
  return <Link strokeWidth={0.75} />;
}`
          },
          {
            icon: Users,
            name: "Users",
            usage: "Licensed users count",
            location: "License Tab",
            code: `import { Users } from 'lucide-react';

function UsersCard() {
  return <Users strokeWidth={0.75} />;
}`
          },
          {
            icon: FileText,
            name: "FileText",
            usage: "Invoices/documents tracked",
            location: "License Tab",
            code: `import { FileText } from 'lucide-react';

function InvoicesCard() {
  return <FileText strokeWidth={0.75} />;
}`
          },
          {
            icon: BarChart,
            name: "BarChart",
            usage: "PO Dashboard feature",
            location: "License Tab",
            code: `import { BarChart } from 'lucide-react';

function PODashboardCard() {
  return <BarChart strokeWidth={0.75} />;
}`
          },
          {
            icon: FileLock,
            name: "FileLock",
            usage: "Locked feature indicator",
            location: "License Tab",
            code: `import { FileLock } from 'lucide-react';

function LockedFeature() {
  return <FileLock strokeWidth={0.75} />;
}`
          }
        ]
      },
      portals: {
        label: 'Portals Dashboard',
        description: 'Icons in the Portals Dashboard section',
        icons: [
          {
            icon: ChevronDown,
            name: "ChevronDown",
            usage: "Filter dropdowns",
            location: "Filters",
            code: `import { ChevronDown } from 'lucide-react';

function FilterDropdown() {
  return <ChevronDown strokeWidth={1} />;
}`
          },
          {
            icon: Search,
            name: "Search",
            usage: "Search inputs",
            location: "Search Bar",
            code: `import { Search } from 'lucide-react';

function SearchInput() {
  return <Search strokeWidth={0.75} />;
}`
          },
          {
            icon: CirclePlus,
            name: "CirclePlus",
            usage: "Add portal action",
            location: "Overview Section",
            code: `import { CirclePlus } from 'lucide-react';

function AddPortal() {
  return <CirclePlus strokeWidth={0.75} />;
}`
          }
        ]
      }
    };

    const currentSection = iconsByLocation[activeIconTab];

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Platform Icon Inventory
          </h1>
          <p className="text-gray-600">
            Visual guide to all Lucide icons used in the Lovable platformv1 web app. 
            Navigate by location using the tabs below.
          </p>
        </div>

        <div className="mb-6 p-4 rounded-lg border"
          style={{ backgroundColor: '#EFEBFF', borderColor: '#BEADFF' }}>
          <p className="text-sm" style={{ color: '#7B59FF' }}>
            <strong>Note:</strong> All icons use stroke widths between 0.75px and 1px. 
            Click on any icon card to reveal the implementation code.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6 justify-start text-left" aria-label="Tabs">
              {Object.entries(iconsByLocation).map(([key, section]) => (
                <Tab
                  key={key}
                  label={section.label}
                  isActive={activeIconTab === key}
                  onClick={() => setActiveIconTab(key)}
                  count={section.icons.length}
                />
              ))}
            </nav>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {currentSection.label}
          </h2>
          <p className="text-gray-600">{currentSection.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentSection.icons.map((icon, index) => (
            <IconCard key={index} {...icon} />
          ))}
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return renderHome();
      case "color-palette":
        return renderColorPalette();
      case "typography":
        return renderTypography();
      case "buttons":
        return renderButtons();
      case "status-badges":
        return renderStatusBadges();
      case "tab-navigation":
        return renderTabNavigation();
      case "filter-components":
        return renderFilterComponents();
      case "layout-patterns":
        return renderLayoutPatterns();
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
      case "breadcrumbs":
        return renderBreadcrumbs();
      case "brand-assets":
        return renderBrandAssets();
      case "portal-logos":
        return renderPortalLogos();
      case "design-tokens":
        return renderDesignTokens();
      case "icons":
        return renderIcons();
      case "grid-system":
        return renderGridSystem();
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0 border-r bg-white">
        <div className="p-4 flex items-center">
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
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Design System</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          {/* Content */}
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
