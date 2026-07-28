import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Task, Transaction, View } from './types';

interface AppState {
  currentView: View;
  user: User | null;
  tasks: Task[];
  transactions: Transaction[];
  setView: (view: View) => void;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  completeTask: (taskId: string) => void;
  requestWithdrawal: (amount: number) => void;
  claimDailyBonus: () => void;
}

const defaultTasks: Task[] = [
  { id: '1', title: 'Watch Promotional Video', description: 'Watch a 30-second video to earn rewards (Max 7/day).', reward: 5000, status: 'available' },
  { id: '2', title: 'Follow on Twitter', description: 'Follow our official Twitter account.', reward: 2500, status: 'available' },
  { id: '3', title: 'Join Telegram Group', description: 'Join our community on Telegram.', reward: 3000, status: 'available' },
  { id: '4', title: 'Daily Check-in', description: 'Check in today for your daily bonus.', reward: 1000, status: 'available' },
];

const defaultTransactions: Transaction[] = [
  { id: 't1', type: 'reward', amount: 5000, date: new Date().toISOString(), status: 'completed' }
];

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [transactions, setTransactions] = useState<Transaction[]>(defaultTransactions);

  useEffect(() => {
    const savedUser = localStorage.getItem('taskearn_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      const today = new Date().toISOString().split('T')[0];
      if (parsedUser.lastAdDate !== today) {
        parsedUser.adsWatchedToday = 0;
        parsedUser.lastAdDate = today;
      }
      setUser(parsedUser);
      setCurrentView('dashboard');
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('taskearn_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('taskearn_user');
    }
  }, [user]);

  const setView = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const completeTask = (taskId: string) => {
    if (taskId === '1' && user && user.adsWatchedToday >= 7) {
      alert("You have reached your daily limit of 7 ads.");
      return;
    }

    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: 'pending' } : t));
    // Simulate approval after 2 seconds
    setTimeout(() => {
      setTasks(currentTasks => currentTasks.map(t => t.id === taskId ? { ...t, status: taskId === '1' ? 'available' : 'completed' } : t));
      const completedTask = tasks.find(t => t.id === taskId);
      
      // Update state in an effect-safe way by using functional state update if needed, but here we can just update user
      setUser(prevUser => {
        if (!prevUser || !completedTask) return prevUser;
        const updates: Partial<User> = {
          balance: prevUser.balance + completedTask.reward,
          totalEarnings: prevUser.totalEarnings + completedTask.reward
        };
        if (taskId === '1') {
          updates.adsWatchedToday = prevUser.adsWatchedToday + 1;
        }
        return { ...prevUser, ...updates };
      });

      if (completedTask) {
        setTransactions(prev => [{
          id: Math.random().toString(),
          type: 'reward',
          amount: completedTask.reward,
          date: new Date().toISOString(),
          status: 'completed'
        }, ...prev]);
      }
    }, 2000);
  };

  const requestWithdrawal = (amount: number) => {
    if (user && user.balance >= amount) {
      updateUser({
        balance: user.balance - amount,
        pendingBalance: user.pendingBalance + amount
      });
      setTransactions(prev => [{
        id: Math.random().toString(),
        type: 'withdrawal',
        amount: amount,
        date: new Date().toISOString(),
        status: 'pending'
      }, ...prev]);
    }
  };

  const claimDailyBonus = () => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    if (user.lastBonusDate === today) {
      alert('You have already claimed your daily bonus today.');
      return;
    }

    const isFirstTime = !user.lastBonusDate;
    const bonusAmount = isFirstTime ? 3000 : 1000;

    setUser(prevUser => {
      if (!prevUser) return prevUser;
      return {
        ...prevUser,
        balance: prevUser.balance + bonusAmount,
        totalEarnings: prevUser.totalEarnings + bonusAmount,
        lastBonusDate: today
      };
    });

    setTransactions(prev => [{
      id: Math.random().toString(),
      type: 'reward',
      amount: bonusAmount,
      date: new Date().toISOString(),
      status: 'completed'
    }, ...prev]);
    
    alert(`You successfully claimed ₦${bonusAmount.toLocaleString()} daily bonus!`);
  };

  return (
    <AppContext.Provider value={{ currentView, user, tasks, transactions, setView, setUser, updateUser, completeTask, requestWithdrawal, claimDailyBonus }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
