
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import SmartConnections from "./pages/SmartConnections";
import AddAgent from "./pages/AddAgent";
import NewSmartConnection from "./pages/NewSmartConnection";
import PurchaseOrders from "./pages/PurchaseOrders";
import PurchaseOrderDetail from "./pages/PurchaseOrderDetail";
import PortalRecords from "./pages/PortalRecords";
import Settings from "./pages/Settings";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import DesignSystemPlayground from "./pages/DesignSystemPlayground";
import Onboarding from "./pages/Onboarding";
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
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/design-system" element={<DesignSystemPlayground />} />
            <Route 
              path="/dashboard" 
              element={
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              } 
            />
            <Route 
              path="/invoices" 
              element={
                <MainLayout>
                  <Invoices />
                </MainLayout>
              } 
            />
            <Route 
              path="/invoices/:id" 
              element={
                <MainLayout>
                  <InvoiceDetail />
                </MainLayout>
              } 
            />
            <Route 
              path="/smart-connections" 
              element={
                <MainLayout>
                  <SmartConnections />
                </MainLayout>
              } 
            />
            <Route 
              path="/smart-connections/add-agent" 
              element={
                <MainLayout>
                  <AddAgent />
                </MainLayout>
              } 
            />
            <Route 
              path="/smart-connections/new-connection" 
              element={
                <MainLayout>
                  <NewSmartConnection />
                </MainLayout>
              } 
            />
            <Route 
              path="/purchase-orders" 
              element={
                <MainLayout>
                  <PurchaseOrders />
                </MainLayout>
              } 
            />
            <Route 
              path="/purchase-orders/:id" 
              element={
                <MainLayout>
                  <PurchaseOrderDetail />
                </MainLayout>
              } 
            />
            <Route 
              path="/portal-records" 
              element={
                <MainLayout>
                  <PortalRecords />
                </MainLayout>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <MainLayout>
                  <Settings />
                </MainLayout>
              } 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
