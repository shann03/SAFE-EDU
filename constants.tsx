
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  AlertTriangle, 
  ShieldAlert, 
  ClipboardList, 
  Monitor, 
  Settings,
} from 'lucide-react';
import { Student, Incident, IncidentType, User, UserRole } from './types';

export interface NavItem {
  name: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: ['Teacher', 'Counselor', 'Administrator'] },
  { name: 'Incidents', icon: <AlertTriangle size={20} />, roles: ['Teacher', 'Administrator'] },
  { name: 'Students', icon: <Users size={20} />, roles: ['Teacher', 'Counselor', 'Administrator'] },
  { name: 'Interventions', icon: <ShieldAlert size={20} />, roles: ['Counselor', 'Administrator'] },
  { name: 'Device Logs', icon: <Monitor size={20} />, roles: ['Administrator'] },
  { name: 'Reports', icon: <ClipboardList size={20} />, roles: ['Counselor', 'Administrator'] },
  { name: 'Admin', icon: <Settings size={20} />, roles: ['Administrator'] },
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 's1',
    lrn: '123456789012',
    first_name: 'John',
    last_name: 'Doe',
    date_of_birth: '2008-05-15',
    gender: 'Male',
    grade_level: 'Grade 10',
    section: 'A',
    address: '123 School St, City',
    contact_number: '555-0101'
  },
  {
    id: 's2',
    lrn: '987654321098',
    first_name: 'Jane',
    last_name: 'Smith',
    date_of_birth: '2009-11-20',
    gender: 'Female',
    grade_level: 'Grade 9',
    section: 'B',
    address: '456 Education Rd, Town',
    contact_number: '555-0202'
  },
  {
    id: 's3',
    lrn: '555444333222',
    first_name: 'Alex',
    last_name: 'Johnson',
    date_of_birth: '2007-02-10',
    gender: 'Other',
    grade_level: 'Grade 11',
    section: 'C',
    address: '789 Academy Ave, Village',
    contact_number: '555-0303'
  }
];

export const MOCK_INCIDENT_TYPES: IncidentType[] = [
  { id: 'it1', name: 'Bullying', description: 'Repeated harmful behavior towards a peer.' },
  { id: 'it2', name: 'Academic Dishonesty', description: 'Cheating, plagiarism, or unauthorized collaboration.' },
  { id: 'it3', name: 'Property Damage', description: 'Vandalism or accidental damage to school property.' },
  { id: 'it4', name: 'Verbal Altercation', description: 'Heated argument involving inappropriate language.' }
];

export const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'i1',
    student_id: 's1',
    reported_by_user_id: 'u_teacher',
    incident_type_id: 'it1',
    date_reported: '2023-10-24T10:00:00Z',
    date_occurred: '2023-10-24T09:15:00Z',
    location: 'Cafeteria',
    description: 'Student was observed teasing a peer during lunch.',
    immediate_action: 'Verbal warning given.',
    status: 'Investigating'
  },
  {
    id: 'i2',
    student_id: 's2',
    reported_by_user_id: 'u_teacher',
    incident_type_id: 'it2',
    date_reported: '2023-10-25T14:30:00Z',
    date_occurred: '2023-10-25T13:45:00Z',
    location: 'Classroom 302',
    description: 'Found with unauthorized materials during history quiz.',
    immediate_action: 'Paper confiscated, teacher notified.',
    status: 'Pending'
  }
];

export const PREDEFINED_ACCOUNTS = [
  {
    email: 'teacher@gmail.com',
    password: '12345678',
    user: {
      id: 'u_teacher',
      username: 'teacher_jane',
      email: 'teacher@gmail.com',
      full_name: 'Jane Teacher',
      is_active: true,
      role: 'Teacher' as const
    }
  },
  {
    email: 'counselor@gmail.com',
    password: '12345678',
    user: {
      id: 'u_counselor',
      username: 'counselor_mark',
      email: 'counselor@gmail.com',
      full_name: 'Mark Counselor',
      is_active: true,
      role: 'Counselor' as const
    }
  },
  {
    email: 'admin@gmail.com',
    password: '12345678',
    user: {
      id: 'u_admin',
      username: 'admin_sarah',
      email: 'admin@gmail.com',
      full_name: 'Sarah Admin',
      is_active: true,
      role: 'Administrator' as const
    }
  }
];
