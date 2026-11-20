import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';

// ── Lazy-loaded pages ──
const CustomerMenuPage = lazy(() => import('./pages/CustomerMenuPage'));
const KitchenPage = lazy(() => import('./pages/KitchenPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage'));
const BillViewPage = lazy(() => import('./pages/BillViewPage'));
const AppHomePage = lazy(() => import('./pages/AppHomePage'));

// Loading spinner
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B0A08]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-amber-500/30 border-t-amber-400 rounded-full animate-spin" />
        <p className="text-stone-400 text-xs font-bold uppercase tracking-wider">Loading DEMO Menu…</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Primary Customer Dine-in QR Experience */}
              <Route path="/" element={<CustomerMenuPage />} />
              <Route path="/table/:tableNum" element={<CustomerMenuPage />} />
              <Route path="/menu" element={<CustomerMenuPage />} />
              <Route path="/customer-menu" element={<CustomerMenuPage />} />

              {/* Bill & Payment */}
              <Route path="/bill" element={<BillViewPage />} />
              <Route path="/bill/:code" element={<BillViewPage />} />

              {/* Kitchen Display System */}
              <Route path="/kitchen" element={<KitchenPage />} />

              {/* Manager & Admin Dashboard */}
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Staff POS Station */}
              <Route path="/pos" element={<AppHomePage />} />
              <Route path="/order-taking" element={<AppHomePage initialSection="ORDER_ONLY" />} />
              <Route path="/billing-suite" element={<AppHomePage initialSection="BILLING_SUITE" />} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </ErrorBoundary>
  );
}
