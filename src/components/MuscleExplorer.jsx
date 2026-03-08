import React, { useState } from 'react';
import { Activity, ExternalLink, Crosshair, Shield, Zap, Target, Flame } from 'lucide-react';
import { exercisesData, getExercisesByMuscle } from '../context/exercisesData';

const MuscleExplorer = () => {
    const [activeMuscle, setActiveMuscle] = useState(null);
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchExercises = async (muscleId) => {
        setActiveMuscle(muscleId);
        setLoading(true);

        try {
            const res = getExercisesByMuscle(muscleId);
            setExercises(res || []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setExercises([]);
            setLoading(false);
        }
    };

    // Helper for tactical button styling
    const getBtnStyle = (id) => {
        const isActive = activeMuscle === id;
        return `flex items-center justify-between w-full px-4 py-3 rounded-xl border transition-all duration-300 ${
            isActive 
                ? 'bg-neon-blue/10 border-neon-blue text-neon-blue shadow-[0_0_15px_rgba(0,212,255,0.2)]' 
                : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:border-slate-500 hover:bg-slate-700/50'
        }`;
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Left Panel: Tactical Control Board */}
                <div className="flex flex-col h-full bg-slate-900/50 rounded-2xl border border-slate-700/50 p-6 shadow-inner">
                    <div className="flex items-center mb-6">
                        <Crosshair className="w-5 h-5 text-slate-500 mr-2" />
                        <h4 className="text-sm uppercase tracking-widest text-slate-400 font-semibold">
                            Select Target Vector
                        </h4>
                    </div>

                    {/* Muscle Selection Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button onClick={() => fetchExercises('pectorals')} className={getBtnStyle('pectorals')}>
                            <span className="font-medium">Pectorals</span>
                            <Shield className={`w-4 h-4 ${activeMuscle === 'pectorals' ? 'opacity-100' : 'opacity-50'}`} />
                        </button>

                        <button onClick={() => fetchExercises('latissimus')} className={getBtnStyle('latissimus')}>
                            <span className="font-medium">Latissimus</span>
                            <Target className={`w-4 h-4 ${activeMuscle === 'latissimus' ? 'opacity-100' : 'opacity-50'}`} />
                        </button>

                        <button onClick={() => fetchExercises('quadriceps')} className={getBtnStyle('quadriceps')}>
                            <span className="font-medium">Quadriceps</span>
                            <Zap className={`w-4 h-4 ${activeMuscle === 'quadriceps' ? 'opacity-100' : 'opacity-50'}`} />
                        </button>

                        <button onClick={() => fetchExercises('biceps')} className={getBtnStyle('biceps')}>
                            <span className="font-medium">Arms</span>
                            <Activity className={`w-4 h-4 ${activeMuscle === 'biceps' ? 'opacity-100' : 'opacity-50'}`} />
                        </button>

                        <button onClick={() => fetchExercises('deltoids')} className={getBtnStyle('deltoids')}>
                            <span className="font-medium">Deltoids</span>
                            <Target className={`w-4 h-4 ${activeMuscle === 'deltoids' ? 'opacity-100' : 'opacity-50'}`} />
                        </button>

                        <button onClick={() => fetchExercises('abdominals')} className={getBtnStyle('abdominals')}>
                            <span className="font-medium">Core</span>
                            <Flame className={`w-4 h-4 ${activeMuscle === 'abdominals' ? 'opacity-100' : 'opacity-50'}`} />
                        </button>
                    </div>
                </div>

                {/* Right Panel: Query Results Terminal */}
                <div className="flex flex-col h-full min-h-[24rem] bg-black/40 rounded-2xl border border-slate-800 p-6 relative overflow-hidden">
                    {/* Decorative grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                    
                    <div className="relative z-10 h-full flex flex-col">
                        {loading ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-neon-blue space-y-4">
                                <Activity className="w-10 h-10 animate-spin" />
                                <span className="text-sm uppercase tracking-widest font-semibold animate-pulse">Scanning Database...</span>
                            </div>
                        ) : activeMuscle && exercises.length > 0 ? (
                            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                <h4 className="text-neon-green font-bold uppercase tracking-wider text-sm border-b border-slate-800 pb-2 mb-4 sticky top-0 bg-slate-950/80 backdrop-blur-sm">
                                    Identified Movements: <span className="text-white">{activeMuscle}</span>
                                </h4>
                                
                                <div className="space-y-3">
                                    {exercises.map((ex) => (
                                        <a
                                            key={ex.id}
                                            href={ex.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex justify-between items-center p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-neon-blue/50 hover:bg-slate-800/80 transition-all"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700 group-hover:border-neon-blue transition-colors">
                                                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-neon-blue" />
                                                </div>
                                                <div>
                                                    <span className="block font-semibold text-slate-200 group-hover:text-white transition-colors">
                                                        {ex.name}
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-slate-400 group-hover:border-neon-blue/30 group-hover:text-neon-blue">
                                                {ex.type}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ) : activeMuscle ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-2">
                                <Shield className="w-8 h-8 opacity-20" />
                                <p className="text-sm uppercase tracking-wider">No structural data found.</p>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 space-y-4">
                                <Crosshair className="w-12 h-12 opacity-20" />
                                <p className="text-sm uppercase tracking-widest">Awaiting target selection...</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MuscleExplorer;