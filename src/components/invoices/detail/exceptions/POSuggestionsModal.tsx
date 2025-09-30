import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Download, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

interface SuggestedPO {
  id: string;
  poNumber: string;
  poDate: string;
  status: string;
  buyerName: string;
  supplierName: string;
  portal: string;
  paymentTerms: string;
  currency: string;
  totalAmount: number;
  tra: number; // Total Remaining Amount
  matchScore: number; // How well it matches (for sorting)
}

interface POSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceTotal: number;
  invoiceCurrency: string;
  buyerName: string;
}

export function POSuggestionsModal({
  isOpen,
  onClose,
  invoiceTotal,
  invoiceCurrency,
  buyerName
}: POSuggestionsModalProps) {
  const [sortColumn, setSortColumn] = useState<string>('matchScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  // Mock suggested POs for Adobe (buyer in INV-40230612) - Mixed statuses for demo
  const suggestedPOs: SuggestedPO[] = [
    {
      id: 'po-1',
      poNumber: 'ADO-2024-10891',
      poDate: '2024-11-15',
      status: 'Open',
      buyerName: 'Adobe',
      supplierName: 'Tech Solutions Inc',
      portal: 'SAP Ariba',
      paymentTerms: 'Net 30',
      currency: 'USD',
      totalAmount: 150000,
      tra: 125000,
      matchScore: 95
    },
    {
      id: 'po-2',
      poNumber: 'ADO-2024-10923',
      poDate: '2024-11-20',
      status: 'Partially Invoiced',
      buyerName: 'Adobe',
      supplierName: 'Tech Solutions Inc',
      portal: 'SAP Ariba',
      paymentTerms: 'Net 30',
      currency: 'USD',
      totalAmount: 100000,
      tra: 85000,
      matchScore: 90
    },
    {
      id: 'po-3',
      poNumber: 'ADO-2024-11045',
      poDate: '2024-11-28',
      status: 'Open',
      buyerName: 'Adobe',
      supplierName: 'Tech Solutions Inc',
      portal: 'SAP Ariba',
      paymentTerms: 'Net 45',
      currency: 'USD',
      totalAmount: 200000,
      tra: 180000,
      matchScore: 88
    },
    {
      id: 'po-4',
      poNumber: 'ADO-2024-11102',
      poDate: '2024-12-01',
      status: 'New',
      buyerName: 'Adobe',
      supplierName: 'Tech Solutions Inc',
      portal: 'Coupa',
      paymentTerms: 'Net 30',
      currency: 'USD',
      totalAmount: 90000,
      tra: 78000,
      matchScore: 85
    },
    {
      id: 'po-5',
      poNumber: 'ADO-2024-11156',
      poDate: '2024-12-05',
      status: 'Pending Approval',
      buyerName: 'Adobe',
      supplierName: 'Tech Solutions Inc',
      portal: 'SAP Ariba',
      paymentTerms: 'Net 60',
      currency: 'USD',
      totalAmount: 300000,
      tra: 295000,
      matchScore: 83
    },
    {
      id: 'po-6',
      poNumber: 'ADO-2024-11189',
      poDate: '2024-12-08',
      status: 'Closed',
      buyerName: 'Adobe',
      supplierName: 'Tech Solutions Inc',
      portal: 'SAP Ariba',
      paymentTerms: 'Net 30',
      currency: 'USD',
      totalAmount: 120000,
      tra: 95000,
      matchScore: 80
    }
  ];

  // Sort POs by selected column
  const sortedPOs = [...suggestedPOs].sort((a, b) => {
    let aValue: any = a[sortColumn as keyof SuggestedPO];
    let bValue: any = b[sortColumn as keyof SuggestedPO];

    if (sortColumn === 'poDate') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const handleDownloadPO = (poNumber: string) => {
    // Simulate PDF download
    toast.success('Downloading PO', {
      description: `${poNumber} PDF download started`
    });
  };

  const handleCopyPO = (poNumber: string) => {
    navigator.clipboard.writeText(poNumber);
    toast.success('PO number copied', {
      description: `${poNumber} copied to clipboard`
    });
  };

  const toggleRowExpansion = (poId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(poId)) {
      newExpanded.delete(poId);
    } else {
      newExpanded.add(poId);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden border border-[#E4E5E9]">
        <DialogHeader className="border-b border-[#E4E5E9] pb-4">
          <DialogTitle className="text-xl" style={{ color: '#38415F' }}>
            Suggested POs by Monto
          </DialogTitle>
          <div className="mt-2 text-sm" style={{ color: '#586079' }}>
            Monto has identified other POs from your buyer that may be valid for this invoice.
            Please review and select a suitable PO to generate a new invoice in your ERP.
          </div>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden">
          {/* Table */}
          <div className="overflow-hidden border border-[#E4E5E9] rounded-lg">
            <div className="overflow-y-auto max-h-[60vh]">
              <table className="w-full">
                <thead style={{ backgroundColor: '#F0EDFF' }}>
                  <tr className="border-b border-[#E4E5E9]">
                    <th className="w-8 p-3"></th>
                    <th
                      className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-opacity-80"
                      style={{ color: '#38415F' }}
                      onClick={() => handleSort('poNumber')}
                    >
                      PO Number
                    </th>
                    <th
                      className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-opacity-80"
                      style={{ color: '#38415F' }}
                      onClick={() => handleSort('poDate')}
                    >
                      PO Date
                    </th>
                    <th
                      className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-opacity-80"
                      style={{ color: '#38415F' }}
                      onClick={() => handleSort('status')}
                    >
                      Monto's Status
                    </th>
                    <th
                      className="text-left p-3 font-medium text-sm cursor-pointer hover:bg-opacity-80"
                      style={{ color: '#38415F' }}
                      onClick={() => handleSort('tra')}
                    >
                      TRA
                    </th>
                    <th className="text-center p-3 font-medium text-sm" style={{ color: '#38415F' }}>
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPOs.map((po, index) => (
                    <React.Fragment key={po.id}>
                      {/* Main Row */}
                      <tr
                        className="border-b border-[#E4E5E9] hover:bg-[#F0EDFF] hover:bg-opacity-30 cursor-pointer"
                        style={{ backgroundColor: index % 2 === 0 ? 'white' : '#FAFBFC' }}
                        onClick={() => toggleRowExpansion(po.id)}
                      >
                        <td className="p-3 text-center">
                          <button
                            className="p-1"
                            style={{ color: '#8C92A3' }}
                          >
                            {expandedRows.has(po.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="font-medium" style={{ color: '#38415F' }}>{po.poNumber}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyPO(po.poNumber);
                              }}
                              className="p-1 hover:bg-gray-100 rounded"
                              style={{ color: '#8C92A3' }}
                              title="Copy PO number"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        <td className="p-3" style={{ color: '#586079' }}>
                          {formatDate(po.poDate)}
                        </td>
                        <td className="p-3">
                          <StatusBadge status={po.status} />
                        </td>
                        <td className="p-3">
                          <div
                            className="font-medium"
                            style={{ color: po.tra >= invoiceTotal ? '#38415F' : '#DF1C41' }}
                          >
                            {formatCurrency(po.tra, po.currency)}
                          </div>
                          {po.tra < invoiceTotal && (
                            <div className="text-xs mt-1" style={{ color: '#DF1C41' }}>
                              Short {formatCurrency(invoiceTotal - po.tra, po.currency)}
                            </div>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadPO(po.poNumber);
                            }}
                            className="p-2 hover:bg-gray-100 rounded"
                            style={{ color: '#7B59FF' }}
                            title="Download PO"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>

                      {/* Expanded Row */}
                      {expandedRows.has(po.id) && (
                        <tr>
                          <td colSpan={6} className="p-0">
                            <div className="bg-white p-6">
                              <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-6">
                                  <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: '#8C92A3' }}>
                                      Buyer Name
                                    </label>
                                    <div className="p-3 border border-[#E4E5E9] rounded bg-gray-50 text-sm" style={{ color: '#38415F' }}>
                                      {po.buyerName}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: '#8C92A3' }}>
                                      Supplier Name
                                    </label>
                                    <div className="p-3 border border-[#E4E5E9] rounded bg-gray-50 text-sm" style={{ color: '#38415F' }}>
                                      {po.supplierName}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: '#8C92A3' }}>
                                      Portal
                                    </label>
                                    <div className="p-3 border border-[#E4E5E9] rounded bg-gray-50 text-sm" style={{ color: '#38415F' }}>
                                      {po.portal}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: '#8C92A3' }}>
                                      Payment Terms
                                    </label>
                                    <div className="p-3 border border-[#E4E5E9] rounded bg-gray-50 text-sm" style={{ color: '#38415F' }}>
                                      {po.paymentTerms}
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: '#8C92A3' }}>
                                      Currency
                                    </label>
                                    <div className="p-3 border border-[#E4E5E9] rounded bg-gray-50 text-sm" style={{ color: '#38415F' }}>
                                      {po.currency}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: '#8C92A3' }}>
                                      Total Amount
                                    </label>
                                    <div className="p-3 border border-[#E4E5E9] rounded bg-gray-50 text-sm" style={{ color: '#38415F' }}>
                                      {formatCurrency(po.totalAmount, po.currency)}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-medium mb-1" style={{ color: '#8C92A3' }}>
                                      Total Remaining Amount (TRA)
                                    </label>
                                    <div
                                      className="p-3 border border-[#E4E5E9] rounded bg-gray-50 font-medium text-sm"
                                      style={{ color: po.tra >= invoiceTotal ? '#38415F' : '#DF1C41' }}
                                    >
                                      {formatCurrency(po.tra, po.currency)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E4E5E9]">
            <p className="text-xs" style={{ color: '#8C92A3' }}>
              Data synced from {buyerName} portal • Updated in real-time
            </p>
            <Button onClick={onClose} variant="outline" className="border-[#E4E5E9]" style={{ color: '#586079' }}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}