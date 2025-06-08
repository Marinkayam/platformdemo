import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ApplyGloballyModal } from '@/components/ui/apply-globally-modal';
import { Typography } from '@/components/ui/typography/typography';
import { MontoLogo } from '@/components/MontoLogo';
import MontoIcon from '@/components/MontoIcon';
import { componentUsageData, ComponentUsage } from '@/data/componentUsage';
import { 
  Download, 
  Settings, 
  Search, 
  Filter, 
  Calendar, 
  Bell, 
  User, 
  Menu, 
  ChevronDown, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload, 
  Save, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle,
  Globe,
  Building,
  Mail,
  Phone,
  Minus
} from 'lucide-react';

const DesignSystemPlayground = () => {
  const [activeTab, setActiveTab] = useState('colors');
  const [progressValue, setProgressValue] = useState(33);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    newsletter: false,
    notifications: true
  });

  const handleApplyGlobally = (componentType: keyof typeof componentUsageData, selectedPages: string[]) => {
    console.log(`Applying ${componentType} changes to:`, selectedPages);
  };

  const incrementProgress = () => {
    setProgressValue(prev => Math.min(prev + 10, 100));
  };

  const decrementProgress = () => {
    setProgressValue(prev => Math.max(prev - 10, 0));
  };

  const resetProgress = () => {
    setProgressValue(33);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const colorCategories = [
    {
      name: 'Primary Colors',
      description: 'Purple-based brand colors for primary actions and branding',
      colors: [
        { name: 'primary-lighter', value: '#EFEBFF', description: 'Lightest purple for subtle backgrounds' },
        { name: 'primary-light', value: '#BEADFF', description: 'Light purple for secondary elements' },
        { name: 'primary-main', value: '#7B59FF', description: 'Main brand purple for primary actions' },
        { name: 'primary-dark', value: '#523BAA', description: 'Dark purple for active states' },
        { name: 'primary-darker', value: '#291E55', description: 'Darkest purple for maximum emphasis' },
        { name: 'primary-contrast-text', value: '#FFFFFF', description: 'White text for primary backgrounds' }
      ]
    },
    {
      name: 'Secondary Colors',
      description: 'Dark neutral colors for secondary elements',
      colors: [
        { name: 'secondary-lighter', value: '#E6E7EB', description: 'Light neutral for subtle backgrounds' },
        { name: 'secondary-light', value: '#6F768B', description: 'Medium neutral for secondary text' },
        { name: 'secondary-main', value: '#1D153B', description: 'Main dark color for secondary actions' },
        { name: 'secondary-dark', value: '#181231', description: 'Dark variant for active states' },
        { name: 'secondary-darker', value: '#0A0714', description: 'Darkest variant for maximum contrast' },
        { name: 'secondary-contrast-text', value: '#FFFFFF', description: 'White text for secondary backgrounds' }
      ]
    },
    {
      name: 'Grey Scale',
      description: 'Comprehensive grey palette for text hierarchy and neutral backgrounds',
      colors: [
        { name: 'grey-0', value: '#FFFFFF', description: 'Pure white for maximum contrast' },
        { name: 'grey-100', value: '#707C87', description: 'Light grey for subtle text' },
        { name: 'grey-200', value: '#F4F6F8', description: 'Very light grey for section backgrounds' },
        { name: 'grey-300', value: '#F1F1F3', description: 'Light grey for subtle dividers' },
        { name: 'grey-400', value: '#E6E7EB', description: 'Medium light grey for input borders' },
        { name: 'grey-500', value: '#8C94A9', description: 'Medium grey for secondary text' },
        { name: 'grey-600', value: '#818799', description: 'Darker grey for body text' },
        { name: 'grey-700', value: '#586079', description: 'Dark grey for subheadings' },
        { name: 'grey-800', value: '#38415F', description: 'Very dark grey for primary text' },
        { name: 'grey-900', value: '#061237', description: 'Near black for maximum contrast' }
      ]
    },
    {
      name: 'Semantic Colors',
      description: 'Colors for different states and feedback',
      colors: [
        { name: 'info-main', value: '#375DFB', description: 'Primary blue for information' },
        { name: 'success-main', value: '#007737', description: 'Primary green for success states' },
        { name: 'warning-main', value: '#F2AE40', description: 'Primary orange for warnings' },
        { name: 'error-main', value: '#DF1C41', description: 'Primary red for errors' }
      ]
    }
  ];

  const typographyVariants = [
    { variant: 'h1', description: 'Hero headings and page titles', example: 'Hero Heading' },
    { variant: 'h2', description: 'Major section headings', example: 'Section Heading' },
    { variant: 'h3', description: 'Subsection headings', example: 'Subsection Title' },
    { variant: 'h4', description: 'Component headings', example: 'Component Title' },
    { variant: 'h5', description: 'Small headings', example: 'Small Heading' },
    { variant: 'h6', description: 'Micro headings', example: 'Micro Heading' },
    { variant: 'subtitle1', description: 'Primary subtitles', example: 'Primary Subtitle' },
    { variant: 'subtitle2', description: 'Secondary subtitles', example: 'Secondary Subtitle' },
    { variant: 'body1', description: 'Default body text', example: 'This is the default body text for main content areas.' },
    { variant: 'body2', description: 'Small body text', example: 'This is smaller body text for secondary content.' },
    { variant: 'body3', description: 'Light body text', example: 'This is light body text for subtle information.' },
    { variant: 'caption', description: 'Image captions and meta info', example: 'Caption text for images' },
    { variant: 'overline', description: 'Category labels', example: 'OVERLINE TEXT' },
    { variant: 'button', description: 'Button text', example: 'Button Text' },
    { variant: 'smallText', description: 'Fine print and micro content', example: 'Fine print text' }
  ];

  const spacingScale = [
    { name: 'px', value: '1px', description: 'Hairline spacing' },
    { name: '0.5', value: '2px', description: 'Micro spacing' },
    { name: '1', value: '4px', description: 'Extra small spacing' },
    { name: '2', value: '8px', description: 'Small spacing' },
    { name: '3', value: '12px', description: 'Medium spacing' },
    { name: '4', value: '16px', description: 'Default spacing unit' },
    { name: '6', value: '24px', description: 'Large spacing' },
    { name: '8', value: '32px', description: 'Section spacing' },
    { name: '12', value: '48px', description: 'Extra large spacing' },
    { name: '16', value: '64px', description: 'Page section spacing' }
  ];

  return (
    <div className="min-h-screen bg-background-default">
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <Typography variant="h1" className="text-grey-900 mb-4">
            Monto UI Design System
          </Typography>
          <Typography variant="body1" className="text-grey-700 max-w-3xl">
            A comprehensive design system following premium, minimalist principles with restrained form and motion. 
            Built with design tokens for consistency and maintainability.
          </Typography>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8 lg:w-auto lg:grid-cols-none lg:inline-flex">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
          </TabsList>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8">
            <div>
              <Typography variant="h2" className="text-grey-900 mb-4">Color Palette</Typography>
              <Typography variant="body1" className="text-grey-700 mb-6">
                Our color system is built on semantic tokens that ensure consistency and accessibility across all components.
              </Typography>
            </div>

            {colorCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="text-grey-900">{category.name}</CardTitle>
                  <CardDescription className="text-grey-600">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.colors.map((color, colorIndex) => (
                      <div key={colorIndex} className="border border-grey-300 rounded-lg overflow-hidden">
                        <div 
                          className="h-16 w-full"
                          style={{ backgroundColor: color.value }}
                        />
                        <div className="p-3">
                          <Typography variant="subtitle2" className="text-grey-900 mb-1">
                            {color.name}
                          </Typography>
                          <Typography variant="smallText" className="text-grey-600 mb-1">
                            {color.value}
                          </Typography>
                          <Typography variant="smallText" className="text-grey-500">
                            {color.description}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Typography Tab */}
          <TabsContent value="typography" className="space-y-8">
            <div>
              <Typography variant="h2" className="text-grey-900 mb-4">Typography System</Typography>
              <Typography variant="body1" className="text-grey-700 mb-6">
                Our typography system uses Studio Feixen Sans for a clean, modern aesthetic with clear hierarchy.
              </Typography>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Typography Variants</CardTitle>
                <CardDescription>
                  Semantic typography variants for consistent text styling across the application.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {typographyVariants.map((variant, index) => (
                  <div key={index} className="border-b border-grey-300 last:border-b-0 pb-4 last:pb-0">
                    <div className="mb-2">
                      <Typography variant="smallText" className="text-grey-500 mb-1">
                        variant="{variant.variant}" - {variant.description}
                      </Typography>
                    </div>
                    <Typography variant={variant.variant as any} className="text-grey-900">
                      {variant.example}
                    </Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Spacing Tab */}
          <TabsContent value="spacing" className="space-y-8">
            <div>
              <Typography variant="h2" className="text-grey-900 mb-4">Spacing System</Typography>
              <Typography variant="body1" className="text-grey-700 mb-6">
                Consistent spacing based on 4px multiples for perfect vertical rhythm and visual harmony.
              </Typography>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Spacing Scale</CardTitle>
                <CardDescription>
                  Use these spacing values for consistent layouts and component spacing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spacingScale.map((spacing, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border border-grey-300 rounded-lg">
                      <div className="w-20">
                        <Typography variant="subtitle2" className="text-grey-900">
                          {spacing.name}
                        </Typography>
                        <Typography variant="caption" className="text-grey-600">
                          {spacing.value}
                        </Typography>
                      </div>
                      <div 
                        className="bg-primary-main"
                        style={{ 
                          width: spacing.value, 
                          height: '20px',
                          minWidth: '1px'
                        }}
                      />
                      <Typography variant="body2" className="text-grey-700 flex-1">
                        {spacing.description}
                      </Typography>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-8">
            <div>
              <Typography variant="h2" className="text-grey-900 mb-4">UI Components</Typography>
              <Typography variant="body1" className="text-grey-700 mb-6">
                Core UI components built with design tokens for consistency and reusability.
              </Typography>
            </div>

            {/* Buttons Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Buttons</CardTitle>
                  <CardDescription>Interactive elements for user actions and navigation</CardDescription>
                </div>
                <ApplyGloballyModal
                  componentType="buttons"
                  usageData={componentUsageData.buttons}
                  onApply={(selectedPages) => handleApplyGlobally('buttons', selectedPages)}
                >
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Apply Globally
                  </Button>
                </ApplyGloballyModal>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-3">
                    <Typography variant="subtitle2" className="text-grey-800">Primary</Typography>
                    <div className="space-y-2">
                      <Button className="w-full">Default</Button>
                      <Button className="w-full" size="sm">Small</Button>
                      <Button className="w-full" size="lg">Large</Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="subtitle2" className="text-grey-800">Secondary</Typography>
                    <div className="space-y-2">
                      <Button variant="secondary" className="w-full">Default</Button>
                      <Button variant="secondary" size="sm" className="w-full">Small</Button>
                      <Button variant="secondary" size="lg" className="w-full">Large</Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="subtitle2" className="text-grey-800">Outline</Typography>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">Default</Button>
                      <Button variant="outline" size="sm" className="w-full">Small</Button>
                      <Button variant="outline" size="lg" className="w-full">Large</Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="subtitle2" className="text-grey-800">Destructive</Typography>
                    <div className="space-y-2">
                      <Button variant="destructive" className="w-full">Default</Button>
                      <Button variant="destructive" size="sm" className="w-full">Small</Button>
                      <Button variant="destructive" size="lg" className="w-full">Large</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Badges Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Status indicators and labels for categorization</CardDescription>
                </div>
                <ApplyGloballyModal
                  componentType="badges"
                  usageData={componentUsageData.badges}
                  onApply={(selectedPages) => handleApplyGlobally('badges', selectedPages)}
                >
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Apply Globally
                  </Button>
                </ApplyGloballyModal>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <Typography variant="subtitle2" className="text-grey-800">Default</Typography>
                    <div className="space-y-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="subtitle2" className="text-grey-800">Semantic</Typography>
                    <div className="space-y-2">
                      <Badge className="bg-success-main text-success-contrast-text">Success</Badge>
                      <Badge className="bg-warning-main text-warning-contrast-text">Warning</Badge>
                      <Badge className="bg-error-main text-error-contrast-text">Error</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="subtitle2" className="text-grey-800">Status</Typography>
                    <div className="space-y-2">
                      <Badge className="bg-info-main text-info-contrast-text">Active</Badge>
                      <Badge className="bg-grey-400 text-grey-800">Inactive</Badge>
                      <Badge className="bg-primary-light text-primary-darker">Pending</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Typography variant="subtitle2" className="text-grey-800">With Icons</Typography>
                    <div className="space-y-2">
                      <Badge className="bg-success-main text-success-contrast-text">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approved
                      </Badge>
                      <Badge className="bg-warning-main text-warning-contrast-text">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Review
                      </Badge>
                      <Badge className="bg-error-main text-error-contrast-text">
                        <XCircle className="h-3 w-3 mr-1" />
                        Rejected
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Tabs</CardTitle>
                  <CardDescription>Navigation between related content sections</CardDescription>
                </div>
                <ApplyGloballyModal
                  componentType="tabs"
                  usageData={componentUsageData.tabs}
                  onApply={(selectedPages) => handleApplyGlobally('tabs', selectedPages)}
                >
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Apply Globally
                  </Button>
                </ApplyGloballyModal>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tab1" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="tab1">Overview</TabsTrigger>
                    <TabsTrigger value="tab2">Details</TabsTrigger>
                    <TabsTrigger value="tab3">Analytics</TabsTrigger>
                    <TabsTrigger value="tab4">Settings</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="mt-4">
                    <div className="p-4 border border-grey-300 rounded-lg">
                      <Typography variant="body1" className="text-grey-700">
                        Overview tab content demonstrating how tabs organize related information into accessible sections.
                      </Typography>
                    </div>
                  </TabsContent>
                  <TabsContent value="tab2" className="mt-4">
                    <div className="p-4 border border-grey-300 rounded-lg">
                      <Typography variant="body1" className="text-grey-700">
                        Details tab showing additional information and data points.
                      </Typography>
                    </div>
                  </TabsContent>
                  <TabsContent value="tab3" className="mt-4">
                    <div className="p-4 border border-grey-300 rounded-lg">
                      <Typography variant="body1" className="text-grey-700">
                        Analytics tab containing charts and performance metrics.
                      </Typography>
                    </div>
                  </TabsContent>
                  <TabsContent value="tab4" className="mt-4">
                    <div className="p-4 border border-grey-300 rounded-lg">
                      <Typography variant="body1" className="text-grey-700">
                        Settings tab for configuration and preferences.
                      </Typography>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Layout Tab */}
          <TabsContent value="layout" className="space-y-8">
            <div>
              <Typography variant="h2" className="text-grey-900 mb-4">Layout Components</Typography>
              <Typography variant="body1" className="text-grey-700 mb-6">
                Flexible layout components for organizing content and creating consistent page structures.
              </Typography>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Grid Systems</CardTitle>
                  <CardDescription>Responsive grid layouts for various content arrangements</CardDescription>
                </div>
                <ApplyGloballyModal
                  componentType="layout"
                  usageData={componentUsageData.layout}
                  onApply={(selectedPages) => handleApplyGlobally('layout', selectedPages)}
                >
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Apply Globally
                  </Button>
                </ApplyGloballyModal>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Typography variant="subtitle1" className="text-grey-800 mb-3">2-Column Layout</Typography>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary-lighter border border-primary-light rounded-lg">
                      <Typography variant="body2" className="text-primary-dark">Main Content Area</Typography>
                    </div>
                    <div className="p-4 bg-secondary-lighter border border-secondary-light rounded-lg">
                      <Typography variant="body2" className="text-secondary-dark">Sidebar Content</Typography>
                    </div>
                  </div>
                </div>

                <div>
                  <Typography variant="subtitle1" className="text-grey-800 mb-3">3-Column Grid</Typography>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-info-lighter border border-info-light rounded-lg">
                      <Typography variant="body2" className="text-info-dark">Column 1</Typography>
                    </div>
                    <div className="p-4 bg-success-lighter border border-success-light rounded-lg">
                      <Typography variant="body2" className="text-success-dark">Column 2</Typography>
                    </div>
                    <div className="p-4 bg-warning-lighter border border-warning-light rounded-lg">
                      <Typography variant="body2" className="text-warning-contrast-text">Column 3</Typography>
                    </div>
                  </div>
                </div>

                <div>
                  <Typography variant="subtitle1" className="text-grey-800 mb-3">Card Grid Layout</Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <Card key={item}>
                        <CardContent className="p-4">
                          <Typography variant="subtitle2" className="text-grey-800 mb-2">
                            Card {item}
                          </Typography>
                          <Typography variant="body2" className="text-grey-600">
                            Card content demonstrating grid layout with consistent spacing.
                          </Typography>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Forms Tab */}
          <TabsContent value="forms" className="space-y-8">
            <div>
              <Typography variant="h2" className="text-grey-900 mb-4">Form Components</Typography>
              <Typography variant="body1" className="text-grey-700 mb-6">
                Comprehensive form elements for user input and data collection with proper validation states.
              </Typography>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Form Elements</CardTitle>
                  <CardDescription>Interactive form components with consistent styling and behavior</CardDescription>
                </div>
                <ApplyGloballyModal
                  componentType="forms"
                  usageData={componentUsageData.forms}
                  onApply={(selectedPages) => handleApplyGlobally('forms', selectedPages)}
                >
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Apply Globally
                  </Button>
                </ApplyGloballyModal>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Enter your message here..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Typography variant="subtitle2" className="text-grey-800 mb-3">Checkboxes & Switches</Typography>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="newsletter"
                            checked={formData.newsletter}
                            onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                          />
                          <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="notifications"
                            checked={formData.notifications}
                            onCheckedChange={(checked) => handleInputChange('notifications', checked)}
                          />
                          <Label htmlFor="notifications">Enable notifications</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Typography variant="subtitle2" className="text-grey-800 mb-3">Form Actions</Typography>
                      <div className="flex gap-3">
                        <Button type="submit" className="flex-1">
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" type="button">
                          Cancel
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Typography variant="subtitle2" className="text-grey-800 mb-3">Form Summary</Typography>
                      <div className="p-3 bg-grey-200 rounded-lg space-y-1">
                        <Typography variant="smallText" className="text-grey-600">
                          Name: {formData.name || 'Not provided'}
                        </Typography>
                        <Typography variant="smallText" className="text-grey-600">
                          Email: {formData.email || 'Not provided'}
                        </Typography>
                        <Typography variant="smallText" className="text-grey-600">
                          Newsletter: {formData.newsletter ? 'Yes' : 'No'}
                        </Typography>
                        <Typography variant="smallText" className="text-grey-600">
                          Notifications: {formData.notifications ? 'Enabled' : 'Disabled'}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-8">
            <div>
              <Typography variant="h2" className="text-grey-900 mb-4">Feedback Components</Typography>
              <Typography variant="body1" className="text-grey-700 mb-6">
                Components for providing user feedback, progress indication, and interactive elements.
              </Typography>
            </div>

            {/* Progress Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Progress Indicators</CardTitle>
                  <CardDescription>Visual indicators for task completion and loading states</CardDescription>
                </div>
                <ApplyGloballyModal
                  componentType="progress"
                  usageData={componentUsageData.progress}
                  onApply={(selectedPages) => handleApplyGlobally('progress', selectedPages)}
                >
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Apply Globally
                  </Button>
                </ApplyGloballyModal>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Typography variant="subtitle2" className="text-grey-800">Task Progress</Typography>
                    <Typography variant="smallText" className="text-grey-600">{progressValue}%</Typography>
                  </div>
                  <Progress value={progressValue} className="mb-4" />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={decrementProgress} disabled={progressValue <= 0}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={incrementProgress} disabled={progressValue >= 100}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={resetProgress}>
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts Section */}
            <Card>
              <CardHeader>
                <CardTitle>Alert Messages</CardTitle>
                <CardDescription>Contextual feedback messages for different scenarios</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-info-light bg-info-lighter">
                  <Info className="h-4 w-4 text-info-main" />
                  <AlertTitle className="text-info-dark">Information</AlertTitle>
                  <AlertDescription className="text-info-dark">
                    This is an informational message to provide helpful context.
                  </AlertDescription>
                </Alert>

                <Alert className="border-success-light bg-success-lighter">
                  <CheckCircle className="h-4 w-4 text-success-main" />
                  <AlertTitle className="text-success-dark">Success</AlertTitle>
                  <AlertDescription className="text-success-dark">
                    Your action was completed successfully. Everything is working as expected.
                  </AlertDescription>
                </Alert>

                <Alert className="border-warning-light bg-warning-lighter">
                  <AlertTriangle className="h-4 w-4 text-warning-main" />
                  <AlertTitle className="text-warning-contrast-text">Warning</AlertTitle>
                  <AlertDescription className="text-warning-contrast-text">
                    Please review the information below before proceeding with this action.
                  </AlertDescription>
                </Alert>

                <Alert className="border-error-light bg-error-lighter">
                  <XCircle className="h-4 w-4 text-error-main" />
                  <AlertTitle className="text-error-dark">Error</AlertTitle>
                  <AlertDescription className="text-error-dark">
                    An error occurred while processing your request. Please try again.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Modals Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Modal Dialogs</CardTitle>
                  <CardDescription>Overlay dialogs for focused interactions and confirmations</CardDescription>
                </div>
                <ApplyGloballyModal
                  componentType="modals"
                  usageData={componentUsageData.modals}
                  onApply={(selectedPages) => handleApplyGlobally('modals', selectedPages)}
                >
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Apply Globally
                  </Button>
                </ApplyGloballyModal>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Open Settings
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                        <DialogDescription>
                          Configure your application preferences and settings.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="dark-mode" />
                          <Label htmlFor="dark-mode">Enable dark mode</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="notifications" />
                          <Label htmlFor="notifications">Enable notifications</Label>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Changes</Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Info className="h-4 w-4 mr-2" />
                        Show Info
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Information</DialogTitle>
                        <DialogDescription>
                          Additional details and information about this feature.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Typography variant="body1" className="text-grey-700">
                          This modal demonstrates how dialogs can be used to display detailed information 
                          without navigating away from the current context.
                        </Typography>
                      </div>
                      <div className="flex justify-end">
                        <Button>Understood</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding" className="space-y-8">
            <div>
              <Typography variant="h2" className="text-grey-900 mb-4">Brand Elements</Typography>
              <Typography variant="body1" className="text-grey-700 mb-6">
                Core brand assets including logos, icons, and visual identity elements.
              </Typography>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Logo Variations</CardTitle>
                <CardDescription>Different logo treatments for various contexts and applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Typography variant="subtitle1" className="text-grey-800 mb-4">Logo Sizes</Typography>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center p-6 border border-grey-300 rounded-lg">
                      <MontoLogo className="h-8 mb-3" />
                      <Typography variant="caption" className="text-grey-600">Small (32px)</Typography>
                    </div>
                    <div className="flex flex-col items-center p-6 border border-grey-300 rounded-lg">
                      <MontoLogo className="h-12 mb-3" />
                      <Typography variant="caption" className="text-grey-600">Medium (48px)</Typography>
                    </div>
                    <div className="flex flex-col items-center p-6 border border-grey-300 rounded-lg">
                      <MontoLogo className="h-16 mb-3" />
                      <Typography variant="caption" className="text-grey-600">Large (64px)</Typography>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Typography variant="subtitle1" className="text-grey-800 mb-4">Icon Variations</Typography>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center p-6 border border-grey-300 rounded-lg">
                      <MontoIcon className="h-8 w-8 mb-3" />
                      <Typography variant="caption" className="text-grey-600">Small Icon (32px)</Typography>
                    </div>
                    <div className="flex flex-col items-center p-6 border border-grey-300 rounded-lg">
                      <MontoIcon className="h-12 w-12 mb-3" />
                      <Typography variant="caption" className="text-grey-600">Medium Icon (48px)</Typography>
                    </div>
                    <div className="flex flex-col items-center p-6 border border-grey-300 rounded-lg">
                      <MontoIcon className="h-16 w-16 mb-3" />
                      <Typography variant="caption" className="text-grey-600">Large Icon (64px)</Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DesignSystemPlayground;
