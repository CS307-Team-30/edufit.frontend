import React, { useState } from 'react';

const OneRepMaxCalculator: React.FC = () => {
  const [inputValues, setInputValues] = useState({
    weight: '',
    reps: '',
  });
  const [oneRepMax, setOneRepMax] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // max values to accommodate the average human being, unless that human is Eddie Hall or some shit
    if (parseInt(value) > 100_000) {
      return;
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const calculateOneRepMax = () => {
    const weightValue = parseFloat(inputValues.weight);
    const repsValue = parseInt(inputValues.reps);

    if (!isNaN(weightValue) && !isNaN(repsValue) && repsValue > 0) {
      const calculatedOneRepMax = (weightValue / (1.0278 - 0.0278 * repsValue)).toFixed(2);
      setOneRepMax(calculatedOneRepMax);
    } else {
      setOneRepMax(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 text-black">
  <div>
    <h2>One Rep Max Calculator</h2>
    <ul style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5px' }}>
      <li>Weight (lbs): {inputValues.weight}</li>
      <li>
        <input
          type="number"
          name="weight"
          value={inputValues.weight}
          onChange={handleChange}
          className="bg-pink-100 border border-gray-300 rounded-md p-2"
        />
      </li>
      <li>Repetitions: {inputValues.reps}</li>
      <li>
        <input
          type="number"
          name="reps"
          value={inputValues.reps}
          onChange={handleChange}
          className="bg-pink-100 border border-gray-300 rounded-md p-2"
        />
      </li>
    </ul>
  </div>

  <div className="flex items-end mb-0.5">
    <button className="bg-pink-300 mt-2 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ marginLeft: "100px"}} onClick={calculateOneRepMax}>
      Calculate One Rep Max
    </button>
  </div>
    <div>
      {oneRepMax !== null && (
        <div>
          <p className="text-lg font-semibold">One Rep Max: {oneRepMax} lbs</p>
        </div>
      )}
    </div>
    
  </div>
  );
};

export default OneRepMaxCalculator;