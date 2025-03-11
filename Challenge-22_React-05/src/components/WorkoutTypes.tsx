import React from "react";

interface WorkoutTypesProps {
    types: string[];
}


export const WorkoutTypes: React.FC<WorkoutTypesProps> = ({ types }) => {
    return (
        <div>
            {types.map((type) => (
                <span key={type} className="workout-type">
                    {type}
                </span>
            ))}
        </div>
    );
};
