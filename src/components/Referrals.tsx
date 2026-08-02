import { useApp } from '../store';
import { motion } from 'motion/react';
import { Users, Copy, Share2, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function Referrals() {
  const { user } = useApp();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://earn-task-reward.onrender.com/invite/${user.referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join TaskEarn',
          text: 'Get ₦6,500 for joining TaskEarn using my referral link!',
          url: `https://earn-task-reward.onrender.com/invite/${user.referralCode}`,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Referrals</h1>
          <p className="text-slate-500 text-sm">Invite friends and earn together</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Users className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Earn ₦6,500!</h2>
          <p className="text-purple-100 mb-6 max-w-[200px] text-sm">
            Get ₦6,500 for every friend you invite to the platform.
          </p>

          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/20">
            <p className="text-purple-100 text-xs font-medium mb-2 uppercase tracking-wider">Your Referral Link</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white/20 px-3 py-2.5 rounded-lg text-sm font-mono truncate border border-white/10">
                https://earn-task-reward.onrender.com/invite/{user.referralCode}
              </div>
              <button 
                onClick={copyToClipboard}
                className="w-10 h-10 bg-white text-purple-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm hover:bg-purple-50 transition-colors"
                title="Copy Link"
              >
                {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
              <button 
                onClick={shareLink}
                className="w-10 h-10 bg-white text-purple-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm hover:bg-purple-50 transition-colors"
                title="Share Link"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium mb-1">Total Invited</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-900">{user.referralCount}</h3>
            <span className="text-sm text-slate-500">friends</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm font-medium mb-1">Earnings</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-green-600">₦{(user.referralCount * 6500).toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-slate-900 text-lg mb-4">How it works</h3>
        <div className="space-y-4">
          {[
            { step: 1, title: 'Share your link', desc: 'Send your unique link to friends.' },
            { step: 2, title: 'They sign up', desc: 'Friends register using your link.' },
            { step: 3, title: 'You earn', desc: 'Get ₦6,500 when they join.' }
          ].map((item) => (
            <div key={item.step} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
                {item.step}
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
// Temporary mock import for missing icon above
import { CheckCircle2 } from 'lucide-react';
