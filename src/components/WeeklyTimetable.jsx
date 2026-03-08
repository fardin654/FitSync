import React, { useState, useEffect } from 'react';
import { ChevronRight, Edit2, Check, Plus, Trash2, Save, Loader2, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Ensure this provides a user object with a uid
import { db } from '../firebase';
import { doc, setDoc, arrayUnion, onSnapshot } from 'firebase/firestore';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const defaultRoutine = {
    Mon: { title: 'Chest & Triceps', exercises: ['Bench Press', 'Incline Dumbbell'] },
    Tue: { title: 'Legs', exercises: ['Squat', 'Leg Press'] },
    Wed: { title: 'Rest / Recovery', exercises: ['Rest'] },
    Thu: { title: 'Back & Biceps', exercises: ['Deadlift', 'Pullups'] },
    Fri: { title: 'Shoulders', exercises: ['Overhead Press', 'Lateral Raises'] },
    Sat: { title: 'Rest / Recovery', exercises: ['Rest'] },
    Sun: { title: 'Active Recovery', exercises: ['Cardio'] }
};

const WeeklyTimetable = () => {
    const { currentUser } = useAuth();
    const [routine, setRoutine] = useState(null);
    const [activeDay, setActiveDay] = useState('Mon');
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // DB state
    const [loadingDb, setLoadingDb] = useState(true);
    const [saving, setSaving] = useState(false);

    // For editing state of the active day
    const [editTitle, setEditTitle] = useState('');
    const [editExercises, setEditExercises] = useState([]);
    const [newExerciseInput, setNewExerciseInput] = useState('');

    const [prs, setPrs] = useState({});
    const [isEditingPr, setIsEditingPr] = useState(false);
    const [editPrValue, setEditPrValue] = useState("");

    // Fetch existing routine and PRs on mount with realtime updates
    useEffect(() => {
        // If there's no user logged in, stop loading and return early
        if (!currentUser) {
            setLoadingDb(false);
            return;
        }

        // Target the specific user's document using their unique Auth UID
        const docRef = doc(db, "users", currentUser.uid);

        const unsubscribe = onSnapshot(docRef, async (docSnap) => {
            if (docSnap.exists() && docSnap.data().routine) {
                const data = docSnap.data();
                setRoutine(data.routine);
                if (data.prs) setPrs(data.prs);
            } else {
                // IMPORTANT: If the user document doesn't exist yet (or has no routine), create it with the default routine.
                // This ensures every new user gets a fresh, unique copy of the default timetable in the DB.
                try {
                    await setDoc(docRef, { routine: defaultRoutine, prs: {} }, { merge: true });
                } catch (err) {
                    console.error("Error creating initial user doc:", err);
                }
            }
            setLoadingDb(false);
        }, (err) => {
            console.error("Error fetching data:", err);
            setLoadingDb(false);
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, [currentUser]);

    const handleExerciseClick = (ex) => {
        if (!isEditing) {
            setSelectedExercise(ex);
            setIsEditingPr(false);
        }
    };

    const startEditing = () => {
        setEditTitle(routine[activeDay].title);
        setEditExercises([...routine[activeDay].exercises]);
        setIsEditing(true);
        setSelectedExercise(null);
        setIsEditingPr(false);
    };

    const saveEditing = async () => {
        let finalExercises = [...editExercises];

        // If the user typed an exercise but clicked 'Save' without clicking '+', automatically include it.
        if (newExerciseInput.trim() !== '') {
            finalExercises.push(newExerciseInput.trim());
            setNewExerciseInput('');
        }

        const updatedRoutine = {
            ...routine,
            [activeDay]: {
                title: editTitle,
                exercises: finalExercises.length > 0 ? finalExercises : ['Rest']
            }
        };

        // Update local state immediately for snappy UI
        setRoutine(updatedRoutine);
        setIsEditing(false);

        // Save uniquely to THIS user's database document
        if (currentUser) {
            setSaving(true);
            try {
                const userRef = doc(db, "users", currentUser.uid);
                await setDoc(userRef, { routine: updatedRoutine }, { merge: true });
            } catch (err) {
                console.error("Error saving routine to Firestore:", err);
            } finally {
                setSaving(false);
            }
        }
    };

    const savePr = async () => {
        if (!currentUser || !selectedExercise || editPrValue.trim() === '') return;

        const numericVal = parseInt(editPrValue, 10);
        if (isNaN(numericVal)) return;

        const updatedPrs = {
            ...prs,
            [selectedExercise]: numericVal
        };

        setPrs(updatedPrs);
        setIsEditingPr(false);

        setSaving(true);
        try {
            const userRef = doc(db, "users", currentUser.uid);
            const newHistoryEntry = {
                date: new Date().toISOString(),
                exercise: selectedExercise,
                weight: numericVal
            };

            // Save uniquely to THIS user's document
            await setDoc(userRef, {
                prs: updatedPrs,
                prHistory: arrayUnion(newHistoryEntry)
            }, { merge: true });
        } catch (err) {
            console.error("Error saving PR to Firestore:", err);
        } finally {
            setSaving(false);
        }
    };

    const addExercise = () => {
        if (newExerciseInput.trim() !== '') {
            setEditExercises([...editExercises, newExerciseInput.trim()]);
            setNewExerciseInput('');
        }
    };

    const removeExercise = (indexToRemove) => {
        setEditExercises(editExercises.filter((_, idx) => idx !== indexToRemove));
    };

    const changeDay = (day) => {
        if (isEditing) return;
        setActiveDay(day);
        setSelectedExercise(null);
        setIsEditingPr(false);
    };

    if (loadingDb || !routine) {
        return (
            <div className="p-8 flex items-center justify-center text-slate-400">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Fetching Secure Timetable...
            </div>
        );
    }

    // If there's no user logged in, prompt them to log in instead of breaking
    if (!currentUser) {
        return (
            <div className="p-8 text-center text-slate-400">
                Please log in to view and edit your custom timetable.
            </div>
        );
    }

    return (
        <div className="w-full relative">
            {saving && (
                <div className="absolute -top-8 right-0 text-neon-green text-sm flex items-center animate-pulse">
                    <Check className="w-4 h-4 mr-1" /> Saving to Cloud...
                </div>
            )}
            <div className="flex justify-between items-center mb-6 overflow-x-auto days-scrollbar">
                {days.map(day => (
                    <button
                        key={day}
                        onClick={() => changeDay(day)}
                        className={`px-4 py-2 mx-1 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeDay === day
                            ? 'bg-neon-blue text-slate-900 shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            } ${isEditing && activeDay !== day ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isEditing && activeDay !== day}
                    >
                        {day}
                    </button>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Daily Schedule */}
                <div className="w-full md:w-1/2 glass-panel p-6 shadow-xl relative overflow-hidden bg-slate-900 rounded-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-bl-[100px] pointer-events-none" />
                    <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-4 relative z-10">
                        {isEditing ? (
                            <input
                                type="text"
                                className="bg-slate-800/80 text-white font-bold text-xl px-3 py-2 rounded-lg w-full mr-3 focus:outline-none focus:ring-2 focus:ring-neon-blue border border-slate-600 transition-shadow"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Day Title..."
                            />
                        ) : (
                            <div className="flex flex-col">
                                <span className="text-xs text-neon-blue font-bold uppercase tracking-[0.2em] mb-1">{activeDay}</span>
                                <h3 className="text-2xl font-black text-white">
                                    {routine[activeDay].title}
                                </h3>
                            </div>
                        )}

                        {isEditing ? (
                            <button onClick={saveEditing} className="p-2.5 bg-neon-green/20 text-neon-green rounded-lg hover:bg-neon-green/30 transition-all shadow-[0_0_10px_rgba(74,222,128,0.2)]" title="Confirm Save">
                                <Save className="w-5 h-5" />
                            </button>
                        ) : (
                            <button onClick={startEditing} className="p-2.5 bg-slate-800 text-slate-400 rounded-lg hover:text-neon-blue hover:bg-slate-700/80 transition-all" title="Edit Schedule">
                                <Edit2 className="w-5 h-5" />
                            </button>
                        )}
                    </div>

                    <div className="space-y-3 relative z-10">
                        {isEditing ? (
                            <>
                                {editExercises.map((exercise, idx) => (
                                    <div key={idx} className="w-full px-4 py-3 rounded-lg border border-slate-600/50 bg-slate-800/80 flex justify-between items-center group">
                                        <span className="font-medium text-slate-100">{exercise}</span>
                                        <button onClick={() => removeExercise(idx)} className="text-slate-500 hover:text-red-400 opacity-70 group-hover:opacity-100 transition-all">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                                <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-700/50">
                                    <input
                                        type="text"
                                        placeholder="Add new movement..."
                                        className="flex-1 bg-slate-800/50 text-white px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon-blue border border-slate-600/50 transition-all"
                                        value={newExerciseInput}
                                        onChange={(e) => setNewExerciseInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addExercise()}
                                    />
                                    <button onClick={addExercise} className="p-2.5 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-all">
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            routine[activeDay].exercises.map((exercise, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleExerciseClick(exercise)}
                                    className={`w-full text-left px-5 py-3.5 rounded-xl border transition-all flex justify-between items-center shadow-sm
                                        ${exercise === 'Rest' || exercise === 'Cardio' || exercise.includes('Rest')
                                            ? 'border-slate-800 bg-slate-800/30 cursor-default text-slate-500'
                                            : selectedExercise === exercise
                                                ? 'border-neon-green/50 bg-neon-green/10 text-white shadow-[0_0_15px_rgba(74,222,128,0.1)]'
                                                : 'border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-700/50 text-slate-300 hover:text-white'
                                        }`}
                                    disabled={exercise === 'Rest' || exercise === 'Cardio' || exercise.includes('Rest')}
                                >
                                    <span className="font-semibold tracking-wide">
                                        {exercise}
                                        {(!exercise.includes('Rest') && exercise !== 'Cardio' && prs[exercise]) && (
                                            <span className="ml-2 text-neon-blue font-bold"> - {prs[exercise]} kgs</span>
                                        )}
                                    </span>
                                    {(!exercise.includes('Rest') && exercise !== 'Cardio') &&
                                        <ChevronRight className={`w-5 h-5 ${selectedExercise === exercise ? 'text-neon-green' : 'text-slate-500'}`} />
                                    }
                                </button>
                            ))
                        )}
                    </div>
                </div>

                {/* Target Viewer */}
                <div className="w-full md:w-1/2 glass-panel bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col justify-center min-h-[350px] relative overflow-hidden shadow-xl border-t border-l border-slate-700/50 rounded-2xl">
                    {isEditing ? (
                        <div className="text-center text-slate-500 p-8 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                            <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 border border-slate-700">
                                <Edit2 className="w-8 h-8 text-slate-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-300 mb-2">Edit Mode Active</h3>
                            <p className="text-slate-400 max-w-xs leading-relaxed">Modify your {activeDay} schedule carefully. Changes will be synced across all devices.</p>
                        </div>
                    ) : selectedExercise ? (
                            <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-500 p-8 relative z-10 w-full h-full flex flex-col items-center justify-center">

                                <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-3">Target Objective</h4>
                                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-8 drop-shadow-md">
                                    {selectedExercise}
                                </h2>

                                {isEditingPr ? (
                                    // EDIT MODE
                                    <div className="flex flex-col items-center w-full max-w-xs">
                                        {/* Input Box shaped identically to Display Box */}
                                        <div className="inline-flex items-baseline px-8 py-5 bg-slate-900/80 rounded-3xl border border-neon-blue/50 shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 w-48 justify-center relative">
                                            <input    
                                                type="number"
                                                className="w-24 text-center bg-transparent text-white font-black text-4xl p-0 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                value={editPrValue}
                                                onChange={(e) => setEditPrValue(e.target.value)}
                                                autoFocus
                                                onKeyDown={(e) => e.key === 'Enter' && savePr()}
                                            />
                                            <span className="text-xl font-bold text-slate-500 ml-2">kgs</span>
                                        </div>
                                        
                                        {/* Buttons placed in the exact same footprint as the view-mode text */}
                                        <div className="mt-8 pt-6 border-t border-slate-800/50 w-full flex justify-center space-x-2 min-h-[72px] items-center"> 
                                            <button onClick={savePr} className="px-6 py-2 bg-neon-green/20 text-neon-green font-bold rounded-lg hover:bg-neon-green hover:text-slate-900 transition-all">Save</button>
                                            <button onClick={() => setIsEditingPr(false)} className="px-6 py-2 bg-slate-800 text-slate-400 font-bold rounded-lg hover:bg-slate-700 transition-all">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    // VIEW MODE
                                    <div className="group relative cursor-pointer flex flex-col items-center w-full max-w-xs" onClick={() => {
                                        setEditPrValue(prs[selectedExercise] ? prs[selectedExercise].toString() : "0");
                                        setIsEditingPr(true);
                                    }}>
                                        {/* Display Box */}
                                        <div className="inline-flex items-baseline px-8 py-5 bg-slate-900/80 rounded-3xl border border-slate-700 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] group-hover:border-neon-blue/50 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] transition-all duration-300 w-48 justify-center relative">
                                            <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400">
                                                {prs[selectedExercise] || "0"}
                                            </span>
                                            <span className="text-xl font-bold text-slate-500 ml-2">kgs</span>

                                            <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                <Edit2 className="w-4 h-4 text-neon-blue" />
                                            </div>
                                        </div>
                                        
                                        {/* Text placed in the exact same footprint as the edit-mode buttons */}
                                        <div className="mt-8 pt-6 border-t border-slate-800/50 w-full min-h-[72px] flex items-center justify-center">
                                            <p className="text-sm text-slate-400 font-medium leading-tight">Click the weight above to update your Max Capacity constraint.</p>
                                        </div>
                                    </div>
                                )}

                            </div>
                    ) : (
                        <div className="text-center text-slate-500 p-8 flex flex-col items-center justify-center h-full">
                            <div className="w-16 h-16 rounded-full bg-slate-800/30 flex items-center justify-center mb-6">
                                <Activity className="w-8 h-8 text-slate-600 opacity-50" />
                            </div>
                            <p className="text-lg font-medium text-slate-400">System Standby</p>
                            <p className="text-sm mt-2 max-w-[200px] leading-relaxed">Select a kinetic movement to analyze force requirements.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default WeeklyTimetable;