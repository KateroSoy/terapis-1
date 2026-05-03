export type UserRole = 'OWNER' | 'ADMIN_CABANG' | 'TERAPIS' | 'KASIR' | 'MANAGER_KLINIK';

export interface ClinicBranch {
  id: string;
  name: string;
  code: string;
  city: string;
  address: string;
  whatsapp: string;
  email: string;
  picName: string;
  status: 'ACTIVE' | 'INACTIVE';
  staffCount: number;
  patientCount: number;
  monthlyRevenue: number;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'L' | 'P';
  phone: string;
  address: string;
  primaryBranchId: string;
  lastBranchId: string;
  therapyType: string;
  lastVisit: string;
  status: 'Aktif' | 'Paket Aktif' | 'Evaluasi' | 'Nonaktif';
  outstandingBill: number;
  totalSessions: number;
  guardianName?: string;
  diagnosis?: string;
}

export interface Booking {
  id: string;
  branchId: string;
  patientId: string;
  therapyTypeId: string;
  therapistId: string;
  roomId: string;
  date: string;
  time: string;
  status: 'Menunggu' | 'Terkonfirmasi' | 'Selesai' | 'Batal';
  paymentStatus: 'Belum Bayar' | 'Lunas';
}

export interface Therapist {
  id: string;
  name: string;
  title: string;
  specialization: string;
  branchIds: string[];
  activePatients: number;
  completedSessions: number;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  branchId: string;
  therapistId: string;
  date: string;
  therapyType: string;
  soap: {
    s: string; // Subjective
    o: string; // Objective
    a: string; // Assessment
    p: string; // Plan
  };
  progress: 'Membaik' | 'Stabil' | 'Perlu Evaluasi';
  homeExercise: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  branchId: string;
  patientId: string;
  amount: number;
  date: string;
  status: 'Lunas' | 'Belum Lunas' | 'Jatuh Tempo' | 'Dibatalkan';
  paymentMethod?: string;
}

export interface TherapyPackage {
  id: string;
  patientId: string;
  name: string;
  totalSessions: number;
  usedSessions: number;
  expiryDate: string;
}
