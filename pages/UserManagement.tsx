
import React from 'react';
import { UserPlus, Search, Shield, Trash2, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { PREDEFINED_ACCOUNTS } from '../constants';

const UserManagement: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Administration</h2>
          <p className="text-slate-500">Manage system custodians, teachers, and guidance counselor accounts.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all">
          <UserPlus size={18} />
          Invite New User
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
              <Shield size={20} />
            </div>
            <span className="text-[10px] font-black text-indigo-600 uppercase">System Health</span>
          </div>
          <p className="text-sm font-bold text-slate-800">Active Sessions</p>
          <h4 className="text-2xl font-black text-slate-900 mt-1">12</h4>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-[10px] font-black text-emerald-600 uppercase">Security</span>
          </div>
          <p className="text-sm font-bold text-slate-800">MFA Compliance</p>
          <h4 className="text-2xl font-black text-slate-900 mt-1">100%</h4>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-slate-200 rounded-lg text-slate-600">
              <AlertCircle size={20} />
            </div>
            <span className="text-[10px] font-black text-slate-600 uppercase">Audit</span>
          </div>
          <p className="text-sm font-bold text-slate-800">Pending Log Review</p>
          <h4 className="text-2xl font-black text-slate-900 mt-1">4</h4>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search users by name, email or role..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">User Profile</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Account Status</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {PREDEFINED_ACCOUNTS.map((acc, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {acc.user.full_name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{acc.user.full_name}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1"><Mail size={10} /> {acc.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                    acc.user.role === 'Administrator' ? 'bg-indigo-50 border-indigo-100 text-indigo-700' : 
                    acc.user.role === 'Counselor' ? 'bg-amber-50 border-amber-100 text-amber-700' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    {acc.user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-medium text-slate-600">Active</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400" title="Edit Permissions">
                      <Shield size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-400" title="Deactivate User">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
