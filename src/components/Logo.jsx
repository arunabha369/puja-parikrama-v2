import React from 'react';

const Logo = ({ className = "w-8 h-8", classNameText = "text-xl" }) => {
    return (
        <div className="flex items-center gap-2 group">
            <div className={`relative ${className} flex items-center justify-center`}>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                    {/* Lotus Base */}
                    <path d="M20 80 C 20 80, 40 95, 50 85 C 60 95, 80 80, 80 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-red-500" />
                    <path d="M25 78 C 25 78, 35 60, 50 65 C 65 60, 75 78, 75 78" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-orange-400" />
                    <path d="M50 65 V 85" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-orange-400" />

                    {/* Trishul (Trident) */}
                    <path d="M50 85 V 15" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="text-yellow-400" />
                    {/* Left Prong */}
                    <path d="M50 55 C 20 55, 20 25, 20 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-yellow-400" />
                    {/* Right Prong */}
                    <path d="M50 55 C 80 55, 80 25, 80 25" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="text-yellow-400" />

                    {/* Bindu/Dot */}
                    <circle cx="50" cy="72" r="3" fill="currentColor" className="text-red-600" />
                </svg>
            </div>

            <div className="flex items-baseline gap-2">
                <span className={`font-cinzel font-bold text-white leading-none ${classNameText} tracking-wide group-hover:text-yellow-100 transition-colors drop-shadow-md`}>
                    Puja
                </span>
                <span className={`font-cinzel font-bold text-yellow-400 leading-none ${classNameText} tracking-widest group-hover:text-yellow-300 transition-colors drop-shadow-md`}>
                    Parikrama
                </span>
            </div>
        </div>
    );
};

export default Logo;
