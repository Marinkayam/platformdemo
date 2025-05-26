
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-lg text-blue-900">
          Create Dedicated User in {portalName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
              1
            </div>
            <p className="text-sm text-gray-700">
              Log in to your {portalName} portal with admin privileges
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
              2
            </div>
            <p className="text-sm text-gray-700">
              Navigate to <code className="bg-gray-100 px-1 rounded">User Management</code> or <code className="bg-gray-100 px-1 rounded">Administration</code>
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div className="space-y-2 flex-1">
              <p className="text-sm text-gray-700">
                Create a new user with this username:
              </p>
              <div className="flex items-center space-x-2 bg-white border rounded-lg p-3">
                <code className="flex-1 text-sm font-mono">{generatedUsername}</code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyUsername}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
              4
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-700">
                Grant the following permissions:
              </p>
              <ul className="space-y-1 ml-4">
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Submit invoices</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>View invoice status</span>
                </li>
                <li className="flex items-center space-x-2 text-sm text-gray-700">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Access portal API (if available)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
