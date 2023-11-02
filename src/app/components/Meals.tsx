import React, { useState } from 'react';

type Food = {
  name: string;
  calories: string;
  protein: string;
  fat: string;
  carbs: string;
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
  const [newFood, setNewFood] = useState<Food>({ name: '', calories: '', protein: '', fat: '', carbs: '', quantity: '', mealType: 'Breakfast' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setNewFood(prevFood => ({
      ...prevFood,
      [name]: value
    }));
  };

  const addFoodToMeal = () => {
    setFoods(prevFoods => [...prevFoods, newFood]);
    setNewFood({ name: '', calories: '', protein: '', fat: '', carbs: '', quantity: '', mealType: 'Breakfast' });
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
          className="bg-pink-100 border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          value={newFood.calories}
          name="calories"
          onChange={handleChange}
          placeholder="Calories"
          className="bg-pink-100 border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          value={newFood.protein}
          name="protein"
          onChange={handleChange}
          placeholder="Protein (g)"
          className="bg-pink-100 border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          value={newFood.fat}
          name="fat"
          onChange={handleChange}
          placeholder="Fats (g)"
          className="bg-pink-100 border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          value={newFood.carbs}
          name="carbs"
          onChange={handleChange}
          placeholder="Carbs (g)"
          className="bg-pink-100 border border-gray-300 rounded-md p-2"
        />
        <input
          type="number"
          value={newFood.quantity}
          name="quantity"
          onChange={handleChange}
          placeholder="Quantity (oz.)"
          className="bg-pink-100 border border-gray-300 rounded-md p-2"
        />
        <select
          name="mealType"
          value={newFood.mealType}
          onChange={handleChange}
          className="bg-pink-100 border border-gray-300 rounded-md p-2"
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
              {food.name} - Calories: {food.calories} - Protein: {food.protein}g - Fats: {food.fat}g - Carbs: {food.carbs}g - Quantity: {food.quantity}oz. - Meal Type: {food.mealType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealLogger;
