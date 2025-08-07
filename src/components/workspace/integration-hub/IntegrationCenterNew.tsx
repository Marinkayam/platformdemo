import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Upload, Download, Check, FileText, Mail, Zap, Clock, CheckCircle, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function IntegrationCenterNew() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{
    name: string;
    size: string;
    status: 'success' | 'fail' | 'processing';
  }>>([]);
  const { toast } = useToast();

  const emailIntegrations = [
    { type: "Invoices", email: "invoices@montoinvoice.com" },
    { type: "Reports", email: "reports@montoinvoice.com" }
  ];

  const activeIntegrations = [
    { type: "Email", system: "Invoice Processing", status: "Connected", description: "Auto-sync invoice PDFs" },
    { type: "ERP", system: "SAP Integration", status: "Syncing", description: "Real-time payment data" },
    { type: "API", system: "Slack Notifications", status: "Coming Soon", description: "Team updates & alerts" },
    { type: "Portal", system: "Ariba Connector", status: "Connected", description: "Purchase order sync" },
    { type: "Database", system: "Payment Gateway", status: "Syncing", description: "Transaction monitoring" }
  ];

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
      toast({
        title: "Email copied",
        description: "The email address has been copied to your clipboard.",
      });
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newFile = {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          status: 'processing' as const
        };
        setUploadedFiles(prev => [...prev, newFile]);
        
        // Simulate processing
        setTimeout(() => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.name === newFile.name 
                ? { ...f, status: Math.random() > 0.2 ? 'success' : 'fail' }
                : f
            )
          );
        }, 2000);
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Connected":
        return (
          <span 
            className="inline-flex items-center px-4 py-1.5 rounded-full font-medium"
            style={{ color: '#007737', backgroundColor: '#E6F4EA', fontSize: '12px' }}
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Connected
          </span>
        );
      case "Syncing":
        return (
          <span 
            className="inline-flex items-center px-4 py-1.5 rounded-full font-medium"
            style={{ color: '#1750FB', backgroundColor: '#E3F2FD', fontSize: '12px' }}
          >
            <Clock className="w-3 h-3 mr-1" />
            Syncing
          </span>
        );
      case "Coming Soon":
        return (
          <span 
            className="inline-flex items-center px-4 py-1.5 rounded-full font-medium"
            style={{ color: '#9CA3AF', backgroundColor: '#F3F4F6', fontSize: '12px' }}
          >
            <Lock className="w-3 h-3 mr-1" />
            Coming Soon
          </span>
        );
      default:
        return (
          <span 
            className="inline-flex items-center px-4 py-1.5 rounded-full font-medium"
            style={{ color: '#9CA3AF', backgroundColor: '#F3F4F6', fontSize: '12px' }}
          >
            {status}
          </span>
        );
    }
  };

  const getFileStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'fail':
        return <span className="text-red-600 text-lg">❌</span>;
      case 'processing':
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Integration Center</h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Seamlessly manage all your company's data connections — from email-based automations to real-time integrations.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Email Integration */}
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Email Integration
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Send key documents to dedicated addresses for automatic syncing.
              </p>
            </CardHeader>
            <CardContent className="px-6 py-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailIntegrations.map((integration) => (
                    <TableRow key={integration.type} className="bg-muted/50">
                      <TableCell className="font-medium">{integration.type}</TableCell>
                      <TableCell className="font-mono text-sm">{integration.email}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyEmail(integration.email)}
                          className="h-8 w-8 p-0"
                        >
                          {copiedEmail === integration.email ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Use these addresses to auto-sync invoice PDFs, payment confirmations, and ERP reports.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Upload ERP Report */}
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload ERP Report
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Quickly bring in your historical payment data.
              </p>
            </CardHeader>
            <CardContent className="px-6 py-4 space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">Drop your files here or click to browse</p>
                <p className="text-xs text-gray-500 mb-4">✅ Supported formats: CSV, XLSX, PDF</p>
                <input
                  type="file"
                  multiple
                  accept=".csv,.xlsx,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download Template
                  </Button>
                  <Button size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
                    <Upload className="w-4 h-4 mr-1" />
                    Upload Report
                  </Button>
                </div>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Uploaded Files</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded border">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <span className="text-sm flex-1">{file.name}</span>
                      <span className="text-xs text-gray-500">{file.size}</span>
                      {getFileStatusIcon(file.status)}
                    </div>
                  ))}
                </div>
              )}

              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800">
                  📝 Uploaded data will generate insights and help auto-create Smart RTPs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Active Integrations */}
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Active Integrations
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage all synced or pending ERP/email integrations.
              </p>
            </CardHeader>
            <CardContent className="px-6 py-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>System</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeIntegrations.slice(0, 5).map((integration, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{integration.type}</TableCell>
                      <TableCell>{integration.system}</TableCell>
                      <TableCell>{getStatusBadge(integration.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{integration.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="px-6 py-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-green-600">✅</span>
                  <span className="text-sm">Auto-match payments with invoices</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-blue-600">⚡</span>
                  <span className="text-sm">Trigger Smart RTPs from ERP data</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-gray-600">🔔</span>
                  <span className="text-sm">Enable Slack notifications (coming soon)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}