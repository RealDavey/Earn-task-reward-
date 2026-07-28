import { AppProvider, useApp } from './store';
import Layout from './components/Layout';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Wallet from './components/Wallet';
import Referrals from './components/Referrals';
import Profile from './components/Profile';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'landing': return <Landing />;
      case 'login': return <Login />;
      case 'register': return <Register />;
      case 'dashboard': return <Dashboard />;
      case 'tasks': return <Tasks />;
      case 'wallet': return <Wallet />;
      case 'referrals': return <Referrals />;
      case 'profile': return <Profile />;
      default: return <Landing />;
    }
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
