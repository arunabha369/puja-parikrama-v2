import React, { useState } from 'react';
import { usePuja } from '../context/PujaContext';
import { PANDAL_DATA } from '../utils/plannerLogic';
import { Navigate, Link } from 'react-router-dom';
import { MapPin, Info, Search } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Temples = () => {
    const { selectedPuja, currentTheme } = usePuja();
    const [searchQuery, setSearchQuery] = useState('');

    // Redirect if no puja selected
    if (!selectedPuja) {
        return <Navigate to="/select-puja?mode=view" replace />;
    }

    // Filter pandals based on search query
    const filteredPandals = PANDAL_DATA.filter(pandal => {
        const query = searchQuery.toLowerCase();
        return (
            pandal.name.toLowerCase().includes(query) ||
            pandal.description.toLowerCase().includes(query) ||
            pandal.district.toLowerCase().includes(query) ||
            pandal.area.toLowerCase().includes(query)
        );
    });

    return (
        <div className="relative z-10 min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>View Temples | {currentTheme.name}</title>
                <meta name="description" content={`Explore the best ${currentTheme.name} pandals in Kolkata.`} />
            </Helmet>

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-cinzel text-glow">
                        {currentTheme.name} Pandals
                    </h1>
                    <p className="text-white/80 max-w-2xl mx-auto font-light mb-8">
                        Explore the divine destinations awaiting your arrival.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-white/50 group-focus-within:text-yellow-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search pandals by name, location..."
                            className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-full leading-5 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/50 sm:text-sm backdrop-blur-md transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {filteredPandals.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPandals.map((pandal, index) => (
                            <Link
                                to={`/pandal/${pandal.slug}`}
                                key={index}
                                className="glass-card group flex flex-col h-full animate-fade-in-up hover:bg-white/10 transition-colors"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                                    {/* Using theme image as placeholder since individual images aren't in data */}
                                    <img
                                        src={currentTheme.image}
                                        alt={pandal.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <h3 className="text-xl font-bold text-white font-cinzel leading-tight group-hover:text-yellow-400 transition-colors">{pandal.name}</h3>
                                    </div>
                                </div>

                                <div className="flex-grow">
                                    <div className="flex items-start gap-2 text-white/70 mb-3 text-sm">
                                        <MapPin className="w-4 h-4 mt-1 text-yellow-400 flex-shrink-0" />
                                        <span>{pandal.district} • {pandal.area}</span>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                                        {pandal.description}
                                    </p>
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center text-xs text-white/50">
                                    <span>{pandal.lat.toFixed(4)}, {pandal.lon.toFixed(4)}</span>
                                    <span className="px-2 py-1 rounded bg-white/10 text-white group-hover:bg-yellow-500 group-hover:text-black transition-colors">{index + 1}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 animate-fade-in-up">
                        <p className="text-white/60 text-lg">No pandals found matching "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Temples;
