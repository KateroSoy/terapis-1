import { PaymentMethod, PaymentTransaction } from '../types';

const TRANSACTIONS: PaymentTransaction[] = [];

function generateOrderId(): string {
  const date = new Date();
  const ts = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `INV-${ts}-${rand}`;
}

function generateFakeQrCode(amount: number, orderId: string): string {
  const data = [
    '████████████████████████████████████████',
    '██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████',
    '██░░████████████████████████████░░████',
    '██░░████                            ██',
    '██░░████   QRIS PEMBAYARAN          ██',
    '██░░████   Rp ' + String(amount).padEnd(10, ' ') + '  ██',
    '██░░████                            ██',
    '██░░████   Order: ' + orderId.padEnd(8, ' ') + '  ██',
    '██░░████                            ██',
    '██░░████   Scan dengan              ██',
    '██░░████   Aplikasi Pembayaran      ██',
    '██░░████                            ██',
    '██░░████████████████████████████░░████',
    '██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████',
    '████████████████████████████████████████',
    '   ██████████████████████████████████   ',
    '  ██  ████  ██  ██  ████  ██  ████ ██  ',
    ' ██ ██  ██ ████ ████ ██  ██ ██  ██ ██  ',
    ' ██ ██  ██ ██  ██  ██ ██  ██ ██  ██ ██  ',
    '  ██ ████  ██  ██  ██  ████  ██  ██ ██  ',
    '   ██████████████████████████████████   ',
  ].join('\n');
  return data;
}

function getPaymentMethodLabel(method: PaymentMethod): string {
  const labels: Record<PaymentMethod, string> = {
    qris: 'QRIS',
    gopay: 'GoPay',
    ovo: 'OVO',
    bank_transfer: 'Transfer Bank',
    tunai: 'Tunai',
  };
  return labels[method];
}

function getPaymentMethodIcon(method: PaymentMethod): string {
  const icons: Record<PaymentMethod, string> = {
    qris: '📱',
    gopay: '🟢',
    ovo: '🟣',
    bank_transfer: '🏦',
    tunai: '💵',
  };
  return icons[method];
}

export const paymentGateway = {
  createTransaction: (
    invoiceId: string,
    amount: number,
    method: PaymentMethod
  ): Promise<{ transaction: PaymentTransaction; orderId: string }> => {
    return new Promise((resolve) => {
      const orderId = generateOrderId();
      const transaction: PaymentTransaction = {
        id: `trx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        invoiceId,
        orderId,
        amount,
        method,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      if (method === 'qris') {
        transaction.qrCode = generateFakeQrCode(amount, orderId);
      }

      TRANSACTIONS.push(transaction);

      setTimeout(() => {
        resolve({ transaction, orderId });
      }, 800);
    });
  },

  checkStatus: (orderId: string): Promise<PaymentTransaction | null> => {
    return new Promise((resolve) => {
      const tx = TRANSACTIONS.find(t => t.orderId === orderId);
      setTimeout(() => resolve(tx ?? null), 300);
    });
  },

  simulatePayment: (orderId: string): Promise<PaymentTransaction> => {
    return new Promise((resolve) => {
      const tx = TRANSACTIONS.find(t => t.orderId === orderId);
      if (!tx) throw new Error('Transaction not found');

      setTimeout(() => {
        tx.status = 'success';
        tx.paidAt = new Date().toISOString();
        resolve({ ...tx });
      }, 2500);
    });
  },

  getTransactionsForInvoice: (invoiceId: string): PaymentTransaction[] => {
    return TRANSACTIONS.filter(t => t.invoiceId === invoiceId);
  },

  getPaymentMethodLabel,
  getPaymentMethodIcon,

  paymentMethods: [
    { id: 'qris' as PaymentMethod, label: 'QRIS', icon: '📱', desc: 'Scan QR dengan GoPay, OVO, LinkAja, dll' },
    { id: 'gopay' as PaymentMethod, label: 'GoPay', icon: '🟢', desc: 'Bayar dengan GoPay wallet' },
    { id: 'ovo' as PaymentMethod, label: 'OVO', icon: '🟣', desc: 'Bayar dengan OVO Cash' },
    { id: 'bank_transfer' as PaymentMethod, label: 'Transfer Bank', icon: '🏦', desc: 'BCA, Mandiri, BNI, BRI' },
    { id: 'tunai' as PaymentMethod, label: 'Tunai', icon: '💵', desc: 'Pembayaran langsung di kasir' },
  ],
};
