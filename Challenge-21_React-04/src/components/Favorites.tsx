import React from 'react';
import { useFavoriteStore } from '../store/favoriteStore';
import { useRestaurantStore } from '../store/restaurantStore';
import { RestaurantCard } from './RestaurantCard';

const Favorites: React.FC = () => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();
  const { restaurants } = useRestaurantStore();

  const toggleFavorite = (id: string) => {
    favorites.includes(id) ? removeFavorite(id) : addFavorite(id);
  };

  return (
    <div className="favorite">
      <h2>Favorites</h2>
      {favorites.length > 0 ? (
        favorites.map((id: string) => {
          const restaurant = restaurants.find((item) => item.id === id);
          return restaurant ? (
            <RestaurantCard
              key={restaurant.id}
              data={restaurant}
              toggleFavorite={toggleFavorite}
              isFavorite={true}
            />
          ) : null;
        })
      ) : (
        <p>No favorites found.</p>
      )}
    </div>
  );
};

export default Favorites;
