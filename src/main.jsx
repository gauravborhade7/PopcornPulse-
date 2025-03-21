import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import App from './TrendingMovies.jsx'
import MovieDetails from './MoviesDetail.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Router>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/movie/:id' element={<MovieDetails/>}/>
      </Routes>
    </Router>
  </StrictMode>
)
