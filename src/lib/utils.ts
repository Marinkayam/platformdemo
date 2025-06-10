import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });
}

export const formatOwnerName = (owner: string): string => {
  if (owner.includes('@')) {
    const namePart = owner.split('@')[0];
    return namePart.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  return owner;
};

export const getPortalLogoUrl = (portalName: string): string => {
  const logoMap: { [key: string]: string } = {
    "SAP Ariba": "ariba.png",
    "Coupa": "coupa.png",
    "Oracle Procurement": "oracle.png",
    "Tipalti": "tipalti.png",
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
    "Tungsten": "tungsten.png",
    "Walmart": "walmart.png",
  };
  
  const fileName = logoMap[portalName];
  if (fileName) {
    return `/portal-logos/${fileName}`;
  } else {
    return '/portal-logos/placeholder.svg'; // Use a placeholder for unknown logos
  }
};
