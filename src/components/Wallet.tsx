import { useState } from 'react';
import { useApp } from '../store';
import { Wallet, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function WalletView() {
  const { user, transactions, requestWithdrawal } = useApp();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showWithdraw, setShowWithdraw] = useState(false);

  if (!user) return null;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user.bankName || !user.accountNumber) {
      alert("Please set up your withdrawal account details (OPay or PalmPay) in your Profile first.");
      return;
    }

    const amount = parseFloat(withdrawAmount);
    
    if (user.referralCount < 10) {
      alert("You need at least 10 referrals before you can withdraw.");
      return;
    }

    if (amount < 200000) {
      alert("The minimum withdrawal amount is ₦200,000.");
      return;
    }

    if (amount > 0 && amount <= user.balance) {
      requestWithdrawal(amount);
      setWithdrawAmount('');
      setShowWithdraw(false);
      alert(`Withdrawal request for ₦${amount.toLocaleString()} submitted successfully!`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
          <Wallet className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Wallet</h1>
          <p className="text-slate-500 text-sm">Manage your funds</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-slate-400 font-medium mb-1">Available Balance</p>
          <h2 className="text-4xl font-extrabold mb-6">₦{user.balance.toLocaleString()}</h2>
          
          <div className="flex gap-3">
            <button 
              onClick={() => setShowWithdraw(!showWithdraw)}
              className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-100 transition-colors"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {showWithdraw && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100"
        >
          <h3 className="font-bold text-slate-900 mb-2">Request Withdrawal</h3>
          <p className="text-xs text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg">
            Note: You must have at least <strong className="text-slate-800">10 referrals</strong> (Current: {user.referralCount}) and a minimum balance of <strong className="text-slate-800">₦200,000</strong> to withdraw.
          </p>
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amount (₦)</label>
              <input 
                type="number" 
                min="200000" 
                step="1000"
                max={user.balance}
                value={withdrawAmount}
                onChange={e => setWithdrawAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none transition-all"
                placeholder="Min. ₦200,000"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm"
            >
              Confirm Withdrawal
            </button>
          </form>
        </motion.div>
      )}

      <div>
        <h3 className="font-bold text-slate-900 text-lg mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No transactions yet.</p>
          ) : (
            transactions.map((tx, index) => (
              <motion.div 
                key={tx.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    tx.type === 'withdrawal' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                  }`}>
                    {tx.type === 'withdrawal' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 capitalize">{tx.type}</h4>
                    <p className="text-xs text-slate-500">
                      {new Date(tx.date).toLocaleDateString()} • 
                      <span className="inline-flex items-center gap-1 ml-1 capitalize">
                        {tx.status === 'pending' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        {tx.status}
                      </span>
                    </p>
                  </div>
                </div>
                <div className={`text-right font-bold ${
                  tx.type === 'withdrawal' ? 'text-slate-900' : 'text-green-600'
                }`}>
                  {tx.type === 'withdrawal' ? '-' : '+'}₦{tx.amount.toLocaleString()}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
