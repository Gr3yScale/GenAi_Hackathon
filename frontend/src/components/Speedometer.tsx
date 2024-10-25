import React from 'react';

interface SpeedometerProps {
    value: number; // The value that controls the needle position (between 0 and 1)
    colors?: {
        red?: string;
        orange?: string;
        yellow?: string;
        lightGreen?: string;
        darkGreen?: string;
        needle?: string;
        background?: string;
    };
}

const Speedometer: React.FC<SpeedometerProps> = ({
    value,
    colors = {},
}) => {
    const {
        red = '#ff0000',
        orange = '#ffa500',
        yellow = '#ffff00',
        lightGreen = '#90ee90',
        darkGreen = '#008000',
        needle = '#000000',
        background = 'transparent',
    } = colors;

    // Clamp the value between 0 and 1
    const clampedValue = Math.max(0, Math.min(1, value));

    // Calculate the needle angle (starting from -90 degrees to 90 degrees for 0 to 1 range)
    const angle = clampedValue * 180 - 180;

    // Function to convert polar coordinates to Cartesian (used for arcs)
    const polarToCartesian = (
        cx: number,
        cy: number,
        radius: number,
        angleInDegrees: number
    ) => {
        const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
        return {
            x: cx + radius * Math.cos(angleInRadians),
            y: cy + radius * Math.sin(angleInRadians),
        };
    };

    // Function to create a segment of the speedometer
    const createArcPath = (
        radius: number,
        startAngle: number,
        endAngle: number
    ) => {
        startAngle = startAngle - 90;
        endAngle = endAngle - 90;
        const start = polarToCartesian(nx, ny, radius, endAngle);
        const end = polarToCartesian(nx, ny, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    };
    const thickness = 20;
    const spacing = 1;
    const radius = 90;

    const r = 6;
    const nx = radius + thickness / 4;
    const ny = radius + thickness / 2;

    const scale = 3;
    return (
        <svg width={200 * scale} height={106 * scale} viewBox={"0 0 " + (radius * 2 + thickness / 2) + " " + (radius + thickness / 2 + r)} style={{ backgroundColor: background }}>
            {/* Gauge segments, using 5 colors */}
            <path d={createArcPath(radius, -90, -54 - spacing / 2)} fill="none" stroke={red} strokeWidth={thickness} />
            <path d={createArcPath(radius, -54 + spacing / 2, -18 - spacing / 2)} fill="none" stroke={orange} strokeWidth={thickness} />
            <path d={createArcPath(radius, -18 + spacing / 2, 18 - spacing / 2)} fill="none" stroke={yellow} strokeWidth={thickness} />
            <path d={createArcPath(radius, 18 + spacing / 2, 54 - spacing / 2)} fill="none" stroke={lightGreen} strokeWidth={thickness} />
            <path d={createArcPath(radius, 54 + spacing / 2, 90)} fill="none" stroke={darkGreen} strokeWidth={thickness} />

            {/* Needle */}
            <line
                x1={nx}
                y1={ny}
                x2={nx + 100 * Math.cos((angle * Math.PI) / 180)}
                y2={ny + 100 * Math.sin((angle * Math.PI) / 180)}
                stroke={needle}
                strokeWidth={r}
            />

            {/* Center of the needle */}
            <circle cx={nx} cy={ny} r={r} fill={needle} />
        </svg>
    );
};

export default Speedometer;
