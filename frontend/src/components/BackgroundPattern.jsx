
import React, { useMemo } from 'react';

const BackgroundPattern = ({ theme }) => {
    // Generate static random values once
    const leaves = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            rotation: Math.random() * 360,
            scale: 0.5 + Math.random() * 1.5, // 0.5 to 2.0
            size: 100 + Math.random() * 150, // 100px to 250px
            opacity: 0.5 // Fixed 50% opacity as requested
        }));
    }, []);

    // Explicitly use theme prop to bypass Tailwind's media-based dark mode
    const bgColor = theme === 'dark' ? 'bg-background-dark' : 'bg-white';

    return (
        <div className={`fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-700 ${bgColor}`}>
            {/* Very subtle noise or gradient if needed, but for now just the solid background */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
        </div>
    );
};

export default BackgroundPattern;
