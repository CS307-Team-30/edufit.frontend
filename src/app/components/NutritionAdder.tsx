import * as React from 'react';

import Nutrition from '@/app/components/Nutrition';

const NutritionInput: React.FC = () => {
  const [nutrition, setNutrition] = React.useState({
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
  };

  return (
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
          style={{ marginRight: '10px' }}
        />
        <input
          type='number'
          name='protein'
          placeholder='Protein (g)'
          value={nutrition.protein}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type='number'
          name='carbs'
          placeholder='Carbs (g)'
          value={nutrition.carbs}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        <input
          type='number'
          name='fats'
          placeholder='Fats (g)'
          value={nutrition.fats}
          onChange={handleChange}
          style={{ marginRight: '10px' }}
        />
        <button type='submit'>Submit</button>
      </form>
      <Nutrition
        calories={nutrition.calories}
        protein={nutrition.protein}
        carbs={nutrition.carbs}
        fats={nutrition.fats}
      />
    </div>
  );
};

export default NutritionInput;
