import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Calendar, User, Phone, MapPin, Building2, CheckCircle2, Clock, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export const OnlineRegistration: React.FC = () => {
  const navigate = useNavigate();
  const { clinics, therapists, addPatient, addBooking } = useApp();
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'L' as 'L' | 'P',
    phone: '',
    address: '',
    branchId: clinics[0]?.id || '',
    therapyType: 'Fisioterapi',
    date: '',
    time: '09:00',
  });

  const therapyTypes = ['Fisioterapi', 'Terapi Wicara', 'Okupasi Terapi', 'Konseling', 'Tumbuh Kembang'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Add Patient
      const newPatient = addPatient({
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
      phone: formData.phone,
      address: formData.address,
      primaryBranchId: formData.branchId,
      lastBranchId: formData.branchId,
      therapyType: formData.therapyType,
      lastVisit: '-',
      status: 'Aktif',
      outstandingBill: 0,
      totalSessions: 0,
    });

    // Find a therapist for this branch (dummy selection)
    const branchTherapists = therapists.filter(t => t.branchIds.includes(formData.branchId));
    const therapistId = branchTherapists.length > 0 ? branchTherapists[0].id : therapists[0]?.id || 't1';

    // Add Booking
    addBooking({
      branchId: formData.branchId,
      patientId: newPatient.id,
      therapyTypeId: formData.therapyType,
      therapistId: therapistId,
      roomId: 'r1', // dummy room
      date: formData.date,
      time: formData.time,
      status: 'Menunggu',
      paymentStatus: 'Belum Bayar',
    });

    setIsSubmitting(false);
    setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#F7FBFC] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-8 text-center shadow-2xl shadow-blue-900/5"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={40} />
          </motion.div>
          <h2 className="text-2xl font-black text-slate-900 mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-slate-500 mb-8">
            Terima kasih telah mendaftar. Tim kami akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi jadwal.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all"
          >
            Kembali ke Beranda
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7FBFC] py-12 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 cursor-pointer hover:scale-105 transition-transform" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg">K</div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">KlinikTerapis<span className="text-blue-600">Pro</span></span>
          </div>
          <h2 className="text-3xl font-black tracking-tight mb-2">Daftar Pasien Baru & Booking</h2>
          <p className="text-slate-500">Silakan isi formulir di bawah ini untuk pendaftaran terapi</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 p-6 md:p-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2">
              <User size={18} className="text-blue-600"/> Data Pasien
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nama Pasien"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Usia</label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: 8"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Jenis Kelamin</label>
                <select
                  value={formData.gender}
                  onChange={e => setFormData({...formData, gender: e.target.value as 'L' | 'P'})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Phone size={14} className="text-slate-400"/> No. WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0812..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin size={14} className="text-slate-400"/> Alamat
              </label>
              <textarea
                required
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
                placeholder="Alamat domisili"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2">
              <Calendar size={18} className="text-blue-600"/> Detail Terapi & Jadwal
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Building2 size={14} className="text-slate-400"/> Cabang Klinik
                </label>
                <select
                  value={formData.branchId}
                  onChange={e => setFormData({...formData, branchId: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {clinics.map(c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Jenis Terapi</label>
                <select
                  value={formData.therapyType}
                  onChange={e => setFormData({...formData, therapyType: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {therapyTypes.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar size={14} className="text-slate-400"/> Tanggal
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Clock size={14} className="text-slate-400"/> Jam
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-black text-lg transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={24} className="animate-spin" /> Memproses...
                </>
              ) : (
                'Daftar & Booking Jadwal'
              )}
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">
              Dengan mendaftar, Anda menyetujui syarat & ketentuan KlinikTerapisPro
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
