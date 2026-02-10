
import React, { useState } from 'react';
import { MOCK_STUDENTS, MOCK_INCIDENTS } from '../constants';
import { Search, Filter, Plus, Mail, Phone, MapPin, BrainCircuit, Users } from 'lucide-react';
import { getBehavioralInsight } from '../services/geminiService';

const Students: React.FC = () => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const selectedStudent = MOCK_STUDENTS.find(s => s.id === selectedStudentId);

  const handleAnalyze = async (studentId: string) => {
    setIsAnalyzing(true);
    const history = MOCK_INCIDENTS.filter(inc => inc.student_id === studentId);
    const result = await getBehavioralInsight(history);
    setAiAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Student List */}
      <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl flex flex-col h-[calc(100vh-10rem)] shadow-sm">
        <div className="p-4 border-b border-slate-200 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-800">Students</h3>
            <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by name or LRN..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {MOCK_STUDENTS.map(student => (
            <button
              key={student.id}
              onClick={() => {
                setSelectedStudentId(student.id);
                setAiAnalysis(null);
              }}
              className={`w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left ${
                selectedStudentId === student.id ? 'bg-indigo-50/50 border-l-4 border-indigo-600' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                {student.first_name[0]}{student.last_name[0]}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold text-slate-900">{student.first_name} {student.last_name}</p>
                <p className="text-xs text-slate-500 truncate">LRN: {student.lrn}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">{student.grade_level}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Profile Detail */}
      <div className="lg:col-span-2 space-y-6">
        {selectedStudent ? (
          <>
            <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
                    {selectedStudent.first_name[0]}{selectedStudent.last_name[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedStudent.first_name} {selectedStudent.last_name}</h2>
                    <p className="text-slate-500 font-medium">Class {selectedStudent.grade_level} - Section {selectedStudent.section}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {selectedStudent.address}</span>
                      <span className="flex items-center gap-1"><Phone size={14} /> {selectedStudent.contact_number}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">Edit Profile</button>
                  <button 
                    onClick={() => handleAnalyze(selectedStudent.id)}
                    disabled={isAnalyzing}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 flex items-center gap-2 disabled:opacity-50"
                  >
                    <BrainCircuit size={16} />
                    {isAnalyzing ? 'Analyzing...' : 'AI Insights'}
                  </button>
                </div>
              </div>

              {aiAnalysis && (
                <div className="mb-8 p-6 bg-indigo-50 border border-indigo-100 rounded-xl animate-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <BrainCircuit className="text-indigo-600" size={20} />
                    <h4 className="text-indigo-900 font-bold">AI Behavioral Analysis</h4>
                    <span className={`ml-auto px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      aiAnalysis.riskLevel === 'Low' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      Risk Level: {aiAnalysis.riskLevel}
                    </span>
                  </div>
                  <p className="text-sm text-indigo-800 leading-relaxed mb-4">{aiAnalysis.analysis}</p>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Suggested Interventions</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {aiAnalysis.suggestedInterventions.map((item: string, i: number) => (
                        <li key={i} className="text-sm text-indigo-700 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">LRN Number</p>
                  <p className="text-sm font-semibold text-slate-800">{selectedStudent.lrn}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">Birth Date</p>
                  <p className="text-sm font-semibold text-slate-800">{new Date(selectedStudent.date_of_birth).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">Gender</p>
                  <p className="text-sm font-semibold text-slate-800">{selectedStudent.gender}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200">
                <h4 className="font-bold text-slate-800">Incident History</h4>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_INCIDENTS.filter(i => i.student_id === selectedStudent.id).map(inc => (
                    <tr key={inc.id}>
                      <td className="px-6 py-4 text-sm font-medium text-slate-700">Academic Dishonesty</td>
                      <td className="px-6 py-4 text-sm text-slate-500">{new Date(inc.date_reported).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                          {inc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {MOCK_INCIDENTS.filter(i => i.student_id === selectedStudent.id).length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-sm text-slate-400 italic">No incidents recorded for this student.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="h-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
            {/* Fix: Added missing Users icon import from lucide-react */}
            <Users size={48} className="mb-4 opacity-20" />
            <p>Select a student to view their detailed behavioral profile</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
