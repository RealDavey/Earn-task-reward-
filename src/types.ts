export type View =
  | 'landing'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'tasks'
  | 'referrals'
  | 'wallet'
  | 'profile'
  | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  pendingBalance: number;
  totalEarnings: number;
  referralCount: number;
  referralCode: string;
  adsWatchedToday: number;
  lastAdDate: string;
  lastBonusDate?: string;
  bankName?: 'OPay' | 'PalmPay';
  accountNumber?: string;
  accountName?: string;
  isAdmin?: boolean;
}

export type TaskStatus = 'available' | 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  status: TaskStatus;
  icon?: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'reward' | 'referral';
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}
