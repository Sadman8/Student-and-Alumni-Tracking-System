import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import Card from '../ui/Card';
import Avatar from '../ui/Avatar';

// Sample data for the leaderboard
const LEADERBOARD_DATA = [
  {
    id: '1',
    name: 'John Student',
    points: 450,
    department: 'Computer Science',
    rank: 1,
    profilePicture: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '5',
    name: 'Emily Johnson',
    points: 380,
    department: 'Electrical Engineering',
    rank: 2,
    profilePicture: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '9',
    name: 'Michael Chen',
    points: 350,
    department: 'Mechanical Engineering',
    rank: 3,
    profilePicture: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    points: 320,
    department: 'Computer Science',
    rank: 4,
    profilePicture: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '7',
    name: 'David Brown',
    points: 290,
    department: 'Civil Engineering',
    rank: 5,
    profilePicture: 'https://i.pravatar.cc/150?img=7',
  },
];

interface StudentLeaderboardProps {
  title?: string;
  limit?: number;
}

const StudentLeaderboard: React.FC<StudentLeaderboardProps> = ({
  title = "Student Leaderboard",
  limit = 5
}) => {
  const leaderboardData = LEADERBOARD_DATA.slice(0, limit);
  
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="text-yellow-500" />;
      case 2:
        return <Medal className="text-gray-400" />;
      case 3:
        return <Medal className="text-amber-600" />;
      default:
        return <Award className="text-blue-500" />;
    }
  };
  
  const getBackgroundClass = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-50';
      case 2:
        return 'bg-gray-50';
      case 3:
        return 'bg-amber-50';
      default:
        return '';
    }
  };
  
  return (
    <Card>
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <Card.Description>Top performing students based on event attendance and participation</Card.Description>
      </Card.Header>
      
      <div className="overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {leaderboardData.map((student) => (
            <li 
              key={student.id} 
              className={`px-6 py-4 flex items-center justify-between ${getBackgroundClass(student.rank)}`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8">
                  {getRankIcon(student.rank)}
                </div>
                
                <Avatar
                  src={student.profilePicture}
                  alt={student.name}
                  size="md"
                />
                
                <div>
                  <p className="text-sm font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.department}</p>
                </div>
              </div>
              
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {student.points} points
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <Card.Footer className="text-center">
        <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
          View Full Leaderboard
        </a>
      </Card.Footer>
    </Card>
  );
};

export default StudentLeaderboard;