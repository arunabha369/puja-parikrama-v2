import React, { useMemo } from 'react';
import { usePuja } from '../context/PujaContext';

const ParticleOverlay = () => {
    const { currentTheme } = usePuja();

    // Define particle configurations based on theme ID
    const particleConfig = useMemo(() => {
        switch (currentTheme.id) {
            case 'durga':
            case 'kali':
                return { type: 'ember', color: '#ef4444', count: 20 }; // Red embers
            case 'jagadhatri':
                return { type: 'sparkle', color: '#fb923c', count: 25 }; // Orange sparkles
            case 'kartik':
                return { type: 'star', color: '#93c5fd', count: 30 }; // Blue stars
            case 'saraswati':
                return { type: 'float', color: '#ffffff', count: 15 }; // White floaters
            case 'rash':
                return { type: 'petal', color: '#fda4af', count: 20 }; // Pink petals
            default:
                return { type: 'dust', color: '#ffffff', count: 10 }; // Generic dust
        }
    }, [currentTheme.id]);

    // Generate random particles
    const particles = useMemo(() => {
        return Array.from({ length: particleConfig.count }).map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: Math.random() * 4 + 2 + 'px',
            animationDuration: `${Math.random() * 10 + 10}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random() * 0.5 + 0.1,
        }));
    }, [particleConfig]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full animate-float"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        backgroundColor: particleConfig.color,
                        animationDuration: p.animationDuration,
                        animationDelay: p.animationDelay,
                        opacity: p.opacity,
                        boxShadow: `0 0 ${parseInt(p.size) * 2}px ${particleConfig.color}`,
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleOverlay;
