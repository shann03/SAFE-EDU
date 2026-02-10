
import React, { useMemo } from 'react';
import { MOCK_INCIDENTS, MOCK_STUDENTS } from '../constants';
import { AlertTriangle, Plus, Search, Filter, MoreVertical, ShieldCheck, Eye, Download } from 'lucide-react';
import { User } from '../types';

interface IncidentsProps {
  currentUser: User;
}

const Incidents: React.FC<IncidentsProps> = ({ currentUser }) => {
  const visibleIncidents = useMemo(() => {
    if (currentUser.role === 'Teacher') {
      return MOCK_INCIDENTS.filter(inc => inc.reported_by_user_id === currentUser.id);
    }
    return MOCK_INCIDENTS;
  }, [currentUser]);

  const isTeacher = currentUser.role === 'Teacher';
  const isCounselor = currentUser.role === 'Counselor';
  const isAdmin = currentUser.role === 'Administrator';

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Assistance Records</h2>
          <p className="text-slate-500 font-medium">
            {isTeacher 
              ? 'Official registry of behavioral reports submitted for academic review.' 
              : 'Central management portal for all reported student safety events.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {(isAdmin || isCounselor) && (
            <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
              <Download size={14} /> Export Report
            </button>
          )}
          <button className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
            <Plus size={16} />
            Report New Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 border border-amber-100">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending Review</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {visibleIncidents.filter(i => i.status === 'Pending').length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 border border-blue-100">
            <Eye size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">In Investigation</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {visibleIncidents.filter(i => i.status === 'Investigating').length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 border border-teal-100">
            <ShieldCheck size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resolved Cases</p>
            <h3 className="text-2xl font-bold text-slate-900">
              {visibleIncidents.filter(i => i.status === 'Resolved').length}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between bg-slate-50/30">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Subject Name or ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-teal-500 outline-none font-medium"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
            <Filter size={14} /> Filter Status
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nature of Event</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Registry Date</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleIncidents.map((inc) => {
                const student = MOCK_STUDENTS.find(s => s.id === inc.student_id);
                return (
                  <tr key={inc.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-slate-900 tracking-tight">Bullying/Social</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Campus: {inc.location}</p>
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-slate-800">{student?.first_name} {student?.last_name}</td>
                    <td className="px-8 py-5 text-xs font-bold text-slate-500">{new Date(inc.date_reported).toLocaleDateString('en-PH', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest border ${
                        inc.status === 'Resolved' ? 'bg-teal-50 text-teal-700 border-teal-100' : 
                        inc.status === 'Investigating' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                      }`}>
                        {inc.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors" title="View Records">
                          <Eye size={16} />
                        </button>
                        {(isCounselor || isAdmin) && (
                          <button className="p-2 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-900 transition-colors" title="Administrative Options">
                            <MoreVertical size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center gap-2 p-5 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800">
        <ShieldCheck size={18} className="text-teal-400" />
        <span className="text-[10px] font-black uppercase tracking-widest">Authorized Internal Access Registry — Confidential Data Protection Active</span>
      </div>
    </div>
  );
};

export default Incidents;
