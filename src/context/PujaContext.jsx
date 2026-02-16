import React, { createContext, useContext, useState, useMemo } from 'react';

// Theme Definitions for 6 Pujas
const THEMES = {
    durga: {
        id: 'durga',
        name: 'Durga Puja',
        image: '/assets/pujas/durga.png',
        colors: {
            primary: '#991b1b', // Deep Red
            secondary: '#fbbf24', // Gold
            background: '#2e0202', // Deep Maroon
            text: '#ffffff',
            blobs: ['#9333ea', '#eab308', '#db2777', '#dc2626'] // Purple, Yellow, Pink, Red
        }
    },
    kali: {
        id: 'kali',
        name: 'Kali Puja',
        image: '/assets/pujas/kali.png',
        colors: {
            primary: '#1e1b4b', // Midnight Blue
            secondary: '#7e22ce', // Electric Purple
            background: '#0f172a', // Dark Slate
            text: '#ffffff',
            blobs: ['#4c1d95', '#dc2626', '#1e40af', '#be185d'] // Deep Purple, Red, Blue, Pink
        }
    },
    jagadhatri: {
        id: 'jagadhatri',
        name: 'Jagadhatri Puja',
        image: '/assets/pujas/jagadhatri.png',
        colors: {
            primary: '#134e4a', // Royal Teal
            secondary: '#c2410c', // Burnt Orange
            background: '#042f2e', // Deep Teal
            text: '#ffffff',
            blobs: ['#0d9488', '#f97316', '#14b8a6', '#ea580c'] // Teal, Orange, Cyan, Burnt Orange
        }
    },
    kartik: {
        id: 'kartik',
        name: 'Kartik Puja',
        image: '/assets/pujas/kartik.png',
        colors: {
            primary: '#1d4ed8', // Peacock Blue
            secondary: '#94a3b8', // Silver/Grey
            background: '#0f172a', // Slate 900
            text: '#ffffff',
            blobs: ['#3b82f6', '#64748b', '#0ea5e9', '#cbd5e1'] // Blue, Slate, Sky, Silver
        }
    },
    saraswati: {
        id: 'saraswati',
        name: 'Saraswati Puja',
        image: '/assets/pujas/saraswati.png',
        colors: {
            primary: '#eab308', // Bright Yellow
            secondary: '#84cc16', // Spring Green
            // Actually, Saraswati is light/airy. Let's try a dark yellow/brown base for glass pop
            // Or maybe a deep yellow-orange base. 
            // Let's stick to dark backgrounds for glass effect consistency, maybe a deep ochre or olive.
            // Let's go with a warm deep yellow-brown.
            background: '#422006',
            text: '#ffffff',
            blobs: ['#facc15', '#ffffff', '#84cc16', '#fde047'] // Yellow, White, Green, Light Yellow
        }
    },
    rash: {
        id: 'rash',
        name: 'Santipur Rash',
        image: '/assets/pujas/rash.png',
        colors: {
            primary: '#be185d', // Pink
            secondary: '#a78bfa', // Lavender
            background: '#4a044e', // Deep Pink/Purple
            text: '#ffffff',
            blobs: ['#f472b6', '#a78bfa', '#fb7185', '#c084fc'] // Pink, Lavender, Rose, Purple
        }
    }
};

const PujaContext = createContext();

export const PujaProvider = ({ children }) => {
    const [selectedPuja, setSelectedPuja] = useState(null); // Default null (Selector Screen)
    const [previewTheme, setPreviewTheme] = useState(null); // For hover effects

    const currentTheme = useMemo(() => {
        if (previewTheme) return THEMES[previewTheme];
        return THEMES[selectedPuja] || THEMES.durga; // Fallback to Durga if somehow undefined, but Selector handles null
    }, [selectedPuja, previewTheme]);

    const value = {
        selectedPuja,
        setSelectedPuja,
        setPreviewTheme, // Export setter
        currentTheme,
        themes: THEMES
    };

    return (
        <PujaContext.Provider value={value}>
            {children}
        </PujaContext.Provider>
    );
};

export const usePuja = () => {
    const context = useContext(PujaContext);
    if (!context) {
        throw new Error('usePuja must be used within a PujaProvider');
    }
    return context;
};
