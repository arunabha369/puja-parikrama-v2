import React from 'react';

const Logo = ({ className = "w-8 h-8", classNameText = "text-xl" }) => {
    return (
        <div className="flex items-center gap-2 group">
            <div className={`relative ${className} flex items-center justify-center`}>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full relative z-10 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                    {/* Swastik Path */}
                    <path
                        d="M 50 50 V 15 H 85 M 50 50 H 85 V 85 M 50 50 V 85 H 15 M 50 50 H 15 V 15"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-600"
                    />

                    {/* 4 dots of swastik */}
                    <circle cx="33" cy="33" r="4.5" fill="currentColor" className="text-yellow-400" />
                    <circle cx="67" cy="33" r="4.5" fill="currentColor" className="text-yellow-400" />
                    <circle cx="33" cy="67" r="4.5" fill="currentColor" className="text-yellow-400" />
                    <circle cx="67" cy="67" r="4.5" fill="currentColor" className="text-yellow-400" />
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
