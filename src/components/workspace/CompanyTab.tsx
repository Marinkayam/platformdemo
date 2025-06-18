
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CloudUpload, Loader2 } from "lucide-react";
import { showSuccessToast } from "@/lib/toast-helpers";

export function CompanyTab() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    showSuccessToast("Settings saved successfully", "Your company information has been updated.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h6 className="text-lg font-semibold text-gray-900 mb-1">Company Information</h6>
        <p className="text-base text-gray-600">
          Manage your company details and preferences.
        </p>
      </div>
      <Card className="shadow-none border border-[#ececec] rounded-xl">
        <CardContent className="p-10 space-y-7">
          <div className="flex items-start gap-5">
            <div className="flex flex-col items-center">
              <div 
                className="relative w-28 h-28 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden mb-2"
                onClick={triggerFileUpload}
              >
                {logoUrl ? (
                  <img 
                    src={logoUrl} 
                    alt="Company logo" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <CloudUpload size={24} className="text-primary mb-1" />
                    <span className="text-xs text-gray-500 text-center px-2">Click to upload logo</span>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
            </div>
            <div className="flex-1 flex items-center">
              {/* Empty space reserved */}
            </div>
          </div>
          <div>
            <label className="block text-[15px] mb-2 font-medium text-gray-800">Company Name</label>
            <Input className="h-12 bg-gray-100 text-base font-normal" value="Monto Technologies" disabled />
          </div>
          <div>
            <label className="block text-[15px] mb-2 font-medium text-gray-800">Timezone</label>
            <Select defaultValue="utc-8">
              <SelectTrigger className="h-12 bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc-8">🇺🇸 UTC-8 (Pacific Standard Time)</SelectItem>
                <SelectItem value="utc-5">🇺🇸 UTC-5 (Eastern Standard Time)</SelectItem>
                <SelectItem value="utc+0">🇬🇧 UTC+0 (Greenwich Mean Time)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-2">
              Used for syncing timestamps from your portals and documents.
            </p>
          </div>
          
          <div className="bg-[#EFEBFF] p-4 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              <span className="font-medium">Your company portal will be accessible at:</span><br />
              <span className="font-mono text-purple-900">montotechnologies.monto.com</span>
            </p>
          </div>

          <div className="text-right pt-2">
            <Button 
              size="lg"
              onClick={handleSaveChanges}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
