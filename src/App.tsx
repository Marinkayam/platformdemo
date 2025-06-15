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
import Workspace from "./pages/Workspace";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import DesignSystemPlayground from "./pages/DesignSystemPlayground";
import Onboarding from "./pages/Onboarding";
import PaymentsRelationships from "./pages/PaymentsRelationships";
import NewPaymentsRelationship from "./pages/NewPaymentsRelationship";
import { NotificationsProvider } from "./context/NotificationsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/welcome" element={<Welcome />} />

            {/* Routes requiring MainLayout */}
            <Route element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/:id" element={<InvoiceDetail />} />
              <Route path="/portal-records" element={<PortalRecords />} />
              <Route path="/payments-relationships" element={<PaymentsRelationships />} />
              <Route path="/payments-relationships/new" element={<NewPaymentsRelationship />} />
              <Route path="/purchase-orders" element={<PurchaseOrders />} />
              <Route path="/purchase-orders/:id" element={<PurchaseOrderDetail />} />
              <Route path="/workspace" element={<Workspace />} />
              <Route path="/design-system" element={<DesignSystemPlayground />} />
              <Route path="/request-to-pay-transaction/:id" element={<div>RequestToPayTransaction Page Placeholder</div>} />
              <Route path="/payments-relationships/add-agent" element={<AddAgent />} />
            </Route>

            {/* Fallback for undefined routes */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
