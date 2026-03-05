import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import MuscleExplorer from '../components/MuscleExplorer';
import { Activity, ArrowRight, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
    const { login, currentUser } = useAuth();
    const navigate = useNavigate();

    const handleStartWorkout = async () => {
        if (currentUser) {
            navigate('/dashboard');
        } else {
            try {
                await login();
                navigate('/dashboard');
            } catch (error) {
                console.error("Login failed", error);
            }
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 py-8 lg:py-16">

            {/* Hero Section */}
            <div className="text-center space-y-6 max-w-3xl mb-16">
                <div className="flex items-center justify-center space-x-3 mb-4">
                    <Activity className="text-neon-green w-10 h-10" />
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                        FitSync <span className="text-neon-blue">AI</span>
                    </h1>
                </div>

                <p className="text-xl text-slate-400 font-light leading-relaxed">
                    The ultimate cyber-athletic dashboard. Track your PRs, explore muscle groups, and sync your training schedule effortlessly.
                </p>

                <div className="pt-6">
                    <button
                        onClick={handleStartWorkout}
                        className="btn-primary inline-flex items-center space-x-2 text-lg"
                    >
                        <span>Start Your Workout</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center justify-center space-x-2 text-sm text-slate-500 pt-4">
                    <ShieldCheck className="w-4 h-4 text-neon-green" />
                    <span>Secure Google Authentication</span>
                </div>
            </div>

            {/* Muscle Explorer Interface */}
            <div className="w-full flex flex-col lg:flex-row gap-8 items-start justify-center">
                <div className="w-full lg:w-1/2 glass-panel p-6 flex items-center justify-center min-h-[500px]">
                    <MuscleExplorer />
                </div>

                <div className="w-full lg:w-1/3 space-y-6">
                    <div className="glass-panel p-6 border-neon-blue/30">
                        <h3 className="text-xl font-bold text-white mb-2">Interactive Anatomy</h3>
                        <p className="text-slate-400 text-sm">
                            Click on any major muscle group on the map to instantly query targeted exercises from the FitSync AI database.
                        </p>
                    </div>

                    <div className="glass-panel p-6 border-neon-green/30">
                        <h3 className="text-xl font-bold text-white mb-2">PR Tracking</h3>
                        <p className="text-slate-400 text-sm">
                            Log your heaviest lifts and watch your power output trend upwards on your personalized Dashboard.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;
