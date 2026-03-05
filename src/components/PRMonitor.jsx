import React, { useMemo } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { Activity } from 'lucide-react';

const CHART_COLORS = ['#38BDF8', '#4ADE80', '#818CF8', '#F472B6', '#FBBF24', '#A78BFA', '#34D399'];

const PRMonitor = ({ history = [] }) => {

    const { chartData, uniqueExercises } = useMemo(() => {
        if (!history || history.length === 0) return { chartData: [], uniqueExercises: [] };

        // Sort ascending by ISO date
        const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));

        const exercisesSet = new Set();
        const grouped = {};

        sorted.forEach(entry => {
            exercisesSet.add(entry.exercise);

            // Group by formatted Short Date (e.g. Mar 05)
            const d = new Date(entry.date);
            const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            if (!grouped[dateStr]) grouped[dateStr] = { date: dateStr };

            // Keeps the newest PR weight for that particular day
            grouped[dateStr][entry.exercise] = entry.weight;
        });

        return {
            chartData: Object.values(grouped),
            uniqueExercises: Array.from(exercisesSet)
        };
    }, [history]);

    if (!history || history.length === 0) {
        return (
            <div className="w-full h-80 bg-slate-800/30 p-4 rounded-xl shadow-inner flex flex-col items-center justify-center border border-slate-700/50">
                <Activity className="w-10 h-10 text-slate-600 mb-4" />
                <p className="text-slate-400 font-medium">Awaiting PR Transmissions</p>
                <p className="text-sm text-slate-500 mt-2">Log a Target PR in your Directive to generate progression charts.</p>
            </div>
        );
    }

    return (
        <div className="w-full h-80 bg-slate-800/50 p-4 rounded-xl shadow-inner relative">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                        itemStyle={{ color: '#e2e8f0' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />

                    {uniqueExercises.map((ex, index) => (
                        <Line
                            key={ex}
                            type="monotone"
                            dataKey={ex}
                            name={ex}
                            stroke={CHART_COLORS[index % CHART_COLORS.length]}
                            strokeWidth={3}
                            activeDot={{ r: 8 }}
                            connectNulls={true}
                        />
                    ))}

                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PRMonitor;
