import { useState, useEffect, useMemo } from 'react';
import { STARTING_POINTS } from '../utils/plannerLogic';
import { MapPin } from 'lucide-react';

const PlannerForm = ({ onGenerate }) => {
    const [area, setArea] = useState('North');
    const [startPoint, setStartPoint] = useState('');
    const [startTime, setStartTime] = useState('16:00');
    const [endTime, setEndTime] = useState('22:00');

    // Filter starting points based on area
    const availableStartPoints = useMemo(() => {
        return Object.entries(STARTING_POINTS).filter(
            ([, point]) => point.area === area || point.area === 'All' // Removed unused 'key'
        );
    }, [area]);

    // Reset/Set default start point when area changes
    useEffect(() => {
        if (availableStartPoints.length > 0) {
            setStartPoint(availableStartPoints[0][0]);
        }
    }, [availableStartPoints]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate({ area, startPoint, startTime, endTime });
    };

    return (
        <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-2 font-cinzel whitespace-nowrap">
                <MapPin className="h-5 w-5 md:h-6 md:w-6 text-yellow-400 flex-shrink-0" />
                Customize Parikrama
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Area Selection */}
                <div>
                    <label className="block text-sm font-medium text-white/80 mb-3">Which part of Kolkata?</label>
                    <div className="flex gap-4 p-1 bg-black/20 rounded-lg">
                        {['North', 'South'].map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => setArea(opt)}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${area === opt
                                    ? 'bg-white/10 text-yellow-400 shadow-sm ring-1 ring-white/20'
                                    : 'text-white/40 hover:text-white/70'
                                    }`}
                            >
                                {opt} Kolkata
                            </button>
                        ))}
                    </div>
                </div>

                {/* Start Point */}
                <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">Starting Point</label>
                    <div className="relative">
                        <select
                            value={startPoint}
                            onChange={(e) => setStartPoint(e.target.value)}
                            className="w-full bg-white/10 border border-white/10 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-3 pr-10 appearance-none shadow-sm [&>option]:bg-gray-900"
                        >
                            {availableStartPoints.map(([key, point]) => (
                                <option key={key} value={key}>
                                    {point.label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">Start Time</label>
                        <div className="relative">
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 [color-scheme:dark]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/80 mb-2">End Time</label>
                        <div className="relative">
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5 [color-scheme:dark]"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn-liquid w-full flex items-center justify-center gap-2"
                >
                    Check My Plan
                </button>
            </form>
        </div >
    );
};

export default PlannerForm;
