import { faCalculator,faCarrot, faDumbbell, faWeight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence,motion } from 'framer-motion';
import React, { useState } from 'react';

import '@/styles/colors.css';
import '@/styles/globals.css';

import OneRepMaxCalculator from '@/app/components/1rm'
import HealthCalculator from '@/app/components/HealthComponent';
import Hydration from '@/app/components/Hydration';
import Meals from '@/app/components/Meals';
import GoalMilestoneInput from '@/app/components/MileStone';
import Navbar from '@/app/components/Navbar';
import WeightTracker from '@/app/components/Weight';
import WorkoutComponent from '@/app/components/WorkoutComponent';



const categoryIcons = {
  Nutrition: faCarrot,
  Workouts: faDumbbell,
  Tracking: faWeight,
  Calculators: faCalculator,
};

const buttonStyle = {
  backgroundColor: 'white',
  color: 'black',
  padding: '10px 15px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const Card = ({ children, currentIndex, targetIndex }) => {
  const variants = {
    enter: { opacity: 0, x: targetIndex > currentIndex ? '100%' : '-100%' },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: targetIndex > currentIndex ? '-100%' : '100%' },
  };

  return (
    <motion.div
      className='bg-white p-6 rounded-md shadow-md mb-8 mx-4 md:max-w-md lg:max-w-lg'
      variants={variants}
      initial='enter'
      animate='center'
      exit='exit'
      transition={{ type: 'spring', duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const CircularArrow = ({ onClick, direction, disabled }) => (
  <motion.button
    whileTap={{ scale: 0.5 }}
    className={`text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg ml-40 text-sm px-5 py-2.5 mr-40 text-center mb-2 ${direction === 'left' ? 'ml-8' : 'mr-8'}`}
    onClick={onClick}
    disabled={disabled}
    style={{ opacity: disabled ? 0.5 : 1 }}
  >
    {direction === 'left' ? '←' : '→'}
  </motion.button>
);

export default function FitnessLayout({ children }: { children: React.ReactNode }) {
  const categories = [
    { name: 'Nutrition', components: React.Children.toArray(children).filter((child) => child.type === Meals || child.type === Hydration) },
    { name: 'Workouts', components: React.Children.toArray(children).filter((child) => child.type === WorkoutComponent) },
    { name: 'Tracking', components: React.Children.toArray(children).filter((child) => child.type === WeightTracker || child.type === GoalMilestoneInput) },
    { name: 'Calculators', components: React.Children.toArray(children).filter((child) => child.type === HealthCalculator || child.type === OneRepMaxCalculator) },
  ];

  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const showNextCard = () => {
    const currentCategory = categories[currentCategoryIndex];
    if (currentCardIndex < currentCategory.components.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const showPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const isNextDisabled = currentCardIndex === categories[currentCategoryIndex].components.length - 1;
  const isPreviousDisabled = currentCardIndex === 0;

  const changeCategory = (index: number) => {
    setCurrentCategoryIndex(index);
    setCurrentCardIndex(0);
  };

  return (
    <div className='bg-pink-300 min-h-screen'>
      <Navbar />
      <div className='flex flex-col items-center'>
        <div className='flex mt-2 mb-2'>
          {categories.map((category, index) => (
            <button style={buttonStyle} key={index} onClick={() => changeCategory(index)} className={`mr-4 ${index === currentCategoryIndex ? 'font-bold' : ''}`}>
              <FontAwesomeIcon icon={categoryIcons[category.name]} className="mr-2" />
              {category.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode='wait'>
          <div key={currentCategoryIndex} style={{ display: 'block' }}>
            <div className='flex flex-wrap justify-center'>
              <AnimatePresence mode='wait'>
                <Card key={currentCardIndex} currentIndex={currentCardIndex} targetIndex={currentCardIndex}>
                  {categories[currentCategoryIndex].components[currentCardIndex]}
                </Card>
              </AnimatePresence>
            </div>
            <div className='flex mt-2'>
              <CircularArrow onClick={showPreviousCard} direction='left' disabled={isPreviousDisabled} />
              <CircularArrow onClick={showNextCard} direction='right' disabled={isNextDisabled} />
            </div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}