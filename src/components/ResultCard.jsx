import { MapPin, Clock, Navigation } from 'lucide-react';

const ResultCard = ({ pandal, index, isFirst }) => {
    // Determine timeline line style
    const lineClass = isFirst
        ? "h-[calc(100%-2rem)] top-8"
        : "h-full -top-6";

    return (
        <div className="flex relative group">
            {/* Timeline Column */}
            <div className="w-12 flex-shrink-0 flex flex-col items-center relative mr-3">
                {/* Vertical Line */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-0.5 bg-white/20 ${lineClass} group-last:h-8`}></div>

                {/* The Dot */}
                <div className="w-4 h-4 rounded-full bg-yellow-400 border-4 border-black/50 shadow-[0_0_10px_rgba(250,204,21,0.5)] z-10 mt-1.5 relative"></div>
            </div>

            {/* Content Card */}
            <div className="flex-grow pb-10 min-w-0">
                <div className="glass-card hover:bg-white/10 transition-colors duration-300 border border-white/10 group-hover:border-yellow-400/50">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 text-xs font-bold text-yellow-400 border border-white/10">
                                    {index + 1}
                                </span>
                                <h3 className="text-xl font-bold text-white font-cinzel">{pandal.name}</h3>
                            </div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-yellow-300 border border-white/10 ml-9">
                                {pandal.area}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 ml-9 mb-4 text-sm text-white/60">
                        <div className="flex items-center gap-1.5">
                            <Navigation className="w-4 h-4 text-yellow-400" />
                            <span>{pandal.distance.toFixed(1)} km</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-yellow-400" />
                            <span>{pandal.travelMinutes} min walk</span>
                        </div>
                        <div className="w-full basis-full h-0"></div> {/* Line break */}
                        <div className="flex items-center gap-1.5 text-yellow-400 font-medium">
                            <Clock className="w-4 h-4 text-yellow-400" />
                            <span>
                                {pandal.arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - {pandal.departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </span>
                        </div>
                    </div>

                    <p className="ml-9 text-white/70 text-sm leading-relaxed font-light">
                        {pandal.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
