import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import PRMonitor from '../components/PRMonitor';
import WeeklyTimetable from '../components/WeeklyTimetable';
import MuscleExplorer from '../components/MuscleExplorer';
import { LogOut, UserCircle2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Dashboard = () => {
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    const [prs, setPrs] = useState({});
    const [prHistory, setPrHistory] = useState([]);

    useEffect(() => {
        if (!currentUser) return;

        const docRef = doc(db, 'users', currentUser.uid);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.prs) setPrs(data.prs);
                if (data.prHistory) setPrHistory(data.prHistory);
            }
        });

        return () => unsubscribe();
    }, [currentUser]);

    const topBench = prs['Bench Press'] || 0;
    const topSquat = prs['Squat'] || 0;
    const topDeadlift = prs['Deadlift'] || 0;

    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4 py-8 relative">

            {/* Dashboard Header */}
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-700/50">
                <div>
                    <h1 className="text-3xl font-extrabold text-white">
                        Commander <span className="text-neon-blue">{currentUser?.displayName || 'Athlete'}</span>
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Global PR tracking system online.</p>
                </div>

                <div className="flex items-center space-x-4">
                    {currentUser?.photoURL ? (
                        <img
                            src={currentUser.photoURL}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-neon-blue object-cover"
                            referrerPolicy="no-referrer"
                        />
                    ) : (
                        <UserCircle2 className="w-10 h-10 text-slate-400" />
                    )}
                    <button
                        onClick={handleLogout}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        title="Disconnect"
                    >
                        <LogOut className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Progression Graph */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-6">
                        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Hypertrophy Trends</h2>
                        <PRMonitor history={prHistory} />
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="glass-panel p-4 flex flex-col justify-center items-center border-neon-blue/20">
                            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Top Bench</span>
                            <span className="text-3xl font-black text-neon-blue">{topBench} <span className="text-lg font-normal text-slate-500">kgs</span></span>
                        </div>
                        <div className="glass-panel p-4 flex flex-col justify-center items-center border-neon-green/20">
                            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Top Squat</span>
                            <span className="text-3xl font-black text-neon-green">{topSquat} <span className="text-lg font-normal text-slate-500">kgs</span></span>
                        </div>
                        <div className="glass-panel p-4 flex flex-col justify-center items-center border-indigo-400/20">
                            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Top Deadlift</span>
                            <span className="text-3xl font-black text-indigo-400">{topDeadlift} <span className="text-lg font-normal text-slate-500">kgs</span></span>
                        </div>
                    </div>
                </div>

                {/* Timetable Panel */}
                <div className="lg:col-span-1 border-l border-slate-800 lg:pl-8 space-y-8">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Directive</h2>
                        <WeeklyTimetable />
                    </div>
                </div>
            </div>

            {/* Exercise Targeting Tool - Full Width Bottom */}
            <div className="mt-8 glass-panel p-6 border-t border-slate-700/50 pt-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-white uppercase tracking-wider">Targeting Systems</h2>
                    <span className="text-xs text-slate-500 uppercase tracking-widest border border-slate-700 px-3 py-1 rounded-full">Explore</span>
                </div>
                <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
                    <MuscleExplorer />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
