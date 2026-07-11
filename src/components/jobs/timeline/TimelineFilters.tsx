import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search, Calendar, User, Tag, AlertTriangle } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface TimelineFiltersProps {
  onSearch: (term: string) => void;
  onFilterChange: (filter: string) => void;
}

export const TimelineFilters: React.FC<TimelineFiltersProps> = ({ onSearch, onFilterChange }) => {
  return (
    <Card className="mb-6 shadow-sm border-gray-200">
      <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            className="pl-10 bg-slate-50 border-gray-200 focus-visible:ring-indigo-500" 
            placeholder="Search timeline events..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-gray-600">
                <Calendar className="w-4 h-4 mr-2" /> Date
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onFilterChange('date_today')}>Today</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilterChange('date_week')}>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilterChange('date_all')}>All Time</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-gray-600">
                <User className="w-4 h-4 mr-2" /> User
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onFilterChange('user_admin')}>Admins</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilterChange('user_worker')}>Workers</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilterChange('user_system')}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-gray-600">
                <Tag className="w-4 h-4 mr-2" /> Entity
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onFilterChange('entity_job')}>Jobs</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilterChange('entity_assignment')}>Assignments</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilterChange('entity_schedule')}>Schedules</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="text-gray-600">
            <Filter className="w-4 h-4 mr-2" /> More Filters
          </Button>

        </div>
      </CardContent>
    </Card>
  );
};
