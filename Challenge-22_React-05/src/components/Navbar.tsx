import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AddIcon from '@mui/icons-material/Add';

export const Navbar: React.FC = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar">
            <Link to="/all-workouts"> <FitnessCenterIcon /></Link>
            <Link to="/add-new-workout"><AddIcon /></Link>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};
