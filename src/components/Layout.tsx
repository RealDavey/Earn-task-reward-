import { ReactNode } from 'react';
import { useApp } from '../store';
import { Home, ListTodo, Wallet, Users, User, LayoutDashboard } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  const { currentView, setView } = useApp();

  // Don't show layout for auth/landing pages
  if (['landing', 'login', 'register'].includes(currentView)) {
    return <>{children}</>;
  }

  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard className="w-6 h-6" />, label: 'Home' },
    { id: 'tasks', icon: <ListTodo className="w-6 h-6" />, label: 'Tasks' },
    { id: 'wallet', icon: <Wallet className="w-6 h-6" />, label: 'Wallet' },
    { id: 'referrals', icon: <Users className="w-6 h-6" />, label: 'Refer' },
    { id: 'profile', icon: <User className="w-6 h-6" />, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-0 md:flex">
      {/* Desktop Sidebar (hidden on mobile) */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-white border-r border-slate-100 z-50">
        <div className="p-6">
          <div className="text-blue-600 font-bold text-2xl flex items-center gap-2">
            TaskEarn
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                currentView === item.id 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 w-full">
        <div className="max-w-3xl mx-auto p-4 md:p-8 pt-6">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-2 py-3 flex justify-around items-center z-50 pb-safe shadow-[0_-5px_20px_-15px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as any)}
            className={`flex flex-col items-center justify-center w-16 gap-1 ${
              currentView === item.id ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            <div className={`transition-transform duration-200 ${currentView === item.id ? 'scale-110' : 'scale-100'}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
