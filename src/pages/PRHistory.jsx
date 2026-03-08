import React, { useState, useEffect, use } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { TrendingUp, Calendar, Dumbbell } from 'lucide-react';

const PRHistory = () => {
    const { currentUser } = useAuth();
    const [prHistory, setPrHistory] = useState([]);
    const [prs, setPrs] = useState({});
    const [filteredHistory, setFilteredHistory] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        const docRef = doc(db, 'users', currentUser.uid);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.prHistory) setPrHistory(data.prHistory);
                if (data.prs) setPrs(data.prs);
            }
        });

        return () => unsubscribe();
    }, [currentUser]);

    // Get unique exercises
    const uniqueExercises = [...new Set(prHistory.map(entry => entry.exercise))];

    // Filter history based on selected exercise
    useEffect(() => {
        if (selectedExercise) {
            setFilteredHistory(
                prHistory
                    .filter(entry => entry.exercise === selectedExercise)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
            );
        } else {
            const sortedHistory = prHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
            const uniqueByExercise = new Map(sortedHistory.map(item => [item.exercise, item]));
            setFilteredHistory(Array.from(uniqueByExercise.values()));
        }
    }, [selectedExercise, prHistory]);

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getMaxPR = (exercise) => {
        const exerciseEntries = prHistory.filter(e => e.exercise === exercise);
        if (exerciseEntries.length === 0) return 0;
        return Math.max(...exerciseEntries.map(e => e.weight));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Personal Records History</h2>
                    <span className="text-xs text-slate-500 uppercase tracking-widest border border-slate-700 px-3 py-1 rounded-full">Records</span>
                </div>
                <p className="text-slate-400">Track your personal record progression over time.</p>
            </div>

            {/* Exercise Filter Buttons */}
            {uniqueExercises.length > 0 && (
                <div className="glass-panel p-4">
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-3">Filter by Exercise</p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setSelectedExercise(null)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                selectedExercise === null
                                    ? 'bg-neon-blue text-slate-900'
                                    : 'text-slate-400 border border-slate-700 hover:border-slate-500'
                            }`}
                        >
                            All Exercises
                        </button>
                        {uniqueExercises.map(exercise => (
                            <button
                                key={exercise}
                                onClick={() => setSelectedExercise(exercise)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                                    selectedExercise === exercise
                                        ? 'bg-neon-green text-slate-900'
                                        : 'text-slate-400 border border-slate-700 hover:border-slate-500'
                                }`}
                            >
                                {exercise}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* PR History Records */}
            <div className="glass-panel p-6">
                {filteredHistory.length > 0 ? (
                    <div className="space-y-3">
                        {filteredHistory.map((entry, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors"
                            >
                                <div className="flex items-center space-x-4 flex-1">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neon-blue/20">
                                        <Dumbbell className="w-5 h-5 text-neon-blue" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-white">{entry.exercise}</h4>
                                        <p className="text-sm text-slate-400 flex items-center mt-1">
                                            <Calendar className="w-3 h-3 mr-2" />
                                            {formatDate(entry.date)}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-neon-green">{entry.weight}</p>
                                    <p className="text-xs text-slate-500">kg</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-slate-500">
                        <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No PR records yet</p>
                        <p className="text-sm mt-2">Start logging your personal records from the Weekly Timetable to see them here.</p>
                    </div>
                )}
            </div>

            {/* Current PRs Summary */}
            {Object.keys(prs).length > 0 && (
                <div className="glass-panel p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2 text-neon-green" />
                        Current Maximum Lifts
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(prs).map(([exercise, weight]) => (
                            <div key={exercise} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">{exercise}</p>
                                <p className="text-3xl font-black text-neon-blue">{weight} <span className="text-sm font-normal text-slate-500">kg</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PRHistory;
