import React from 'react';
import MuscleExplorer from '../components/MuscleExplorer';

const ExerciseSuggestions = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Targeting Systems</h2>
                    <span className="text-xs text-slate-500 uppercase tracking-widest border border-slate-700 px-3 py-1 rounded-full">Explore</span>
                </div>
                <p className="text-slate-400">Select a muscle group to discover targeted exercises and training recommendations.</p>
            </div>

            {/* Exercise Explorer Panel */}
            <div className="glass-panel p-6 border-t border-slate-700/50 pt-8">
                <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
                    <MuscleExplorer />
                </div>
            </div>
        </div>
    );
};

export default ExerciseSuggestions;
