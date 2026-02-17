import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { usePuja } from '../context/PujaContext';

const HeroSection = () => {
    const { currentTheme } = usePuja();
    const primaryColor = currentTheme.colors.primary;
    const secondaryColor = currentTheme.colors.secondary;
    const gradientStyle = { backgroundImage: `linear-gradient(to right, ${secondaryColor}, ${primaryColor})` };

    return (
        <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center min-h-[80vh]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-gold-50 text-sm font-medium mb-8 animate-fade-in-up hover:border-white/40 transition-colors duration-300">
                    <span className="relative flex h-2 w-2">
                        <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ backgroundColor: secondaryColor }}
                        ></span>
                        <span
                            className="relative inline-flex rounded-full h-2 w-2"
                            style={{ backgroundColor: primaryColor }}
                        ></span>
                    </span>
                    <span className="tracking-wide uppercase text-xs font-bold text-yellow-100">Plan your 2025 Parikrama Now</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight mb-8 animate-fade-in-up font-cinzel opacity-0 text-glow" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                    Plan Your Puja with <br />
                    <span
                        className="text-transparent bg-clip-text drop-shadow-sm transition-all duration-700"
                        style={{
                            ...gradientStyle,
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text'
                        }}
                    >
                        Divine Precision
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 animate-fade-in-up opacity-0 font-light leading-relaxed" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    Create auspicious puja schedules based on date, location & temples. Optimize your route to visit maximum pandals with ease.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                    <Link
                        to="/planner"
                        className="btn-liquid flex items-center justify-center gap-3 transition-all duration-500"
                        style={{
                            ...gradientStyle,
                            boxShadow: `0 10px 25px -5px ${primaryColor}66`
                        }}
                    >
                        Start Planning
                        <ArrowRight className="h-5 w-5" />
                    </Link>

                    <Link
                        to="/select-puja?mode=view"
                        className="glass-panel px-8 py-3 rounded-full text-lg font-medium text-white hover:bg-white/10 transition-all border border-white/20 flex items-center justify-center gap-2 hover:border-white/40"
                    >
                        <MapPin className="h-5 w-5 text-yellow-400" />
                        View Temples
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
