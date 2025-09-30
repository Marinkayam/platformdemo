import React, { useState, useEffect } from 'react';
import { ExceptionBanner } from '@/components/ui/exception-banner';
import { Button } from '@/components/ui/button';
import { findPOByNumber, calculateTRA, poStatusMap } from '@/data/mockPurchaseOrders';
import { POExceptionResolutionModal } from './POExceptionResolutionModal';
import { formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

interface POValidationExceptionsProps {
  poNumber?: string;
  invoiceCurrency?: string;
  invoiceTotal?: number;
  invoiceNumber?: string;
  onPOUpdate?: (newPONumber: string) => void;
}

export type POException = {
  id: string;
  type: 'not-found' | 'currency-mismatch' | 'insufficient-funds' | 'po-closed';
  title: string;
  description: string;
  severity: 'error' | 'warning';
  suggestedAction: string;
};

export function POValidationExceptions({
  poNumber = '',
  invoiceCurrency = 'USD',
  invoiceTotal = 1000,
  invoiceNumber = '',
  onPOUpdate
}: POValidationExceptionsProps) {
  const [exceptions, setExceptions] = useState<POException[]>([]);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [activeException, setActiveException] = useState<POException | null>(null);
  const [internalPONumber, setInternalPONumber] = useState(poNumber);

  // Sync internal PO with prop changes
  useEffect(() => {
    setInternalPONumber(poNumber);
  }, [poNumber]);

  const setPONumber = (newPO: string) => {
    setInternalPONumber(newPO);
  };

  useEffect(() => {
    validatePO();
  }, [internalPONumber, invoiceCurrency, invoiceTotal]);

  const validatePO = () => {
    const newExceptions: POException[] = [];

    // Only show PO exceptions for specific invoices
    const allowedInvoices = ['INV-100121309', 'INV-20241201'];
    if (!allowedInvoices.includes(invoiceNumber)) {
      setExceptions([]);
      return;
    }

    // Use internal PO number for validation (which gets updated through resolutions)
    const currentPO = internalPONumber;

    // Find PO in mock data
    const po = findPOByNumber(currentPO);

    // Skip PO not found validation - we'll handle this elsewhere
    if (!po || !currentPO) {
      setExceptions([]);
      return; // Stop validation if PO doesn't exist
    }

    // 2. Currency Mismatch Exception
    if (po.currency !== invoiceCurrency) {
      newExceptions.push({
        id: 'currency-mismatch',
        type: 'currency-mismatch',
        title: 'Currency mismatch',
        description: `The invoice currency does not match the PO currency. PO is in [${po.currency}], but invoice is in [${invoiceCurrency}].`,
        severity: 'warning',
        suggestedAction: 'Edit Invoice'
      });
    }

    // 3. PO is Closed Exception
    const standardizedStatus = poStatusMap[po.status] || po.status;
    if (po.status === 'completed' || standardizedStatus === 'Closed') {
      newExceptions.push({
        id: 'po-closed',
        type: 'po-closed',
        title: 'PO is Closed',
        description: 'This PO is marked as closed and cannot be invoiced against.',
        severity: 'error',
        suggestedAction: 'Enter a different PO'
      });
    }

    // 4. Insufficient Funds (TRA) Exception
    const tra = calculateTRA(po);
    if (invoiceTotal > tra) {
      newExceptions.push({
        id: 'insufficient-funds',
        type: 'insufficient-funds',
        title: 'Insufficient PO Funds',
        description: `This invoice exceeds the remaining available amount on the PO. Only ${formatCurrency(tra, po.currency)} remains.`,
        severity: 'warning',
        suggestedAction: 'Select another PO'
      });
    }

    setExceptions(newExceptions);
  };

  const handleActionClick = (exception: POException) => {
    if (exception.type === 'currency-mismatch') {
      // Handle Edit Invoice action
      toast.info('Invoice currency editing', {
        description: 'Opening invoice currency editor...'
      });
      // Mock: Would open invoice edit modal or redirect to edit page
      console.log('Edit Invoice clicked for currency mismatch');
      return;
    }

    // For other exceptions, open resolution modal
    setActiveException(exception);
    setShowResolutionModal(true);
  };

  const handleResolution = (data: { poNumber?: string; file?: File }) => {
    setShowResolutionModal(false);
    setActiveException(null);

    if (data.file) {
      toast.success('PO document uploaded successfully', {
        description: `File "${data.file.name}" has been uploaded for validation.`
      });
      // Simulate validation delay
      setTimeout(() => {
        setPONumber('PO-2024-001'); // Set to valid PO after upload
        if (onPOUpdate) {
          onPOUpdate('PO-2024-001');
        }
        // Re-validate with new PO
        setTimeout(() => validatePO(), 100);
      }, 1000);
    } else if (data.poNumber) {
      // Update internal PO number immediately
      setPONumber(data.poNumber);

      // Check if new PO exists and give feedback
      const newPO = findPOByNumber(data.poNumber);

      if (newPO) {
        toast.success('PO updated successfully', {
          description: `Now using PO ${data.poNumber} - Exceptions cleared!`
        });

        // Call parent callback to update the PO field display
        if (onPOUpdate) {
          onPOUpdate(data.poNumber);
        }
      } else {
        toast.error('PO not found', {
          description: `PO ${data.poNumber} does not exist in the system`
        });
      }
    }
  };

  if (exceptions.length === 0) {
    return null;
  }

  return (
    <>
      <div className="space-y-3 mb-6">
        {exceptions.map((exception) => (
          <div key={exception.id} className="animate-fade-in">
            <ExceptionBanner
              variant={exception.severity}
              icon={exception.severity === 'error' ? 'alert' : 'triangle-alert'}
              title={exception.title}
            >
              <div className="flex items-center justify-between gap-4">
                <span>{exception.description}</span>
                <Button
                  size="sm"
                  variant={exception.severity === 'error' ? 'destructive' : 'default'}
                  onClick={() => handleActionClick(exception)}
                  className="flex-shrink-0"
                >
                  {exception.suggestedAction}
                </Button>
              </div>
            </ExceptionBanner>
          </div>
        ))}
      </div>

      <POExceptionResolutionModal
        isOpen={showResolutionModal}
        onClose={() => {
          setShowResolutionModal(false);
          setActiveException(null);
        }}
        onResolve={handleResolution}
        exception={activeException}
        currentPONumber={poNumber}
        invoiceCurrency={invoiceCurrency}
        invoiceTotal={invoiceTotal}
        supplierName="Adobe" // Mock supplier name for testing
      />
    </>
  );
}