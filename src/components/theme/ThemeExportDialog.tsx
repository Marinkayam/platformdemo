import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { downloadTheme, copyThemeToClipboard, exportThemeAsCSS, exportThemeAsTailwind, exportThemeAsJSON } from "@/lib/theme-export";
import { Copy, Download, Check, FileCode, FileJson, Palette } from "lucide-react";
import { toast } from "sonner";

interface ThemeExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ThemeExportDialog({ open, onOpenChange }: ThemeExportDialogProps) {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'css' | 'tailwind' | 'json'>('css');

  const handleCopy = async (format: 'css' | 'tailwind' | 'json') => {
    const success = await copyThemeToClipboard(format);
    if (success) {
      setCopiedFormat(format);
      toast.success(`${format.toUpperCase()} copied to clipboard!`);
      setTimeout(() => setCopiedFormat(null), 2000);
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDownload = (format: 'css' | 'tailwind' | 'json') => {
    downloadTheme(format);
    toast.success(`Theme downloaded as ${format.toUpperCase()}`);
  };

  const getThemeContent = () => {
    switch (activeTab) {
      case 'css':
        return exportThemeAsCSS();
      case 'tailwind':
        return exportThemeAsTailwind();
      case 'json':
        return exportThemeAsJSON();
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-primary" />
            Export Monto Theme
          </DialogTitle>
          <DialogDescription>
            Export the Monto Design System theme in various formats for use in Lovable Theme Maker or other tools.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col min-h-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="css" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              CSS Variables
            </TabsTrigger>
            <TabsTrigger value="tailwind" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              Tailwind Config
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center gap-2">
              <FileJson className="h-4 w-4" />
              JSON Tokens
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0 mt-4">
            <TabsContent value="css" className="h-full mt-0">
              <div className="relative h-full">
                <pre className="bg-muted p-4 rounded-lg overflow-auto h-full text-sm font-mono">
                  <code>{getThemeContent()}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="tailwind" className="h-full mt-0">
              <div className="relative h-full">
                <pre className="bg-muted p-4 rounded-lg overflow-auto h-full text-sm font-mono">
                  <code>{getThemeContent()}</code>
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="json" className="h-full mt-0">
              <div className="relative h-full">
                <pre className="bg-muted p-4 rounded-lg overflow-auto h-full text-sm font-mono">
                  <code>{getThemeContent()}</code>
                </pre>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => handleCopy(activeTab)}
            className="gap-2"
          >
            {copiedFormat === activeTab ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy to Clipboard
              </>
            )}
          </Button>
          <Button
            onClick={() => handleDownload(activeTab)}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
