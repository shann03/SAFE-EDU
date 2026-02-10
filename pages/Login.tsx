
import React, { useState } from 'react';
import { PREDEFINED_ACCOUNTS } from '../constants';
import { User } from '../types';
import { Mail, Lock, ShieldCheck, AlertCircle, Shield } from 'lucide-react';

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

    setTimeout(() => {
      const account = PREDEFINED_ACCOUNTS.find(
        (acc) => acc.email === email && acc.password === password
      );

      if (account) {
        onLogin(account.user);
      } else {
        setError('The email or password you entered is incorrect. Please try again.');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Subtle school-pattern background effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-6 gap-20 p-20 transform -rotate-12">
          {Array.from({ length: 24 }).map((_, i) => (
            <Shield key={i} size={80} />
          ))}
        </div>
      </div>

      <div className="w-full max-w-md relative z-10 px-6">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="p-8 pb-4 text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl">
              <ShieldCheck size={40} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">SAFE-EDU</h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Student Assistance, Fairness, and Enforcement for Education</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-5">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs animate-in fade-in duration-300">
                <AlertCircle size={18} className="shrink-0 text-amber-600" />
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Work Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400"
                    placeholder="official.email@school.gov.ph"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Access Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none transition-all placeholder:text-slate-400"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg disabled:opacity-70"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>
          </form>

          <div className="px-8 pb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-white px-3 text-slate-400">Department Role Entry</span></div>
            </div>
            
            <div className="grid grid-cols-1 gap-2 text-center">
              <div className="flex justify-center gap-4">
                <button onClick={() => {setEmail('teacher@gmail.com'); setPassword('12345678');}} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-colors underline">Teacher</button>
                <button onClick={() => {setEmail('counselor@gmail.com'); setPassword('12345678');}} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-colors underline">Counselor</button>
                <button onClick={() => {setEmail('admin@gmail.com'); setPassword('12345678');}} className="text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-colors underline">Administrator</button>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-center text-slate-400 text-[10px] flex items-center justify-center gap-2 uppercase tracking-widest font-bold">
          <Shield size={12} className="text-teal-600" />
          Compliant with Data Privacy Act of 2012
        </p>
      </div>
    </div>
  );
};

export default Login;
