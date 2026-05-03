import React from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Phone, 
  MapPin, 
  TrendingUp,
  CreditCard,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard, StatusBadge } from '../components/common/GlassCard';
import { formatCurrency, cn } from '../lib/utils';

export const Patients: React.FC = () => {
  const { patients, clinics, activeBranchId } = useApp();

  const filteredPatients = activeBranchId === 'ALL' 
    ? patients 
    : patients.filter(p => p.primaryBranchId === activeBranchId);

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-medical-secondary font-display tracking-tight">Database Pasien</h2>
          <p className="text-slate-400 text-sm font-medium mt-1">Kelola riwayat medis dan administrasi seluruh pasien klinik</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <TrendingUp size={18} />
            Export Data
          </button>
          <button className="flex items-center gap-2 bg-medical-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-600/20 transition-all active:scale-95">
            <Plus size={18} />
            Tambah Pasien
          </button>
        </div>
      </div>

      <GlassCard noPadding className="overflow-hidden border-none shadow-2xl shadow-blue-900/5">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative flex-1 group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medical-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Cari nama, No. HP, atau ID pasien..."
              className="w-full md:w-80 bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-2.5 text-sm font-medium focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-colors">
              <Filter size={14} className="text-slate-400" />
              <select className="text-xs font-bold text-slate-600 bg-transparent outline-none cursor-pointer">
                <option>Semua Layanan</option>
                <option>Fisioterapi</option>
                <option>Terapi Wicara</option>
                <option>Okupasi Terapi</option>
              </select>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-blue-300 transition-colors">
              <Building2 size={14} className="text-slate-400" />
              <select className="text-xs font-bold text-slate-600 bg-transparent outline-none cursor-pointer">
                <option>Semua Cabang</option>
                {clinics.map(c => <option key={c.id} value={c.id}>{c.city}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 bg-slate-50/20">
                <th className="py-5 px-6">Nama Pasien</th>
                <th className="py-5 px-6 text-center">Usia</th>
                <th className="py-5 px-6">Kontak</th>
                <th className="py-5 px-6">Cabang Utama</th>
                <th className="py-5 px-6">Layanan Terakhir</th>
                <th className="py-5 px-6">Tagihan</th>
                <th className="py-5 px-6">Status</th>
                <th className="py-5 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="group hover:bg-blue-50/40 transition-colors">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center text-medical-primary font-bold text-sm shadow-sm border border-blue-100/50">
                        {patient.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-medical-secondary group-hover:text-medical-primary transition-colors font-display tracking-tight">
                          {patient.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: #P-{patient.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center">
                    <span className="text-sm font-semibold text-slate-600">{patient.age}th</span>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Phone size={12} className="text-medical-primary opacity-60" />
                        <span className="text-xs font-semibold">{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <MapPin size={12} className="opacity-60" />
                        <span className="text-[10px] font-medium line-clamp-1">{patient.address}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-start">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        {clinics.find(c => c.id === patient.primaryBranchId)?.city}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-medical-primary bg-blue-50 px-2 py-1 rounded-md w-fit">
                        {patient.therapyType}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold tracking-tight">{patient.lastVisit}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-1.5">
                      <CreditCard size={14} className={cn(patient.outstandingBill > 0 ? "text-rose-500" : "text-emerald-500")} />
                      <span className={cn("text-xs font-bold", patient.outstandingBill > 0 ? "text-rose-600" : "text-emerald-600")}>
                        {patient.outstandingBill > 0 ? formatCurrency(patient.outstandingBill) : 'Lunas'}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    <StatusBadge 
                      status={patient.status} 
                      type={patient.status === 'Aktif' || patient.status === 'Paket Aktif' ? 'success' : 'warning'} 
                    />
                  </td>
                  <td className="py-5 px-6 text-right">
                    <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-medical-primary">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-6 border-t border-slate-100 flex items-center justify-between bg-slate-50/20">
          <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">Showing 1-{filteredPatients.length} of {filteredPatients.length}</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-300 cursor-not-allowed">PREV</button>
            <button className="w-8 h-8 flex items-center justify-center bg-medical-primary text-white rounded-xl text-xs font-black shadow-lg shadow-blue-600/20">1</button>
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest">NEXT</button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
