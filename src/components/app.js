import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ImageForm from './ImageForm';
import PersonForm from './PersonForm';
import Menu from './Menu';

import 'react-dates/lib/css/_datepicker.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Menu />
          <Route exact path="/upload" component={ImageForm} />
          <Route exact path="/" component={PersonForm} />
        </div>
      </Router>
    );
  }
}

export default App;
