import React, { useState } from 'react';

const Nutrition: React.FC = () => {
  const [nutrition, setNutrition] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const buttonStyle = {
    backgroundColor: 'pink',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginLeft: '165px'
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // max values to accomodate the average human being, unless that human is eddie hall or some shit
    if (parseInt(value) > 100_000) {
      return;
    }
      setNutrition((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className='grid grid-cols-2 gap-4 p-4 text-black'>
      {/* Nutrition Information Card */}
      <div>
        <h2>Nutrition Information</h2>
        <ul style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '5px' }}>
          <li>Calories: {nutrition.calories}</li>
          <li>
            <input 
              type='number'
              name='calories'
              value={nutrition.calories}
              onChange={handleChange}
              className="bg-pink-100 border border-gray-300 rounded-md p-2"
            />
          </li>
          <li>Protein: {nutrition.protein}g</li>
          <li>
            <input
              type='number'
              name='protein'
              value={nutrition.protein}
              onChange={handleChange}
              className="bg-pink-100 border border-gray-300 rounded-md p-2"
            />
          </li>
          <li>Carbohydrates: {nutrition.carbs}g</li>
          <li>
            <input
              type='number'
              name='carbs'
              value={nutrition.carbs}
              onChange={handleChange}
              className="bg-pink-100 border border-gray-300 rounded-md p-2"
            />
          </li>
          <li>Fat: {nutrition.fats}g</li>
          <li>
            <input
              type='number'
              name='fats'
              value={nutrition.fats}
              onChange={handleChange}
              className="bg-pink-100 border border-gray-300 rounded-md p-2"
            />
          </li>
          </ul>
          <button style={buttonStyle} onClick={() => 0}>
            Save Macros
            </button>
      </div>
    </div>
  );
};
export default Nutrition;
