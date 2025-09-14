
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronDown, Upload, Download, FileText, FileSpreadsheet } from 'lucide-react';

export function BulkPortalUsersSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'manual' | 'csv'>('manual');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  const handleCSVDownload = () => {
    const csvContent = 'Portal,Username,Password,Portal URL\nCoupa,user@company.com,password123,\nSAP Ariba,user2@company.com,password456,https://custom.ariba.com';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portal-users-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="hover:bg-grey-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <CardTitle className="text-lg flex items-center gap-2">
                  📥 Bulk Add Portal Users
                </CardTitle>
                <CardDescription>
                  Upload a CSV with multiple users to onboard faster
                </CardDescription>
              </div>
              <ChevronDown className={`h-5 w-5 text-grey-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-6">
            <div className="flex gap-2 p-1 bg-grey-300 rounded-lg">
              <Button
                variant={uploadMethod === 'manual' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setUploadMethod('manual')}
                className="flex-1"
              >
                <FileText className="h-4 w-4 mr-2" />
                Fill Manually
              </Button>
              <Button
                variant={uploadMethod === 'csv' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setUploadMethod('csv')}
                className="flex-1"
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Upload CSV File
              </Button>
            </div>

            {uploadMethod === 'manual' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-grey-800">Portal</Label>
                    <Input placeholder="Select portal" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-grey-800">Username</Label>
                    <Input placeholder="e.g. jdoe@company.com" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-grey-800">Password</Label>
                    <Input type="password" placeholder="Enter password" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-grey-800">Portal URL (optional)</Label>
                    <Input placeholder="Optional – custom login URL" />
                  </div>
                </div>
                <Button className="w-full">Add Portal User</Button>
              </div>
            )}

            {uploadMethod === 'csv' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCSVDownload}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download Template
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Includes fields: Portal, Username, Password, Portal URL</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="csv-upload">Upload CSV File</Label>
                  <div className="border-2 border-dashed border-grey-300 rounded-lg p-6 text-center hover:border-primary-main transition-colors">
                    <input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-grey-400 mx-auto mb-2" />
                      <p className="text-sm text-grey-600">
                        {selectedFiles.length > 0 
                          ? `${selectedFiles[0].name} selected` 
                          : 'Click to upload or drag and drop CSV file'
                        }
                      </p>
                      <p className="text-xs text-grey-500 mt-1">CSV format only, up to 50MB</p>
                    </label>
                  </div>
                </div>

                <div className="text-xs text-grey-500 space-y-1">
                  <p>Required CSV columns: Portal, Username, Password, Portal URL (optional)</p>
                  <p>Each row should include a portal, username, password, and optional login URL.</p>
                </div>

                <Button className="w-full" disabled={selectedFiles.length === 0}>
                  Upload Portal Users
                </Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
