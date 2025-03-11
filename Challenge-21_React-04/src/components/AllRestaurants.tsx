import React, { useEffect } from 'react';
import { useRestaurantStore } from '../store/restaurantStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { RestaurantCard } from './RestaurantCard';
import SurpriseRestaurant from './SurpriseRestaurant';
import PopularRestaurants from './PopularRestaurants';
import Cuisines from './Cuisines';
import './AllRestaurants.css';

const AllRestaurants: React.FC = () => {
  const { restaurants, fetchRestaurants } = useRestaurantStore();
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const toggleFavorite = (id: string) => {
    favorites.includes(id.toString()) ? removeFavorite(id.toString()) : addFavorite(id.toString());
  };


  return (
    <>
      <SurpriseRestaurant />
      <PopularRestaurants />
      <Cuisines />
      <h2 className="allCardsHeader">All Restaurants</h2>
      <div className="allCardContainer">
        {restaurants.map((data) => (
          <RestaurantCard
            key={data.id}
            data={data}
            toggleFavorite={toggleFavorite}
            isFavorite={favorites.includes(data.id)}
          />
        ))}
      </div>
    </>
  );
};

export default AllRestaurants;


