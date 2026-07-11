import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Settings2, Trash2 } from 'lucide-react';
import { RuleBuilder } from './RuleBuilder';

interface ConfigPanelProps {
  title: string;
  description: string;
  rules: any[];
  onCreateNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const GenericRulePanel: React.FC<ConfigPanelProps> = ({ title, description, rules, onCreateNew, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <Button onClick={onCreateNew} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Create New Rule
        </Button>
      </div>

      <div className="grid gap-4">
        {rules.length === 0 ? (
          <Card className="border-dashed bg-slate-50">
            <CardContent className="p-12 text-center text-gray-500">
              No rules configured yet. Create one to automate this workflow.
            </CardContent>
          </Card>
        ) : (
          rules.map((rule, idx) => (
            <Card key={idx} className="hover:border-indigo-200 transition-colors">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{rule.name || 'Unnamed Rule'}</span>
                    <Badge variant={rule.status === 'ACTIVE' ? 'default' : 'secondary'} className={rule.status === 'ACTIVE' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}>
                      {rule.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">
                    Priority: {rule.priority || 1} | Updated: {new Date().toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(rule.id)} className="text-gray-500 hover:text-indigo-600">
                    <Settings2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(rule.id)} className="text-gray-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
