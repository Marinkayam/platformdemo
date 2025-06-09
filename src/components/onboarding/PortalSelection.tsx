import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Building } from 'lucide-react';

interface PortalOption {
  id: string;
  name: string;
  category: 'popular' | 'other';
}

const getPortalLogoUrl = (portalName: string): string => {
  const logoMap: { [key: string]: string } = {
    "Coupa": "coupa.png",
    "SAP Ariba": "ariba.png",
    "Oracle Procurement": "oracle.png",
    "Jaggaer": "jagger.png",
    "SAP Concur": "Amazon Payee.png", // This will now use the Amazon logo
    "Workday": "generic-a.png", // Placeholder if no specific logo
    "NetSuite": "generic-circles.png", // Placeholder if no specific logo
    "Amazon Payee": "Amazon Payee.png",
    "Apple": "apple.png",
    "AT&T": "AT&T.png",
    "Bill": "bill.png",
    "Facturaxion": "Facturaxion.png",
    "Fieldglass": "Fieldglass.png",
    "iSupplier": "iSupplier.png",
    "KissFlow": "KissFlow.png",
    "Qualcomm": "Qualcomm.png",
    "Sainsburys": "Sainsburys.png",
    "Segment": "Segment.png",
    "Shopify": "shopify.png",
    "StoreNext": "StoreNext.png",
    "Taulia": "taulia.png",
    "Teradata": "Teradata.png",
    "Tipalti": "tipalti.png",
    "Tungsten": "tungsten.png",
    "Walmart": "walmart.png",
  };
  return `/portal-logos/${logoMap[portalName] || portalName.toLowerCase().replace(/\s/g, '-') + '.png'}`;
};

const portals: PortalOption[] = [
  { id: 'coupa', name: 'Coupa', category: 'popular' },
  { id: 'sap-ariba', name: 'SAP Ariba', category: 'popular' },
  { id: 'oracle-procurement', name: 'Oracle Procurement', category: 'popular' },
  { id: 'jaggaer', name: 'Jaggaer', category: 'popular' },
  { id: 'sap-concur', name: 'SAP Concur', category: 'other' },
  { id: 'workday', name: 'Workday', category: 'other' },
  { id: 'netsuite', name: 'NetSuite', category: 'other' },
  { id: 'amazon-payee', name: 'Amazon Payee', category: 'popular' },
  { id: 'apple', name: 'Apple', category: 'other' },
  { id: 'at-t', name: 'AT&T', category: 'other' },
  { id: 'bill', name: 'Bill', category: 'other' },
  { id: 'facturaxion', name: 'Facturaxion', category: 'other' },
  { id: 'fieldglass', name: 'Fieldglass', category: 'other' },
  { id: 'isupplier', name: 'iSupplier', category: 'other' },
  { id: 'kissflow', name: 'KissFlow', category: 'other' },
  { id: 'qualcomm', name: 'Qualcomm', category: 'other' },
  { id: 'sainsburys', name: 'Sainsburys', category: 'other' },
  { id: 'segment', name: 'Segment', category: 'other' },
  { id: 'shopify', name: 'Shopify', category: 'other' },
  { id: 'storenext', name: 'StoreNext', category: 'other' },
  { id: 'taulia', name: 'Taulia', category: 'other' },
  { id: 'teradata', name: 'Teradata', category: 'other' },
  { id: 'tipalti', name: 'Tipalti', category: 'other' },
  { id: 'tungsten', name: 'Tungsten', category: 'other' },
  { id: 'walmart', name: 'Walmart', category: 'other' },
  { id: 'custom', name: 'Add Custom Portal', category: 'other' }
];

interface PortalSelectionProps {
  value: string;
  onChange: (value: string) => void;
}

export function PortalSelection({ value, onChange }: PortalSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPortals = portals.filter(portal =>
    portal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const popularPortals = filteredPortals.filter(p => p.category === 'popular');
  const otherPortals = filteredPortals.filter(p => p.category === 'other');

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-grey-800">Portal</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select the portal to connect" />
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-grey-400" />
              <Input
                placeholder="Search portals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          {popularPortals.length > 0 && (
            <>
              <div className="px-2 py-1 text-xs font-semibold text-grey-500 uppercase tracking-wide">
                Popular Portals
              </div>
              {popularPortals.map(portal => (
                <SelectItem key={portal.id} value={portal.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-background-paper flex items-center justify-center overflow-hidden border border-grey-300">
                      <img src={getPortalLogoUrl(portal.name)} alt={`${portal.name} logo`} className="w-full h-full object-contain" />
                    </div>
                    {portal.name}
                  </div>
                </SelectItem>
              ))}
            </>
          )}
          {otherPortals.length > 0 && (
            <>
              <div className="px-2 py-1 text-xs font-semibold text-grey-500 uppercase tracking-wide">
                Other Portals
              </div>
              {otherPortals.map(portal => (
                <SelectItem key={portal.id} value={portal.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-background-paper flex items-center justify-center overflow-hidden border border-grey-300">
                      <img src={getPortalLogoUrl(portal.name)} alt={`${portal.name} logo`} className="w-full h-full object-contain" />
                    </div>
                    {portal.name}
                  </div>
                </SelectItem>
              ))}
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
