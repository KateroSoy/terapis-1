import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Stethoscope, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Clock,
  LayoutGrid,
  List,
  Filter,
  Building2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard, StatusBadge } from '../components/common/GlassCard';
import { cn } from '../lib/utils';

export const Booking: React.FC = () => {
  const { bookings, patients, therapists, clinics, activeBranchId } = useApp();
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');

  const filteredBookings = activeBranchId === 'ALL'
    ? bookings
    : bookings.filter(b => b.branchId === activeBranchId);

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Booking Pasien</h2>
          <p className="text-slate-500">Kelola antrian dan jadwal kunjungan terapi</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
            <button 
              onClick={() => setViewMode('list')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'list' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
              )}
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === 'calendar' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
              )}
            >
              <LayoutGrid size={18} />
            </button>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            <Plus size={18} />
            Buat Booking Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <GlassCard className="lg:col-span-3" noPadding>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-400">
                  <ChevronLeft size={18} />
                </button>
                <h3 className="text-lg font-bold text-slate-900">2 November 2026</h3>
                <button className="p-1.5 hover:bg-white rounded-lg transition-all text-slate-400">
                  <ChevronRight size={18} />
                </button>
              </div>
              <div className="h-6 w-[1px] bg-slate-200"></div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">Hari Ini</span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Senin</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl">
                <Building2 size={16} className="text-slate-400" />
                <select className="text-xs font-bold text-slate-600 bg-transparent outline-none cursor-pointer">
                  <option>Semua Cabang</option>
                  {clinics.map(c => <option key={c.id}>{c.city}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/30">
                  <th className="py-4 px-6">Waktu</th>
                  <th className="py-4 px-6">Pasien</th>
                  <th className="py-4 px-6">Terapi</th>
                  <th className="py-4 px-6">Terapis</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredBookings.map((booking) => {
                  const patient = patients.find(p => p.id === booking.patientId);
                  const therapist = therapists.find(t => t.id === booking.therapistId);
                  const clinic = clinics.find(c => c.id === booking.branchId);

                  return (
                    <tr key={booking.id} className="group hover:bg-blue-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-blue-500" />
                          <span className="text-sm font-bold text-slate-900">{booking.time}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                            {patient?.name}
                          </span>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                            <Building2 size={10} />
                            {clinic?.city}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg uppercase">
                          {booking.therapyTypeId}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                            <Stethoscope size={14} className="text-blue-600" />
                          </div>
                          <span className="text-xs font-bold text-slate-600">{therapist?.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <StatusBadge 
                          status={booking.status} 
                          type={
                            booking.status === 'Terkonfirmasi' ? 'info' : 
                            booking.status === 'Selesai' ? 'success' : 
                            booking.status === 'Menunggu' ? 'warning' : 'neutral'
                          } 
                        />
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="text-[10px] font-bold text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors uppercase">Check-in</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="border-l-4 border-l-rose-500">
            <div className="flex items-center gap-2 mb-4 text-rose-600">
              <AlertCircle size={20} />
              <h3 className="font-bold text-sm uppercase tracking-wider">Konflik Jadwal</h3>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                <p className="text-xs font-bold text-rose-900 mb-1 leading-tight">dr. Maya Lestari</p>
                <p className="text-[10px] text-rose-600 leading-relaxed font-bold uppercase tracking-tighter">
                  Jadwal di Jakarta (14:00) & Tangerang (15:00). Jeda waktu tidak cukup.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
