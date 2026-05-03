import React from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  User, 
  Activity, 
  ChevronRight,
  ClipboardList
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/common/GlassCard';
import { formatDate } from '../lib/utils';

export const MedicalRecords: React.FC = () => {
  const { patients } = useApp();

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-medical-secondary font-display">Rekam Medis</h1>
          <p className="text-slate-500 font-medium">Dokumentasi klinis, riwayat terapi, dan progres pasien.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-medical-primary text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Plus size={18} />
            Input Catatan Baru
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Cari nama pasien atau ID rekam medis..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50">
          <Filter size={18} />
          Filter Cabang
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {patients.slice(0, 6).map((patient) => (
          <GlassCard key={patient.id} className="p-0 overflow-hidden group hover:scale-[1.01] transition-all">
            <div className="p-6 flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-medical-primary/10 flex items-center justify-center text-medical-primary">
                <User size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 uppercase tracking-tight">{patient.name}</h3>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">ID: {patient.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar size={14} className="text-slate-400" />
                    Kunjungan Terakhir: 18 Mei 2024
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <ClipboardList size={14} className="text-slate-400" />
                    12 Sesi Selesai
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-bold mb-3">
                <span className="text-slate-400 uppercase tracking-widest">Catatan Terakhir</span>
                <span className="text-blue-600">dr. Maya S. (Fisioterapis)</span>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                Pasien menunjukkan progres pada kekuatan otot paha kanan. Latihan beban ditingkatkan menjadi 2kg. Disarankan untuk tetap melakukan stretching mandiri di rumah.
              </p>
              <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 text-medical-primary rounded-xl text-xs font-bold hover:bg-medical-primary hover:text-white transition-all group">
                Lihat Detail Rekam Medis
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
