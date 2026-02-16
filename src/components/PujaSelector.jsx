import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePuja } from '../context/PujaContext';
import { Sparkles, ArrowRight } from 'lucide-react';

const PujaSelector = () => {
    const { themes, setSelectedPuja, setPreviewTheme } = usePuja();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode'); // 'view' or 'plan' (default)

    const handleSelect = (id) => {
        setSelectedPuja(id);
        if (mode === 'view') {
            navigate('/temples');
        } else {
            navigate('/planner');
        }
    };

    const handleMouseMove = (e, id) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        setPreviewTheme(null);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in-down">
                <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-yellow-300 text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-md">
                    The Divine Portal
                </span>
                <h1 className="text-5xl md:text-7xl font-cinzel text-white text-glow mb-4 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
                    Choose Your Journey
                </h1>
                <p className="text-white/60 text-lg font-light max-w-2xl mx-auto font-outfit opacity-0 animate-[fadeIn_1s_ease-out_0.8s_forwards]">
                    Select a deity to enter their divine realm. The entire experience will transform to match their essence.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full perspective-1000">
                {Object.values(themes).map((theme, index) => (
                    <div
                        key={theme.id}
                        onClick={() => handleSelect(theme.id)}
                        onMouseEnter={() => setPreviewTheme(theme.id)}
                        onMouseMove={(e) => handleMouseMove(e, theme.id)}
                        onMouseLeave={handleMouseLeave}
                        className="group relative cursor-pointer opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                        style={{
                            animationDelay: `${1 + index * 0.15}s`,
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.1s ease-out'
                        }}
                    >
                        {/* Glow Effect */}
                        <div
                            className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500"
                            style={{ backgroundColor: theme.colors.secondary }}
                        ></div>

                        {/* Card Content */}
                        <div className="relative h-full glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center transition-colors duration-500 group-hover:bg-white/10 border border-white/10 group-hover:border-white/30 transform-gpu">

                            {/* Decorative Circle / Image Container */}
                            <div
                                className="w-64 h-64 rounded-full mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 overflow-hidden relative ring-0 outline-none"
                                style={{
                                    background: `transparent`,
                                }}
                            >
                                <img
                                    src={theme.image}
                                    alt={theme.name}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity scale-110"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center hidden">
                                    <Sparkles className="w-10 h-10 text-white" />
                                </div>
                            </div>

                            <h3 className="text-2xl font-cinzel font-bold text-white mb-2 group-hover:text-glow transition-all translate-z-10">
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
