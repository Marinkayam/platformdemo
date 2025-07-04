
import React, { useState } from 'react';
import { IntegrationHubHeader } from './IntegrationHubHeader';
import { EmailSetupCard } from './EmailSetupCard';
import { ConnectorsList } from './ConnectorsList';

import { PaymentReportUploadWizard } from './payment-report-upload/PaymentReportUploadWizard';
import { emailConnectors } from './constants';

export function IntegrationHub() {
  const [showPaymentReportWizard, setShowPaymentReportWizard] = useState(false);

  const handleUploadPaymentReport = () => {
    setShowPaymentReportWizard(true);
  };

  const handleClosePaymentReportWizard = () => {
    setShowPaymentReportWizard(false);
  };

  return (
    <div className="space-y-6">
      <IntegrationHubHeader onUploadPaymentReport={handleUploadPaymentReport} />
      <EmailSetupCard />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ConnectorsList 
          connectors={emailConnectors}
          onView={() => {}}
          onStatusChange={() => {}}
        />
      </div>
      <PaymentReportUploadWizard 
        isOpen={showPaymentReportWizard}
        onClose={handleClosePaymentReportWizard}
      />
    </div>
  );
}
