import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  TrendingUp, 
  Plus,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/common/GlassCard';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

export const Branches: React.FC = () => {
  const { clinics } = useApp();

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manajemen Cabang</h2>
          <p className="text-slate-500">Kelola informasi operasional seluruh lokasi klinik Anda</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all">
          <Plus size={20} />
          Tambah Cabang Baru
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clinics.map((clinic, index) => (
          <motion.div
            key={clinic.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="flex gap-6">
                <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-600/30">
                  <Building2 size={32} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-slate-900">{clinic.name}</h3>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase tracking-wider">
                      {clinic.code}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-4">
                    <MapPin size={14} className="text-slate-400" />
                    {clinic.city}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">WhatsApp</p>
                      <p className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                        <Phone size={14} className="text-blue-500" />
                        {clinic.whatsapp}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                      <p className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                        <Mail size={14} className="text-blue-500" />
                        {clinic.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                        <Users size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-tight">Pasien</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">{clinic.patientCount}</p>
                    </div>
                    <div className="text-center border-x border-slate-200 px-2">
                      <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                        <TrendingUp size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-tight">Omzet</span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">{formatCurrency(clinic.monthlyRevenue / 1000000)}jt</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                        <CheckCircle2 size={12} />
                        <span className="text-[10px] font-bold uppercase tracking-tight">Status</span>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Aktif</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                        <Users size={12} className="text-slate-400" />
                      </div>
                    ))}
                    <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                      +{clinic.staffCount - 3}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Tim Terapis & Admin</span>
                </div>
                <button className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                  Kelola Cabang <ChevronRight size={16} />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
        
        <button className="group h-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center p-12 text-slate-400 hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600 transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
            <Plus size={32} />
          </div>
          <p className="font-bold">Tambah Cabang Baru</p>
          <p className="text-xs text-slate-400 group-hover:text-blue-400 max-w-[200px] text-center mt-1 font-medium transition-colors">
            Perluas jaringan klinik Anda dan kuasai pasar terapi lokal.
          </p>
        </button>
      </div>

      <GlassCard className="bg-blue-900 border-none text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold">Butuh Bantuan Setup Cabang Baru?</h3>
            <p className="text-blue-100 text-sm max-w-md">Tim kami siap membantu Anda melakukan setup data, training admin, dan konfigurasi laporan konsolidasi untuk cabang baru.</p>
          </div>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-2xl font-bold shadow-xl shadow-black/20 hover:scale-105 transition-all">
            Hubungi Support Pro
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
