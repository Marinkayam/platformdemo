import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Typography } from '@/components/ui/typography/typography';
import { ApplyGloballyModal } from '@/components/ui/apply-globally-modal';
import { componentUsageData } from '@/data/componentUsage';
import { MontoLogo } from '@/components/MontoLogo';
import MontoIcon from '@/components/MontoIcon';
import { Copy, Check, Filter, X, Search, Download, Upload, Settings, User, Mail, Phone, Calendar, Globe, FileText, Home, BarChart3, Users, CreditCard, Package, Truck, Building2, AlertCircle, CheckCircle, XCircle, Clock, Star, Heart, Eye, EyeOff, Plus, Minus, Edit, Trash2, Save, Send, Share, Lock, Unlock, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, MoreVertical, Menu, Bell, Info, AlertTriangle, Zap, Shield, Target, Award, Gift, Map, Camera, Image, Video, Music, Headphones, Phone as PhoneIcon, MessageCircle, PlusCircle, MinusCircle, PlayCircle, PauseCircle, Square, Triangle, Circle, Diamond, Hexagon, Octagon, Pentagon } from 'lucide-react';

interface FilterState {
  search: string;
  category: string;
  status: string;
}

const DesignSystemPlayground = () => {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [filterState, setFilterState] = useState<FilterState>({
    search: '',
    category: '',
    status: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    type: '',
    newsletter: false,
    plan: ''
  });

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [id]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilterState(prev => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key: keyof FilterState) => {
    setFilterState(prev => ({ ...prev, [key]: '' }));
  };

  const clearAllFilters = () => {
    setFilterState({ search: '', category: '', status: '' });
  };

  const getActiveFilters = () => {
    return Object.entries(filterState).filter(([_, value]) => value !== '');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
  };

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const montoLogoSvg = `<svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M8 24V8h4l6 12 6-12h4v16h-3V12l-5 10h-2l-5-10v12H8zm24-16h10v3h-7v3h6v3h-6v4h7v3H32V8zm24 0v16h-3l-8-10v10h-3V8h3l8 10V8h3zm12 0h3v6h6V8h3v16h-3v-7h-6v7h-3V8zm18 8c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8-8-3.6-8-8zm3 0c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5-5 2.2-5 5z" fill="#7B59FF"/>
</svg>`;

  const montoIconSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="14" fill="#7B59FF"/>
  <path d="M8 20V12h2l3 6 3-6h2v8h-1.5V14.5l-2.5 5h-1l-2.5-5V20H8z" fill="white"/>
</svg>`;

  return (
    <div className="min-h-screen bg-background-default">
      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <Typography variant="h1" className="text-grey-900">
            Monto UI Design System
          </Typography>
          <Typography variant="body1" className="text-grey-600 max-w-2xl mx-auto">
            A comprehensive design system playground showcasing components, patterns, and guidelines
            for building consistent user interfaces.
          </Typography>
        </div>

        {/* Colors Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h2" className="text-grey-900">Color Palette</Typography>
            <ApplyGloballyModal 
              componentType="buttons" 
              usageData={componentUsageData.buttons}
              onApply={(pages) => console.log('Apply colors to:', pages)}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          {/* Primary Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Primary Colors</CardTitle>
              <CardDescription>Main brand colors for primary actions and branding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { name: 'Primary Lighter', class: 'bg-primary-lighter', hex: '#EFEBFF' },
                  { name: 'Primary Light', class: 'bg-primary-light', hex: '#BEADFF' },
                  { name: 'Primary Main', class: 'bg-primary-main', hex: '#7B59FF' },
                  { name: 'Primary Dark', class: 'bg-primary-dark', hex: '#523BAA' },
                  { name: 'Primary Darker', class: 'bg-primary-darker', hex: '#291E55' },
                ].map((color) => (
                  <div key={color.name} className="space-y-2">
                    <div className={`${color.class} h-16 rounded-lg border border-grey-300`}></div>
                    <div className="space-y-1">
                      <Typography variant="caption" className="font-medium">{color.name}</Typography>
                      <Typography variant="smallText" className="text-grey-500 font-mono">{color.hex}</Typography>
                      <Typography variant="smallText" className="text-grey-500 font-mono">{color.class}</Typography>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Semantic Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Semantic Colors</CardTitle>
              <CardDescription>Colors for conveying meaning and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    name: 'Success', 
                    colors: [
                      { name: 'Lighter', class: 'bg-success-lighter', hex: '#E6F1EB' },
                      { name: 'Main', class: 'bg-success-main', hex: '#007737' },
                      { name: 'Dark', class: 'bg-success-dark', hex: '#005427' }
                    ]
                  },
                  { 
                    name: 'Error', 
                    colors: [
                      { name: 'Lighter', class: 'bg-error-lighter', hex: '#FDEDF0' },
                      { name: 'Main', class: 'bg-error-main', hex: '#DF1C41' },
                      { name: 'Dark', class: 'bg-error-dark', hex: '#AF1D38' }
                    ]
                  },
                  { 
                    name: 'Warning', 
                    colors: [
                      { name: 'Lighter', class: 'bg-warning-lighter', hex: '#FEF7EC' },
                      { name: 'Main', class: 'bg-warning-main', hex: '#F2AE40' },
                      { name: 'Dark', class: 'bg-warning-dark', hex: '#B47818' }
                    ]
                  },
                  { 
                    name: 'Info', 
                    colors: [
                      { name: 'Lighter', class: 'bg-info-lighter', hex: '#EBF1FF' },
                      { name: 'Main', class: 'bg-info-main', hex: '#375DFB' },
                      { name: 'Dark', class: 'bg-info-dark', hex: '#253EA7' }
                    ]
                  }
                ].map((group) => (
                  <div key={group.name} className="space-y-3">
                    <Typography variant="subtitle1">{group.name}</Typography>
                    <div className="space-y-2">
                      {group.colors.map((color) => (
                        <div key={color.name} className="flex items-center space-x-2">
                          <div className={`${color.class} w-8 h-8 rounded border border-grey-300`}></div>
                          <div>
                            <Typography variant="caption" className="font-medium">{color.name}</Typography>
                            <Typography variant="smallText" className="text-grey-500 font-mono block">{color.hex}</Typography>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Typography Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h2" className="text-grey-900">Typography</Typography>
            <ApplyGloballyModal 
              componentType="buttons" 
              usageData={componentUsageData.buttons}
              onApply={(pages) => console.log('Apply typography to:', pages)}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Text Hierarchy</CardTitle>
              <CardDescription>Consistent typography scale for all content types</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { variant: 'h1', text: 'Heading 1 - Hero Headlines', description: 'Main page titles and hero sections' },
                { variant: 'h2', text: 'Heading 2 - Section Titles', description: 'Major section headings' },
                { variant: 'h3', text: 'Heading 3 - Subsection Titles', description: 'Component and subsection titles' },
                { variant: 'h4', text: 'Heading 4 - Component Titles', description: 'Card titles and component headings' },
                { variant: 'h5', text: 'Heading 5 - Small Headings', description: 'Form sections and emphasized content' },
                { variant: 'h6', text: 'Heading 6 - Micro Headings', description: 'Labels and micro content' },
                { variant: 'subtitle1', text: 'Subtitle 1 - Primary Subtitles', description: 'Important secondary text' },
                { variant: 'subtitle2', text: 'Subtitle 2 - Secondary Subtitles', description: 'Supporting information' },
                { variant: 'body1', text: 'Body 1 - Default Body Text', description: 'Main content and paragraphs' },
                { variant: 'body2', text: 'Body 2 - Small Body Text', description: 'Secondary content and descriptions' },
                { variant: 'caption', text: 'Caption - Image Captions', description: 'Meta information and captions' },
                { variant: 'overline', text: 'OVERLINE - CATEGORY LABELS', description: 'Section headers and categories' },
                { variant: 'button', text: 'Button Text', description: 'Interactive elements' },
              ].map((item) => (
                <div key={item.variant} className="space-y-2">
                  <Typography variant={item.variant as any} className="text-grey-900">
                    {item.text}
                  </Typography>
                  <Typography variant="caption" className="text-grey-500">
                    {item.description}
                  </Typography>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Spacing & Layout Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h2" className="text-grey-900">Spacing & Layout</Typography>
            <ApplyGloballyModal 
              componentType="layout" 
              usageData={componentUsageData.layout}
              onApply={(pages) => console.log('Apply spacing to:', pages)}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
              <CardDescription>Consistent spacing based on 4px grid system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { size: '1', px: '4px', rem: '0.25rem', use: 'Minimal spacing for tight layouts' },
                  { size: '2', px: '8px', rem: '0.5rem', use: 'Small spacing for compact elements' },
                  { size: '3', px: '12px', rem: '0.75rem', use: 'Medium spacing for comfortable layouts' },
                  { size: '4', px: '16px', rem: '1rem', use: 'Default spacing unit and base measurement' },
                  { size: '6', px: '24px', rem: '1.5rem', use: 'Large spacing for generous layouts' },
                  { size: '8', px: '32px', rem: '2rem', use: 'Section spacing and major separations' },
                  { size: '12', px: '48px', rem: '3rem', use: 'Large section spacing' },
                  { size: '16', px: '64px', rem: '4rem', use: 'Page section spacing' },
                ].map((space) => (
                  <div key={space.size} className="flex items-center justify-between p-4 bg-grey-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`bg-primary-main h-4 rounded`} style={{ width: space.px }}></div>
                      <div>
                        <Typography variant="subtitle2" className="font-mono">space-{space.size}</Typography>
                        <Typography variant="caption" className="text-grey-600">
                          {space.px} ({space.rem})
                        </Typography>
                      </div>
                    </div>
                    <Typography variant="body2" className="text-grey-700 max-w-xs">
                      {space.use}
                    </Typography>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Layout Examples</CardTitle>
              <CardDescription>Common layout patterns and spacing applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Card Layout Example */}
              <div className="space-y-3">
                <Typography variant="subtitle1">Card Layout (p-6 space-y-4)</Typography>
                <div className="bg-background-paper p-6 rounded-lg border border-grey-300 space-y-4">
                  <Typography variant="h5">Card Title</Typography>
                  <Typography variant="body2" className="text-grey-600">
                    This demonstrates proper spacing within a card component using padding and vertical spacing utilities.
                  </Typography>
                  <div className="flex space-x-3">
                    <Button size="sm">Primary</Button>
                    <Button variant="outline" size="sm">Secondary</Button>
                  </div>
                </div>
              </div>

              {/* Form Layout Example */}
              <div className="space-y-3">
                <Typography variant="subtitle1">Form Layout (space-y-4)</Typography>
                <div className="bg-background-paper p-6 rounded-lg border border-grey-300 space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="Enter your name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input type="email" placeholder="Enter your email" />
                  </div>
                  <Button className="w-full">Submit</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Buttons Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h2" className="text-grey-900">Buttons</Typography>
            <ApplyGloballyModal 
              componentType="buttons" 
              usageData={componentUsageData.buttons}
              onApply={(pages) => console.log('Apply buttons to:', pages)}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Button Variants */}
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>Different button styles for various use cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button className="w-full">Primary Button</Button>
                  <Button variant="secondary" className="w-full">Secondary Button</Button>
                  <Button variant="outline" className="w-full">Outline Button</Button>
                  <Button variant="ghost" className="w-full">Ghost Button</Button>
                  <Button variant="link" className="w-full">Link Button</Button>
                  <Button variant="destructive" className="w-full">Destructive Button</Button>
                </div>
              </CardContent>
            </Card>

            {/* Button Sizes */}
            <Card>
              <CardHeader>
                <CardTitle>Button Sizes</CardTitle>
                <CardDescription>Different sizes for various contexts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button size="lg" className="w-full">Large Button</Button>
                  <Button className="w-full">Default Button</Button>
                  <Button size="sm" className="w-full">Small Button</Button>
                  <Button size="icon" className="mx-auto">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Button States */}
            <Card>
              <CardHeader>
                <CardTitle>Button States</CardTitle>
                <CardDescription>Various button states and interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button className="w-full">Normal State</Button>
                  <Button className="w-full" disabled>Disabled State</Button>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    With Icon
                  </Button>
                  <Button variant="outline" className="w-full">
                    Loading...
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Form Elements Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h2" className="text-grey-900">Form Elements</Typography>
            <ApplyGloballyModal 
              componentType="forms" 
              usageData={componentUsageData.forms}
              onApply={(pages) => console.log('Apply forms to:', pages)}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Form</CardTitle>
              <CardDescription>Functional form with various input types</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6 max-w-2xl">
                {/* Text Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input 
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Textarea */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    placeholder="Enter your message"
                    rows={4}
                  />
                </div>

                {/* Select */}
                <div className="space-y-2">
                  <Label>Inquiry Type</Label>
                  <Select value={formData.type} onValueChange={(value) => updateFormData('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="sales">Sales Question</SelectItem>
                      <SelectItem value="billing">Billing Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Radio Group */}
                <div className="space-y-3">
                  <Label>Subscription Plan</Label>
                  <RadioGroup value={formData.plan} onValueChange={(value) => updateFormData('plan', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="basic" id="basic" />
                      <Label htmlFor="basic">Basic Plan ($9/month)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pro" id="pro" />
                      <Label htmlFor="pro">Pro Plan ($29/month)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="enterprise" id="enterprise" />
                      <Label htmlFor="enterprise">Enterprise Plan (Contact us)</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newsletter"
                    checked={formData.newsletter}
                    onCheckedChange={(checked) => updateFormData('newsletter', checked)}
                  />
                  <Label htmlFor="newsletter">Subscribe to our newsletter</Label>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3">
                  <Button type="submit" className="flex-1">
                    Submit Form
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setFormData({ name: '', email: '', message: '', type: '', newsletter: false, plan: '' })}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Step Progress Indicators Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h2" className="text-grey-900">Step Progress Indicators</Typography>
            <ApplyGloballyModal 
              componentType="progress" 
              usageData={componentUsageData.progress}
              onApply={(pages) => console.log('Apply progress to:', pages)}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Progress Indicators</CardTitle>
              <CardDescription>Visual indicators for multi-step processes using primary brand colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Linear Progress */}
              <div className="space-y-4">
                <Typography variant="subtitle1">Linear Progress Bar</Typography>
                <div className="space-y-3">
                  <Progress value={25} className="h-2" style={{ backgroundColor: '#BEADFF' }} />
                  <Progress value={50} className="h-2" style={{ backgroundColor: '#BEADFF' }} />
                  <Progress value={75} className="h-2" style={{ backgroundColor: '#BEADFF' }} />
                  <Progress value={100} className="h-2" style={{ backgroundColor: '#BEADFF' }} />
                </div>
              </div>

              {/* Step Indicators */}
              <div className="space-y-4">
                <Typography variant="subtitle1">Step Indicators</Typography>
                <div className="flex items-center justify-between">
                  {[1, 2, 3, 4].map((step, index) => (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center space-y-2">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                            index < 2 ? 'bg-primary-main' : 'bg-primary-light'
                          }`}
                        >
                          {index < 1 ? <Check className="w-4 h-4" /> : step}
                        </div>
                        <Typography variant="caption" className="text-grey-600">
                          Step {step}
                        </Typography>
                      </div>
                      {index < 3 && (
                        <div 
                          className={`flex-1 h-0.5 mx-4 ${
                            index < 1 ? 'bg-primary-main' : 'bg-primary-light'
                          }`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Circular Progress */}
              <div className="space-y-4">
                <Typography variant="subtitle1">Circular Progress</Typography>
                <div className="flex items-center space-x-8">
                  {[25, 50, 75, 100].map((value) => (
                    <div key={value} className="flex flex-col items-center space-y-2">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="#BEADFF"
                            strokeWidth="4"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            fill="none"
                            stroke="#7B59FF"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={`${(value / 100) * 175.92} 175.92`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Typography variant="caption" className="font-medium">
                            {value}%
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Badges Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h2" className="text-grey-900">Badges & Status</Typography>
            <ApplyGloballyModal 
              componentType="badges" 
              usageData={componentUsageData.badges}
              onApply={(pages) => console.log('Apply badges to:', pages)}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Basic Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Badges</CardTitle>
                <CardDescription>Simple badges for labeling and categorization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Status Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Status Badges</CardTitle>
                <CardDescription>Badges for displaying status and state information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-success-main hover:bg-success-dark">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approved
                    </Badge>
                    <Typography variant="caption">Success state</Typography>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-warning-main hover:bg-warning-dark text-warning-contrast-text">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </Badge>
                    <Typography variant="caption">Warning state</Typography>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive">
                      <XCircle className="w-3 h-3 mr-1" />
                      Rejected
                    </Badge>
                    <Typography variant="caption">Error state</Typography>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-info-main hover:bg-info-dark">
                      <Info className="w-3 h-3 mr-1" />
                      Request to Pay Sent
                    </Badge>
                    <Typography variant="caption">Info state</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Interactive Badges */}
            <Card>
              <CardHeader>
                <CardTitle>Interactive Badges</CardTitle>
                <CardDescription>Clickable badges with actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['React', 'TypeScript', 'Tailwind', 'Design System'].map((tech) => (
                    <Badge key={tech} variant="outline" className="cursor-pointer hover:bg-primary-lighter">
                      {tech}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Filter Components Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h2" className="text-grey-900">Filter Components</Typography>
            <ApplyGloballyModal 
              componentType="filters" 
              usageData={componentUsageData.filters}
              onApply={(pages) => console.log('Apply filters to:', pages)}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Filters</CardTitle>
              <CardDescription>Functional filter components with state management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Filter */}
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-grey-500" />
                  <Input 
                    placeholder="Search items..."
                    value={filterState.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="pl-10"
                  />
                  {filterState.search && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1.5 h-7 w-7 p-0"
                      onClick={() => clearFilter('search')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={filterState.category} onValueChange={(value) => handleFilterChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="components">Components</SelectItem>
                    <SelectItem value="patterns">Patterns</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="layouts">Layouts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={filterState.status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters */}
              {getActiveFilters().length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Active Filters</Label>
                    <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                      Clear All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {getActiveFilters().map(([key, value]) => (
                      <Badge key={key} variant="outline" className="cursor-pointer hover:bg-error-lighter">
                        {key}: {value}
                        <X 
                          className="w-3 h-3 ml-1"
                          onClick={() => clearFilter(key as keyof FilterState)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Filter Results */}
              <div className="p-4 bg-grey-200 rounded-lg">
                <Typography variant="body2" className="text-grey-700">
                  Showing results for: {getActiveFilters().length > 0 ? 
                    getActiveFilters().map(([key, value]) => `${key}: "${value}"`).join(', ') : 
                    'All items'
                  }
                </Typography>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tabs Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <Typography variant="h2" className="text-grey-900">Tabs Navigation</Typography>
            <ApplyGloballyModal 
              componentType="tabs" 
              usageData={componentUsageData.tabs}
              onApply={(pages) => console.log('Apply tabs to:', pages)}
            >
              <Button variant="outline" size="sm">Apply Globally</Button>
            </ApplyGloballyModal>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tab Components</CardTitle>
              <CardDescription>Navigation tabs for organizing content</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="help">Help</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <Typography variant="h5">Overview Tab</Typography>
                  <Typography variant="body2" className="text-grey-600">
                    This is the overview tab content. It provides a general summary of the information
                    and key metrics that users need to see at a glance.
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: 'Total Items', value: '1,234', change: '+5.2%' },
                      { title: 'Active Users', value: '892', change: '+12.1%' },
                      { title: 'Conversion Rate', value: '3.2%', change: '-2.1%' }
                    ].map((metric) => (
                      <div key={metric.title} className="p-4 bg-grey-200 rounded-lg">
                        <Typography variant="caption" className="text-grey-600">{metric.title}</Typography>
                        <Typography variant="h4" className="text-grey-900">{metric.value}</Typography>
                        <Typography variant="caption" className={metric.change.startsWith('+') ? 'text-success-main' : 'text-error-main'}>
                          {metric.change}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="details" className="space-y-4">
                  <Typography variant="h5">Details Tab</Typography>
                  <Typography variant="body2" className="text-grey-600">
                    Detailed information and data tables would be displayed here. This tab typically
                    contains more comprehensive data and analysis.
                  </Typography>
                </TabsContent>
                <TabsContent value="settings" className="space-y-4">
                  <Typography variant="h5">Settings Tab</Typography>
                  <Typography variant="body2" className="text-grey-600">
                    Configuration options and preferences would be available in this tab. Users can
                    customize their experience and adjust various parameters.
                  </Typography>
                </TabsContent>
                <TabsContent value="help" className="space-y-4">
                  <Typography variant="h5">Help Tab</Typography>
                  <Typography variant="body2" className="text-grey-600">
                    Documentation, tutorials, and support resources would be provided here to help
                    users understand and effectively use the features.
                  </Typography>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Monto Logo Section */}
        <section className="space-y-6">
          <Typography variant="h2" className="text-grey-900">Monto Brand Assets</Typography>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monto Logo */}
            <Card>
              <CardHeader>
                <CardTitle>Monto Logo</CardTitle>
                <CardDescription>Primary brand logo in main color (#7B59FF)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center p-8 bg-grey-200 rounded-lg">
                  <MontoLogo className="h-8" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle2">SVG Code</Typography>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(montoLogoSvg, 'logo-svg')}
                    >
                      {copiedStates['logo-svg'] ? (
                        <><Check className="w-4 h-4 mr-2" /> Copied</>
                      ) : (
                        <><Copy className="w-4 h-4 mr-2" /> Copy SVG</>
                      )}
                    </Button>
                  </div>
                  <div className="p-3 bg-grey-200 rounded font-mono text-xs overflow-x-auto">
                    <pre>{montoLogoSvg}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monto Icon */}
            <Card>
              <CardHeader>
                <CardTitle>Monto Icon</CardTitle>
                <CardDescription>Compact icon version in main color (#7B59FF)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center p-8 bg-grey-200 rounded-lg">
                  <MontoIcon className="h-8 w-8" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Typography variant="subtitle2">SVG Code</Typography>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopy(montoIconSvg, 'icon-svg')}
                    >
                      {copiedStates['icon-svg'] ? (
                        <><Check className="w-4 h-4 mr-2" /> Copied</>
                      ) : (
                        <><Copy className="w-4 h-4 mr-2" /> Copy SVG</>
                      )}
                    </Button>
                  </div>
                  <div className="p-3 bg-grey-200 rounded font-mono text-xs overflow-x-auto">
                    <pre>{montoIconSvg}</pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DesignSystemPlayground;
