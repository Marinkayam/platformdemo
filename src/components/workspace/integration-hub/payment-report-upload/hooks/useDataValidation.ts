
import { useState } from 'react';
import { ValidatedPaymentRecord, PAYMENT_REPORT_FIELDS } from '../types';

export function useDataValidation() {
  const [validatedData, setValidatedData] = useState<ValidatedPaymentRecord[]>([]);

  const validateData = (data: Record<string, unknown>[], mappings: { [key: string]: string }) => {
    const newValidatedData = data.map((row, index) => {
      const record: ValidatedPaymentRecord = { 
        _row: index + 2, 
        _errors: [], 
        _warnings: [], 
        _status: 'valid' 
      };
      
      PAYMENT_REPORT_FIELDS.forEach(field => {
        const mappedHeader = mappings[field.key];
        const value = mappedHeader && mappedHeader !== 'skip' ? row[mappedHeader] : undefined;

        if (value) {
          (record as any)[field.key] = value;
        } else {
          if (field.required) {
            record._errors.push(`Missing required field: ${field.label}`);
          } else if (field.conditionallyRequired) {
            // Check if the conditionally required field is missing its counterpart
            const counterpartField = PAYMENT_REPORT_FIELDS.find(f => f.label === field.conditionallyRequired);
            const counterpartValue = counterpartField ? mappings[counterpartField.key] : null;
            
            if (!counterpartValue || counterpartValue === 'skip') {
              record._errors.push(`Missing required field: ${field.label} (required when ${field.conditionallyRequired} is not provided)`);
            } else {
              record._warnings.push(`Missing optional field: ${field.label}`);
            }
          } else {
            record._warnings.push(`Missing optional field: ${field.label}`);
          }
        }
      });

      if (record._errors.length > 0) {
        record._status = 'error';
      } else if (record._warnings.length > 0) {
        record._status = 'warning';
      }
      
      return record;
    });

    setValidatedData(newValidatedData);
    return newValidatedData;
  };

  return {
    validatedData,
    setValidatedData,
    validateData,
  };
}
