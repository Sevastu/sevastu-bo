import React, { useState } from 'react';
import { 
  X, 
  User, 
  Star, 
  Map, 
  Award, 
  CheckCircle,
  Clock,
  Phone,
  Mail
} from 'lucide-react';

interface Worker {
  id: string;
  name: string;
  rating: number;
  experience: string;
  distance: string;
  completedJobs: number;
  email: string;
  phone: string;
  availability: 'available' | 'busy';
}

interface WorkerAssignmentPanelProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
}

const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'Mike Wilson',
    rating: 4.8,
    experience: '5 years',
    distance: '2.3 km',
    completedJobs: 156,
    email: 'mike@example.com',
    phone: '+1234567890',
    availability: 'available'
  },
  {
    id: '2',
    name: 'Sarah Davis',
    rating: 4.9,
    experience: '7 years',
    distance: '3.1 km',
    completedJobs: 234,
    email: 'sarah@example.com',
    phone: '+0987654321',
    availability: 'available'
  },
  {
    id: '3',
    name: 'Tom Harris',
    rating: 4.6,
    experience: '3 years',
    distance: '1.8 km',
    completedJobs: 89,
    email: 'tom@example.com',
    phone: '+1122334455',
    availability: 'busy'
  }
];

const WorkerCard: React.FC<{ 
  worker: Worker; 
  isBest: boolean; 
  onSelect: () => void; 
}> = ({ worker, isBest, onSelect }) => {
  const getScoreColor = (score: number) => {
    if (score >= 4.8) return 'text-green-600';
    if (score >= 4.5) return 'text-blue-600';
    return 'text-gray-600';
  };

  const getAvailabilityColor = (availability: string) => {
    return availability === 'available' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
  };

  return (
    <div className={`border rounded-lg p-4 cursor-pointer transition-all ${
      isBest ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
    }`} onClick={onSelect}>
      {isBest && (
        <div className="flex items-center gap-1 mb-2">
          <CheckCircle size={16} className="text-blue-600" />
          <span className="text-sm font-medium text-blue-600">Best Match</span>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{worker.name}</div>
            <div className={`text-xs px-2 py-1 rounded-full ${getAvailabilityColor(worker.availability)}`}>
              {worker.availability}
            </div>
          </div>
        </div>
        <div className={`text-lg font-bold ${getScoreColor(worker.rating)}`}>
          {worker.rating}
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Map size={14} />
            Distance
          </div>
          <span className="font-medium text-gray-900">{worker.distance}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Star size={14} />
            Rating
          </div>
          <span className="font-medium text-gray-900">{worker.rating}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Award size={14} />
            Experience
          </div>
          <span className="font-medium text-gray-900">{worker.experience}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <CheckCircle size={14} />
            Completed Jobs
          </div>
          <span className="font-medium text-gray-900">{worker.completedJobs}</span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <Phone size={12} />
          {worker.phone}
        </div>
        <div className="flex items-center gap-1">
          <Mail size={12} />
          {worker.email}
        </div>
      </div>
    </div>
  );
};

export const WorkerAssignmentPanel: React.FC<WorkerAssignmentPanelProps> = ({
  isOpen,
  onClose,
  jobId
}) => {
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);

  // Find best worker (highest rating + availability)
  const availableWorkers = mockWorkers.filter(w => w.availability === 'available');
  const bestWorker = availableWorkers.reduce((best, current) => 
    current.rating > best.rating ? current : best, availableWorkers[0]
  );

  const handleAssignWorker = (workerId: string) => {
    // TODO: Implement worker assignment logic
    console.log(`Assigning worker ${workerId} to job ${jobId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Assign Worker</h2>
            <p className="text-sm text-gray-600">Job ID: {jobId}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Available Workers</h3>
            <p className="text-sm text-gray-600">
              Select the best worker based on distance, rating, and experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableWorkers.map((worker) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                isBest={worker.id === bestWorker.id}
                onSelect={() => setSelectedWorker(worker.id)}
              />
            ))}
          </div>

          {/* No Workers Available */}
          {availableWorkers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Workers Available</h3>
              <p className="text-gray-600">All workers are currently busy. Please try again later.</p>
            </div>
          )}
        </div>

        {/* Actions */}
        {selectedWorker && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex gap-3">
              <button
                onClick={() => handleAssignWorker(selectedWorker)}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Assign Selected Worker
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
