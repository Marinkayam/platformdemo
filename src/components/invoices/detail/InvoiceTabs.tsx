
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, FileX, Database, Activity } from "lucide-react";

interface InvoiceTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function InvoiceTabsNav({ activeTab, onTabChange }: InvoiceTabsProps) {
  return (
    <Tabs defaultValue={activeTab} className="w-full" onValueChange={onTabChange}>
      <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 mb-6">
        <TabsTrigger 
          value="invoice-data" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          <FileText className="mr-2 h-4 w-4" />
          Invoice Data
        </TabsTrigger>
        <TabsTrigger 
          value="exceptions" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          <FileX className="mr-2 h-4 w-4" />
          Exceptions
        </TabsTrigger>
        <TabsTrigger 
          value="rtp-data" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          <Database className="mr-2 h-4 w-4" />
          RTP Data
        </TabsTrigger>
        <TabsTrigger 
          value="portal-records" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          <Database className="mr-2 h-4 w-4" />
          Portal Records
        </TabsTrigger>
        <TabsTrigger 
          value="activity" 
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
        >
          <Activity className="mr-2 h-4 w-4" />
          Activity
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
