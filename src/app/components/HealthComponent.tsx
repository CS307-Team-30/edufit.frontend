import React, { useState } from 'react';

const HealthCalculator = () => {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmi, setBMI] = useState(null);
  const [bmr, setBMR] = useState(null);
  const [calories, setCalories] = useState({ lose2: null, lose1: null, maintain: null, gain1: null, gain2: null });

  const calculateBMI = () => {
    if (heightFeet && weight) {
      const heightInMeters = ((parseInt(heightFeet) * 12 + parseInt(heightInches)) * 0.0254);
      const weightInKg = parseInt(weight) * 0.453592;
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBMI(bmiValue);
    }
  };

  const calculateBMR = () => {
    if (heightFeet && weight && age && gender) {
      const heightInCm = ((parseInt(heightFeet) * 12 + parseInt(heightInches)) * 2.54);
      const weightInKg = parseInt(weight) * 0.453592;
      let bmrValue;

      if (gender === 'male') {
        bmrValue = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * parseInt(age));
      } else {
        bmrValue = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * parseInt(age));
      }

      setBMR(bmrValue);
      setCalories({
        lose2: bmrValue - 1000,
        lose1: bmrValue - 500,
        maintain: bmrValue,
        gain1: bmrValue + 500,
        gain2: bmrValue + 1000
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
      <div style={{ border: '2px solid pink', padding: '20px', margin: '10px' }}>
        <h2>BMI Calculator</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Height (ft)" onChange={(e) => setHeightFeet(e.target.value)} />
          <input type="text" placeholder="Height (in)" onChange={(e) => setHeightInches(e.target.value)} />
          <input type="text" placeholder="Weight (lbs)" onChange={(e) => setWeight(e.target.value)} />
          <button style={{ backgroundColor: 'pink', border: '2px solid pink', padding: '10px 15px', cursor: 'pointer' }} onClick={calculateBMI}>Calculate BMI</button>
          {bmi && <p>Your BMI: {bmi.toFixed(2)}</p>}
        </div>
        <div style={{ border: '2px solid pink', padding: '10px', margin: '10px' }}>
          <p>BMI Categories:</p>
          <p>Underweight = {'<'}18.5</p>
          <p>Normal weight = 18.5–24.9</p>
          <p>Overweight = 25–29.9</p>
          <p>Obesity = BMI of 30 or greater</p>
        </div>
      </div>
      
      <div style={{ border: '2px solid pink', padding: '20px', margin: '10px' }}>
        <h2>Metabolic Rate Calculator</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input type="text" placeholder="Age" onChange={(e) => setAge(e.target.value)} />
          <select onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input type="text" placeholder="Height (ft)" onChange={(e) => setHeightFeet(e.target.value)} />
          <input type="text" placeholder="Height (in)" onChange={(e) => setHeightInches(e.target.value)} />
          <input type="text" placeholder="Weight (lbs)" onChange={(e) => setWeight(e.target.value)} />
          <button style={{ backgroundColor: 'pink', border: '2px solid pink', padding: '10px 15px', cursor: 'pointer' }} onClick={calculateBMR}>Calculate BMR</button>
          {bmr && (
            <div>
              <p>Your BMR: {bmr.toFixed(2)} calories/day</p>
              <p>To lose 2 lbs/week: {calories.lose2.toFixed(2)} calories/day</p>
              <p>To lose 1 lb/week: {calories.lose1.toFixed(2)} calories/day</p>
              <p>To maintain weight: {calories.maintain.toFixed(2)} calories/day</p>
              <p>To gain 1 lb/week: {calories.gain1.toFixed(2)} calories/day</p>
              <p>To gain 2 lbs/week: {calories.gain2.toFixed(2)} calories/day</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthCalculator;
