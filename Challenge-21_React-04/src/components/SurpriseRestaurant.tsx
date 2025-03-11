import React from 'react';
import { useRestaurantStore } from '../store/restaurantStore'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import './SurpriseRestaurant.css';

const SurpriseRestaurant: React.FC = () => {
    const { restaurants } = useRestaurantStore();

    // Function to get a random restaurant
    const getRandomRestaurant = () => {
        if (restaurants.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        return restaurants[randomIndex];
    };

    const randomRestaurant = getRandomRestaurant();

    return (
        <div className="surpriseRestaurant">
            <h2>Don't know what to eat?</h2>
            {randomRestaurant ? (
                <Link to={`/detail/${randomRestaurant.id}`}>
                    <button>Surprise me!</button>
                </Link>
            ) : (
                <p>No restaurants available to surprise you!</p>
            )}
        </div>
    );
};

export default SurpriseRestaurant;

