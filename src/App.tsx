
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
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
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
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
