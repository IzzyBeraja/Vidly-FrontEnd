import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import MoviesMenu from "./components/moviesMenu";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/Movies" component={MoviesMenu} />
            <Route path="/Customers" component={Customers} />
            <Route path="/Rentals" component={Rentals} />
            <Route path="/notFound" component={NotFound} />
            <Redirect from="/" exact to="/Movies" />
            <Redirect to="/notFound" />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
