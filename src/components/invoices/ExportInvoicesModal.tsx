
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

// Define the form schema with validation
const exportFormSchema = z.object({
  destination: z.enum(["download", "email"]),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
});

type ExportFormValues = z.infer<typeof exportFormSchema>;

interface ExportInvoicesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoiceCount: number;
  onExport: (values: ExportFormValues) => void;
}

export function ExportInvoicesModal({
  open,
  onOpenChange,
  invoiceCount,
  onExport,
}: ExportInvoicesModalProps) {
  // Initialize form with react-hook-form and zod validation
  const form = useForm<ExportFormValues>({
    resolver: zodResolver(exportFormSchema),
    defaultValues: {
      destination: "download",
      email: "",
    },
  });

  // Get current destination value to conditionally show email field
  const destination = form.watch("destination");

  const handleSubmit = (values: ExportFormValues) => {
    // Check if we're trying to export more than 1000 invoices
    if (invoiceCount > 1000) {
      toast({
        title: "Export limit exceeded",
        description: "You can only export up to 1000 invoices at a time.",
        variant: "destructive",
      });
      return;
    }

    // If destination is email but no email provided
    if (values.destination === "email" && !values.email) {
      form.setError("email", {
        type: "manual",
        message: "Email is required for email exports",
      });
      return;
    }

    // Call the export handler
    onExport(values);
    
    // Close the modal
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Export Invoices</DialogTitle>
              <DialogDescription>
                You can export up to 1000 invoices per export.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Export Destination</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="download" id="download" />
                          <Label htmlFor="download">Download to Computer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="email" id="email" />
                          <Label htmlFor="email">Send via Email</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {destination === "email" && (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. accounts@company.com"
                          {...field}
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <p className="text-sm text-muted-foreground">
                Only the first 1000 invoices will be included.
              </p>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Export</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
