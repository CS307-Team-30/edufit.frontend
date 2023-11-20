import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const WeightTracker = () => {
  const [weights, setWeights] = useState<{ date: string; weight: number }[]>(
    []
  );
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');

  const handleWeightSubmit = () => {
    const newWeightEntry = {
      date: new Date().toLocaleDateString(),
      weight: parseFloat(currentWeight),
    };
    setWeights([...weights, newWeightEntry]);
    setCurrentWeight('');
  };

  const handleTargetWeightChange = (e) => {
    setTargetWeight(e.target.value);
  };

  useEffect(() => {
    // Load previously saved weights from local storage or other storage solutions
    // ...
  }, []);

  return (
    <div>
      <h2>Weight Tracker</h2>
      <div>
        <input
          type='number'
          value={currentWeight}
          onChange={(e) => setCurrentWeight(e.target.value)}
          placeholder='Enter your weight in lbs'
        />
        <button onClick={handleWeightSubmit}>Submit Weight</button>
      </div>
      <div>
        <input
          type='number'
          value={targetWeight}
          onChange={handleTargetWeightChange}
          placeholder='Enter your target weight'
        />
        <p>Target Weight: {targetWeight} lbs</p>
      </div>
      <LineChart width={600} height={300} data={weights}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='weight'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default WeightTracker;
