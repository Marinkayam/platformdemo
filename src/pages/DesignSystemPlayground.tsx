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
import { Separator } from '@/components/ui/separator';
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from '@/lib/toast-helpers';
import { Typography } from '@/components/ui/typography/typography';
import MontoIcon from '@/components/MontoIcon';
import { Toaster } from '@/components/ui/toaster';
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
  MoreHorizontal,
  ChevronDown,
  Copy,
  Download,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

const DesignSystemPlayground = () => {
  const [activeSection, setActiveSection] = useState('colors');

  // Copy to clipboard function
  const copyToClipboard = async (text: string, description: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccessToast('Copied!', `${description} copied to clipboard`);
    } catch (err) {
      // Fallback for older browsers
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

  const sidebarItems = [
    { id: 'colors', label: 'Color Palette', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'buttons', label: 'Buttons', icon: Square },
    { id: 'badges', label: 'Status Badges', icon: Zap },
    { id: 'alerts', label: 'Alerts', icon: AlertCircle },
    { id: 'progress', label: 'Progress', icon: CheckCircle },
    { id: 'modals', label: 'Modals', icon: Square },
    { id: 'toasts', label: 'Toast Notifications', icon: Info },
    { id: 'dropdowns', label: 'Dropdowns', icon: ChevronDown },
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

  const logoSvgCode = `<svg width="80" height="16" viewBox="0 0 80 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="12" fill="#7B59FF" font-family="Arial, sans-serif" font-size="14" font-weight="600">MONTO</text>
</svg>`;

  const iconSvgCode = `<svg width="508" height="508" viewBox="0 0 508 508" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="508" height="508" rx="60" fill="white"/>
<path d="M227.651 243.494C244.092 216.347 245.366 184.103 244.899 162.182C244.814 157.848 243.03 153.855 239.928 150.881C236.827 147.908 232.706 146.336 228.416 146.378C219.494 146.591 212.442 153.983 212.612 162.861C212.994 180.747 212.102 206.789 200.037 226.755C186.528 249.059 161.463 259.807 123.228 259.595C114.265 259.552 107.042 266.774 107 275.866C107 280.199 108.742 284.235 111.801 287.251C114.859 290.267 118.853 291.839 123.228 291.924C161.505 291.797 186.528 302.46 200.037 324.763C212.102 344.73 212.994 370.772 212.612 388.657C212.442 397.579 219.494 404.971 228.416 405.141C228.543 405.141 228.628 405.141 228.756 405.141C237.507 405.141 244.729 398.131 244.899 389.337C245.366 367.416 244.092 335.171 227.651 308.025C219.452 294.515 208.364 283.682 194.642 275.738C208.406 267.794 219.494 256.961 227.651 243.451V243.494Z" fill="#7B59FF"/>
<path d="M385.814 216.262H385.729C347.495 216.517 322.43 205.727 308.92 183.423C296.855 163.456 295.963 137.414 296.345 119.529C296.43 115.196 294.858 111.117 291.842 108.016C288.868 104.873 284.833 103.088 280.542 103.003C276.293 102.918 272.13 104.49 269.029 107.506C265.928 110.48 264.143 114.516 264.058 118.807C263.591 140.728 264.866 172.972 281.306 200.119C289.506 213.628 300.594 224.461 314.316 232.406C300.551 240.35 289.506 251.141 281.306 264.693C264.866 291.839 263.591 324.083 264.058 346.005C264.228 354.798 271.45 361.808 280.202 361.808C280.329 361.808 280.457 361.808 280.542 361.808C284.875 361.723 288.868 359.939 291.842 356.838C294.816 353.736 296.43 349.616 296.345 345.325C295.963 327.44 296.855 301.398 308.92 281.431C322.302 259.34 347.07 248.549 384.667 248.549C385.049 248.549 385.474 248.549 385.856 248.549C390.147 248.549 394.183 246.892 397.199 243.876C400.258 240.86 401.957 236.781 402 232.278C401.957 223.399 394.693 216.22 385.856 216.22L385.814 216.262Z" fill="#7B59FF"/>
</svg>`;

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

      case 'brand':
        return (
          <div className="space-y-8">
            <div>
              <Typography variant="h3" className="mb-6">Monto Logo</Typography>
              <div className="grid gap-6 md:grid-cols-2">
                <LogoShowcase 
                  title="Small Logo" 
                  svgCode={logoSvgCode}
                  width={80}
                  height={16}
                >
                  <svg width="80" height="16" viewBox="0 0 80 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="12" fill="#7B59FF" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600">MONTO</text>
                  </svg>
                </LogoShowcase>
                <LogoShowcase 
                  title="Medium Logo" 
                  svgCode={logoSvgCode}
                  width={104}
                  height={31}
                >
                  <svg width="104" height="31" viewBox="0 0 80 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <text x="0" y="12" fill="#7B59FF" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600">MONTO</text>
                  </svg>
                </LogoShowcase>
              </div>
            </div>

            <div>
              <Typography variant="h3" className="mb-6">Monto Icon</Typography>
              <div className="grid gap-6 md:grid-cols-3">
                <LogoShowcase 
                  title="Small Icon" 
                  svgCode={iconSvgCode}
                  width={24}
                  height={24}
                >
                  <MontoIcon className="w-6 h-6" />
                </LogoShowcase>
                <LogoShowcase 
                  title="Medium Icon" 
                  svgCode={iconSvgCode}
                  width={48}
                  height={48}
                >
                  <MontoIcon className="w-12 h-12" />
                </LogoShowcase>
                <LogoShowcase 
                  title="Large Icon" 
                  svgCode={iconSvgCode}
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

      // Typography section
      case 'typography':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Typography</Typography>
            <div className="space-y-4">
              <Typography variant="h1">Heading 1 - 60px / font-medium</Typography>
              <Typography variant="h2">Heading 2 - 48px / font-medium</Typography>
              <Typography variant="h3">Heading 3 - 30px / font-medium</Typography>
              <Typography variant="h4">Heading 4 - 24px / font-medium</Typography>
              <Typography variant="body1" className="font-bold">Body Bold - Maximum emphasis</Typography>
              <Typography variant="body1" className="font-semibold">Body Semibold - Strong emphasis</Typography>
              <Typography variant="body1" className="font-medium">Body Medium - Medium emphasis</Typography>
              <Typography variant="body1">Body Normal - Default content text</Typography>
              <Typography variant="body3">Body Light - Elegant subtle text</Typography>
              <Typography variant="body2" className="font-bold">Small Bold - Emphasized secondary</Typography>
              <Typography variant="body2" className="font-semibold">Small Semibold - Strong secondary</Typography>
              <Typography variant="body2" className="font-medium">Small Medium - Medium secondary</Typography>
              <Typography variant="body2">Small Normal - Secondary content</Typography>
              <Typography variant="caption">Caption - Meta information</Typography>
            </div>
          </div>
        );

      // Buttons section
      case 'buttons':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Buttons</Typography>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Primary</Button>
                <Button variant="secondary" className="bg-grey-200 hover:bg-grey-300 text-grey-800">Secondary</Button>
                <Button variant="destructive" className="bg-error-main hover:bg-error-dark text-white">Destructive</Button>
                <Button variant="outline" className="border-primary-main text-primary-main hover:bg-primary-main hover:text-primary-contrast-text">Outline</Button>
                <Button variant="ghost" className="text-primary-main hover:bg-primary-lighter">Ghost</Button>
                <Button variant="link" className="text-primary-main hover:underline p-0 h-auto">Link Button</Button>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text h-7 px-2 text-xs">Extra Small</Button>
                <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Small</Button>
                <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Default</Button>
                <Button size="lg" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Large</Button>
              </div>
            </div>
          </div>
        );

      // Badges section
      case 'badges':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Status Badges</Typography>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">RTP Prepared</Badge>
                <Badge className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Awaiting SC</Badge>
                <Badge className="bg-violet-50 text-violet-700 border-violet-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">RTP Sent</Badge>
                <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Pending Action</Badge>
                <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Rejected by Buyer</Badge>
                <Badge className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Approved by Buyer</Badge>
                <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">External Submission</Badge>
                <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Paid</Badge>
                <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Settled</Badge>
                <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Partially Settled</Badge>
                <Badge className="bg-grey-100 text-grey-700 border-grey-300 hover:bg-primary-main hover:text-primary-contrast-text font-normal">Excluded</Badge>
              </div>
            </div>
          </div>
        );

      // Alerts section
      case 'alerts':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Alert Cases</Typography>
            <div className="space-y-4">
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4 text-blue-700" />
                <AlertDescription className="text-blue-700">
                  This is an informational alert with important details for the user.
                </AlertDescription>
              </Alert>
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-700" />
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
                <AlertCircle className="h-4 w-4 text-red-700" />
                <AlertDescription className="text-red-700">
                  An error occurred while processing your request. Please try again.
                </AlertDescription>
              </Alert>
            </div>
            <div className="space-y-4">
              <Alert className="bg-blue-600 text-white border-0">
                <Info className="h-4 w-4 text-white" />
                <AlertDescription className="text-white">
                  High contrast informational alert for maximum visibility.
                </AlertDescription>
              </Alert>
              <Alert className="bg-green-600 text-white border-0">
                <CheckCircle className="h-4 w-4 text-white" />
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
                <AlertCircle className="h-4 w-4 text-white" />
                <AlertDescription className="text-white">
                  Critical error alert with high contrast for urgent situations.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        );

      // Modals section
      case 'modals':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Modals</Typography>
            <div className="space-y-4">
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
        );

      // Dropdowns section
      case 'dropdowns':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Dropdown Fields</Typography>
            <div className="space-y-4">
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

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-grey-400 text-grey-700 hover:bg-grey-200">
                    Actions
                    <MoreHorizontal className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-background-paper border border-grey-300 shadow-lg z-50">
                  <DropdownMenuItem className="cursor-pointer hover:bg-grey-100">Edit</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-grey-100">Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer hover:bg-grey-100 text-error-main">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );

      // Breadcrumbs section
      case 'breadcrumbs':
        return (
          <div className="space-y-6">
            <Typography variant="h3" className="mb-6">Breadcrumbs</Typography>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                    <Home className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronDown className="h-4 w-4 text-grey-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-grey-600 hover:text-primary-main">
                    Invoices
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronDown className="h-4 w-4 text-grey-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-grey-900 font-medium">
                    Invoice #12345
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <Typography variant="h3">Select a Section</Typography>
            <Typography variant="body1">Choose a component from the sidebar to explore the design system.</Typography>
          </div>
        );
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
      
      <Toaster />
    </div>
  );
};

export default DesignSystemPlayground;
