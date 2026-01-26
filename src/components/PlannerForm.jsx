import { useState, useEffect } from 'react';
import { STARTING_POINTS } from '../utils/plannerLogic';
import { MapPin, Clock } from 'lucide-react';

const PlannerForm = ({ onGenerate }) => {
    const [area, setArea] = useState('North');
    const [startPoint, setStartPoint] = useState('');
    const [startTime, setStartTime] = useState('16:00');
    const [endTime, setEndTime] = useState('22:00');

    // Filter starting points based on area
    const availableStartPoints = Object.entries(STARTING_POINTS).filter(
        ([key, point]) => point.area === area || point.area === 'All'
    );

    // Reset/Set default start point when area changes
    useEffect(() => {
        if (availableStartPoints.length > 0) {
            setStartPoint(availableStartPoints[0][0]);
        }
    }, [area]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate({ area, startPoint, startTime, endTime });
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-orange-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-orange-600" />
                Customize Your Parikrama
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Area Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Which part of Kolkata?</label>
                    <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
                        {['North', 'South'].map((opt) => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => setArea(opt)}
                                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${area === opt
                                        ? 'bg-white text-orange-600 shadow-sm ring-1 ring-orange-200'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {opt} Kolkata
                            </button>
                        ))}
                    </div>
                </div>

                {/* Start Point */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Starting Point</label>
                    <div className="relative">
                        <select
                            value={startPoint}
                            onChange={(e) => setStartPoint(e.target.value)}
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-3 pr-10 appearance-none shadow-sm"
                        >
                            {availableStartPoints.map(([key, point]) => (
                                <option key={key} value={key}>
                                    {point.label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                        <div className="relative">
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5 pl-10"
                            />
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                        <div className="relative">
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5 pl-10"
                            />
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-orange-500/25 flex items-center justify-center gap-2"
                >
                    Check My Plan
                </button>
            </form>
        </div>
    );
};

export default PlannerForm;
