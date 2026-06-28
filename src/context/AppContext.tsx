import React, { createContext, useContext, useState, useCallback } from 'react';
import { CLINICS, PATIENTS, BOOKINGS, THERAPISTS, INVOICES } from '../data/mockData';
import { ClinicBranch, Patient, Booking, Therapist, Invoice, UserRole, PaymentMethod, CartItem } from '../types';

interface AppContextType {
  clinics: ClinicBranch[];
  patients: Patient[];
  bookings: Booking[];
  therapists: Therapist[];
  invoices: Invoice[];
  activeBranchId: string | 'ALL';
  currentRole: UserRole;
  setActiveBranchId: (id: string | 'ALL') => void;
  setCurrentRole: (role: UserRole) => void;
  stats: {
    totalRevenue: number;
    totalPatients: number;
    totalBookingsToday: number;
    pendingInvoices: number;
  };
  createInvoice: (patientId: string, items: CartItem[], branchId: string) => Invoice;
  updateInvoiceStatus: (invoiceId: string, status: Invoice['status'], paymentMethod?: PaymentMethod) => void;
  addPatient: (patient: Omit<Patient, 'id'>) => Patient;
  addBooking: (booking: Omit<Booking, 'id'>) => Booking;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function generateInvoiceNumber(branchCode: string): string {
  const count = INVOICES.length + Math.floor(Math.random() * 100);
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${branchCode}-INV-${y}-${String(count).padStart(4, '0')}`;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clinics] = useState<ClinicBranch[]>(CLINICS);
  const [patients, setPatients] = useState<Patient[]>(PATIENTS);
  const [bookings, setBookings] = useState<Booking[]>(BOOKINGS);
  const [therapists] = useState<Therapist[]>(THERAPISTS);
  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES);
  const [activeBranchId, setActiveBranchId] = useState<string | 'ALL'>('ALL');
  const [currentRole, setCurrentRole] = useState<UserRole>('OWNER');

  const filteredPatients = activeBranchId === 'ALL'
    ? patients
    : patients.filter(p => p.primaryBranchId === activeBranchId);

  const filteredInvoices = activeBranchId === 'ALL'
    ? invoices
    : invoices.filter(i => i.branchId === activeBranchId);

  const filteredBookings = activeBranchId === 'ALL'
    ? bookings
    : bookings.filter(b => b.branchId === activeBranchId);

  const totalRevenue = activeBranchId === 'ALL'
    ? clinics.reduce((acc, c) => acc + c.monthlyRevenue, 0)
    : clinics.find(c => c.id === activeBranchId)?.monthlyRevenue || 0;

  const totalPatients = filteredPatients.length;
  const totalBookingsToday = filteredBookings.length;
  const pendingInvoices = filteredInvoices.filter(i => i.status === 'Belum Lunas').length;

  const stats = {
    totalRevenue,
    totalPatients,
    totalBookingsToday,
    pendingInvoices
  };

  const createInvoice = useCallback((patientId: string, items: CartItem[], branchId: string): Invoice => {
    const branch = clinics.find(c => c.id === branchId);
    const branchCode = branch?.code ?? 'XXX';
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: generateInvoiceNumber(branchCode),
      branchId,
      patientId,
      amount: total,
      date: new Date().toISOString().split('T')[0],
      status: 'Belum Lunas',
      items,
    };

    setInvoices(prev => [newInvoice, ...prev]);
    return newInvoice;
  }, [clinics]);

  const updateInvoiceStatus = useCallback((
    invoiceId: string,
    status: Invoice['status'],
    paymentMethod?: PaymentMethod,
  ) => {
    setInvoices(prev => prev.map(inv =>
      inv.id === invoiceId
        ? { ...inv, status, paymentMethod: paymentMethod ?? inv.paymentMethod }
        : inv
    ));
  }, []);

  const addPatient = useCallback((patientData: Omit<Patient, 'id'>): Patient => {
    const newPatient: Patient = {
      ...patientData,
      id: `pat-${Date.now()}`
    };
    setPatients(prev => [newPatient, ...prev]);
    return newPatient;
  }, []);

  const addBooking = useCallback((bookingData: Omit<Booking, 'id'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`
    };
    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  }, []);

  return (
    <AppContext.Provider value={{
      clinics,
      patients,
      bookings,
      therapists,
      invoices,
      activeBranchId,
      currentRole,
      setActiveBranchId,
      setCurrentRole,
      stats,
      createInvoice,
      updateInvoiceStatus,
      addPatient,
      addBooking,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
