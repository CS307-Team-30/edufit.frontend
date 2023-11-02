import React, { useState } from 'react';

// Hydration Component
const Hydration: React.FC = () => {
  const [hydration, setHydration] = useState({
    waterConsumed: 0,
  });

  const buttonStyle = {
    backgroundColor: 'pink',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const drink = (amount: number) => {
    setHydration((prevState) => ({
      waterConsumed: prevState.waterConsumed + amount,
    }));
  };

  const resetDrink = () => {
    setHydration(() => ({
      waterConsumed: 0
    }));
  };

  // HydrationCard Component
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
          <button style={buttonStyle} onClick={resetDrink}>
            Reset
          </button>
          <button style={buttonStyle} onClick={() => drink(250)}>
            Drink 250ml
          </button>
          <button style={buttonStyle} onClick={() => drink(500)}>
            Drink 500ml
          </button>
          <button style={buttonStyle} onClick={() => drink(1000)}>
            Drink 1000ml
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className='grid grid-cols-2 gap-4 p-4 text-black'>
      <div>
        <HydrationCard />
      </div>
    </div>
  );
};

export default Hydration;
