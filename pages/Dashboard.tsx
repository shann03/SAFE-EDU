
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { AlertTriangle, UserCheck, TrendingUp, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { MOCK_INCIDENTS, MOCK_STUDENTS } from '../constants';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Incidents', value: '12', icon: <AlertTriangle className="text-amber-600" />, trend: 'Pending Review', color: 'bg-amber-50 border-amber-200' },
    { label: 'Enrollment Coverage', value: '1,240', icon: <UserCheck className="text-slate-600" />, trend: 'Validated Records', color: 'bg-slate-50 border-slate-200' },
    { label: 'Resolution Rate', value: '84%', icon: <CheckCircle2 className="text-teal-600" />, trend: 'Academic Q2 Target', color: 'bg-teal-50 border-teal-200' },
    { label: 'Ongoing Interventions', value: '08', icon: <ShieldAlert className="text-blue-600" />, trend: 'Guidance Dept.', color: 'bg-blue-50 border-blue-200' },
  ];

  const chartData = [
    { name: 'Aug', incidents: 4 },
    { name: 'Sep', incidents: 15 },
    { name: 'Oct', incidents: 22 },
    { name: 'Nov', incidents: 12 },
    { name: 'Dec', incidents: 8 },
  ];

  const typeData = [
    { name: 'Bullying', value: 400 },
    { name: 'Dishonesty', value: 300 },
    { name: 'Property', value: 150 },
    { name: 'Verbal', value: 200 },
  ];

  const COLORS = ['#0f172a', '#0d9488', '#d97706', '#475569'];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Assistance Dashboard</h2>
        <p className="text-slate-500 font-medium">Official status overview for Student Assistance and Digital Safety enforcement.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`p-6 rounded-xl border ${stat.color} shadow-sm flex items-start justify-between bg-white`}>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              <p className="text-[10px] font-bold text-slate-500 mt-2 uppercase">{stat.trend}</p>
            </div>
            <div className="p-3 bg-white rounded-lg border border-inherit shadow-inner">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Monthly Incident Volume</h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-900"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reported Case</span>
              </div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="incidents" stroke="#0f172a" strokeWidth={3} fillOpacity={1} fill="url(#colorInc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-10">Case Categorization</h4>
          <div className="h-64 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-900">1,250</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Events</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-10">
            {typeData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">Verified Case Stream</h4>
          <button className="text-[10px] font-black text-teal-700 hover:text-teal-800 uppercase tracking-widest">Access Audit History →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Subject</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Violation Tag</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Official Date</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Legal Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_INCIDENTS.map((inc) => {
                const student = MOCK_STUDENTS.find(s => s.id === inc.student_id);
                return (
                  <tr key={inc.id} className="hover:bg-slate-50 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                          {student?.first_name[0]}{student?.last_name[0]}
                        </div>
                        <span className="text-sm font-bold text-slate-900 tracking-tight">{student?.first_name} {student?.last_name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-semibold text-slate-600">Bullying/Cyber</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-bold text-slate-400">{new Date(inc.date_reported).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1.5 rounded text-[10px] font-black uppercase tracking-widest ${
                        inc.status === 'Resolved' ? 'bg-teal-50 text-teal-700 border border-teal-100' : 'bg-amber-50 text-amber-700 border border-amber-100'
                      }`}>
                        {inc.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-[10px] font-black text-slate-300 group-hover:text-slate-900 transition-colors uppercase tracking-widest">Records</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
