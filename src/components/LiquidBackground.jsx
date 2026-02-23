import React from 'react';
import { usePuja } from '../context/PujaContext';
import ParticleOverlay from './ParticleOverlay';

const LiquidBackground = ({ children }) => {
    const { currentTheme, selectedPuja, previewTheme, themes } = usePuja();

    // Determine which colors to use:
    // PujaContext's `currentTheme` already handles falling back to previewTheme
    // or selectedPuja or the default 'durga'.
    const colors = currentTheme.colors;

    return (
        <div
            className="relative min-h-screen overflow-x-hidden transition-colors duration-700 ease-in-out"
            style={{ backgroundColor: colors.background }}
        >
            {/* Animated Blobs */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-0 -left-4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob transition-colors duration-700"
                    style={{ backgroundColor: colors.blobs[0] }}
                ></div>
                <div
                    className="absolute top-0 -right-4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 transition-colors duration-700"
                    style={{ backgroundColor: colors.blobs[1] }}
                ></div>
                <div
                    className="absolute -bottom-8 left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 transition-colors duration-700"
                    style={{ backgroundColor: colors.blobs[2] }}
                ></div>
                <div
                    className="absolute bottom-40 right-20 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 transition-colors duration-700"
                    style={{ backgroundColor: colors.blobs[3] }}
                ></div>
            </div>

            {/* Particle Overlay - Always active now (defaults to Durga) */}
            <ParticleOverlay />

            {/* Glass Overlay for Depth */}
            <div className="fixed inset-0 z-0 bg-black/20 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default LiquidBackground;
