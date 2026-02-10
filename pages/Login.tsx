
import React, { useState } from 'react';
import { PREDEFINED_ACCOUNTS } from '../constants';
import { User } from '../types';
import { Mail, Lock, ShieldCheck, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      const account = PREDEFINED_ACCOUNTS.find(
        (acc) => acc.email === email && acc.password === password
      );

      if (account) {
        onLogin(account.user);
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-slate-200 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-8 pb-6 text-center">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-6 shadow-lg shadow-indigo-200">
              E
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">EduTrack Pro</h1>
            <p className="text-slate-600 mt-2 font-medium">Student Behavior & Incident Management</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 pt-2 space-y-6">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm animate-in fade-in zoom-in duration-300">
                <AlertCircle size={20} className="shrink-0 text-red-600" />
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 font-medium text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-400"
                    placeholder="name@school.edu"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2 ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl text-slate-900 font-medium text-base focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black text-lg hover:bg-indigo-700 active:scale-[0.97] transition-all shadow-xl shadow-indigo-100 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="px-8 pb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-xs uppercase font-bold"><span className="bg-white px-3 text-slate-500">Quick Access for Demo</span></div>
            </div>
            
            <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-100">
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => {setEmail('teacher@gmail.com'); setPassword('12345678');}}
                  className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">Teacher Portal</p>
                    <p className="text-xs text-slate-500">teacher@gmail.com</p>
                  </div>
                  <ShieldCheck size={18} className="text-slate-300 group-hover:text-indigo-500" />
                </button>
                <button 
                  onClick={() => {setEmail('counselor@gmail.com'); setPassword('12345678');}}
                  className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">Counselor Portal</p>
                    <p className="text-xs text-slate-500">counselor@gmail.com</p>
                  </div>
                  <ShieldCheck size={18} className="text-slate-300 group-hover:text-indigo-500" />
                </button>
                <button 
                  onClick={() => {setEmail('admin@gmail.com'); setPassword('12345678');}}
                  className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">Admin Portal</p>
                    <p className="text-xs text-slate-500">admin@gmail.com</p>
                  </div>
                  <ShieldCheck size={18} className="text-slate-300 group-hover:text-indigo-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-500 text-sm font-semibold flex items-center justify-center gap-2">
          <ShieldCheck size={16} className="text-indigo-600" />
          Authorized Educational Use Only
        </p>
      </div>
    </div>
  );
};

export default Login;
