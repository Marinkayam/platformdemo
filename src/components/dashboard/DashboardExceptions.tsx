
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
      <ExceptionCard
        title="Smart Connection Exceptions"
        subtitle="Connections needing attention"
        count={exceptionData.scExceptions.connectionCount}
        type="smartconnection"
        affectedInvoices={exceptionData.scExceptions.affectedInvoices}
        onCardClick={handleSmartConnectionClick}
        onButtonClick={handleSmartConnectionClick}
        buttonText="View Connections"
      />
      
      <ExceptionCard
        title="Invoice Exceptions"
        subtitle="RTPs requiring manual attention"
        count={exceptionData.rtpExceptions.count}
        amount={exceptionData.rtpExceptions.totalAmount}
        type="rtp"
        onCardClick={handleInvoiceExceptionClick}
        onButtonClick={handleInvoiceExceptionClick}
        buttonText="Resolve Exceptions"
      />
    </div>
  );
}
