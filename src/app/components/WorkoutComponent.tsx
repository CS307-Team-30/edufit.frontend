import React, { useState } from 'react';

type SetRecord = {
  weight: number;
  reps: number;
};

type Exercise = {
  name: string;
  sets: SetRecord[];
};

type Workout = {
  name: string;
  exercises: Exercise[];
};

const WorkoutComponent: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [showCreateWorkout, setShowCreateWorkout] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [newSet, setNewSet] = useState<SetRecord>({ weight: 0, reps: 0 });
  const [addingSetToExerciseIndex, setAddingSetToExerciseIndex] = useState<number | null>(null);
  const [showingSetsOfExerciseIndex, setShowingSetsOfExerciseIndex] = useState<number | null>(null);

  const startNewWorkout = () => {
    if (newWorkoutName) {
      setCurrentWorkout({ name: newWorkoutName, exercises: [] });
      setNewWorkoutName('');
    }
  };

  const addExercise = () => {
    if (newExerciseName && currentWorkout) {
      const updatedExercises = [...currentWorkout.exercises, { name: newExerciseName, sets: [] }];
      setCurrentWorkout({ ...currentWorkout, exercises: updatedExercises });
      setNewExerciseName('');
      setAddingSetToExerciseIndex(null); // Reset set adding index
    }
  };

  const addSet = () => {
    if (currentWorkout && addingSetToExerciseIndex != null) {
      const updatedExercises = [...currentWorkout.exercises];
      updatedExercises[addingSetToExerciseIndex].sets.push(newSet);
      setCurrentWorkout({ ...currentWorkout, exercises: updatedExercises });
      setNewSet({ weight: 0, reps: 0 }); // Reset for next set
    }
  };

  const saveWorkout = () => {
    if (currentWorkout) {
      setWorkouts([...workouts, currentWorkout]);
      setCurrentWorkout(null);
      setShowCreateWorkout(false);
    }
  };

  const handleSetChange = (field: keyof SetRecord, value: number) => {
    setNewSet({ ...newSet, [field]: value });
  };

  const resetAddingExercise = () => {
    setAddingSetToExerciseIndex(null);
    setNewSet({ weight: 0, reps: 0 });
  };

  const toggleShowSets = (index: number) => {
    setShowingSetsOfExerciseIndex(showingSetsOfExerciseIndex === index ? null : index);
  };

  return (
    <div style={{ margin: '20px' }}>
      {showCreateWorkout ? (
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Workout Name"
            value={newWorkoutName}
            onChange={(e) => setNewWorkoutName(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <button className="bg-pink-300 mt-2 mb-2 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={startNewWorkout}>Start Workout</button>
        </div>
      ) : (
        <button className="bg-pink-300 mt-2 mb-2 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setShowCreateWorkout(true)}>Create Workout</button>
      )}
      {currentWorkout && (
        <div style={{ marginBottom: '20px' }}>
          <h2>{currentWorkout.name}</h2>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Exercise Name"
              value={newExerciseName}
              onChange={(e) => setNewExerciseName(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <button className="bg-pink-300 mt-2 mb-2 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={addExercise}>Add Exercise</button>
          </div>
          {currentWorkout.exercises.map((exercise, idx) => (
            <div key={idx} style={{ marginBottom: '10px' }}>
              <strong>{exercise.name}</strong> - {exercise.sets.length} sets recorded
              <button className="bg-pink-300 mt-2 mb-2 ml-2 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setAddingSetToExerciseIndex(idx)}>
                Add Sets
              </button>
              {addingSetToExerciseIndex === idx && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="number"
                    placeholder="Weight (lbs)"
                    value={newSet.weight === 0 ? '' : newSet.weight}
                    onChange={(e) => handleSetChange('weight', Number(e.target.value))}
                    style={{ marginRight: '10px' }}
                  />
                  <input
                    type="number"
                    placeholder="Reps"
                    value={newSet.reps === 0 ? '' : newSet.reps}
                    onChange={(e) => handleSetChange('reps', Number(e.target.value))}
                    style={{ marginRight: '10px' }}
                  />
                  <button className="bg-pink-300 mt-2 mb-2 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={addSet}>Add Set</button>
                  <button className="ml-2 bg-pink-300 mt-2 mb-2 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={resetAddingExercise}>Add Another Exercise</button>
                </div>
              )}
            </div>
          ))}
          <button className="bg-pink-300 mt-2 mb-2 hover:-translate-y-1 transition-transform duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={saveWorkout}>Save Workout</button>
        </div>
      )}
      <div>
        <h3>Recent Workouts</h3>
        {workouts.map((workout, idx) => (
          <div key={idx} style={{ marginBottom: '10px' }}>
            <strong>{workout.name}</strong>
            {workout.exercises.map((exercise, exIdx) => (
              <div key={exIdx} style={{ marginTop: '5px' }}>
                <strong onClick={() => toggleShowSets(exIdx)} style={{ cursor: 'pointer' }}>
                  {exercise.name}: {exercise.sets.length} sets
                </strong>
                {showingSetsOfExerciseIndex === exIdx && (
                  <div style={{ marginTop: '5px' }}>
                    {exercise.sets.map((set, setIdx) => (
                      <div key={setIdx}>
                        Set {setIdx + 1}: {set.weight} lbs, {set.reps} reps
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutComponent;
