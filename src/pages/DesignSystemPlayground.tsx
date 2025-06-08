import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DesignTabs } from "@/components/ui/design-tabs";
import { ApplyGloballyModal } from "@/components/ui/apply-globally-modal";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  ArrowRight, 
  Check, 
  X, 
  AlertTriangle, 
  Info, 
  Plus, 
  Settings, 
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react';
import { MontoLogo } from "@/components/MontoLogo";
import MontoIcon from "@/components/MontoIcon";
import { componentUsageData } from "@/data/componentUsage";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "buttons", label: "Buttons" },
  { id: "badges", label: "Badges" },
  { id: "tabs", label: "Tabs" },
  { id: "alerts", label: "Alerts" },
  { id: "modals", label: "Modals" },
  { id: "sheets", label: "Sheets" },
  { id: "tables", label: "Tables" },
  { id: "cards", label: "Cards" },
  { id: "progress", label: "Progress" },
  { id: "icons", label: "Icons" },
];

export default function DesignSystemPlayground() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [selectedSpacing, setSelectedSpacing] = useState('4');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleApplyGlobally = (selectedPages: string[]) => {
    console.log('Applying changes to pages:', selectedPages);
    // Here you would implement the actual application logic
  };

  return (
    <div className="min-h-screen bg-common-white p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-grey-900">Design System Playground</h1>
          <p className="text-grey-600">Explore and test the available UI components</p>
        </div>
        <ApplyGloballyModal
          componentType="Design System Components"
          usageData={componentUsageData.buttons}
          onApply={handleApplyGlobally}
        >
          <Button onClick={() => {}}>Apply Globally</Button>
        </ApplyGloballyModal>
      </div>

      <div className="max-w-7xl mx-auto">
        <DesignTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === "buttons" && (
          <section className="py-6">
            <h2 className="text-xl font-semibold mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Settings /></Button>
            </div>
          </section>
        )}

        {activeTab === "badges" && (
          <section className="py-6">
            <h2 className="text-xl font-semibold mb-4">Badges</h2>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge className="bg-green-500 text-white">Custom</Badge>
            </div>
          </section>
        )}

        {activeTab === "tabs" && (
          <section className="py-6">
            <h2 className="text-xl font-semibold mb-4">Tabs</h2>
            <Tabs defaultValue="account" className="w-[400px]">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Make changes to your account here.</TabsContent>
              <TabsContent value="billing">Update your billing details here.</TabsContent>
              <TabsContent value="settings">Manage your account settings.</TabsContent>
            </Tabs>
          </section>
        )}

        {activeTab === "alerts" && (
          <section className="py-6">
            <h2 className="text-xl font-semibold mb-4">Alerts</h2>
            <AlertDialog>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </section>
        )}

        {activeTab === "modals" && (
          <section className="py-6">
            <h2 className="text-xl font-semibold mb-4">Modals</h2>
            <Dialog>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Name
                    </label>
                    <input type="text" id="name" placeholder="Name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="username" className="text-right">
                      Username
                    </label>
                    <input type="text" id="username" placeholder="Username" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        )}

        {activeTab === "sheets" && (
          <section className="py-6">
            <h2 className="text-xl font-semibold mb-4">Sheets</h2>
            <Sheet>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when you're done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="name" className="text-right">
                      Name
                    </label>
                    <input type="text" id="name" placeholder="Name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <label htmlFor="username" className="text-right">
                      Username
                    </label>
                    <input type="text" id="username" placeholder="Username" className="col-span-3" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </section>
        )}

        {activeTab === "tables" && (
          <section className="py-6">
            <h2 className="text-xl font-semibold mb-4">Tables</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV002</TableCell>
                    <TableCell>Pending</TableCell>
                    <TableCell>PayPal</TableCell>
                    <TableCell className="text-right">$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV003</TableCell>
                    <TableCell>Unpaid</TableCell>
                    <TableCell>Bank Transfer</TableCell>
                    <TableCell className="text-right">$300.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>
        )}

        {activeTab === "cards" && (
          <section className="py-6">
            <h2 className="text-xl font-semibold mb-4">Cards</h2>
            <Card className="w-[400px]">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card Content</p>
              </CardContent>
            </Card>
          </section>
        )}

        {activeTab === "progress" && (
          <section className="py-6">
            <h2 className="text-xl font-semibold mb-4">Progress</h2>
            <div>
              <Progress value={50} />
            </div>
          </section>
        )}

        {activeTab === "icons" && (
          <section className="py-6">
            <h2 className="text-xl font-semibold mb-4">Icons</h2>
            <div className="flex flex-wrap gap-4">
              <Download />
              <ArrowRight />
              <Check />
              <X />
              <AlertTriangle />
              <Info />
              <Plus />
              <Settings />
              <Search />
              <Filter />
              <MoreHorizontal />
              <Edit />
              <Trash2 />
              <MontoLogo className="h-6 w-auto" />
              <MontoIcon className="h-6 w-auto" />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
