import './App.css';
import Home from './Pages/Home/Home';
import MovieDetail from './Pages/MovieDetail/MovieDetail';
import CategoryPage from './Pages/CategoryPage/CategoryPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/movie/:id/:type" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
