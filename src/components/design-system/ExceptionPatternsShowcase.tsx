import React, { useState } from 'react';
import { ExceptionBanner } from '@/components/ui/exception-banner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BadgePill from '@/components/ui/badge-pill';
import { Sparkles, WandSparkles, Upload, FileText, Check, AlertCircle, CheckCircle, ChevronDown, Search, X } from 'lucide-react';
import { Code } from 'lucide-react';

export function ExceptionPatternsShowcase() {
  const [showModal, setShowModal] = useState(false);
  const [resolutionMethod, setResolutionMethod] = useState<'upload' | 'manual' | 'suggested'>('manual');
  const [manualInput, setManualInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState('');
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  // Duplication pattern state
  const [selectedDuplicateId, setSelectedDuplicateId] = useState<string>('dup-1');

  // Extra Data pattern state
  const [invoiceDate, setInvoiceDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [extraDataAction, setExtraDataAction] = useState<'upload' | 'force_submit' | 'exclude' | 'resolve_outside' | null>(null);
  const [showExtraDataOptions, setShowExtraDataOptions] = useState(false);

  // Portal Record Association pattern state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const suggestions = [
    { id: '1', label: 'PO-2024-001', details: 'Buyer: Acme Corp • USD • TRA: $50,000' },
    { id: '2', label: 'PO-2024-002', details: 'Buyer: Acme Corp • USD • TRA: $75,000' },
    { id: '3', label: 'PO-2024-003', details: 'Buyer: Acme Corp • USD • TRA: $100,000' }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Exception Resolution Patterns</h2>
        <p className="text-gray-600">
          Reusable patterns for handling validation errors, duplicates, and data conflicts.
        </p>
      </div>

      <Tabs defaultValue="banners" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="header">Header</TabsTrigger>
          <TabsTrigger value="resolution">Modal</TabsTrigger>
          <TabsTrigger value="full">PO Validation</TabsTrigger>
          <TabsTrigger value="duplication">Duplication</TabsTrigger>
          <TabsTrigger value="extradata">Extra Data</TabsTrigger>
          <TabsTrigger value="association">Association</TabsTrigger>
        </TabsList>

        {/* Tab 1: Exception Banners */}
        <TabsContent value="banners" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exception Banner Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Component: ExceptionBanner (variant="error")</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <Label className="text-sm font-medium mb-2 block">Error Variant</Label>
                <ExceptionBanner variant="error" icon="alert" title="Critical Error">
                  This is a critical blocking issue that must be resolved before proceeding.
                </ExceptionBanner>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Component: ExceptionBanner (variant="warning")</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <Label className="text-sm font-medium mb-2 block">Warning Variant</Label>
                <ExceptionBanner variant="warning" icon="triangle-alert" title="Warning">
                  This is a non-critical issue that needs your attention.
                </ExceptionBanner>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Component: ExceptionBanner (variant="info")</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <Label className="text-sm font-medium mb-2 block">Info Variant</Label>
                <ExceptionBanner variant="info" icon="sparkles" title="Action Required">
                  Please review the information below and take the appropriate action.
                </ExceptionBanner>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Component: ExceptionBanner (variant="success")</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <Label className="text-sm font-medium mb-2 block">Success Variant</Label>
                <ExceptionBanner variant="success" icon="circle" title="Validation Passed">
                  All checks passed successfully. You can proceed with this record.
                </ExceptionBanner>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Exception Banner with Inline Action Button</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <Label className="text-sm font-medium mb-2 block">With Action Button</Label>
                <ExceptionBanner variant="error" icon="alert" title="PO is Closed">
                  <div className="flex items-center justify-between gap-4">
                    <span>This PO is marked as closed and cannot be invoiced against.</span>
                    <Button size="sm" variant="destructive" className="flex-shrink-0">
                      Enter a different PO
                    </Button>
                  </div>
                </ExceptionBanner>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto">
{`<ExceptionBanner
  variant="error"
  icon="alert"
  title="Critical Error"
>
  This is a critical blocking issue.
</ExceptionBanner>

<ExceptionBanner variant="warning" icon="triangle-alert" title="Warning">
  This needs your attention.
</ExceptionBanner>

<ExceptionBanner variant="info" icon="sparkles" title="Action Required">
  Please review and take action.
</ExceptionBanner>`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Header Pattern */}
        <TabsContent value="header" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Exception Header Pattern</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Exception Header (Error type with BadgePill)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="border rounded-lg p-6 bg-white">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-medium text-gray-900">Resolve Exception</h2>
                      <BadgePill label="Duplication" color="error" variant="secondary" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p style={{ color: '#38415F' }} className="text-sm">
                        Monto continuously monitors portal data. If conditions change, exceptions may be resolved automatically — no action needed on your end.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Exception Header (Warning type with BadgePill)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="border rounded-lg p-6 bg-white">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-medium text-gray-900">Resolve Exception</h2>
                      <BadgePill label="PO Validation" color="warning" variant="secondary" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p style={{ color: '#38415F' }} className="text-sm">
                        Monto continuously monitors portal data. If conditions change, exceptions may be resolved automatically — no action needed on your end.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Exception Header (Info type with BadgePill)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="border rounded-lg p-6 bg-white">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-medium text-gray-900">Resolve Exception</h2>
                      <BadgePill label="Smart Connection" color="info" variant="secondary" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p style={{ color: '#38415F' }} className="text-sm">
                        Monto continuously monitors portal data. If conditions change, exceptions may be resolved automatically — no action needed on your end.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto">
{`<div className="space-y-3">
  <div className="flex items-center gap-3">
    <h2 className="text-lg font-medium">Resolve Exception</h2>
    <BadgePill label="Duplication" color="error" variant="secondary" />
  </div>
  <div className="flex items-start gap-2">
    <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5" />
    <p style={{ color: '#38415F' }} className="text-sm">
      Monto continuously monitors portal data...
    </p>
  </div>
</div>`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Resolution Modal */}
        <TabsContent value="resolution" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resolution Modal Pattern</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowModal(true)}>
                Open Resolution Modal Example
              </Button>

              <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Resolve PO Exception</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    {/* Exception Summary */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-medium text-gray-500">Pattern: Exception Summary (gray box)</Label>
                        <Code className="h-3 w-3 text-gray-400" />
                      </div>
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Insufficient PO Funds</h4>
                        <p className="text-sm text-gray-600">
                          This invoice exceeds the remaining available amount on the PO. Only $25,000 remains.
                        </p>
                      </div>
                    </div>

                    {/* Resolution Methods */}
                    <RadioGroup value={resolutionMethod} onValueChange={(value) => setResolutionMethod(value as any)} className="space-y-6">
                      {/* Upload Option */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="upload" id="upload" />
                          <Label htmlFor="upload" className="font-medium">Upload new PO document</Label>
                        </div>
                        {resolutionMethod === 'upload' && (
                          <div className="ml-6 space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs font-medium text-gray-500">Pattern: File Upload Zone (dashed border)</Label>
                              <Code className="h-3 w-3 text-gray-400" />
                            </div>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                              <input
                                type="file"
                                id="po-upload"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                              />
                              <label htmlFor="po-upload" className="cursor-pointer">
                                {uploadedFile ? (
                                  <div className="flex items-center justify-center gap-3">
                                    <FileText className="h-8 w-8 text-green-600" />
                                    <div className="text-left">
                                      <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                                      <p className="text-sm text-gray-500">Click to change file</p>
                                    </div>
                                    <Check className="h-5 w-5 text-green-600" />
                                  </div>
                                ) : (
                                  <div>
                                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                    <p className="text-gray-600">Click to upload PO document</p>
                                    <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                                  </div>
                                )}
                              </label>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Manual Entry Option */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="manual" id="manual" />
                          <Label htmlFor="manual" className="font-medium">Enter PO number manually</Label>
                        </div>
                        {resolutionMethod === 'manual' && (
                          <div className="ml-6 space-y-3">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <Label className="text-xs font-medium text-gray-500">Pattern: Input with Real-time Validation (green icon + success message)</Label>
                                <Code className="h-3 w-3 text-gray-400" />
                              </div>
                              <div className="relative">
                                <Input
                                  placeholder="e.g., PO-2024-001"
                                  value={manualInput}
                                  onChange={(e) => setManualInput(e.target.value)}
                                  className="max-w-xs pr-10"
                                />
                                {manualInput && (
                                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  </div>
                                )}
                              </div>
                              {manualInput && (
                                <div className="text-sm text-green-600">
                                  Valid PO: $50,000 available
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Suggested POs Option */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="suggested" id="suggested" />
                          <Label htmlFor="suggested" className="font-medium">
                            Select from suggested POs (3 found)
                          </Label>
                        </div>
                        {resolutionMethod === 'suggested' && (
                          <div className="ml-6 space-y-2">
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-xs font-medium text-gray-500">Pattern: Selectable Suggestion Cards (border highlight on select)</Label>
                              <Code className="h-3 w-3 text-gray-400" />
                            </div>
                            {suggestions.map((suggestion) => (
                              <div
                                key={suggestion.id}
                                className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                                  selectedSuggestion === suggestion.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => setSelectedSuggestion(suggestion.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      <p className="font-medium text-sm">{suggestion.label}</p>
                                    </div>
                                    <p className="text-xs text-gray-600">{suggestion.details}</p>
                                  </div>
                                  {selectedSuggestion === suggestion.id && (
                                    <Check className="h-5 w-5 text-primary" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </RadioGroup>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowModal(false)}>
                      Cancel
                    </Button>
                    <Button>Resolve Exception</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Code className="h-4 w-4" />
                Code Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto">
{`<Dialog open={showModal} onOpenChange={setShowModal}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Resolve PO Exception</DialogTitle>
    </DialogHeader>

    <div className="space-y-6 py-4">
      {/* Exception Summary */}
      <div className="bg-gray-50 border rounded-lg p-4">
        <h4 className="font-medium mb-2">Exception Title</h4>
        <p className="text-sm text-gray-600">Description...</p>
      </div>

      {/* Resolution Options */}
      <RadioGroup value={method} onValueChange={setMethod}>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upload" id="upload" />
              <Label htmlFor="upload">Upload new document</Label>
            </div>
            {method === 'upload' && (
              <div className="ml-6">
                {/* File upload zone */}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="manual" id="manual" />
              <Label htmlFor="manual">Enter manually</Label>
            </div>
            {method === 'manual' && (
              <div className="ml-6">
                {/* Input field with validation */}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="suggested" id="suggested" />
              <Label htmlFor="suggested">Select from suggestions</Label>
            </div>
            {method === 'suggested' && (
              <div className="ml-6">
                {/* Suggestion cards */}
              </div>
            )}
          </div>
        </div>
      </RadioGroup>
    </div>

    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Resolve Exception</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Full Example */}
        <TabsContent value="full" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Complete Exception Flow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-lg p-6 bg-white">
                {/* Header Pattern */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-medium text-gray-900">Resolve Exception</h2>
                    <BadgePill label="PO Validation" color="warning" variant="secondary" />
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p style={{ color: '#38415F' }} className="text-sm">
                      Monto continuously monitors portal data. If conditions change, exceptions may be resolved automatically — no action needed on your end.
                    </p>
                  </div>
                </div>

                {/* Exception Banners Section */}
                <div className="space-y-4 mb-6">
                  <div className="pb-2">
                    <h3 className="text-sm font-medium text-gray-900">PO Exceptions</h3>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium text-gray-500">Component: ExceptionBanner (variant="error")</Label>
                      <Code className="h-3 w-3 text-gray-400" />
                    </div>
                    <ExceptionBanner variant="error" title="PO is Closed">
                      This PO is marked as closed and cannot be invoiced against.
                    </ExceptionBanner>
                  </div>

                  {/* PO Suggestions Purple Box */}
                  <div className="space-y-2 mt-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium text-gray-500">Pattern: Smart Suggestions Banner</Label>
                      <Code className="h-3 w-3 text-gray-400" />
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <WandSparkles className="mt-0.5 flex-shrink-0 text-purple-600" size={16} />
                        <div>
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            Monto found alternative POs
                          </p>
                          <p className="text-sm text-gray-600">
                            We've identified valid POs from Adobe with sufficient funds that you can use instead.
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-shrink-0 border-purple-300 hover:bg-purple-100"
                      >
                        Review PO Suggestions
                      </Button>
                    </div>
                    </div>
                  </div>
                </div>

                {/* Resolution Guidance - No bg container */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-gray-500">Pattern: Resolution Guidance Text</Label>
                    <Code className="h-3 w-3 text-gray-400" />
                  </div>
                  <div className="flex items-start gap-3">
                  <WandSparkles className="mt-0.5 flex-shrink-0 text-primary" size={16} />
                  <div>
                    <p style={{ color: '#38415F' }} className="text-sm">
                      To resolve these validation issues, you can upload a corrected RTP with valid data, or contact your customer for clarification.
                    </p>
                  </div>
                  </div>
                </div>

                {/* Upload RTP Section */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-gray-500">Component: File Upload Zone</Label>
                    <Code className="h-3 w-3 text-gray-400" />
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <div className="h-12 w-12 mb-4 flex items-center justify-center">
                      <Upload className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="font-medium mb-1 text-sm" style={{ color: '#38415F' }}>
                      Upload New RTP
                    </h3>
                    <p className="text-sm mb-4 text-center" style={{ color: '#8C92A3' }}>
                      This invoice must include the corrected data
                    </p>
                    <p className="text-sm" style={{ color: '#8C92A3' }}>
                      Drag & drop a file here or{' '}
                      <span className="font-medium cursor-pointer underline" style={{ color: '#7B59FF' }}>
                        click to browse
                      </span>
                    </p>
                  </div>
                </div>

                {/* Other Resolution Options */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium text-gray-500">Pattern: Collapsible Options (Radio Group)</Label>
                    <Code className="h-3 w-3 text-gray-400" />
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <button
                    className="w-full flex justify-between items-center px-2 py-2 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setShowOtherOptions(!showOtherOptions)}
                  >
                    <span className="font-medium text-sm" style={{ color: '#38415F' }}>
                      Other Resolution Options
                    </span>
                    <ChevronDown
                      size={16}
                      style={{ color: '#8C92A3' }}
                      className={`transition-transform duration-200 ${showOtherOptions ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {showOtherOptions && (
                    <div className="pt-2 space-y-4 mt-2">
                    <label className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="resolution"
                        className="mt-1"
                        style={{ accentColor: '#7B59FF' }}
                      />
                      <div>
                        <h4 className="font-medium text-sm" style={{ color: '#38415F' }}>
                          Force submit
                        </h4>
                        <p className="text-sm" style={{ color: '#8C92A3' }}>
                          Override validation and force processing despite the error
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="resolution"
                        className="mt-1"
                        style={{ accentColor: '#7B59FF' }}
                      />
                      <div>
                        <h4 className="font-medium text-sm" style={{ color: '#38415F' }}>
                          Exclude from submission
                        </h4>
                        <p className="text-sm" style={{ color: '#8C92A3' }}>
                          Mark this invoice as excluded
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer p-2 rounded hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="resolution"
                        className="mt-1"
                        style={{ accentColor: '#7B59FF' }}
                      />
                      <div>
                        <h4 className="font-medium text-sm" style={{ color: '#38415F' }}>
                          Resolve outside monto
                        </h4>
                        <p className="text-sm" style={{ color: '#8C92A3' }}>
                          Indicate that the issue was resolved outside the platform
                        </p>
                      </div>
                    </label>
                    </div>
                  )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <Button
                    disabled
                    className="px-8 py-3 bg-gray-200 text-gray-400 cursor-not-allowed"
                  >
                    Select Resolution Method
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Pattern Usage Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Header Pattern:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Always include "Resolve Exception" title</li>
                  <li>Use BadgePill to indicate exception type</li>
                  <li>Include auto-resolution message with Sparkles icon</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Exception Banners:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Use error variant for blocking issues</li>
                  <li>Use warning variant for non-critical issues</li>
                  <li>Use info variant for action guidance</li>
                  <li>Include action buttons when appropriate</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Resolution Modal:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Provide 2-4 resolution options via radio buttons</li>
                  <li>Show relevant UI only for selected option</li>
                  <li>Include real-time validation for manual entry</li>
                  <li>Limit suggested items to 3 maximum</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: Duplication Pattern */}
        <TabsContent value="duplication" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Duplication Exception Pattern</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-gray-600">
                This pattern is used when multiple invoices with the same number are detected.
              </p>

              {/* Header with badge */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Exception Header (Duplication type)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="border rounded-lg p-6 bg-white">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-medium text-black">Resolve Exception</h2>
                      <BadgePill label="Duplication" color="error" variant="secondary" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p style={{ color: '#38415F' }} className="text-sm">
                        Monto continuously monitors portal data. If conditions change, exceptions may be resolved automatically — no action needed on your end.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exception Banner */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Component: ExceptionBanner (variant="error")</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <ExceptionBanner variant="error" icon="alert" title="Duplication Exceptions">
                  Monto detected multiple invoices with the same number
                </ExceptionBanner>
              </div>

              {/* Resolution Guidance */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Resolution Guidance Text (with WandSparkles icon)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="flex items-start gap-3">
                  <WandSparkles className="mt-0.5 flex-shrink-0" style={{ color: '#7B59FF' }} size={16} />
                  <div>
                    <p style={{ color: '#38415F' }} className="text-sm">
                      Please select the invoice you'd like to proceed with. Click on a card to select it, then choose to keep your selection or exclude all duplicates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Duplicate Cards */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Selectable Duplicate Invoice Cards (horizontal scroll)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {[
                    { id: 'dup-1', date: '12/15/2024, 10:30 AM', buyer: 'Acme Corp', total: 45000, exceptions: 0, owner: 'John Doe' },
                    { id: 'dup-2', date: '12/14/2024, 03:45 PM', buyer: 'Acme Corp', total: 45000, exceptions: 1, owner: 'Jane Smith' },
                    { id: 'dup-3', date: '12/13/2024, 09:15 AM', buyer: 'Acme Corp', total: 45000, exceptions: 0, owner: 'Bob Johnson' }
                  ].map((invoice) => (
                    <Card
                      key={invoice.id}
                      className={`min-w-[300px] cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedDuplicateId === invoice.id
                          ? 'border-2 border-primary ring-2 ring-primary/20'
                          : 'border border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedDuplicateId(invoice.id)}
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 font-normal">Issue Date</span>
                          <FileText className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="text-sm font-normal text-gray-900">{invoice.date}</div>
                        <div className="space-y-1">
                          <span className="text-xs text-gray-500 uppercase tracking-wide font-normal">Buyer</span>
                          <div className="text-sm font-normal text-gray-900">{invoice.buyer}</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-gray-500 uppercase tracking-wide font-normal">Total</span>
                          <div className="text-sm font-normal text-gray-900">${invoice.total.toLocaleString()}</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-gray-500 uppercase tracking-wide font-normal">Exceptions</span>
                          <div className="text-sm font-normal text-gray-900">
                            {invoice.exceptions > 0 ? `${invoice.exceptions} exception${invoice.exceptions > 1 ? 's' : ''}` : 'None'}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-gray-500 uppercase tracking-wide font-normal">Owner</span>
                          <div className="text-sm font-normal text-gray-900">{invoice.owner}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Duplication Action Buttons (Exclude All + Keep Selected)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline">Exclude All</Button>
                  <Button className="bg-primary hover:bg-primary/90">Keep Selected Invoice</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 6: Extra Data Pattern */}
        <TabsContent value="extradata" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Extra Data Exception Pattern</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-gray-600">
                This pattern is used when invoice data is missing or needs verification (e.g., invoice date, customer name).
              </p>

              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Exception Header (Extra Data type)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="border rounded-lg p-6 bg-white">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-medium text-black">Resolve Exception</h2>
                      <BadgePill label="Extra Data" color="warning" variant="secondary" />
                    </div>
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <p style={{ color: '#38415F' }} className="text-sm">
                        Monto continuously monitors portal data. If conditions change, exceptions may be resolved automatically — no action needed on your end.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exception Banners */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Component: Multiple ExceptionBanners (error + info)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <ExceptionBanner variant="error" icon="alert" title="Missing Data">
                  Invoice Date and Customer Name are required for processing
                </ExceptionBanner>
                <ExceptionBanner variant="info" icon="info" title="Next Steps">
                  Please enter the missing information manually or upload a corrected invoice document
                </ExceptionBanner>
              </div>

              {/* Manual Data Entry */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Manual Data Entry Form (2-column grid)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="invoice-date" className="text-sm font-medium text-gray-900">
                          Invoice Date
                        </Label>
                        <Input
                          id="invoice-date"
                          type="text"
                          placeholder="please add the invoice data"
                          value={invoiceDate}
                          onChange={(e) => setInvoiceDate(e.target.value)}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customer-name" className="text-sm font-medium text-gray-900">
                          Customer Name
                        </Label>
                        <Input
                          id="customer-name"
                          type="text"
                          placeholder="Please insert Customer Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upload Alternative */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Upload Alternative (with "Or" separator)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="text-sm text-gray-500 font-medium">Or</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                      </div>
                      <div className="bg-white p-6 rounded-xl border border-gray-200 flex flex-col items-center cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                        <div className="h-12 w-12 mb-4 flex items-center justify-center">
                          <Upload className="h-12 w-12 text-gray-400" />
                        </div>
                        <h3 className="font-medium mb-1 text-sm" style={{ color: '#38415F' }}>
                          Upload New RTP
                        </h3>
                        <p className="text-sm mb-4 text-center" style={{ color: '#8C92A3' }}>
                          This invoice must include the corrected data
                        </p>
                        <p className="text-sm" style={{ color: '#8C92A3' }}>
                          Drag & drop a file here or{' '}
                          <span className="font-medium cursor-pointer underline" style={{ color: '#7B59FF' }}>
                            click to browse
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Other Options */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Collapsible Other Resolution Options</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <Card>
                  <CardContent className="p-6">
                    <div className="bg-white rounded-xl border border-gray-200">
                      <button
                        className="w-full flex justify-between items-center px-4 py-3 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                        onClick={() => setShowExtraDataOptions(!showExtraDataOptions)}
                      >
                        <span className="font-medium text-sm" style={{ color: '#38415F' }}>
                          Other Resolution Options
                        </span>
                        <ChevronDown
                          size={16}
                          style={{ color: '#8C92A3' }}
                          className={`transition-transform duration-200 ${showExtraDataOptions ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {showExtraDataOptions && (
                        <div className="px-4 pb-4 pt-2 space-y-4">
                          <RadioGroup value={extraDataAction || ''} onValueChange={(value) => setExtraDataAction(value as any)}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="force_submit" id="force_submit" />
                              <Label htmlFor="force_submit" className="text-sm">
                                Force Submit (override validation)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="exclude" id="exclude" />
                              <Label htmlFor="exclude" className="text-sm">
                                Exclude Invoice
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="resolve_outside" id="resolve_outside" />
                              <Label htmlFor="resolve_outside" className="text-sm">
                                Resolve Outside System
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Button */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Component: Primary Action Button</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="flex justify-end">
                  <Button className="bg-primary hover:bg-primary/90">Resolve Exception</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 7: Portal Record Association Pattern */}
        <TabsContent value="association" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Portal Record Association Pattern</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-gray-600">
                This pattern is used to associate unmatched portal records with existing invoices or create new RTP records.
              </p>

              {/* Title */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Association Interface Title</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="border rounded-lg p-6 bg-white">
                  <h2 className="text-lg font-semibold text-foreground">Associate Portal Records</h2>
                </div>
              </div>

              {/* Search and Filters Row */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Search and Filters Row (4-column grid)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="border rounded-lg p-6 bg-white">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search invoices..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-10"
                      />
                      {searchTerm && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSearchTerm('')}
                          className="absolute right-2 top-2 h-6 w-6 p-0 text-muted-foreground"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <Input placeholder="Portal filter" className="h-10" disabled />
                    <Input placeholder="Buyer filter" className="h-10" disabled />
                    <Button variant="outline" className="h-10 text-muted-foreground" disabled>
                      Select date range
                    </Button>
                  </div>
                </div>
              </div>

              {/* Monto's Suggestions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: AI-Powered Suggestions (2-column grid)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="border rounded-lg p-6 bg-white space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <Label className="text-sm font-medium text-primary">Monto's Suggestions</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { id: '1', number: 'INV-2024-001', buyer: 'Acme Corp', amount: 45000, currency: 'USD' },
                      { id: '2', number: 'INV-2024-002', buyer: 'Acme Corp', amount: 32000, currency: 'USD' }
                    ].map((invoice) => (
                      <div
                        key={invoice.id}
                        className={`relative p-4 rounded-lg border transition-all shadow-sm cursor-pointer ${
                          selectedInvoiceId === invoice.id
                            ? 'border-primary border-2 bg-white'
                            : 'border-gray-200 hover:border-primary/30 hover:shadow-md bg-white'
                        }`}
                        onClick={() => setSelectedInvoiceId(selectedInvoiceId === invoice.id ? '' : invoice.id)}
                      >
                        <div className="space-y-2">
                          <div>
                            <span className="text-xs text-gray-500 font-medium">Invoice Number</span>
                            <p className="text-sm font-bold text-gray-900">{invoice.number}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 font-medium">Buyer</span>
                            <p className="text-sm text-gray-700">{invoice.buyer}</p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 font-medium">Total Amount</span>
                            <p className="text-sm text-gray-700">
                              {new Intl.NumberFormat('en-US', { style: 'currency', currency: invoice.currency }).format(invoice.amount)}
                            </p>
                          </div>
                          <div>
                            <span className="text-xs text-gray-500 font-medium">Currency</span>
                            <p className="text-sm text-gray-700">{invoice.currency}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center py-4 border-t border-gray-200">
                    <p className="text-sm text-muted-foreground">
                      Didn't find an invoice? Upload an invoice PDF to{' '}
                      <span className="text-primary cursor-pointer hover:underline font-medium">
                        create a new RTP record
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: Association Action Buttons (Discard + Associate)</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <div className="border rounded-lg p-6 bg-white">
                  <div className="border-t border-border pt-6 flex justify-between items-center">
                    <Button className="bg-[#DF1C41] hover:bg-[#C41838] text-white">
                      Discard Record
                    </Button>
                    <Button
                      disabled={!selectedInvoiceId}
                      className="bg-primary hover:bg-primary/90 disabled:opacity-50"
                    >
                      Associate Invoice
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
