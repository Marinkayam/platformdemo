
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccessToast, showErrorToast, showWarningToast, showInfoToast } from "@/lib/toast-helpers";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Check, Info, X } from "lucide-react";

export default function DesignSystemPlayground() {
  const [switchChecked, setSwitchChecked] = useState(false);

  const testToasts = () => {
    showSuccessToast("Operation successful", "Your changes have been saved successfully");
    setTimeout(() => {
      showErrorToast("Error occurred", "Something went wrong with the operation");
    }, 1000);
    setTimeout(() => {
      showWarningToast("Warning message", "Please check your input before proceeding");
    }, 2000);
    setTimeout(() => {
      showInfoToast("Information", "Here's some helpful information for you");
    }, 3000);
  };

  return (
    <div className="container mx-auto p-8 space-y-12 bg-background-default min-h-screen">
      <div className="bg-background-paper rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-secondary-main font-sans">Monto Design System</h1>
        <p className="text-grey-600 mb-8">Comprehensive design system components using Monto design tokens</p>
        
        {/* Colors Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Color Palette</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-grey-700">Primary</h3>
              <div className="space-y-2">
                <div className="h-12 bg-primary-main rounded flex items-center justify-center text-white text-xs font-medium">#7B59FF</div>
                <div className="h-8 bg-primary-light rounded flex items-center justify-center text-grey-900 text-xs">#BEADFF</div>
                <div className="h-8 bg-primary-dark rounded flex items-center justify-center text-white text-xs">#523BAA</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-grey-700">Secondary</h3>
              <div className="space-y-2">
                <div className="h-12 bg-secondary-main rounded flex items-center justify-center text-white text-xs font-medium">#1D153B</div>
                <div className="h-8 bg-secondary-light rounded flex items-center justify-center text-white text-xs">#6F768B</div>
                <div className="h-8 bg-secondary-dark rounded flex items-center justify-center text-white text-xs">#181231</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-grey-700">Status</h3>
              <div className="space-y-2">
                <div className="h-8 bg-success-main rounded flex items-center justify-center text-white text-xs">#007737</div>
                <div className="h-8 bg-warning-main rounded flex items-center justify-center text-grey-900 text-xs">#F2AE40</div>
                <div className="h-8 bg-error-main rounded flex items-center justify-center text-white text-xs">#DF1C41</div>
                <div className="h-8 bg-info-main rounded flex items-center justify-center text-white text-xs">#375DFB</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-grey-700">Greys</h3>
              <div className="space-y-2">
                <div className="h-8 bg-grey-900 rounded flex items-center justify-center text-white text-xs">#061237</div>
                <div className="h-8 bg-grey-600 rounded flex items-center justify-center text-white text-xs">#818799</div>
                <div className="h-8 bg-grey-400 rounded flex items-center justify-center text-grey-900 text-xs">#E6E7EB</div>
                <div className="h-8 bg-grey-200 rounded flex items-center justify-center text-grey-900 text-xs">#F4F6F8</div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Toast Notifications Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Toast Notifications</h2>
          <p className="text-grey-600">Solid color toasts using Monto design tokens with proper contrast</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-success-main">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-success-main" />
                  <span className="text-sm font-medium text-success-main">Success</span>
                </div>
                <p className="text-xs text-grey-600 mt-1">Green background, white text</p>
              </CardContent>
            </Card>
            
            <Card className="border-error-main">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <X className="h-4 w-4 text-error-main" />
                  <span className="text-sm font-medium text-error-main">Error</span>
                </div>
                <p className="text-xs text-grey-600 mt-1">Red background, white text</p>
              </CardContent>
            </Card>
            
            <Card className="border-warning-main">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-warning-main" />
                  <span className="text-sm font-medium text-warning-main">Warning</span>
                </div>
                <p className="text-xs text-grey-600 mt-1">Yellow background, dark text</p>
              </CardContent>
            </Card>
            
            <Card className="border-info-main">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-info-main" />
                  <span className="text-sm font-medium text-info-main">Info</span>
                </div>
                <p className="text-xs text-grey-600 mt-1">Blue background, white text</p>
              </CardContent>
            </Card>
          </div>
          
          <Button onClick={testToasts} className="bg-primary-main hover:bg-primary-dark text-white">
            Test All Toasts
          </Button>
        </section>

        <Separator className="my-8" />

        {/* Buttons Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-primary-main hover:bg-primary-dark text-white">Primary</Button>
            <Button variant="outline" className="border-primary-main text-primary-main hover:bg-primary-main hover:text-white">Outline</Button>
            <Button variant="secondary" className="bg-grey-200 text-grey-800 hover:bg-grey-300">Secondary</Button>
            <Button variant="destructive" className="bg-error-main hover:bg-error-main/90 text-white">Destructive</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Toggle Switch Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Toggle Switch</h2>
          <p className="text-grey-600">Enhanced switch with Monto styling and smooth animations</p>
          <div className="flex items-center space-x-3">
            <Switch 
              checked={switchChecked}
              onCheckedChange={setSwitchChecked}
            />
            <span className="text-grey-700 font-sans">
              {switchChecked ? "Enabled" : "Disabled"}
            </span>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Badges Section */}
        <section className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-primary-main text-white">Primary</Badge>
            <Badge className="bg-success-main text-white">Success</Badge>
            <Badge className="bg-warning-main text-grey-900">Warning</Badge>
            <Badge className="bg-error-main text-white">Error</Badge>
            <Badge className="bg-info-main text-white">Info</Badge>
            <Badge variant="outline" className="border-grey-400 text-grey-700">Outline</Badge>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Form Elements Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-grey-800 font-sans">Form Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="sample-input" className="text-grey-700 font-sans">Sample Input</Label>
              <Input 
                id="sample-input" 
                placeholder="Enter text here..." 
                className="border-grey-400 focus:border-primary-main focus:ring-primary-main"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled-input" className="text-grey-700 font-sans">Disabled Input</Label>
              <Input 
                id="disabled-input" 
                placeholder="Disabled input" 
                disabled
                className="border-grey-400"
              />
            </div>
          </div>
        </section>
      </div>
      
      <Toaster />
    </div>
  );
}
