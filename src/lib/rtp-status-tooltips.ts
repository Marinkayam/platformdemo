
export const getRTPStatusTooltip = (status: string): string => {
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, ' ').trim();
  
  switch (normalizedStatus) {
    case 'rtp prepared':
      return "Your request-to-pay (RTP) is ready. Monto has standardized the invoice, added the required data, and confirmed it's good to go.";
    case 'awaiting sc':
      return "The RTP is waiting for Monto's Smart Connection to be ready before it can continue preparation.";
    case 'pending action':
      return "Monto found exceptions while preparing the RTP—your input is needed to move forward.";
    case 'rtp sent':
      return "The RTP has been sent to the buyer using their required process. You're one step closer to payment.";
    case 'external submission':
      return ""; // Empty tooltip as specified in the table
    case 'approved by buyer':
      return "The buyer has approved the RTP. Payment is in progress on their side.";
    case 'rejected by buyer':
      return "The buyer declined this RTP. You may need to revise and resubmit.";
    case 'paid':
      return "The buyer has marked this invoice as paid in their system.";
    case 'settled':
      return "Full payment received and confirmed via your payment data.";
    case 'partially settled':
      return "Monto detected a partial payment for this RTP based on your payment reports.";
    case 'excluded':
      return "This invoice or RTP isn't being tracked by Monto.";
    default:
      return "";
  }
};
