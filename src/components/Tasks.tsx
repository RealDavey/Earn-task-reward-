import { useState, useEffect } from 'react';
import { useApp } from '../store';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Clock, PlayCircle, ListTodo, X } from 'lucide-react';

export default function Tasks() {
  const { tasks, completeTask } = useApp();
  const [activeTab, setActiveTab] = useState<'available' | 'completed'>('available');
  const [watchingAdId, setWatchingAdId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  const filteredTasks = tasks.filter(t => 
    activeTab === 'available' ? t.status === 'available' : t.status !== 'available'
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (watchingAdId && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (watchingAdId && timeLeft === 0) {
      completeTask(watchingAdId);
      setWatchingAdId(null);
    }
    return () => clearTimeout(timer);
  }, [watchingAdId, timeLeft, completeTask]);

  const handleStartTask = (taskId: string, title: string) => {
    if (title.toLowerCase().includes('video') || title.toLowerCase().includes('ad')) {
      setTimeLeft(30);
      setWatchingAdId(taskId);
      // Attempt to push AdSense ad
      setTimeout(() => {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense error:", e);
        }
      }, 500);
    } else if (title.toLowerCase().includes('telegram')) {
      window.open('https://t.me/+w5WTcNOfjc02OWY8', '_blank');
      completeTask(taskId);
    } else {
      completeTask(taskId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
          <ListTodo className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Task Center</h1>
          <p className="text-slate-500 text-sm">Complete tasks to earn money</p>
        </div>
      </div>

      <div className="flex p-1 bg-slate-200/50 rounded-xl">
        <button 
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'available' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
          onClick={() => setActiveTab('available')}
        >
          Available
        </button>
        <button 
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === 'completed' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
          onClick={() => setActiveTab('completed')}
        >
          History
        </button>
      </div>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No tasks found in this category.
          </div>
        ) : (
          filteredTasks.map((task, index) => (
            <motion.div 
              key={task.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                    {task.title.includes('Video') ? <PlayCircle className="w-6 h-6" /> : <ListTodo className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight mb-1">{task.title}</h3>
                    <p className="text-sm text-slate-500">{task.description}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-green-600">+₦{task.reward.toLocaleString()}</div>
                </div>
              </div>

              {task.status === 'available' && (
                <button 
                  onClick={() => handleStartTask(task.id, task.title)}
                  className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Start Task
                </button>
              )}
              {task.status === 'pending' && (
                <div className="w-full py-3 bg-amber-50 text-amber-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-amber-100">
                  <Clock className="w-4 h-4" /> Pending Approval
                </div>
              )}
              {task.status === 'completed' && (
                <div className="w-full py-3 bg-green-50 text-green-600 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border border-green-100">
                  <CheckCircle2 className="w-4 h-4" /> Completed
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {watchingAdId && (
          <motion.div
            className="fixed inset-0 bg-slate-900/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md rounded-3xl overflow-hidden relative shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Sponsored Content
                </div>
                {timeLeft === 0 ? (
                  <button onClick={() => setWatchingAdId(null)} className="p-2 bg-slate-200 rounded-full hover:bg-slate-300">
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="text-sm font-bold text-slate-500 flex items-center gap-1">
                    Reward in {timeLeft}s
                  </div>
                )}
              </div>
              <div className="p-6 aspect-video bg-slate-100 flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Earn task */}
                <ins className="adsbygoogle"
                     style={{ display: 'block', width: '100%', height: '100%' }}
                     data-ad-client="ca-pub-1918660894785188"
                     data-ad-slot="7240913922"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <p className="text-slate-400 text-sm mt-4">AdSense Ad Space</p>
                <p className="text-xs text-slate-400 mt-2">Please wait while the ad plays...</p>
              </div>
              <div className="p-4 bg-slate-50 text-center text-sm text-slate-500 border-t border-slate-100">
                Do not close this window to receive your reward.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
