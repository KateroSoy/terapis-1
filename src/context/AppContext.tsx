import React, { createContext, useContext, useState, useEffect } from 'react';
import { CLINICS, PATIENTS, BOOKINGS, THERAPISTS, INVOICES } from '../data/mockData';
import { ClinicBranch, Patient, Booking, Therapist, Invoice, UserRole } from '../types';

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
  // Dashboard calculated stats
  stats: {
    totalRevenue: number;
    totalPatients: number;
    totalBookingsToday: number;
    pendingInvoices: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

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
  const totalBookingsToday = filteredBookings.length; // Simplified for demo
  const pendingInvoices = filteredInvoices.filter(i => i.status === 'Belum Lunas').length;

  const stats = {
    totalRevenue,
    totalPatients,
    totalBookingsToday,
    pendingInvoices
  };

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
      stats
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
