
import React from 'react';
import { ShieldAlert, Clock, BrainCircuit, UserCheck, Plus, Lock, MessageSquare } from 'lucide-react';
import { User } from '../types';

interface InterventionsProps {
  currentUser: User;
}

const Interventions: React.FC<InterventionsProps> = ({ currentUser }) => {
  const isCounselor = currentUser.role === 'Counselor';
  const isAdmin = currentUser.role === 'Administrator';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welfare Interventions</h2>
          <p className="text-slate-500">Manage behavioral growth plans and counseling records.</p>
        </div>
        {isCounselor && (
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            <Plus size={18} />
            New Intervention Plan
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">AI Counselor Assistant</h4>
                <p className="text-sm text-slate-500">
                  {isCounselor ? 'Analyze behavioral patterns to generate suggested strategies.' : 'Monitoring AI-generated behavioral insights (Read-only)'}
                </p>
              </div>
            </div>
            {isCounselor ? (
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
                Launch Assistant
              </button>
            ) : (
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase px-2 py-1 bg-slate-50 border border-slate-200 rounded">
                <Lock size={12} /> Counselors Only
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Active Programs</h4>
              <span className="text-[10px] font-bold text-indigo-600">3 Total</span>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { title: 'Peer Relations Growth Plan', student: 'John Doe', progress: 80, date: 'Oct 24' },
                { title: 'Academic Focus Strategy', student: 'Jane Smith', progress: 45, date: 'Oct 25' },
                { title: 'Emotional Regulation Series', student: 'Alex Johnson', progress: 20, date: 'Oct 26' },
              ].map((prog, i) => (
                <div key={i} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    <UserCheck size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="font-bold text-slate-800">{prog.title}</h5>
                        <p className="text-xs text-slate-500 mt-1">Student: {prog.student} • Started {prog.date}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs font-bold text-indigo-600">{prog.progress}% Completed</span>
                        {isCounselor && (
                          <button className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1">
                            <MessageSquare size={10} /> Add Note
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all duration-1000" 
                        style={{ width: `${prog.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl">
            <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4">
              <Clock className="text-indigo-400" size={18} />
              <h4 className="font-bold">Session Queue</h4>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <p className="text-[10px] font-bold text-indigo-400 uppercase">Today, 2:00 PM</p>
                <p className="text-sm font-semibold mt-1">Review: John Doe</p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                <p className="text-[10px] font-bold text-indigo-400 uppercase">Tomorrow, 9:30 AM</p>
                <p className="text-sm font-semibold mt-1">Parent Conf: Alex J.</p>
              </div>
            </div>
            <button className="w-full mt-6 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
              Full Calendar
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="text-red-500" size={18} />
              <h4 className="font-bold text-slate-800 text-sm">Action Required</h4>
            </div>
            <div className="space-y-3">
              <p className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-indigo-200 pl-3">
                "Waitlisted intervention for Grade 9 behavioral shift identified in Sep."
              </p>
              <button className="text-[10px] font-bold text-indigo-600 hover:underline">Review Details →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interventions;
