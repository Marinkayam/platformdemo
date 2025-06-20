import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Check, X, ChevronDown, Info, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AddPortalUserModal } from "@/components/payments-relationships/portal-users/AddPortalUserModal";
import { PortalUser } from "@/types/portalUser";

export default function DesignSystemPlayground() {
  const [date, setDate] = useState<Date>();
  const [isAlertDialogOpen, setAlertDialogOpen] = useState(false);
  const [isDialogModalOpen, setDialogModalOpen] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isAddPortalUserModalOpen, setIsAddPortalUserModalOpen] = useState(false);

  const handleAddModalSubmit = (userData: Partial<PortalUser>) => {
    console.log('Portal user data:', userData);
    setIsAddPortalUserModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Design System Playground</h1>
        <p className="text-muted-foreground">
          A comprehensive showcase of all available UI components and their variants.
        </p>
      </div>

      <Tabs defaultValue="buttons" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Buttons</h2>
            <p className="text-muted-foreground mb-6">
              A collection of button styles for various actions and states.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button disabled>Disabled</Button>
            <Button variant="outline">Outline</Button>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Forms</h2>
            <p className="text-muted-foreground mb-6">
              A variety of form elements for user input and data collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Enter your password" />
            </div>
            <div>
              <Label htmlFor="textarea">Textarea</Label>
              <Textarea id="textarea" placeholder="Enter your message" />
            </div>
            <div>
              <Label>
                <Switch id="terms" />
                <span className="ml-2">I agree to the terms and conditions</span>
              </Label>
            </div>
            <div>
              <Label>
                <Checkbox id="subscribe" />
                <span className="ml-2">Subscribe to newsletter</span>
              </Label>
            </div>
            <div>
              <Label>
                Radio Group
                <RadioGroup defaultValue="option1" className="flex flex-col space-y-1">
                  <RadioGroupItem value="option1" id="option1" />
                  <Label htmlFor="option1">Option 1</Label>
                  <RadioGroupItem value="option2" id="option2" />
                  <Label htmlFor="option2">Option 2</Label>
                </RadioGroup>
              </Label>
            </div>
            <div>
              <Label htmlFor="select">Select</Label>
              <Select>
                <SelectTrigger id="select">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
            <p className="text-muted-foreground mb-6">
              Components for providing feedback and alerts to the user.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
                <CardDescription>A basic card component.</CardDescription>
              </CardHeader>
              <CardContent>
                This is the content of the card.
              </CardContent>
            </Card>

            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>

            <div>
              <AlertDialog open={isAlertDialogOpen} onOpenChange={setAlertDialogOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Show Alert</Button>
                </AlertDialogTrigger>
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
            </div>

            <div>
              <Dialog open={isDialogModalOpen} onOpenChange={setDialogModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Layout</h2>
            <p className="text-muted-foreground mb-6">
              Components for structuring and organizing content on the page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Card</CardTitle>
                <CardDescription>A basic card component.</CardDescription>
              </CardHeader>
              <CardContent>
                This is the content of the card.
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Navigation</h2>
            <p className="text-muted-foreground mb-6">
              Components for navigating within the application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="assets" className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Assets</h2>
            <p className="text-muted-foreground mb-6">
              Complex components and modals that can be reused across the application.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AddPortalUserModal</CardTitle>
              <CardDescription>
                A comprehensive wizard modal for adding portal users with step-by-step configuration including portal selection, user type, credentials, and two-factor authentication setup.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Component Usage:</h4>
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {'<AddPortalUserModal isOpen={isOpen} onClose={onClose} mode="create" onSave={onSave} />'}
                </code>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Props:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• <strong>isOpen:</strong> boolean - Controls modal visibility</li>
                  <li>• <strong>onClose:</strong> () =&gt; void - Callback when modal closes</li>
                  <li>• <strong>mode:</strong> 'create' | 'edit' - Modal operation mode</li>
                  <li>• <strong>portalUser?:</strong> PortalUser - User data for edit mode</li>
                  <li>• <strong>onSave:</strong> (data: Partial&lt;PortalUser&gt;) =&gt; void - Callback with form data</li>
                </ul>
              </div>

              <div>
                <Button onClick={() => setIsAddPortalUserModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Open Add Portal User Modal
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddPortalUserModal
        isOpen={isAddPortalUserModalOpen}
        onClose={() => setIsAddPortalUserModalOpen(false)}
        mode="create"
        onSave={handleAddModalSubmit}
      />
    </div>
  );
}
