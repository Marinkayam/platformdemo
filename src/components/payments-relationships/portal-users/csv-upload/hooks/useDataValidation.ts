import { useState } from 'react';
import { ValidatedUser } from '../types';
import { MONTO_FIELDS } from '../types';

export function useDataValidation() {
  const [validatedData, setValidatedData] = useState<ValidatedUser[]>([]);

  const validateData = (data: any[], mappings: { [key: string]: string }) => {
    const newValidatedData = data.map((row, index) => {
      const user: ValidatedUser = { _row: index + 2, _errors: [], _warnings: [], _status: 'valid' };
      
      MONTO_FIELDS.forEach(field => {
        const mappedHeader = mappings[field.key];
        const value = mappedHeader && mappedHeader !== 'skip' ? row[mappedHeader] : undefined;

        if (value) {
          (user as any)[field.key] = value;
        } else {
          if (field.required) {
            user._errors.push(`Missing required field: ${field.label}`);
          } else {
            user._warnings.push(`Missing optional field: ${field.label}`);
          }
        }
      });

      if (user._errors.length > 0) {
        user._status = 'error';
      } else if (user._warnings.length > 0) {
        user._status = 'warning';
      }
      
      return user;
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
