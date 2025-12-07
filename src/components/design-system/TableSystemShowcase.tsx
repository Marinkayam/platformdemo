import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Code, MoreVertical } from 'lucide-react';
import { TableSystem } from '@/components/ui/TableSystem';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/ui/status-badge';
import { getPortalLogoUrl } from '@/lib/utils';

interface SampleInvoice {
  id: string;
  number: string;
  buyer: string;
  amount: number;
  status: string;
  date: string;
  owner: string;
  portal: string;
}

export function TableSystemShowcase() {
  const sampleData: SampleInvoice[] = [
    { id: '1', number: 'INV-2024-001', buyer: 'Acme Corp', amount: 45000, status: 'Pending Action', date: '2024-11-15', owner: 'John Doe', portal: 'Coupa' },
    { id: '2', number: 'INV-2024-002', buyer: 'TechStart Inc', amount: 32000, status: 'Approved by Buyer', date: '2024-11-14', owner: 'Jane Smith', portal: 'Ariba' },
    { id: '3', number: 'INV-2024-003', buyer: 'Global Industries', amount: 78000, status: 'Pending Action', date: '2024-11-13', owner: 'Bob Johnson', portal: 'Coupa' },
    { id: '4', number: 'INV-2024-004', buyer: 'Acme Corp', amount: 21000, status: 'Paid', date: '2024-11-12', owner: 'Alice Williams', portal: 'Basware' },
  ];

  const basicColumns = [
    {
      key: 'number',
      label: 'Invoice Number',
      render: (item: SampleInvoice) => (
        <span className="font-semibold">{item.number}</span>
      ),
      sticky: true,
    },
    {
      key: 'buyer',
      label: 'Buyer',
      render: (item: SampleInvoice) => item.buyer,
    },
    {
      key: 'portal',
      label: 'Portal',
      render: (item: SampleInvoice) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
            <img
              src={getPortalLogoUrl(item.portal)}
              alt={`${item.portal} logo`}
              className="w-4 h-4 object-contain"
            />
          </div>
          <span>{item.portal}</span>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date',
      render: (item: SampleInvoice) => new Date(item.date).toLocaleDateString(),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (item: SampleInvoice) => (
        <span className="font-semibold">${item.amount.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: SampleInvoice) => (
        <StatusBadge status={item.status as any} />
      ),
    },
    {
      key: 'owner',
      label: 'Owner',
      render: (item: SampleInvoice) => item.owner,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item: SampleInvoice) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); console.log('View', item.number); }}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); console.log('Edit', item.number); }}>
              Edit Invoice
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); console.log('Assign', item.number); }}>
              Assign Owner
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={(e) => { e.stopPropagation(); console.log('Delete', item.number); }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Table System</h2>
        <p className="text-gray-600">
          Canonical reference for all table patterns used throughout the Monto platform.
        </p>
      </div>

      <Card>
            <CardHeader>
              <CardTitle className="text-lg">Source of Truth</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">

              {/* Live Example */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium text-gray-500">Pattern: TableSystem with all standard column types</Label>
                  <Code className="h-3 w-3 text-gray-400" />
                </div>
                <TableSystem
                  data={sampleData}
                  columns={basicColumns}
                  onRowClick={(item) => console.log('Clicked:', item.number)}
                />
              </div>

              {/* Visual Design Standards */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-sm font-semibold text-gray-900">Visual Design Standards</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-gray-700">Layout & Spacing</Label>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                      <li>Border radius: 12px (rounded-xl)</li>
                      <li>Row height: 65px (h-[65px])</li>
                      <li>Cell padding: 16px horizontal (px-4)</li>
                      <li>Minimum table width: 1200px-2200px</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-gray-700">Colors</Label>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                      <li>Header background: #F6F7F9</li>
                      <li>Row hover: gray-50</li>
                      <li>Border (rows): gray-50</li>
                      <li>Border (sticky): gray-200</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Column Types */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-sm font-semibold text-gray-900">Standard Column Types</Label>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="text-xs font-medium text-gray-700">ID Column (Sticky)</Label>
                      <p className="text-xs text-gray-600 mt-1">Bold font, sticky on scroll, clickable</p>
                      <code className="text-[10px] text-primary mt-1 block">font-semibold, sticky: true</code>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="text-xs font-medium text-gray-700">Portal Column</Label>
                      <p className="text-xs text-gray-600 mt-1">Circular badge with logo + name</p>
                      <code className="text-[10px] text-primary mt-1 block">w-6 h-6 rounded-full, getPortalLogoUrl()</code>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="text-xs font-medium text-gray-700">Status Column</Label>
                      <p className="text-xs text-gray-600 mt-1">StatusBadge component with colors</p>
                      <code className="text-[10px] text-primary mt-1 block">&lt;StatusBadge status=&#123;item.status&#125; /&gt;</code>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="text-xs font-medium text-gray-700">Amount Column</Label>
                      <p className="text-xs text-gray-600 mt-1">Bold, currency formatted</p>
                      <code className="text-[10px] text-primary mt-1 block">font-semibold, toLocaleString()</code>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="text-xs font-medium text-gray-700">Date Column</Label>
                      <p className="text-xs text-gray-600 mt-1">Formatted date strings</p>
                      <code className="text-[10px] text-primary mt-1 block">toLocaleDateString()</code>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <Label className="text-xs font-medium text-gray-700">Actions Column</Label>
                      <p className="text-xs text-gray-600 mt-1">Kebab menu (⋮) with e.stopPropagation()</p>
                      <code className="text-[10px] text-primary mt-1 block">&lt;DropdownMenu&gt;</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interaction Patterns */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-sm font-semibold text-gray-900">Interaction Patterns</Label>
                <div className="space-y-2">
                  <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                    <Label className="text-xs font-medium text-purple-900">Row Click Navigation</Label>
                    <p className="text-xs text-purple-700 mt-1">
                      Entire row is clickable when onRowClick provided. Cursor changes to pointer on hover.
                    </p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                    <Label className="text-xs font-medium text-purple-900">Kebab Menu Actions</Label>
                    <p className="text-xs text-purple-700 mt-1">
                      Use e.stopPropagation() to prevent row click when clicking dropdown menu actions.
                    </p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg">
                    <Label className="text-xs font-medium text-purple-900">Sticky Elements</Label>
                    <p className="text-xs text-purple-700 mt-1">
                      Header (z-30), first column (z-10), footer (z-20) remain visible during scroll.
                    </p>
                  </div>
                </div>
              </div>

              {/* States */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-sm font-semibold text-gray-900">Table States</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="border border-gray-200 p-3 rounded-lg">
                    <Label className="text-xs font-medium text-gray-700">Loading</Label>
                    <p className="text-xs text-gray-600 mt-1">TableSkeleton with shimmer</p>
                  </div>
                  <div className="border border-gray-200 p-3 rounded-lg">
                    <Label className="text-xs font-medium text-gray-700">Empty</Label>
                    <p className="text-xs text-gray-600 mt-1">"No data found" centered</p>
                  </div>
                  <div className="border border-gray-200 p-3 rounded-lg">
                    <Label className="text-xs font-medium text-gray-700">Hover</Label>
                    <p className="text-xs text-gray-600 mt-1">bg-gray-50 transition</p>
                  </div>
                </div>
              </div>

              {/* Component Responsibilities */}
              <div className="space-y-3 pt-4 border-t">
                <Label className="text-sm font-semibold text-gray-900">Responsibilities</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-green-700">✓ Table System Handles</Label>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                      <li>Rendering structure (header, body, footer)</li>
                      <li>Sticky positioning (columns, header)</li>
                      <li>Empty state display</li>
                      <li>Row hover effects</li>
                      <li>Layout and spacing</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-amber-700">⚠ Parent Component Handles</Label>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                      <li>Data fetching and management</li>
                      <li>Sorting logic and state</li>
                      <li>Filtering logic</li>
                      <li>Pagination state</li>
                      <li>Action handlers (onClick, onSort, etc.)</li>
                      <li>Column definitions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Usage Reference */}
              <div className="space-y-2 pt-4 border-t">
                <Label className="text-sm font-semibold text-gray-900">Implementation Reference</Label>
                <p className="text-xs text-gray-600">
                  This pattern is used in: InvoiceTable, PurchaseOrderTable, PortalRecordsTable, RelatedInvoicesTable.
                  See TABLE_SYSTEM_UX_PATTERN.md for complete documentation.
                </p>
              </div>
            </CardContent>
          </Card>
    </div>
  );
}
