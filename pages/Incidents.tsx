
import React, { useMemo } from 'react';
import { MOCK_INCIDENTS, MOCK_STUDENTS } from '../constants';
import { AlertTriangle, Plus, Search, Filter, MoreVertical, ShieldCheck, Eye } from 'lucide-react';
import { User } from '../types';

interface IncidentsProps {
  currentUser: User;
}

const Incidents: React.FC<IncidentsProps> = ({ currentUser }) => {
  // Teachers only see their own reports. Others see everything.
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
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Incident Management</h2>
          <p className="text-slate-500">
            {isTeacher 
              ? 'View and report behavioral incidents you have observed.' 
              : 'Review and manage all reported incidents across campus.'}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          <Plus size={18} />
          Report New Incident
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Pending Review</p>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">
            {visibleIncidents.filter(i => i.status === 'Pending').length}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Under Investigation</p>
          <h3 className="text-2xl font-bold text-indigo-600 mt-1">
            {visibleIncidents.filter(i => i.status === 'Investigating').length}
          </h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Resolved</p>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {visibleIncidents.filter(i => i.status === 'Resolved').length}
          </h3>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search reports..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
        
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Reported Date</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visibleIncidents.map((inc) => {
              const student = MOCK_STUDENTS.find(s => s.id === inc.student_id);
              return (
                <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">Bullying</p>
                    <p className="text-xs text-slate-500 truncate max-w-[150px]">{inc.location}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{student?.first_name} {student?.last_name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{new Date(inc.date_reported).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      inc.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 
                      inc.status === 'Investigating' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {inc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-indigo-50 rounded-lg text-indigo-600 transition-colors" title="View Details">
                        <Eye size={16} />
                      </button>
                      {(isCounselor || isAdmin) && (
                        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400" title="More Options">
                          <MoreVertical size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {visibleIncidents.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                  No incident reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
        <ShieldCheck size={14} className="text-indigo-600" />
        All data is handled in compliance with RA 10173 and DepEd Child Protection Policies.
      </div>
    </div>
  );
};

export default Incidents;
