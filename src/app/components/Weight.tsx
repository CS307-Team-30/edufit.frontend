import React, { useEffect, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
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
    <div className="flex flex-col">
      <h2>Weight Tracker</h2>
      <div>
        <input
          className="bg-pink-100 border border-gray-300 rounded-md p-2"
          type='number'
          value={currentWeight}
          onChange={(e) => setCurrentWeight(e.target.value)}
          placeholder='Enter your weight (lbs)'
        />
      </div>
      <div>
        <input
          className="bg-pink-100 border border-gray-300 rounded-md p-2"
          type='number'
          value={targetWeight}
          onChange={handleTargetWeightChange}
          placeholder='Enter target weight (lbs)'
        />
      </div>
      <div>
        <button className="bg-pink-300 mt-2 mb-2 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleWeightSubmit}>Submit</button>
      </div>
      <LineChart width={400} height={400} data={weights} style={{ background: '#f0f0f0', border: '1px solid #ccc', borderRadius: '8px' }}>
    <CartesianGrid stroke='transparent'/>
    <XAxis dataKey='date' />
    <YAxis />
    <Tooltip />
    <Legend />
    <ReferenceLine y={targetWeight} stroke='red' strokeDasharray='3 3' label={`Target Weight: ${targetWeight}`} />
    <Line
      type='monotone'
      dataKey='weight'
      stroke='#4CAF50'
      strokeWidth={2}
      dot={{ fill: '#4CAF50', r: 6, stroke: 'white', strokeWidth: 2 }} 
      activeDot={{ r: 8 }}
    />
  </LineChart>
    </div>
  );
};

export default WeightTracker;
