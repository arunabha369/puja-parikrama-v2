import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { usePuja } from '../context/PujaContext';
import { PANDAL_DATA } from '../utils/plannerLogic';
import { ArrowLeft, MapPin, Share2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const PandalDetails = () => {
    const { slug } = useParams();
    const { currentTheme } = usePuja();

    const pandal = useMemo(() => {
        return PANDAL_DATA.find(p => p.slug === slug);
    }, [slug]);

    if (!pandal) {
        return <Navigate to="/temples" replace />;
    }

    return (
        <div className="relative z-10 min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>{pandal.name} | {currentTheme.name} Details</title>
                <meta name="description" content={`Read about ${pandal.name}, a famous ${currentTheme.name} pandal in ${pandal.area}.`} />
            </Helmet>

            <div className="max-w-4xl mx-auto animate-fade-in-up">
                {/* Back Button */}
                <Link
                    to="/temples"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-yellow-400 hover:border-yellow-500/30 transition-all duration-300 mb-8 group backdrop-blur-sm"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-cinzel text-sm tracking-wide">Back to Temples</span>
                </Link>

                {/* Hero Image */}
                <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl mb-8 border border-white/10 group">
                    <img
                        src={currentTheme.image} // Using theme image as placeholder
                        alt={pandal.name}
                        className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Header Info (Moved below image) */}
                <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex flex-col gap-6">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold uppercase tracking-wider mb-3 border border-yellow-500/30 backdrop-blur-sm">
                                {pandal.district} • {pandal.area}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold text-white font-cinzel text-glow leading-tight">
                                {pandal.name}
                            </h1>
                        </div>

                        <div className="flex gap-4">
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${pandal.lat},${pandal.lon}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-110 shadow-lg shadow-yellow-500/20"
                            >
                                <MapPin className="w-5 h-5" />
                                <span>View on Map</span>
                            </a>
                            <button className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 border border-white/10 flex items-center gap-2 font-bold shadow-lg shadow-white/5">
                                <Share2 className="w-5 h-5" />
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {/* Maintainer/Details Column */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="glass-panel p-8 rounded-2xl">
                            <h2 className="text-2xl font-bold text-white mb-4 font-cinzel border-b border-white/10 pb-4">
                                About the Pandal
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none text-white/80 font-light leading-relaxed">
                                <p>{pandal.description}</p>
                                <p className="mt-4">
                                    {/* Dummy content to simulate blog length */}
                                    Experience the spiritual aura and artistic grandeur of {pandal.name}.
                                    Known for its unique theme and intricate craftsmanship, this pandal attracts thousands of visitors every year.
                                    The organizing committee has worked tirelessly to bring this vision to life, creating an immersive environment that celebrates cultural heritage and modern creativity.
                                </p>
                                <p className="mt-4">
                                    Don't miss the lighting effects at night, which transform the entire structure into a glowing masterpiece.
                                    The idol itself is created by renowned artisans, reflecting traditional styles with a contemporary touch.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Info */}
                    <div className="space-y-6">
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-lg font-bold text-white mb-4 font-cinzel">Quick Info</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-white/50">Location</span>
                                    <span className="text-white font-medium text-right">{pandal.area}</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-white/50">Coordinates</span>
                                    <span className="text-white font-medium text-right">{pandal.lat.toFixed(4)}, {pandal.lon.toFixed(4)}</span>
                                </li>
                                <li className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <span className="text-white/50">Entry Fee</span>
                                    <span className="text-white font-medium text-right">Free</span>
                                </li>
                                <li className="flex justify-between items-center">
                                    <span className="text-white/50">Best Time</span>
                                    <span className="text-white font-medium text-right">Evening / Night</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PandalDetails;
