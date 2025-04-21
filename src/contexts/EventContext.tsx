import React, { createContext, useContext, useState } from 'react';
import { Event } from '../types';

// Mock events data
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Annual Tech Symposium',
    description: 'A gathering of industry experts discussing the latest technological trends and innovations.',
    date: new Date('2025-05-15T10:00:00'),
    location: 'Main Auditorium',
    pointsAwarded: 50,
    capacity: 200,
    registeredStudents: ['1', '4', '7'],
    attendees: ['1', '4'],
    createdBy: '3',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    title: 'Career Development Workshop',
    description: 'Learn essential skills for job hunting, resume building, and interview techniques.',
    date: new Date('2025-06-10T14:00:00'),
    location: 'Room 101',
    pointsAwarded: 30,
    capacity: 50,
    registeredStudents: ['1', '5', '9'],
    attendees: ['1', '5'],
    createdBy: '3',
    imageUrl: 'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    title: 'Alumni Networking Event',
    description: 'Connect with successful alumni and build your professional network.',
    date: new Date('2025-07-22T18:00:00'),
    location: 'University Club',
    pointsAwarded: 40,
    capacity: 100,
    registeredStudents: ['1', '2', '6'],
    attendees: ['1', '2'],
    createdBy: '3',
    imageUrl: 'https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

interface EventContextType {
  events: Event[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  registerForEvent: (eventId: string, studentId: string) => boolean;
  markAttendance: (eventId: string, studentId: string) => boolean;
  getUpcomingEvents: () => Event[];
  getPastEvents: () => Event[];
  getEventById: (id: string) => Event | undefined;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);

  const addEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: `${events.length + 1}`,
      registeredStudents: [],
      attendees: []
    };
    setEvents([...events, newEvent]);
  };

  const registerForEvent = (eventId: string, studentId: string): boolean => {
    const eventIndex = events.findIndex(event => event.id === eventId);
    if (eventIndex === -1) return false;
    
    const event = events[eventIndex];
    
    // Check if the event capacity has been reached
    if (event.registeredStudents.length >= event.capacity) return false;
    
    // Check if the student is already registered
    if (event.registeredStudents.includes(studentId)) return false;
    
    const updatedEvent = {
      ...event,
      registeredStudents: [...event.registeredStudents, studentId]
    };
    
    const updatedEvents = [...events];
    updatedEvents[eventIndex] = updatedEvent;
    
    setEvents(updatedEvents);
    return true;
  };

  const markAttendance = (eventId: string, studentId: string): boolean => {
    const eventIndex = events.findIndex(event => event.id === eventId);
    if (eventIndex === -1) return false;
    
    const event = events[eventIndex];
    
    // Check if the student is registered
    if (!event.registeredStudents.includes(studentId)) return false;
    
    // Check if the student has already been marked as attended
    if (event.attendees.includes(studentId)) return false;
    
    const updatedEvent = {
      ...event,
      attendees: [...event.attendees, studentId]
    };
    
    const updatedEvents = [...events];
    updatedEvents[eventIndex] = updatedEvent;
    
    setEvents(updatedEvents);
    return true;
  };

  const getUpcomingEvents = (): Event[] => {
    const now = new Date();
    return events.filter(event => new Date(event.date) > now);
  };

  const getPastEvents = (): Event[] => {
    const now = new Date();
    return events.filter(event => new Date(event.date) <= now);
  };

  const getEventById = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
  };

  return (
    <EventContext.Provider value={{
      events,
      addEvent,
      registerForEvent,
      markAttendance,
      getUpcomingEvents,
      getPastEvents,
      getEventById
    }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};