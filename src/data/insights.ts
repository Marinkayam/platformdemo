
import { Insight } from "@/types/insights";

export const mockInsights: Insight[] = [
  {
    id: "1",
    supplier: "Tech Solutions Inc.",
    buyer: "Acme Corporation",
    openPOs: 15,
    approvedInvoices: 142,
    invoicesInRisk: 3,
    paymentHabit: {
      dso: 28,
      terms: "Net 30",
      score: "Excellent"
    }
  },
  {
    id: "2",
    supplier: "Global Supplies Ltd.",
    buyer: "Mega Corp",
    openPOs: 8,
    approvedInvoices: 89,
    invoicesInRisk: 7,
    paymentHabit: {
      dso: 45,
      terms: "Net 45",
      score: "Good"
    }
  },
  {
    id: "3",
    supplier: "Office Essentials",
    buyer: "StartupXYZ",
    openPOs: 22,
    approvedInvoices: 234,
    invoicesInRisk: 12,
    paymentHabit: {
      dso: 60,
      terms: "Net 30",
      score: "Fair"
    }
  },
  {
    id: "4",
    supplier: "Manufacturing Co.",
    buyer: "Enterprise Inc.",
    openPOs: 5,
    approvedInvoices: 67,
    invoicesInRisk: 2,
    paymentHabit: {
      dso: 25,
      terms: "Net 15",
      score: "Excellent"
    }
  },
  {
    id: "5",
    supplier: "Digital Services",
    buyer: "Tech Giant",
    openPOs: 18,
    approvedInvoices: 156,
    invoicesInRisk: 15,
    paymentHabit: {
      dso: 75,
      terms: "Net 60",
      score: "Poor"
    }
  }
];
