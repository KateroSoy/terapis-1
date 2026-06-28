import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  Smartphone,
  Banknote,
  Wallet,
  Building2,
  CreditCard,
  Copy,
  ExternalLink,
  Loader2,
  PartyPopper,
} from 'lucide-react';
import { PaymentMethod, PaymentTransaction } from '../../types';
import { paymentGateway } from '../../services/paymentGateway';
import { formatCurrency } from '../../lib/utils';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  invoiceId: string;
  invoiceNumber: string;
  patientName: string;
  onPaymentSuccess: (transaction: PaymentTransaction) => void;
}

type PaymentStep = 'select_method' | 'payment_process' | 'success';

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  invoiceId,
  invoiceNumber,
  patientName,
  onPaymentSuccess,
}) => {
  const [step, setStep] = useState<PaymentStep>('select_method');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [transaction, setTransaction] = useState<PaymentTransaction | null>(null);
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('select_method');
      setSelectedMethod(null);
      setTransaction(null);
      setOrderId('');
      setIsProcessing(false);
      setIsCheckingPayment(false);
      setCopied(false);
    }
  }, [isOpen]);

  const handleSelectMethod = async (method: PaymentMethod) => {
    setSelectedMethod(method);
    setStep('payment_process');
    setIsProcessing(true);

    try {
      const result = await paymentGateway.createTransaction(invoiceId, amount, method);
      setOrderId(result.orderId);
      setTransaction(result.transaction);
    } catch {
      //
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSimulatePayment = useCallback(async () => {
    if (!orderId || isCheckingPayment) return;
    setIsCheckingPayment(true);

    try {
      const updatedTx = await paymentGateway.simulatePayment(orderId);
      setTransaction(updatedTx);
      setStep('success');
      onPaymentSuccess(updatedTx);
    } catch {
      //
    } finally {
      setIsCheckingPayment(false);
    }
  }, [orderId, isCheckingPayment, onPaymentSuccess]);

  const handleCopy = () => {
    if (transaction?.qrCode) {
      navigator.clipboard.writeText(transaction.qrCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                {step !== 'select_method' && (
                  <button
                    onClick={() => setStep('select_method')}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={18} className="text-slate-500" />
                  </button>
                )}
                <h2 className="font-black text-slate-900 text-lg">Pembayaran</h2>
              </div>
              <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                <X size={18} className="text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Invoice Info */}
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Invoice</span>
                  <span className="text-xs font-bold text-slate-600">{invoiceNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">{patientName}</span>
                  <span className="text-xl font-black text-medical-primary font-display">{formatCurrency(amount)}</span>
                </div>
              </div>

              {/* Steps */}
              {step === 'select_method' && (
                <div>
                  <h3 className="font-bold text-slate-900 mb-4">Pilih Metode Pembayaran</h3>
                  <div className="space-y-3">
                    {paymentGateway.paymentMethods.map((method) => (
                      <motion.button
                        key={method.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleSelectMethod(method.id)}
                        className="w-full flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all text-left group"
                      >
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl group-hover:bg-blue-100 transition-colors">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-slate-900">{method.label}</p>
                          <p className="text-[11px] font-medium text-slate-400">{method.desc}</p>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-blue-500 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full group-hover:bg-blue-500 transition-colors" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'payment_process' && (
                <div>
                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      >
                        <Loader2 size={40} className="text-medical-primary" />
                      </motion.div>
                      <p className="mt-4 font-bold text-slate-600">Menyiapkan pembayaran...</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {selectedMethod === 'qris' && transaction?.qrCode && (
                        <div>
                          <h3 className="font-bold text-slate-900 text-center mb-4">Scan QRIS</h3>
                          <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 max-w-xs mx-auto">
                            <pre className="text-[5px] leading-[5px] font-mono text-center text-slate-800 select-none">
                              {transaction.qrCode}
                            </pre>
                          </div>
                          <p className="text-xs text-slate-400 text-center mt-3 font-medium">
                            Scan dengan GoPay, OVO, LinkAja, atau m-Banking
                          </p>
                        </div>
                      )}

                      {selectedMethod === 'gopay' && (
                        <div className="text-center py-8">
                          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-4xl mb-4">🟢</div>
                          <h3 className="font-bold text-slate-900 text-lg">GoPay</h3>
                          <p className="text-xs text-slate-400 mt-2 font-medium">Bayar menggunakan GoPay wallet Anda</p>
                          <div className="mt-6 bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500">GoPay ID</p>
                            <p className="font-black text-slate-900 text-lg">0812-3456-7890</p>
                          </div>
                        </div>
                      )}

                      {selectedMethod === 'ovo' && (
                        <div className="text-center py-8">
                          <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto text-4xl mb-4">🟣</div>
                          <h3 className="font-bold text-slate-900 text-lg">OVO</h3>
                          <p className="text-xs text-slate-400 mt-2 font-medium">Bayar menggunakan OVO Cash Anda</p>
                          <div className="mt-6 bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500">OVO ID</p>
                            <p className="font-black text-slate-900 text-lg">0812-3456-7890</p>
                          </div>
                        </div>
                      )}

                      {selectedMethod === 'bank_transfer' && (
                        <div className="space-y-4">
                          <h3 className="font-bold text-slate-900 text-center mb-2">Transfer Bank</h3>
                          {[
                            { bank: 'BCA', account: '123 456 7890', name: 'PT Klinik Terapis Pro' },
                            { bank: 'Mandiri', account: '123 00 9999 888', name: 'PT Klinik Terapis Pro' },
                            { bank: 'BNI', account: '123 456 789', name: 'PT Klinik Terapis Pro' },
                          ].map((b) => (
                            <div key={b.bank} className="bg-slate-50 rounded-2xl p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-bold text-slate-900">{b.bank}</p>
                                  <p className="text-xs text-slate-500 font-medium mt-0.5">{b.account}</p>
                                  <p className="text-[10px] text-slate-400 mt-0.5">a.n. {b.name}</p>
                                </div>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(b.account);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                  }}
                                  className="p-2 bg-white rounded-xl border border-slate-200 text-slate-500 hover:text-blue-600 transition-colors"
                                >
                                  <Copy size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                          {copied && (
                            <p className="text-xs text-center text-emerald-600 font-bold">✓ No. rekening disalin!</p>
                          )}
                        </div>
                      )}

                      {selectedMethod === 'tunai' && (
                        <div className="text-center py-8">
                          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-4xl mb-4">💵</div>
                          <h3 className="font-bold text-slate-900 text-lg">Tunai</h3>
                          <p className="text-xs text-slate-400 mt-2 font-medium">Pembayaran langsung di kasir</p>
                          <div className="mt-6 bg-slate-50 rounded-2xl p-4">
                            <p className="text-xs font-bold text-slate-500">Total Bayar</p>
                            <p className="font-black text-medical-primary text-2xl font-display">{formatCurrency(amount)}</p>
                          </div>
                        </div>
                      )}

                      {/* Simulate Payment Button */}
                      <button
                        onClick={handleSimulatePayment}
                        disabled={isCheckingPayment}
                        className="w-full bg-medical-primary hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                      >
                        {isCheckingPayment ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            >
                              <Loader2 size={18} />
                            </motion.div>
                            Memproses Pembayaran...
                          </>
                        ) : (
                          <>
                            <CreditCard size={18} />
                            Konfirmasi Pembayaran
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                        <Clock size={14} />
                        Sesi akan berakhir dalam 15:00
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 'success' && (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                    className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    >
                      <PartyPopper size={48} className="text-emerald-500" />
                    </motion.div>
                  </motion.div>

                  <h3 className="font-black text-slate-900 text-2xl mb-2">Pembayaran Berhasil!</h3>
                  <p className="text-sm text-slate-500 font-medium mb-6">
                    Invoice {invoiceNumber} telah dibayar
                  </p>

                  <div className="bg-slate-50 rounded-2xl p-4 mb-8 text-left space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-400">Metode</span>
                      <span className="font-bold text-slate-700">
                        {selectedMethod && paymentGateway.getPaymentMethodIcon(selectedMethod)} {selectedMethod && paymentGateway.getPaymentMethodLabel(selectedMethod)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-400">Order ID</span>
                      <span className="font-bold text-slate-700 font-mono text-[10px]">{orderId}</span>
                    </div>
                    {transaction?.paidAt && (
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-400">Waktu</span>
                        <span className="font-bold text-slate-700">
                          {new Date(transaction.paidAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs pt-2 border-t border-slate-200">
                      <span className="font-bold text-slate-600">Total Dibayar</span>
                      <span className="font-black text-emerald-600">{formatCurrency(amount)}</span>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="w-full bg-medical-primary hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-blue-200"
                  >
                    Selesai
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
