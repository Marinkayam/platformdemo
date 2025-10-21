
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import AddAgent from "./pages/AddAgent";
import PurchaseOrders from "./pages/PurchaseOrders";
import PurchaseOrderDetail from "./pages/PurchaseOrderDetail";
import PortalRecords from "./pages/PortalRecords";
import PortalRecordDetail from "./pages/PortalRecordDetail";
import Workspace from "./pages/Workspace";
import Settings from "./pages/Settings";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import DesignSystemPlayground from "./pages/DesignSystemPlayground";
import Onboarding from "./pages/Onboarding";
import PaymentsRelationships from "./pages/PaymentsRelationships";
import SmartConnections from "./pages/SmartConnections";
import ScanAgents from "./pages/ScanAgents";
import NewPaymentsRelationship from "./pages/NewPaymentsRelationship";
import { NotificationsProvider } from "./context/NotificationsContext";
import { CompanyProvider } from "./context/CompanyContext";
import { LayoutProvider } from "./context/LayoutContext";
import PortalsDashboard from "./pages/PortalsDashboard";
import PortalsDashboard2 from "./pages/PortalsDashboard2";
import SecretHomePage from "./pages/SecretHomePage";
import SecretDashboard from "./pages/SecretDashboard";
import SecretScanAgents from "./pages/SecretScanAgents";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CompanyProvider>
        <NotificationsProvider>
          <LayoutProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/secret-home" element={<SecretHomePage />} />

            {/* Routes requiring MainLayout */}
            <Route element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/secret-dashboard" element={<SecretDashboard />} />
              <Route path="/portals-dashboard" element={<PortalsDashboard />} />
              <Route path="/portals-dashboard-2" element={<PortalsDashboard2 />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/:id" element={<InvoiceDetail />} />
              <Route path="/portal-records" element={<PortalRecords />} />
              <Route path="/portal-records/:id" element={<PortalRecordDetail />} />
              <Route path="/payments-relationships" element={<PaymentsRelationships />} />
              <Route path="/payments-relationships/new" element={<NewPaymentsRelationship />} />
              <Route path="/purchase-orders" element={<PurchaseOrders />} />
              <Route path="/purchase-orders/:id" element={<PurchaseOrderDetail />} />
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/design-system" element={<DesignSystemPlayground />} />
              <Route path="/smart-connections" element={<SmartConnections />} />
              <Route path="/scan-agents" element={<ScanAgents />} />
              <Route path="/secret-scan-agents" element={<SecretScanAgents />} />
              <Route path="/request-to-pay-transaction/:id" element={<div>RequestToPayTransaction Page Placeholder</div>} />
              <Route path="/payments-relationships/add-agent" element={<AddAgent />} />
            </Route>

            {/* Fallback for undefined routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
            </BrowserRouter>
          </LayoutProvider>
        </NotificationsProvider>
      </CompanyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
