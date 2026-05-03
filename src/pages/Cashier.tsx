import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User, 
  CreditCard, 
  Banknote, 
  Wallet, 
  Plus, 
  Minus, 
  Trash2, 
  Tag,
  ChevronRight,
  Receipt
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/common/GlassCard';
import { formatCurrency } from '../lib/utils';

export const Cashier: React.FC = () => {
  const { patients } = useApp();
  const [cart, setCart] = useState([
    { id: 1, name: 'Sesi Fisioterapi (Reguler)', price: 250000, qty: 1 },
    { id: 2, name: 'Gel Terapi Muskuloskeletal', price: 85000, qty: 2 },
  ]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  return (
    <div className="p-8 h-[calc(100vh-80px)] flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-medical-secondary font-display">Kasir / POS</h1>
          <p className="text-slate-500 font-medium">Point of Sale untuk layanan dan produk klinik.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm">
            <User size={18} />
            Pilih Pasien: Sarah Johnson
          </div>
          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
        {/* Product Catalog */}
        <div className="flex-[2] flex flex-col gap-6 overflow-y-auto pr-2">
          <div className="grid grid-cols-3 gap-4">
            {['Semua', 'Terapi', 'Paket', 'Produk', 'Alat Kesehatan'].map((cat, i) => (
              <button 
                key={cat}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  i === 0 
                    ? "bg-medical-primary border-medical-primary text-white shadow-lg shadow-blue-200" 
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Fisioterapi Reguler', price: 250000, icon: '⚡' },
              { name: 'Terapi Wicara', price: 200000, icon: '🗣️' },
              { name: 'Okupasi Terapi', price: 225000, icon: '🖐️' },
              { name: 'Paket 5 Sesi', price: 1100000, icon: '🎁' },
              { name: 'Gel Pereda Nyeri', price: 85000, icon: '🧴' },
              { name: 'Korset Lumbal', price: 350000, icon: '🎗️' },
            ].map((item, i) => (
              <GlassCard key={i} className="p-4 cursor-pointer hover:scale-[1.03] active:scale-95 transition-all group border-slate-100 shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-medical-primary transition-colors">{item.name}</h4>
                <p className="text-sm font-bold text-blue-600">{formatCurrency(item.price)}</p>
                <button className="mt-3 w-full py-2 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-wider group-hover:bg-blue-600 group-hover:text-white transition-all">
                  Tambah ke Keranjang
                </button>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Cart / Summary */}
        <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden border-slate-100 shadow-xl">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag size={20} className="text-medical-primary" />
              Keranjang Belanja
            </h3>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
              {cart.length} Item
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                  <p className="text-xs text-blue-600 font-bold mt-0.5">{formatCurrency(item.price)}</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                  <button className="p-1 text-slate-500 hover:text-medical-primary transition-colors"><Minus size={14} /></button>
                  <span className="text-xs font-bold text-slate-700 w-4 text-center">{item.qty}</span>
                  <button className="p-1 text-slate-500 hover:text-medical-primary transition-colors"><Plus size={14} /></button>
                </div>
                <button className="text-slate-300 hover:text-rose-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="p-6 bg-slate-50/80 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-500">
              <span>PPN (11%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total</span>
              <span className="text-lg text-medical-primary font-display">{formatCurrency(total)}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-6">
              <button className="flex flex-col items-center justify-center gap-1 p-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all">
                <Banknote size={16} /> Tunai
              </button>
              <button className="flex flex-col items-center justify-center gap-1 p-2 bg-blue-600 border border-blue-600 rounded-xl text-[10px] font-bold text-white shadow-lg shadow-blue-200">
                <CreditCard size={16} /> QRIS / Debit
              </button>
              <button className="flex flex-col items-center justify-center gap-1 p-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all">
                <Wallet size={16} /> E-Wallet
              </button>
            </div>

            <button className="w-full mt-4 bg-medical-secondary text-white py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group">
              Bayar Sekarang
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
