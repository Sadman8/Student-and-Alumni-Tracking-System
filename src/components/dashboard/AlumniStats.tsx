import React from 'react';
import { Briefcase, GraduationCap, Building, Award } from 'lucide-react';
import Card from '../ui/Card';

// Sample data for alumni statistics
const ALUMNI_STATS = {
  totalAlumni: 1250,
  employed: 1050,
  higherEducation: 350,
  entrepreneurship: 120,
  industries: [
    { name: 'Technology', count: 450 },
    { name: 'Finance', count: 220 },
    { name: 'Healthcare', count: 180 },
    { name: 'Manufacturing', count: 120 },
    { name: 'Education', count: 80 },
  ],
  topCompanies: [
    { name: 'Google', count: 48 },
    { name: 'Microsoft', count: 42 },
    { name: 'Amazon', count: 38 },
    { name: 'Apple', count: 35 },
    { name: 'IBM', count: 28 },
  ],
};

const AlumniStats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50">
          <Card.Content className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600">Total Alumni</p>
              <p className="text-2xl font-bold text-blue-800">{ALUMNI_STATS.totalAlumni}</p>
            </div>
          </Card.Content>
        </Card>
        
        <Card className="bg-green-50">
          <Card.Content className="flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Briefcase className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-600">Employed</p>
              <p className="text-2xl font-bold text-green-800">{ALUMNI_STATS.employed}</p>
              <p className="text-xs text-green-600">
                {Math.round((ALUMNI_STATS.employed / ALUMNI_STATS.totalAlumni) * 100)}% of alumni
              </p>
            </div>
          </Card.Content>
        </Card>
        
        <Card className="bg-purple-50">
          <Card.Content className="flex items-center space-x-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <GraduationCap className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-600">Higher Education</p>
              <p className="text-2xl font-bold text-purple-800">{ALUMNI_STATS.higherEducation}</p>
              <p className="text-xs text-purple-600">
                {Math.round((ALUMNI_STATS.higherEducation / ALUMNI_STATS.totalAlumni) * 100)}% of alumni
              </p>
            </div>
          </Card.Content>
        </Card>
        
        <Card className="bg-amber-50">
          <Card.Content className="flex items-center space-x-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Building className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-600">Entrepreneurs</p>
              <p className="text-2xl font-bold text-amber-800">{ALUMNI_STATS.entrepreneurship}</p>
              <p className="text-xs text-amber-600">
                {Math.round((ALUMNI_STATS.entrepreneurship / ALUMNI_STATS.totalAlumni) * 100)}% of alumni
              </p>
            </div>
          </Card.Content>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Card.Header>
            <Card.Title>Industry Distribution</Card.Title>
            <Card.Description>Where our alumni are working</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {ALUMNI_STATS.industries.map((industry) => (
                <div key={industry.name} className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">{industry.name}</div>
                  <div className="flex-1">
                    <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-blue-500"
                        style={{ width: `${(industry.count / ALUMNI_STATS.totalAlumni) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-sm font-medium text-gray-900 w-16 text-right">
                    {industry.count}
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
        
        <Card>
          <Card.Header>
            <Card.Title>Top Employers</Card.Title>
            <Card.Description>Most popular companies hiring our alumni</Card.Description>
          </Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {ALUMNI_STATS.topCompanies.map((company, index) => (
                <div key={company.name} className="flex items-center">
                  <div className="w-8 text-center font-medium text-gray-500">{index + 1}</div>
                  <div className="flex-1 text-sm font-medium text-gray-900">{company.name}</div>
                  <div className="flex items-center ml-4">
                    <Award className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{company.count} alumni</span>
                  </div>
                </div>
              ))}
            </div>
          </Card.Content>
          <Card.Footer className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              View All Companies
            </a>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default AlumniStats;