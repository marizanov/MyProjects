import React, { useContext, useEffect, useState } from "react";
import { WorkoutItem } from "./WorkoutItem";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { Workout } from "../types";

export const AllWorkouts: React.FC = () => {
    const { user } = useContext(AuthContext);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const workoutsCollection = collection(db, "workouts");
            const q = query(workoutsCollection, where("userId", "==", user?.uid));
            const snapshot = await getDocs(q);
            const userWorkouts = snapshot.docs.map((doc) => doc.data() as Workout);
            setWorkouts(userWorkouts);
            setLoading(false);
        };
        fetchWorkouts();
    }, [user?.uid]);

    return (
        <div className="workout-list">
            {loading ? (
                <div>Loading...</div>
            ) : workouts.length > 0 ? (
                workouts.map((workout) => <WorkoutItem key={workout.id} {...workout} />)
            ) : (
                <div>No workouts available. Add your first workout!</div>
            )}
        </div>
    );
};
