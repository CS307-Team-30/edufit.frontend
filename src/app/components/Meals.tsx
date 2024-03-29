import React, { useEffect, useState } from 'react';

import { useGlobalStore } from '@/app/stores/UserStore';

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
  marginLeft: '5px',
};

const MealLogger: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [newFood, setNewFood] = useState<Food>({ name: '', calories: '', protein: '', fat: '', carbs: '', quantity: '', mealType: 'Breakfast' });

  const userId = useGlobalStore(state => state.user.id)

  useEffect(() => {
    // Fetch food data for the user
    fetch(`/user/${userId}/foods`)
      .then(response => response.json())
      .then(data => setFoods(data));
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setNewFood(prevFood => ({
      ...prevFood,
      [name]: value
    }));
  };

  const addOrUpdateFood = (foodData: Food) => {
    fetch(`/user/${userId}/food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Refresh the list of foods after adding/updating
      
      } else {
        // Handle error
        console.error('Error:', data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const [editIndex, setEditIndex] = useState<number>(-1);

  const handleEdit = (index: number) => {
    setNewFood(foods[index]);
    setEditIndex(index);
  };

  const handleSave = () => {
    const updatedFoods = [...foods];
    updatedFoods[editIndex] = newFood;


    setFoods(updatedFoods);
    addOrUpdateFood(newFood);
    setNewFood({
      name: '',
      calories: '',
      protein: '',
      fat: '',
      carbs: '',
      quantity: '',
      mealType: 'Breakfast',
    });
    setEditIndex(-1);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Meal Logger</h1>

      <div className='min-w-[300px]'>
        <input
          type="text"
          value={newFood.name}
          name="name"
          onChange={handleChange}
          placeholder="Food name"
          className="bg-pink-100 mb-2 mr-2 border border-gray-300 rounded-md p-2"
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
          className="bg-pink-100 mb-2 mr-2 border border-gray-300 rounded-md p-2"
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
          className="bg-pink-100 mb-2 mr-2 border border-gray-300 rounded-md p-2"
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
        {editIndex === -1 ? (
          <button style={buttonStyle} onClick={() => setFoods(prevFoods => [...prevFoods, newFood])}>
            Add Food
          </button>
        ) : (
          <button style={buttonStyle} onClick={handleSave}>
            Save
          </button>
        )}
      </div>

      <div>
      <h2 className="text-xl font-bold mb-4 flex flex-col space-y-2">Meals</h2>
        <div className='flex flex-col space-y-2'>
          {foods.map((food, index) => (
            <div className='flex flex-col' key={index}>
              {editIndex === index ? (
                <span>
                  <button style={buttonStyle} onClick={handleSave}>
                    Save
                  </button>
                  <button style={buttonStyle} onClick={() => setEditIndex(-1)}>
                    Cancel
                  </button>
                </span>
              ) : (
                <span>
                  <button style={buttonStyle} onClick={() => handleEdit(index)}>
                    Edit
                  </button>
                  <button style={buttonStyle} onClick={() => setFoods(prevFoods => prevFoods.filter((_, i) => i !== index))}>
                    Remove
                  </button>
                </span>
              )}
              <span>
                {food.name} - Calories: {food.calories} - Protein: {food.protein}g - Fats: {food.fat}g - Carbs: {food.carbs}g - Quantity: {food.quantity}oz. - Meal Type: {food.mealType}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealLogger;
