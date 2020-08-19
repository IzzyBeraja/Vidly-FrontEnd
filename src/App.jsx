import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import "./App.css";
import MoviesMenu from "./components/moviesMenu";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/404-notFound";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Vidly
          </Link>
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link className="nav-link" to="/Movies">
                Movies
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/Customers">
                Customers
              </Link>
            </li>
            <li className="navbar-item">
              <Link className="nav-link" to="/Rentals">
                Rentals
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/Movies" component={MoviesMenu} />
          <Route path="/Customers" component={Customers} />
          <Route path="/Rentals" component={Rentals} />
          <Route path="/404-notFound" component={NotFound} />
          <Redirect path="/" exact to="/Movies" />
          <Redirect to="/404-notFound" />
        </Switch>
      </div>
    );
  }
}

export default App;
