import React, { useState } from 'react';
import { Users, Calendar, Award, PieChart, Plus } from 'lucide-react';
import { useEvents } from '../contexts/EventContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import StudentLeaderboard from '../components/dashboard/StudentLeaderboard';

// Sample data for active students
const ACTIVE_STUDENTS = [
  {
    id: '1',
    name: 'John Student',
    department: 'Computer Science',
    year: 3,
    eventsAttended: 8,
    points: 450,
    lastActive: '2 hours ago',
    profilePicture: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '5',
    name: 'Emily Johnson',
    department: 'Electrical Engineering',
    year: 2,
    eventsAttended: 6,
    points: 380,
    lastActive: '1 day ago',
    profilePicture: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '9',
    name: 'Michael Chen',
    department: 'Mechanical Engineering',
    year: 4,
    eventsAttended: 5,
    points: 350,
    lastActive: '3 days ago',
    profilePicture: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    department: 'Computer Science',
    year: 2,
    eventsAttended: 7,
    points: 320,
    lastActive: '5 hours ago',
    profilePicture: 'https://i.pravatar.cc/150?img=4',
  },
];

const AdminDashboard: React.FC = () => {
  const { events, addEvent, getUpcomingEvents } = useEvents();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'events' | 'reports'>('overview');
  
  const upcomingEvents = getUpcomingEvents();
  const totalRegistrations = events.reduce((sum, event) => sum + event.registeredStudents.length, 0);
  const totalAttendance = events.reduce((sum, event) => sum + event.attendees.length, 0);
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-blue-50">
                <Card.Content className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">Active Students</p>
                    <p className="text-2xl font-bold text-blue-800">{ACTIVE_STUDENTS.length}</p>
                  </div>
                </Card.Content>
              </Card>
              
              <Card className="bg-green-50">
                <Card.Content className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600">Total Events</p>
                    <p className="text-2xl font-bold text-green-800">{events.length}</p>
                  </div>
                </Card.Content>
              </Card>
              
              <Card className="bg-purple-50">
                <Card.Content className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-purple-600">Registrations</p>
                    <p className="text-2xl font-bold text-purple-800">{totalRegistrations}</p>
                  </div>
                </Card.Content>
              </Card>
              
              <Card className="bg-amber-50">
                <Card.Content className="flex items-center space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Award className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-600">Attendance</p>
                    <p className="text-2xl font-bold text-amber-800">{totalAttendance}</p>
                    <p className="text-xs text-amber-600">
                      {totalRegistrations > 0
                        ? `${Math.round((totalAttendance / totalRegistrations) * 100)}% of registrations`
                        : '0% of registrations'}
                    </p>
                  </div>
                </Card.Content>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <Card.Header className="flex justify-between items-center">
                    <div>
                      <Card.Title>Most Active Students</Card.Title>
                      <Card.Description>Students with the highest engagement</Card.Description>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Card.Header>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Student
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Events
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Points
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Last Active
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {ACTIVE_STUDENTS.map((student) => (
                          <tr key={student.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <Avatar
                                    src={student.profilePicture}
                                    alt={student.name}
                                    size="md"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                                  <div className="text-sm text-gray-500">Year {student.year}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{student.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{student.eventsAttended}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="primary">{student.points} pts</Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {student.lastActive}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
              
              <div>
                <StudentLeaderboard title="Top Students" />
              </div>
            </div>
            
            <Card>
              <Card.Header className="flex justify-between items-center">
                <div>
                  <Card.Title>Upcoming Events</Card.Title>
                  <Card.Description>Events scheduled in the near future</Card.Description>
                </div>
                <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
                  Add Event
                </Button>
              </Card.Header>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Registrations
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {upcomingEvents.slice(0, 5).map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{event.title}</div>
                          <div className="text-xs text-gray-500 line-clamp-1">{event.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {event.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.registeredStudents.length} / {event.capacity}
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(event.registeredStudents.length / event.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge
                            variant={
                              new Date(event.date) > new Date()
                                ? event.registeredStudents.length >= event.capacity
                                  ? 'warning'
                                  : 'success'
                                : 'danger'
                            }
                          >
                            {new Date(event.date) > new Date()
                              ? event.registeredStudents.length >= event.capacity
                                ? 'Full'
                                : 'Open'
                              : 'Closed'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Card.Footer className="text-center">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  View All Events
                </a>
              </Card.Footer>
            </Card>
          </div>
        );
        
      case 'students':
        return <div>Students tab content</div>;
        
      case 'events':
        return <div>Events tab content</div>;
        
      case 'reports':
        return <div>Reports tab content</div>;
        
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`px-4 py-4 text-sm font-medium text-center ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex-1`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-4 text-sm font-medium text-center ${
                activeTab === 'students'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex-1`}
              onClick={() => setActiveTab('students')}
            >
              Students
            </button>
            <button
              className={`px-4 py-4 text-sm font-medium text-center ${
                activeTab === 'events'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex-1`}
              onClick={() => setActiveTab('events')}
            >
              Events
            </button>
            <button
              className={`px-4 py-4 text-sm font-medium text-center ${
                activeTab === 'reports'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } flex-1`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;