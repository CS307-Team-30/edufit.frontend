import { Button, DatePicker, Input, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { useGlobalStore } from '@/app/stores/UserStore';

interface GoalOrMilestone {
  id: number
  type: 'Goal' | 'Milestone';
  exerciseName: string;
  targetPounds: number;
  date: string;
  description: string;
}

const GoalMilestoneInput = () => {
  const [type, setType] = useState<'Goal' | 'Milestone'>('Goal');
  const [exerciseName, setExerciseName] = useState('');
  const [targetPounds, setTargetPounds] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [goalEntries, setGoalEntries] = useState<GoalOrMilestone[]>([]);
  const [milestoneEntries, setMilestoneEntries] = useState<GoalOrMilestone[]>([]);

  const userId = useGlobalStore(state => state.user.id)

  useEffect(() => {
    const fetchGoalsAndMilestones = async () => {
      try {
        // Fetch Goals
        const goalsResponse = await axios.get(`http://localhost:8000/user/${userId}/goals`);
        setGoalEntries(goalsResponse.data);
  
        // Fetch Milestones
        const milestonesResponse = await axios.get(`http://localhost:8000/user/${userId}/milestones`);
        setMilestoneEntries(milestonesResponse.data);
      } catch (error) {
        message.error('Error fetching data: ' + error.message);
      }
    };
  
    fetchGoalsAndMilestones();
  }, [userId]); // Dependency array includes userId to re-run the effect when userId changes
  

  const handleSave = () => {
    // Validation check
    if (!exerciseName || !targetPounds || !date || !description) {
      message.error('Please fill in all fields before saving.');
      return;
    }
  
    const newEntry = {
      exerciseName,
      targetPounds: parseFloat(targetPounds),
      date,
      description,
    };
  
    const endpoint = type === 'Goal' ? `http://localhost:8000/user/${userId}/goal` : `http://localhost:8000/user/${userId}/milestone`;
    
    axios.post(endpoint, newEntry)
      .then(response => {
        if (response.data.success) {
          // Update state with new entry
          if (type === 'Goal') {
            setGoalEntries([...goalEntries, { ...newEntry, type }]);
          } else {
            setMilestoneEntries([...milestoneEntries, { ...newEntry, type }]);
          }
          clearForm();
        }
      })
      .catch(error => {
        message.error('Error saving entry: ' + error.message);
      });
  };
  const handleDelete = (index) => {
    // Assuming each entry has a unique identifier (id)
    const entryId = type === 'Goal' ? goalEntries[index].id : milestoneEntries[index].id;
    const endpoint = type === 'Goal' ? `http://localhost:8000/user/${userId}/goal/${entryId}` : `http://localhost:8000/user/${userId}/milestone/${entryId}`;
  
    axios.delete(endpoint)
      .then(response => {
        if (response.data.success) {
          // Update state to remove the entry
          if (type === 'Goal') {
            const updatedGoals = [...goalEntries];
            updatedGoals.splice(index, 1);
            setGoalEntries(updatedGoals);
          } else {
            const updatedMilestones = [...milestoneEntries];
            updatedMilestones.splice(index, 1);
            setMilestoneEntries(updatedMilestones);
          }
        }
      })
      .catch(error => {
        message.error('Error deleting entry: ' + error.message);
      });
  };
  

  const clearForm = () => {
    setExerciseName('');
    setTargetPounds('');
    setDate('');
    setDescription('');
  };

  const handleTypeChange = (newType: 'Goal' | 'Milestone') => {
    setType(newType);
  };

  const renderEntries = () => {
    const entriesToRender = type === 'Goal' ? goalEntries : milestoneEntries;

    return entriesToRender.map((entry, index) => (
      <div key={index}>
        <p>Type: {entry.type}</p>
        <p>Exercise: {entry.exerciseName}</p>
        <p>Target Pounds: {entry.targetPounds}</p>
        <p>Date: {entry.date}</p>
        <p>Description: {entry.description}</p>
        <Button onClick={() => handleDelete(index)}>Delete</Button>
      </div>
    ));
  };

  return (
    <div>
      <h2>{type} Entry</h2>
      <select value={type} onChange={(e) => handleTypeChange(e.target.value as 'Goal' | 'Milestone')}>
        <option value="Goal">Goal</option>
        <option value="Milestone">Milestone</option>
      </select>
      <Input
        placeholder="Exercise Name"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Target Weight (lbs)"
        value={targetPounds}
        onChange={(e) => setTargetPounds(e.target.value)}
      />
      <DatePicker onChange={(value) => setDate(value ? value.format('YYYY-MM-DD') : '')} />
      <Input.TextArea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button onClick={handleSave}>Save {type}</Button>

      <div>
        <h3>Saved {type}s</h3>
        {renderEntries()}
      </div>
    </div>
  );
};

export default GoalMilestoneInput;
