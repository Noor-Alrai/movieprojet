import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MovieList from './pages/movies/index';
//import MovieDetails from './components/MovieDetails';


const App = () => {
  return (
    /*<Router>
      <div className="App" >
        <Header />
        <Switch>
          <Route path="/" exact component={MovieList} />
          <Route path="/movies/:movieId" component={MovieDetails} />

        </Switch>
      </div>
    </Router> */
    <>
    
    <MovieList></MovieList>
    </>
    
  );
};

export default App;