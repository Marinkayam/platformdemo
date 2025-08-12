import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
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
    "Oracle": "oracle.png",
    "Tipalti": "tipalti.png",
    "Amazon": "amazon.png",
    "Apple": "apple.png",
    "AT&T": "AT&T.png",
    "Bill.com": "bill.png",
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
    "Workday": "workday.png",
    "Meta": "meta.svg",
    "Tradeshift": "tradeshift.svg",
    "OpenText": "opentext.svg",
  };
  
  const fileName = logoMap[portalName];
  if (fileName) {
    return `/portal-logos/${fileName}`;
  } else {
    return '/portal-logos/placeholder.svg'; // Use a placeholder for unknown logos
  }
};
