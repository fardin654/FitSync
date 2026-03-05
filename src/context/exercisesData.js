// Exercise database with proper muscle group names
export const exercisesData = [
    // Pectorals (Chest)
    { id: 1, name: 'Bench Press', muscle: 'pectorals', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=rxD321l2svE' },
    { id: 2, name: 'Incline Dumbbell Press', muscle: 'pectorals', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=8iPEnJsKmeQ' },
    { id: 3, name: 'Chest Flyes', muscle: 'pectorals', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0' },
    { id: 4, name: 'Incline Barbell Bench Press', muscle: 'pectorals', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=98HWfiRonkE' },
    { id: 5, name: 'Decline Barbell Bench Press', muscle: 'pectorals', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=LfyQBUKR8SE' },
    { id: 6, name: 'High to Low Cable Crossover', muscle: 'pectorals', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=tGXIQR89-JE' },
    { id: 7, name: 'Low to High Cable Crossover', muscle: 'pectorals', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=u5X5x1fw_SA' },
    { id: 8, name: 'Chest Dips', muscle: 'pectorals', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=yN6Q1UI_xkE' },
    { id: 9, name: 'Flat Dumbbell Press', muscle: 'pectorals', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=1V3vpcaxRYQ' },
    { id: 10, name: 'Pec Deck Machine', muscle: 'pectorals', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=g3T7LsEeDWQ' },
    
    // Latissimus (Back)
    { id: 11, name: 'Deadlift', muscle: 'latissimus', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q' },
    { id: 12, name: 'Pullups', muscle: 'latissimus', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYv0ZBE' },
    { id: 13, name: 'Lat Pulldown', muscle: 'latissimus', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=JMe-_eYTW60' },
    { id: 14, name: 'Barbell Row', muscle: 'latissimus', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=T3N-TO4reLQ' },
    { id: 15, name: 'Seated Cable Row', muscle: 'latissimus', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=qD1WZ5pSuvk' },
    { id: 16, name: 'T-Bar Row', muscle: 'latissimus', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=SbZycT7Eq58' },
    { id: 17, name: 'Dumbbell Single Arm Row', muscle: 'latissimus', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=qN54-QNO1eQ' },
    { id: 18, name: 'Face Pulls', muscle: 'latissimus', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=IeOqdw9WI90' },
    { id: 19, name: 'Back Extensions', muscle: 'latissimus', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=EBui4Bt5N7o' },
    { id: 20, name: 'Straight Arm Pulldown', muscle: 'latissimus', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=hAMcfubonDc' },
    
    // Quadriceps (Legs)
    { id: 21, name: 'Squat', muscle: 'quadriceps', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=gcNh17Ckjgg' },
    { id: 22, name: 'Leg Press', muscle: 'quadriceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7XnZY' },
    { id: 23, name: 'Leg Extensions', muscle: 'quadriceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=YGYy0ZdVJWI' },
    { id: 24, name: 'Hack Squat', muscle: 'quadriceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=0tn5K9NlCfo' },
    { id: 25, name: 'Romanian Deadlift (RDL)', muscle: 'hamstrings', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=5rIqP63yWFg' },
    { id: 26, name: 'Bulgarian Split Squat', muscle: 'quadriceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=uODWo4YqbT8' },
    { id: 27, name: 'Lying Leg Curl', muscle: 'hamstrings', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=FRy58-v0YII' },
    { id: 28, name: 'Walking Lunges', muscle: 'quadriceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=Pbmj6xPo-Hw' },
    { id: 29, name: 'Standing Calf Raises', muscle: 'calves', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=baEXLy09Ncc' },
    { id: 30, name: 'Seated Calf Raises', muscle: 'calves', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=BxfKOyI8sUg' },
    
    // Biceps/Triceps (Arms)
    { id: 31, name: 'Barbell Curl', muscle: 'biceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo' },
    { id: 32, name: 'Dumbbell Curl', muscle: 'biceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=5PL5c5lqXA0' },
    { id: 33, name: 'Tricep Extension', muscle: 'biceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=nRiJVZDpdL0' },
    { id: 34, name: 'Dips', muscle: 'biceps', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=Yk4Gm2zr8RA' },
    { id: 35, name: 'Hammer Curl', muscle: 'biceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=BRVDS6HVR9Q' },
    { id: 36, name: 'Preacher Curl', muscle: 'biceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=vngli9UR6Hw' },
    { id: 37, name: 'Incline Dumbbell Curl', muscle: 'biceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=DCe8f6vMe9A' },
    { id: 38, name: 'Triceps Pushdown', muscle: 'biceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=IKQ_bKGT3LQ' },
    { id: 39, name: 'Skullcrushers', muscle: 'biceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=dtkD5sQLFL4' },
    { id: 40, name: 'Overhead Triceps Extension', muscle: 'biceps', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=fYqswDVbJDg' },
    
    // Deltoids (Shoulders)
    { id: 41, name: 'Overhead Press', muscle: 'deltoids', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=_RlRDWO2jfg' },
    { id: 42, name: 'Lateral Raise', muscle: 'deltoids', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
    { id: 43, name: 'Face Pulls', muscle: 'deltoids', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=eIq5CB9JfKE' },
    { id: 44, name: 'Dumbbell Shoulder Press', muscle: 'deltoids', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=k6tzKisR3NY' },
    { id: 45, name: 'Arnold Press', muscle: 'deltoids', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=6K_N9AGhItQ' },
    { id: 46, name: 'Cable Lateral Raise', muscle: 'deltoids', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=f_OGBg2KxgY' },
    { id: 47, name: 'Reverse Pec Deck Fly', muscle: 'deltoids', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=-TKqxK7-ehc' },
    { id: 48, name: 'Upright Row', muscle: 'deltoids', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=jaAV-rD45I0' },
    { id: 49, name: 'Dumbbell Front Raise', muscle: 'deltoids', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=9ThlTL25DH8' },
    { id: 50, name: 'Bent-Over Reverse Dumbbell Fly', muscle: 'deltoids', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=LsT-bR_zxLo' },

    // Abdominals (Core)
    { id: 51, name: 'Crunches', muscle: 'abdominals', type: 'endurance', videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU' },
    { id: 52, name: 'Plank', muscle: 'abdominals', type: 'endurance', videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw' },
    { id: 53, name: 'Cable Woodchops', muscle: 'abdominals', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=HD8aAI-C68w' },
    { id: 54, name: 'Hanging Leg Raises', muscle: 'abdominals', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=Pr1ieGZ5atk' },
    { id: 55, name: 'Ab Wheel Rollout', muscle: 'abdominals', type: 'strength', videoUrl: 'https://www.youtube.com/watch?v=rqiTPdK1c_I' },
    { id: 56, name: 'Russian Twists', muscle: 'abdominals', type: 'endurance', videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI' },
    { id: 57, name: 'Bicycle Crunches', muscle: 'abdominals', type: 'endurance', videoUrl: 'https://www.youtube.com/watch?v=PAEo-zRSanM' },
    { id: 58, name: 'Decline Sit-ups', muscle: 'abdominals', type: 'hypertrophy', videoUrl: 'https://www.youtube.com/watch?v=QhGU5cmNZds' },
    { id: 59, name: 'Dead Bug', muscle: 'abdominals', type: 'endurance', videoUrl: 'https://www.youtube.com/watch?v=4XLEnwUr1d8' },
    { id: 60, name: 'Hollow Body Hold', muscle: 'abdominals', type: 'endurance', videoUrl: 'https://www.youtube.com/watch?v=hf00_b2sRdc' }
];

export const getExercisesByMuscle = (muscle) => {
    return exercisesData.filter(exercise => exercise.muscle === muscle);
};