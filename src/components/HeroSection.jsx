import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-100 pt-16 pb-32 md:pt-32 md:pb-48">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-200/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-red-200/20 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-orange-100/50 border border-orange-200 px-4 py-1.5 rounded-full text-orange-800 text-sm font-medium mb-8 animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    Plan your 2025 Parikrama Now
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 animate-fade-in-up font-serif opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                    Plan Your Puja & Parikrama with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Divine Precision</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    Create auspicious puja schedules based on date, location & temples. Optimize your route to visit maximum pandals with ease.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                    <Link
                        to="/planner"
                        className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-1"
                    >
                        Start Planning
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                    <button className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-colors">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        View Temples
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
