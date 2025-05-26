
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InstructionalCardProps {
  portalName: string;
}

export function InstructionalCard({ portalName }: InstructionalCardProps) {
  const { toast } = useToast();
  
  const generatedUsername = `montouser-${portalName.toLowerCase().replace(/\s+/g, "")}@montopay.com`;
  
  const handleCopyUsername = () => {
    navigator.clipboard.writeText(generatedUsername);
    toast({
      title: "Copied!",
      description: "Username copied to clipboard",
    });
  };

  return (
    <Card className="bg-[#7B59FF]/5 border-[#7B59FF]/20">
      <CardHeader>
        <CardTitle className="text-xl text-[#7B59FF] font-semibold">
          Instructions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="bg-[#7B59FF] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">
              1
            </div>
            <p className="text-[#38415F] pt-1">
              Log into your {portalName} portal
            </p>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-[#7B59FF] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">
              2
            </div>
            <p className="text-[#38415F] pt-1">
              Navigate to: <span className="font-semibold">Settings → Users → Add New User</span>
            </p>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-[#7B59FF] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">
              3
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-[#38415F] pt-1">
                Use:
              </p>
              <div>
                <Label className="block text-sm font-semibold text-[#38415F] mb-2">
                  Monto Username:
                </Label>
                <div className="flex items-center space-x-3 bg-white border-2 border-[#7B59FF]/20 rounded-lg p-4">
                  <code className="flex-1 text-sm font-mono text-[#7B59FF] font-semibold">{generatedUsername}</code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCopyUsername}
                    className="h-8 w-8 p-0 border-[#7B59FF] text-[#7B59FF] hover:bg-[#7B59FF] hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-[#7B59FF] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">
              4
            </div>
            <div className="space-y-3 flex-1">
              <p className="text-[#38415F] pt-1">
                Grant Permissions:
              </p>
              <ul className="space-y-2 ml-2">
                <li className="flex items-center space-x-3 text-[#38415F]">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="font-medium">✅ Full access to invoice submission</span>
                </li>
                <li className="flex items-center space-x-3 text-[#38415F]">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="font-medium">✅ Full access to portal management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
