import React from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';
import { Event } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

interface EventCardProps {
  event: Event;
  isRegistered?: boolean;
  isAttended?: boolean;
  isPast?: boolean;
  onRegister?: (eventId: string) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  event,
  isRegistered = false,
  isAttended = false,
  isPast = false,
  onRegister
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Calculate if the event has available spots
  const registeredCount = event.registeredStudents.length;
  const availableSpots = event.capacity - registeredCount;
  const isFull = availableSpots <= 0;

  return (
    <Card className="h-full flex flex-col transition-transform duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="h-48 overflow-hidden relative">
        <img
          src={event.imageUrl || 'https://images.pexels.com/photos/1181360/pexels-photo-1181360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {isPast && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 flex items-center justify-center">
            <Badge variant="outline" size="lg" className="border-white text-white">
              Past Event
            </Badge>
          </div>
        )}
        {isAttended && !isPast && (
          <div className="absolute top-2 right-2">
            <Badge variant="success">Attended</Badge>
          </div>
        )}
        {isRegistered && !isAttended && !isPast && (
          <div className="absolute top-2 right-2">
            <Badge variant="primary">Registered</Badge>
          </div>
        )}
      </div>
      
      <Card.Content className="flex-grow">
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(event.date)} at {formatTime(event.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Award size={16} className="mr-2" />
            <span>{event.pointsAwarded} points</span>
          </div>
        </div>
      </Card.Content>
      
      <Card.Footer className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {isFull ? (
            <span className="text-red-600 font-medium">No spots available</span>
          ) : (
            <span>{availableSpots} spots available</span>
          )}
        </div>
        
        {!isPast && !isRegistered && !isAttended && onRegister && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onRegister(event.id)}
            disabled={isFull}
          >
            Register
          </Button>
        )}
        
        {isRegistered && !isPast && !isAttended && (
          <Badge variant="primary">Registered</Badge>
        )}
        
        {isAttended && (
          <Badge variant="success">Attended</Badge>
        )}
        
        {isPast && !isAttended && (
          <Badge variant="warning">Missed</Badge>
        )}
      </Card.Footer>
    </Card>
  );
};

export default EventCard;