import React from 'react';
import { usePuja } from '../context/PujaContext';
import { Sparkles, ArrowRight } from 'lucide-react';

const PujaSelector = () => {
    const { themes, setSelectedPuja } = usePuja();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-down">
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-yellow-300 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
                    The Divine Portal
                </span>
                <h1 className="text-5xl md:text-7xl font-cinzel text-white text-glow mb-4">
                    Choose Your Journey
                </h1>
                <p className="text-white/60 text-lg font-light max-w-2xl mx-auto font-outfit">
                    Select a deity to enter their divine realm. The entire experience will transform to match their essence.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full">
                {Object.values(themes).map((theme, index) => (
                    <div
                        key={theme.id}
                        onClick={() => setSelectedPuja(theme.id)}
                        className="group relative cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Glow Effect */}
                        <div
                            className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500"
                            style={{ backgroundColor: theme.colors.secondary }}
                        ></div>

                        {/* Card Content */}
                        <div className="relative h-full glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white/10 border border-white/10 group-hover:border-white/30">

                            {/* Decorative Circle */}
                            <div
                                className="w-20 h-20 rounded-full mb-6 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                                    boxShadow: `0 0 20px ${theme.colors.primary}60`
                                }}
                            >
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>

                            <h3 className="text-2xl font-cinzel font-bold text-white mb-2 group-hover:text-glow transition-all">
                                {theme.name}
                            </h3>

                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/90">
                                    Enter Portal <ArrowRight className="w-4 h-4" />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PujaSelector;
