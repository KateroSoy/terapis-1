import React from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Receipt, 
  ChevronRight,
  ArrowUpRight,
  Building2,
  Stethoscope,
  Clock,
  CheckCircle2,
  AlertCircle,
  Zap,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/common/GlassCard';
import { formatCurrency } from '../lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { cn } from '../lib/utils';

export const Dashboard: React.FC = () => {
  const { clinics, stats, activeBranchId, currentRole } = useApp();

  const revenueData = clinics.map(c => ({
    name: c.code,
    fullName: c.name,
    revenue: c.monthlyRevenue,
    patients: c.patientCount
  }));

  // Enhanced demo data with trend visualization
  const monthlyTrendData = [
    { month: 'Jan', revenue: 320000000, patients: 185, bookings: 42 },
    { month: 'Feb', revenue: 380000000, patients: 198, bookings: 48 },
    { month: 'Mar', revenue: 420000000, patients: 210, bookings: 55 },
    { month: 'Apr', revenue: 480000000, patients: 245, bookings: 62 },
    { month: 'May', revenue: 550000000, patients: 265, bookings: 71 },
    { month: 'Jun', revenue: 636300000, patients: 710, bookings: 230 },
  ];

  const therapyDistribution = [
    { name: 'Fisioterapi', value: 40, color: '#155EEF' },
    { name: 'Terapi Wicara', value: 25, color: '#7EE7F2' },
    { name: 'Okupasi Terapi', value: 20, color: '#42C7A5' },
    { name: 'Konseling', value: 15, color: '#F59E0B' },
  ];

  const COLORS = ['#155EEF', '#7EE7F2', '#42C7A5', '#F59E0B', '#EC4899', '#8B5CF6'];

  const recentBookings = [
    { time: '14:00', patient: 'Sarah Johanna', therapy: 'Fisioterapi', therapist: 'dr. Maya Lestari', branch: 'Jakarta', status: 'Confirmed', avatar: '👧' },
    { time: '15:30', patient: 'Bima Aditya', therapy: 'Terapi Wicara', therapist: 'Sinta Rahma', branch: 'Bandung', status: 'In Progress', avatar: '👦' },
    { time: '16:00', patient: 'Nadira Putri', therapy: 'Okupasi Terapi', therapist: 'Hana Pratiwi', branch: 'Surabaya', status: 'Completed', avatar: '👧' },
    { time: '17:00', patient: 'Rafi Mustofa', therapy: 'Konseling', therapist: 'Dimas Aditya', branch: 'Jakarta', status: 'Confirmed', avatar: '👨' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-300';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'Completed': return 'bg-slate-100 text-slate-700 border-slate-300';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-300';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Completed': return <CheckCircle2 size={16} />;
      case 'In Progress': return <Zap size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="space-y-2 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-medical-secondary font-display">Dashboard Operasional</h1>
            <p className="text-slate-500 mt-1">Ringkasan kinerja platform terapi Anda secara real-time</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-emerald-700">Sistem Aktif</span>
          </div>
        </div>
      </div>

      {/* KPI Cards - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-500/20">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-500 to-blue-600"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-widest font-bold mb-2">Total Pendapatan</p>
              <h3 className="text-3xl font-bold text-medical-secondary font-display">{formatCurrency(stats.totalRevenue)}</h3>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center text-emerald-600 text-[11px] font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                  <ArrowUpRight size={13} className="mr-1" /> 18.5%
                </div>
                <span className="text-slate-400 text-[11px] font-medium">vs bulan lalu</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <TrendingUp size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/20">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 to-cyan-500"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-widest font-bold mb-2">Total Pasien Aktif</p>
              <h3 className="text-3xl font-bold text-medical-secondary font-display">{stats.totalPatients}</h3>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-blue-600 text-[11px] font-bold bg-blue-50 px-2.5 py-1 rounded-lg">
                  {activeBranchId === 'ALL' ? '4 Cabang' : 'Aktif'}
                </span>
                <span className="text-slate-400 text-[11px] font-medium">Terdaftar</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-cyan-50 to-cyan-100 text-cyan-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Users size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden group hover:shadow-2xl hover:shadow-emerald-500/20">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-500 to-emerald-600"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-widest font-bold mb-2">Sesi Hari Ini</p>
              <h3 className="text-3xl font-bold text-medical-secondary font-display">{stats.totalBookingsToday}</h3>
              <div className="flex items-center gap-2 mt-4">
                <div className="flex items-center text-emerald-600 text-[11px] font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">
                  <ArrowUpRight size={13} className="mr-1" /> +8 Sesi
                </div>
                <span className="text-slate-400 text-[11px] font-medium">Hari ini</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <Calendar size={24} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden group hover:shadow-2xl hover:shadow-amber-500/20">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-500 to-amber-600"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-[11px] uppercase tracking-widest font-bold mb-2">Tagihan Pending</p>
              <h3 className="text-3xl font-bold text-medical-secondary font-display">{stats.pendingInvoices}</h3>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-amber-600 text-[11px] font-bold bg-amber-50 px-2.5 py-1 rounded-lg uppercase">
                  Perlu Aksi
                </span>
                <span className="text-slate-400 text-[11px] font-medium">Invoice</span>
              </div>
            </div>
            <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              <AlertCircle size={24} />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Revenue Trend & Therapy Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-medical-secondary font-display">Tren Pendapatan 6 Bulan</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">Proyeksi pendapatan bulanan dari semua cabang</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors">
                6M
              </button>
              <button className="px-3 py-1.5 text-slate-500 text-xs font-bold hover:bg-slate-100 rounded-lg transition-colors">
                1Y
              </button>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#155EEF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#155EEF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12, fontWeight: 500}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} width={60} />
                <Tooltip 
                  cursor={{fill: '#F1F5F9'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', backgroundColor: '#F8FAFC', padding: '12px'}}
                  labelStyle={{color: '#1E293B', fontWeight: 'bold'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#155EEF" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)"
                  dot={{fill: '#155EEF', r: 5, strokeWidth: 2, stroke: '#fff'}}
                  activeDot={{r: 7}}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="mb-6">
            <h3 className="text-lg font-bold text-medical-secondary font-display">Distribusi Layanan</h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">Jenis terapi paling populer</p>
          </div>
          <div className="h-[280px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={therapyDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {therapyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {therapyDistribution.map((therapy, i) => (
              <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: therapy.color}}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-slate-600 truncate">{therapy.name}</p>
                  <p className="text-xs font-bold text-slate-900">{therapy.value}%</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Branch Performance & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-medical-secondary font-display">Jadwal Terapi Hari Ini</h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">Seluruh cabang - {new Date().toLocaleDateString('id-ID')}</p>
            </div>
            <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full uppercase tracking-wider">
              {recentBookings.length} Sesi
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="pb-3 px-3">Jam</th>
                  <th className="pb-3 px-3">Pasien</th>
                  <th className="pb-3 px-3">Layanan</th>
                  <th className="pb-3 px-3">Terapis</th>
                  <th className="pb-3 px-3">Cabang</th>
                  <th className="pb-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentBookings.map((booking, i) => (
                  <tr key={i} className="group hover:bg-blue-50/40 transition-colors duration-200">
                    <td className="py-3.5 px-3">
                      <span className="text-sm font-bold text-slate-900">{booking.time}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-sm font-bold text-slate-900">{booking.patient}</span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                        {booking.therapy}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-sm">
                          {booking.avatar}
                        </div>
                        <span className="text-sm text-slate-600 font-medium">{booking.therapist.split(',')[0]}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="text-xs font-medium text-slate-600">{booking.branch}</span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <span className={cn(
                        "text-[10px] font-bold px-3 py-1.5 rounded-full uppercase inline-flex items-center gap-1",
                        booking.status === 'Confirmed' && 'bg-emerald-100 text-emerald-700',
                        booking.status === 'In Progress' && 'bg-blue-100 text-blue-700',
                        booking.status === 'Completed' && 'bg-slate-100 text-slate-700'
                      )}>
                        {getStatusIcon(booking.status)}
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        {/* Performance Highlights */}
        <div className="space-y-6">
          <GlassCard className="bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 text-white border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <h4 className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">⭐ Cabang Terbaik</h4>
              <h3 className="text-2xl font-bold mb-4">Jakarta Sudirman</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-90 font-medium">Produktivitas</span>
                  <span className="font-bold text-lg">92%</span>
                </div>
                <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-white h-full w-[92%] rounded-full shadow-lg"></div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs opacity-90 font-medium">Pendapatan</span>
                  <span className="font-bold">Rp 48.5jt</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-white text-blue-600 py-2.5 rounded-xl text-xs font-bold shadow-xl shadow-blue-900/20 hover:bg-slate-50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/30">
                Lihat Detail
              </button>
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">🚨 Alert & Reminder</h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-start p-3 bg-rose-50 rounded-xl border border-rose-200 hover:border-rose-300 transition-colors">
                <div className="p-2 bg-rose-100 text-rose-600 rounded-lg flex-shrink-0">
                  <Clock size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-rose-900">Jadwal Bentrok</p>
                  <p className="text-[10px] text-rose-700 mt-0.5 leading-relaxed">2 Sesi tumpang tindih jam 14:00 di Bandung</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 bg-amber-50 rounded-xl border border-amber-200 hover:border-amber-300 transition-colors">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg flex-shrink-0">
                  <Receipt size={16} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-amber-900">Tagihan Jatuh Tempo</p>
                  <p className="text-[10px] text-amber-700 mt-0.5 leading-relaxed">8 Invoice belum lunas di Surabaya</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Branch Comparison */}
      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-medical-secondary font-display">Performa Semua Cabang</h3>
            <p className="text-xs text-slate-400 mt-1 font-medium">Perbandingan metrik kunci per lokasi</p>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronRight size={20} className="text-slate-400" />
          </button>
        </div>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11}} />
              <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12, fontWeight: 500}} width={40} />
              <Tooltip 
                cursor={{fill: '#F1F5F9'}} 
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                formatter={(value) => formatCurrency(value)}
              />
              <Bar dataKey="revenue" radius={[0, 8, 8, 0]} fill="#155EEF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};
