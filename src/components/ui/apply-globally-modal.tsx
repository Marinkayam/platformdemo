
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, FileText, MapPin } from "lucide-react";
import { Typography } from "@/components/ui/typography/typography";

interface ComponentUsage {
  page: string;
  route: string;
  instances: number;
  components: string[];
}

interface ApplyGloballyModalProps {
  componentType: string;
  children: React.ReactNode;
  usageData: ComponentUsage[];
  onApply: (selectedPages: string[]) => void;
}

export function ApplyGloballyModal({ 
  componentType, 
  children, 
  usageData = [], // Provide default empty array
  onApply 
}: ApplyGloballyModalProps) {
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handlePageToggle = (pageRoute: string) => {
    setSelectedPages(prev => 
      prev.includes(pageRoute) 
        ? prev.filter(p => p !== pageRoute)
        : [...prev, pageRoute]
    );
  };

  const handleSelectAll = () => {
    if (selectedPages.length === usageData.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(usageData.map(usage => usage.route));
    }
  };

  const handleApply = () => {
    onApply(selectedPages);
    setIsOpen(false);
    setSelectedPages([]);
  };

  // Add safety check for usageData before using reduce
  const totalInstances = usageData?.reduce((sum, usage) => sum + usage.instances, 0) || 0;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary-main" />
            Apply {componentType} Changes Globally
          </DialogTitle>
          <DialogDescription>
            Review where {componentType.toLowerCase()} components are used and select which pages to update.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-info-lighter border border-info-light rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-info-main" />
              <Typography variant="subtitle2" className="text-info-main">Usage Summary</Typography>
            </div>
            <Typography variant="body2" className="text-info-dark">
              Found <strong>{totalInstances}</strong> {componentType.toLowerCase()} instances across <strong>{usageData.length}</strong> pages
            </Typography>
          </div>

          {/* Warning */}
          <div className="bg-warning-lighter border border-warning-light rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-warning-main" />
              <Typography variant="subtitle2" className="text-warning-contrast-text">Important</Typography>
            </div>
            <Typography variant="body2" className="text-warning-contrast-text">
              This action will update all selected components immediately. Review your changes carefully.
            </Typography>
          </div>

          {/* Page Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Typography variant="h6">Select Pages to Update</Typography>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSelectAll}
              >
                {selectedPages.length === usageData.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>

            <ScrollArea className="h-64 border border-grey-300 rounded-lg p-4">
              <div className="space-y-3">
                {usageData.map((usage, index) => (
                  <div key={usage.route}>
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`page-${index}`}
                        checked={selectedPages.includes(usage.route)}
                        onCheckedChange={() => handlePageToggle(usage.route)}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <Typography variant="subtitle1" className="text-grey-800">
                            {usage.page}
                          </Typography>
                          <Badge variant="outline" className="text-xs">
                            {usage.instances} instance{usage.instances !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                        <Typography variant="body2" className="text-grey-600 font-mono text-xs">
                          {usage.route}
                        </Typography>
                        <div className="flex flex-wrap gap-1">
                          {usage.components.map((component, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {component}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < usageData.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleApply}
              disabled={selectedPages.length === 0}
              className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text"
            >
              Apply Changes to {selectedPages.length} Page{selectedPages.length !== 1 ? 's' : ''}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
