import React, { useContext, useState } from "react";
import { WorkoutTypeName, Intensity, IntensityString } from "../types";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

export const AddNewWorkout: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [workoutType, setWorkoutType] = useState("");
    const [duration, setDuration] = useState<number | "">("");
    const [intensity, setIntensity] = useState<IntensityString>("Low");
    const [error, setError] = useState<string | null>(null); // For validation
    const navigate = useNavigate();

    const handleAddWorkout = async () => {
        if (!workoutType || !duration || duration <= 0) {
            setError("Please fill in all fields with valid data.");
            return;
        }

        setError(null); // Clear any previous errors

        if (user) {
            console.log("User authenticated:", user.uid);
            try {
                await addDoc(collection( db, "workouts"), {
                    type: workoutType,
                    intensity,
                    duration,
                    userId: user.uid,
                });
                navigate("/all-workouts");
            } catch (error) {
                console.error("Error adding workout:", error);
                setError("Failed to add workout. Please try again.");
            }
        } else {
            setError("User not authenticated.");
        }
    };

    return (
        <form className="workout-form">
            <div className="form-control">
                <label htmlFor="workout-type">Exsercise type</label>
                <select
                    id="workout-type"
                    value={workoutType}
                    onChange={(e) => setWorkoutType(e.target.value as WorkoutTypeName)}
                >
                    <option value="">Select type </option>
                    {Object.values(WorkoutTypeName).map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-control">
                <label htmlFor="duration">Duration</label>
                <input
                    id="duration"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value) || "")}
                />
            </div>

            <div className="form-control">
                <label htmlFor="intensity">Intensity</label>
                <select
                    id="intensity"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value as IntensityString)}
                >
                    {Object.values(Intensity).map((level) => (
                        <option key={level} value={level}>
                            {level}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="error">{error}</p>}

            <button className="add-button" type="button" onClick={handleAddWorkout}>
                Add Workout
            </button>
        </form>
    );
};

