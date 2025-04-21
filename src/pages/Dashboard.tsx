import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import Navbar from '../components/layout/Navbar';
import StudentDashboard from './StudentDashboard';
import AlumniDashboard from './AlumniDashboard';
import AdminDashboard from './AdminDashboard';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { authState } = useAuth();
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Loading state
  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  const renderDashboard = () => {
    switch (authState.user?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'alumni':
        return <AlumniDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Unknown user role</div>;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>{renderDashboard()}</main>
    </div>
  );
};

export default Dashboard;