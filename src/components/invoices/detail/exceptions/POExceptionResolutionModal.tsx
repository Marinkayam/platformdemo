import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Upload, FileText, Check, AlertCircle, CheckCircle } from 'lucide-react';
import { mockPurchaseOrders, findPOByNumber, calculateTRA, poStatusMap } from '@/data/mockPurchaseOrders';
import { POException } from './POValidationExceptions';
import { formatCurrency } from '@/lib/utils';

interface POExceptionResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResolve: (data: { poNumber?: string; file?: File }) => void;
  exception: POException | null;
  currentPONumber?: string;
  invoiceCurrency?: string;
  invoiceTotal?: number;
  supplierName?: string;
}

export function POExceptionResolutionModal({
  isOpen,
  onClose,
  onResolve,
  exception,
  currentPONumber,
  invoiceCurrency = 'USD',
  invoiceTotal = 1000,
  supplierName = ''
}: POExceptionResolutionModalProps) {
  const [resolutionMethod, setResolutionMethod] = useState<'upload' | 'manual' | 'suggested'>('manual');
  const [manualPONumber, setManualPONumber] = useState('');
  const [selectedSuggestedPO, setSelectedSuggestedPO] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [validationState, setValidationState] = useState<{
    isValid: boolean;
    message: string;
    po?: any;
  } | null>(null);

  // Smart filtering for suggested POs
  const getSuggestedPOs = () => {
    return mockPurchaseOrders.filter(po => {
      // Exclude current PO
      if (po.poNumber === currentPONumber) return false;

      // Exclude closed/cancelled POs
      if (po.status === 'completed' || po.status === 'cancelled') return false;

      // Same supplier (match supplier field or buyer field as fallback)
      const supplierMatch = po.supplier === supplierName || po.buyer === supplierName;
      if (!supplierMatch && supplierName) return false;

      // Same currency as invoice
      if (po.currency !== invoiceCurrency) return false;

      // TRA >= invoice total
      const tra = calculateTRA(po);
      if (tra < invoiceTotal) return false;

      return true;
    }).slice(0, 3); // Show max 3 suggestions
  };

  const suggestedPOs = getSuggestedPOs();

  // Validate PO number in real-time
  useEffect(() => {
    if (resolutionMethod === 'manual' && manualPONumber.trim()) {
      const po = findPOByNumber(manualPONumber.trim());

      if (!po) {
        setValidationState({
          isValid: false,
          message: `PO ${manualPONumber} not found in system`
        });
      } else {
        // Check for potential issues
        const tra = calculateTRA(po);
        const standardizedStatus = poStatusMap[po.status] || po.status;

        if (po.status === 'completed' || standardizedStatus === 'Closed') {
          setValidationState({
            isValid: false,
            message: `PO ${manualPONumber} is closed and cannot be used`,
            po
          });
        } else if (po.currency !== 'USD') { // Assuming USD invoice
          setValidationState({
            isValid: true,
            message: `⚠️ Currency mismatch: PO is in ${po.currency}, invoice is in USD`,
            po
          });
        } else if (tra < 738313.77) { // Invoice amount
          setValidationState({
            isValid: false,
            message: `Insufficient funds: ${formatCurrency(tra, po.currency)} remaining`,
            po
          });
        } else {
          setValidationState({
            isValid: true,
            message: `Valid PO: ${formatCurrency(tra, po.currency)} available`,
            po
          });
        }
      }
    } else {
      setValidationState(null);
    }
  }, [manualPONumber, resolutionMethod]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleResolve = () => {
    if (resolutionMethod === 'upload' && uploadedFile) {
      onResolve({ file: uploadedFile });
    } else if (resolutionMethod === 'manual' && manualPONumber) {
      onResolve({ poNumber: manualPONumber });
    } else if (resolutionMethod === 'suggested' && selectedSuggestedPO) {
      onResolve({ poNumber: selectedSuggestedPO });
    }
  };

  const isResolveEnabled = () => {
    if (resolutionMethod === 'upload') return !!uploadedFile;
    if (resolutionMethod === 'manual') return !!manualPONumber && validationState?.isValid;
    if (resolutionMethod === 'suggested') return !!selectedSuggestedPO;
    return false;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Resolve PO Exception</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-6">
          {exception && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">{exception.title}</h4>
              <p className="text-sm text-gray-600">{exception.description}</p>
            </div>
          )}

          <RadioGroup value={resolutionMethod} onValueChange={(value) => setResolutionMethod(value as any)} className="space-y-6">
            {/* Option 1: Upload New PO */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="upload" id="upload" />
                <Label htmlFor="upload" className="font-medium">Upload new PO document</Label>
              </div>
              {resolutionMethod === 'upload' && (
                <div className="ml-6 space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="po-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="po-upload" className="cursor-pointer">
                      {uploadedFile ? (
                        <div className="flex items-center justify-center gap-3">
                          <FileText className="h-8 w-8 text-green-600" />
                          <div className="text-left">
                            <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                            <p className="text-sm text-gray-500">Click to change file</p>
                          </div>
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-600">Click to upload PO document</p>
                          <p className="text-sm text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Option 2: Manual PO Entry */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="manual" id="manual" />
                <Label htmlFor="manual" className="font-medium">Enter PO number manually</Label>
              </div>
              {resolutionMethod === 'manual' && (
                <div className="ml-6 space-y-3">
                  <div className="relative">
                    <Input
                      placeholder="e.g., PO-2024-001"
                      value={manualPONumber}
                      onChange={(e) => setManualPONumber(e.target.value)}
                      className={`max-w-xs pr-10 ${
                        validationState
                          ? validationState.isValid
                            ? 'border-green-500 focus:ring-green-500'
                            : 'border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                    />
                    {validationState && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {validationState.isValid ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Validation feedback */}
                  {validationState && (
                    <div className={`text-sm ${
                      validationState.isValid ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {validationState.message}
                    </div>
                  )}

                  {/* PO Details Preview */}
                  {validationState?.po && validationState.isValid && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                      <div className="font-medium text-green-900 mb-1">PO Details:</div>
                      <div className="space-y-1 text-green-700">
                        <div>Status: {poStatusMap[validationState.po.status] || validationState.po.status}</div>
                        <div>Currency: {validationState.po.currency}</div>
                        <div>Available: {formatCurrency(calculateTRA(validationState.po), validationState.po.currency)}</div>
                        <div>Buyer: {validationState.po.buyer}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Option 3: Suggested POs */}
            {suggestedPOs.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="suggested" id="suggested" />
                  <Label htmlFor="suggested" className="font-medium">Select from suggested POs ({suggestedPOs.length} found)</Label>
                </div>
                {resolutionMethod === 'suggested' && (
                  <div className="ml-6 space-y-2">
                    {suggestedPOs.map((po) => {
                      const tra = calculateTRA(po);
                      return (
                        <div
                          key={po.id}
                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                            selectedSuggestedPO === po.poNumber
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedSuggestedPO(po.poNumber)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <p className="font-medium text-sm">{po.poNumber}</p>
                              </div>
                              <p className="text-xs text-gray-600">
                                Buyer: {po.buyer} • {po.currency} • TRA: {formatCurrency(tra, po.currency)}
                              </p>
                            </div>
                            {selectedSuggestedPO === po.poNumber && (
                              <Check className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleResolve} disabled={!isResolveEnabled()}>
            Resolve Exception
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}