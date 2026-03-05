import React, { useState } from 'react';
import { Activity, ExternalLink } from 'lucide-react';
import { exercisesData, getExercisesByMuscle } from '../context/exercisesData';

// Basic structural representation of human anatomy for click targets
// In a full prod version, SVG paths are highly detailed.
const MuscleExplorer = () => {
    const [activeMuscle, setActiveMuscle] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchExercises = async (muscleId) => {
        setActiveMuscle(muscleId);
        setLoading(true);

        try {
            // Endpoint from Express backend
            const res = getExercisesByMuscle(muscleId);
            setExercises(res);
        } catch (err) {
            console.error(err);
            setExercises([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full text-center">

            {/* Interactive SVG "Map" Map Placeholder */}
            <div className="relative w-64 min-h-[24rem] h-auto border-2 border-slate-700 rounded-3xl mb-8 flex flex-col items-center p-4 pb-6 bg-slate-800/50 shadow-inner">

                <h4 className="text-sm uppercase tracking-widest text-slate-500 mb-6">Select Target</h4>

                {/* Mock "Hotspots" */}
                <div className="space-y-4 w-full">
                    <button
                        onClick={() => fetchExercises('pectorals')}
                        className={`w-full py-2 rounded border transition-colors ${activeMuscle === 'chest' ? 'bg-neon-blue/20 border-neon-blue text-neon-blue' : 'border-slate-600 hover:border-slate-400'}`}
                    >
                        Pectorals (Chest)
                    </button>

                    <button
                        onClick={() => fetchExercises('latissimus')}
                        className={`w-full py-2 rounded border transition-colors ${activeMuscle === 'back' ? 'bg-neon-blue/20 border-neon-blue text-neon-blue' : 'border-slate-600 hover:border-slate-400'}`}
                    >
                        Latissimus (Back)
                    </button>

                    <button
                        onClick={() => fetchExercises('quadriceps')}
                        className={`w-full py-2 rounded border transition-colors ${activeMuscle === 'legs' ? 'bg-neon-blue/20 border-neon-blue text-neon-blue' : 'border-slate-600 hover:border-slate-400'}`}
                    >
                        Quadriceps (Legs)
                    </button>

                    <button
                        onClick={() => fetchExercises('biceps')}
                        className={`w-full py-2 rounded border transition-colors ${activeMuscle === 'arms' ? 'bg-neon-blue/20 border-neon-blue text-neon-blue' : 'border-slate-600 hover:border-slate-400'}`}
                    >
                        Biceps / Triceps
                    </button>

                    <button
                        onClick={() => fetchExercises('deltoids')}
                        className={`w-full py-2 rounded border transition-colors ${activeMuscle === 'shoulders' ? 'bg-neon-blue/20 border-neon-blue text-neon-blue' : 'border-slate-600 hover:border-slate-400'}`}
                    >
                        Deltoids (Shoulders)
                    </button>

                    <button
                        onClick={() => fetchExercises('abdominals')}
                        className={`w-full py-2 rounded border transition-colors ${activeMuscle === 'core' ? 'bg-neon-blue/20 border-neon-blue text-neon-blue' : 'border-slate-600 hover:border-slate-400'}`}
                    >
                        Abdominals (Core)
                    </button>
                </div>
            </div>

            {/* Query Results */}
            <div className="w-full min-h-32 text-left">
                {loading ? (
                    <div className="flex items-center justify-center space-x-2 text-neon-blue">
                        <Activity className="w-5 h-5 animate-spin" />
                        <span>Scanning Database...</span>
                    </div>
                ) : activeMuscle && exercises.length > 0 ? (
                    <div className="space-y-2">
                        <h4 className="text-neon-green font-semibold capitalize mb-3">
                            Identified {activeMuscle} Movements:
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                            {exercises.map((ex) => (
                                <a
                                    key={ex.id}
                                    href={ex.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-panel px-4 py-3 border border-slate-600/50 hover:border-neon-blue/50 flex justify-between items-center group transition-all"
                                >
                                    <span className="font-medium text-slate-200 group-hover:text-neon-blue transition-colors flex items-center">
                                        <ExternalLink className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {ex.name}
                                    </span>
                                    <span className="text-xs px-2 py-1 bg-slate-800 rounded-full text-slate-400 group-hover:bg-slate-700">{ex.type}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                ) : activeMuscle ? (
                    <p className="text-slate-500 italic text-center">No structural data found for {activeMuscle}.</p>
                ) : (
                    <p className="text-slate-500 italic text-center">Awaiting muscle group selection...</p>
                )}
            </div>

        </div>
    );
};

export default MuscleExplorer;
