import React from 'react';
import { Link } from 'react-router-dom';
import { useRestaurantStore } from '../store/restaurantStore';
import './Cuisines.css';

const Cuisines: React.FC = () => {
  const { restaurants } = useRestaurantStore();
  const uniqueRestaurantTypes = Array.from(new Set(restaurants.map(data => data.restauranttype)));

  return (
    <div className="cuisines">
      <h2>Cuisines</h2>
      {uniqueRestaurantTypes.map(type => (
        <Link key={type} to={`/cuisine/${type}`}>
          <button>{type}</button>
        </Link>
      ))}
    </div>
  );
};

export default Cuisines;