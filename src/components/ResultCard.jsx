import { MapPin, Clock, Navigation, Route } from 'lucide-react';

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

                {/* The Numbered Dot */}
                <div className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-black/20 shadow-[0_0_10px_rgba(250,204,21,0.5)] z-10 relative flex items-center justify-center font-bold text-black text-sm font-outfit">
                    {index + 1}
                </div>
            </div>

            {/* Content Card */}
            <div className="flex-grow pb-10 min-w-0">
                <div className="glass-card p-5 hover:bg-white/10 transition-colors duration-300 border border-white/10 group-hover:border-yellow-400/50 flex flex-col gap-1 text-left">

                    {/* 1. Area */}
                    <div className="mb-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                            {pandal.area}
                        </span>
                    </div>

                    {/* 2. Name */}
                    <h3 className="text-xl font-bold text-white font-cinzel mb-2 leading-tight">{pandal.name}</h3>

                    {/* 3, 4, 5. Stats Stack */}
                    <div className="flex flex-col gap-2 text-sm text-white/60 mb-3">
                        <div className="flex flex-wrap gap-2">
                            {/* Distance */}
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                                <Navigation className="w-3.5 h-3.5 text-yellow-500" />
                                <span>{pandal.distance.toFixed(1)} km</span>
                            </span>
                            {/* Walk Time */}
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80">
                                <Route className="w-3.5 h-3.5 text-yellow-500" />
                                <span>{pandal.travelMinutes} min walk</span>
                            </span>
                        </div>

                        {/* Time Range */}
                        <div>
                            <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-yellow-300 font-medium">
                                <Clock className="w-3.5 h-3.5 text-yellow-300" />
                                <span>
                                    {pandal.arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} - {pandal.departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* 6. Description */}
                    <p className="text-white/70 text-sm leading-relaxed font-light border-t border-white/10 pt-3 mt-1">
                        {pandal.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
