import React from "react";

interface WorkoutProps {
    type: string;
    duration: number;
    intensity: string;
}

export const WorkoutItem: React.FC<WorkoutProps> = ({ type, duration, intensity }) => {
    return (
        <div className="workout-card">
            <h3>{type}</h3>
            <p>{`Duration: ${duration} `}</p>
            <p>{`Intensity: ${intensity}`}</p>
        </div>
    );
};
