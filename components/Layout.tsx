
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { User } from '../types';
import { LogOut, Bell, Search, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, activeTab, setActiveTab, onLogout, searchQuery, setSearchQuery }) => {
  const filteredNavItems = NAV_ITEMS.filter(item => item.roles.includes(user.role));

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar - Deep Navy */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl z-20">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-teal-600 rounded flex items-center justify-center text-white">
              <ShieldCheck size={18} />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wider">SAFE-EDU</h1>
          </div>
          
          <nav className="space-y-1">
            {filteredNavItems.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === item.name 
                    ? 'bg-teal-700 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 shrink-0 rounded-lg bg-slate-800 flex items-center justify-center text-sm font-bold text-teal-500 border border-slate-700">
              {user.full_name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white truncate uppercase tracking-tighter" title={user.full_name}>{user.full_name}</p>
              <p className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs text-white bg-slate-800 border border-slate-700 hover:bg-red-900/20 hover:text-red-400 hover:border-red-900/50 rounded-lg font-bold uppercase tracking-widest transition-all"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-600 transition-colors" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Student ID, Name or Incident..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm focus:ring-1 focus:ring-teal-500 transition-all outline-none placeholder:text-slate-400 font-medium"
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-teal-50 rounded-full border border-teal-100">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-teal-700 uppercase tracking-widest">System Secured</span>
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-all relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 border-2 border-white rounded-full"></span>
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
