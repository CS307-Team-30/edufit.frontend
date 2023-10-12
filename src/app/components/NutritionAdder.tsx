import * as React from 'react';

const NutritionInput: React.FC = () => {
    const [nutrition, setNutrition] = useState({
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNutrition(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted Nutrition Data:', nutrition);

        // Here, you might want to send this data to your API.
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', marginBottom: '20px' }}>
            <input
                type="number"
                name="calories"
                placeholder="Calories"
                value={nutrition.calories}
                onChange={handleChange}
                style={{ marginRight: '10px' }}
            />
            <input
                type="number"
                name="protein"
                placeholder="Protein (g)"
                value={nutrition.protein}
                onChange={handleChange}
                style={{ marginRight: '10px' }}
            />
            <input
                type="number"
                name="carbs"
                placeholder="Carbs (g)"
                value={nutrition.carbs}
                onChange={handleChange}
                style={{ marginRight: '10px' }}
            />
            <input
                type="number"
                name="fats"
                placeholder="Fats (g)"
                value={nutrition.fats}
                onChange={handleChange}
                style={{ marginRight: '10px' }}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default NutritionInput;
