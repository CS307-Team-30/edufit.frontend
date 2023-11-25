
import React, { useState } from 'react';

type SetRecord = { weight: number; reps: number; };
type Exercise = { name: string; sets: SetRecord[]; };
type Workout = { name: string; exercises: Exercise[]; };

const PresetWorkoutsComponent: React.FC = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [editableWorkout, setEditableWorkout] = useState<Workout | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const initialWorkouts = [
    {
      name: 'Push',
      exercises: [
        { name: 'Bench Press', sets: Array(3).fill({ weight: 100, reps: 10 }) },
        { name: 'Incline Dumbbell Press', sets: Array(3).fill({ weight: undefined, reps: 10 }) },
        { name: 'Dumbbell Side Raise', sets: Array(4).fill({ weight: undefined, reps: 12 }) },
        { name: 'Dips', sets: Array(3).fill({ weight: undefined, reps: 12 }) },
        { name: 'Machine Shoulder Press', sets: Array(3).fill({ weight: undefined, reps: 12 }) },
      ]
    },
    {
      name: 'Pull',
      exercises: [
        { name: 'Lat Pulldown', sets: Array(3).fill({ weight: 100, reps: 10 }) },
        { name: 'Rope Pullover', sets: Array(3).fill({ weight: undefined, reps: 12 }) },
        { name: 'Dumbbell Row', sets: Array(3).fill({ weight: undefined, reps: 12 }) },
        { name: 'Preacher Curl', sets: Array(3).fill({ weight: undefined, reps: 12 }) },
        { name: 'Hammer Curl', sets: Array(3).fill({ weight: undefined, reps: 12 }) },
      ]
    },
    {
      name: 'Legs',
      exercises: [
        { name: 'Barbell Squat', sets: Array(5).fill({ weight: undefined, reps: 5 }) },
        { name: 'Dumbbell RDLs', sets: Array(3).fill({ weight: undefined, reps: 12 }) },
        { name: 'Bulgarian Lunges', sets: Array(3).fill({ weight: undefined, reps: 12 }) },
        { name: 'Leg Curls', sets: Array(3).fill({ weight: undefined, reps: 12 }) },
        { name: 'Leg Extensions', sets: Array(3).fill({ weight: undefined, reps: 12 }) },
        { name: 'Calf Raises', sets: Array(3).fill({ weight: undefined, reps: 12 }) },
      ]
    }
  ];
  
  const cardStyle = {
    cursor: 'pointer',
    border: '1px solid gray',
    borderRadius: '8px',
    padding: '20px',
    width: '300px',
    margin: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    textAlign: 'center',
  };

  
  const buttonStyle = {
    padding: '10px 20px',
    margin: '5px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
  };

 

  const handleWorkoutSelect = (workoutName: string) => {
    const workout = initialWorkouts.find(w => w.name === workoutName);
    if (workout) {
      setSelectedWorkout(workout);
      setEditableWorkout(JSON.parse(JSON.stringify(workout))); // Deep copy for editing
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    if (isEditing) {
      setSelectedWorkout(editableWorkout);
      setIsEditing(false);
    }
  };

  const handleSetCountChange = (exerciseIndex: number, newSetCount: number) => {
    if (editableWorkout && newSetCount > 0) {
      const updatedSets = Array(newSetCount).fill({ ...editableWorkout.exercises[exerciseIndex].sets[0] });
      const updatedExercises = [...editableWorkout.exercises];
      updatedExercises[exerciseIndex].sets = updatedSets;
      setEditableWorkout({ ...editableWorkout, exercises: updatedExercises });
    }
  };

  const handleSetRepsChange = (exerciseIndex: number, newReps: number) => {
    if (editableWorkout && newReps >= 0) {
      const updatedExercises = [...editableWorkout.exercises];
      updatedExercises[exerciseIndex].sets = updatedExercises[exerciseIndex].sets.map(set => ({ ...set, reps: Math.max(0, newReps) }));
      setEditableWorkout({ ...editableWorkout, exercises: updatedExercises });
    }
  };

  return (
    <div>
      <h2>Preset Workouts</h2>
      {!selectedWorkout ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {initialWorkouts.map((workout, index) => (
            <div key={index} onClick={() => handleWorkoutSelect(workout.name)} style={cardStyle}>
              {/* Replace with actual image URLs */}
              <img src={`path_to_${workout.name.toLowerCase()}_image.jpg`} alt={`${workout.name} Workout`} style={{ width: '100%', height: 'auto' }} />
              <p>{workout.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3>{selectedWorkout.name} Workout</h3>
          {isEditing ? (
            <div>
              {editableWorkout && editableWorkout.exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} style={cardStyle}>
                  <p>{exercise.name}</p>
                  <input 
                    type="number"
                    value={exercise.sets.length}
                    onChange={(e) => handleSetCountChange(exerciseIndex, Number(e.target.value))}
                    style={{ margin: '5px' }}
                  />
                  <span>sets of </span>
                  <input 
                    type="number"
                    value={exercise.sets[0].reps}
                    onChange={(e) => handleSetRepsChange(exerciseIndex, Number(e.target.value))}
                    style={{ margin: '5px' }}
                  />
                  <span>reps</span>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {selectedWorkout.exercises.map((exercise, index) => (
                <div key={index} style={cardStyle}>
                  <p>{exercise.name}</p>
                  <p>{exercise.sets.length} sets, {exercise.sets[0].reps} reps per set</p>
                </div>
              ))}
            </div>
          )}
          <button onClick={handleEdit} style={buttonStyle}>{isEditing ? 'Cancel Edit' : 'Edit Workout'}</button>
          <button onClick={handleSave} style={buttonStyle}>Save Workout</button>
        </div>
      )}
    </div>
  );
};

export default PresetWorkoutsComponent;











