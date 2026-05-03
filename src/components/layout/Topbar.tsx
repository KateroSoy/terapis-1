import React, { useState } from 'react';
import { Search, Bell, Plus, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BookingModal } from '../modals/BookingModal';

export const Topbar: React.FC = () => {
  const { clinics, activeBranchId } = useApp();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const activeBranch = clinics.find(c => c.id === activeBranchId);

  return (
    <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 text-slate-600">
          <Menu size={24} />
        </button>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-medical-secondary font-display tracking-tight">
            {activeBranchId === 'ALL' ? 'Dashboard Utama' : activeBranch?.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-xs text-slate-400 font-medium tracking-wide">
              {activeBranchId === 'ALL' ? 'Konsolidasi 4 Cabang Klinik' : `Cabang ${activeBranch?.city} • Aktif`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex relative group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medical-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Cari pasien, invoice, jadwal..."
            className="w-80 bg-slate-100/50 border-none rounded-2xl pl-11 pr-4 py-2.5 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 text-slate-400 hover:bg-slate-100 rounded-xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
          
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Booking Baru</span>
          </button>
        </div>
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </header>
  );
};

