import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllRestaurants from './components/AllRestaurants';
import Favorites from './components/Favorites';

import CuisineDetail from './components/CuisineDetail';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RestaurantDetail from './components/DetailPage';

const App = () => {
  return (
    <div className='container'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AllRestaurants />} />
          <Route path="/detail/:id" element={<RestaurantDetail />} />
          <Route path="/favorits" element={<Favorites />} />
          <Route path="/cuisine/:type" element={<CuisineDetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
