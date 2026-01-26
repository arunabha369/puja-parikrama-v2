import { MapPin, Clock, Navigation } from 'lucide-react';

const ResultCard = ({ pandal, index, isFirst }) => {
    const formatTime = (dateObj) => {
        if (!dateObj) return '--:--';
        return dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-shadow duration-300 mb-4 relative">
            {/* Connector Line */}
            {!isFirst && (
                <div className="absolute top-0 left-8 -mt-6 h-6 w-0.5 bg-orange-200 z-0"></div>
            )}

            <div className="p-5 flex gap-4">
                <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold border-2 border-orange-200 z-10">
                        {index + 1}
                    </div>
                    {/* Travel Line */}
                    <div className="flex-grow w-0.5 bg-dashed border-l-2 border-orange-200 border-dotted my-2"></div>
                </div>

                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{pandal.name}</h3>
                        <span className="bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-full border border-orange-100">
                            {pandal.area}
                        </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pandal.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <Clock className="w-4 h-4 text-orange-500" />
                            <span>
                                {formatTime(pandal.arrivalTime)} - {formatTime(pandal.departureTime)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg">
                            <Navigation className="w-4 h-4 text-blue-500" />
                            <span>{pandal.distance.toFixed(1)} km walk</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg col-span-2 md:col-span-1">
                            <MapPin className="w-4 h-4 text-red-500" />
                            <a
                                href={`https://www.google.com/maps?q=${pandal.lat},${pandal.lon}`}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-orange-600 hover:underline transition-colors"
                            >
                                View on Map
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
