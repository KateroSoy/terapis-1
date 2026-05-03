import React, { useState } from 'react';
import { X, Calendar, Clock, User, Stethoscope, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GlassCard } from '../common/GlassCard';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg"
        >
          <GlassCard className="p-0 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-blue-600 text-white">
              <h3 className="text-xl font-bold">Buat Booking Baru</h3>
              <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Pilih Cabang Klinik</span>
                  <div className="relative">
                    <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none">
                      <option>Klinik Terapi Sehat Jakarta</option>
                      <option>Klinik Tumbuh Kembang Bandung</option>
                      <option>Klinik Fisioterapi Surabaya</option>
                    </select>
                  </div>
                </label>

                <label className="block">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Nama Pasien</span>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                    <input type="text" placeholder="Cari nama pasien..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none" />
                  </div>
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Pilih Layanan</span>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none">
                      <option>Fisioterapi</option>
                      <option>Terapi Wicara</option>
                      <option>Okupasi Terapi</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Pilih Terapis</span>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none">
                      <option>dr. Maya Lestari, Ftr</option>
                      <option>Sinta Rahma, S.Tr.TW</option>
                    </select>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Tanggal</span>
                    <div className="relative">
                      <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                      <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none" />
                    </div>
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Waktu</span>
                    <div className="relative">
                      <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                      <input type="time" className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none" />
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={onClose}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-500 border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Batal
                </button>
                <button 
                  onClick={() => {
                    alert('Booking berhasil dibuat!');
                    onClose();
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/20 transition-all active:scale-95"
                >
                  Konfirmasi Booking
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
