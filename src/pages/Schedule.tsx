import React from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  User, 
  Stethoscope,
  Filter,
  MoreVertical
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/common/GlassCard';
import { cn } from '../lib/utils';

export const Schedule: React.FC = () => {
  const { bookings, therapists, activeBranchId } = useApp();

  const filteredBookings = activeBranchId === 'ALL'
    ? bookings
    : bookings.filter(b => b.branchId === activeBranchId);

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const days = [
    { name: 'Sen', date: '21 Mei' },
    { name: 'Sel', date: '22 Mei', active: true },
    { name: 'Rab', date: '23 Mei' },
    { name: 'Kam', date: '24 Mei' },
    { name: 'Jum', date: '25 Mei' },
    { name: 'Sab', date: '26 Mei' },
    { name: 'Min', date: '27 Mei' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-medical-secondary font-display text-transparent bg-clip-text bg-gradient-to-r from-medical-primary to-cyan-600">Jadwal Terapi</h1>
          <p className="text-slate-500 font-medium">Monitoring antrian dan ketersediaan terapis secara real-time.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button className="px-4 py-1.5 bg-medical-primary text-white rounded-lg text-sm font-bold shadow-md shadow-blue-200">Harian</button>
            <button className="px-4 py-1.5 text-slate-500 rounded-lg text-sm font-bold hover:bg-slate-50">Mingguan</button>
            <button className="px-4 py-1.5 text-slate-500 rounded-lg text-sm font-bold hover:bg-slate-50">Bulanan</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {days.map((day) => (
          <button 
            key={day.name} 
            className={cn(
              "flex flex-col items-center py-4 rounded-2xl transition-all border",
              day.active 
                ? "bg-medical-primary border-medical-primary text-white shadow-xl shadow-blue-200 -translate-y-1" 
                : "bg-white border-slate-100 text-slate-500 hover:border-blue-200 hover:bg-blue-50/50"
            )}
          >
            <span className={cn("text-xs font-bold uppercase tracking-widest", day.active ? "text-blue-100" : "text-slate-400")}>{day.name}</span>
            <span className="text-lg font-bold mt-1">{day.date}</span>
          </button>
        ))}
      </div>

      <GlassCard className="p-0 overflow-hidden border-slate-100">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600">
              <Filter size={16} />
              Semua Terapis
            </div>
            <div className="text-sm font-medium text-slate-400">Showing 12 sessions for today</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors"><ChevronLeft size={20} /></button>
            <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 w-32">Waktu</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Detail Sesi</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Terapis</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {timeSlots.map((time) => {
                const session = filteredBookings.find(b => b.time === time);
                const therapist = therapists.find(t => t.id === session?.therapistId);

                return (
                  <tr key={time} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-6 px-6 align-top">
                      <div className="flex items-center gap-2 text-slate-900">
                        <Clock size={16} className="text-slate-400" />
                        <span className="text-sm font-bold">{time}</span>
                      </div>
                    </td>
                    <td className="py-6 px-6">
                      {session ? (
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">{session.patientName}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase">{session.therapyType}</span>
                            <span className="text-[10px] font-medium text-slate-400">Room: {session.roomName}</span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs font-medium text-slate-300 italic">Slot Tersedia</span>
                      )}
                    </td>
                    <td className="py-6 px-6">
                      {therapist && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <Stethoscope size={14} className="text-blue-600" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700">{therapist.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{therapist.specialization}</span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="py-6 px-6 text-right">
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
