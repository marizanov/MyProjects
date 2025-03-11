
import SurpriseRestaurant from './SurpriseRestaurant'
import PopularRestaurants from './PopularRestaurants'
import Cuisines from './Cuisines'
import AllRestaurants from './AllRestaurants'



export default function HomePage() {
    return (
        <div className='row'>
            <SurpriseRestaurant />
            <PopularRestaurants />
            <Cuisines />
            <AllRestaurants />
            
        </div>
    )
}