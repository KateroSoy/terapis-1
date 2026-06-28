import React, { useRef, useState, useEffect } from 'react';
import {
  Building2,
  TrendingUp,
  Users,
  Calendar,
  ShieldCheck,
  Zap,
  Globe,
  CheckCircle2,
  Monitor,
  Star,
  LayoutGrid,
  BarChart3,
  ArrowUpRight,
  Activity,
  DollarSign,
  Award,
  CreditCard,
  PartyPopper,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { PaymentModal } from '../components/modals/PaymentModal';
import { PaymentTransaction } from '../types';

const TOTAL_REVENUE = 161300000;
const TOTAL_PATIENTS = 982;
const TOTAL_STAFF = 52;
const TOTAL_SESSIONS = 6490;

const revenueTrend = [
  { month: 'Jun', Jakarta: 38, Bandung: 28, Surabaya: 32, Tangerang: 18 },
  { month: 'Jul', Jakarta: 41, Bandung: 30, Surabaya: 35, Tangerang: 19 },
  { month: 'Agu', Jakarta: 45, Bandung: 33, Surabaya: 37, Tangerang: 21 },
  { month: 'Sep', Jakarta: 48, Bandung: 35, Surabaya: 40, Tangerang: 22 },
  { month: 'Okt', Jakarta: 52, Bandung: 38, Surabaya: 43, Tangerang: 24 },
  { month: 'Nov', Jakarta: 58, Bandung: 42, Surabaya: 48, Tangerang: 28 },
];

const branchData = [
  { name: 'JKT', revenue: 52.8, patients: 345, staff: 18 },
  { name: 'SBY', revenue: 44.2, patients: 267, staff: 14 },
  { name: 'BDG', revenue: 38.9, patients: 218, staff: 12 },
  { name: 'TNG', revenue: 25.4, patients: 152, staff: 8 },
];

const therapyColors = ['#155EEF', '#7EE7F2', '#42C7A5', '#F59E0B', '#8B5CF6'];
const therapyData = [
  { name: 'Fisioterapi', value: 412 },
  { name: 'Terapi Wicara', value: 285 },
  { name: 'Okupasi Terapi', value: 198 },
  { name: 'Konseling', value: 156 },
  { name: 'Tumbuh Kembang', value: 98 },
];

const COLORS = ['#155EEF', '#7EE7F2', '#42C7A5', '#F59E0B', '#8B5CF6'];

function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0 }: {
  value: number; suffix?: string; prefix?: string; decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();
          function frame(time: number) {
            const p = Math.min((time - start) / duration, 1);
            const eased = 1 - (1 - p) * (1 - p);
            setCount(value * eased);
            if (p < 1) requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('id-ID', { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}{suffix}
    </span>
  );
}

function formatCurrencyShort(value: number) {
  if (value >= 1000000000) return `Rp ${(value / 1000000000).toFixed(1)} M`;
  if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)} Jt`;
  if (value >= 1000) return `Rp ${(value / 1000).toFixed(0)} Rb`;
  return `Rp ${value}`;
}

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [subPayment, setSubPayment] = useState<{
    isOpen: boolean;
    pkg: { name: string; price: number; period: string; label: string } | null;
  }>({ isOpen: false, pkg: null });
  const [subSuccess, setSubSuccess] = useState(false);

  const handleBuyPackage = (name: string, price: number, period: string, label: string) => {
    setSubPayment({ isOpen: true, pkg: { name, price, period, label } });
    setSubSuccess(false);
  };

  const handleSubPaymentSuccess = (_transaction: PaymentTransaction) => {
    setSubSuccess(true);
    setSubPayment({ isOpen: false, pkg: null });
    setTimeout(() => setSubSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F7FBFC] font-sans text-[#1C2630] overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-white/20 px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-medical-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Building2 size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight font-display text-medical-secondary">KlinikTerapis<span className="text-medical-primary">Pro</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
          <a href="#analytics" className="hover:text-medical-primary transition-colors">Analytics</a>
          <a href="#cabang" className="hover:text-medical-primary transition-colors">Multi Cabang</a>
          <a href="#harga" className="hover:text-medical-primary transition-colors">Harga</a>
        </div>
        <button
          onClick={() => navigate('/admin')}
          className="bg-medical-primary hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold text-xs shadow-lg shadow-blue-600/20 transition-all active:scale-95 uppercase tracking-wider"
        >
          Demo Sistem
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 px-8 overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-30">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            className="absolute top-[15%] left-[15%] w-[500px] h-[500px] bg-medical-accent rounded-full blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
            className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] bg-blue-200 rounded-full blur-[120px]"
          />
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
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-medical-secondary leading-[0.95] mb-6 font-display"
          >
            APLIKASI <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-medical-primary via-blue-500 to-medical-accent bg-clip-text text-transparent">KLINIK TERAPIS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl font-medium mb-8 leading-relaxed"
          >
            Kelola banyak cabang klinik lebih rapi & profesional. Sistem lengkap untuk booking, rekam medis, jadwal terapis, dan laporan konsolidasi dalam satu dashboard.
          </motion.p>

          {/* Live Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-12 mb-10 py-4 px-8 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center"><Building2 size={16} className="text-medical-primary" /></div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Cabang Aktif</p>
                <p className="font-black text-medical-secondary text-sm">4 Cabang</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center"><Users size={16} className="text-emerald-500" /></div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Pasien</p>
                <p className="font-black text-medical-secondary text-sm"><AnimatedCounter value={TOTAL_PATIENTS} />+</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center"><TrendingUp size={16} className="text-amber-500" /></div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Revenue / Bulan</p>
                <p className="font-black text-medical-secondary text-sm"><AnimatedCounter value={TOTAL_REVENUE} prefix="Rp " decimals={0} /></p>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center"><Activity size={16} className="text-purple-500" /></div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Sesi</p>
                <p className="font-black text-medical-secondary text-sm"><AnimatedCounter value={TOTAL_SESSIONS} />+</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 w-full"
          >
            <button
              onClick={() => navigate('/admin')}
              className="group w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Admin: Demo Sistem <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/daftar')}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 border border-emerald-400 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
              Pasien: Daftar Online <ArrowUpRight size={20} />
            </button>
          </motion.div>

          {/* Device Mockup with data cards */}
          <div className="relative w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative p-2 bg-[#EEF2F6] rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.1)] border-8 border-[#334155]"
            >
              <div className="aspect-video bg-white rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bbbda5366a71?q=80&w=2070&auto=format&fit=crop"
                  className="w-full h-full object-cover opacity-10 absolute top-0 left-0"
                  alt="Dashboard"
                />
                <div className="absolute inset-0 bg-white/30 backdrop-blur-sm p-4 md:p-6">
                  <div className="flex gap-4 h-full">
                    <div className="w-40 bg-white/60 rounded-xl border border-white/60 h-full hidden md:block p-3 space-y-2">
                      <div className="h-2 w-16 bg-blue-600/20 rounded-full" />
                      <div className="h-2 w-20 bg-blue-600/30 rounded-full" />
                      <div className="h-2 w-12 bg-blue-600/10 rounded-full mt-4" />
                      <div className="h-2 w-16 bg-blue-600/20 rounded-full" />
                      <div className="h-2 w-14 bg-blue-600/10 rounded-full" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex gap-3">
                        <div className="flex-1 p-3 bg-blue-600/5 rounded-xl border border-blue-600/10">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Revenue</p>
                          <p className="text-sm font-black text-blue-600">Rp 161,3 Jt</p>
                        </div>
                        <div className="flex-1 p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Pasien</p>
                          <p className="text-sm font-black text-cyan-600">982</p>
                        </div>
                        <div className="flex-1 p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Sesi</p>
                          <p className="text-sm font-black text-emerald-600">6.490</p>
                        </div>
                      </div>
                      <div className="flex-1 bg-white/50 rounded-xl border border-slate-100 p-3 flex items-center gap-4">
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between text-[9px] font-bold text-slate-400">
                            <span>JKT</span><span>Rp 52,8 Jt</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" />
                          </div>
                          <div className="flex justify-between text-[9px] font-bold text-slate-400">
                            <span>BDG</span><span>Rp 38,9 Jt</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-[73%] bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full" />
                          </div>
                          <div className="flex justify-between text-[9px] font-bold text-slate-400">
                            <span>SBY</span><span>Rp 44,2 Jt</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full w-[84%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Data Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-8 -left-10 md:left-20 bg-white p-3 md:p-4 rounded-2xl shadow-2xl border border-white/50 z-20 flex items-center gap-3"
            >
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Users size={20} /></div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Pasien Aktif</p>
                <p className="font-black text-slate-900"><AnimatedCounter value={TOTAL_PATIENTS} /> <span className="text-[10px] text-emerald-500 font-bold">+12%</span></p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
              className="absolute top-1/3 -right-8 md:-right-5 bg-white p-3 md:p-4 rounded-2xl shadow-2xl border border-white/50 z-20 flex items-center gap-3"
            >
              <div className="p-2 bg-cyan-50 text-cyan-600 rounded-xl"><Calendar size={20} /></div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sesi Hari Ini</p>
                <p className="font-black text-slate-900">7 Sesi <span className="text-[10px] text-cyan-500 font-bold ml-1">Terjadwal</span></p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 1 }}
              className="absolute -bottom-4 left-1/4 bg-medical-primary text-white p-3 md:p-4 rounded-2xl shadow-2xl shadow-blue-500/40 z-20 flex items-center gap-3"
            >
              <div className="p-2 bg-white/20 rounded-xl"><TrendingUp size={20} /></div>
              <div className="text-left text-white">
                <p className="text-[9px] font-black opacity-60 uppercase tracking-widest">Total Revenue</p>
                <p className="font-black text-sm md:text-base"><AnimatedCounter value={TOTAL_REVENUE} prefix="Rp " /></p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="relative overflow-hidden bg-medical-secondary">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { icon: DollarSign, value: TOTAL_REVENUE, label: 'Total Revenue Bulanan', prefix: 'Rp ', color: 'from-blue-400 to-blue-600' },
              { icon: Users, value: TOTAL_PATIENTS, label: 'Pasien Terdaftar', suffix: '+', color: 'from-cyan-400 to-cyan-500' },
              { icon: Award, value: TOTAL_STAFF, label: 'Tenaga Profesional', suffix: '+', color: 'from-emerald-400 to-emerald-500' },
              { icon: Activity, value: TOTAL_SESSIONS, label: 'Total Sesi Terapi', suffix: '+', color: 'from-amber-400 to-amber-500' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex mb-3 w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} items-center justify-center shadow-lg`}>
                  <stat.icon size={22} className="text-white" />
                </div>
                <p className="text-3xl md:text-4xl font-black text-white font-display tracking-tight">
                  {stat.prefix}<AnimatedCounter value={stat.value} />{stat.suffix}
                </p>
                <p className="text-xs font-bold text-white/50 uppercase tracking-widest mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Analytics Section */}
      <section className="py-24 px-8" id="analytics">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <h4 className="text-blue-600 text-xs font-black tracking-widest uppercase">Live Analytics</h4>
            <h2 className="text-4xl md:text-5xl font-black text-[#172B4D] tracking-tight">Data Real Klinik Anda <br /> Dalam Satu Layar</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">Pantau pertumbuhan revenue, distribusi pasien, dan performa cabang secara real-time.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Revenue Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-900/5 border border-slate-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Revenue Trend</h3>
                  <p className="text-xs font-medium text-slate-400">Pertumbuhan pendapatan per cabang (6 bulan)</p>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold">
                  {['Jakarta', 'Bandung', 'Surabaya', 'Tangerang'].map((city, i) => (
                    <div key={city} className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: ['#155EEF', '#7EE7F2', '#42C7A5', '#F59E0B'][i] }} />
                      {city}
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      {[
                        { id: 'colorJKT', color: '#155EEF' },
                        { id: 'colorBDG', color: '#7EE7F2' },
                        { id: 'colorSBY', color: '#42C7A5' },
                        { id: 'colorTNG', color: '#F59E0B' },
                      ].map(({ id, color }) => (
                        <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}Jt`} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                      formatter={(value: number) => [`Rp ${value} Juta`, undefined]}
                    />
                    <Area type="monotone" dataKey="Jakarta" stroke="#155EEF" strokeWidth={2} fill="url(#colorJKT)" />
                    <Area type="monotone" dataKey="Bandung" stroke="#7EE7F2" strokeWidth={2} fill="url(#colorBDG)" />
                    <Area type="monotone" dataKey="Surabaya" stroke="#42C7A5" strokeWidth={2} fill="url(#colorSBY)" />
                    <Area type="monotone" dataKey="Tangerang" stroke="#F59E0B" strokeWidth={2} fill="url(#colorTNG)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Therapy Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-900/5 border border-slate-100"
            >
              <h3 className="font-black text-slate-900 text-lg mb-1">Distribusi Terapi</h3>
              <p className="text-xs font-medium text-slate-400 mb-6">Berdasarkan jumlah pasien aktif</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={therapyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {therapyData.map((entry, index) => (
                        <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                      formatter={(value: number) => [`${value} Pasien`, undefined]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {therapyData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="font-medium text-slate-600">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Branch Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-900/5 border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-black text-slate-900 text-lg">Perbandingan Cabang</h3>
                <p className="text-xs font-medium text-slate-400">Revenue, pasien & tenaga per cabang</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={branchData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}Jt`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    formatter={(value: number, name: string) => [
                      name === 'revenue' ? `Rp ${value} Juta` : value,
                      name === 'revenue' ? 'Revenue' : name === 'patients' ? 'Pasien' : 'Staff'
                    ]}
                  />
                  <Bar dataKey="revenue" fill="#155EEF" radius={[6, 6, 0, 0]} barSize={36} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {branchData.map((b, i) => (
                <div key={b.name} className="bg-slate-50 rounded-xl p-4 text-center">
                  <p className="font-black text-medical-secondary text-lg">{b.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</p>
                  <p className="font-black text-medical-primary">Rp {b.revenue} Jt</p>
                  <div className="flex justify-center gap-4 mt-2 text-[10px] font-bold text-slate-400">
                    <span>{b.patients} Pasien</span>
                    <span>{b.staff} Staff</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <h4 className="text-blue-600 text-xs font-black tracking-widest uppercase">Multi Clinic System</h4>
            <h2 className="text-4xl md:text-5xl font-black text-[#172B4D] tracking-tight">Dibuat Untuk Owner Klinik <br /> Dengan Banyak Cabang</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">Pantau pertumbuhan seluruh klinik Anda dari satu layar. Tidak ada lagi rekap manual yang membosankan.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-cyan-900/5 space-y-6 hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><LayoutGrid size={28} /></div>
              <h3 className="text-xl font-black text-slate-900">Dashboard Konsolidasi</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">Lihat total omzet, total pasien, dan total jadwal dari seluruh cabang secara real-time di satu dashboard pusat.</p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1"><DollarSign size={14} className="text-emerald-500" /> Rp 161 Jt</span>
                <span className="flex items-center gap-1"><Users size={14} className="text-blue-500" /> 982</span>
                <span className="flex items-center gap-1"><Building2 size={14} className="text-cyan-500" /> 4 Cabang</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-cyan-900/5 space-y-6 hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 bg-cyan-50 text-cyan-500 rounded-2xl flex items-center justify-center"><Building2 size={28} /></div>
              <h3 className="text-xl font-black text-slate-900">Kontrol Akses Per Cabang</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">Admin cabang hanya bisa melihat data cabang mereka sendiri. Keamanan data terjamin 100%.</p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-500" /> RBAC System</span>
                <span className="flex items-center gap-1"><Users size={14} className="text-blue-500" /> 4 Role</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-xl shadow-cyan-900/5 space-y-6 hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center"><BarChart3 size={28} /></div>
              <h3 className="text-xl font-black text-slate-900">Laporan Komparasi</h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed">Bandingkan performa antar cabang. Ketahui klinik mana yang paling sibuk dan paling menguntungkan.</p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1"><TrendingUp size={14} className="text-emerald-500" /> Growth +15%</span>
                <span className="flex items-center gap-1"><BarChart3 size={14} className="text-blue-500" /> 4 Cabang</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24" id="harga">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4">
            <h4 className="text-blue-600 text-xs font-black tracking-widest uppercase">Pricing Plans</h4>
            <h2 className="text-4xl md:text-5xl font-black text-[#172B4D] tracking-tight">Mulai Rp149 Ribuan <br /> Per 3 Bulan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div className="bg-white border border-slate-200 rounded-3xl p-10 flex flex-col hover:border-blue-200 transition-all">
              <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Starter Ramah</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl font-black">Rp149k–199k</span>
                <span className="text-slate-400 text-xs font-bold">/ 3 bulan</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-2 text-sm text-slate-600 font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> 1 Cabang Klinik</li>
                <li className="flex items-center gap-2 text-sm text-slate-600 font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> Hingga 3 User</li>
                <li className="flex items-center gap-2 text-sm text-slate-600 font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> Booking & Jadwal</li>
                <li className="flex items-center gap-2 text-sm text-slate-600 font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> Rekam Medis Dasar</li>
                <li className="flex items-center gap-2 text-sm text-slate-600 font-medium"><CheckCircle2 size={16} className="text-emerald-500" /> Support Email</li>
              </ul>
              <button
                onClick={() => handleBuyPackage('Starter Ramah', 149000, '3 bulan', 'Rp149k–199k/3 bulan')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-4 rounded-2xl font-black transition-all hover:shadow-lg active:scale-[0.98]"
              >
                Pilih Paket
              </button>
            </div>

            <div className="bg-white border-4 border-blue-600 rounded-3xl p-10 flex flex-col relative scale-105 shadow-2xl shadow-blue-600/10 z-10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Terpopuler</div>
              <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Growth High Value</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl font-black">Rp399k–599k</span>
                <span className="text-slate-400 text-xs font-bold">/ 3 bulan</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-2 text-sm text-slate-700 font-bold"><CheckCircle2 size={16} className="text-emerald-500" /> Hingga 3 Cabang Klinik</li>
                <li className="flex items-center gap-2 text-sm text-slate-700 font-bold"><CheckCircle2 size={16} className="text-emerald-500" /> Hingga 10 User</li>
                <li className="flex items-center gap-2 text-sm text-slate-700 font-bold"><CheckCircle2 size={16} className="text-emerald-500" /> Dashboard Konsolidasi</li>
                <li className="flex items-center gap-2 text-sm text-slate-700 font-bold"><CheckCircle2 size={16} className="text-emerald-500" /> Laporan Keuangan</li>
                <li className="flex items-center gap-2 text-sm text-slate-700 font-bold"><CheckCircle2 size={16} className="text-emerald-500" /> Support Prioritas</li>
              </ul>
              <button
                onClick={() => handleBuyPackage('Growth High Value', 399000, '3 bulan', 'Rp399k–599k/3 bulan')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98]"
              >
                Ambil Paket Growth
              </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col text-white">
              <h3 className="text-xl font-black mb-2 uppercase tracking-tight">Clinic Premium</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-3xl font-black">Rp999k–1,5jt</span>
                <span className="text-slate-400 text-xs font-bold">/ 3 bulan</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                <li className="flex items-center gap-2 text-sm opacity-80 font-medium"><CheckCircle2 size={16} className="text-cyan-400" /> Unlimited Cabang</li>
                <li className="flex items-center gap-2 text-sm opacity-80 font-medium"><CheckCircle2 size={16} className="text-cyan-400" /> Unlimited User</li>
                <li className="flex items-center gap-2 text-sm opacity-80 font-medium"><CheckCircle2 size={16} className="text-cyan-400" /> Semua Fitur Premium</li>
                <li className="flex items-center gap-2 text-sm opacity-80 font-medium"><CheckCircle2 size={16} className="text-cyan-400" /> Dedicated Support</li>
                <li className="flex items-center gap-2 text-sm opacity-80 font-medium"><CheckCircle2 size={16} className="text-cyan-400" /> Prioritas Update & Fitur Baru</li>
              </ul>
              <button
                onClick={() => window.open('https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20paket%20Clinic%20Premium', '_blank')}
                className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black transition-all hover:bg-slate-100 active:scale-[0.98]"
              >
                Hubungi Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Success Toast */}
      <AnimatePresence>
        {subSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[200] bg-medical-secondary text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-blue-800/30"
          >
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
              <PartyPopper size={22} className="text-emerald-400" />
            </div>
            <div>
              <p className="font-black text-sm">Paket Berhasil Diaktifkan! 🎉</p>
              <p className="text-xs text-white/60 font-medium mt-0.5">Akses paket Anda sudah aktif. Silakan login ke dashboard.</p>
            </div>
            <button
              onClick={() => navigate('/admin')}
              className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all"
            >
              Buka Dashboard
            </button>
            <button
              onClick={() => setSubSuccess(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscription Payment Modal */}
      {subPayment.pkg && (
        <PaymentModal
          isOpen={subPayment.isOpen}
          onClose={() => setSubPayment({ isOpen: false, pkg: null })}
          amount={subPayment.pkg.price}
          invoiceId={`sub-${Date.now()}`}
          invoiceNumber={`SUB-${Date.now().toString(36).toUpperCase()}`}
          patientName="Owner Klinik"
          onPaymentSuccess={(tx) => handleSubPaymentSuccess(tx)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-20 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Building2 size={24} />
              </div>
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
              <li><a href="#" className="hover:text-blue-600">Fitur Dashboard</a></li>
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
