
import { useState } from "react";
import { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/lib/utils";

interface ComparisonTableProps {
  currentInvoice: Invoice;
  duplicateInvoice: Invoice;
}

export function ComparisonTable({ currentInvoice, duplicateInvoice }: ComparisonTableProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrolled = e.currentTarget.scrollLeft > 0;
    setIsScrolled(scrolled);
  };

  const comparisonData = [
    { 
      field: 'Invoice Number', 
      current: currentInvoice.number, 
      duplicate: duplicateInvoice.number 
    },
    { 
      field: 'Buyer', 
      current: currentInvoice.buyer, 
      duplicate: duplicateInvoice.buyer 
    },
    { 
      field: 'Amount', 
      current: formatCurrency(currentInvoice.total, currentInvoice.currency), 
      duplicate: formatCurrency(duplicateInvoice.total, duplicateInvoice.currency) 
    },
    { 
      field: 'Due Date', 
      current: currentInvoice.dueDate, 
      duplicate: duplicateInvoice.dueDate 
    },
    { 
      field: 'Portal', 
      current: currentInvoice.portal || 'N/A', 
      duplicate: duplicateInvoice.portal || 'N/A' 
    },
    { 
      field: 'Submit Method', 
      current: currentInvoice.submitMethod || 'N/A', 
      duplicate: duplicateInvoice.submitMethod || 'N/A' 
    },
    { 
      field: 'Submitted At', 
      current: currentInvoice.submittedAt ? new Date(currentInvoice.submittedAt).toLocaleString() : 'N/A', 
      duplicate: duplicateInvoice.submittedAt ? new Date(duplicateInvoice.submittedAt).toLocaleString() : 'N/A' 
    }
  ];

  return (
    <div className="rounded-xl border overflow-hidden bg-white">
      <div 
        className="overflow-x-auto"
        onScroll={handleScroll}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#e5e7eb transparent'
        }}
      >
        <style dangerouslySetInnerHTML={{
          __html: `
            div::-webkit-scrollbar { height: 4px; }
            div::-webkit-scrollbar-track { background: transparent; }
            div::-webkit-scrollbar-thumb { 
              background-color: #e5e7eb; 
              border-radius: 2px; 
            }
            div::-webkit-scrollbar-thumb:hover { background-color: #d1d5db; }
          `
        }} />
        <table 
          className="w-full"
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          <thead>
            <tr style={{ height: '65px', backgroundColor: '#F6F7F9' }}>
              <th className="px-4 text-left text-sm font-semibold text-gray-700 min-w-[200px]">
                Current (Original)
              </th>
              <th className="px-4 text-left text-sm font-semibold text-gray-700 min-w-[200px]">
                Duplication (New)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {comparisonData.map((row, index) => {
              const isDifferent = row.current !== row.duplicate;
              return (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 transition-colors bg-white"
                  style={{ height: '65px' }}
                >
                  <td className={`px-4 text-sm ${isDifferent ? 'font-medium text-gray-900' : 'font-normal text-gray-700'}`}>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 mb-1">{row.field}</span>
                      <span>{row.current}</span>
                    </div>
                  </td>
                  <td className={`px-4 text-sm ${isDifferent ? 'font-medium text-gray-900' : 'font-normal text-gray-700'}`}>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500 mb-1">{row.field}</span>
                      <span>{row.duplicate}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
