
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UniversalStatusBadge } from "@/components/ui/universal-status-badge";
import { formatCurrency } from "@/lib/utils";
import { Invoice } from "@/types/invoice";
import { getRandomPortalName } from "@/lib/portalUtils";
import { useNavigate } from "react-router-dom";

interface RecentInvoicesTableProps {
  invoices: Invoice[];
}

export function RecentInvoicesTable({ invoices }: RecentInvoicesTableProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Recent Invoices</CardTitle>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/invoices')}
        >
          View all
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Invoice ID</TableHead>
              <TableHead>Portal</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow 
                key={invoice.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/invoices/${invoice.id}`)}
              >
                <TableCell className="font-semibold">{invoice.number}</TableCell>
                <TableCell>{getRandomPortalName()}</TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(invoice.total, invoice.currency)}
                </TableCell>
                <TableCell>
                  <UniversalStatusBadge status={invoice.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
