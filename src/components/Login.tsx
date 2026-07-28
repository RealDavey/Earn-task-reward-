import { useState } from 'react';
import { useApp } from '../store';
import { motion } from 'motion/react';
import { Banknote, ArrowLeft } from 'lucide-react';

export default function Login() {
  const { setView, setUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    setUser({
      id: 'u1',
      name: 'John Doe',
      email: email,
      phone: '+1 234 567 8900',
      balance: 15500,
      pendingBalance: 0,
      totalEarnings: 45000,
      referralCount: 3,
      referralCode: 'JOHNDOE123',
      adsWatchedToday: 0,
      lastAdDate: new Date().toISOString().split('T')[0]
    });
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button 
          onClick={() => setView('landing')} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to home
        </button>

        <motion.div 
          className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
              <Banknote className="w-8 h-8" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Welcome Back</h2>
          <p className="text-center text-slate-500 mb-8">Sign in to continue earning</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email or Phone</label>
              <input 
                type="text" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <button type="button" className="text-sm text-blue-600 hover:underline">Forgot?</button>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="Enter your password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg mt-2"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-8">
            Don't have an account?{' '}
            <button onClick={() => setView('register')} className="text-blue-600 font-semibold hover:underline">
              Sign up
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
