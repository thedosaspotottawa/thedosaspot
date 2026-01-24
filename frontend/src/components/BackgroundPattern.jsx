
import React, { useMemo } from 'react';

const BackgroundPattern = () => {
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

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-white">
            {leaves.map((leaf) => (
                <img
                    key={leaf.id}
                    src="/assets/images/leaf-twig.png"
                    alt=""
                    style={{
                        position: 'absolute',
                        top: leaf.top,
                        left: leaf.left,
                        width: `${leaf.size}px`,
                        height: 'auto', // Keep aspect ratio
                        transform: `translate(-50%, -50%) rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
                        opacity: leaf.opacity,
                    }}
                />
            ))}
        </div>
    );
};

export default BackgroundPattern;
