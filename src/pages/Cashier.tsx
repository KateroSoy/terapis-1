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
  ChevronRight,
  Receipt,
  CheckCircle2,
  Clock,
  Smartphone,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/common/GlassCard';
import { PaymentModal } from '../components/modals/PaymentModal';
import { formatCurrency } from '../lib/utils';
import { CartItem, PaymentMethod, PaymentTransaction } from '../types';

const PRODUCTS = [
  { id: 'p1', name: 'Fisioterapi Reguler', price: 250000, icon: '⚡' },
  { id: 'p2', name: 'Terapi Wicara', price: 200000, icon: '🗣️' },
  { id: 'p3', name: 'Okupasi Terapi', price: 225000, icon: '🖐️' },
  { id: 'p4', name: 'Paket 5 Sesi', price: 1100000, icon: '🎁' },
  { id: 'p5', name: 'Gel Pereda Nyeri', price: 85000, icon: '🧴' },
  { id: 'p6', name: 'Korset Lumbal', price: 350000, icon: '🎗️' },
];

export const Cashier: React.FC = () => {
  const { patients, activeBranchId, createInvoice, updateInvoiceStatus } = useApp();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id ?? '');
  const [showPatientSelect, setShowPatientSelect] = useState(false);
  const [patientSearch, setPatientSearch] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<{ id: string; number: string } | null>(null);
  const [paidInvoices, setPaidInvoices] = useState<string[]>([]);

  const branchPatients = activeBranchId === 'ALL'
    ? patients
    : patients.filter(p => p.primaryBranchId === activeBranchId);

  const filteredPatients = patientSearch
    ? branchPatients.filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase()))
    : branchPatients;

  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item
    ).filter(item => item.qty > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (!selectedPatient) return;

    const branchId = activeBranchId === 'ALL' ? 'c1' : activeBranchId;
    const invoice = createInvoice(selectedPatientId, cart, branchId);
    setCurrentInvoice({ id: invoice.id, number: invoice.invoiceNumber });
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = (transaction: PaymentTransaction) => {
    if (currentInvoice) {
      updateInvoiceStatus(currentInvoice.id, 'Lunas', transaction.method);
      setPaidInvoices(prev => [...prev, currentInvoice.id]);
    }
    setCart([]);
  };

  return (
    <div className="p-8 h-[calc(100vh-80px)] flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-medical-secondary font-display">Kasir / POS</h1>
          <p className="text-slate-500 font-medium">Point of Sale untuk layanan dan produk klinik.</p>
        </div>
        <div className="relative flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setShowPatientSelect(!showPatientSelect)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 transition-colors"
          >
            <User size={18} />
            {selectedPatient?.name ?? 'Pilih Pasien'}
          </button>

          {showPatientSelect && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50"
            >
              <div className="p-3 border-b border-slate-100">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    placeholder="Cari pasien..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-100"
                    autoFocus
                  />
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredPatients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { setSelectedPatientId(p.id); setShowPatientSelect(false); setPatientSearch(''); }}
                    className={`w-full text-left px-4 py-3 text-sm font-bold hover:bg-blue-50 transition-colors flex items-center gap-3 ${
                      p.id === selectedPatientId ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black shrink-0">
                      {p.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate">{p.name}</p>
                      <p className="text-[10px] font-medium text-slate-400">{p.therapyType}</p>
                    </div>
                  </button>
                ))}
                {filteredPatients.length === 0 && (
                  <p className="px-4 py-6 text-xs text-slate-400 text-center font-medium">Pasien tidak ditemukan</p>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex-1 flex gap-8 overflow-hidden">
        {/* Product Catalog */}
        <div className="flex-[2] flex flex-col gap-6 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((item) => (
              <GlassCard
                key={item.id}
                className="p-4 cursor-pointer hover:scale-[1.03] active:scale-95 transition-all group border-slate-100 shadow-sm"
                onClick={() => addToCart(item)}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="text-sm font-bold text-slate-800 mb-1 group-hover:text-medical-primary transition-colors">
                  {item.name}
                </h4>
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
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag size={28} className="text-slate-300" />
                </div>
                <p className="text-sm font-bold text-slate-400">Keranjang kosong</p>
                <p className="text-xs text-slate-300 font-medium mt-1">Pilih produk atau layanan</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-slate-800">{item.name}</h4>
                    <p className="text-xs text-blue-600 font-bold mt-0.5">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="p-1 text-slate-500 hover:text-medical-primary transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-bold text-slate-700 w-4 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="p-1 text-slate-500 hover:text-medical-primary transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-300 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
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

            {paidInvoices.length > 0 && (
              <div className="bg-emerald-50 rounded-xl p-3 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                <div className="text-xs font-medium text-emerald-700">
                  {paidInvoices.length} invoice berhasil dibayar
                </div>
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={cart.length === 0 || !selectedPatient}
              className="w-full mt-4 bg-medical-secondary hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2 group"
            >
              <CreditCard size={18} />
              Bayar Sekarang
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </GlassCard>
      </div>

      {/* Payment Modal */}
      {currentInvoice && selectedPatient && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setCurrentInvoice(null);
          }}
          amount={total}
          invoiceId={currentInvoice.id}
          invoiceNumber={currentInvoice.number}
          patientName={selectedPatient.name}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};
