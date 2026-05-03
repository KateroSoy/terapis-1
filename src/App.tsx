import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { Dashboard } from './pages/Dashboard';
import { Patients } from './pages/Patients';
import { Booking } from './pages/Booking';
import { Branches } from './pages/Branches';
import { LandingPage } from './pages/LandingPage';
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

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
    <h2 className="text-2xl font-bold uppercase tracking-widest">{title}</h2>
    <p className="font-medium mt-2">Segera Hadir: Modul Lengkap {title} multi-cabang.</p>
  </div>
);

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Booking />} />
            <Route path="patients" element={<Patients />} />
            <Route path="branches" element={<Branches />} />
            <Route path="schedule" element={<PlaceholderPage title="Jadwal Terapi" />} />
            <Route path="medical-records" element={<PlaceholderPage title="Rekam Medis" />} />
            <Route path="therapists" element={<PlaceholderPage title="Data Terapis" />} />
            <Route path="cashier" element={<PlaceholderPage title="Kasir / POS" />} />
            <Route path="invoices" element={<PlaceholderPage title="Daftar Invoice" />} />
            <Route path="packages" element={<PlaceholderPage title="Paket Terapi" />} />
            <Route path="reports" element={<PlaceholderPage title="Laporan Keuangan" />} />
            <Route path="settings" element={<PlaceholderPage title="Pengaturan Sistem" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
