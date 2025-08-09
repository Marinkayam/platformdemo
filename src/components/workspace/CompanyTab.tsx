
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DesignFilterDropdown } from "@/components/ui/design-filter-dropdown";
import { CloudUpload, Loader2, Copy } from "lucide-react";
import { showSuccessToast } from "@/lib/toast-helpers";
import { toast } from "sonner";
import { useCompany } from "@/context/CompanyContext";

export function CompanyTab() {
  const { companyInfo, updateLogo, updateCompanyInfo } = useCompany();
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateLogo(e.target?.result as string);
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

  const copyPortalUrl = () => {
    navigator.clipboard.writeText("montotechnologies.monto.com");
    toast.success("Copied to clipboard");
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
                {companyInfo.logoUrl ? (
                  <img 
                    src={companyInfo.logoUrl} 
                    alt="Company logo" 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <CloudUpload size={24} strokeWidth={0.75} className="text-primary mb-1" />
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
            <Input 
              className="h-12 bg-gray-100 text-base font-normal" 
              value={companyInfo.name || "Monto LTD"} 
              disabled
            />
          </div>
          <div>
            <label className="block text-[15px] mb-2 font-medium text-gray-800">Timezone</label>
            <DesignFilterDropdown
              label="Select"
              value={companyInfo.timezone && companyInfo.timezone !== '' ? companyInfo.timezone : "🇺🇸 UTC-8 (GMT-8) Pacific Standard Time"}
              options={[
                "🇺🇸 UTC-12 (GMT-12) Baker Island",
                "🇺🇸 UTC-11 (GMT-11) Hawaii",
                "🇺🇸 UTC-10 (GMT-10) Alaska",
                "🇺🇸 UTC-9 (GMT-9) Alaska",
                "🇺🇸 UTC-8 (GMT-8) Pacific Standard Time",
                "🇺🇸 UTC-7 (GMT-7) Mountain Standard Time",
                "🇺🇸 UTC-6 (GMT-6) Central Standard Time",
                "🇺🇸 UTC-5 (GMT-5) Eastern Standard Time",
                "🇻🇪 UTC-4 (GMT-4) Atlantic Standard Time",
                "🇧🇷 UTC-3 (GMT-3) Argentina Time",
                "🇧🇷 UTC-2 (GMT-2) South Georgia",
                "🇨🇻 UTC-1 (GMT-1) Azores Time",
                "🇬🇧 UTC+0 (GMT+0) Greenwich Mean Time",
                "🇩🇪 UTC+1 (GMT+1) Central European Time",
                "🇪🇪 UTC+2 (GMT+2) Eastern European Time",
                "🇷🇺 UTC+3 (GMT+3) Moscow Time",
                "🇦🇪 UTC+4 (GMT+4) Gulf Standard Time",
                "🇵🇰 UTC+5 (GMT+5) Pakistan Standard Time",
                "🇧🇩 UTC+6 (GMT+6) Bangladesh Standard Time",
                "🇹🇭 UTC+7 (GMT+7) Indochina Time",
                "🇨🇳 UTC+8 (GMT+8) China Standard Time",
                "🇯🇵 UTC+9 (GMT+9) Japan Standard Time",
                "🇦🇺 UTC+10 (GMT+10) Australian Eastern Time",
                "🇸🇧 UTC+11 (GMT+11) Solomon Islands Time",
                "🇳🇿 UTC+12 (GMT+12) New Zealand Standard Time"
              ]}
              onSelect={(val) => {
                if (typeof val === "string") {
                  updateCompanyInfo({ timezone: val });
                }
              }}
              searchable
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-2">
              Used for syncing timestamps from your portals and documents.
            </p>
          </div>
          
          <div style={{ backgroundColor: '#EFEBFF' }} className="p-4 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              <span className="font-medium">Your company portal will be accessible at:</span><br />
              <div className="flex items-center gap-2 mt-1">
                <a 
                  href="https://montotechnologies.monto.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-purple-900 hover:text-purple-700 hover:underline transition-colors"
                >
                  montotechnologies.monto.com
                </a>
                <button
                  onClick={copyPortalUrl}
                  className="flex items-center justify-center w-6 h-6 rounded hover:bg-purple-200 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy size={14} className="text-purple-700" />
                </button>
              </div>
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
                  <Loader2 size={16} strokeWidth={0.75} className="mr-2 animate-spin" />
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
