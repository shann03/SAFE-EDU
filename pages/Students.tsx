
import React, { useState } from 'react';
import { MOCK_STUDENTS, MOCK_INCIDENTS } from '../constants';
import { Search, Plus, MapPin, Phone, BrainCircuit, Users, ShieldAlert, Lock } from 'lucide-react';
import { getBehavioralInsight } from '../services/geminiService';
import { User } from '../types';

interface StudentsProps {
  currentUser: User;
}

const Students: React.FC<StudentsProps> = ({ currentUser }) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const selectedStudent = MOCK_STUDENTS.find(s => s.id === selectedStudentId);
  const isTeacher = currentUser.role === 'Teacher';
  const canAccessSensitiveData = currentUser.role !== 'Teacher';

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
            <h3 className="font-bold text-slate-800">Student Directory</h3>
            {!isTeacher && (
              <button className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus size={16} />
              </button>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by name or LRN..."
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
                <p className="text-xs text-slate-500">Grade {student.grade_level}</p>
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
                    <p className="text-slate-500 font-medium">LRN: {selectedStudent.lrn} • {selectedStudent.grade_level} - {selectedStudent.section}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {selectedStudent.address}</span>
                    </div>
                  </div>
                </div>
                {!isTeacher && (
                  <button 
                    onClick={() => handleAnalyze(selectedStudent.id)}
                    disabled={isAnalyzing}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 flex items-center gap-2 disabled:opacity-50"
                  >
                    <BrainCircuit size={16} />
                    {isAnalyzing ? 'Analyzing...' : 'AI Welfare Check'}
                  </button>
                )}
              </div>

              {aiAnalysis && (
                <div className="mb-8 p-6 bg-indigo-50 border border-indigo-100 rounded-xl animate-in slide-in-from-top-4 duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <BrainCircuit className="text-indigo-600" size={20} />
                    <h4 className="text-indigo-900 font-bold">Confidential Welfare Insight</h4>
                  </div>
                  <p className="text-sm text-indigo-800 leading-relaxed mb-4">{aiAnalysis.analysis}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">Status</p>
                  <p className="text-sm font-semibold text-emerald-600">Active Student</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">Contact</p>
                  <p className="text-sm font-semibold text-slate-800">{selectedStudent.contact_number}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase">Gender</p>
                  <p className="text-sm font-semibold text-slate-800">{selectedStudent.gender}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-2 text-slate-800">
                  <ShieldAlert size={18} className="text-indigo-600" />
                  <h4 className="font-bold">Welfare & Disciplinary History</h4>
                </div>
                {isTeacher && (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-700 rounded text-[10px] font-bold border border-amber-100 uppercase">
                    <Lock size={12} /> Access Restricted
                  </div>
                )}
              </div>
              
              {canAccessSensitiveData ? (
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Event Type</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_INCIDENTS.filter(i => i.student_id === selectedStudent.id).map(inc => (
                      <tr key={inc.id}>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-700">Disciplinary Report</p>
                          <p className="text-xs text-slate-400">Reported by {inc.reported_by_user_id === currentUser.id ? 'You' : 'Staff'}</p>
                        </td>
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
                        <td colSpan={3} className="px-6 py-8 text-center text-sm text-slate-400 italic">No behavioral history records.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center flex flex-col items-center gap-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                    <Lock size={32} />
                  </div>
                  <div className="max-w-sm">
                    <p className="text-sm font-semibold text-slate-800 mb-1">Confidential Information</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Detailed intervention and disciplinary histories are restricted to Guidance Counselors and Administrators to maintain student privacy.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="h-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400">
            <Users size={48} className="mb-4 opacity-10" />
            <p className="text-sm">Select a student from the directory to view profile</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
