import React from 'react';
import { 
  Package, 
  Check, 
  Plus, 
  Sparkles, 
  Users, 
  Calendar,
  Zap,
  Star,
  Info
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { formatCurrency } from '../lib/utils';

export const Packages: React.FC = () => {
  const packages = [
    {
      name: 'Paket Pemulihan Stroke',
      price: 2500000,
      sessions: 12,
      features: ['Fisioterapi Intensif', 'Okupasi Terapi', 'Monitoring Progres Mingguan', 'Konsultasi dr. Spesialis'],
      popular: true,
      color: 'blue'
    },
    {
      name: 'Terapi Wicara Anak',
      price: 1800000,
      sessions: 10,
      features: ['Terapi Wicara Terpadu', 'Alat Peraga Edukatif', 'Laporan Evaluasi Bulanan'],
      popular: false,
      color: 'emerald'
    },
    {
      name: 'Kesehatan Tulang Belakang',
      price: 1200000,
      sessions: 5,
      features: ['Fisioterapi Muskuloskeletal', 'Korset Lumbal (Opsional)', 'Latihan Postur Tubuh'],
      popular: false,
      color: 'amber'
    }
  ];

  return (
    <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-center md:text-left">
        <div>
          <h1 className="text-3xl font-bold text-medical-secondary font-display">Paket Terapi</h1>
          <p className="text-slate-500 font-medium">Penawaran paket layanan bundling untuk pasien setia.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-medical-primary text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 mx-auto md:mx-0">
          <Plus size={18} />
          Buat Paket Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, i) => (
          <GlassCard 
            key={i} 
            className={`relative flex flex-col p-8 transition-all duration-500 hover:scale-[1.05] ${
              pkg.popular ? "border-medical-primary border-2 shadow-2xl shadow-blue-100" : "border-slate-100 shadow-xl"
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-medical-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg flex items-center gap-2">
                <Sparkles size={12} /> Terlaris
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-medical-primary font-display">{formatCurrency(pkg.price)}</span>
                <span className="text-slate-400 text-sm font-medium">/paket</span>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8 p-3 bg-slate-50 rounded-2xl">
              <div className="flex-1 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Sesi</p>
                <p className="text-sm font-bold text-slate-700">{pkg.sessions} Sesi</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div className="flex-1 text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Berlaku</p>
                <p className="text-sm font-bold text-slate-700">3 Bulan</p>
              </div>
            </div>

            <div className="flex-1 space-y-4 mb-10">
              {pkg.features.map((feature, j) => (
                <div key={j} className="flex items-start gap-3">
                  <div className={`mt-0.5 p-0.5 rounded-full bg-${pkg.color}-100 text-${pkg.color}-600`}>
                    <Check size={12} />
                  </div>
                  <span className="text-xs font-medium text-slate-600 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-4 rounded-2xl font-bold text-sm transition-all ${
              pkg.popular 
                ? "bg-medical-primary text-white shadow-lg shadow-blue-200 hover:bg-blue-700" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}>
              Pilih Paket Ini
            </button>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="bg-slate-900 text-white border-none p-10 overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <Zap size={150} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Custom Paket Terapi?</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Klinik Anda memiliki layanan khusus? Anda dapat membuat paket custom dengan durasi, jumlah sesi, dan kombinasi layanan yang fleksibel sesuai kebutuhan pasien.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                <Users size={20} />
              </div>
              <span className="text-xs font-bold">Akses Admin</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                <Star size={20} />
              </div>
              <span className="text-xs font-bold">Feedback Pasien</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
                <Calendar size={20} />
              </div>
              <span className="text-xs font-bold">Auto Scheduling</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
