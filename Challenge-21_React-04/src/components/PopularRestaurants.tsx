import React from 'react';
import { useRestaurantStore } from '../store/restaurantStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { RestaurantCard } from './RestaurantCard';
import './PopularRestaurants.css';

const PopularRestaurants: React.FC = () => {
  const { restaurants } = useRestaurantStore();
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

  // Sort restaurants by the number of reviews and get the top 10
  const popularRestaurants = restaurants
    .sort((a, b) => (b.reviewsList?.length || 0) - (a.reviewsList?.length || 0))
    .slice(0, 10);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  return (
    <div className="popular-restaurants">
      <h2>Our Most Popular Restaurants</h2>
      <div className="popular-restaurants-cards">
        {popularRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            data={restaurant}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(restaurant.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularRestaurants;