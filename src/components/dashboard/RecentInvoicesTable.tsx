import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency } from "@/lib/utils";
import { Invoice } from "@/types/invoice";
import { getRandomPortalName } from "@/lib/portalUtils";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentInvoicesTableProps {
  invoices: Invoice[];
  isLoading?: boolean;
}

const sampleInvoices = [
  { id: "INV-1990", category: "Android", price: "$83.74", status: "Paid" },
  { id: "INV-1991", category: "Mac", price: "$97.14", status: "Out of date" },
  { id: "INV-1992", category: "Windows", price: "$68.71", status: "Progress" },
  { id: "INV-1993", category: "Android", price: "$85.21", status: "Paid" },
  { id: "INV-1994", category: "Mac", price: "$52.17", status: "Paid" }
];

export function RecentInvoicesTable({ invoices, isLoading = false }: RecentInvoicesTableProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'text-green-600 bg-green-50';
      case 'Progress': return 'text-orange-600 bg-orange-50';
      case 'Out of date': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">New invoice</CardTitle>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate('/invoices')}
          className="text-blue-600 hover:text-blue-700"
        >
          View all →
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Invoice ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-8"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className="h-[65px]">
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-8 w-8" /></TableCell>
                </TableRow>
              ))
            ) : (
              sampleInvoices.map((invoice, index) => (
                <TableRow 
                  key={invoice.id}
                  className="hover:bg-gray-50 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => navigate(`/invoices/${invoice.id}`)}
                >
                  <TableCell className="font-semibold">{invoice.id}</TableCell>
                  <TableCell>{invoice.category}</TableCell>
                  <TableCell className="font-medium">{invoice.price}</TableCell>
                  <TableCell>
                    <StatusBadge status={invoice.status} />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
