
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, FileSpreadsheet } from 'lucide-react';

export function InvoiceUploadTabs() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">Upload Invoice Data</CardTitle>
        <CardDescription>
          Upload invoices manually or in bulk to get started faster
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Manual Upload
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Bulk CSV Upload
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="manual-upload">Upload Invoice Files</Label>
              <div className="border-2 border-dashed border-grey-300 rounded-lg p-6 text-center hover:border-primary-main transition-colors">
                <input
                  id="manual-upload"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label htmlFor="manual-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 text-grey-400 mx-auto mb-2" />
                  <p className="text-sm text-grey-600">
                    {selectedFiles.length > 0 
                      ? `${selectedFiles.length} files selected` 
                      : 'Click to upload or drag and drop invoice files'
                    }
                  </p>
                  <p className="text-xs text-grey-500 mt-1">PDF, JPG, PNG up to 10MB each</p>
                </label>
              </div>
            </div>
            <Button className="w-full" disabled={selectedFiles.length === 0}>
              Upload {selectedFiles.length > 0 ? `${selectedFiles.length} ` : ''}Invoice{selectedFiles.length !== 1 ? 's' : ''}
            </Button>
          </TabsContent>
          
          <TabsContent value="bulk" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="csv-upload">Upload CSV File</Label>
              <div className="border-2 border-dashed border-grey-300 rounded-lg p-6 text-center hover:border-primary-main transition-colors">
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  className="hidden"
                />
                <label htmlFor="csv-upload" className="cursor-pointer">
                  <FileSpreadsheet className="h-8 w-8 text-grey-400 mx-auto mb-2" />
                  <p className="text-sm text-grey-600">
                    Click to upload CSV file with invoice data
                  </p>
                  <p className="text-xs text-grey-500 mt-1">CSV format only, up to 50MB</p>
                </label>
              </div>
            </div>
            <div className="text-xs text-grey-500 space-y-1">
              <p>Required CSV columns: Invoice Number, Vendor, Amount, Date</p>
              <Button variant="link" className="h-auto p-0 text-xs">
                Download sample CSV template
              </Button>
            </div>
            <Button className="w-full">
              Upload CSV Data
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
