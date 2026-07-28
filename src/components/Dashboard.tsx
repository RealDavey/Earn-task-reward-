import { useApp } from '../store';
import { motion } from 'motion/react';
import { Wallet, TrendingUp, Users, Gift, ChevronRight, Clock } from 'lucide-react';

export default function Dashboard() {
  const { user, tasks, setView, claimDailyBonus } = useApp();

  if (!user) return null;

  const availableTasks = tasks.filter(t => t.status === 'available');
  const recentTasks = tasks.filter(t => t.status === 'completed' || t.status === 'pending').slice(0, 3);
  const today = new Date().toISOString().split('T')[0];
  const hasClaimedToday = user.lastBonusDate === today;
  const isFirstTime = !user.lastBonusDate;
  const bonusAmount = isFirstTime ? 3000 : 1000;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hi, {user.name.split(' ')[0]} 👋</h1>
          <p className="text-slate-500">Ready to earn today?</p>
        </div>
        <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
          {user.name.charAt(0)}
        </div>
      </div>

      {/* Balance Card */}
      <motion.div 
        className="bg-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Wallet className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <p className="text-blue-100 font-medium mb-1">Available Balance</p>
          <h2 className="text-4xl font-extrabold mb-4">₦{user.balance.toLocaleString()}</h2>
          <div className="flex gap-3">
            <button 
              onClick={() => setView('wallet')}
              className="px-5 py-2.5 bg-white text-blue-600 rounded-full font-bold text-sm shadow-sm hover:bg-blue-50 transition-colors"
            >
              Withdraw
            </button>
            <button 
              onClick={() => setView('tasks')}
              className="px-5 py-2.5 bg-blue-700 text-white rounded-full font-bold text-sm shadow-sm hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Earn More
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Earnings</p>
          <p className="text-xl font-bold text-slate-900">₦{user.totalEarnings.toLocaleString()}</p>
        </div>
        <div 
          className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:border-blue-200 transition-colors"
          onClick={() => setView('referrals')}
        >
          <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-slate-500 text-sm font-medium">Referrals</p>
          <p className="text-xl font-bold text-slate-900">{user.referralCount}</p>
        </div>
      </div>

      {/* Daily Reward */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Daily Bonus</h3>
            <p className="text-orange-100 text-sm">Claim your daily reward!</p>
          </div>
        </div>
        <button 
          onClick={claimDailyBonus}
          disabled={hasClaimedToday}
          className="px-4 py-2 bg-white text-orange-600 rounded-full font-bold text-sm hover:bg-orange-50 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {hasClaimedToday ? 'Claimed' : `Claim ₦${bonusAmount.toLocaleString()}`}
        </button>
      </div>

      {/* Available Tasks Preview */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-900 text-lg">Available Tasks</h3>
          <button onClick={() => setView('tasks')} className="text-blue-600 text-sm font-semibold flex items-center">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {availableTasks.slice(0, 3).map((task, index) => (
            <motion.div 
              key={task.id}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center font-bold text-slate-700 text-sm overflow-hidden px-1">
                  ₦{task.reward.toLocaleString()}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{task.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{task.description}</p>
                </div>
              </div>
              <button 
                onClick={() => setView('tasks')}
                className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
