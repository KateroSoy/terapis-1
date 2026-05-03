import React from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Building2, 
  Bell, 
  ShieldCheck, 
  CreditCard, 
  HelpCircle,
  ChevronRight,
  Globe,
  Database,
  Mail,
  Camera
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';

export const Settings: React.FC = () => {
  const sections = [
    {
      title: 'Profil Pengguna',
      icon: <User className="text-blue-500" />,
      items: ['Informasi Personal', 'Ubah Password', 'Preferensi Notifikasi']
    },
    {
      title: 'Manajemen Klinik',
      icon: <Building2 className="text-emerald-500" />,
      items: ['Data Cabang', 'Struktur Organisasi', 'Jam Operasional']
    },
    {
      title: 'Sistem & Keamanan',
      icon: <ShieldCheck className="text-rose-500" />,
      items: ['Hak Akses (Role)', 'Log Aktivitas', 'Backup Data']
    },
    {
      title: 'Integrasi & Billing',
      icon: <CreditCard className="text-amber-500" />,
      items: ['Metode Pembayaran', 'API Keys', 'Paket Langganan SaaS']
    }
  ];

  return (
    <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-medical-secondary font-display">Pengaturan Sistem</h1>
          <p className="text-slate-500 font-medium">Konfigurasi akun, cabang, dan parameter sistem lainnya.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <GlassCard className="p-8">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <User size={32} />
                </div>
                <button className="absolute -bottom-2 -right-2 p-1.5 bg-white border border-slate-200 rounded-lg text-slate-500 shadow-sm hover:text-blue-600 transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Dr. Adrian Pratama</h3>
                <p className="text-sm text-slate-500 font-medium">Super Admin • Pemilik Klinik</p>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full uppercase">Aktif</span>
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Mail size={10} /> adrian@terapispro.com
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
              {sections.map((section, i) => (
                <div key={i} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      {section.icon}
                    </div>
                    <h4 className="text-sm font-bold text-slate-800">{section.title}</h4>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-center justify-between text-xs text-slate-500 font-medium hover:text-blue-600">
                        {item}
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="flex items-center gap-4 p-5">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <Globe size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Bahasa</h4>
                <p className="text-xs text-slate-500">Bahasa Indonesia</p>
              </div>
            </GlassCard>
            <GlassCard className="flex items-center gap-4 p-5">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <Database size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">Storage</h4>
                <p className="text-xs text-slate-500">12.4 GB / 50 GB Used</p>
              </div>
            </GlassCard>
          </div>
        </div>

        <div className="lg:w-80 space-y-6">
          <GlassCard className="bg-medical-secondary text-white border-none">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-blue-400" />
              <h3 className="font-bold">Keamanan Akun</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">2FA Status</span>
                <span className="text-[10px] font-bold bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full uppercase">Nonaktif</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Login Terakhir</span>
                <span className="text-xs font-medium">10 Menit lalu</span>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 bg-white/10 hover:bg-white/20 transition-all rounded-xl text-xs font-bold">
              Konfigurasi Keamanan
            </button>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="text-slate-400" />
              <h3 className="font-bold text-slate-800">Butuh Bantuan?</h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Pusat bantuan kami tersedia 24/7 untuk membantu operasional klinik Anda.
            </p>
            <button className="w-full py-2.5 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-200 transition-all">
              Buka Tiket Support
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
