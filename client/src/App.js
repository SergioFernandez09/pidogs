import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './Componentes/LandingPage/LandingPage';
import HomePage from './Componentes/HomePage/HomePage';
// import DetailPage from './DetailPage';
// import FormPage from './FormPage';

const App = () => {
  return (
    <Router>
      <div className="App"> {/* Add the "App" class to the div */}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={HomePage} />
          {/* <Route path="/detail/:id" component={DetailPage} />
          <Route path="/form" component={FormPage} /> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
