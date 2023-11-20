import { faBrain, faCarrot, faDumbbell } from '@fortawesome/free-solid-svg-icons';
// Create a Card component for each category
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

import '../src/styles/colors.css';
import '../src/styles/globals.css';

import OneRepMaxCalculator from '@/app/components/1rm';
import HealthCalculator from '@/app/components/HealthComponent';
import Hydration from '@/app/components/Hydration';
import ComponentsLayout from '@/app/components/layout';
import Meals from '@/app/components/Meals'
import WorkoutComponent from '@/app/components/WorkoutComponent';

// Create a Card component for each category
const Card = ({ children, title, category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    let timer;
    if (isHovered) {
      // Show the overlay briefly (e.g., 500 milliseconds)
      setShowOverlay(true);

      // Remove the overlay after a short delay (e.g., 1500 milliseconds)
      timer = setTimeout(() => {
        setShowOverlay(false);
      }, 1500);
    } else {
      // If user stops hovering, immediately hide the overlay
      setShowOverlay(false);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isHovered]);

  // Function to get the appropriate icon based on the category
  const getCategoryIcon = () => {
    switch (category) {
      case 'nutrition':
        return faCarrot;
      case 'workouts':
        return faDumbbell;
      case 'calculators':
        return faBrain;
      default:
        return null;
    }
  };

  return (
    <div
      className="relative group overflow-hidden rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-8">
        <div className="mb-4 text-2xl font-bold">{title}</div>
        {children}
      </div>

      {/* Hover overlay */}
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
          {/* Icon based on the category */}
          <FontAwesomeIcon icon={getCategoryIcon()} className="text-4xl" />

          <div className="ml-4 text-xl">{title}</div>
        </div>
      )}
    </div>
  );
};

// Update your NutritionPage component
export default function NutritionPage() {
  return (
    <ComponentsLayout>
      {/* Nutrition Card */}
      <div className="mt-12 min-h-[500px] md:mx-40">
        <Card title="Nutrition" category="nutrition">
          <Meals />
          <Hydration />
        </Card>
      </div>

      {/* Workouts Card */}
      <div className="mt-12 min-h-[500px] md:mx-40">
        <Card title="Workouts" category="workouts">
          <WorkoutComponent />
        </Card>
      </div>

      {/* Calculators Card */}
      <div className="mt-12 min-h-[500px] md:mx-40">
        <Card title="Calculators" category="calculators">
          <div className="p-8">
            {/* Add your calculator components here */}
            <HealthCalculator />
            <OneRepMaxCalculator />
          </div>
        </Card>
      </div>
    </ComponentsLayout>
  );
}
