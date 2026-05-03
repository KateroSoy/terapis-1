import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  Stethoscope, 
  Wallet, 
  Receipt, 
  Package, 
  BarChart3, 
  Settings,
  ChevronDown,
  Building2,
  LogOut,
  UserCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

export const Sidebar: React.FC = () => {
  const { clinics, activeBranchId, setActiveBranchId, currentRole, setCurrentRole } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Calendar, label: 'Booking Pasien', path: '/admin/bookings' },
    { icon: Clock, label: 'Jadwal Terapi', path: '/admin/schedule' },
    { icon: Users, label: 'Data Pasien', path: '/admin/patients' },
    { icon: FileText, label: 'Rekam Medis', path: '/admin/medical-records' },
    { icon: Stethoscope, label: 'Terapis', path: '/admin/therapists' },
    { icon: Wallet, label: 'Kasir', path: '/admin/cashier' },
    { icon: Receipt, label: 'Invoice', path: '/admin/invoices' },
    { icon: Package, label: 'Paket Terapi', path: '/admin/packages' },
    { icon: BarChart3, label: 'Laporan', path: '/admin/reports' },
    ...(currentRole === 'OWNER' ? [{ icon: Building2, label: 'Manajemen Cabang', path: '/admin/branches' }] : []),
    { icon: Settings, label: 'Pengaturan', path: '/admin/settings' },
  ];

  const roles = [
    { value: 'OWNER', label: 'Owner / Super Admin' },
    { value: 'ADMIN_CABANG', label: 'Admin Cabang' },
    { value: 'TERAPIS', label: 'Terapis' },
    { value: 'KASIR', label: 'Kasir' },
    { value: 'MANAGER_KLINIK', label: 'Manager Klinik' },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shrink-0 overflow-y-auto scrollbar-hide">
      <div className="p-6 mb-2">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-medical-primary to-medical-accent bg-clip-text text-transparent font-display">
          KlinikTerapis<span className="text-medical-secondary">Pro</span>
        </h1>
        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Multi Clinic System</p>
      </div>

      <div className="px-4 mb-8">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
          <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Pilih Cabang</label>
          <div className="relative group">
            <select 
              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold appearance-none focus:outline-none focus:ring-4 focus:ring-blue-500/5 group-hover:border-blue-300 transition-all cursor-pointer"
              value={activeBranchId}
              onChange={(e) => setActiveBranchId(e.target.value)}
            >
              <option value="ALL">📍 Semua Klinik (Consolidated)</option>
              {clinics.map(c => (
                <option key={c.id} value={c.id}>🏥 {c.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
              location.pathname === item.path 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
            )}
          >
            <item.icon size={20} className={cn(location.pathname === item.path ? "text-white" : "text-slate-400")} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 pt-0">
        <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100/50">
          <label className="text-[10px] font-bold text-blue-400 uppercase mb-2 block">Demo Role</label>
          <div className="relative mb-4">
            <select 
              className="w-full bg-white border border-blue-100 rounded-xl px-3 py-1.5 text-xs font-bold text-blue-600 appearance-none focus:outline-none cursor-pointer"
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as any)}
            >
              {roles.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <UserCircle size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 pointer-events-none" />
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-blue-100">
              <UserCircle className="text-blue-500" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">Iwan Kurniawan</p>
              <p className="text-[10px] text-blue-500 font-medium capitalize">{currentRole.replace('_', ' ').toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
