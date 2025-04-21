import React from 'react';
import { User, Mail, Phone, Building, GraduationCap, Briefcase, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import AlumniStats from '../components/dashboard/AlumniStats';
import { Alumni } from '../types';

const AlumniDashboard: React.FC = () => {
  const { authState } = useAuth();
  const alumni = authState.user as Alumni;
  
  // Sample data for the alumni
  const alumniData = {
    ...alumni,
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/janealumni',
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of Technology',
        year: 2020
      },
      {
        degree: 'Master of Business Administration',
        institution: 'Business School',
        year: 2022
      }
    ],
    achievements: [
      'Google Certification in Machine Learning',
      'Published research paper in AI Conference 2021',
      'Startup Weekend Winner 2020'
    ],
    experience: [
      {
        position: 'Software Engineer',
        company: 'Google',
        duration: 'Jan 2022 - Present',
        description: 'Working on search algorithms and AI applications.'
      },
      {
        position: 'Junior Developer',
        company: 'Tech Startup',
        duration: 'Jun 2020 - Dec 2021',
        description: 'Developed web applications and mobile interfaces.'
      }
    ],
    mentorship: {
      status: 'Available',
      areas: ['Career Guidance', 'Technical Mentorship', 'Interview Preparation']
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <Card className="sticky top-6">
            <div className="p-6 text-center">
              <Avatar
                src={alumniData.profilePicture}
                alt={alumniData.name}
                size="xl"
                className="mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-gray-900">{alumniData.name}</h2>
              <p className="text-sm text-gray-600 mb-4">{alumniData.currentPosition} at {alumniData.company}</p>
              
              <div className="py-4 border-t border-b border-gray-200 my-4">
                <div className="flex items-center justify-center">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Class of {alumniData.graduationYear}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <Mail size={16} className="mr-2" />
                  <span>{alumniData.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone size={16} className="mr-2" />
                  <span>{alumniData.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Building size={16} className="mr-2" />
                  <span>{alumniData.address}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="primary" fullWidth>
                  Update Profile
                </Button>
              </div>
            </div>
            
            <Card.Footer className="bg-blue-50">
              <div className="text-center">
                <h3 className="text-sm font-medium text-blue-800 mb-2">Mentorship Status</h3>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {alumniData.mentorship.status}
                </span>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  {alumniData.mentorship.areas.map((area, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
        
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <Card.Header>
              <Card.Title>Experience</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-6">
                {alumniData.experience.map((exp, index) => (
                  <div key={index} className="relative pl-8 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-px before:bg-gray-200">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <Briefcase size={14} className="text-blue-600" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900">{exp.position}</h3>
                    <div className="text-sm text-gray-600">{exp.company} • {exp.duration}</div>
                    <p className="mt-1 text-sm text-gray-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
          
          <Card>
            <Card.Header>
              <Card.Title>Education</Card.Title>
            </Card.Header>
            <Card.Content>
              <div className="space-y-6">
                {alumniData.education.map((edu, index) => (
                  <div key={index} className="relative pl-8 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-px before:bg-gray-200">
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <GraduationCap size={14} className="text-purple-600" />
                    </div>
                    <h3 className="text-base font-medium text-gray-900">{edu.degree}</h3>
                    <div className="text-sm text-gray-600">{edu.institution} • {edu.year}</div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
          
          <Card>
            <Card.Header>
              <Card.Title>Achievements</Card.Title>
            </Card.Header>
            <Card.Content>
              <ul className="space-y-2">
                {alumniData.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <Award className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </Card.Content>
          </Card>
          
          <Card>
            <Card.Header>
              <Card.Title>Alumni Network Statistics</Card.Title>
              <Card.Description>Overview of where our alumni are now</Card.Description>
            </Card.Header>
            <Card.Content>
              <AlumniStats />
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;