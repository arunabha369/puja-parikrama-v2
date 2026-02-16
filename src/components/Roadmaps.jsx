import React from 'react';
import { usePuja } from '../context/PujaContext';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Roadmaps = () => {
    const { themes } = usePuja();

    return (
        <section id="roadmaps" className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-yellow-300 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
                        Curated Parikramas
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-cinzel text-glow">
                        6 Divine Roadmaps
                    </h2>
                    <p className="text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
                        Discover 6 distinct spiritual journeys, each meticulously crafted to guide you through the heart of Bengal's greatest festivals.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.values(themes).map((theme, index) => (
                        <Link
                            to={`/select-puja?mode=view`}
                            key={theme.id}
                            className="group relative rounded-2xl overflow-hidden glass-card transition-all duration-500 hover:-translate-y-2 block"
                            style={{
                                '--theme-color': theme.colors.primary
                            }}
                        >
                            {/* Hover Border & Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[color:var(--theme-color)] transition-colors duration-500 z-20"></div>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                                style={{
                                    boxShadow: `inset 0 0 100px ${theme.colors.primary}40, 0 0 30px ${theme.colors.primary}40`
                                }}
                            ></div>

                            {/* Background Image */}
                            <div className="absolute inset-0 z-0 h-full w-full bg-gray-900">
                                <img
                                    src={theme.image}
                                    alt={theme.name}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-end p-8 min-h-[380px]">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-4 group-hover:translate-y-0">
                                        <MapPin className="w-4 h-4 text-yellow-400" />
                                        <span className="text-xs font-bold text-yellow-400 tracking-wider uppercase">View Route</span>
                                    </div>

                                    <h3 className="text-3xl font-bold text-white font-cinzel mb-3 drop-shadow-lg group-hover:text-yellow-100 transition-colors">
                                        {theme.name}
                                    </h3>

                                    <div
                                        className="h-1 w-12 rounded-full mb-4 transition-all duration-500 group-hover:w-full opacity-80"
                                        style={{ backgroundColor: theme.colors.primary }}
                                    ></div>

                                    <p className="text-white/70 text-sm mb-6 line-clamp-2 group-hover:line-clamp-none group-hover:text-white/90 transition-all duration-300">
                                        Experience the {theme.name} path with curated pandals, optimized routing, and immersive storytelling.
                                    </p>

                                    <div className="flex items-center gap-2 text-white/50 text-xs font-medium uppercase tracking-widest group-hover:text-yellow-400 transition-colors">
                                        Start Journey <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Sparkle */}
                            <div className="absolute top-4 right-4 text-white/20 group-hover:text-yellow-400 group-hover:rotate-12 transition-all duration-500 z-20">
                                <Sparkles className="w-8 h-8" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Roadmaps;
