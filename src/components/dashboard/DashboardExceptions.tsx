
import React from 'react';
import { ExceptionCard } from './ExceptionCard';
import { useNavigate } from 'react-router-dom';
import { ExceptionData } from '@/utils/dashboardAnalytics';

interface DashboardExceptionsProps {
  exceptionData: ExceptionData;
}

export function DashboardExceptions({ exceptionData }: DashboardExceptionsProps) {
  const navigate = useNavigate();

  const handleSmartConnectionClick = () => {
    navigate('/payments-relationships');
  };

  const handleInvoiceExceptionClick = () => {
    navigate('/invoices?status=exceptions');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div onClick={handleSmartConnectionClick} className="cursor-pointer hover:scale-105 transition-transform">
        <ExceptionCard
          title="Smart Connection Exceptions"
          subtitle="Connections needing attention"
          count={exceptionData.scExceptions.connectionCount}
          type="smartconnection"
          affectedInvoices={exceptionData.scExceptions.affectedInvoices}
        />
      </div>
      
      <div onClick={handleInvoiceExceptionClick} className="cursor-pointer hover:scale-105 transition-transform">
        <ExceptionCard
          title="Invoice Exceptions"
          subtitle="RTPs requiring manual attention"
          count={exceptionData.rtpExceptions.count}
          amount={exceptionData.rtpExceptions.totalAmount}
          type="rtp"
        />
      </div>
    </div>
  );
}
