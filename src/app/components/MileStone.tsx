import { Button,DatePicker, Input } from 'antd';
import React, { useState } from 'react';


interface GoalOrMilestone {
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
    const [entries, setEntries] = useState<GoalOrMilestone[]>([]);

    const handleSave = () => {
        const newEntry: GoalOrMilestone = {
            type,
            exerciseName,
            targetPounds: parseFloat(targetPounds),
            date,
            description
        };
        setEntries([...entries, newEntry]);
        // Save to backend here
        clearForm();
    };

    const clearForm = () => {
        setExerciseName('');
        setTargetPounds('');
        setDate('');
        setDescription('');
    };

    return (
        <div>
            <h2>{type} Entry</h2>
            <select value={type} onChange={(e) => setType(e.target.value as 'Goal' | 'Milestone')}>
                <option value="Goal">Goal</option>
                <option value="Milestone">Milestone</option>
            </select>
            <Input placeholder="Exercise Name" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} />
            <Input
                type="number"
                placeholder="Target Pounds"
                value={targetPounds}
                onChange={(e) => setTargetPounds(e.target.value)}
            />
            <DatePicker onChange={(value) => setDate(value ? value.format('YYYY-MM-DD') : '')} />
            <Input.TextArea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button onClick={handleSave}>Save {type}</Button>

            <div>
                <h3>Saved {type}s</h3>
                {entries.map((entry, index) => (
                    <div key={index}>
                        <p>Type: {entry.type}</p>
                        <p>Exercise: {entry.exerciseName}</p>
                        <p>Target Pounds: {entry.targetPounds}</p>
                        <p>Date: {entry.date}</p>
                        <p>Description: {entry.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoalMilestoneInput;
