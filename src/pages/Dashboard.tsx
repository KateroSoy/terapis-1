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
  Clock
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
  Pie
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

  const COLORS = ['#155EEF', '#7EE7F2', '#42C7A5', '#172B4D'];

  const recentBookings = [
    { time: '14:00', patient: 'Sarah J.', therapy: 'Fisioterapi', therapist: 'dr. Maya', branch: 'Jakarta', status: 'Confirmed' },
    { time: '15:30', patient: 'Bima A.', therapy: 'Terapi Wicara', therapist: 'Sinta R.', branch: 'Bandung', status: 'Pending' },
    { time: '16:00', patient: 'Nadira P.', therapy: 'Okupasi', therapist: 'Hana P.', branch: 'Surabaya', status: 'Finished' },
  ];

  return (
    <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="relative overflow-hidden group hover:scale-[1.02]">
          <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">Pendapatan</p>
              <h3 className="text-2xl font-bold text-medical-secondary font-display">{formatCurrency(stats.totalRevenue)}</h3>
              <div className="flex items-center gap-1 mt-3">
                <div className="flex items-center text-emerald-500 text-[10px] font-bold bg-emerald-50 px-1.5 py-0.5 rounded-lg">
                  <ArrowUpRight size={12} /> 12.4%
                </div>
                <span className="text-slate-300 text-[10px] font-medium tracking-tight">vs bulan lalu</span>
              </div>
            </div>
            <div className="p-2.5 bg-blue-50 text-blue-500 rounded-2xl group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
              <TrendingUp size={20} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden group hover:scale-[1.02]">
          <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">Total Pasien</p>
              <h3 className="text-2xl font-bold text-medical-secondary font-display">{stats.totalPatients} Pasien</h3>
              <div className="flex items-center gap-1 mt-3">
                <span className="text-blue-500 text-[10px] font-bold bg-blue-50 px-1.5 py-0.5 rounded-lg">
                  {activeBranchId === 'ALL' ? '4 Cabang' : 'Aktif'}
                </span>
                <span className="text-slate-300 text-[10px] font-medium tracking-tight">Terdaftar</span>
              </div>
            </div>
            <div className="p-2.5 bg-cyan-50 text-cyan-500 rounded-2xl group-hover:bg-cyan-400 group-hover:text-white transition-all duration-300">
              <Users size={20} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden group hover:scale-[1.02]">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">Jadwal Hari Ini</p>
              <h3 className="text-2xl font-bold text-medical-secondary font-display">{stats.totalBookingsToday} Sesi</h3>
              <div className="flex items-center gap-1 mt-3">
                <div className="flex items-center text-emerald-500 text-[10px] font-bold bg-emerald-50 px-1.5 py-0.5 rounded-lg">
                  <ArrowUpRight size={12} /> +5 Sesi
                </div>
                <span className="text-slate-300 text-[10px] font-medium tracking-tight">dari kemarin</span>
              </div>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
              <Calendar size={20} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden group hover:scale-[1.02]">
          <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold mb-1">Tagihan</p>
              <h3 className="text-2xl font-bold text-medical-secondary font-display">{stats.pendingInvoices} Invoice</h3>
              <div className="flex items-center gap-1 mt-3">
                <span className="text-rose-500 text-[10px] font-bold bg-rose-50 px-1.5 py-0.5 rounded-lg uppercase tracking-wider">
                  Pending
                </span>
                <span className="text-slate-300 text-[10px] font-medium tracking-tight">Perlu dicek</span>
              </div>
            </div>
            <div className="p-2.5 bg-rose-50 text-rose-500 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
              <Receipt size={20} />
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-bold text-medical-secondary font-display tracking-tight">Performa Pendapatan Cabang</h3>
              <p className="text-xs text-slate-400 font-medium tracking-wide mt-1 uppercase">Omzet bulanan per lokasi klinik</p>
            </div>
            <button className="p-2 bg-slate-50 text-medical-primary rounded-xl hover:bg-medical-primary hover:text-white transition-all duration-300 group">
              <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F1F5F9'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                  {revenueData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Distribusi Jenis Terapi</h3>
              <p className="text-sm text-slate-500">Layanan paling banyak digunakan</p>
            </div>
          </div>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Fisioterapi', value: 40 },
                    { name: 'Terapi Wicara', value: 25 },
                    { name: 'Okupasi Terapi', value: 20 },
                    { name: 'Konseling', value: 15 },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 ml-4">
              {['Fisioterapi', 'Terapi Wicara', 'Okupasi Terapi', 'Konseling'].map((type, i) => (
                <div key={type} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                  <span className="text-xs font-bold text-slate-600">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Jadwal Terapi Semua Cabang</h3>
            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wider">
              Hari Ini
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="pb-3 px-2">Jam</th>
                  <th className="pb-3 px-2">Pasien</th>
                  <th className="pb-3 px-2">Layanan</th>
                  <th className="pb-3 px-2">Terapis</th>
                  <th className="pb-3 px-2">Cabang</th>
                  <th className="pb-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentBookings.map((booking, i) => (
                  <tr key={i} className="group hover:bg-blue-50/50 transition-colors">
                    <td className="py-4 px-2">
                      <span className="text-sm font-bold text-slate-900">{booking.time}</span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                          {booking.patient}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase">
                        {booking.therapy}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <Stethoscope size={12} className="text-blue-600" />
                        </div>
                        <span className="text-sm text-slate-600 font-medium">{booking.therapist}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Building2 size={14} />
                        <span className="text-xs font-medium">{booking.branch}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                        booking.status === 'Confirmed' ? "bg-emerald-100 text-emerald-700" :
                        booking.status === 'Pending' ? "bg-amber-100 text-amber-700" :
                        "bg-blue-100 text-blue-700"
                      )}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white border-none">
            <h4 className="text-sm font-bold opacity-80 uppercase tracking-widest mb-1">Performa Cabang Terbaik</h4>
            <h3 className="text-xl font-bold mb-4">Jakarta – Sudirman</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-80">Kunjungan</span>
                <span className="font-bold">+24%</span>
              </div>
              <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[85%] rounded-full shadow-lg"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-80">Pendapatan</span>
                <span className="font-bold">Rp 48.5jt</span>
              </div>
            </div>
            <button className="w-full mt-6 bg-white text-blue-600 py-2.5 rounded-xl text-sm font-bold shadow-xl shadow-blue-900/10 hover:bg-slate-50 transition-all">
              Detail Performa
            </button>
          </GlassCard>

          <GlassCard>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Peringatan Operasional</h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start p-3 bg-rose-50 rounded-xl">
                <div className="p-1.5 bg-rose-100 text-rose-600 rounded-lg">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-rose-900">Jadwal Bentrok</p>
                  <p className="text-[10px] text-rose-600 mt-0.5">2 Sesi di Klinik Bandung jam 14:00</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 bg-amber-50 rounded-xl">
                <div className="p-1.5 bg-amber-100 text-amber-600 rounded-lg">
                  <Receipt size={16} />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-900">Tagihan Jatuh Tempo</p>
                  <p className="text-[10px] text-amber-600 mt-0.5">8 Invoice belum lunas di Surabaya</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
