import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe,
  CheckCircle2,
  ChevronDown,
  Monitor,
  Tablet,
  Star,
  LayoutGrid,
  BarChart3
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans text-[#1C2630] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/20 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-medical-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200 font-display">K</div>
          <span className="text-xl font-bold tracking-tight font-display text-medical-secondary">KlinikTerapis<span className="text-medical-primary">Pro</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
          <a href="#fitur" className="hover:text-medical-primary transition-colors">Fitur</a>
          <a href="#cabang" className="hover:text-medical-primary transition-colors">Multi Cabang</a>
          <a href="#harga" className="hover:text-medical-primary transition-colors">Harga</a>
          <a href="#faq" className="hover:text-medical-primary transition-colors">FAQ</a>
        </div>
        <button 
          onClick={() => navigate('/admin')}
          className="bg-medical-primary hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold text-xs shadow-lg shadow-blue-600/20 transition-all active:scale-95 uppercase tracking-wider"
        >
          Demo Sistem
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-8 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-medical-accent rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-200 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-blue-50 text-medical-primary border border-blue-100 px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-8"
          >
            <Zap size={14} className="animate-pulse" /> Multi Clinic System Support
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter text-medical-secondary leading-[0.95] mb-8 font-display"
          >
            APLIKASI <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-medical-primary to-medical-accent bg-clip-text text-transparent">KLINIK TERAPIS</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl font-medium mb-12 leading-relaxed"
          >
            Kelola banyak cabang klinik lebih rapi & profesional. Sistem lengkap untuk booking, rekam medis, jadwal terapis, dan laporan konsolidasi dalam satu dashboard.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full"
          >
            <button 
              onClick={() => navigate('/admin')}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/30 transition-all hover:scale-105"
            >
              Lihat Demo Sistem
            </button>
            <button className="w-full sm:w-auto bg-white border border-slate-200 text-slate-700 px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-900/5 hover:bg-slate-50 transition-all">
              Dapatkan Akses Lifetime
            </button>
          </motion.div>

          {/* Device Mockup Preview */}
          <div className="relative w-full max-w-5xl">
            {/* Main Desktop Monitor */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative p-2 bg-[#EEF2F6] rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-8 border-[#334155]"
            >
              <div className="aspect-video bg-white rounded-xl overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1551288049-bbbda5366a71?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-20 absolute top-0 left-0" alt="Dashboard" />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-lg p-6">
                  <div className="flex gap-4 h-full">
                    <div className="w-48 bg-white/50 rounded-xl border border-white/50 h-full hidden md:block"></div>
                    <div className="flex-1 space-y-4">
                      <div className="flex gap-4">
                         <div className="flex-1 aspect-[3/1] bg-blue-600/5 rounded-2xl border border-blue-600/10"></div>
                         <div className="flex-1 aspect-[3/1] bg-cyan-500/5 rounded-2xl border border-cyan-500/10"></div>
                      </div>
                      <div className="aspect-[2/1] bg-white rounded-2xl border border-slate-100 shadow-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Info Cards */}
            <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 4 }}
               className="absolute -top-10 -left-10 md:left-20 bg-white p-4 rounded-2xl shadow-2xl border border-white/50 z-20 flex items-center gap-3"
            >
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Users size={24} /></div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Pasien</p>
                <p className="font-black text-slate-900">Sarah J. <span className="text-[10px] text-emerald-500 font-bold ml-1">Aktif</span></p>
              </div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
               className="absolute top-1/2 -right-10 md:-right-5 bg-white p-4 rounded-2xl shadow-2xl border border-white/50 z-20 flex items-center gap-3"
            >
              <div className="p-2 bg-cyan-50 text-cyan-600 rounded-xl"><Calendar size={24} /></div>
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Jadwal Terapi</p>
                <p className="font-black text-slate-900">2 Nov - Fisioterapi</p>
              </div>
            </motion.div>

            <motion.div 
               animate={{ y: [0, -8, 0] }}
               transition={{ repeat: Infinity, duration: 4.5, delay: 1 }}
               className="absolute -bottom-5 left-1/4 bg-blue-600 text-white p-4 rounded-2xl shadow-2xl shadow-blue-500/40 z-20 flex items-center gap-3"
            >
              <div className="p-2 bg-white/20 rounded-xl"><TrendingUp size={24} /></div>
              <div className="text-left text-white">
                <p className="text-[10px] font-black opacity-60 uppercase tracking-widest">Laporan Pusat</p>
                <p className="font-black text-lg">Rp 136.300.000</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
             <div className="flex items-center justify-center gap-2 font-bold"><ShieldCheck size={20} /> Lisensi Lifetime</div>
             <div className="flex items-center justify-center gap-2 font-bold"><Monitor size={20} /> Desktop Windows</div>
             <div className="flex items-center justify-center gap-2 font-bold"><Globe size={20} /> Web Dashboard</div>
             <div className="flex items-center justify-center gap-2 font-bold"><CheckCircle2 size={20} /> Data Aman</div>
             <div className="flex items-center justify-center gap-2 font-bold"><Users size={20} /> Multi Cabang</div>
             <div className="flex items-center justify-center gap-2 font-bold"><Star size={20} /> Rating 5/5</div>
          </div>
        </div>
      </section>

      {/* Multi Clinic Section */}
      <section className="py-24 bg-[#EAF9FA]/40" id="cabang">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4">
             <h4 className="text-blue-600 text-xs font-black tracking-widest uppercase">Multi Clinic System</h4>
             <h2 className="text-4xl md:text-5xl font-black text-[#172B4D] tracking-tight">Dibuat Untuk Owner Klinik <br/> Dengan Banyak Cabang</h2>
             <p className="text-slate-500 font-medium max-w-xl mx-auto">Pantau pertumbuhan seluruh klinik Anda dari satu layar. Tidak ada lagi rekap manual yang membosankan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div className="bg-white p-8 rounded-3xl shadow-xl shadow-cyan-900/5 space-y-6">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><LayoutGrid size={28} /></div>
                <h3 className="text-xl font-black text-slate-900">Dashboard Konsolidasi</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">Lihat total omzet, total pasien, dan total jadwal dari seluruh cabang secara real-time di satu dashboard pusat.</p>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-xl shadow-cyan-900/5 space-y-6">
                <div className="w-14 h-14 bg-cyan-50 text-cyan-500 rounded-2xl flex items-center justify-center"><Building2 size={28} /></div>
                <h3 className="text-xl font-black text-slate-900">Kontrol Akses Per Cabang</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">Admin cabang hanya bisa melihat data cabang mereka sendiri. Keamanan data terjamin 100%.</p>
             </div>
             <div className="bg-white p-8 rounded-3xl shadow-xl shadow-cyan-900/5 space-y-6">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center"><BarChart3 size={28} /></div>
                <h3 className="text-xl font-black text-slate-900">Laporan Komparasi</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">Bandingkan performa antar cabang. Ketahui klinik mana yang paling sibuk dan paling menguntungkan.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24" id="harga">
        <div className="max-w-7xl mx-auto px-8">
           <div className="text-center mb-16 space-y-4">
             <h4 className="text-blue-600 text-xs font-black tracking-widest uppercase">Pricing Plans</h4>
             <h2 className="text-4xl md:text-5xl font-black text-[#172B4D] tracking-tight">Investasi Lifetime <br/> Tanpa Biaya Bulanan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col hover:border-blue-200 transition-all">
               <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Single Clinic</h3>
               <div className="flex items-baseline gap-1 mb-8">
                 <span className="text-3xl font-black">Rp 999.000</span>
                 <span className="text-slate-400 text-xs font-bold">/ Lifetime</span>
               </div>
               <ul className="space-y-4 mb-10 flex-1">
                 <li className="flex items-center gap-2 text-sm text-slate-600 font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> 1 Cabang Klinik</li>
                 <li className="flex items-center gap-2 text-sm text-slate-600 font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> Max 5 User</li>
                 <li className="flex items-center gap-2 text-sm text-slate-600 font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> Booking & Jadwal</li>
                 <li className="flex items-center gap-2 text-sm text-slate-600 font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> Rekam Medis</li>
               </ul>
               <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-2xl font-black transition-all">Pilih Paket</button>
            </div>

            <div className="bg-white border-4 border-blue-600 rounded-3xl p-10 flex flex-col relative scale-105 shadow-2xl shadow-blue-600/10 z-10">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Terpopuler</div>
               <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Multi Clinic Pro</h3>
               <div className="flex items-baseline gap-1 mb-8">
                 <span className="text-3xl font-black">Rp 2.499.000</span>
                 <span className="text-slate-400 text-xs font-bold">/ Lifetime</span>
               </div>
               <ul className="space-y-4 mb-10 flex-1">
                 <li className="flex items-center gap-2 text-sm text-slate-700 font-bold"><CheckCircle2 size={16} className="text-emerald-500" /> Max 5 Cabang Klinik</li>
                 <li className="flex items-center gap-2 text-sm text-slate-700 font-bold"><CheckCircle2 size={16} className="text-emerald-500" /> Unlimited User</li>
                 <li className="flex items-center gap-2 text-sm text-slate-700 font-bold"><CheckCircle2 size={16} className="text-emerald-500" /> Dashboard Konsolidasi</li>
                 <li className="flex items-center gap-2 text-sm text-slate-700 font-bold"><CheckCircle2 size={16} className="text-emerald-500" /> Laporan Komparatif</li>
                 <li className="flex items-center gap-2 text-sm text-slate-700 font-bold"><CheckCircle2 size={16} className="text-emerald-500" /> Prioritas Support 24/7</li>
               </ul>
               <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-600/20">Ambil Promo Lifetime</button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col text-white">
               <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Franchise Enterprise</h3>
               <div className="flex items-baseline gap-1 mb-8">
                 <span className="text-3xl font-black">Custom</span>
               </div>
               <ul className="space-y-4 mb-10 flex-1">
                 <li className="flex items-center gap-2 text-sm opacity-80 font-medium"><CheckCircle2 size={16} className="text-cyan-400" /> Unlimited Cabang</li>
                 <li className="flex items-center gap-2 text-sm opacity-80 font-medium"><CheckCircle2 size={16} className="text-cyan-400" /> Custom Domain & Logo</li>
                 <li className="flex items-center gap-2 text-sm opacity-80 font-medium"><CheckCircle2 size={16} className="text-cyan-400" /> Integrasi API</li>
                 <li className="flex items-center gap-2 text-sm opacity-80 font-medium"><CheckCircle2 size={16} className="text-cyan-400" /> On-site Setup & Training</li>
               </ul>
               <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black transition-all">Hubungi Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl">K</div>
              <span className="text-xl font-bold tracking-tight">KlinikTerapisPro</span>
            </div>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Solusi manajemen klinik terapi modern yang cerdas untuk owner yang ingin bertumbuh. 
              Dibuat dengan ❤️ untuk kemajuan kesehatan Indonesia.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-6 text-sm uppercase tracking-widest">Produk</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-blue-600">Fitur Dashbord</a></li>
              <li><a href="#" className="hover:text-blue-600">Multi Cabang</a></li>
              <li><a href="#" className="hover:text-blue-600">Desktop Windows</a></li>
              <li><a href="#" className="hover:text-blue-600">Web App</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6 text-sm uppercase tracking-widest">Dukungan</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-600">Tutorial Video</a></li>
              <li><a href="#" className="hover:text-blue-600">Panduan Admin</a></li>
              <li><a href="#" className="hover:text-blue-600">Update Log</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6 text-sm uppercase tracking-widest">Kontak</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-blue-600">WhatsApp: 0812-3456-789</a></li>
              <li><a href="#" className="hover:text-blue-600">Email: halo@klinikterapis.pro</a></li>
              <li><a href="#" className="hover:text-blue-600">Lokasi: Jakarta, Indonesia</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
           <p>© 2026 PT KLINIK TERAPIS INDONESIA. ALL RIGHTS RESERVED.</p>
           <div className="flex items-center gap-6">
             <a href="#" className="hover:text-blue-600">Syarat & Ketentuan</a>
             <a href="#" className="hover:text-blue-600">Kebijakan Privasi</a>
           </div>
        </div>
      </footer>
    </div>
  );
};
