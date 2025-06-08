import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { StatusBadge } from '@/components/ui/status-badge';
import { DesignTabs } from '@/components/ui/design-tabs';
import { DesignFilterDropdown } from '@/components/ui/design-filter-dropdown';
import { DesignFilterChip } from '@/components/ui/design-filter-chip';
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from '@/lib/toast-helpers';
import { Typography } from '@/components/ui/typography/typography';
import { MontoLogo } from '@/components/MontoLogo';
import MontoIcon from '@/components/MontoIcon';
import { 
  Home, 
  Palette, 
  Type, 
  Square, 
  Zap, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle,
  MoreVertical,
  ChevronDown,
  Copy,
  Download,
  FileText,
  Image as ImageIcon,
  Edit,
  Trash2,
  Settings,
  Filter,
  Tags
} from 'lucide-react';

const DesignSystemPlayground = () => {
  const [activeSection, setActiveSection] = useState('colors');
  const [activeTab, setActiveTab] = useState('all');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterBuyer, setFilterBuyer] = useState<string>('All');
  const [activeFilters, setActiveFilters] = useState<Array<{label: string, value: string}>>([]);

  // Sample data for demonstrations
  const sampleTabs = [
    { id: 'all', label: 'All Items', count: 156 },
    { id: 'pending', label: 'Pending Action', count: 23 },
    { id: 'completed', label: 'Completed', count: 89 },
    { id: 'overdue', label: 'Overdue', count: 12 },
  ];

  const statusOptions = ['Paid', 'Pending Action', 'Settled', 'RTP Sent', 'Rejected by Buyer'];
  const buyerOptions = ['ABC Corp', 'XYZ Ltd', 'Global Industries', 'Tech Solutions'];

  // Copy to clipboard function
  const copyToClipboard = async (text: string, description: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccessToast('Copied!', `${description} copied to clipboard`);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showSuccessToast('Copied!', `${description} copied to clipboard`);
    }
  };

  const ColorSwatch = ({ name, value, description }: { name: string; value: string; description?: string }) => (
    <div className="flex items-center justify-between p-3 border border-grey-300 rounded-lg hover:border-primary-main transition-colors">
      <div className="flex items-center space-x-3">
        <div 
          className="w-8 h-8 rounded border border-grey-300 flex-shrink-0" 
          style={{ backgroundColor: value }}
        />
        <div>
          <div className="font-medium text-grey-800">{name}</div>
          {description && <div className="text-sm text-grey-600">{description}</div>}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <code className="text-sm text-grey-700 bg-grey-200 px-2 py-1 rounded">{value}</code>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(value, `${name} color`)}
          className="h-8 w-8 p-0 hover:bg-grey-200"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const LogoShowcase = ({ title, children, svgCode, width, height }: { 
    title: string; 
    children: React.ReactNode; 
    svgCode: string;
    width: number;
    height: number;
  }) => (
    <div className="border border-grey-300 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-grey-800">{title}</h4>
        <div className="flex space-x-2">
          <span className="text-sm text-grey-600">{width}×{height}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(svgCode, `${title} SVG code`)}
            className="h-8 w-8 p-0 hover:bg-grey-200"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="bg-grey-200 rounded p-6 flex items-center justify-center min-h-[80px]">
        {children}
      </div>
    </div>
  );

  // Handle filter changes
  const handleStatusFilter = (value: string | string[]) => {
    setFilterStatus(Array.isArray(value) ? value : [value]);
    updateActiveFilters('Status', Array.isArray(value) ? value : [value]);
  };

  const handleBuyerFilter = (value: string | string[]) => {
    const buyerValue = Array.isArray(value) ? value[0] : value;
    setFilterBuyer(buyerValue);
    updateActiveFilters('Buyer', [buyerValue]);
  };

  const updateActiveFilters = (label: string, values: string[]) => {
    const newFilters = activeFilters.filter(f => f.label !== label);
    values.forEach(value => {
      if (value !== 'All' && value !== '') {
        newFilters.push({ label, value });
      }
    });
    setActiveFilters(newFilters);
  };

  const removeFilter = (label: string, value: string) => {
    if (label === 'Status') {
      setFilterStatus(prev => prev.filter(s => s !== value));
    } else if (label === 'Buyer') {
      setFilterBuyer('All');
    }
    setActiveFilters(prev => prev.filter(f => !(f.label === label && f.value === value)));
  };

  const sidebarItems = [
    { id: 'colors', label: 'Color Palette', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing & Layout', icon: Square },
    { id: 'buttons', label: 'Buttons', icon: Square },
    { id: 'badges', label: 'Status Badges', icon: Zap },
    { id: 'tabs', label: 'Tab Navigation', icon: Tags },
    { id: 'filters', label: 'Filter Components', icon: Filter },
    { id: 'alerts', label: 'Alerts', icon: AlertCircle },
    { id: 'progress', label: 'Progress', icon: CheckCircle },
    { id: 'modals', label: 'Modals', icon: Square },
    { id: 'toasts', label: 'Toast Notifications', icon: Info },
    { id: 'dropdowns', label: 'Dropdowns', icon: ChevronDown },
    { id: 'forms', label: 'Form Elements', icon: Settings },
    { id: 'tables', label: 'Tables', icon: FileText },
    { id: 'breadcrumbs', label: 'Breadcrumbs', icon: Home },
    { id: 'brand', label: 'Brand Assets', icon: ImageIcon },
  ];

  const primaryColors = [
    { name: 'primary-lighter', value: '#EFEBFF', description: 'Lightest purple for subtle backgrounds' },
    { name: 'primary-light', value: '#BEADFF', description: 'Light purple for secondary elements' },
    { name: 'primary-main', value: '#7B59FF', description: 'Main brand purple for primary actions' },
    { name: 'primary-dark', value: '#523BAA', description: 'Dark purple for active states' },
    { name: 'primary-darker', value: '#291E55', description: 'Darkest purple for maximum emphasis' },
    { name: 'primary-contrast-text', value: '#FFFFFF', description: 'White text for primary backgrounds' },
  ];

  const statusColors = [
    { name: 'success-main', value: '#007737', description: 'Green for success states' },
    { name: 'error-main', value: '#DF1C41', description: 'Red for error states' },
    { name: 'warning-main', value: '#F2AE40', description: 'Orange for warning states' },
    { name: 'info-main', value: '#375DFB', description: 'Blue for informational states' },
  ];

  const greyColors = [
    { name: 'grey-0', value: '#FFFFFF', description: 'Pure white' },
    { name: 'grey-100', value: '#707C87', description: 'Light grey for subtle text' },
    { name: 'grey-200', value: '#F4F6F8', description: 'Very light grey for backgrounds' },
    { name: 'grey-300', value: '#F1F1F3', description: 'Light grey for borders' },
    { name: 'grey-400', value: '#E6E7EB', description: 'Medium light grey' },
    { name: 'grey-500', value: '#8C94A9', description: 'Medium grey for secondary text' },
    { name: 'grey-600', value: '#818799', description: 'Darker grey for body text' },
    { name: 'grey-700', value: '#586079', description: 'Dark grey for subheadings' },
    { name: 'grey-800', value: '#38415F', description: 'Very dark grey for headings' },
    { name: 'grey-900', value: '#061237', description: 'Near black for emphasis' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'colors':
        return (
          <div className="space-y-8">
            <div>
              <Typography variant="h3" className="mb-4">Primary Colors</Typography>
              <div className="grid gap-3">
                {primaryColors.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-4">Status Colors</Typography>
              <div className="grid gap-3">
                {statusColors.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-4">Grey Scale</Typography>
              <div className="grid gap-3">
                {greyColors.map((color) => (
                  <ColorSwatch key={color.name} {...color} />
                ))}
              </div>
            </div>
          </div>
        );

      case 'badges':
        return (
          <div className="space-y-8">
            <Typography variant="h3" className="mb-6">Status Badge System</Typography>
            
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-4">Invoice Status Badges</Typography>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="p-4 border border-grey-300 rounded-lg space-y-2">
                    <StatusBadge status="Paid" />
                    <Typography variant="caption" className="block">Success state - Payment completed</Typography>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg space-y-2">
                    <StatusBadge status="Pending Action" />
                    <Typography variant="caption" className="block">Requires attention or action</Typography>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg space-y-2">
                    <StatusBadge status="Settled" />
                    <Typography variant="caption" className="block">Payment has been settled</Typography>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg space-y-2">
                    <StatusBadge status="RTP Sent" />
                    <Typography variant="caption" className="block">Real-time payment sent</Typography>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg space-y-2">
                    <StatusBadge status="Rejected by Buyer" />
                    <Typography variant="caption" className="block">Invoice rejected by buyer</Typography>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg space-y-2">
                    <StatusBadge status="Approved by Buyer" />
                    <Typography variant="caption" className="block">Invoice approved by buyer</Typography>
                  </div>
                </div>
              </div>

              <div className="bg-grey-100 p-6 rounded-lg">
                <Typography variant="h4" className="mb-3">Usage Guidelines</Typography>
                <div className="space-y-2 text-sm text-grey-700">
                  <p>• Status badges automatically apply appropriate colors based on status type</p>
                  <p>• Hover over any badge to see additional context in tooltips</p>
                  <p>• Colors follow semantic meaning: green for success, red for errors, orange for warnings</p>
                  <p>• Use consistent status names across the application for visual consistency</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tabs':
        return (
          <div className="space-y-8">
            <Typography variant="h3" className="mb-6">Tab Navigation System</Typography>
            
            <div className="space-y-8">
              <div>
                <Typography variant="h4" className="mb-4">Basic Tab Navigation</Typography>
                <div className="border border-grey-300 rounded-lg p-6">
                  <DesignTabs 
                    tabs={sampleTabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                  <div className="mt-4 p-4 bg-grey-100 rounded">
                    <Typography variant="body2">
                      Current active tab: <strong>{sampleTabs.find(t => t.id === activeTab)?.label}</strong>
                    </Typography>
                  </div>
                </div>
              </div>

              <div>
                <Typography variant="h4" className="mb-4">Tab Variants</Typography>
                <div className="space-y-4">
                  <div className="border border-grey-300 rounded-lg p-6">
                    <Typography variant="subtitle2" className="mb-3">With Count Badges</Typography>
                    <DesignTabs 
                      tabs={[
                        { id: 'invoices', label: 'Invoices', count: 24 },
                        { id: 'pending', label: 'Pending', count: 8 },
                        { id: 'completed', label: 'Completed', count: 16 }
                      ]}
                      activeTab="invoices"
                      onTabChange={() => {}}
                    />
                  </div>
                  
                  <div className="border border-grey-300 rounded-lg p-6">
                    <Typography variant="subtitle2" className="mb-3">Without Count Badges</Typography>
                    <DesignTabs 
                      tabs={[
                        { id: 'overview', label: 'Overview' },
                        { id: 'details', label: 'Details' },
                        { id: 'history', label: 'History' }
                      ]}
                      activeTab="overview"
                      onTabChange={() => {}}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-grey-100 p-6 rounded-lg">
                <Typography variant="h4" className="mb-3">Implementation Example</Typography>
                <pre className="text-sm bg-background-paper p-4 rounded border overflow-x-auto">
{`<DesignTabs 
  tabs={[
    { id: 'all', label: 'All Items', count: 156 },
    { id: 'pending', label: 'Pending', count: 23 }
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
/>`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 'filters':
        return (
          <div className="space-y-8">
            <Typography variant="h3" className="mb-6">Filter Component System</Typography>
            
            <div className="space-y-8">
              <div>
                <Typography variant="h4" className="mb-4">Filter Dropdowns</Typography>
                <div className="border border-grey-300 rounded-lg p-6 space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <DesignFilterDropdown
                      label="Status"
                      value={filterStatus}
                      options={statusOptions}
                      onSelect={handleStatusFilter}
                      multiSelect
                      searchable
                    />
                    
                    <DesignFilterDropdown
                      label="Buyer"
                      value={filterBuyer}
                      options={['All', ...buyerOptions]}
                      onSelect={handleBuyerFilter}
                      searchable
                    />
                  </div>
                  
                  {activeFilters.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {activeFilters.map((filter, index) => (
                        <DesignFilterChip
                          key={`${filter.label}-${filter.value}-${index}`}
                          label={filter.label}
                          value={filter.value}
                          onRemove={() => removeFilter(filter.label, filter.value)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Typography variant="h4" className="mb-4">Filter Features</Typography>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Multi-Select Filtering</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Typography variant="body2" className="text-grey-600">
                        Support for selecting multiple values with visual checkmarks and count indicators.
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Search Within Filters</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Typography variant="body2" className="text-grey-600">
                        Built-in search functionality to quickly find options in large lists.
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Active Filter Chips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Typography variant="body2" className="text-grey-600">
                        Visual indicators of active filters with easy removal functionality.
                      </Typography>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Smooth Animations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Typography variant="body2" className="text-grey-600">
                        Framer Motion animations for dropdown appearance and filter chip interactions.
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-grey-100 p-6 rounded-lg">
                <Typography variant="h4" className="mb-3">Implementation Guidelines</Typography>
                <div className="space-y-2 text-sm text-grey-700">
                  <p>• Use multi-select for filters that benefit from multiple selections (like status, categories)</p>
                  <p>• Enable search for filters with many options (>10 items)</p>
                  <p>• Always show active filters as removable chips below the filter controls</p>
                  <p>• Maintain filter state in parent component for proper data flow</p>
                  <p>• Use consistent labeling: "Label: Value" format for chips</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'typography':
        return (
          <div className="space-y-8">
            <Typography variant="h3" className="mb-6">Typography Scale</Typography>
            
            <div className="space-y-8">
              <div>
                <Typography variant="h4" className="mb-4 text-grey-800">Headings</Typography>
                <div className="space-y-6">
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="h1" className="mb-2">H1 Display Heading</Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 60px (3.75rem) on large screens</p>
                      <p>Font Weight: 500 (Medium)</p>
                      <p>Line Height: 1.2</p>
                      <p>Usage: Hero sections, page titles</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="h2" className="mb-2">H2 Section Heading</Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 48px (3rem) on large screens</p>
                      <p>Font Weight: 500 (Medium)</p>
                      <p>Line Height: 1.25</p>
                      <p>Usage: Major section headings</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="h3" className="mb-2">H3 Subsection Heading</Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 30px (1.875rem)</p>
                      <p>Font Weight: 500 (Medium)</p>
                      <p>Line Height: 1.375</p>
                      <p>Usage: Content sections, component titles</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="h4" className="mb-2">H4 Component Heading</Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 24px (1.5rem)</p>
                      <p>Font Weight: 700 (Bold)</p>
                      <p>Line Height: 1.5</p>
                      <p>Usage: Component headers, card titles</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="h5" className="mb-2">H5 Small Heading</Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 20px (1.25rem)</p>
                      <p>Font Weight: 600 (Semibold)</p>
                      <p>Line Height: 1.5</p>
                      <p>Usage: Emphasized content, small headers</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="h6" className="mb-2">H6 Micro Heading</Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 16px (1rem)</p>
                      <p>Font Weight: 500 (Medium)</p>
                      <p>Line Height: 1.5</p>
                      <p>Usage: Labels, micro headings</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Typography variant="h4" className="mb-4 text-grey-800">Body Text</Typography>
                <div className="space-y-4">
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="body1" className="mb-2">
                      Body 1 - This is the primary body text used for main content areas. It provides excellent readability and is optimized for long-form content.
                    </Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 16px (1rem) • Weight: 400 (Normal) • Line Height: 1.5</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="body2" className="mb-2">
                      Body 2 - Smaller body text for secondary content, descriptions, and supporting information.
                    </Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 14px (0.875rem) • Weight: 400 (Normal) • Line Height: 1.5</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="body3" className="mb-2">
                      Body 3 - Light body text for subtle information and elegant typography.
                    </Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 14px (0.875rem) • Weight: 300 (Light) • Line Height: 1.5</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <Typography variant="h4" className="mb-4 text-grey-800">Utility Text</Typography>
                <div className="space-y-4">
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="caption" className="mb-2">Caption text for images and meta information</Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 12px (0.75rem) • Weight: 400 (Normal)</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="overline" className="mb-2">OVERLINE CATEGORY LABELS</Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 10px (0.625rem) • Weight: 500 (Medium) • Transform: Uppercase • Tracking: Wide</p>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-grey-300 rounded-lg">
                    <Typography variant="smallText" className="mb-2">Small text for fine print and micro content</Typography>
                    <div className="text-sm text-grey-600 font-mono">
                      <p>Font Size: 11px (0.6875rem) • Weight: 400 (Normal)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'spacing':
        return (
          <div className="space-y-8">
            <Typography variant="h3" className="mb-6">Spacing & Layout</Typography>
            
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-4">Spacing Scale</Typography>
                <div className="space-y-4">
                  {[
                    { name: 'xs', value: '4px', class: 'p-1' },
                    { name: 'sm', value: '8px', class: 'p-2' },
                    { name: 'md', value: '16px', class: 'p-4' },
                    { name: 'lg', value: '24px', class: 'p-6' },
                    { name: 'xl', value: '32px', class: 'p-8' },
                    { name: '2xl', value: '48px', class: 'p-12' },
                  ].map((spacing) => (
                    <div key={spacing.name} className="flex items-center space-x-4">
                      <div className="w-16 text-sm font-mono">{spacing.name}</div>
                      <div className="w-16 text-sm text-grey-600">{spacing.value}</div>
                      <div className="bg-primary-lighter border border-primary-main rounded">
                        <div className={`bg-primary-main ${spacing.class}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Typography variant="h4" className="mb-4">Layout Examples</Typography>
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Card with Standard Spacing</CardTitle>
                      <CardDescription>This card uses the default padding (p-6 = 24px)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Content area with consistent spacing throughout the component.</p>
                    </CardContent>
                  </Card>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <Typography variant="h6">Compact Card</Typography>
                        <Typography variant="body2">Smaller padding for dense layouts</Typography>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <Typography variant="h6">Compact Card</Typography>
                        <Typography variant="body2">Consistent spacing across grid</Typography>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <Typography variant="h6">Compact Card</Typography>
                        <Typography variant="body2">Responsive grid layout</Typography>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tables':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Table Components</Typography>
            
            <div className="border border-grey-300 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-grey-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grey-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grey-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grey-700 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-grey-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-grey-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900">John Doe</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-700">Administrator</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-grey-900">Jane Smith</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-grey-700">Editor</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'forms':
        return (
          <div className="space-y-8">
            <Typography variant="h3" className="mb-6">Form Elements</Typography>
            
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-4">Radio Button Groups</Typography>
                <RadioGroup defaultValue="option1" className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="option1" />
                    <Label htmlFor="option1">Option 1 - Default selection</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="option2" />
                    <Label htmlFor="option2">Option 2 - Alternative choice</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option3" id="option3" />
                    <Label htmlFor="option3">Option 3 - Third option</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Typography variant="h4" className="mb-4">Select Dropdowns</Typography>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Basic Select</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Status Filter</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'brand':
        return (
          <div className="space-y-8">
            <div>
              <Typography variant="h3" className="mb-6">Monto Logo</Typography>
              <div className="grid gap-6 md:grid-cols-2">
                <LogoShowcase 
                  title="Small Logo" 
                  svgCode={`<MontoLogo className="w-20 h-4" />`}
                  width={80}
                  height={16}
                >
                  <MontoLogo className="w-20 h-4" />
                </LogoShowcase>
                <LogoShowcase 
                  title="Medium Logo" 
                  svgCode={`<MontoLogo className="w-32 h-8" />`}
                  width={128}
                  height={32}
                >
                  <MontoLogo className="w-32 h-8" />
                </LogoShowcase>
              </div>
              <div className="mt-6">
                <LogoShowcase 
                  title="Large Logo" 
                  svgCode={`<MontoLogo className="w-64 h-16" />`}
                  width={256}
                  height={64}
                >
                  <MontoLogo className="w-64 h-16" />
                </LogoShowcase>
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-6">Monto Icon</Typography>
              <div className="grid gap-6 md:grid-cols-3">
                <LogoShowcase 
                  title="Small Icon" 
                  svgCode={`<MontoIcon className="w-6 h-6" />`}
                  width={24}
                  height={24}
                >
                  <MontoIcon className="w-6 h-6" />
                </LogoShowcase>
                <LogoShowcase 
                  title="Medium Icon" 
                  svgCode={`<MontoIcon className="w-12 h-12" />`}
                  width={48}
                  height={48}
                >
                  <MontoIcon className="w-12 h-12" />
                </LogoShowcase>
                <LogoShowcase 
                  title="Large Icon" 
                  svgCode={`<MontoIcon className="w-24 h-24" />`}
                  width={96}
                  height={96}
                >
                  <MontoIcon className="w-24 h-24" />
                </LogoShowcase>
              </div>
            </div>

            <div className="bg-grey-100 p-6 rounded-lg">
              <Typography variant="h4" className="mb-3">Usage Guidelines</Typography>
              <div className="space-y-2 text-sm text-grey-700">
                <p>• Use the logo on light backgrounds with sufficient contrast</p>
                <p>• Maintain proper spacing around the logo (minimum clearance equal to the height of the 'M')</p>
                <p>• The icon can be used independently for compact UI elements</p>
                <p>• Preserve the original aspect ratio when resizing</p>
                <p>• Use the provided SVG format for optimal quality at all sizes</p>
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Progress Indicators</Typography>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-grey-700">Processing documents</span>
                  <span className="text-sm text-grey-600">Processing - 66%</span>
                </div>
                <Progress value={66} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-grey-700">Upload complete</span>
                  <span className="text-sm text-grey-600">Complete - 100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-grey-700">Validating data</span>
                  <span className="text-sm text-grey-600">Validating - 45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-grey-700">Initialization</span>
                  <span className="text-sm text-grey-600">Starting - 15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
            </div>
          </div>
        );

      case 'toasts':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Toast Notifications</Typography>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Button 
                onClick={() => showSuccessToast('Success!', 'Your action was completed successfully.')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Show Success Toast
              </Button>
              
              <Button 
                onClick={() => showErrorToast('Error!', 'Something went wrong. Please try again.')}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Show Error Toast
              </Button>
              
              <Button 
                onClick={() => showWarningToast('Warning!', 'Please review your input before proceeding.')}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Show Warning Toast
              </Button>
              
              <Button 
                onClick={() => showInfoToast('Information', 'Here is some helpful information.')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Info className="w-4 h-4 mr-2" />
                Show Info Toast
              </Button>
            </div>
          </div>
        );

      case 'buttons':
        return (
          <div className="space-y-8">
            <Typography variant="h3" className="mb-6">Button Components</Typography>
            
            <div className="space-y-6">
              <div>
                <Typography variant="h4" className="mb-3">Variants</Typography>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>

              <div>
                <Typography variant="h4" className="mb-3">Sizes</Typography>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon"><Home className="h-4 w-4" /></Button>
                </div>
              </div>

              <div>
                <Typography variant="h4" className="mb-3">With Icons</Typography>
                <div className="flex flex-wrap gap-3">
                  <Button><Home className="w-4 h-4 mr-2" />Home</Button>
                  <Button variant="outline"><Download className="w-4 h-4 mr-2" />Download</Button>
                  <Button variant="secondary">Settings<Settings className="w-4 h-4 ml-2" /></Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'alerts':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Alert Components</Typography>
            
            <div className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Information</AlertTitle>
                <AlertDescription className="text-blue-700">
                  This is an informational alert with helpful details.
                </AlertDescription>
              </Alert>

              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-800">Success</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your action has been completed successfully.
                </AlertDescription>
              </Alert>

              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertTitle className="text-orange-800">Warning</AlertTitle>
                <AlertDescription className="text-orange-700">
                  Please review the following before proceeding.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Error</AlertTitle>
                <AlertDescription className="text-red-700">
                  An error occurred while processing your request.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );

      case 'modals':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Modal Dialogs</Typography>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Basic Modal</Button>
                </DialogTrigger>
                <DialogContent className="border-primary-main">
                  <DialogHeader>
                    <DialogTitle className="text-primary-main">Basic Modal</DialogTitle>
                    <DialogDescription>
                      This modal uses the primary brand color #7B59FF for consistent styling.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-sm text-grey-600">
                      All modals should use the primary brand color for headers and accents.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Confirmation Modal</Button>
                </DialogTrigger>
                <DialogContent className="border-primary-main">
                  <DialogHeader>
                    <DialogTitle className="text-primary-main">Confirm Action</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to proceed with this action?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Confirm</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        );

      case 'dropdowns':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Dropdown Components</Typography>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <Typography variant="h4">Action Menu</Typography>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Actions
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-4">
                <Typography variant="h4">Kebab Menu (Vertical)</Typography>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        );

      case 'breadcrumbs':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Breadcrumb Navigation</Typography>
            
            <div className="space-y-8">
              <div>
                <Typography variant="h4" className="mb-3">Basic Breadcrumb</Typography>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#" className="flex items-center">
                        <Home className="h-4 w-4 mr-1" />
                        Home
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Invoices</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Invoice Details</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div>
                <Typography variant="h4" className="mb-3">Multi-level Navigation</Typography>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#" className="flex items-center">
                        <Home className="h-4 w-4 mr-1" />
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Smart Connections</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">Portal Management</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Add New Agent</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a component from the sidebar</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background-default">
      <div className="flex w-full">
        {/* Sidebar */}
        <div className="w-64 bg-background-paper border-r border-grey-300 min-h-screen">
          <div className="p-6">
            <Typography variant="h4" className="text-grey-900 mb-6">Design System</Typography>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === item.id 
                        ? 'bg-primary-lighter text-primary-main' 
                        : 'text-grey-700 hover:bg-grey-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default DesignSystemPlayground;
