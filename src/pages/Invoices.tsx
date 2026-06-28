import React, { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  ArrowUpRight,
  CreditCard,
  Eye,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard } from '../components/common/GlassCard';
import { PaymentModal } from '../components/modals/PaymentModal';
import { formatCurrency, formatDate } from '../lib/utils';
import { cn } from '../lib/utils';
import { PaymentTransaction } from '../types';

export const Invoices: React.FC = () => {
  const { invoices, patients, activeBranchId, updateInvoiceStatus } = useApp();
  const [payingInvoice, setPayingInvoice] = useState<{ id: string; number: string; amount: number; patientName: string } | null>(null);

  const filteredInvoices = activeBranchId === 'ALL'
    ? invoices
    : invoices.filter(i => i.branchId === activeBranchId);

  const getPatientName = (patientId: string): string => {
    return patients.find(p => p.id === patientId)?.name ?? 'Pasien Tidak Diketahui';
  };

  const totalLunas = filteredInvoices
    .filter(i => i.status === 'Lunas')
    .reduce((acc, i) => acc + i.amount, 0);

  const totalPending = filteredInvoices
    .filter(i => i.status !== 'Lunas')
    .reduce((acc, i) => acc + i.amount, 0);

  const totalAll = filteredInvoices.reduce((acc, i) => acc + i.amount, 0);

  const handlePaymentSuccess = (transaction: PaymentTransaction) => {
    if (payingInvoice) {
      updateInvoiceStatus(payingInvoice.id, 'Lunas', transaction.method);
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-medical-secondary font-display">Daftar Invoice</h1>
          <p className="text-slate-500 font-medium">Manajemen pembayaran dan penagihan pasien.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-medical-primary text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Plus size={18} />
            Buat Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="bg-gradient-to-br from-emerald-500 to-teal-400 border-none text-white p-6">
          <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest mb-1">Total Tertagih</p>
          <h3 className="text-2xl font-bold font-display">{formatCurrency(totalAll)}</h3>
          <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold bg-white/20 w-fit px-2 py-1 rounded-lg">
            <ArrowUpRight size={12} /> +8.2% vs bulan lalu
          </div>
        </GlassCard>
        <GlassCard className="bg-gradient-to-br from-amber-500 to-orange-400 border-none text-white p-6">
          <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest mb-1">Belum Lunas</p>
          <h3 className="text-2xl font-bold font-display">{formatCurrency(totalPending)}</h3>
          <p className="mt-4 text-[10px] font-bold opacity-80">
            Dari {filteredInvoices.filter(i => i.status !== 'Lunas').length} Invoice Pending
          </p>
        </GlassCard>
        <GlassCard className="bg-gradient-to-br from-blue-500 to-indigo-400 border-none text-white p-6">
          <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest mb-1">Sudah Lunas</p>
          <h3 className="text-2xl font-bold font-display">{formatCurrency(totalLunas)}</h3>
          <p className="mt-4 text-[10px] font-bold opacity-80">
            {filteredInvoices.length > 0
              ? `${Math.round((filteredInvoices.filter(i => i.status === 'Lunas').length / filteredInvoices.length) * 100)}% dari total invoice`
              : 'Belum ada data'}
          </p>
        </GlassCard>
      </div>

      <GlassCard className="p-0 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Cari nomor invoice atau nama pasien..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all text-sm font-medium"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50">
            <Filter size={18} />
            Filter Status
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">No. Invoice</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Pasien</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Tanggal</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Jumlah</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Metode</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredInvoices.map((invoice) => {
                const patientName = getPatientName(invoice.patientId);
                const initial = patientName.charAt(0).toUpperCase();
                const isUnpaid = invoice.status === 'Belum Lunas' || invoice.status === 'Jatuh Tempo';

                return (
                  <tr key={invoice.id} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="py-5 px-6">
                      <span className="text-sm font-bold text-slate-900">{invoice.invoiceNumber}</span>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-[10px] shrink-0">
                          {initial}
                        </div>
                        <span className="text-sm font-bold text-slate-700 uppercase tracking-tight">{patientName}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-xs font-medium text-slate-500">{formatDate(invoice.date)}</span>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-sm font-bold text-slate-900">{formatCurrency(invoice.amount)}</span>
                    </td>
                    <td className="py-5 px-6">
                      <span className="text-xs font-medium text-slate-500">
                        {invoice.paymentMethod
                          ? getPaymentMethodDisplay(invoice.paymentMethod)
                          : '—'
                        }
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <span className={cn(
                        "text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit",
                        invoice.status === 'Lunas' ? "bg-emerald-100 text-emerald-700" :
                        invoice.status === 'Belum Lunas' ? "bg-amber-100 text-amber-700" :
                        invoice.status === 'Jatuh Tempo' ? "bg-rose-100 text-rose-700" :
                        "bg-slate-100 text-slate-500"
                      )}>
                        {invoice.status === 'Lunas' ? <CheckCircle2 size={12} /> :
                         invoice.status === 'Belum Lunas' ? <Clock size={12} /> :
                         invoice.status === 'Jatuh Tempo' ? <AlertCircle size={12} /> : null}
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {isUnpaid && (
                          <button
                            onClick={() => setPayingInvoice({
                              id: invoice.id,
                              number: invoice.invoiceNumber,
                              amount: invoice.amount,
                              patientName,
                            })}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold transition-all shadow-sm"
                          >
                            <CreditCard size={12} />
                            Bayar
                          </button>
                        )}
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-slate-400 text-sm font-medium">
                    Belum ada data invoice.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Payment Modal */}
      {payingInvoice && (
        <PaymentModal
          isOpen={!!payingInvoice}
          onClose={() => setPayingInvoice(null)}
          amount={payingInvoice.amount}
          invoiceId={payingInvoice.id}
          invoiceNumber={payingInvoice.number}
          patientName={payingInvoice.patientName}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

function getPaymentMethodDisplay(method: string): string {
  const map: Record<string, string> = {
    qris: '📱 QRIS',
    gopay: '🟢 GoPay',
    ovo: '🟣 OVO',
    bank_transfer: '🏦 Transfer',
    tunai: '💵 Tunai',
  };
  return map[method] ?? method;
}
