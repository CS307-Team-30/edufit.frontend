import React, { useState } from 'react';

const Nutrition: React.FC = () => {
  const [nutrition, setNutrition] = useState({
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
  });

  const [hydration, setHydration] = useState({
    waterConsumed: 0,
  });

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

  const drink = (amount: number) => {
    setHydration((prevState) => ({
      waterConsumed: prevState.waterConsumed + amount,
    }));
  };

  const resetDrink = () => {
    setHydration(() => ({
      waterConsumed: 0
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  //Hydration Card
  const HydrationCard: React.FC = () => {
    const glassHeight = 200; 
    let fillHeight = 0;
    if (hydration.waterConsumed >= 3000) {
      fillHeight = 200;
    } else {
    fillHeight = (hydration.waterConsumed / 3000) * glassHeight;
    }

    return (
      <div>
      {fillHeight === 0 && (
        <p className="text-red-500">You are dehydrated!</p>
      )}
        <h2>Hydration</h2>
      <div style={{ border: '1px solid #ccc', width: '100px', height: '200px', position: 'relative' }}>
        <div
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: 'lightblue',
            position: 'absolute',
            bottom: 0,
            zIndex: 1,
            overflow: 'hidden',
          }}
        >
          {/* Liquid with animation class */}
          <div
            style={{
              width: '100%',
              height: `${fillHeight}px`,
              backgroundColor: 'blue',
              position: 'absolute',
              bottom: 0,
            }}
          />
        </div>
      </div>
        <p>Water Consumed: {hydration.waterConsumed}ml</p>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button style={{ backgroundColor: 'pink', marginBottom: '5px' }} onClick={resetDrink}>
            Reset
          </button>
          <button style={{ backgroundColor: 'pink', marginBottom: '5px' }} onClick={() => drink(250)}>
            Drink 250ml
          </button>
          <button style={{ backgroundColor: 'pink', marginBottom: '5px' }} onClick={() => drink(500)}>
            Drink 500ml
          </button>
          <button style={{ backgroundColor: 'pink', marginBottom: '5px' }} onClick={() => drink(1000)}>
            Drink 1000ml
          </button>
        </div>
      </div>
    );
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
          <button style={{ backgroundColor: 'pink', marginBottom: '5px' }} onClick={() => 0}>
            Save Macros
            </button>
      </div>

      {/* Hydration Card */}
      <div>
        <HydrationCard />
      </div>

      {/* Form for Nutrition Inputs */}
      <div>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '20px',
          }}
        >
          {/* Inputs for Nutrition */}
          {/* ... (existing code for nutrition inputs) */}
        </form>
      </div>
    </div>
  );
};

export default Nutrition;
