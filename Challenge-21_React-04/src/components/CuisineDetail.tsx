import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurantStore } from '../store/restaurantStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { RestaurantCard } from './RestaurantCard';


const CuisineDetail: React.FC = () => {
    const { type } = useParams<{ type: string }>();
    const { restaurants } = useRestaurantStore();
    const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

    // Filter restaurants by cuisine type
    const filteredRestaurants = restaurants.filter(
        (restaurant) => restaurant.restauranttype === type
    );

    const toggleFavorite = (id: string) => {
        favorites.includes(id) ? removeFavorite(id) : addFavorite(id);
    };

    return (
        <div className="cuisine-detail">
            <h2>{type} Restaurants</h2>
            {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        data={restaurant}
                        toggleFavorite={() => toggleFavorite(restaurant.id)}
                        isFavorite={favorites.includes(restaurant.id)}
                    />
                ))
            ) : (
                <p>No restaurants found for this cuisine.</p>
            )}
        </div>
    );
};

export default CuisineDetail;