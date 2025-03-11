import React from 'react';
import { RestaurantsEntity } from '../interfaces/DataInterface';
import { Link } from 'react-router-dom';
import './RestaurantCard.css';



interface RestaurantCardProps {
    data: RestaurantsEntity;
    toggleFavorite: (id: string) => void;
    isFavorite: boolean;
}

const calculateAverageRating = (reviewsList: RestaurantsEntity['reviewsList'] = []) => {
    if (!Array.isArray(reviewsList) || reviewsList.length === 0) return 'N/A';
    const totalStars = reviewsList.reduce((sum, review) => sum + review.stars, 0);
    return (totalStars / reviewsList.length).toFixed(1);
};

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ data, toggleFavorite, isFavorite }) => {
    const averageRating = calculateAverageRating(data.reviewsList);

    return (
        <Link to={`/detail/${data.id}`} className="restaurant-card-link">
            <div className="restaurant-card">
                <div className="card-image">
                    <img src={data.image} alt={data.businessname} />
                    <button
                        className="favorite-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(data.id);
                        }}
                    >
                        {isFavorite ? (
                            <i className="fa fa-heart" aria-hidden="true"></i>
                        ) : (
                            <i className="fa-regular fa-heart" aria-hidden="true"></i>
                        )}
                    </button>
                </div>
                <div className="card-content">
                    <h3>{data.businessname}</h3>
                    <p className="restaurant-type">{data.restauranttype}</p>
                    {!data.reviewsList.length ? null : (
                        <>
                            <p className="rating m-0">Rating - {averageRating}</p>
                            <p className="rating m-0">Based on {data.reviewsList.length} reviews</p>
                        </>
                    )}
                </div>
            </div>
        </Link>
    );
};
