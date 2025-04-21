// Type definitions for the Student Alumni Tracking System

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'alumni' | 'admin';
  profilePicture?: string;
  createdAt: Date;
}

export interface Student extends User {
  role: 'student';
  registrationId: string;
  department: string;
  year: number;
  points: number;
  eventsAttended: string[]; // Array of event IDs
}

export interface Alumni extends User {
  role: 'alumni';
  graduationYear: number;
  currentPosition?: string;
  company?: string;
  industry?: string;
  education?: {
    degree: string;
    institution: string;
    year: number;
  }[];
  achievements?: string[];
}

export interface Admin extends User {
  role: 'admin';
  department: string;
  position: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  pointsAwarded: number;
  capacity: number;
  registeredStudents: string[]; // Array of student IDs
  attendees: string[]; // Array of student IDs who actually attended
  createdBy: string; // Admin ID
  imageUrl?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  type: 'event' | 'achievement' | 'system';
  linkTo?: string;
}