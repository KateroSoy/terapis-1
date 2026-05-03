import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Download, 
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart as PieIcon,
  Activity
} from 'lucide-react';
import { GlassCard } from '../components/common/GlassCard';
import { formatCurrency } from '../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export const FinancialReports: React.FC = () => {
  const data = [
    { name: 'Jan', revenue: 45000000, expenses: 32000000 },
    { name: 'Feb', revenue: 52000000, expenses: 34000000 },
    { name: 'Mar', revenue: 48000000, expenses: 31000000 },
    { name: 'Apr', revenue: 61000000, expenses: 38000000 },
    { name: 'Mei', revenue: 55000000, expenses: 35000000 },
    { name: 'Jun', revenue: 67000000, expenses: 40000000 },
  ];

  const branchData = [
    { name: 'Jakarta', value: 85000000 },
    { name: 'Bandung', value: 45000000 },
    { name: 'Surabaya', value: 62000000 },
    { name: 'Medan', value: 38000000 },
  ];

  const COLORS = ['#155EEF', '#7EE7F2', '#42C7A5', '#172B4D'];

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-medical-secondary font-display">Laporan Keuangan</h1>
          <p className="text-slate-500 font-medium">Analisis pendapatan, pengeluaran, dan profitabilitas bisnis.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} />
            Download PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-medical-primary text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Calendar size={18} />
            Mei 2024
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-5 border-l-4 border-l-blue-500">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Total Pendapatan</p>
          <h3 className="text-2xl font-bold text-slate-900 font-display">Rp 328.5M</h3>
          <div className="flex items-center gap-1 mt-3 text-emerald-500 text-xs font-bold">
            <ArrowUpRight size={14} /> 12.5% <span className="text-slate-400 font-medium">vs bln lalu</span>
          </div>
        </GlassCard>
        <GlassCard className="p-5 border-l-4 border-l-rose-500">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Total Pengeluaran</p>
          <h3 className="text-2xl font-bold text-slate-900 font-display">Rp 210.2M</h3>
          <div className="flex items-center gap-1 mt-3 text-rose-500 text-xs font-bold">
            <ArrowUpRight size={14} /> 4.2% <span className="text-slate-400 font-medium">vs bln lalu</span>
          </div>
        </GlassCard>
        <GlassCard className="p-5 border-l-4 border-l-emerald-500">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Laba Bersih</p>
          <h3 className="text-2xl font-bold text-slate-900 font-display">Rp 118.3M</h3>
          <div className="flex items-center gap-1 mt-3 text-emerald-500 text-xs font-bold">
            <ArrowUpRight size={14} /> 18.1% <span className="text-slate-400 font-medium">vs bln lalu</span>
          </div>
        </GlassCard>
        <GlassCard className="p-5 border-l-4 border-l-amber-500">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">Margin Profit</p>
          <h3 className="text-2xl font-bold text-slate-900 font-display">36.0%</h3>
          <div className="flex items-center gap-1 mt-3 text-emerald-500 text-xs font-bold">
            <Activity size={14} /> Stabil
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" />
              Tren Pendapatan & Pengeluaran
            </h3>
            <select className="bg-slate-50 border-none text-xs font-bold rounded-lg px-2 py-1 outline-none">
              <option>6 Bulan Terakhir</option>
              <option>1 Tahun Terakhir</option>
            </select>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#155EEF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#155EEF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#155EEF" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#F43F5E" strokeWidth={3} fill="none" strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 size={20} className="text-emerald-500" />
              Kontribusi Pendapatan per Cabang
            </h3>
            <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-wider">Detail Cabang</button>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12, fontWeight: 'bold'}} />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={40}>
                  {branchData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
