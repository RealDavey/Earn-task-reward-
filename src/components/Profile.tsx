import { useState } from 'react';
import { useApp } from '../store';
import { User as UserIcon, Settings, LogOut, Bell, Shield, ChevronRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const { user, setUser, updateUser, setView } = useApp();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  
  // Edit forms
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const [bankName, setBankName] = useState<'OPay' | 'PalmPay' | ''>(user?.bankName || '');
  const [accountNumber, setAccountNumber] = useState(user?.accountNumber || '');
  const [accountName, setAccountName] = useState(user?.accountName || '');

  if (!user) return null;

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, phone });
    setActiveTab(null);
    alert('Personal information updated!');
  };

  const handleSaveBank = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName || !accountNumber || !accountName) {
      alert("Please provide bank name, account number, and account name.");
      return;
    }
    updateUser({ bankName: bankName as 'OPay' | 'PalmPay', accountNumber, accountName });
    setActiveTab(null);
    alert('Withdrawal account details saved successfully!');
  };

  if (activeTab === 'Withdrawal Account') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setActiveTab(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Withdrawal Account</h1>
        </div>
        
        <form onSubmit={handleSaveBank} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Select Bank</label>
            <select 
              value={bankName}
              onChange={e => setBankName(e.target.value as 'OPay' | 'PalmPay' | '')}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-white"
            >
              <option value="" disabled>Select a bank</option>
              <option value="OPay">OPay</option>
              <option value="PalmPay">PalmPay</option>
            </select>
            <p className="text-xs text-slate-500 mt-1">We currently only support OPay and PalmPay for withdrawals.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
            <input 
              type="text" 
              maxLength={10}
              value={accountNumber}
              onChange={e => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 8012345678"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Account Name</label>
            <input 
              type="text" 
              value={accountName}
              onChange={e => setAccountName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={!accountName || accountNumber.length < 10 || !bankName}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
            Save Account Details
          </button>
        </form>
      </div>
    );
  }

  if (activeTab === 'Personal Information') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setActiveTab(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">Personal Information</h1>
        </div>
        
        <form onSubmit={handleSaveInfo} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input 
              type="text" 
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
          
          <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 mt-4">
            Save Changes
          </button>
        </form>
      </div>
    );
  }

  if (activeTab && activeTab !== 'Personal Information') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setActiveTab(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="text-xl font-bold text-slate-900">{activeTab}</h1>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
          <p className="text-slate-500">Settings for {activeTab} are coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center">
          <UserIcon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
          <p className="text-slate-500 text-sm">Manage your account</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
        <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-3xl">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
          <p className="text-slate-500 text-sm mb-2">{user.email}</p>
          <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md">
            Active Member
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider px-2 pt-4">Account Settings</h3>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {[
            { icon: <UserIcon className="w-5 h-5" />, label: 'Personal Information' },
            { icon: <Shield className="w-5 h-5" />, label: 'Withdrawal Account' },
            { icon: <Shield className="w-5 h-5" />, label: 'Security & Password' },
            { icon: <Bell className="w-5 h-5" />, label: 'Notifications' },
            { icon: <Settings className="w-5 h-5" />, label: 'Preferences' },
          ].map((item, index) => (
            <button 
              key={index} 
              onClick={() => setActiveTab(item.label)}
              className="w-full flex items-center justify-between p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="text-slate-400">{item.icon}</div>
                <span className="font-medium">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 text-red-600 font-bold bg-white rounded-2xl shadow-sm border border-red-50 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" /> Log Out
        </button>
      </div>
    </div>
  );
}
