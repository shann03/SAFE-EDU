
import React from 'react';
import { ShieldAlert, CheckCircle2, Clock, BrainCircuit } from 'lucide-react';

const Interventions: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Interventions & Counseling</h2>
        <p className="text-slate-500">Coordinate and track behavioral intervention plans and counselor notes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">AI-Guided Strategy Generator</h4>
                <p className="text-sm text-slate-500">Leverage behavioral data to create custom intervention roadmaps.</p>
              </div>
            </div>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors">
              Launch Assistant
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50">
              <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Active Programs</h4>
            </div>
            <div className="divide-y divide-slate-100">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <Clock size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-slate-800">Positive Reinforcement Plan</h5>
                      <span className="text-xs font-semibold text-indigo-600">80% Progress</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">Student: Alex Johnson • Assigned by: Mark Counselor</p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div className="bg-indigo-500 h-full w-[80%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-xl">
            <h4 className="font-bold mb-4">Upcoming Sessions</h4>
            <div className="space-y-4">
              <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                <p className="text-xs font-bold text-white/60">TODAY, 2:00 PM</p>
                <p className="text-sm font-semibold mt-1">Behavior Review: Jane Smith</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg border border-white/10">
                <p className="text-xs font-bold text-white/60">TOMORROW, 9:30 AM</p>
                <p className="text-sm font-semibold mt-1">Parent Conference: John Doe</p>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-white text-slate-900 rounded-lg text-sm font-bold hover:bg-slate-100 transition-colors">
              View Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interventions;
