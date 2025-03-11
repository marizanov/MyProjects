export interface Review {
  id: number;
  author: string;
  comment: string;
  stars: number;
}

export interface RestaurantsEntity {
  id: string;
  businessname: string;
  restauranttype: string;
  image: string;
  address: string;
  phone: string;
  email: string;
  reviews: number;
  parkinglot: boolean;
  reviewsList: Review[];
}