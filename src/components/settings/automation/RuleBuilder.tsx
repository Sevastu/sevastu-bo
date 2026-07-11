import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, GitMerge, Zap, Save, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RuleBuilderProps {
  onSave?: (rule: any) => void;
  onCancel?: () => void;
}

export const RuleBuilder: React.FC<RuleBuilderProps> = ({ onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [conditions, setConditions] = useState([{ field: '', operator: 'EQUALS', value: '' }]);
  const [actions, setActions] = useState([{ type: '', target: '' }]);

  const addCondition = () => setConditions([...conditions, { field: '', operator: 'EQUALS', value: '' }]);
  const removeCondition = (idx: number) => setConditions(conditions.filter((_, i) => i !== idx));
  const updateCondition = (idx: number, field: string, val: string) => {
    const newConds = [...conditions];
    newConds[idx] = { ...newConds[idx], [field]: val };
    setConditions(newConds);
  };

  const addAction = () => setActions([...actions, { type: '', target: '' }]);
  const removeAction = (idx: number) => setActions(actions.filter((_, i) => i !== idx));
  const updateAction = (idx: number, field: string, val: string) => {
    const newActions = [...actions];
    newActions[idx] = { ...newActions[idx], [field]: val };
    setActions(newActions);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        name,
        type: 'AUTOMATION_RULE',
        status: 'ACTIVE',
        payload: { conditions, actions }
      });
    }
  };

  return (
    <Card className="border-indigo-100 shadow-lg">
      <CardHeader className="bg-slate-50 border-b pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Rule Builder</CardTitle>
          {onCancel && (
            <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8 text-gray-500">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="mt-2">
          <label className="text-xs font-semibold text-gray-500 uppercase">Rule Name</label>
          <Input 
            placeholder="e.g., Auto-assign high priority jobs" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="mt-1"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-8">
        
        {/* Conditions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <GitMerge className="w-4 h-4 text-indigo-500" /> IF (Conditions)
            </h4>
            <Badge variant="secondary" className="text-xs">AND</Badge>
          </div>
          
          <div className="space-y-3 pl-4 border-l-2 border-indigo-100">
            {conditions.map((cond, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input 
                  placeholder="Field (e.g. distance)" 
                  value={cond.field} 
                  onChange={e => updateCondition(idx, 'field', e.target.value)}
                  className="w-1/3 text-sm h-9"
                />
                <select 
                  className="flex h-9 w-32 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={cond.operator}
                  onChange={e => updateCondition(idx, 'operator', e.target.value)}
                >
                  <option value="EQUALS">Equals</option>
                  <option value="NOT_EQUALS">Not Equals</option>
                  <option value="GREATER_THAN">&gt;</option>
                  <option value="LESS_THAN">&lt;</option>
                  <option value="CONTAINS">Contains</option>
                </select>
                <Input 
                  placeholder="Value" 
                  value={cond.value} 
                  onChange={e => updateCondition(idx, 'value', e.target.value)}
                  className="flex-1 text-sm h-9"
                />
                <Button variant="ghost" size="icon" onClick={() => removeCondition(idx)} className="h-9 w-9 text-red-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addCondition} className="text-indigo-600 border-indigo-200 bg-indigo-50 hover:bg-indigo-100 mt-2">
              <Plus className="w-3 h-3 mr-1" /> Add Condition
            </Button>
          </div>
        </div>

        {/* Actions Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" /> THEN (Actions)
          </h4>
          
          <div className="space-y-3 pl-4 border-l-2 border-yellow-100">
            {actions.map((act, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <select 
                  className="flex h-9 w-40 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={act.type}
                  onChange={e => updateAction(idx, 'type', e.target.value)}
                >
                  <option value="">Select Action...</option>
                  <option value="AUTO_ASSIGN">Auto Assign</option>
                  <option value="NOTIFY_USER">Notify User</option>
                  <option value="ESCALATE">Escalate</option>
                  <option value="REQUIRE_APPROVAL">Require Approval</option>
                </select>
                <Input 
                  placeholder="Target (e.g. Worker ID or Role)" 
                  value={act.target} 
                  onChange={e => updateAction(idx, 'target', e.target.value)}
                  className="flex-1 text-sm h-9"
                />
                <Button variant="ghost" size="icon" onClick={() => removeAction(idx)} className="h-9 w-9 text-red-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addAction} className="text-yellow-700 border-yellow-200 bg-yellow-50 hover:bg-yellow-100 mt-2">
              <Plus className="w-3 h-3 mr-1" /> Add Action
            </Button>
          </div>
        </div>

      </CardContent>
      <CardFooter className="bg-slate-50 border-t p-4 flex justify-end gap-2">
        {onCancel && <Button variant="outline" onClick={onCancel}>Cancel</Button>}
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" /> Save Rule
        </Button>
      </CardFooter>
    </Card>
  );
};
