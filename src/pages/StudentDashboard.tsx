import React, { useState } from 'react';
import { Calendar, Trophy, ClipboardCheck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useEvents } from '../contexts/EventContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import EventCard from '../components/dashboard/EventCard';
import StudentLeaderboard from '../components/dashboard/StudentLeaderboard';
import { Student } from '../types';

const StudentDashboard: React.FC = () => {
  const { authState } = useAuth();
  const { events, registerForEvent, getUpcomingEvents, getPastEvents } = useEvents();
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);
  
  const student = authState.user as Student;
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();
  
  const handleRegister = (eventId: string) => {
    const success = registerForEvent(eventId, student.id);
    if (success) {
      setRegistrationSuccess(`Successfully registered for event!`);
      setTimeout(() => setRegistrationSuccess(null), 3000);
    }
  };
  
  const isRegistered = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    return event?.registeredStudents.includes(student.id) || false;
  };
  
  const isAttended = (eventId: string) => {
    const event = events.find(e => e.id === eventId);
    return event?.attendees.includes(student.id) || false;
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {registrationSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{registrationSuccess}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Welcome, {student.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-blue-50">
              <Card.Content className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Points</p>
                  <p className="text-2xl font-bold text-blue-800">{student.points}</p>
                </div>
              </Card.Content>
            </Card>
            
            <Card className="bg-green-50">
              <Card.Content className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">Events Attended</p>
                  <p className="text-2xl font-bold text-green-800">{student.eventsAttended.length}</p>
                </div>
              </Card.Content>
            </Card>
            
            <Card className="bg-purple-50">
              <Card.Content className="flex items-center space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <ClipboardCheck className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Current Rank</p>
                  <p className="text-2xl font-bold text-purple-800">#12</p>
                </div>
              </Card.Content>
            </Card>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Events</h2>
              <Button variant="outline" size="sm" leftIcon={<Calendar size={16} />}>
                View All Events
              </Button>
            </div>
            
            {upcomingEvents.length === 0 ? (
              <Card>
                <Card.Content className="text-center py-8">
                  <p className="text-gray-500">No upcoming events at the moment. Check back later!</p>
                </Card.Content>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingEvents.slice(0, 3).map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isRegistered={isRegistered(event.id)}
                    isAttended={isAttended(event.id)}
                    onRegister={handleRegister}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Past Events</h2>
            </div>
            
            {pastEvents.length === 0 ? (
              <Card>
                <Card.Content className="text-center py-8">
                  <p className="text-gray-500">No past events to show.</p>
                </Card.Content>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastEvents.slice(0, 3).map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    isPast={true}
                    isRegistered={isRegistered(event.id)}
                    isAttended={isAttended(event.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div>
          <StudentLeaderboard />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;