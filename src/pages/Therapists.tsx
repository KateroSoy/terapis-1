import React from 'react';
import { 
  Stethoscope, 
  MapPin, 
  Phone, 
  Star,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/common/GlassCard';

export const Therapists: React.FC = () => {
  const { therapists, clinics, activeBranchId } = useApp();

  const filteredTherapists = activeBranchId === 'ALL'
    ? therapists
    : therapists.filter(t => t.branchId === activeBranchId);

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-medical-secondary font-display">Data Terapis</h1>
          <p className="text-slate-500 font-medium">Manajemen tenaga ahli medis di seluruh cabang.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-medical-primary text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Plus size={18} />
            Tambah Terapis
          </button>
        </div>
      </div>

      <div className="relative group max-w-md">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Cari nama terapis atau spesialisasi..." 
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTherapists.map((therapist) => {
          const branch = clinics.find(c => c.id === therapist.branchId);
          return (
            <GlassCard key={therapist.id} className="group hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${therapist.name}&background=E0F2FE&color=0369A1&bold=true`} 
                      alt={therapist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white">
                    <CheckCircle2 size={12} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 truncate group-hover:text-medical-primary transition-colors">
                    {therapist.name}
                  </h3>
                  <p className="text-xs font-bold text-blue-600 bg-blue-50 inline-block px-2 py-0.5 rounded mt-1 uppercase tracking-wider">
                    {therapist.specialization}
                  </p>
                  <div className="flex items-center gap-1.5 mt-2 text-slate-500">
                    <MapPin size={14} />
                    <span className="text-xs font-medium truncate">{branch?.name || 'Cabang Tidak Diketahui'}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Status</p>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                    Aktif
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1">Pasien</p>
                  <span className="text-xs font-bold text-slate-700">
                    24 Pasien/Bulan
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all">
                  <Phone size={14} /> Hubungi
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-100 transition-all">
                  <Calendar size={14} /> Jadwal
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};
