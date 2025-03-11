import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurantStore } from '../store/restaurantStore';
import { RestaurantsEntity } from '../interfaces/DataInterface';
import './DetailPage.css';

const calculateAverageRating = (reviewsList: RestaurantsEntity['reviewsList']) => {
  const totalStars = reviewsList.reduce((sum, review) => sum + review.stars, 0);
  return reviewsList.length ? (totalStars / reviewsList.length).toFixed(1) : 'N/A';
};

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { restaurants } = useRestaurantStore();
  const restaurant = restaurants.find((item) => item.id === id);

  const [reviews, setReviews] = useState(restaurant?.reviewsList || []);
  const [stars, setStars] = useState(1);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (restaurant) {
      const newReview = { id: Date.now(), author, comment, stars };
      const updatedReviews = [...reviews, newReview];

      try {
        const response = await fetch(`http://localhost:5001/restaurants/${restaurant.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...restaurant, reviewsList: updatedReviews }),
        });

        if (!response.ok) {
          throw new Error('Failed to update reviews.');
        }

        setReviews(updatedReviews);
        setStars(1);
        setAuthor('');
        setComment('');
        setError(null);
      } catch (err) {
        setError('There was an issue submitting your review. Please try again.');
      }
    }
  };

  if (!restaurant) return <div>Restaurant not found</div>;

  const averageRating = calculateAverageRating(reviews);

  return (
    <div className="detailPage">
      <h2>{restaurant.businessname}</h2>
      <img className="detailPage-image" src={restaurant.image} alt={restaurant.businessname} />
      <div className="detailPage-content">
        {reviews.length > 0 ? (
          <>
            <p className="rating m-0">Rating - {averageRating}</p>
            <p className="rating m-0">Based on {reviews.length} reviews</p>
          </>
        ) : null}
        <p>{restaurant.phone}</p>
        <p>{restaurant.address}</p>
        <p>{restaurant.email}</p>
        {restaurant.parkinglot && <p>We have a parking lot waiting for you</p>}
      </div>

      <h3>Reviews</h3>
      {reviews.map((review) => (
        <div key={review.id} className="detailPage-review">
          <p>Author: {review.author}</p>
          <p>Message: {review.comment}</p>
          <p>Stars: {review.stars}</p>
        </div>
      ))}

      <h3>Review form</h3>
      <form className="review-form" onSubmit={handleReviewSubmit}>
        <label htmlFor="author">Name</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <label htmlFor="stars">Stars</label>
        <input
          type="range"
          id="stars"
          min="1"
          max="5"
          value={stars}
          onChange={(e) => setStars(Number(e.target.value))}
          aria-label="Select rating from 1 to 5 stars"
        />

        <button type="submit">Leave a review</button>
      </form>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default RestaurantDetail;