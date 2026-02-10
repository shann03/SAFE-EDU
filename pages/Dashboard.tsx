
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { AlertCircle, UserCheck, TrendingUp, ShieldCheck } from 'lucide-react';
import { MOCK_INCIDENTS, MOCK_STUDENTS } from '../constants';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Active Incidents', value: '12', icon: <AlertCircle className="text-amber-500" />, trend: '+2 this week' },
    { label: 'Students Tracked', value: '1,240', icon: <UserCheck className="text-indigo-500" />, trend: 'Stable' },
    { label: 'Resolved Cases', value: '84%', icon: <TrendingUp className="text-emerald-500" />, trend: '+5% month/month' },
    { label: 'Interventions', value: '45', icon: <ShieldCheck className="text-blue-500" />, trend: '8 active now' },
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
    { name: 'Damage', value: 150 },
    { name: 'Verbal', value: 200 },
  ];

  const COLORS = ['#6366f1', '#f59e0b', '#ef4444', '#10b981'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
        <p className="text-slate-500">Real-time monitoring of student behavior and administrative actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
              <p className="text-xs text-slate-400 mt-2">{stat.trend}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-bold text-slate-800 mb-6">Incident Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="incidents" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-bold text-slate-800 mb-6">Incidents by Type</h4>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2 pr-8">
              {typeData.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-xs font-medium text-slate-600">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h4 className="text-lg font-bold text-slate-800">Recent Incidents</h4>
          <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View All</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Incident Type</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_INCIDENTS.map((inc) => {
              const student = MOCK_STUDENTS.find(s => s.id === inc.student_id);
              return (
                <tr key={inc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                        {student?.first_name[0]}{student?.last_name[0]}
                      </div>
                      <span className="text-sm font-medium text-slate-900">{student?.first_name} {student?.last_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">Bullying</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{new Date(inc.date_reported).toLocaleDateString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      inc.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {inc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-semibold text-slate-400 hover:text-indigo-600">View Detail</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
