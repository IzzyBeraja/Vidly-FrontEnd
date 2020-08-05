import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movie extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  renderMovies = () => {
    return this.state.movies.map(movie => {
      return (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(movie)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p className="text-center">There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <p className="text-center">Showing {count} movies in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderMovies()}</tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movie;
