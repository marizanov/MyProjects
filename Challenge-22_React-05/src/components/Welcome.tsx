import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../App.css";
export const Welcome: React.FC = () => {
    const { login } = useContext(AuthContext);

    return (
        <div className="hero-banner">
            <div className="image-container" >
                <img src="./images/heroBanner.jpeg" alt="hero banner" />
            </div>
            <div >
                <h1 >Your Fitness Journey Starts Here</h1>
                <button className="login-button" onClick={login}>
                    LOGIN
                </button>
            </div>
        </div>
    );
};
