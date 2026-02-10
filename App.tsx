
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Incidents from './pages/Incidents';
import Interventions from './pages/Interventions';
import UserManagement from './pages/UserManagement';
import Login from './pages/Login';
import { User } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Check local storage for persistent session
    const savedUser = localStorage.getItem('edutrack_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('edutrack_user');
      }
    }
    setIsInitializing(false);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('edutrack_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('edutrack_user');
    setActiveTab('Dashboard');
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Students':
        return <Students currentUser={currentUser} />;
      case 'Incidents':
        return <Incidents currentUser={currentUser} />;
      case 'Interventions':
        return <Interventions currentUser={currentUser} />;
      case 'User Management':
        return <UserManagement />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{activeTab} Section</h2>
            <p className="max-w-md">The {activeTab} module is restricted or currently being optimized for your role as a {currentUser.role}.</p>
          </div>
        );
    }
  };

  return (
    <Layout 
      user={currentUser} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
