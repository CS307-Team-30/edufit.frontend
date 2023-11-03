import axios from 'axios';
import { User } from 'lucide-react';
import React, { useState } from 'react';

import { useGlobalStore } from '@/app/stores/UserStore';

// Hydration Component
const Hydration: React.FC<{ hydrationInfo: any }> = ({ hydrationInfo }) => {
  const [hydration, setHydration] = useState({
    waterConsumed: 0,
  });

  const userId = useGlobalStore(state => state.user.id)
  const [previousLogs, setPreviousLogs] = useState<any[]>([]);

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

  const save = () => {
    axios.post('http://localhost:8000/hydration', {
      id: userId,
      waterConsumed: hydration.waterConsumed
    })
    .then(response => {
      setHydration({
        waterConsumed: 0
      });
    })
    .catch(error => {
      // Handle error, if needed
      console.error("Error:", error);
    });
  axios.get(`http://localhost:8000/hydration/${userId}`)
  .then(response => {
    const hydrationInfo = response.data;
    // Use hydrationInfo for displaying the water consumption information
    setPreviousLogs(prevLogs => [...prevLogs, hydrationInfo]);
  })
  .catch(error => {
    // Handle error, if needed
    console.error("Error:", error);
  });

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
          <button style={buttonStyle} onClick={save}>
            Save
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
        <div>
        {hydrationInfo && (
          <div>
            <h2>Current User's Water Logs</h2>
            <p>Water Consumed: {hydrationInfo.waterConsumed}ml</p>
          </div>
        )}
        {previousLogs.length > 0 && (
          <div>
            <h2>Previous Water Logs</h2>
            <ul>
              {previousLogs.map((log, index) => (
                <li key={index}>{`Water Log ${index + 1}: User ID: ${log.user_id}, Water Consumed: ${log.waterConsumed}ml`}</li>
              ))}
            </ul>
          </div>
        )}
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
