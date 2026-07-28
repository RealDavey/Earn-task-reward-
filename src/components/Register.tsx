import { useState } from 'react';
import { useApp } from '../store';
import { motion } from 'motion/react';
import { Banknote, ArrowLeft } from 'lucide-react';

export default function Register() {
  const { setView, setUser } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock register
    setUser({
      id: Math.random().toString(),
      name: name,
      email: email,
      phone: '',
      balance: 5000, // Welcome bonus
      pendingBalance: 0,
      totalEarnings: 5000,
      referralCount: 0,
      referralCode: name.toUpperCase().replace(/\s/g, '') + '123',
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
          
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Create Account</h2>
          <p className="text-center text-slate-500 mb-8">Join today and get a ₦5,000 bonus</p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                placeholder="Create a password"
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg mt-2"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-8">
            Already have an account?{' '}
            <button onClick={() => setView('login')} className="text-blue-600 font-semibold hover:underline">
              Log in
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
