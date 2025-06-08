
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Typography } from "@/components/ui/typography/typography";
import { DesignTabs } from "@/components/ui/design-tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle, Info, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Form validation schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  terms: z.boolean().refine(val => val === true, "You must accept the terms"),
});

export default function DesignSystemPlayground() {
  const [activeTab, setActiveTab] = useState("colors");
  const [copiedSvg, setCopiedSvg] = useState<string | null>(null);
  const [formProgress, setFormProgress] = useState(0);
  const [stepProgress, setStepProgress] = useState(2);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      message: "",
      terms: false,
    }
  });

  const tabs = [
    { id: "colors", label: "Colors", count: 24 },
    { id: "typography", label: "Typography", count: 12 },
    { id: "buttons", label: "Buttons", count: 8 },
    { id: "forms", label: "Forms", count: 15 },
    { id: "modals", label: "Modals", count: 4 },
    { id: "progress", label: "Progress", count: 3 },
    { id: "spacing", label: "Spacing", count: 6 },
    { id: "brand", label: "Brand", count: 2 },
  ];

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSvg(type);
      toast({
        title: "Copied!",
        description: `${type} SVG copied to clipboard`,
      });
      setTimeout(() => setCopiedSvg(null), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const montoLogoSvg = `<svg width="80" height="16" viewBox="0 0 80 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x="0" y="12" fill="#7B59FF" font-family="Arial, sans-serif" font-size="14" font-weight="600">MONTO</text>
</svg>`;

  const montoIconSvg = `<svg width="24" height="24" viewBox="0 0 137 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M55.8087 64.9865C63.4136 52.4296 64.0031 37.5145 63.787 27.3746C63.7477 25.3702 62.9223 23.523 61.4878 22.1475C60.0533 20.7719 58.1471 20.0448 56.1624 20.0645C52.0357 20.1627 48.7736 23.582 48.8522 27.689C49.0291 35.9621 48.6164 48.0081 43.0356 57.244C36.7866 67.5608 25.1925 72.5325 7.50666 72.4342C3.36031 72.4146 0.0196509 75.7552 0 79.9605C0 81.9649 0.805688 83.8318 2.22056 85.227C3.63542 86.6222 5.48261 87.3493 7.50666 87.3886C25.2122 87.3296 36.7866 92.262 43.0356 102.579C48.6164 111.815 49.0291 123.861 48.8522 132.134C48.7736 136.26 52.0357 139.68 56.1624 139.758C56.2213 139.758 56.2606 139.758 56.3196 139.758C60.3677 139.758 63.7084 136.516 63.787 132.448C64.0031 122.308 63.4136 107.393 55.8087 94.8363C52.016 88.5873 46.8871 83.5763 40.5399 79.9016C46.9068 76.2268 52.0357 71.2159 55.8087 64.9669V64.9865Z" fill="#7B59FF"/>
  <path d="M128.97 52.3909H128.931C111.245 52.5088 99.6511 47.5175 93.4021 37.2007C87.8212 27.9648 87.4086 15.9188 87.5854 7.64573C87.6247 5.64133 86.8976 3.75484 85.5024 2.32032C84.1269 0.866154 82.26 0.0408151 80.2753 0.00151327C78.3102 -0.0377886 76.3844 0.689296 74.9499 2.08451C73.5154 3.46008 72.69 5.32692 72.6507 7.31166C72.4345 17.4515 73.0241 32.3666 80.629 44.9236C84.4216 51.1726 89.5505 56.1835 95.8978 59.8583C89.5309 63.533 84.4216 68.5243 80.629 74.793C73.0241 87.3499 72.4345 102.265 72.6507 112.405C72.7293 116.473 76.07 119.715 80.1181 119.715C80.177 119.715 80.236 119.715 80.2753 119.715C82.2797 119.676 84.1269 118.85 85.5024 117.416C86.878 115.981 87.6247 114.075 87.5854 112.09C87.4086 103.817 87.8212 91.7714 93.4021 82.5355C99.5921 72.317 111.049 67.3256 128.44 67.3256C128.617 67.3256 128.813 67.3256 128.99 67.3256C130.975 67.3256 132.842 66.5592 134.237 65.164C135.652 63.7688 136.438 61.8823 136.457 59.7993C136.438 55.6923 133.077 52.3713 128.99 52.3713L128.97 52.3909Z" fill="#7B59FF"/>
</svg>`;

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    toast({
      title: "Form Submitted!",
      description: "All validation passed successfully.",
    });
    setFormProgress(100);
  };

  const ColorPalette = ({ title, colors }: { title: string; colors: Array<{name: string; value: string; description: string}> }) => (
    <div className="space-y-3">
      <Typography variant="h6">{title}</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.map((color) => (
          <div key={color.name} className="space-y-2">
            <div 
              className="w-full h-16 rounded-lg border border-grey-300"
              style={{ backgroundColor: color.value }}
            />
            <div className="space-y-1">
              <Typography variant="subtitle2" className="font-medium">{color.name}</Typography>
              <Typography variant="caption" className="font-mono">{color.value}</Typography>
              <Typography variant="caption" className="text-grey-600">{color.description}</Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SpacingExample = ({ title, className, description }: { title: string; className: string; description: string }) => (
    <div className="space-y-3">
      <Typography variant="subtitle2">{title}</Typography>
      <div className="border border-grey-300 rounded-lg p-4 bg-grey-200">
        <div className={cn("bg-primary-main/20 border border-primary-main border-dashed rounded", className)}>
          <div className="bg-primary-main text-primary-contrast-text p-2 rounded text-xs text-center">
            Content
          </div>
        </div>
      </div>
      <Typography variant="caption" className="text-grey-600">{description}</Typography>
    </div>
  );

  const StepProgressIndicator = ({ steps, currentStep }: { steps: number; currentStep: number }) => (
    <div className="flex items-center space-x-4">
      {Array.from({ length: steps }, (_, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2",
              i < currentStep 
                ? "bg-primary-main border-primary-main text-primary-contrast-text" 
                : i === currentStep
                ? "bg-primary-light border-primary-main text-primary-main"
                : "bg-grey-200 border-grey-400 text-grey-600"
            )}>
              {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <Typography variant="caption" className="mt-1">Step {i + 1}</Typography>
          </div>
          {i < steps - 1 && (
            <div className={cn(
              "flex-1 h-0.5",
              i < currentStep - 1 ? "bg-primary-main" : "bg-grey-300"
            )} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const ConfirmationModal = ({ children }: { children: React.ReactNode }) => (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-warning-lighter flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-warning-main" />
            </div>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription className="text-center">
              This action cannot be undone. This will permanently delete the item.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex justify-center space-x-3 mt-6">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-error-main hover:bg-error-dark text-error-contrast-text">
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const InfoModal = ({ children }: { children: React.ReactNode }) => (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-info-lighter flex items-center justify-center">
              <Info className="w-6 h-6 text-info-main" />
            </div>
            <DialogTitle>Information</DialogTitle>
            <DialogDescription className="text-center">
              Here's some important information you should know about this feature.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="flex justify-center mt-6">
          <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "colors":
        return (
          <div className="space-y-8">
            <ColorPalette 
              title="Primary Colors"
              colors={[
                { name: "primary-main", value: "#7B59FF", description: "Main brand purple for primary actions" },
                { name: "primary-light", value: "#BEADFF", description: "Light purple for secondary elements" },
                { name: "primary-lighter", value: "#EFEBFF", description: "Lightest purple for backgrounds" },
                { name: "primary-dark", value: "#523BAA", description: "Dark purple for active states" },
              ]}
            />
            <ColorPalette 
              title="Semantic Colors"
              colors={[
                { name: "success-main", value: "#007737", description: "Success states and confirmations" },
                { name: "warning-main", value: "#F2AE40", description: "Warnings and caution states" },
                { name: "error-main", value: "#DF1C41", description: "Errors and destructive actions" },
                { name: "info-main", value: "#375DFB", description: "Information and neutral actions" },
              ]}
            />
            <ColorPalette 
              title="Grey Scale"
              colors={[
                { name: "grey-900", value: "#061237", description: "Primary text and headings" },
                { name: "grey-800", value: "#38415F", description: "Secondary headings" },
                { name: "grey-700", value: "#586079", description: "Body text" },
                { name: "grey-500", value: "#8C94A9", description: "Secondary text and icons" },
                { name: "grey-300", value: "#F1F1F3", description: "Borders and dividers" },
                { name: "grey-200", value: "#F4F6F8", description: "Background surfaces" },
              ]}
            />
          </div>
        );

      case "typography":
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Typography variant="h3">Headings</Typography>
              <div className="space-y-4">
                <div>
                  <Typography variant="h1">Heading 1 - Hero Title</Typography>
                  <Typography variant="caption" className="text-grey-500">text-4xl md:text-5xl lg:text-6xl font-medium</Typography>
                </div>
                <div>
                  <Typography variant="h2">Heading 2 - Page Title</Typography>
                  <Typography variant="caption" className="text-grey-500">text-3xl md:text-4xl lg:text-5xl font-medium</Typography>
                </div>
                <div>
                  <Typography variant="h3">Heading 3 - Section Title</Typography>
                  <Typography variant="caption" className="text-grey-500">text-2xl font-medium</Typography>
                </div>
                <div>
                  <Typography variant="h4">Heading 4 - Component Title</Typography>
                  <Typography variant="caption" className="text-grey-500">text-xl font-bold</Typography>
                </div>
                <div>
                  <Typography variant="h5">Heading 5 - Small Heading</Typography>
                  <Typography variant="caption" className="text-grey-500">text-lg font-semibold</Typography>
                </div>
                <div>
                  <Typography variant="h6">Heading 6 - Micro Heading</Typography>
                  <Typography variant="caption" className="text-grey-500">text-base font-medium</Typography>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="h3">Body Text</Typography>
              <div className="space-y-4">
                <div>
                  <Typography variant="subtitle1">Subtitle 1 - Important secondary text</Typography>
                  <Typography variant="caption" className="text-grey-500">text-base font-semibold</Typography>
                </div>
                <div>
                  <Typography variant="subtitle2">Subtitle 2 - Supporting text</Typography>
                  <Typography variant="caption" className="text-grey-500">text-sm font-normal</Typography>
                </div>
                <div>
                  <Typography variant="body1">Body 1 - Main content and articles</Typography>
                  <Typography variant="caption" className="text-grey-500">text-base font-normal</Typography>
                </div>
                <div>
                  <Typography variant="body2">Body 2 - Secondary content and descriptions</Typography>
                  <Typography variant="caption" className="text-grey-500">text-sm font-normal</Typography>
                </div>
                <div>
                  <Typography variant="body3">Body 3 - Light supporting text</Typography>
                  <Typography variant="caption" className="text-grey-500">text-sm font-light</Typography>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="h3">Utility Text</Typography>
              <div className="space-y-4">
                <div>
                  <Typography variant="caption">Caption - Image captions and meta information</Typography>
                  <Typography variant="caption" className="text-grey-500">text-xs font-normal</Typography>
                </div>
                <div>
                  <Typography variant="overline">Overline - Category labels</Typography>
                  <Typography variant="caption" className="text-grey-500">text-overline font-medium uppercase tracking-wide</Typography>
                </div>
                <div>
                  <Typography variant="button">Button - Interactive elements</Typography>
                  <Typography variant="caption" className="text-grey-500">text-xs font-medium</Typography>
                </div>
                <div>
                  <Typography variant="smallText">Small Text - Fine print and micro content</Typography>
                  <Typography variant="caption" className="text-grey-500">text-small-text font-normal</Typography>
                </div>
              </div>
            </div>
          </div>
        );

      case "buttons":
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Typography variant="h3">Button Variants</Typography>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="h3">Button Sizes</Typography>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Small</Button>
                <Button size="default" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Default</Button>
                <Button size="lg" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Large</Button>
                <Button size="icon" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="h3">Button States</Typography>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Normal</Button>
                <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text" disabled>Disabled</Button>
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="h3">Button Spacing</Typography>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Button 1</Button>
                  <Button size="sm" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Button 2</Button>
                </div>
                <div className="flex space-x-3">
                  <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Button 1</Button>
                  <Button className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Button 2</Button>
                </div>
                <div className="flex space-x-4">
                  <Button size="lg" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Button 1</Button>
                  <Button size="lg" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">Button 2</Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "forms":
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Typography variant="h3">Interactive Form Example</Typography>
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                  <CardDescription>Fill out this form to see validation in action</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Enter your message" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Accept terms and conditions</FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text">
                        Submit Form
                      </Button>
                    </form>
                  </Form>
                  
                  {formProgress > 0 && (
                    <div className="mt-4">
                      <Progress value={formProgress} className="w-full" />
                      <Typography variant="caption" className="text-grey-600 mt-1">
                        Form submitted successfully!
                      </Typography>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Typography variant="h3">Input Types</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="text-input">Text Input</Label>
                  <Input id="text-input" placeholder="Enter text" />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="email-input">Email Input</Label>
                  <Input id="email-input" type="email" placeholder="Enter email" />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="password-input">Password Input</Label>
                  <Input id="password-input" type="password" placeholder="Enter password" />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="number-input">Number Input</Label>
                  <Input id="number-input" type="number" placeholder="Enter number" />
                </div>
                
                <div className="space-y-3 md:col-span-2">
                  <Label htmlFor="textarea-input">Textarea</Label>
                  <Textarea id="textarea-input" placeholder="Enter long text" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="checkbox-input" />
                    <Label htmlFor="checkbox-input">Checkbox option</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "modals":
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Typography variant="h3">Modal Variants</Typography>
              <div className="flex flex-wrap gap-4">
                <ConfirmationModal>
                  <Button variant="destructive">Delete Item</Button>
                </ConfirmationModal>
                
                <InfoModal>
                  <Button className="bg-info-main hover:bg-info-dark text-info-contrast-text">
                    Show Info
                  </Button>
                </InfoModal>
              </div>
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Typography variant="h3">Progress Bars</Typography>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Typography variant="subtitle2">Basic Progress</Typography>
                  <Progress value={33} className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <Typography variant="subtitle2">Medium Progress</Typography>
                  <Progress value={66} className="w-full" />
                </div>
                
                <div className="space-y-2">
                  <Typography variant="subtitle2">Complete Progress</Typography>
                  <Progress value={100} className="w-full" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="h3">Step Progress Indicator</Typography>
              <div className="space-y-6">
                <div>
                  <Typography variant="subtitle2" className="mb-4">3-Step Process</Typography>
                  <StepProgressIndicator steps={3} currentStep={stepProgress} />
                  <div className="flex gap-2 mt-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setStepProgress(Math.max(0, stepProgress - 1))}
                      disabled={stepProgress <= 0}
                    >
                      Previous
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-primary-main hover:bg-primary-dark text-primary-contrast-text"
                      onClick={() => setStepProgress(Math.min(3, stepProgress + 1))}
                      disabled={stepProgress >= 3}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "spacing":
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Typography variant="h3">Spacing Examples</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SpacingExample 
                  title="Small Padding (p-2)"
                  className="p-2"
                  description="8px padding - compact elements"
                />
                
                <SpacingExample 
                  title="Medium Padding (p-4)"
                  className="p-4"
                  description="16px padding - default spacing"
                />
                
                <SpacingExample 
                  title="Large Padding (p-6)"
                  className="p-6"
                  description="24px padding - generous spacing"
                />
                
                <SpacingExample 
                  title="Extra Large Padding (p-8)"
                  className="p-8"
                  description="32px padding - section spacing"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="h3">Margin Examples</Typography>
              <div className="space-y-4">
                <div className="border border-grey-300 rounded-lg p-4 bg-grey-200">
                  <div className="bg-primary-main/20 border border-primary-main border-dashed rounded mb-2">
                    <div className="bg-primary-main text-primary-contrast-text p-2 rounded text-xs text-center">Item 1</div>
                  </div>
                  <div className="bg-primary-main/20 border border-primary-main border-dashed rounded mb-4">
                    <div className="bg-primary-main text-primary-contrast-text p-2 rounded text-xs text-center">Item 2 (mb-4)</div>
                  </div>
                  <div className="bg-primary-main/20 border border-primary-main border-dashed rounded">
                    <div className="bg-primary-main text-primary-contrast-text p-2 rounded text-xs text-center">Item 3</div>
                  </div>
                </div>
                <Typography variant="caption" className="text-grey-600">16px bottom margin between elements</Typography>
              </div>
            </div>
          </div>
        );

      case "brand":
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <Typography variant="h3">Monto Logo</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Monto Logo</CardTitle>
                    <CardDescription>Primary brand logo in purple</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center h-20 border border-grey-300 rounded-lg bg-grey-200">
                      <svg width="80" height="16" viewBox="0 0 80 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <text x="0" y="12" fill="#7B59FF" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="600">MONTO</text>
                      </svg>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => copyToClipboard(montoLogoSvg, "Logo")}
                      className="w-full"
                    >
                      {copiedSvg === "Logo" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      Copy SVG
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monto Icon</CardTitle>
                    <CardDescription>Brand icon in purple</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center h-20 border border-grey-300 rounded-lg bg-grey-200">
                      <svg width="24" height="24" viewBox="0 0 137 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M55.8087 64.9865C63.4136 52.4296 64.0031 37.5145 63.787 27.3746C63.7477 25.3702 62.9223 23.523 61.4878 22.1475C60.0533 20.7719 58.1471 20.0448 56.1624 20.0645C52.0357 20.1627 48.7736 23.582 48.8522 27.689C49.0291 35.9621 48.6164 48.0081 43.0356 57.244C36.7866 67.5608 25.1925 72.5325 7.50666 72.4342C3.36031 72.4146 0.0196509 75.7552 0 79.9605C0 81.9649 0.805688 83.8318 2.22056 85.227C3.63542 86.6222 5.48261 87.3493 7.50666 87.3886C25.2122 87.3296 36.7866 92.262 43.0356 102.579C48.6164 111.815 49.0291 123.861 48.8522 132.134C48.7736 136.26 52.0357 139.68 56.1624 139.758C56.2213 139.758 56.2606 139.758 56.3196 139.758C60.3677 139.758 63.7084 136.516 63.787 132.448C64.0031 122.308 63.4136 107.393 55.8087 94.8363C52.016 88.5873 46.8871 83.5763 40.5399 79.9016C46.9068 76.2268 52.0357 71.2159 55.8087 64.9669V64.9865Z" fill="#7B59FF"/>
                        <path d="M128.97 52.3909H128.931C111.245 52.5088 99.6511 47.5175 93.4021 37.2007C87.8212 27.9648 87.4086 15.9188 87.5854 7.64573C87.6247 5.64133 86.8976 3.75484 85.5024 2.32032C84.1269 0.866154 82.26 0.0408151 80.2753 0.00151327C78.3102 -0.0377886 76.3844 0.689296 74.9499 2.08451C73.5154 3.46008 72.69 5.32692 72.6507 7.31166C72.4345 17.4515 73.0241 32.3666 80.629 44.9236C84.4216 51.1726 89.5505 56.1835 95.8978 59.8583C89.5309 63.533 84.4216 68.5243 80.629 74.793C73.0241 87.3499 72.4345 102.265 72.6507 112.405C72.7293 116.473 76.07 119.715 80.1181 119.715C80.177 119.715 80.236 119.715 80.2753 119.715C82.2797 119.676 84.1269 118.85 85.5024 117.416C86.878 115.981 87.6247 114.075 87.5854 112.09C87.4086 103.817 87.8212 91.7714 93.4021 82.5355C99.5921 72.317 111.049 67.3256 128.44 67.3256C128.617 67.3256 128.813 67.3256 128.99 67.3256C130.975 67.3256 132.842 66.5592 134.237 65.164C135.652 63.7688 136.438 61.8823 136.457 59.7993C136.438 55.6923 133.077 52.3713 128.99 52.3713L128.97 52.3909Z" fill="#7B59FF"/>
                      </svg>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => copyToClipboard(montoIconSvg, "Icon")}
                      className="w-full"
                    >
                      {copiedSvg === "Icon" ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      Copy SVG
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="h3">Usage Guidelines</Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-success-main rounded-lg bg-success-lighter">
                  <Typography variant="subtitle2" className="text-success-dark mb-2">✓ Correct Usage</Typography>
                  <Typography variant="body2" className="text-success-dark">
                    Use the logo in primary purple (#7B59FF) on light backgrounds for maximum brand recognition.
                  </Typography>
                </div>
                
                <div className="p-4 border border-error-main rounded-lg bg-error-lighter">
                  <Typography variant="subtitle2" className="text-error-dark mb-2">✗ Incorrect Usage</Typography>
                  <Typography variant="body2" className="text-error-dark">
                    Don't use the logo in other colors or modify the proportions.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background-default p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <Typography variant="h1">Design System</Typography>
          <Typography variant="subtitle1" className="text-grey-600">
            Comprehensive design tokens and components for Request to Pay applications
          </Typography>
        </div>

        <DesignTabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="bg-background-paper rounded-lg border border-grey-300 p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
