import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { Booking } from './pages/Booking';
import { Branches } from './pages/Branches';
import { LandingPage } from './pages/LandingPage';
import { Schedule } from './pages/Schedule';
import { MedicalRecords } from './pages/MedicalRecords';
import { Therapists } from './pages/Therapists';
import { Cashier } from './pages/Cashier';
import { Invoices } from './pages/Invoices';
import { Packages } from './pages/Packages';
import { FinancialReports } from './pages/FinancialReports';
import { Settings } from './pages/Settings';
import { OnlineRegistration } from './pages/OnlineRegistration';
import { AppProvider } from './context/AppContext';

const AdminLayout = () => {
  return (
    <div className="flex bg-medical-bg min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/daftar" element={<OnlineRegistration />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Booking />} />
            <Route path="patients" element={<Patients />} />
            <Route path="branches" element={<Branches />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="therapists" element={<Therapists />} />
            <Route path="cashier" element={<Cashier />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="packages" element={<Packages />} />
            <Route path="reports" element={<FinancialReports />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
