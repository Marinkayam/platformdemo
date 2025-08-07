import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { RelatedInvoiceProps } from "./types";
import { StatusBadge } from "@/components/ui/status-badge";

export const RelatedInvoicesTable = ({ invoices }: { invoices?: RelatedInvoiceProps[] }) => {
  if (!invoices || invoices.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Related Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No related invoices found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Related Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.number}</TableCell>
                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                <TableCell>${invoice.total.toLocaleString()}</TableCell>
                <TableCell>
                  <StatusBadge status={invoice.status as any} />
                </TableCell>
                <TableCell>
                  <span 
                    className="inline-flex items-center px-4 py-1.5 rounded-full font-medium"
                    style={{ 
                      color: invoice.paymentStatus === "Paid" ? '#007737' : '#F2AE40',
                      backgroundColor: invoice.paymentStatus === "Paid" ? '#E6F4EA' : '#FFF8E1',
                      fontSize: '12px'
                    }}
                  >
                    {invoice.paymentStatus}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
