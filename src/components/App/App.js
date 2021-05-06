import { useState, useEffect, useRef } from "react";
import { Switch, Route, useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import SearchForm from '../SearchForm/SearchForm';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';

import { origin } from '../../utils/utils';
import moviesData from '../../data/movies.json';

import './App.css';

function App() {
  const { pathname } = useLocation();

  // времянка
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(16);
  const [isShortSelected, setIsShortSelected] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const moviesRef = useRef({ allMovies: [], shortMovies: [] });

  useEffect(() => {
    moviesData.reduce((res, movie) => {
      if (movie.duration <= 40) res.shortMovies.push(movie);
      res.allMovies.push(movie);
      return res
    }, moviesRef.current);

    setMovies(moviesRef.current.allMovies.slice(0, visibleCount))
  }, [])

  useEffect(() => {
    setMovies(moviesRef.current[isShortSelected ? 'shortMovies' : 'allMovies'].slice(0, visibleCount))
  }, [visibleCount, isShortSelected]);

  const handleToggle = () => setIsShortSelected(prevState => !prevState);
  const handleClick = () => setVisibleCount(prevCount => prevCount <= movies.length ? prevCount + 4 : prevCount);
  
  const handlePopupState = () => setIsPopupOpen(prevState => !prevState);

  return (
    <div className="page">
      {origin.header[pathname] && <Header onOpen={handlePopupState} />}
      {origin.movies[pathname] && <SearchForm handleToggle={handleToggle} />}
      <Switch>
        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route exact path="/">
          <Main />
        </Route>

        <ProtectedRoute exact path="/movies" isLoggedIn={true}>
          <Movies movies={movies} count={visibleCount} handleClick={handleClick} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/saved-movies" isLoggedIn={true}>
          <SavedMovies movies={savedMovies} />
        </ProtectedRoute>

        <ProtectedRoute exact path="/profile" isLoggedIn={true}>
          <Profile />
        </ProtectedRoute>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      {origin.header[pathname] && pathname !== '/profile' && <Footer />}
      <Popup isOpen={isPopupOpen} onClose={handlePopupState} />
    </div>
  )
}

export default App;
