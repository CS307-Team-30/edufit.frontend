import React, { useState } from 'react';

type Food = {
  name: string;
  calories: string;
  quantity: string;
  mealType: string;
};

const buttonStyle = {
  backgroundColor: 'pink',
  color: 'white',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '20px',
};

const MealLogger: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [newFood, setNewFood] = useState<Food>({ name: '', calories: '', quantity: '', mealType: 'Breakfast' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setNewFood(prevFood => ({
      ...prevFood,
      [name]: value
    }));
  };

  const addFoodToMeal = () => {
    setFoods(prevFoods => [...prevFoods, newFood]);
    setNewFood({ name: '', calories: '', quantity: '', mealType: 'Breakfast' });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Meal Logger</h1>

      <div>
        <input
          type="text"
          value={newFood.name}
          name="name"
          onChange={handleChange}
          placeholder="Food name"
        />
        <input
          type="number"
          value={newFood.calories}
          name="calories"
          onChange={handleChange}
          placeholder="Calories"
        />
        <input
          type="number"
          value={newFood.quantity}
          name="quantity"
          onChange={handleChange}
          placeholder="Quantity (oz.)"
        />
        <select
          name="mealType"
          value={newFood.mealType}
          onChange={handleChange}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
        <button style={buttonStyle} onClick={addFoodToMeal}>
          Add Food
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Foods in the Meal</h2>
        <ul>
          {foods.map((food, index) => (
            <li key={index}>
              {food.name} - Calories: {food.calories} - Quantity: {food.quantity}oz. - Meal Type: {food.mealType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealLogger;
