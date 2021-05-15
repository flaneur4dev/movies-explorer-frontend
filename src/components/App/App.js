import { useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';

import { api } from '../../utils/MainApi';
import { getAllMovies } from '../../utils/MoviesApi';
import { setCustomErrorMessages, origin } from '../../utils/utils';
import { CurrentUserContext } from '../../context/CurrentUserContext';

import './App.css';

function App() {
  const { push } = useHistory();
  const { pathname } = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNoRedirect, setIsNoRedirect] = useState(!!localStorage.getItem('userMovies')); 
  
  const [isAppLoading, setIsAppLoading] = useState(false);

  const [serverInfo, setServerInfo] = useState('');

  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [validationMessage, setValidationMessage] = useState({});

  const [visibleCount, setVisibleCount] = useState(4);
  const [isShortSelected, setIsShortSelected] = useState(false);
  
  useEffect(() => {
    api.getUserData()
      .then(user => {
        if (!user._id) return;

        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(alert)

  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const userMovies = localStorage.getItem('userMovies');
    const selectMovies = localStorage.getItem('select');

    if (selectMovies?.length) setMovies(JSON.parse(selectMovies).slice(0, visibleCount));
    if (userMovies?.length) return setSavedMovies(Object.values(JSON.parse(userMovies)).slice(0, visibleCount));

    api.getUserMovies()
      .then(movies => {
        if (!movies.length) return localStorage.setItem('userMovies', JSON.stringify([]));

        const mapUserMovies = movies.reduce((res, movie) => {
          res[movie.movieId] = movie;
          return res
        }, {})

        localStorage.setItem('userMovies', JSON.stringify(mapUserMovies));
        setSavedMovies(movies.slice(0, visibleCount))
      })
      .catch(alert)
  }, [isLoggedIn]);

  useEffect(() => {
    // setMovies(JSON.parse(localStorage.getItem(isShortSelected ? 'short' : 'all')).slice(0, visibleCount));
    setMovies((JSON.parse(localStorage.getItem('select')) || []).slice(0, visibleCount));
  }, [visibleCount]);

  // регистрация, авторизация, выход
  function onRegister(newData) {
    api.register(newData)
      .then(user => {
        if (!user._id) return setServerInfo(user.message);

        setIsLoggedIn(true);
        setIsNoRedirect(true);
        setCurrentUser(user);
        push('/movies')
      })
      .catch(alert)
  }

  function onLogin(data) {
    api.authorize(data)
      .then(user => {
        if (!user._id) return setServerInfo(user.message);

        setIsLoggedIn(true);
        setIsNoRedirect(true);
        setCurrentUser(user);
        push('/movies')
      })
      .catch(alert)
  }

  function onSignOut() {
    api.signOut()
      .then(({ message }) => {
        if (!message) return;

        setIsLoggedIn(false);
        push('/');
        localStorage.clear()
      })
      .catch(alert)
  }

  // обработчики для сетевых запросов
  function handleUpdateUser(newUser) {
    api.updateUserData(newUser)
      .then(user => {
        if (!user._id) return setServerInfo(user.message);

        setCurrentUser(user);
      })
      .catch(alert)
  }

  function handleSearchMovies(value) {
    setIsAppLoading(true);
    
    const re = new RegExp(`${value}`, 'i');
    const movies = localStorage.getItem(isShortSelected ? 'short' : 'all');

    if (movies) {
      const filteredMovies = JSON.parse(movies).filter(movie => re.test(movie.nameRU));

      if (!filteredMovies.length) setServerInfo('Ничего не найдено');

      localStorage.setItem('select', JSON.stringify(filteredMovies));
      setMovies(filteredMovies.slice(0, visibleCount));
      return setIsAppLoading(false)
    }
    
    const userMovies = JSON.parse(localStorage.getItem('userMovies'));

    getAllMovies()
      .then(data => {
        const [shortMovies, filteredMovies, selectedMovies] = data.reduce((res, movie) => {
          
          if (userMovies[movie.id]) {
            movie._id = userMovies[movie.id]._id;
            movie.isSaved = true
          }

          if (movie.duration <= 40) res[0].push(movie);

          // if (isShortSelected) {
            if (re.test(movie.nameRU) && movie.duration <= 40) res[1].push(movie);
          // }
          // else if (re.test(movie.nameRU)) res[2].push(movie);
          if (re.test(movie.nameRU)) res[2].push(movie);

          return res
        }, [[], [], []]);

        if (!selectedMovies.length) return setServerInfo('Ничего не найдено');

        localStorage.setItem('all', JSON.stringify(data));
        localStorage.setItem('short', JSON.stringify(shortMovies));
        localStorage.setItem('select', JSON.stringify(selectedMovies));

        setMovies((isShortSelected ? filteredMovies : selectedMovies).slice(0, visibleCount))
      })
      .catch(alert)
      .finally(() => setIsAppLoading(false))
  }

  function handleSearchUserMovies(value) {
    setIsAppLoading(true);
    
    const re = new RegExp(`${value}`, 'i');
    const localUserMovies = localStorage.getItem('userMovies');

    if (!localUserMovies) return setIsAppLoading(false);

    const filteredMovies = Object.values(JSON.parse(localUserMovies)).filter(movie => re.test(movie.nameRU));
    if (!filteredMovies.length) setServerInfo('Ничего не найдено');

    setSavedMovies(filteredMovies.slice(0, visibleCount));
    setIsAppLoading(false)
  }

  function handleAddMovie(newMovie) {
    const userMovies = JSON.parse(localStorage.getItem('userMovies'));

    if (newMovie.isSaved) {
      api.deleteMovie(newMovie._id)
        .then(({ message }) => {
          if (!/удалена$/.test(message)) return setServerInfo(message);

          delete userMovies[newMovie.movieId];
          localStorage.setItem('userMovies', JSON.stringify(userMovies));

          setMovies(prevState => prevState.map(item => {
            if ((item.id || item.movieId) === newMovie.movieId) item.isSaved = false;
            return item
          }));
          setSavedMovies(prevState => prevState.filter(item => item._id !== newMovie._id));
        })
        .catch(alert)
    } else {
      delete newMovie._id;
      delete newMovie.__v;
      delete newMovie.owner;

      newMovie.isSaved = true;
  
      api.addMovie(newMovie)
        .then(movie => {
          if (!movie._id) return setServerInfo(movie.message);

          userMovies[movie.movieId] = movie;
          localStorage.setItem('userMovies', JSON.stringify(userMovies));

          setMovies(prevState => prevState.map(item => (item.id || item.movieId) === movie.movieId ? movie : item));
          setSavedMovies(prevMovies => [...prevMovies, movie]);
        })
        .catch(alert)
    }
  }

  // валидация
  function handleValidation(input) {
    setCustomErrorMessages(input);

    setIsSubmitDisabled(!input.form.checkValidity());
    setValidationMessage(prevState => ({ ...prevState, [input.id]: input.validationMessage }));
  }

  const handleToggle = () => setIsShortSelected(prevState => !prevState);
  const handleClick = () => setVisibleCount(prevCount => prevCount <= movies.length ? prevCount + 4 : prevCount);

  const handlePopupState = () => setIsPopupOpen(prevState => !prevState);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {origin.header[pathname] && <Header isLoggedIn={isLoggedIn} onOpen={handlePopupState} />}

        <Switch>
          <Route path="/signup">
            <Register
              isDisabled={isSubmitDisabled}
              errors={validationMessage}
              info={serverInfo}
              handleChange={handleValidation}
              onRegister={onRegister}
            />
          </Route>

          <Route path="/signin">
            <Login
              isDisabled={isSubmitDisabled}
              errors={validationMessage}
              info={serverInfo}
              handleChange={handleValidation}
              onLogin={onLogin}
            />
          </Route>

          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute exact path="/movies" isLoggedIn={isNoRedirect}>
            <Movies
              movies={movies}
              count={visibleCount}
              info={serverInfo}
              // isDisabled={isSubmitDisabled}
              isAppLoading={isAppLoading}
              handleChange={handleValidation}
              handleClick={handleClick}
              handleAddMovie={handleAddMovie}
              handleToggle={handleToggle}
              onSubmit={handleSearchMovies}
            />
          </ProtectedRoute>

          <ProtectedRoute exact path="/saved-movies" isLoggedIn={isNoRedirect}>
            <SavedMovies
              movies={savedMovies}
              count={visibleCount}
              info={serverInfo}
              // isDisabled={isSubmitDisabled}
              isAppLoading={isAppLoading}
              handleChange={handleValidation}
              handleClick={handleClick}
              handleAddMovie={handleAddMovie}
              handleToggle={handleToggle}
              onSubmit={handleSearchUserMovies}
            />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile" isLoggedIn={isNoRedirect}>
            <Profile
              isDisabled={isSubmitDisabled}
              errors={validationMessage}
              info={serverInfo}
              handleChange={handleValidation}
              onSignOut={onSignOut}
              onUpdateUser={handleUpdateUser}
            />
          </ProtectedRoute>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>

        {origin.header[pathname] && pathname !== '/profile' && <Footer />}
        <Popup isOpen={isPopupOpen} onClose={handlePopupState} />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
