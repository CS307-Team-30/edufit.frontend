import React, { useState } from 'react';

const Nutrition: React.FC = () => {
  const [nutrition, setNutrition] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNutrition((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className='grid grid-cols-2 gap-4 p-4 text-black'>
      {/* Left Grid: Nutrition Information */}
      <div>
        <h2>Nutrition Information</h2>
        <ul>
          <li>Calories: {nutrition.calories}</li>
          <li>Protein: {nutrition.protein}g</li>
          <li>Carbohydrates: {nutrition.carbs}g</li>
          <li>Fat: {nutrition.fats}g</li>
        </ul>
      </div>

      {/* Right Grid: Form */}
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '20px',
          }}
        >
          <input
            type='number'
            name='calories'
            placeholder='Calories'
            value={nutrition.calories}
            onChange={handleChange}
            className='mb-4'
          />
          <input
            type='number'
            name='protein'
            placeholder='Protein (g)'
            value={nutrition.protein}
            onChange={handleChange}
            className='mb-4'
          />
          <input
            type='number'
            name='carbs'
            placeholder='Carbs (g)'
            value={nutrition.carbs}
            onChange={handleChange}
            className='mb-4'
          />
          <input
            type='number'
            name='fats'
            placeholder='Fats (g)'
            value={nutrition.fats}
            onChange={handleChange}
            className='mb-4'
          />
          <button type='submit' className='rounded bg-pink-300 p-2 text-black'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Nutrition;
