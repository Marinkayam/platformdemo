
export const RTP_STATUS_TOOLTIPS: Record<string, string> = {
  "rtp prepared": "Your request-to-pay (RTP) is ready. Monto has standardized the invoice, added the required data, and confirmed it's good to go.",
  "awaiting sc": "The RTP is waiting for Monto's Smart Connection to be ready before it can continue preparation.",
  "pending action": "Monto found exceptions while preparing the RTP—your input is needed to move forward.",
  "rtp sent": "The RTP has been sent to the buyer using their required process. You're one step closer to payment.",
  "external submission": "",
  "approved by buyer": "The buyer has approved the RTP. Payment is in progress on their side.",
  "rejected by buyer": "The buyer declined this RTP. You may need to revise and resubmit.",
  "paid": "The buyer has marked this invoice as paid in their system.",
  "settled": "Full payment received and confirmed via your payment data.",
  "partially settled": "Monto detected a partial payment for this RTP based on your payment reports.",
  "excluded": "This invoice or RTP isn't being tracked by Monto."
};

export const getRtpStatusTooltip = (status: string): string | undefined => {
  const lowerStatus = status.toLowerCase();
  return RTP_STATUS_TOOLTIPS[lowerStatus];
};
